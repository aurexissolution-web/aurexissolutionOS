import { cn } from "@/lib/utils";

export function ServicesMasthead() {
  return (
    <header className="relative pt-[180px] pb-[130px] border-b border-white/10">
      {/* top-rule */}
      <div className="absolute top-[110px] left-0 right-0 grid grid-cols-[auto_1fr_auto] items-center gap-6 font-mono text-[10.5px] uppercase tracking-[0.24em] text-[#6B7588]">
        <span className="text-[var(--color-electric-cyan)] inline-flex items-center gap-2 before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:bg-[var(--color-electric-cyan)] before:shadow-[0_0_10px_var(--color-electric-cyan)] before:[animation:services-pulse-soft_1.6s_ease-in-out_infinite] services-anim-pulse-soft">
          Live · 2026.05.01
        </span>
        <div className="h-px bg-white/[0.18]" />
        <span>Dispatch № 05 · Vol. I · The Capabilities Issue</span>
      </div>

      {/* headline */}
      <h1
        className={cn(
          "font-serif italic text-[clamp(72px,14vw,220px)] leading-[0.92] tracking-[-0.035em] text-white",
          "[text-shadow:0_2px_40px_rgba(0,0,0,0.5)]",
        )}
        style={{ marginLeft: "-0.04em" }}
      >
        What we build,
        <br />
        <span
          className="bg-clip-text text-transparent"
          style={{
            backgroundImage:
              "linear-gradient(110deg, #00F0FF 0%, #5B8DFF 45%, #8B5CF6 90%)",
            filter: "drop-shadow(0 0 36px rgba(0,240,255,0.35))",
          }}
        >
          in detail.
        </span>
      </h1>

      {/* meta-grid */}
      <div className="grid grid-cols-12 gap-8 mt-[84px] items-end">
        <dl className="col-span-5 font-mono text-[11px] uppercase tracking-[0.18em] text-[#6B7588] leading-[2] space-y-0">
          <Row k="Editor" v="Aurexis Solution" />
          <Row k="Edition" v="05 · 2026.05.01" />
          <Row k="Filed under" v="Capabilities · Architecture" />
          <Row k="Surfaces" v="04 — Ecosystem · AI · Web · Mobile" />
        </dl>
        <p className="col-start-7 col-span-6 text-[19px] text-[#B7BFCC] leading-[1.6] max-w-[580px]">
          <span className="float-left font-serif italic text-[84px] leading-[0.8] pr-3.5 pt-1.5 text-white">
            W
          </span>
          e don&apos;t sell packages, and we don&apos;t sell tiers. We architect{" "}
          <em className="font-serif italic text-white text-[22px]">
            custom ecosystems
          </em>{" "}
          — four disciplines, one accountable team, and a refusal to ship a template where a system is needed. What follows is not a brochure. It&apos;s a record of how we work.
        </p>
      </div>
    </header>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex gap-[18px]">
      <dt className="text-white w-[110px]">{k}</dt>
      <dd>{v}</dd>
    </div>
  );
}
