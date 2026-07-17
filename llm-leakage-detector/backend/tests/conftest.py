import pytest


@pytest.fixture(autouse=True)
def reset_rate_limiter():
    """
    The rate limiter's counters are shared, in-memory, process-global
    state (see utils/rate_limiter.py). Without resetting it, an early
    test that fires several requests at /api/analyze could cause a
    later, unrelated test to fail with 429 purely because of test
    order - not because of anything that test itself did.
    """
    from utils.rate_limiter import limiter

    limiter.reset()
    yield
    limiter.reset()
