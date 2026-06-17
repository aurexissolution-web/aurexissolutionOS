import { BackgroundBeams } from "@/components/ui/background-beams";

export function BlogHero({ entryCount = 0 }: { entryCount?: number } = {}) {
  return (
    <section className="relative bg-black overflow-hidden">
      {/* atmospheric beams — masked to fade out near the bottom rule */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          maskImage:
            "linear-gradient(180deg, black 0%, black 70%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(180deg, black 0%, black 70%, transparent 100%)",
        }}
      >
        <BackgroundBeams />
      </div>

      <div className="relative mx-auto max-w-[1180px] px-6 lg:px-10 pt-32 pb-16 lg:pt-40 lg:pb-24">
        {/* top rule */}
        <div className="flex items-center justify-between gap-6 pb-7 border-b border-white/[0.18]">
          <div className="font-mono text-[10.5px] uppercase tracking-[0.32em] text-white/55">
            Engineering Journal
          </div>
          <div className="hidden md:block font-mono text-[10.5px] uppercase tracking-[0.28em] text-white/40">
            Aurexis Solution · Kuala Lumpur
          </div>
          <div className="font-mono text-[10.5px] uppercase tracking-[0.28em] text-white/85">
            Issue 04 · May 2026
          </div>
        </div>

        {/* wordmark */}
        <h1 className="mt-12 lg:mt-16 font-serif italic font-normal leading-[0.85] tracking-[-0.045em] text-white text-[clamp(80px,14vw,220px)] text-center">
          The{" "}
          <span
            style={{
              fontStyle: "italic",
              color: "transparent",
              WebkitTextStroke: "1.4px rgba(255,255,255,0.92)",
            }}
          >
            Intel
          </span>
          .
        </h1>

        {/* bottom rule + tagline */}
        <div className="mt-12 lg:mt-16 pt-7 border-t border-white/[0.18] flex flex-col md:flex-row items-start md:items-center md:justify-between gap-5">
          <p className="font-serif italic text-[clamp(17px,1.45vw,22px)] leading-[1.5] text-[#C8CDD7] max-w-[640px]">
            Tactical writing on AI ecosystems, LHDN compliance, and the work of
            building software for Malaysian businesses.
          </p>
          <div className="font-mono text-[10.5px] uppercase tracking-[0.32em] text-white/45 whitespace-nowrap">
            Vol. 04 · {currentMonth()} ·{" "}
            {entryCount === 0
              ? "first issue soon"
              : `${String(entryCount).padStart(2, "0")} entries`}
          </div>
        </div>
      </div>
    </section>
  );
}

function currentMonth(): string {
  return new Date()
    .toLocaleDateString("en-GB", { month: "short", year: "numeric" })
    .toUpperCase();
}
