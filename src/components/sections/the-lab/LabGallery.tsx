"use client";

import { LabExplorationCard } from "./LabExplorationCard";
import {
  LAB_EXPLORATIONS,
  LAB_FEATURED,
  type LabPillar,
} from "@/data/lab-explorations";

export function LabGallery({ pillar }: { pillar: LabPillar | "all" }) {
  const filtered =
    pillar === "all"
      ? LAB_EXPLORATIONS
      : LAB_EXPLORATIONS.filter((e) => e.pillar === pillar);

  if (filtered.length === 0) {
    return (
      <section className="relative px-6 lg:px-12 py-20 md:py-28 border-t border-white/[0.08]">
        <div className="mx-auto max-w-[1280px] text-center">
          <p className="font-serif italic text-[clamp(16px,1.2vw,18px)] leading-[1.55] text-[#B6BCC8]">
            No explorations match this filter yet.
          </p>
        </div>
      </section>
    );
  }

  const totalVisible = LAB_EXPLORATIONS.length + (LAB_FEATURED ? 1 : 0);

  return (
    <section className="relative px-6 lg:px-12 py-20 md:py-28 border-t border-white/[0.08]">
      <div className="mx-auto max-w-[1280px]">
        <div className="flex items-baseline justify-between mb-12 md:mb-16 flex-wrap gap-4">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.32em] text-white/45">
            ◇ All Explorations · 02 / 06
          </p>
          <span className="font-mono text-[10.5px] uppercase tracking-[0.28em] text-white/35">
            {filtered.length} of {totalVisible}{" "}
            {pillar === "all" ? "currently visible" : "in this pillar"}
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-white/[0.06] border border-white/[0.06] rounded-2xl overflow-hidden">
          {filtered.map((exp, i) => (
            <LabExplorationCard key={exp.slug} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
