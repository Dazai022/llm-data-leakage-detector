from detectors.pii_detector import (
    calculate_entropy,
    detect_high_entropy_strings,
    detect_keyword_context,
    detect_pii,
)


def _find(detections, leak_type):
    return [d for d in detections if d["type"] == leak_type]


class TestKeywordContext:
    def test_detects_password_keyword(self):
        detections = detect_keyword_context("password: hunter2000")
        matches = _find(detections, "password")
        assert len(matches) == 1
        assert matches[0]["value"] == "hunter2000"

    def test_detects_multiword_keyword(self):
        detections = detect_keyword_context("api key: abc123xyz")
        assert _find(detections, "api_key")

    def test_no_match_without_assignment(self):
        # The keyword shows up, but there's no ": value" or "= value"
        # right after it, so nothing should be reported.
        detections = detect_keyword_context("please reset your password soon")
        assert detections == []

    def test_secret_substring_inside_another_word_is_not_flagged(self):
        # Regression: "secret" used to match as a naive substring, so
        # "Sup3rSecret!" (a password VALUE, not a mention of the word
        # "secret") triggered a bogus secret_key detection.
        detections = detect_keyword_context("password: Sup3rSecret!")
        assert _find(detections, "secret_key") == []

    def test_standalone_secret_keyword_still_detected(self):
        # Make sure the word-boundary fix didn't disable real matches.
        detections = detect_keyword_context("secret: topsecretvalue")
        matches = _find(detections, "secret_key")
        assert len(matches) == 1
        assert matches[0]["value"] == "topsecretvalue"

    def test_value_span_matches_actual_value_text(self):
        text = "password: hunter2000"
        detections = detect_keyword_context(text)
        match = _find(detections, "password")[0]
        assert text[match["start"]:match["end"]] == "hunter2000"

    def test_does_not_wander_into_unrelated_later_text(self):
        # A wide, unanchored search window used to let a keyword match
        # grab a value far away from the keyword itself.
        text = "username noted. " + ("filler " * 10) + "password: hunter2000"
        detections = detect_keyword_context(text)
        # "username" itself has no ":"/"=" right after it, so it
        # shouldn't produce a detection at all.
        assert _find(detections, "pii") == []


class TestEntropy:
    def test_low_entropy_string_not_flagged(self):
        detections = detect_high_entropy_strings('config = "aaaaaaaaaaaaaaaa"')
        assert detections == []

    def test_high_entropy_quoted_string_flagged(self):
        text = 'config = "xQ9zR2mK7vB3jH5nL8"'
        detections = detect_high_entropy_strings(text)
        assert len(detections) == 1
        assert detections[0]["value"] == "xQ9zR2mK7vB3jH5nL8"
        assert detections[0]["method"] == "entropy"

    def test_entropy_of_repeated_char_is_zero(self):
        assert calculate_entropy("aaaa") == 0.0

    def test_entropy_of_empty_string_is_zero(self):
        assert calculate_entropy("") == 0.0


class TestDetectPii:
    def test_combines_keyword_and_entropy_detections(self):
        text = 'password: hunter2000 config = "xQ9zR2mK7vB3jH5nL8"'
        detections = detect_pii(text)
        types = {d["type"] for d in detections}
        assert "password" in types
        assert "high_entropy_string" in types

    def test_dedupes_by_value(self):
        text = "password: hunter2000 password: hunter2000"
        detections = detect_pii(text)
        values = [d["value"] for d in detections]
        assert values.count("hunter2000") == 1
