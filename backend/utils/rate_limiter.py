"""
Shared rate-limiter instance.

Lives in its own module (rather than in main.py) so that both main.py
and routes/analyze.py can import it without a circular import - main.py
registers it with the app, routes/analyze.py uses it to decorate
endpoints.
"""

from starlette.requests import Request

from slowapi import Limiter


def get_client_ip(request: Request) -> str:
    """
    Rate-limiter key function.

    Deliberately does NOT use slowapi's default `get_remote_address`,
    which keys off the X-Forwarded-For header. Nothing in this stack
    (see docker-compose.yml) puts a trusted reverse proxy in front of
    the backend, so that header is entirely attacker-controlled: a
    client could send a different X-Forwarded-For value on every
    request and have each one treated as a new "user", completely
    bypassing the /api/analyze rate limit (and running up the OpenAI
    bill, since that endpoint has no other auth).

    request.client.host is the actual TCP peer address for the
    connection and can't be spoofed by the client itself - only by
    something sitting between the client and this process.

    If you do deploy this behind a reverse proxy/load balancer you
    control, don't just swap this back to X-Forwarded-For - instead,
    only trust X-Forwarded-For / X-Real-IP on requests whose immediate
    TCP peer is that proxy (e.g. check request.client.host against a
    known proxy IP/CIDR first).
    """
    return request.client.host if request.client else "unknown"


limiter = Limiter(key_func=get_client_ip)
