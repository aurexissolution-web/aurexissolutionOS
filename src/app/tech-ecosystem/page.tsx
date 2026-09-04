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
  title: "Tech Ecosystem — Aurexis Solution",
  description:
    "Explore the six connected capabilities Aurexis combines to build business systems: Presence, Flow, Core, Connect, Data Foundation and Intelligence.",
};

function CapabilityAnchors() {
  return (
    <section
      aria-labelledby="tech-ecosystem-capabilities"
      className="relative border-y border-white/[0.08] bg-white/[0.015] px-6 py-16"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1fr] lg:items-end">
          <div>
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.26em] text-[var(--color-electric-cyan)]/75">
              Tech Ecosystem
            </span>
            <h2
              id="tech-ecosystem-capabilities"
              className="mt-4 text-3xl font-extrabold leading-[1.05] tracking-[-0.02em] text-white md:text-5xl"
            >
              Six connected capabilities. Combined around the business.
            </h2>
          </div>
          <p className="max-w-xl text-[15px] leading-[1.7] text-white/55">
            These are not separate products. They are operating layers Aurexis selects and combines according to what the business actually needs.
          </p>
        </div>

        <div className="mt-10 grid gap-px overflow-hidden rounded-[24px] border border-white/[0.08] bg-white/[0.08] md:grid-cols-2 lg:grid-cols-3">
          <a id="presence" href="#presence" className="group scroll-mt-28 bg-[#05070d] p-5 transition hover:bg-[#061016] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-electric-cyan)]/60">
            <span className="font-mono text-[11px] tracking-[0.22em] text-[var(--color-electric-cyan)]/75">01</span>
            <h3 className="mt-3 text-lg font-semibold text-white">Presence</h3>
            <p className="mt-2 text-[13.5px] leading-relaxed text-white/55">Digital experiences where customers meet the business.</p>
          </a>
          <a id="flow" href="#flow" className="group scroll-mt-28 bg-[#05070d] p-5 transition hover:bg-[#061016] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-electric-cyan)]/60">
            <span className="font-mono text-[11px] tracking-[0.22em] text-[var(--color-electric-cyan)]/75">02</span>
            <h3 className="mt-3 text-lg font-semibold text-white">Flow</h3>
            <p className="mt-2 text-[13.5px] leading-relaxed text-white/55">Workflows and automation that keep work moving.</p>
          </a>
          <a id="core" href="#core" className="group scroll-mt-28 bg-[#05070d] p-5 transition hover:bg-[#061016] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-electric-cyan)]/60">
            <span className="font-mono text-[11px] tracking-[0.22em] text-[var(--color-electric-cyan)]/75">03</span>
            <h3 className="mt-3 text-lg font-semibold text-white">Core</h3>
            <p className="mt-2 text-[13.5px] leading-relaxed text-white/55">Operational systems where the business comes together.</p>
          </a>
          <a id="connect" href="#connect" className="group scroll-mt-28 bg-[#05070d] p-5 transition hover:bg-[#061016] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-electric-cyan)]/60">
            <span className="font-mono text-[11px] tracking-[0.22em] text-[var(--color-electric-cyan)]/75">04</span>
            <h3 className="mt-3 text-lg font-semibold text-white">Connect</h3>
            <p className="mt-2 text-[13.5px] leading-relaxed text-white/55">Integrations that let systems work together.</p>
          </a>
          <a id="data-foundation" href="#data-foundation" className="group scroll-mt-28 bg-[#05070d] p-5 transition hover:bg-[#061016] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-electric-cyan)]/60">
            <span className="font-mono text-[11px] tracking-[0.22em] text-[var(--color-electric-cyan)]/75">05</span>
            <h3 className="mt-3 text-lg font-semibold text-white">Data Foundation™</h3>
            <p className="mt-2 text-[13.5px] leading-relaxed text-white/55">Reliable, structured information beneath the operation.</p>
          </a>
          <a id="intelligence" href="#intelligence" className="group scroll-mt-28 bg-[#05070d] p-5 transition hover:bg-[#061016] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-electric-cyan)]/60">
            <span className="font-mono text-[11px] tracking-[0.22em] text-[var(--color-electric-cyan)]/75">06</span>
            <h3 className="mt-3 text-lg font-semibold text-white">Intelligence</h3>
            <p className="mt-2 text-[13.5px] leading-relaxed text-white/55">AI, analytics and intelligent capabilities where they create value.</p>
          </a>
        </div>
      </div>
    </section>
  );
}

export default function TechEcosystemPage() {
  return (
    <div
      className="flex min-h-screen flex-col text-white"
      style={{ backgroundColor: "#02030A" }}
    >
      <Navbar />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[1] mix-blend-overlay opacity-[0.05]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.55 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
        }}
      />
      <main className="relative z-[2] flex-1">
        <EcosystemFlagshipHero />
        <CapabilityAnchors />
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
