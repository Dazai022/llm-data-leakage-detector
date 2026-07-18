from utils.risk_scoring import (
    calculate_risk_score,
    enrich_detections,
    get_risk_level,
)


class TestRiskLevel:
    def test_low_below_25(self):
        assert get_risk_level(0) == "Low"
        assert get_risk_level(24) == "Low"

    def test_medium_boundary(self):
        assert get_risk_level(25) == "Medium"
        assert get_risk_level(49) == "Medium"

    def test_high_boundary(self):
        assert get_risk_level(50) == "High"
        assert get_risk_level(74) == "High"

    def test_critical_boundary(self):
        assert get_risk_level(75) == "Critical"
        assert get_risk_level(100) == "Critical"


class TestCalculateRiskScore:
    def test_no_detections_is_zero_low(self):
        score, level = calculate_risk_score([])
        assert (score, level) == (0, "Low")

    def test_single_critical_detection(self):
        score, level = calculate_risk_score([{"type": "api_key"}])
        assert score == 25
        assert level == "Medium"

    def test_score_caps_at_100(self):
        detections = [{"type": "api_key"}] * 10  # 10 * 25 = 250, capped
        score, _ = calculate_risk_score(detections)
        assert score == 100

    def test_unknown_type_uses_default_weight(self):
        score, _ = calculate_risk_score([{"type": "some_new_type_not_in_weights"}])
        assert score == 10


class TestEnrichDetections:
    def test_adds_known_severity(self):
        detections = [{"type": "api_key"}]
        enriched = enrich_detections(detections)
        assert enriched[0]["risk"] == "critical"

    def test_unknown_type_defaults_to_medium(self):
        detections = [{"type": "totally_unknown"}]
        enriched = enrich_detections(detections)
        assert enriched[0]["risk"] == "medium"
