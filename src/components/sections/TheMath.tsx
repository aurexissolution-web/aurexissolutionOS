"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowDown } from "lucide-react";

type Row = {
  label: string;
  without: string;
  with: string;
};

const rows: Row[] = [
  {
    label: "Labor",
    without: "12+ FTE handling repetitive ops",
    with: "AI agents + 4 FTE on strategy",
  },
  {
    label: "Automation",
    without: "5–15% of workflows",
    with: "60–85% of workflows",
  },
  {
    label: "Single source of truth",
    without: "Spreadsheets, vendors, hopes",
    with: "One unified data layer",
  },
  {
    label: "Compliance",
    without: "Manual quarterly scrambles",
    with: "Continuous, audit-ready",
  },
  {
    label: "24/7 Operations",
    without: "Off-hours = blind",
    with: "Agents handle overnight",
  },
];

export function TheMath() {
  return (
    <section className="relative bg-[var(--color-background)] pt-8 pb-16 px-6 overflow-hidden">
      {/* Top rim-light highlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.10] to-transparent"
      />
      {/* Ambient cyan halos for atmospheric depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-56 rounded-full bg-[var(--color-electric-cyan)]/8 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 w-[360px] h-48 rounded-full bg-[var(--color-electric-cyan)]/5 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          className="mx-auto max-w-3xl text-center mb-6"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.28em] text-white/40 mb-3">
            The Math
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-[-0.02em] leading-[1.05] text-white text-balance mb-3">
            What{" "}
            <em
              className="font-serif italic text-[var(--color-electric-cyan)] font-normal"
              style={{ filter: "drop-shadow(0 0 18px rgba(0,240,255,0.32))" }}
            >
              changes
            </em>{" "}
            when you have an ecosystem.
          </h2>
          <p className="mx-auto max-w-2xl text-[15px] leading-[1.6] text-white/55 text-balance">
            Real numbers from real Malaysian businesses we&apos;ve shipped to. The math is conservative.
          </p>
        </motion.div>

        <div className="relative mx-auto max-w-6xl">
          <div
            aria-hidden
            className="hidden lg:block pointer-events-none absolute right-0 top-0 bottom-0 w-1/2 -z-10"
            style={{
              background:
                "radial-gradient(55% 55% at 50% 50%, rgba(0,240,255,0.05), transparent 70%)",
            }}
          />

          <motion.div
            aria-hidden
            className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-px bg-[var(--color-electric-cyan)]/30 origin-top"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          />

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-y-3 lg:gap-y-0 mb-1 pb-3 border-b border-white/[0.06]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="lg:pr-10 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/35">
              Without Ecosystem
            </div>
            <div className="lg:pl-10 text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--color-electric-cyan)]/85">
              With Aurexis
            </div>
          </motion.div>

          {rows.map((row, i) => (
            <motion.div
              key={row.label}
              className="border-b border-white/[0.04] py-3 lg:py-4"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.08, ease: "easeOut" }}
            >
              <div className="font-mono text-[11px] uppercase tracking-[0.28em] text-white/45 mb-1.5">
                {row.label}
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-3 lg:gap-y-0">
                <div className="lg:pr-10 text-[15px] md:text-[16px] leading-[1.55] text-white/45">
                  <span aria-hidden className="mr-3 text-white/30 select-none">
                    —
                  </span>
                  {row.without}
                </div>
                <div className="lg:pl-10 text-[15px] md:text-[16px] leading-[1.55] text-white/85">
                  <span aria-hidden className="mr-3 text-[var(--color-electric-cyan)]/80 select-none">
                    ›
                  </span>
                  {row.with}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="mx-auto max-w-2xl text-center mt-6 text-base md:text-lg text-white/65 leading-relaxed text-balance"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Most clients pay back the build in 12–18 months. After that, it&apos;s{" "}
          <em
            className="font-serif italic text-[var(--color-electric-cyan)] font-normal"
            style={{ filter: "drop-shadow(0 0 14px rgba(0,240,255,0.28))" }}
          >
            all margin.
          </em>
        </motion.p>

        <motion.div
          className="mt-4 flex justify-center"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          <Link
            href="#calculator"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-black text-[15px] font-semibold transition-all hover:-translate-y-0.5 shadow-[0_4px_14px_rgba(0,0,0,0.25),0_0_24px_rgba(0,240,255,0.18)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.3),0_0_32px_rgba(0,240,255,0.28)]"
          >
            Calculate your savings
            <ArrowDown className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
