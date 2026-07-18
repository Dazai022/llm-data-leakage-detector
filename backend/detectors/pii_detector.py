"""
PII detector using keyword analysis and entropy-based detection.
Provides an additional layer of detection beyond regex patterns.
"""

import math
import re
from typing import List, Dict


# Keywords that indicate sensitive context
SENSITIVE_KEYWORDS = {
    "password": "password",
    "passwd": "password",
    "pwd": "password",
    "secret": "secret_key",
    "api_key": "api_key",
    "apikey": "api_key",
    "api key": "api_key",
    "access_token": "token",
    "auth_token": "token",
    "private_key": "secret_key",
    "client_secret": "secret_key",
    "database_url": "database_url",
    "db_password": "password",
    "ssh_key": "secret_key",
    "encryption_key": "secret_key",
    "credentials": "password",
    "username": "pii",
    "social security": "ssn",
    "credit card": "credit_card",
    "card number": "credit_card",
    "cvv": "credit_card",
    "expiry": "credit_card",
    "date of birth": "pii",
    "dob": "pii",
    "home address": "pii",
    "phone number": "phone_number",
}


def calculate_entropy(text: str) -> float:
    """Calculate Shannon entropy of a string. Higher = more random = likely a secret."""
    if not text:
        return 0.0
    
    freq = {}
    for ch in text:
        freq[ch] = freq.get(ch, 0) + 1
    
    length = len(text)
    entropy = 0.0
    for count in freq.values():
        p = count / length
        entropy -= p * math.log2(p)
    
    return entropy


def detect_high_entropy_strings(text: str, threshold: float = 4.0) -> List[Dict]:
    """
    Find high-entropy strings that look like passwords, keys, or tokens.
    Entropy above threshold suggests random/generated content.
    """
    detections = []
    
    # Look for quoted strings or key=value assignments
    patterns = [
        re.compile(r'["\']([a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};:,.<>?/|\\~`]{12,})["\']'),
        re.compile(r'[:=]\s*([a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};:,.<>?/|\\~`]{16,})'),
    ]
    
    seen = set()
    for pattern in patterns:
        for match in pattern.finditer(text):
            value = match.group(1)
            if value in seen:
                continue
            seen.add(value)
            
            entropy = calculate_entropy(value)
            if entropy >= threshold and len(value) >= 12:
                detections.append({
                    "type": "high_entropy_string",
                    "value": value,
                    "matched_text": match.group(0),
                    "start": match.start(),
                    "end": match.end(),
                    "method": "entropy",
                    "entropy": round(entropy, 2),
                })
    
    return detections


def detect_keyword_context(text: str) -> List[Dict]:
    """
    Detect sensitive keywords that indicate PII or secrets in context.
    """
    detections = []

    for keyword, leak_type in SENSITIVE_KEYWORDS.items():
        # Word-boundary match so a keyword can't fire as a substring of an
        # unrelated word or value (e.g. "secret" inside "Sup3rSecret!").
        keyword_pattern = re.compile(r'\b' + re.escape(keyword) + r'\b', re.IGNORECASE)

        for kw_match in keyword_pattern.finditer(text):
            # Only look for an assignment operator shortly after the
            # keyword (e.g. "password: xyz" / "api_key=xyz"), not anywhere
            # in a wide window - a wide window can wander into a completely
            # unrelated value later in the text.
            window_end = min(kw_match.end() + 20, len(text))
            window = text[kw_match.end():window_end]

            value_match = re.match(r'\s*[:=]\s*["\']?([^\s"\',;]{4,})["\']?', window)
            if value_match:
                value = value_match.group(1)
                value_start = kw_match.end() + value_match.start(1)
                value_end = kw_match.end() + value_match.end(1)
                detections.append({
                    "type": leak_type,
                    "value": value,
                    "matched_text": text[kw_match.start():value_end],
                    "start": value_start,
                    "end": value_end,
                    "method": "keyword",
                    "keyword": keyword,
                })

    return detections


def detect_pii(text: str) -> List[Dict]:
    """
    Run all PII detection methods and return combined results.
    """
    detections = []
    
    # Keyword-based detection
    detections.extend(detect_keyword_context(text))
    
    # High-entropy string detection
    detections.extend(detect_high_entropy_strings(text))
    
    # Deduplicate by value
    seen = set()
    unique = []
    for d in detections:
        if d["value"] not in seen:
            seen.add(d["value"])
            unique.append(d)
    
    return unique
