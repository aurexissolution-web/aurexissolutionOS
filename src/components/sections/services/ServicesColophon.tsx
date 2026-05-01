import Link from "next/link";

export function ServicesColophon() {
  return (
    <footer className="relative pt-[200px] pb-[220px] text-center">
      <div
        aria-hidden
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[280px] h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--color-electric-cyan), transparent)",
        }}
      />
      <div className="font-serif italic text-[clamp(56px,8vw,112px)] leading-none tracking-[-0.03em] text-white mb-7">
        <span
          className="bg-clip-text text-transparent"
          style={{
            backgroundImage:
              "linear-gradient(120deg, #00F0FF 0%, #5B8DFF 60%, #8B5CF6 100%)",
            filter: "drop-shadow(0 0 28px rgba(0,240,255,0.35))",
          }}
        >
          Fin.
        </span>
      </div>
      <h3 className="font-serif italic font-normal text-[clamp(34px,4vw,56px)] leading-[1.2] tracking-[-0.02em] text-white mb-7 max-w-[900px] mx-auto">
        Tell us what you&apos;re building.
        <br />
        We&apos;ll tell you what it actually needs.
      </h3>
      <p className="text-[#B7BFCC] text-[17px] leading-[1.75] max-w-[580px] mx-auto mb-14">
        A 45-minute architecture review with a partner. No deck, no pitch — just a working session on the system you&apos;re trying to ship. NDA-protected and free.
      </p>
      <Link
        href="/contact"
        className="group inline-flex items-center gap-3.5 font-mono text-xs uppercase tracking-[0.26em] text-white border-b border-[var(--color-electric-cyan)] pb-2.5 transition-[gap] duration-200 hover:gap-5"
      >
        Book a discovery
        <span className="text-[var(--color-electric-cyan)]">→</span>
      </Link>
      <div className="mt-[84px] font-mono text-[11px] uppercase tracking-[0.24em] text-[#6B7588]">
        — <span className="text-[#B7BFCC]">Aurexis Solution</span> · Sungai Petani · Built in Malaysia · 2026
      </div>
    </footer>
  );
}
