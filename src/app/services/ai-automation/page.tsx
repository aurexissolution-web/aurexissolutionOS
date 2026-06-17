import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PillarHero } from "@/components/services/PillarHero";
import { PillarPain } from "@/components/services/PillarPain";
import { PillarWhatWeBuild } from "@/components/services/PillarWhatWeBuild";
import { PillarUseCases } from "@/components/services/PillarUseCases";
import { PillarProcess } from "@/components/services/PillarProcess";
import { PillarComparison } from "@/components/services/PillarComparison";
import { PillarFAQ } from "@/components/services/PillarFAQ";
import { PillarClosingCTA } from "@/components/services/PillarClosingCTA";
import { PILLARS } from "@/data/pillars";

export const metadata: Metadata = {
  title: "AI Agents & Automation Malaysia — Aurexis",
  description:
    "Custom AI receptionists, internal copilots, automation agents. Built on Claude. Trained on your business. RM 15-60k.",
};

export default function AiAutomationPage() {
  const pillar = PILLARS["ai-automation"];

  return (
    <div
      className="min-h-screen flex flex-col text-white"
      style={{ backgroundColor: "#02030A" }}
    >
      <Navbar />

      {/* fine grain — premium photographic feel */}
      <div
        aria-hidden
        className="fixed inset-0 z-[1] pointer-events-none mix-blend-overlay opacity-[0.05]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.55 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
        }}
      />

      <main className="flex-1 relative z-[2]">
        <PillarHero pillar={pillar} />
        <PillarPain pillar={pillar} />
        <PillarWhatWeBuild pillar={pillar} />
        <PillarUseCases pillar={pillar} />
        <PillarProcess pillar={pillar} />
        <PillarComparison pillar={pillar} />
        <PillarFAQ pillar={pillar} />
        <PillarClosingCTA pillar={pillar} />
      </main>

      <Footer />
    </div>
  );
}
