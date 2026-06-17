import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { EcosystemFlagshipHero } from "@/components/sections/services/EcosystemFlagshipHero";
import { ThePainWeSolve } from "@/components/sections/services/ThePainWeSolve";
import { WhatWeBuild } from "@/components/sections/services/WhatWeBuild";
import { UseCases } from "@/components/sections/services/UseCases";
import { Process } from "@/components/sections/services/Process";
import { WhyEcosystem } from "@/components/sections/services/WhyEcosystem";
import { FAQ } from "@/components/sections/services/FAQ";
import { ClosingCTA } from "@/components/sections/services/ClosingCTA";

export const metadata: Metadata = {
  title: "Ecosystem · The Flagship — Aurexis",
  description:
    "Website, operations app, AI agents, and integrations — designed together, built together, running together. The full Aurexis ecosystem.",
};

export default function EcosystemPage() {
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
        <EcosystemFlagshipHero />
        <ThePainWeSolve />
        <WhatWeBuild />
        <UseCases />
        <Process />
        <WhyEcosystem />
        <FAQ />
        <ClosingCTA />
      </main>

      <Footer />
    </div>
  );
}
