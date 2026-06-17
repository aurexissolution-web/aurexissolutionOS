"use client";

import Link from "next/link";
import { LiveStatusPill } from "./LiveStatusPill";
import {
  LAB_FEATURED,
  PILLAR_LABELS,
  TYPE_CTA_LABELS,
  TYPE_LABELS,
} from "@/data/lab-explorations";

export function LabFeaturedExploration() {
  const exp = LAB_FEATURED;
  if (!exp) return null;

  const primaryLabel = exp.primaryCta.label || TYPE_CTA_LABELS[exp.type];

  return (
    <>
      <Hairline />
      <section className="relative px-6 lg:px-12 py-20 md:py-28">
        <div className="mx-auto max-w-[1280px]">
          {/* eyebrow + pills row */}
          <div className="flex flex-wrap items-center gap-2.5 mb-8">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.32em] text-white/45">
              ★ Featured
            </span>
            <span aria-hidden className="text-white/[0.18]">
              ·
            </span>
            <span className="font-mono text-[9.5px] uppercase tracking-[0.26em] px-2.5 py-1 rounded-full border border-white/[0.10] text-[var(--color-electric-cyan)]">
              {PILLAR_LABELS[exp.pillar]}
            </span>
            <span className="font-mono text-[9.5px] uppercase tracking-[0.26em] px-2.5 py-1 rounded-full border border-white/[0.10] text-white/65">
              {TYPE_LABELS[exp.type]}
            </span>
            <LiveStatusPill tone={exp.status.tone} label={exp.status.label} />
          </div>

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* thumbnail */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-white/[0.10] bg-[#0A0B12]">
                <div
                  aria-hidden
                  className="absolute inset-0 pointer-events-none z-[2] rounded-2xl"
                  style={{
                    background:
                      "linear-gradient(140deg, rgba(0,240,255,0.10), transparent 35%, transparent 65%, rgba(91,141,255,0.06))",
                  }}
                />
                {exp.thumbnail && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={exp.thumbnail}
                    alt={exp.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
              </div>
            </div>

            {/* copy */}
            <div className="lg:col-span-7">
              <p className="font-serif italic text-[clamp(20px,1.7vw,28px)] leading-[1.4] text-white/70 mb-6">
                {exp.hook}
              </p>

              <h2 className="font-serif italic font-normal text-[clamp(40px,4.4vw,68px)] leading-[1.05] tracking-[-0.022em] text-white mb-6">
                {exp.title}.
              </h2>

              <p className="font-serif italic text-[clamp(16px,1.2vw,18.5px)] leading-[1.6] text-[#B6BCC8] max-w-[560px] mb-9">
                {exp.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 mb-9">
                <Link
                  href={exp.primaryCta.href}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-white text-[#02030A] font-mono text-[11px] uppercase tracking-[0.24em] font-semibold transition-all duration-200 hover:-translate-y-[1px] hover:shadow-[0_0_28px_rgba(0,240,255,0.4)]"
                >
                  {primaryLabel} <span aria-hidden>→</span>
                </Link>
                {exp.secondaryCta && (
                  <Link
                    href={exp.secondaryCta.href}
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full border border-white/[0.18] text-white font-mono text-[11px] uppercase tracking-[0.24em] transition-colors duration-200 hover:border-white/40"
                  >
                    {exp.secondaryCta.label} <span aria-hidden>↗</span>
                  </Link>
                )}
              </div>

              <div className="flex flex-col gap-3 pt-6 border-t border-white/[0.08]">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.28em] text-white/40">
                    Outcome
                  </span>
                  <span className="font-serif italic text-[18px] text-white/85">
                    {exp.outcome}
                  </span>
                </div>
                {exp.note && (
                  <Link
                    href={exp.note.href}
                    className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.24em] text-white/55 hover:text-[var(--color-electric-cyan)] transition-colors w-fit"
                  >
                    Read the lab note: {exp.note.title}{" "}
                    <span aria-hidden>→</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Hairline() {
  return (
    <div className="px-6 lg:px-12">
      <div className="mx-auto max-w-[1280px]">
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.14] to-transparent" />
      </div>
    </div>
  );
}
