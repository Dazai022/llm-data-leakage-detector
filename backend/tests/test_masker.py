from sanitizers.masker import mask_value, sanitize_response


class TestMaskValue:
    def test_email(self):
        assert mask_value("john@example.com", "email") == "j***n@example.com"

    def test_short_email_local_part(self):
        assert mask_value("jo@example.com", "email") == "***@example.com"

    def test_api_key(self):
        value = "sk-proj-abcdEFGH12345678901234567890"
        assert mask_value(value, "api_key") == "sk-p****90"

    def test_password_is_fully_masked(self):
        assert mask_value("hunter2000", "password") == "********"

    def test_credit_card_keeps_last_four(self):
        assert mask_value("4111111111111111", "credit_card") == "****-****-****-1111"

    def test_ssn_keeps_last_four(self):
        assert mask_value("123-45-6789", "ssn") == "***-**-6789"

    def test_phone_number_keeps_last_four_digits(self):
        assert mask_value("415-555-2671", "phone_number") == "***-***-2671"

    def test_ip_address_keeps_first_and_last_octet(self):
        assert mask_value("10.0.0.5", "ip_address") == "10.***.***.5"

    def test_database_url_masks_credentials_only(self):
        value = "mongodb://user:pass123@cluster0.mongodb.net/db"
        assert mask_value(value, "database_url") == "mongodb://***:***@cluster0.mongodb.net/db"

    def test_unknown_type_falls_back_to_generic_mask(self):
        assert mask_value("somevalue", "mystery_type") == "so****ue"


class TestSanitizeResponse:
    def test_single_detection_masks_only_that_span(self):
        text = "email me at john@example.com please"
        detections = [
            {"type": "email", "value": "john@example.com", "start": 12, "end": 28}
        ]
        result = sanitize_response(text, detections)
        assert result == "email me at j***n@example.com please"

    def test_multiple_non_overlapping_detections_do_not_corrupt_each_other(self):
        # Regression: this exact shape of input used to corrupt the API
        # key because a phone-number match overlapped part of it and
        # sanitize_response used str.replace() instead of offsets.
        text = "api_key: sk-proj-abcdEFGH12345678901234567890 and email john@example.com"
        api_key_start = text.index("sk-proj")
        api_key_end = api_key_start + len("sk-proj-abcdEFGH12345678901234567890")
        email_start = text.index("john@example.com")
        email_end = email_start + len("john@example.com")

        detections = [
            {"type": "api_key", "value": "sk-proj-abcdEFGH12345678901234567890",
             "start": api_key_start, "end": api_key_end},
            {"type": "email", "value": "john@example.com",
             "start": email_start, "end": email_end},
        ]
        result = sanitize_response(text, detections)

        assert result == "api_key: sk-p****90 and email j***n@example.com"
        # No leftover raw fragments of either secret value.
        assert "sk-proj-abcdEFGH12345678901234567890" not in result
        assert "john@example.com" not in result

    def test_processes_detections_right_to_left_so_offsets_stay_valid(self):
        text = "aaa BBB ccc DDD eee"
        detections = [
            {"type": "password", "value": "BBB", "start": 4, "end": 7},
            {"type": "password", "value": "DDD", "start": 12, "end": 15},
        ]
        result = sanitize_response(text, detections)
        assert result == "aaa ******** ccc ******** eee"

    def test_falls_back_to_replace_when_span_missing(self):
        text = "secret is topsecretvalue here"
        detections = [{"type": "secret_key", "value": "topsecretvalue"}]
        result = sanitize_response(text, detections)
        assert "topsecretvalue" not in result
        assert "top****ue" in result
