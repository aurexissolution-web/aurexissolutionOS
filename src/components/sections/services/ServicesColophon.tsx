import Link from "next/link";

export function ServicesColophon() {
  return (
    <footer className="grid grid-cols-1 md:grid-cols-[1fr_auto] items-center gap-8 md:gap-12 pt-[90px] md:pt-[130px] pb-[100px] md:pb-[160px] border-t border-white/[0.07] mt-16">
      <div>
        <div className="inline-flex items-center gap-2.5 mb-5 font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--color-electric-cyan)] before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:bg-[var(--color-electric-cyan)] before:shadow-[0_0_10px_var(--color-electric-cyan)]">
          Architect with us
        </div>
        <h3 className="font-serif italic font-normal text-[clamp(36px,4.2vw,60px)] leading-[1.12] tracking-[-0.025em] text-white mb-5 max-w-[880px]">
          Tell us what you&apos;re building.
          <br className="hidden md:block" />
          {" "}We&apos;ll tell you what it actually needs.
        </h3>
        <p className="text-[#C4CCD9] text-[16px] leading-[1.7] max-w-[540px]">
          A 45-minute architecture review with a partner. No deck, no pitch — just a working session on the system you&apos;re trying to ship.
        </p>
      </div>
      <div className="flex flex-col md:items-end items-start gap-3.5 md:text-right">
        <Link
          href="/contact"
          className="inline-flex items-center gap-3.5 px-7 py-4 rounded-full bg-white text-[#02030A]
                     font-mono text-[12px] uppercase tracking-[0.22em] font-semibold
                     transition-all duration-[250ms]
                     hover:-translate-y-px hover:shadow-[0_14px_36px_rgba(0,240,255,0.18)]"
        >
          Book a discovery <span>→</span>
        </Link>
        <div className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-[#8E96A6]">
          NDA-protected · Free · 45 min
        </div>
      </div>
    </footer>
  );
}
