from utils.overlap_resolver import resolve_overlaps


def _make(type_, start, end, method="regex"):
    return {"type": type_, "value": "x" * (end - start), "start": start, "end": end, "method": method}


class TestOverlapResolver:
    def test_no_overlap_keeps_everything(self):
        detections = [_make("email", 0, 5), _make("phone_number", 10, 15)]
        result = resolve_overlaps(detections)
        assert len(result) == 2

    def test_nested_span_drops_the_lower_weight_one(self):
        # database_url (weight 22) fully contains an email-shaped span
        # (weight 8) - the email should be dropped, database_url kept.
        db_url = _make("database_url", 0, 50)
        nested_email = _make("email", 10, 30)
        result = resolve_overlaps([db_url, nested_email])
        assert len(result) == 1
        assert result[0]["type"] == "database_url"

    def test_result_is_sorted_by_start_position(self):
        a = _make("email", 20, 25)
        b = _make("phone_number", 0, 5)
        result = resolve_overlaps([a, b])
        assert [d["start"] for d in result] == [0, 20]

    def test_equal_weight_tie_broken_by_longer_span(self):
        short = _make("email", 0, 5)
        long = _make("email", 0, 10)
        result = resolve_overlaps([short, long])
        assert len(result) == 1
        assert result[0]["end"] - result[0]["start"] == 10

    def test_equal_weight_and_length_tie_broken_by_method(self):
        entropy_match = _make("email", 0, 5, method="entropy")
        regex_match = _make("email", 0, 5, method="regex")
        result = resolve_overlaps([entropy_match, regex_match])
        assert len(result) == 1
        assert result[0]["method"] == "regex"

    def test_zero_width_spans_are_always_kept(self):
        # Detections without a reliable span (start == end) can't
        # meaningfully "overlap" anything, so they always survive.
        no_span = {"type": "pii", "value": "x", "start": 5, "end": 5, "method": "keyword"}
        real_span = _make("email", 0, 10)
        result = resolve_overlaps([no_span, real_span])
        assert len(result) == 2

    def test_partial_overlap_keeps_higher_priority_only(self):
        # Overlapping but not nested - e.g. spans [0,10) and [5,15).
        higher = _make("api_key", 0, 10)   # weight 25
        lower = _make("email", 5, 15)      # weight 8
        result = resolve_overlaps([higher, lower])
        assert len(result) == 1
        assert result[0]["type"] == "api_key"

    def test_empty_input(self):
        assert resolve_overlaps([]) == []
