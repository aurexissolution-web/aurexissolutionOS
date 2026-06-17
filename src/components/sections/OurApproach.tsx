"use client";

import { motion, useReducedMotion } from "framer-motion";

const easeOut = [0.16, 1, 0.3, 1] as const;

interface Commitment {
  number: string;
  label: string;
  body: string;
}

const COMMITMENTS: Commitment[] = [
  {
    number: "01",
    label: "In-house",
    body: "Every line of code we ship is written by us — not a subcontractor in another country we've never met. AI is a tool we use; it doesn't write your system on autopilot.",
  },
  {
    number: "02",
    label: "Transparent",
    body: "We work in 6–12 week cycles, with weekly demos. You see the system before it goes live. If something is wrong, we fix it before launch — not after.",
  },
  {
    number: "03",
    label: "Confidential",
    body: "We sign NDAs before the first technical conversation. Your data, your business, your system — yours.",
  },
];

export function OurApproach() {
  const reduceMotion = useReducedMotion();

  const fadeUp = (delay = 0) =>
    reduceMotion
      ? { initial: false, animate: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.25 },
          transition: { duration: 0.7, ease: easeOut, delay },
        };

  return (
    <section className="relative w-full overflow-hidden bg-[var(--color-background)] py-20 md:py-24 lg:py-16">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-[5%] h-[420px] w-[420px] rounded-full opacity-40 blur-[200px]"
        style={{ backgroundColor: "rgba(0,71,255,0.04)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 right-[8%] h-[360px] w-[360px] rounded-full opacity-30 blur-[200px]"
        style={{ backgroundColor: "rgba(0,240,255,0.03)" }}
      />

      <div className="container relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-12">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <motion.div {...fadeUp()} className="mb-4 flex items-center gap-3">
              <span
                aria-hidden
                className="h-px w-10 bg-[var(--color-electric-cyan)]/60"
              />
              <span className="font-mono text-[11px] uppercase tracking-[0.42em] text-[var(--color-electric-cyan)]/80">
                Our Approach
              </span>
            </motion.div>

            <motion.div
              {...fadeUp(0.05)}
              className="mb-6 flex items-baseline gap-5 lg:mb-7"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.42em] text-white/40">
                N° 05 · DEDICATED · MY
              </span>
            </motion.div>

            <motion.h2
              {...fadeUp(0.1)}
              className="mb-1 font-serif text-4xl leading-[1.0] tracking-[-0.015em] text-white md:text-5xl lg:text-[52px] xl:text-[64px]"
              style={{ fontStyle: "normal" }}
            >
              In-house.
            </motion.h2>
            <motion.h2
              {...fadeUp(0.16)}
              className="mb-10 font-serif text-4xl leading-[1.0] tracking-[-0.015em] text-white md:text-5xl lg:mb-12 lg:text-[52px] xl:text-[64px]"
              style={{ fontStyle: "normal" }}
            >
              No offshoring.
            </motion.h2>

            <motion.div
              {...fadeUp(0.22)}
              className="flex items-center gap-3"
            >
              <span aria-hidden className="h-px w-8 bg-white/20" />
              <span
                aria-hidden
                className="font-serif text-[18px] leading-none text-[var(--color-electric-cyan)]"
                style={{ fontStyle: "italic" }}
              >
                ◆
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-white/40">
                A pledge · Aurexis · MY · 2026
              </span>
            </motion.div>
          </div>

          <ol className="lg:col-span-7 border-b border-white/[0.06]">
            {COMMITMENTS.map((commitment, i) => (
              <motion.li
                key={commitment.number}
                {...fadeUp(0.28 + i * 0.08)}
                className="border-t border-white/[0.06] py-6 md:py-7 lg:py-8"
              >
                <div className="mb-3 flex items-baseline gap-4 md:mb-4">
                  <span
                    className="font-serif text-[34px] leading-none text-white/90 md:text-[40px] lg:text-[44px]"
                    style={{ fontStyle: "italic" }}
                  >
                    {commitment.number}
                  </span>
                  <span aria-hidden className="h-px w-7 bg-white/15" />
                  <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--color-electric-cyan)]/65 md:text-[12px]">
                    {commitment.label}
                  </span>
                </div>
                <p className="max-w-prose text-[15px] leading-[1.65] text-white/80 md:text-base">
                  {commitment.body}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
