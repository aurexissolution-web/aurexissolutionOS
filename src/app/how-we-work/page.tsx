import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "How We Work — Aurexis Solution",
  description:
    "From discovery to retainer — the five-step Aurexis process. Scoped up front, demoed weekly, locked timelines, and no development hell.",
};

export default function HowWeWorkPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <section className="relative px-6 pt-36 pb-4 text-center">
          <div className="mx-auto max-w-3xl">
            <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.28em] text-white/40 mb-4">
              Our Process
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.02em] leading-[1.05] text-white text-balance mb-5">
              A process you can{" "}
              <em
                className="font-serif italic font-normal text-[var(--color-electric-cyan)]"
                style={{ filter: "drop-shadow(0 0 18px rgba(0,240,255,0.32))" }}
              >
                actually see.
              </em>
            </h1>
            <p className="mx-auto max-w-xl text-[16px] leading-[1.6] text-white/55 text-balance">
              No black boxes, no surprise invoices. Every engagement runs the same
              five steps — scoped up front, demoed weekly, and yours to cancel any time.
            </p>
          </div>
        </section>

        <ProcessTimeline />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
