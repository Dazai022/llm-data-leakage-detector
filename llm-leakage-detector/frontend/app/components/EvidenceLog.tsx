"use client";

import type { Leak } from "@/lib/api";

const TYPE_LABEL: Record<string, string> = {
  api_key: "API key",
  email: "Email",
  password: "Password",
  secret_key: "Secret key",
  token: "Token",
  credit_card: "Credit card",
  ssn: "SSN",
  ip_address: "IP address",
  phone_number: "Phone number",
  database_url: "Database URL",
  high_entropy_string: "High-entropy string",
  pii: "Personal info",
};

function riskKey(risk: string) {
  return risk.toLowerCase();
}

export function EvidenceLog({ leaks }: { leaks: Leak[] }) {
  return (
    <div className="log-card">
      <div className="log-header">Evidence log — {leaks.length} item{leaks.length === 1 ? "" : "s"}</div>
      {leaks.length === 0 ? (
        <div className="log-empty">No leaks found yet. Nothing to redact.</div>
      ) : (
        leaks.map((leak, i) => (
          <div className="log-row" key={`${leak.type}-${i}`}>
            <span className="stamp-badge" data-risk={riskKey(leak.risk)}>
              {leak.risk}
            </span>
            <span>
              <span className="log-type">{TYPE_LABEL[leak.type] || leak.type}</span>
              <span className="log-value font-mono">{leak.masked_value}</span>
            </span>
            <span className="log-method">{leak.method || ""}</span>
          </div>
        ))
      )}
    </div>
  );
}
