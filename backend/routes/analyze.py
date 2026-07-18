"""
API routes for the leakage detection system.
"""

from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel, Field
from typing import List, Optional

from detectors.regex_detector import detect_with_regex
from detectors.pii_detector import detect_pii
from sanitizers.masker import sanitize_response, mask_value
from utils.risk_scoring import calculate_risk_score, enrich_detections
from utils.overlap_resolver import resolve_overlaps
from services.llm_service import generate_response
from utils.rate_limiter import limiter

router = APIRouter()

# Keep detector input bounded - regex/entropy scanning is O(n) per pattern
# but there are ~20 patterns, and a malicious or accidental huge payload
# shouldn't be free to burn CPU. This is enforced again here (in addition
# to the body-size middleware) since that middleware only checks
# Content-Length, not the actual decoded field length.
MAX_TEXT_LENGTH = 20_000


class AnalyzeRequest(BaseModel):
    prompt: str = Field(..., min_length=1, max_length=MAX_TEXT_LENGTH)


class LeakItem(BaseModel):
    type: str
    masked_value: str
    risk: str
    method: Optional[str] = None


class AnalyzeResponse(BaseModel):
    original_response: str
    sanitized_response: str
    leaks_detected: List[LeakItem]
    risk_score: int
    risk_level: str


@router.post("/analyze", response_model=AnalyzeResponse)
@limiter.limit("10/minute")  # calls OpenAI - keep this tighter than /scan
async def analyze_prompt(request: Request, body: AnalyzeRequest):
    """
    Main endpoint: sends prompt to LLM, detects leaks, sanitizes, and returns results.
    """
    if not body.prompt.strip():
        raise HTTPException(status_code=400, detail="Prompt cannot be empty")

    try:
        # 1. Generate LLM response
        llm_response = await generate_response(body.prompt)
    except RuntimeError as e:
        raise HTTPException(status_code=502, detail=str(e))

    # 2. Run detection engines
    regex_detections = detect_with_regex(llm_response)
    pii_detections = detect_pii(llm_response)

    # 3. Merge detections and resolve overlaps - when two detectors flag
    # overlapping regions of text (e.g. an entropy match nested inside a
    # database URL), keep only the most specific/highest-confidence one
    # so sanitization never has to mask the same characters twice.
    all_detections = regex_detections + pii_detections
    unique_detections = resolve_overlaps(all_detections)

    # 4. Enrich with risk severity
    unique_detections = enrich_detections(unique_detections)

    # 5. Calculate risk score
    risk_score, risk_level = calculate_risk_score(unique_detections)

    # 6. Sanitize the response
    sanitized = sanitize_response(llm_response, unique_detections)

    # 7. Clean up detections for response (remove internal fields).
    # The raw "value" never leaves the backend - only "masked_value"
    # does, so a real secret is never present in an API response, the
    # browser DOM, dev tools, or a screenshot of the evidence log.
    leak_items = []
    for d in unique_detections:
        leak_items.append({
            "type": d["type"],
            "masked_value": mask_value(d["value"], d["type"]),
            "risk": d["risk"],
            "method": d.get("method", "unknown"),
        })

    return AnalyzeResponse(
        original_response=llm_response,
        sanitized_response=sanitized,
        leaks_detected=leak_items,
        risk_score=risk_score,
        risk_level=risk_level,
    )


class ScanRequest(BaseModel):
    text: str = Field(..., max_length=MAX_TEXT_LENGTH)


@router.post("/scan")
@limiter.limit("60/minute")  # no LLM call, but still worth bounding
async def scan_text(request: Request, body: ScanRequest):
    """
    Scan arbitrary text for sensitive data (no LLM call).
    Useful for real-time detection as user types.
    """
    if not body.text.strip():
        return {"leaks_detected": [], "risk_score": 0, "risk_level": "Low"}

    regex_detections = detect_with_regex(body.text)
    pii_detections = detect_pii(body.text)

    all_detections = regex_detections + pii_detections
    unique_detections = resolve_overlaps(all_detections)

    unique_detections = enrich_detections(unique_detections)
    risk_score, risk_level = calculate_risk_score(unique_detections)
    sanitized = sanitize_response(body.text, unique_detections)

    leak_items = [
        {
            "type": d["type"],
            "masked_value": mask_value(d["value"], d["type"]),
            "risk": d["risk"],
            "method": d.get("method"),
        }
        for d in unique_detections
    ]

    return {
        "sanitized_text": sanitized,
        "leaks_detected": leak_items,
        "risk_score": risk_score,
        "risk_level": risk_level,
    }
