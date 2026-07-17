"""
LLM Data Leakage Detection & Response Sanitization System
FastAPI Backend Entry Point
"""

import os

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from starlette.middleware.base import BaseHTTPMiddleware

from routes.analyze import router as analyze_router
from utils.rate_limiter import limiter

# Max request body size, in bytes. Regex/entropy scanning over arbitrarily
# large input is a cheap DoS vector, so we cap it well before it reaches
# the detectors. Configurable via env for deployments that need more.
MAX_BODY_BYTES = int(os.getenv("MAX_BODY_BYTES", 200_000))  # ~200 KB

# CORS origins - comma separated. Defaults to the local Next.js dev server.
ALLOWED_ORIGINS = [
    origin.strip()
    for origin in os.getenv("ALLOWED_ORIGINS", "http://localhost:3000").split(",")
    if origin.strip()
]

app = FastAPI(
    title="LLM Data Leakage Detector",
    description="Detect and sanitize sensitive data leakage in LLM responses",
    version="1.0.0",
)

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)


class MaxBodySizeMiddleware(BaseHTTPMiddleware):
    """Rejects requests whose body exceeds MAX_BODY_BYTES before they're parsed."""

    async def dispatch(self, request: Request, call_next):
        content_length = request.headers.get("content-length")
        if content_length and int(content_length) > MAX_BODY_BYTES:
            return JSONResponse(
                status_code=413,
                content={
                    "detail": f"Request body too large. Max size is {MAX_BODY_BYTES} bytes."
                },
            )
        return await call_next(request)


app.add_middleware(MaxBodySizeMiddleware)

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routes
app.include_router(analyze_router, prefix="/api")


@app.exception_handler(Exception)
async def unhandled_exception_handler(request: Request, exc: Exception):
    # Never leak internal stack traces / exception details to clients.
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error."},
    )


@app.get("/")
async def root():
    return {
        "name": "LLM Data Leakage Detector",
        "version": "1.0.0",
        "status": "running",
        "endpoints": {
            "analyze": "POST /api/analyze",
            "scan": "POST /api/scan",
        },
    }


@app.get("/health")
async def health():
    return {"status": "healthy"}
