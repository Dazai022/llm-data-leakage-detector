"use client";

const LEVEL_COLOR: Record<string, string> = {
  Critical: "var(--critical)",
  High: "var(--high)",
  Medium: "var(--medium)",
  Low: "var(--low)",
};

export function RiskDial({
  score,
  level,
}: {
  score: number;
  level: string;
}) {
  const clamped = Math.max(0, Math.min(100, score));
  // Needle sweeps from -120deg (0) to 120deg (100) across the dial face.
  const angle = -120 + (clamped / 100) * 240;
  const color = LEVEL_COLOR[level] || "var(--ink-soft)";

  const ticks = Array.from({ length: 5 }, (_, i) => -120 + (i / 4) * 240);

  return (
    <div className="dial-card">
      <svg viewBox="0 0 160 110" width="100%" height="auto" role="img" aria-label={`Risk score ${clamped} out of 100, ${level}`}>
        <path
          d="M 20 95 A 60 60 0 1 1 140 95"
          fill="none"
          stroke="var(--hairline-strong)"
          strokeWidth="8"
          strokeLinecap="round"
        />
        {ticks.map((t, i) => {
          const rad = (t * Math.PI) / 180;
          const x1 = 80 + Math.sin(rad) * 52;
          const y1 = 95 - Math.cos(rad) * 52;
          const x2 = 80 + Math.sin(rad) * 62;
          const y2 = 95 - Math.cos(rad) * 62;
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="var(--ink-soft)"
              strokeWidth="2"
            />
          );
        })}
        <g style={{ transform: `rotate(${angle}deg)`, transformOrigin: "80px 95px", transition: "transform 0.5s cubic-bezier(.2,.8,.2,1)" }}>
          <line x1="80" y1="95" x2="80" y2="42" stroke={color} strokeWidth="3" strokeLinecap="round" />
        </g>
        <circle cx="80" cy="95" r="5.5" fill={color} />
      </svg>
      <div className="dial-level" style={{ color }}>
        {level.toUpperCase()}
      </div>
      <div className="dial-score">{clamped} / 100</div>
    </div>
  );
}
