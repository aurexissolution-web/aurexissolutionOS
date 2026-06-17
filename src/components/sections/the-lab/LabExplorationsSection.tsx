"use client";

import { useState } from "react";
import { LabPillarFilter } from "./LabPillarFilter";
import { LabGallery } from "./LabGallery";
import type { LabExploration, LabPillar } from "@/data/lab-explorations";

interface LabExplorationsSectionProps {
  explorations: LabExploration[];
  featuredCount?: number;
}

export function LabExplorationsSection({ explorations, featuredCount = 0 }: LabExplorationsSectionProps) {
  const [activePillar, setActivePillar] = useState<LabPillar | "all">("all");

  if (explorations.length === 0) return null;

  return (
    <>
      <LabPillarFilter active={activePillar} onChange={setActivePillar} explorations={explorations} />
      <LabGallery pillar={activePillar} explorations={explorations} featuredCount={featuredCount} />
    </>
  );
}
