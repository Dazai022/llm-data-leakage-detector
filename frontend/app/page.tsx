"use client";

import { useEffect, useRef, useState } from "react";
import { analyzePrompt, scanText, ApiError, type Leak } from "@/lib/api";
import { RiskDial } from "@/components/RiskDial";
import { EvidenceLog } from "@/components/EvidenceLog";
import { RedactedPane } from "@/components/RedactedPane";

type Mode = "scan" | "analyze";

const SCAN_PLACEHOLDER = `Paste text you suspect contains leaked data — an LLM
response, a log line, a support ticket, anything.

Example:
"Sure, here's the config: api_key: sk-proj-abc123... and
you can reach support at jane@example.com."`;

export default function Home() {
  const [mode, setMode] = useState<Mode>("scan");
  const [input, setInput] = useState("");
  const [sanitized, setSanitized] = useState("");
  const [leaks, setLeaks] = useState<Leak[]>([]);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState("Low");
  const [original, setOriginal] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [caseId, setCaseId] = useState("——");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const now = new Date();
    setCaseId(
      `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(
        now.getDate()
      ).padStart(2, "0")}-${String(now.getHours()).padStart(2, "0")}${String(
        now.getMinutes()
      ).padStart(2, "0")}`
    );
  }, []);

  function reset() {
    setSanitized("");
    setLeaks([]);
    setScore(0);
    setLevel("Low");
    setOriginal("");
    setError(null);
  }

  function switchMode(next: Mode) {
    if (next === mode) return;
    setMode(next);
    setInput("");
    reset();
  }

  // Live scan mode: debounce the request as the person types.
  useEffect(() => {
    if (mode !== "scan") return;
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!input.trim()) {
      reset();
      return;
    }

    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await scanText(input);
        setSanitized(result.sanitized_text);
        setLeaks(result.leaks_detected);
        setScore(result.risk_score);
        setLevel(result.risk_level);
      } catch (e) {
        setError(e instanceof ApiError ? e.message : "Something went wrong.");
      } finally {
        setLoading(false);
      }
    }, 450);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input, mode]);

  async function runAnalysis() {
    if (!input.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const result = await analyzePrompt(input);
      setOriginal(result.original_response);
      setSanitized(result.sanitized_response);
      setLeaks(result.leaks_detected);
      setScore(result.risk_score);
      setLevel(result.risk_level);
    } catch (e) {
      setError(e instanceof ApiError ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="shell">
      <div className="ledger">
        <div>
          <h1 className="ledger-title">Data Leakage Detector</h1>
          <div className="ledger-sub">
            Finds secrets and PII before they leave the room, then redacts them on the spot.
          </div>
        </div>
        <div className="case-id">
          CASE FILE <b>#{caseId}</b>
          <br />
          STATUS: {leaks.length > 0 ? "FLAGGED" : "CLEAR"}
        </div>
      </div>

      <div className="tabs">
        <button
          type="button"
          className="tab"
          data-active={mode === "scan"}
          onClick={() => switchMode("scan")}
        >
          Scan text
        </button>
        <button
          type="button"
          className="tab"
          data-active={mode === "analyze"}
          onClick={() => switchMode("analyze")}
        >
          Prompt an LLM
        </button>
      </div>

      <div className="panels">
        <div className="panel">
          <div className="panel-label">
            <span>{mode === "scan" ? "Intake — source text" : "Intake — prompt"}</span>
          </div>
          <textarea
            className="intake-textarea"
            placeholder={mode === "scan" ? SCAN_PLACEHOLDER : "Ask for something that might come back with realistic-looking (fake) credentials, e.g. \"give me a sample .env file for a Postgres app\"."}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          {mode === "analyze" && (
            <div className="actions">
              <button className="btn" onClick={runAnalysis} disabled={loading || !input.trim()}>
                {loading ? "Generating…" : "Generate & analyze"}
              </button>
              <span className="status-line" data-tone={error ? "error" : undefined}>
                {error || (loading ? "Calling the model, then scanning its response…" : "")}
              </span>
            </div>
          )}
          {mode === "scan" && (
            <div className="actions">
              <span className="status-line" data-tone={error ? "error" : undefined}>
                {error || (loading ? "Scanning…" : "Scans automatically as you type.")}
              </span>
            </div>
          )}
          {mode === "analyze" && original && (
            <p className="compare-note">
              Original model response is shown redacted on the right. Nothing unredacted ever
              leaves this pane.
            </p>
          )}
        </div>

        <div className="panel">
          <div className="panel-label">
            <span>Redacted copy</span>
          </div>
          <RedactedPane text={sanitized} />
        </div>
      </div>

      <div className="findings-row">
        <RiskDial score={score} level={level} />
        <EvidenceLog leaks={leaks} />
      </div>
    </main>
  );
}
