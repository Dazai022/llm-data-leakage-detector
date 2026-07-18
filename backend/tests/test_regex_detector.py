from detectors.regex_detector import detect_with_regex
from utils.overlap_resolver import resolve_overlaps


def _values_of(detections, leak_type=None):
    if leak_type is None:
        return [d["value"] for d in detections]
    return [d["value"] for d in detections if d["type"] == leak_type]


def _find(detections, leak_type):
    return [d for d in detections if d["type"] == leak_type]


class TestBasicDetection:
    def test_detects_openai_style_api_key(self):
        text = "here is a key: sk-proj-abcdEFGH12345678901234567890"
        detections = detect_with_regex(text)
        keys = _find(detections, "api_key")
        assert len(keys) == 1
        assert keys[0]["value"] == "sk-proj-abcdEFGH12345678901234567890"

    def test_detects_aws_key(self):
        detections = detect_with_regex("aws key AKIAABCDEFGHIJKLMNOP in use")
        assert "AKIAABCDEFGHIJKLMNOP" in _values_of(detections, "api_key")

    def test_detects_email(self):
        detections = detect_with_regex("contact john.doe@example.com for help")
        assert "john.doe@example.com" in _values_of(detections, "email")

    def test_detects_password_assignment(self):
        detections = detect_with_regex("password: hunter2000")
        passwords = _find(detections, "password")
        assert len(passwords) == 1
        assert passwords[0]["value"] == "hunter2000"

    def test_password_span_covers_only_the_value(self):
        # Regression: the span used to cover "password: hunter2000" (the
        # whole match) instead of just "hunter2000" (the capture group),
        # which corrupted sanitization downstream.
        text = "password: hunter2000"
        detections = detect_with_regex(text)
        password = _find(detections, "password")[0]
        assert text[password["start"]:password["end"]] == "hunter2000"

    def test_detects_credit_card(self):
        detections = detect_with_regex("card 4111111111111111 on file")
        assert "4111111111111111" in _values_of(detections, "credit_card")

    def test_detects_ssn(self):
        detections = detect_with_regex("ssn 123-45-6789 confirmed")
        assert "123-45-6789" in _values_of(detections, "ssn")

    def test_detects_ip_address(self):
        detections = detect_with_regex("connect to 10.0.0.5 now")
        assert "10.0.0.5" in _values_of(detections, "ip_address")

    def test_detects_database_url(self):
        text = "db mongodb://user:pass123@cluster0.mongodb.net/db"
        detections = detect_with_regex(text)
        urls = _find(detections, "database_url")
        assert len(urls) == 1
        assert urls[0]["value"].startswith("mongodb://")

    def test_detects_jwt_token(self):
        jwt = (
            "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0."
            "dozjgNryP4J3jVmNHl0w5N_XgL0n3I9PlFUP0THsR8U"
        )
        detections = detect_with_regex(f"Bearer token: {jwt}")
        assert jwt in _values_of(detections, "token")

    def test_detects_phone_number(self):
        detections = detect_with_regex("reach me at 415-555-2671 anytime")
        assert "415-555-2671" in _values_of(detections, "phone_number")


class TestOverlapRegressions:
    """
    These pin down bugs found by manually stress-testing the app: two
    detectors matching overlapping text, which corrupted sanitization.
    """

    def test_nested_db_url_credentials_are_not_reported_as_a_leaked_email(self):
        # "pass123@cluster0.mongodb.net" looks like an email. The email
        # pattern itself doesn't special-case this anymore (see its
        # comment) - resolve_overlaps is what suppresses it, by
        # preferring the higher-weight database_url match that fully
        # contains it. This is a pipeline-level guarantee, not a
        # detect_with_regex-level one.
        text = "db mongodb://user:pass123@cluster0.mongodb.net/db"
        detections = resolve_overlaps(detect_with_regex(text))
        assert _find(detections, "email") == []
        assert len(_find(detections, "database_url")) == 1

    def test_colon_prefixed_email_is_still_detected(self):
        # Regression: the email pattern used to exclude any match
        # immediately preceded by ":" (to avoid the case above), which
        # had the side effect of silently missing real emails written
        # without a space after a label, e.g. "Email:jane@x.com" - a
        # common log/config format.
        detections = detect_with_regex("Email:jane@example.com")
        assert _find(detections, "email")[0]["value"] == "jane@example.com"

    def test_phone_regex_does_not_match_inside_api_key(self):
        # A run of digits inside an API key or card number shouldn't be
        # separately reported as a phone number.
        text = "api_key: sk-proj-abcdEFGH12345678901234567890"
        detections = detect_with_regex(text)
        assert _find(detections, "phone_number") == []

    def test_phone_regex_does_not_match_inside_credit_card(self):
        text = "card 4111111111111111 ssn 123-45-6789"
        detections = detect_with_regex(text)
        assert _find(detections, "phone_number") == []

    def test_real_email_still_detected_alongside_a_database_url(self):
        # Make sure the fix for the false positive didn't also break the
        # true-positive case in the same text.
        text = (
            "email me at john.doe@example.com. "
            "db mongodb://user:pass123@cluster0.mongodb.net/db"
        )
        detections = detect_with_regex(text)
        assert _find(detections, "email")[0]["value"] == "john.doe@example.com"
        assert len(_find(detections, "database_url")) == 1


class TestNoDuplicates:
    def test_same_value_not_reported_twice(self):
        text = "email a@b.com, then again a@b.com"
        detections = detect_with_regex(text)
        assert _values_of(detections, "email").count("a@b.com") == 1
