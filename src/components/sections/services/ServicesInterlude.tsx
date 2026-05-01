export function ServicesInterlude() {
  return (
    <section className="relative py-[140px] text-center border-b border-white/10">
      <span
        aria-hidden
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl text-[var(--color-electric-cyan)] bg-[var(--color-background,#030408)] px-4 leading-none"
        style={{ textShadow: "0 0 14px var(--color-electric-cyan)" }}
      >
        ·
      </span>
      <blockquote className="font-serif italic font-normal text-[clamp(34px,4.4vw,60px)] leading-[1.18] tracking-[-0.02em] text-white max-w-[1080px] mx-auto [text-shadow:0_2px_30px_rgba(0,0,0,0.4)]">
        <span
          className="text-[var(--color-electric-cyan)]"
          style={{ textShadow: "0 0 22px rgba(0,240,255,0.4)" }}
        >
          &ldquo;
        </span>
        The agencies that win the next decade won&apos;t ship sites — they&apos;ll ship systems that operate themselves.
        <span
          className="text-[var(--color-electric-cyan)]"
          style={{ textShadow: "0 0 22px rgba(0,240,255,0.4)" }}
        >
          &rdquo;
        </span>
      </blockquote>
      <div className="inline-flex items-center gap-3.5 mt-[38px] font-mono text-[11px] uppercase tracking-[0.28em] text-[#6B7588] before:content-[''] before:w-8 before:h-px before:bg-white/[0.18] after:content-[''] after:w-8 after:h-px after:bg-white/[0.18]">
        Internal Manifesto · 2025
      </div>
    </section>
  );
}
