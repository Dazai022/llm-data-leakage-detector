# Data Leakage Detector — Frontend

Next.js (App Router) UI for the backend in `../backend`.

## Setup

```bash
npm install
cp .env.local.example .env.local   # points at the backend, defaults to http://localhost:8000
npm run dev
```

Runs on http://localhost:3000. Make sure the backend is running first
(`uvicorn main:app --reload` from `../backend`, default port 8000) — the
backend's CORS config only allows `http://localhost:3000`.

## What's here

- **Scan text** tab — calls `POST /api/scan`, debounced as you type. No LLM call,
  just the detector pipeline.
- **Prompt an LLM** tab — calls `POST /api/analyze`, which sends your prompt to
  OpenAI, then runs the same detector pipeline on the model's response.

Both show a live redacted copy, a risk dial, and an evidence log of everything
detected (type, masked value, risk level, detection method).

## Notes

- The redaction bars in the output pane are rendered client-side: the backend
  masks values with literal asterisk runs (`sk-p****90`, `********`, etc.), and
  `components/RedactedPane.tsx` turns those runs into solid black bars instead
  of showing literal asterisks.
- No sensitive values are stored anywhere - everything lives in React state for
  the current session only.
