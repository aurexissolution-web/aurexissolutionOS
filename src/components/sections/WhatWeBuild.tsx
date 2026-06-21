"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type ComponentOffering = {
  number: string;
  title: string;
  description: string;
  href: string;
};

const components: ComponentOffering[] = [
  {
    number: "02",
    title: "AI Workflows",
    description:
      "Custom agents that automate the repetitive judgment calls. Slot into your stack or run standalone.",
    href: "/services/ai-automation",
  },
  {
    number: "03",
    title: "Web Platforms",
    description:
      "High-performance Next.js web platforms — marketing sites, customer portals, internal tools.",
    href: "/services/web-engineering",
  },
  {
    number: "04",
    title: "Mobile Apps",
    description:
      "iOS and Android apps that ship and stay shipped. React Native ecosystems with backends that talk.",
    href: "/services/mobile-ecosystems",
  },
  {
    number: "05",
    title: "Data Pipelines",
    description:
      "Centralize your data, then surface it in dashboards that update themselves. Stripe + CRM + spreadsheets → one source of truth.",
    href: "/services/data-engineering",
  },
];

export function WhatWeBuild() {
  return (
    <section className="bg-[var(--color-background)] pt-12 pb-16 px-6">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mx-auto max-w-3xl text-center mb-10"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.28em] text-white/40 mb-5">
            What We Build
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.02em] leading-[1.05] text-white text-balance mb-6">
            Pick the{" "}
            <em
              className="font-serif italic text-[var(--color-electric-cyan)] font-normal"
              style={{ filter: "drop-shadow(0 0 18px rgba(0,240,255,0.32))" }}
            >
              layer
            </em>{" "}
            you need first.
          </h2>
          <p className="mx-auto max-w-2xl text-[15px] md:text-[16px] leading-[1.6] text-white/55 text-balance">
            Some clients want the whole system. Others want one piece. Start where the pain is loudest.
          </p>
        </motion.div>

        <motion.div
          className="relative mx-auto max-w-6xl mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 blur-3xl opacity-50"
            style={{
              background:
                "radial-gradient(60% 60% at 50% 50%, rgba(0,240,255,0.13), transparent 70%)",
            }}
          />

          <div
            className="relative rounded-[20px] border border-white/[0.08] bg-white/[0.025] backdrop-blur-md p-8 lg:p-12 overflow-hidden"
            style={{
              boxShadow:
                "0 0 60px rgba(0,240,255,0.10), 0 8px 32px rgba(0,0,0,0.4)",
            }}
          >
            <motion.div
              aria-hidden
              className="absolute top-0 left-0 right-0 h-px bg-[var(--color-electric-cyan)]/60 origin-left"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
            />

            <div className="grid lg:grid-cols-[1.5fr_1fr] gap-8 lg:gap-12 items-center">
              <div>
                <div className="flex items-baseline gap-3 mb-5">
                  <span
                    aria-hidden
                    className="font-serif italic text-2xl leading-none text-white/15 select-none"
                  >
                    01
                  </span>
                  <span className="flex items-baseline gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/55">
                    <span aria-hidden className="text-[var(--color-electric-cyan)]/70 select-none">
                      ──
                    </span>
                    <span>Flagship</span>
                  </span>
                </div>

                <h3 className="text-4xl md:text-5xl font-extrabold tracking-[-0.02em] leading-[1.05] mb-5">
                  <em
                    className="font-serif italic text-[var(--color-electric-cyan)] font-normal"
                    style={{ filter: "drop-shadow(0 0 18px rgba(0,240,255,0.32))" }}
                  >
                    Ecosystem
                  </em>
                </h3>

                <p className="text-[15px] md:text-[17px] leading-[1.6] text-white/65 max-w-lg">
                  The full system: front door, operations, AI agents, glue. Designed and shipped as one coordinated stack — replace four disconnected vendors with one accountable team.
                </p>
              </div>

              <div className="flex flex-col gap-5 lg:items-start">
                <Link
                  href="/services/ecosystem"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-black text-[15px] font-semibold transition-all hover:-translate-y-0.5 shadow-[0_4px_14px_rgba(0,0,0,0.25),0_0_24px_rgba(0,240,255,0.18)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.3),0_0_32px_rgba(0,240,255,0.28)] w-fit"
                >
                  Explore the ecosystem
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mx-auto max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {components.map((c, i) => (
            <motion.article
              key={c.number}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.08, ease: "easeOut" }}
              className="group flex flex-col rounded-[16px] border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm p-6 lg:p-7 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/[0.12]"
            >
              <div className="flex items-baseline gap-3 mb-4">
                <span
                  aria-hidden
                  className="font-serif italic text-xl leading-none text-white/15 select-none"
                >
                  {c.number}
                </span>
                <span className="flex items-baseline gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/45">
                  <span aria-hidden className="text-[var(--color-electric-cyan)]/70 select-none">
                    ──
                  </span>
                  <span>Component</span>
                </span>
              </div>

              <h3 className="text-2xl font-extrabold tracking-[-0.01em] leading-tight text-white mb-3">
                {c.title}
              </h3>

              <p className="text-[14px] leading-[1.55] text-white/55 mb-6">
                {c.description}
              </p>

              <div className="mt-auto">
                <Link
                  href={c.href}
                  className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-white/85 hover:text-white transition-colors w-fit"
                >
                  Learn more
                  <ArrowRight className="w-3.5 h-3.5 text-[var(--color-electric-cyan)] transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
