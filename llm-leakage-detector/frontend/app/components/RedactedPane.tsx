"use client";

import { Fragment } from "react";

// The backend masks values with literal asterisk runs (e.g. "sk-p****90",
// "********", or the shorter "**" run in "***-**-6789" for SSNs). Rather
// than showing asterisks, render those runs as solid black redaction bars
// - the visual signature of this tool. Threshold is 2+ (not 3+) so the
// short "**" segment in masked SSNs/phone numbers becomes a bar too,
// instead of leaking through as literal asterisk characters.
function renderRedacted(text: string) {
  const parts = text.split(/(\*{2,})/g);
  return parts.map((part, i) => {
    if (/^\*{2,}$/.test(part)) {
      return (
        <span
          key={i}
          className="bar"
          style={{ width: `${part.length}ch` }}
          aria-label="redacted"
        />
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

export function RedactedPane({ text }: { text: string }) {
  if (!text) {
    return <div className="redacted-pane empty">Redacted copy will appear here.</div>;
  }
  return <div className="redacted-pane">{renderRedacted(text)}</div>;
}
