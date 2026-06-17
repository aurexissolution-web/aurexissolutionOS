"use client";

export function LiveStatusPill({
  tone,
  label,
}: {
  tone: "live" | "build";
  label: string;
}) {
  const isLive = tone === "live";
  const dotColor = isLive ? "#10B981" : "#F59E0B";
  const ringColor = isLive
    ? "rgba(16,185,129,0.35)"
    : "rgba(245,158,11,0.35)";

  return (
    <span
      className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-white/[0.10] bg-white/[0.02] font-mono text-[10.5px] uppercase tracking-[0.26em] text-white/85"
      aria-label={label}
    >
      <span className="relative flex h-2 w-2" aria-hidden>
        <span
          className="lab-status-ping absolute inline-flex h-full w-full rounded-full opacity-75"
          style={{ backgroundColor: dotColor }}
        />
        <span
          className="relative inline-flex h-2 w-2 rounded-full"
          style={{
            backgroundColor: dotColor,
            boxShadow: `0 0 8px ${ringColor}`,
          }}
        />
      </span>
      {label}
      <style>{`
        @keyframes labStatusPing {
          75%, 100% { transform: scale(2.4); opacity: 0; }
        }
        @media (prefers-reduced-motion: no-preference) {
          .lab-status-ping { animation: labStatusPing 2s cubic-bezier(0,0,0.2,1) infinite; }
        }
      `}</style>
    </span>
  );
}
