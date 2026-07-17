# LLM Leakage Detector

A tool that scans text — typically an LLM's response — for accidentally
leaked secrets and PII (API keys, passwords, database URLs, emails, SSNs,
credit cards, JWTs, and more), masks them, and scores the overall risk.

It's two pieces:

- **`backend/`** — a FastAPI service that detects leaks (via regex +
  keyword/entropy heuristics), sanitizes text, and scores risk. Optionally
  calls the OpenAI API to demonstrate detection against a real LLM response.
- **`frontend/`** — a Next.js UI with a redacted-text pane, a risk dial, and
  an evidence log of everything found.

---

## Prerequisites

| Tool | Version | Check with |
|---|---|---|
| Python | 3.11+ | `python --version` |
| Node.js | 20+ | `node --version` |
| npm | comes with Node | `npm --version` |
| (optional) Docker + Docker Compose | recent | `docker --version` |

**Windows note:** if `python` or `python3` says *"Python was not found; run
without arguments to install from the Microsoft Store"*, Python isn't
actually installed yet — that message is a Store shortcut stub. Install
Python from [python.org](https://www.python.org/downloads/) and make sure
**"Add python.exe to PATH"** is checked during setup. If it still happens
after installing, disable the stub at **Settings → Apps → Advanced app
settings → App execution aliases**.

---

## Quick start (without Docker)

You'll run the backend and frontend in **two separate terminals**, both
open at the same time.

### 1. Backend

```bash
cd backend

# create and activate a virtual environment
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate

# install dependencies
pip install -r requirements.txt -r requirements-dev.txt

# add your OpenAI key
# edit .env and replace OPENAI_API_KEY=your-openai-api-key-here
# with a real key (only needed for the /api/analyze endpoint,
# which calls OpenAI - /api/scan works without one)

# run the test suite
pytest

# start the server
uvicorn main:app --reload --port 8000
```

Backend is now live at `http://localhost:8000` (interactive API docs at
`http://localhost:8000/docs`).

### 2. Frontend

In a **new terminal**:

```bash
cd frontend

# point the frontend at the backend
cp .env.local.example .env.local     # Windows: copy .env.local.example .env.local
# defaults to NEXT_PUBLIC_API_URL=http://localhost:8000 - fine for local dev

npm install
npm run dev
```

Open `http://localhost:3000` in your browser. The backend must be running
at the same time for the app to actually detect and sanitize text.

---

## Quick start (with Docker)

Runs both services together, no local Python/Node setup required.

```bash
# add your real OpenAI key to backend/.env first
docker compose up --build
```

- Backend: `http://localhost:8000`
- Frontend: `http://localhost:3000`

If you've built this image before and are updating dependencies, force a
clean rebuild rather than reusing cached layers:

```bash
docker compose build --no-cache
docker compose up
```

---

## Running tests

```bash
cd backend
pytest
```

Covers the regex/keyword/entropy detectors, overlap resolution between
detectors, risk scoring, masking, and the API routes.

There's no automated test suite for the frontend beyond TypeScript's own
type checking (`npm run build` will fail on type errors).

---

## Project structure

```
backend/
  main.py                  FastAPI app, CORS, body-size limit, rate limiter
  routes/analyze.py        /api/scan and /api/analyze endpoints
  detectors/
    regex_detector.py      Pattern-based detection (keys, emails, SSNs, ...)
    pii_detector.py        Keyword- and entropy-based detection
  utils/
    overlap_resolver.py    Resolves overlapping detections by confidence
    risk_scoring.py        Per-leak and overall risk scoring
    rate_limiter.py        Shared slowapi Limiter instance
  sanitizers/masker.py     Turns a detected value into a masked one
  services/llm_service.py  OpenAI API call for the /api/analyze demo
  tests/                   pytest suite

frontend/
  app/page.tsx                    Main page / state
  app/components/RedactedPane.tsx Redacted text view (renders mask bars)
  app/components/RiskDial.tsx     Risk score gauge
  app/components/EvidenceLog.tsx  List of detected leaks (masked values only)
  app/lib/api.ts                  Backend API client + types
```

---

## Security notes

- **Nothing raw ever reaches the frontend.** The API only returns
  `masked_value` for each detected leak, never the original secret.
- **Rate limiting** on `/api/analyze` keys off the actual TCP connection
  address, not the `X-Forwarded-For` header, since nothing in this stack
  puts a trusted reverse proxy in front of the backend by default. If you
  deploy this behind a proxy you control, update
  `backend/utils/rate_limiter.py` accordingly.
- **Dependencies:** `requirements.txt` requires `fastapi>=0.136.0`, which
  pulls in a Starlette version patched against CVE-2026-48710 ("BadHost").
  After installing, you can confirm with `pip show starlette` (should be
  `>=1.0.1`).
- `/api/analyze` costs OpenAI API credits per call — the rate limiter is
  your only protection against runaway cost if this is exposed publicly.

---

## Troubleshooting

**`pip install` fails with a dependency conflict on `starlette`**
Make sure you're not manually pinning an old `fastapi==0.115.x` somewhere
alongside a newer `starlette` — they're incompatible. Use the
`fastapi>=0.136.0` floor from `requirements.txt` as-is.

**`pytest` not recognized**
Your virtual environment probably isn't active, or the install didn't run
from inside `backend/`. Confirm with `pip show pytest`; if empty, `cd` into
`backend` and re-run `pip install -r requirements.txt -r requirements-dev.txt`.
As a fallback, `python -m pytest` always works if the module is installed.

**Frontend can't reach the backend / requests fail**
Check `frontend/.env.local` has `NEXT_PUBLIC_API_URL=http://localhost:8000`
and that the backend terminal is actually running `uvicorn`. Also confirm
you're not hitting CORS — the backend's `ALLOWED_ORIGINS` env var defaults
to `http://localhost:3000`.

**`cd` into a subfolder fails / "path does not exist"**
If the project was extracted from a zip, check for an extra nested folder
(e.g. `llm-leakage-detector/llm-leakage-detector/`) before assuming a
folder is missing — `dir` (Windows) or `ls` (macOS/Linux) will show you
what's actually there.
