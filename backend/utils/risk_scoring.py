"""
Risk Scoring System.
Calculates a 0-100 risk score based on detected leaks.
"""

from typing import List, Dict, Tuple


# Risk weights for each leak type (higher = more dangerous)
RISK_WEIGHTS = {
    "api_key": 25,
    "secret_key": 25,
    "token": 20,
    "password": 20,
    "database_url": 22,
    "credit_card": 30,
    "ssn": 30,
    "email": 8,
    "phone_number": 8,
    "ip_address": 5,
    "pii": 10,
    "high_entropy_string": 12,
}

# Risk severity per leak type
RISK_SEVERITY = {
    "api_key": "critical",
    "secret_key": "critical",
    "token": "high",
    "password": "high",
    "database_url": "critical",
    "credit_card": "critical",
    "ssn": "critical",
    "email": "medium",
    "phone_number": "medium",
    "ip_address": "low",
    "pii": "medium",
    "high_entropy_string": "high",
}


def get_risk_level(score: int) -> str:
    """Map numeric score to risk level label."""
    if score >= 75:
        return "Critical"
    elif score >= 50:
        return "High"
    elif score >= 25:
        return "Medium"
    else:
        return "Low"


def calculate_risk_score(detections: List[Dict]) -> Tuple[int, str]:
    """
    Calculate an aggregate risk score (0-100) from all detections.
    Returns (score, risk_level).
    """
    if not detections:
        return 0, "Low"

    total_weight = 0
    for detection in detections:
        leak_type = detection.get("type", "unknown")
        weight = RISK_WEIGHTS.get(leak_type, 10)
        total_weight += weight

    # Normalize: cap at 100
    score = min(total_weight, 100)
    level = get_risk_level(score)

    return score, level


def enrich_detections(detections: List[Dict]) -> List[Dict]:
    """Add risk severity to each detection."""
    for d in detections:
        d["risk"] = RISK_SEVERITY.get(d["type"], "medium")
    return detections
