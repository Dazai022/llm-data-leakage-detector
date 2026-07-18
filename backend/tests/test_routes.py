from fastapi.testclient import TestClient

from main import app

client = TestClient(app)


class TestScanEndpoint:
    def test_scan_detects_and_sanitizes(self):
        response = client.post("/api/scan", json={"text": "email me at john@example.com"})
        assert response.status_code == 200
        body = response.json()
        assert body["sanitized_text"] == "email me at j***n@example.com"
        assert body["leaks_detected"][0]["type"] == "email"
        assert body["risk_level"] in {"Low", "Medium", "High", "Critical"}

    def test_scan_with_no_leaks(self):
        response = client.post("/api/scan", json={"text": "just a normal sentence"})
        assert response.status_code == 200
        body = response.json()
        assert body["leaks_detected"] == []
        assert body["risk_score"] == 0
        assert body["risk_level"] == "Low"

    def test_scan_empty_text_returns_empty_result_not_error(self):
        response = client.post("/api/scan", json={"text": "   "})
        assert response.status_code == 200
        assert response.json()["leaks_detected"] == []

    def test_scan_regression_stress_case(self):
        """
        This is the exact adversarial input that originally surfaced four
        bugs: overlapping-match corruption, a false-positive email nested
        in a DB URL, a false-positive secret_key from a password value,
        and a stray high-entropy match overlapping the DB URL. Guards
        against all of them regressing at once.
        """
        text = (
            "api_key: sk-proj-abcdEFGH12345678901234567890 and email me at "
            "john.doe@example.com. password: Sup3rSecret! card 4111111111111111 "
            "ssn 123-45-6789 db mongodb://user:pass123@cluster0.mongodb.net/db"
        )
        response = client.post("/api/scan", json={"text": text})
        assert response.status_code == 200
        body = response.json()
        sanitized = body["sanitized_text"]
        leaks = body["leaks_detected"]

        # No raw secrets survive sanitization, and nothing got corrupted
        # into a garbled partial mask.
        assert "sk-proj-abcdEFGH12345678901234567890" not in sanitized
        assert "4111111111111111" not in sanitized
        assert "123-45-6789" not in sanitized
        assert "pass123" not in sanitized
        assert "sk-p****90" in sanitized

        # The real email is still caught...
        assert any(
            d["type"] == "email" and d["masked_value"] == "j***e@example.com"
            for d in leaks
        )
        # ...but the fake "email" nested inside the DB URL is not - there
        # should be exactly one email leak, not two.
        assert len([d for d in leaks if d["type"] == "email"]) == 1
        # And "Sup3rSecret!" doesn't trigger a bogus secret_key detection
        # - nothing in this text should produce one at all.
        assert not any(d["type"] == "secret_key" for d in leaks)

    def test_oversized_field_rejected(self):
        response = client.post("/api/scan", json={"text": "a" * 25_000})
        assert response.status_code == 422

    def test_oversized_body_rejected(self):
        payload = ('{"text": "' + "a" * 300_000 + '"}').encode()
        response = client.post(
            "/api/scan",
            content=payload,
            headers={"Content-Type": "application/json"},
        )
        assert response.status_code == 413


class TestAnalyzeEndpoint:
    def test_analyze_sanitizes_llm_response(self, monkeypatch):
        async def fake_generate_response(prompt: str) -> str:
            return "Sure, here's a sample config: api_key: sk-proj-abcdEFGH12345678901234567890"

        monkeypatch.setattr("routes.analyze.generate_response", fake_generate_response)

        response = client.post("/api/analyze", json={"prompt": "give me a sample config"})
        assert response.status_code == 200
        body = response.json()
        assert "sk-proj-abcdEFGH12345678901234567890" not in body["sanitized_response"]
        assert "sk-proj-abcdEFGH12345678901234567890" in body["original_response"]
        assert any(d["type"] == "api_key" for d in body["leaks_detected"])

    def test_analyze_empty_prompt_rejected(self):
        response = client.post("/api/analyze", json={"prompt": ""})
        assert response.status_code == 422

    def test_analyze_whitespace_only_prompt_rejected(self, monkeypatch):
        async def fake_generate_response(prompt: str) -> str:
            return "should not be called"

        monkeypatch.setattr("routes.analyze.generate_response", fake_generate_response)

        response = client.post("/api/analyze", json={"prompt": "   "})
        assert response.status_code == 400

    def test_analyze_llm_failure_returns_502(self, monkeypatch):
        async def failing_generate_response(prompt: str) -> str:
            raise RuntimeError("LLM API Error: boom")

        monkeypatch.setattr("routes.analyze.generate_response", failing_generate_response)

        response = client.post("/api/analyze", json={"prompt": "hello"})
        assert response.status_code == 502

    def test_analyze_rate_limit_blocks_after_ten_per_minute(self, monkeypatch):
        async def fake_generate_response(prompt: str) -> str:
            return "fine, nothing sensitive here"

        monkeypatch.setattr("routes.analyze.generate_response", fake_generate_response)

        codes = [
            client.post("/api/analyze", json={"prompt": "hi"}).status_code
            for _ in range(11)
        ]
        assert codes[:10] == [200] * 10
        assert codes[10] == 429


class TestMisc:
    def test_health_check(self):
        response = client.get("/health")
        assert response.status_code == 200
        assert response.json()["status"] == "healthy"

    def test_root_lists_endpoints(self):
        response = client.get("/")
        assert response.status_code == 200
        assert "/api/analyze" in response.json()["endpoints"]["analyze"]
