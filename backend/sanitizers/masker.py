"""
Sanitization / masking engine.
Replaces detected sensitive data with masked versions.
"""

import re
from typing import List, Dict


def mask_value(value: str, leak_type: str) -> str:
    """
    Mask a sensitive value based on its type.
    Preserves partial structure for recognizability.
    """
    if leak_type == "email":
        parts = value.split("@")
        if len(parts) == 2:
            local = parts[0]
            domain = parts[1]
            if len(local) > 2:
                masked_local = local[0] + "***" + local[-1]
            else:
                masked_local = "***"
            return f"{masked_local}@{domain}"
        return "***@***.***"

    elif leak_type == "api_key":
        if len(value) > 6:
            return value[:4] + "****" + value[-2:]
        return "****"

    elif leak_type == "password":
        return "********"

    elif leak_type == "secret_key":
        if len(value) > 6:
            return value[:3] + "****" + value[-2:]
        return "****"

    elif leak_type == "token":
        if len(value) > 8:
            return value[:4] + "..." + value[-4:]
        return "****"

    elif leak_type == "credit_card":
        digits = re.sub(r'\D', '', value)
        if len(digits) >= 4:
            return "****-****-****-" + digits[-4:]
        return "****-****-****-****"

    elif leak_type == "ssn":
        return "***-**-" + value[-4:] if len(value) >= 4 else "***-**-****"

    elif leak_type == "phone_number":
        digits = re.sub(r'\D', '', value)
        if len(digits) >= 4:
            return "***-***-" + digits[-4:]
        return "***-***-****"

    elif leak_type == "ip_address":
        parts = value.split(".")
        if len(parts) == 4:
            return f"{parts[0]}.***.***.{parts[3]}"
        return "***.***.***.***"

    elif leak_type == "database_url":
        # Mask credentials in URL
        masked = re.sub(r'://([^:]+):([^@]+)@', r'://***:***@', value)
        return masked

    elif leak_type == "high_entropy_string":
        if len(value) > 6:
            return value[:3] + "****" + value[-2:]
        return "****"

    else:
        if len(value) > 4:
            return value[:2] + "****" + value[-2:]
        return "****"


def sanitize_response(original_text: str, detections: List[Dict]) -> str:
    """
    Replace all detected sensitive data in the text with masked versions.

    Detections carry exact 'start'/'end' character offsets for the
    sensitive value itself (see detectors). We slice by those offsets
    and work from the end of the text backwards, so earlier
    replacements never shift the positions of ones still to come.

    IMPORTANT: this assumes detections have already been passed through
    utils.overlap_resolver.resolve_overlaps, so spans never overlap. If
    they did overlap, slicing by offset would still avoid corrupting
    unrelated text (unlike the old string.replace approach), but the
    result could double-mask the same characters.
    """
    sanitized = original_text

    # Sort by start position, descending, so earlier edits don't shift
    # the offsets of edits still to be applied.
    sorted_detections = sorted(detections, key=lambda d: d.get("start", 0), reverse=True)

    for detection in sorted_detections:
        leak_type = detection["type"]
        sensitive_value = detection["value"]
        start = detection.get("start")
        end = detection.get("end")

        masked = mask_value(sensitive_value, leak_type)

        if start is not None and end is not None and end > start:
            sanitized = sanitized[:start] + masked + sanitized[end:]
        else:
            # Fallback for any detection without a reliable span.
            sanitized = sanitized.replace(sensitive_value, masked, 1)

    return sanitized
