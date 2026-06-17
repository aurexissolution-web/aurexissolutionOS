import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LabHero } from "@/components/sections/the-lab/LabHero";
import { LabFeaturedExploration } from "@/components/sections/the-lab/LabFeaturedExploration";
import { LabExplorationsSection } from "@/components/sections/the-lab/LabExplorationsSection";
import { LabNotes } from "@/components/sections/the-lab/LabNotes";
import { LabLoopNewsletter } from "@/components/sections/the-lab/LabLoopNewsletter";

export const metadata: Metadata = {
  title: "The Lab — Aurexis",
  description:
    "Working AI agents, design mockups, ecosystem blueprints, and prototypes — across web, app, AI, and full-stack ecosystems. From the Aurexis lab.",
};

export default function TheLabPage() {
  return (
    <div
      className="min-h-screen flex flex-col text-white relative"
      style={{ backgroundColor: "#02030A" }}
    >
      <Navbar />

      <div
        aria-hidden
        className="fixed inset-0 z-[1] pointer-events-none mix-blend-overlay opacity-[0.05]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.55 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
        }}
      />

      <main className="flex-1 relative z-[2]">
        <LabHero />
        <LabFeaturedExploration />
        <LabExplorationsSection />
        <LabNotes />
        <LabLoopNewsletter />
      </main>

      <Footer />
    </div>
  );
}
