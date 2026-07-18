"""
Overlap resolution for detections.

Different detectors (regex, keyword-context, entropy) can flag
overlapping or nested regions of the same text - e.g. an entropy
detector flagging an entire database URL that a dedicated
`database_url` regex already caught more precisely, or a phone-number
regex catching a digit run inside an API key. If sanitization tries to
mask all of these independently, the replacements collide and corrupt
the output.

This module picks one detection per region of text: the one from the
most specific / highest-severity source, using the same weights as
risk scoring. Everything that overlaps an already-kept span is
dropped.
"""

from typing import Dict, List

from utils.risk_scoring import RISK_WEIGHTS

# Tie-breaker when two detections share the same risk weight and span
# length: prefer detectors we trust more.
METHOD_PRIORITY = {
    "regex": 3,
    "keyword": 2,
    "entropy": 1,
}


def _priority(detection: Dict) -> tuple:
    weight = RISK_WEIGHTS.get(detection.get("type", "unknown"), 10)
    start = detection.get("start", 0)
    end = detection.get("end", start)
    span_length = max(end - start, 0)
    method_rank = METHOD_PRIORITY.get(detection.get("method", ""), 0)
    return (weight, span_length, method_rank)


def resolve_overlaps(detections: List[Dict]) -> List[Dict]:
    """
    Given detections with 'start'/'end' character offsets, keep only
    non-overlapping spans, preferring the highest-priority detection
    wherever spans collide. Returns detections sorted by position.
    """
    ordered = sorted(detections, key=_priority, reverse=True)

    kept: List[Dict] = []
    occupied: List[tuple] = []

    for detection in ordered:
        start = detection.get("start", 0)
        end = detection.get("end", start)

        if end <= start:
            # No reliable span - keep it, but it can't collide with
            # anything since it has no width.
            kept.append(detection)
            continue

        overlaps = any(start < o_end and end > o_start for o_start, o_end in occupied)
        if overlaps:
            continue

        occupied.append((start, end))
        kept.append(detection)

    return sorted(kept, key=lambda d: d.get("start", 0))
