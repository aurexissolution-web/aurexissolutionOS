"use client";

import { cn } from "@/lib/utils";
import {
  LAB_EXPLORATIONS,
  PILLAR_LABELS,
  type LabPillar,
} from "@/data/lab-explorations";

const PILLARS: ("all" | LabPillar)[] = [
  "all",
  "ecosystem",
  "ai",
  "web",
  "app",
];

export function LabPillarFilter({
  active,
  onChange,
}: {
  active: LabPillar | "all";
  onChange: (p: LabPillar | "all") => void;
}) {
  const counts: Record<"all" | LabPillar, number> = {
    all: LAB_EXPLORATIONS.length,
    ecosystem: LAB_EXPLORATIONS.filter((e) => e.pillar === "ecosystem").length,
    ai: LAB_EXPLORATIONS.filter((e) => e.pillar === "ai").length,
    web: LAB_EXPLORATIONS.filter((e) => e.pillar === "web").length,
    app: LAB_EXPLORATIONS.filter((e) => e.pillar === "app").length,
  };

  return (
    <div className="sticky top-[72px] z-30 bg-[#02030A]/85 backdrop-blur-md border-b border-white/[0.06]">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-12 py-4 flex flex-wrap items-center gap-2.5">
        {PILLARS.map((pillar) => {
          const isActive = pillar === active;
          const label = pillar === "all" ? "All" : PILLAR_LABELS[pillar];
          const count = counts[pillar];
          return (
            <button
              key={pillar}
              type="button"
              onClick={() => onChange(pillar)}
              aria-pressed={isActive}
              className={cn(
                "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full font-mono text-[10.5px] uppercase tracking-[0.26em] transition-all duration-200 border",
                isActive
                  ? "bg-[var(--color-electric-cyan)] text-[#02030A] border-[var(--color-electric-cyan)]"
                  : "bg-transparent border-[var(--color-electric-cyan)]/40 text-[var(--color-electric-cyan)] hover:border-[var(--color-electric-cyan)]/80 hover:bg-[var(--color-electric-cyan)]/[0.04]",
              )}
            >
              <span>{label}</span>
              <span
                className={cn(
                  "text-[9px] tabular-nums",
                  isActive ? "text-[#02030A]/55" : "text-white/40",
                )}
              >
                ({count})
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
