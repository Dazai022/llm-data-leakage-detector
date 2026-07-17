const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export interface Leak {
  type: string;
  masked_value: string;
  risk: string;
  method?: string;
}

export interface ScanResult {
  sanitized_text: string;
  leaks_detected: Leak[];
  risk_score: number;
  risk_level: string;
}

export interface AnalyzeResult {
  original_response: string;
  sanitized_response: string;
  leaks_detected: Leak[];
  risk_score: number;
  risk_level: string;
}

class ApiError extends Error {}

async function post<T>(path: string, body: unknown): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${API_BASE}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    throw new ApiError(
      `Can't reach the backend at ${API_BASE}. Is it running?`
    );
  }

  if (!res.ok) {
    const detail = await res.json().catch(() => null);
    throw new ApiError(detail?.detail || `Request failed (${res.status})`);
  }

  return res.json();
}

export function scanText(text: string): Promise<ScanResult> {
  return post<ScanResult>("/api/scan", { text });
}

export function analyzePrompt(prompt: string): Promise<AnalyzeResult> {
  return post<AnalyzeResult>("/api/analyze", { prompt });
}

export { ApiError };
