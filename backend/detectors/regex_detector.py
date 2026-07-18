"""
Regex-based detector for sensitive data patterns.
Detects API keys, emails, passwords, tokens, and other secrets.
"""

import re
from typing import List, Dict


# Compiled regex patterns for performance
PATTERNS = {
    "api_key": [
        re.compile(r'sk-[a-zA-Z0-9]{20,}'),                           # OpenAI-style
        re.compile(r'sk-proj-[a-zA-Z0-9_-]{20,}'),                    # OpenAI project keys
        re.compile(r'AKIA[0-9A-Z]{16}'),                              # AWS Access Key
        re.compile(r'AIza[0-9A-Za-z\-_]{35}'),                        # Google API Key
        re.compile(r'ghp_[a-zA-Z0-9]{36}'),                           # GitHub PAT
        re.compile(r'glpat-[a-zA-Z0-9\-_]{20,}'),                     # GitLab PAT
        re.compile(r'xox[bposa]-[0-9a-zA-Z\-]{10,}'),                 # Slack Token
    ],
    "email": [
        # Negative lookbehind so we don't grab a bare username@host
        # fragment out of the middle of a longer token (e.g. matching
        # starting mid-word). Deliberately does NOT exclude ":" - that
        # used to also block real emails written as "Email:jane@x.com"
        # (no space after the colon), a common log/config format. The
        # "user:pass@host" case inside database URLs this was guarding
        # against is already handled correctly downstream: when this
        # pattern also matches the credentials fragment inside a DB URL,
        # utils.overlap_resolver drops it in favor of the higher-weight
        # database_url detection that fully contains it (see
        # test_overlap_resolver.py::test_nested_span_drops_the_lower_weight_one
        # and test_routes.py::test_scan_regression_stress_case).
        re.compile(r'(?<![/@.\w])[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}'),
    ],
    "password": [
        re.compile(r'(?i)password\s*[:=]\s*["\']?([^\s"\']{4,})["\']?'),
        re.compile(r'(?i)passwd\s*[:=]\s*["\']?([^\s"\']{4,})["\']?'),
        re.compile(r'(?i)pwd\s*[:=]\s*["\']?([^\s"\']{4,})["\']?'),
        re.compile(r'(?i)pass\s*[:=]\s*["\']?([^\s"\']{4,})["\']?'),
    ],
    "secret_key": [
        re.compile(r'(?i)(?:secret|private)[_\s-]?key\s*[:=]\s*["\']?([^\s"\']{8,})["\']?'),
        re.compile(r'(?i)(?:client|app)[_\s-]?secret\s*[:=]\s*["\']?([^\s"\']{8,})["\']?'),
        re.compile(r'(?i)api[_\s-]?secret\s*[:=]\s*["\']?([^\s"\']{8,})["\']?'),
    ],
    "token": [
        re.compile(r'(?i)(?:access|auth|refresh)[_\s-]?token\s*[:=]\s*["\']?([^\s"\']{8,})["\']?'),
        re.compile(r'eyJ[a-zA-Z0-9_-]{10,}\.eyJ[a-zA-Z0-9_-]{10,}\.[a-zA-Z0-9_-]{10,}'),  # JWT
        # Bearer tokens. Capture just the token itself (group 1), not the
        # literal "Bearer " prefix - otherwise the "value" and its span
        # include the word "Bearer", which corrupts masking downstream
        # (e.g. "Bear****EF" instead of masking only the token).
        re.compile(r'(?i)Bearer\s+([a-zA-Z0-9\-._~+/]+=*)'),
    ],
    "credit_card": [
        re.compile(r'\b(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|6(?:011|5[0-9]{2})[0-9]{12})\b'),
    ],
    "ssn": [
        re.compile(r'\b\d{3}-\d{2}-\d{4}\b'),
    ],
    "ip_address": [
        re.compile(r'\b(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\b'),
    ],
    "phone_number": [
        re.compile(r'\b(?:\+?\d{1,3}[\s-]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}\b'),
    ],
    "database_url": [
        re.compile(r'(?i)(?:mongodb|postgres|mysql|redis)(?:\+\w+)?://[^\s"\']+'),
    ],
}


def detect_with_regex(text: str) -> List[Dict]:
    """
    Scan text for sensitive data using regex patterns.
    Returns a list of detected leaks with type, value, and position.
    """
    detections = []
    seen_values = set()

    for leak_type, patterns in PATTERNS.items():
        for pattern in patterns:
            for match in pattern.finditer(text):
                # Use group(1) if a capturing group exists, else group(0).
                # Crucially, take start/end from that SAME group, not the
                # whole match - otherwise "password: abc123" would record
                # value="abc123" but a span covering "password: abc123",
                # which corrupts sanitization later.
                if match.lastindex and match.lastindex >= 1:
                    value = match.group(1)
                    value_start = match.start(1)
                    value_end = match.end(1)
                else:
                    value = match.group(0)
                    value_start = match.start()
                    value_end = match.end()

                # Avoid duplicate detections
                if value in seen_values:
                    continue
                seen_values.add(value)

                detections.append({
                    "type": leak_type,
                    "value": value,
                    "matched_text": match.group(0),
                    "start": value_start,
                    "end": value_end,
                    "method": "regex",
                })

    return detections
