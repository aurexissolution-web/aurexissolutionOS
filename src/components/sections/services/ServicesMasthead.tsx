export function ServicesMasthead() {
  return (
    <header className="grid grid-cols-1 md:grid-cols-[1fr_auto] items-end gap-8 md:gap-14 pt-[80px] md:pt-[110px] pb-[60px] md:pb-[90px] border-b border-white/[0.07]">
      <div>
        <div className="flex items-center gap-3.5 flex-wrap mb-7 font-mono text-[11px] uppercase tracking-[0.24em] text-[#8E96A6]">
          <span className="inline-flex items-center gap-2 text-[var(--color-electric-cyan)] before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:bg-[var(--color-electric-cyan)] before:shadow-[0_0_10px_var(--color-electric-cyan)]">
            Live · 2026.05.01
          </span>
          <span className="text-white/[0.14]">·</span>
          <span>Capabilities Roster · 04 of 04</span>
        </div>
        <h1 className="font-serif italic font-normal text-[clamp(48px,6vw,88px)] leading-[0.98] tracking-[-0.025em] text-white max-w-[920px]">
          What we build,{" "}
          <em
            style={{
              fontStyle: "italic",
              backgroundImage:
                "linear-gradient(110deg, #00F0FF 0%, #5B8DFF 50%, #C4B5FD 95%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              filter: "drop-shadow(0 0 18px rgba(0,240,255,0.25))",
            }}
          >
            in detail.
          </em>
        </h1>
      </div>
      <p className="md:max-w-[380px] md:text-right text-[15px] text-[#C4CCD9] leading-[1.65]">
        Four disciplines.{" "}
        <em className="font-serif italic text-white text-[17px]">
          One accountable team.
        </em>{" "}
        No packages, no tiers — just precision-built systems for founders who&apos;ve outgrown templates.
      </p>
    </header>
  );
}
