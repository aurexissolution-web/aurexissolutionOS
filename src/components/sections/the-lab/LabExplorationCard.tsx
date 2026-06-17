"use client";

import Link from "next/link";
import { LiveStatusPill } from "./LiveStatusPill";
import {
  PILLAR_LABELS,
  TYPE_CTA_LABELS,
  TYPE_LABELS,
  type LabExploration,
} from "@/data/lab-explorations";

export function LabExplorationCard({
  exp,
  index,
}: {
  exp: LabExploration;
  index: number;
}) {
  const primaryLabel = exp.primaryCta.label || TYPE_CTA_LABELS[exp.type];

  return (
    <article className="group relative bg-[#02030A] p-8 lg:p-10 flex flex-col gap-5 transition-colors duration-300 hover:bg-white/[0.015]">
      {/* thumbnail */}
      <div className="relative aspect-[5/3] w-full overflow-hidden rounded-xl border border-white/[0.10] bg-[#0A0B12] mb-3">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none z-[2] rounded-xl"
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

      {/* pill row: PILLAR · TYPE · STATUS */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-mono text-[9.5px] uppercase tracking-[0.26em] px-2.5 py-1 rounded-full border border-white/[0.10] text-[var(--color-electric-cyan)]">
          {PILLAR_LABELS[exp.pillar]}
        </span>
        <span className="font-mono text-[9.5px] uppercase tracking-[0.26em] px-2.5 py-1 rounded-full border border-white/[0.10] text-white/65">
          {TYPE_LABELS[exp.type]}
        </span>
        <LiveStatusPill tone={exp.status.tone} label={exp.status.label} />
        <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.28em] text-white/25">
          {String(index + 2).padStart(2, "0")}
        </span>
      </div>

      {/* hook */}
      <p className="font-serif italic text-[clamp(17px,1.35vw,21px)] leading-[1.4] text-white/70 max-w-[42ch]">
        {exp.hook}
      </p>

      {/* title */}
      <h3 className="font-serif italic font-normal text-[clamp(28px,2.6vw,40px)] leading-[1.05] tracking-[-0.02em] text-white">
        {exp.title}.
      </h3>

      {/* description */}
      <p className="font-serif italic text-[15.5px] leading-[1.55] text-[#B6BCC8] max-w-[48ch]">
        {exp.description}
      </p>

      {/* CTAs */}
      <div className="flex flex-wrap gap-4 mt-auto pt-2">
        <Link
          href={exp.primaryCta.href}
          className="inline-flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.24em] text-white hover:text-[var(--color-electric-cyan)] transition-colors"
        >
          {primaryLabel} <span aria-hidden>→</span>
        </Link>
        {exp.secondaryCta && (
          <>
            <span className="text-white/15 font-mono text-[10px]" aria-hidden>
              ·
            </span>
            <Link
              href={exp.secondaryCta.href}
              className="inline-flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.24em] text-white/55 hover:text-white transition-colors"
            >
              {exp.secondaryCta.label} <span aria-hidden>↗</span>
            </Link>
          </>
        )}
      </div>

      {/* outcome */}
      <div className="flex items-baseline gap-3 pt-5 border-t border-white/[0.08]">
        <span className="font-mono text-[9.5px] uppercase tracking-[0.28em] text-white/35 shrink-0">
          Outcome
        </span>
        <span className="font-serif italic text-[14.5px] text-white/75 leading-[1.4]">
          {exp.outcome}
        </span>
      </div>

      {/* lab note teaser */}
      {exp.note && (
        <Link
          href={exp.note.href}
          className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-white/45 hover:text-[var(--color-electric-cyan)] transition-colors w-fit"
        >
          Read the lab note: {exp.note.title} <span aria-hidden>→</span>
        </Link>
      )}

      {/* hover hairline */}
      <span
        aria-hidden
        className="absolute left-8 right-8 lg:left-10 lg:right-10 bottom-0 h-px origin-left scale-x-0 transition-transform duration-[450ms] ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-x-100"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(0,240,255,0.55), transparent)",
        }}
      />
    </article>
  );
}
