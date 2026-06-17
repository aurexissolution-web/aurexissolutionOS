"use client";

import { useState } from "react";
import { LabPillarFilter } from "./LabPillarFilter";
import { LabGallery } from "./LabGallery";
import { LAB_EXPLORATIONS, type LabPillar } from "@/data/lab-explorations";

export function LabExplorationsSection() {
  const [activePillar, setActivePillar] = useState<LabPillar | "all">("all");

  if (LAB_EXPLORATIONS.length === 0) return null;

  return (
    <>
      <LabPillarFilter active={activePillar} onChange={setActivePillar} />
      <LabGallery pillar={activePillar} />
    </>
  );
}
