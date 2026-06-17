"use client";

import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

type Surface = {
  index: string;
  name: string;
  tag: string;
  description: string;
};

const SURFACES: Surface[] = [
  {
    index: "01",
    name: "Front Door",
    tag: "Public",
    description:
      "Public website, customer portal, lead capture — the first surface your customers ever touch.",
  },
  {
    index: "02",
    name: "Operations",
    tag: "Internal",
    description:
      "Internal staff app for daily work — web or mobile. Where your team actually runs the business.",
  },
  {
    index: "03",
    name: "AI Agents",
    tag: "Automated",
    description:
      "Receptionists, automations, document and quote generators. The part of the system that never sleeps.",
  },
  {
    index: "04",
    name: "Glue Layer",
    tag: "Integrations",
    description:
      "WhatsApp, LHDN e-invoice, payment gateways, and the integrations that hold every system together.",
  },
];

function QuietCard({
  surface,
  index,
  reduce,
}: {
  surface: Surface;
  index: number;
  reduce: boolean;
}) {
  const reveal = reduce
    ? { initial: false, animate: { opacity: 1, y: 0 } }
    : {
        initial: { opacity: 0, y: 14 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.3 },
        transition: { duration: 0.7, ease: EASE, delay: 0.16 + index * 0.08 },
      };

  return (
    <motion.article
      {...reveal}
      className="wwb-card group relative grid grid-rows-[auto_1fr_auto] min-h-[180px] lg:min-h-[200px] p-6 sm:p-7 lg:px-8 lg:py-7 overflow-hidden"
    >
      {/* Top row: numeral + tag */}
      <div className="flex items-baseline justify-between gap-4">
        <span
          className="font-mono text-[10.5px] uppercase tracking-[0.32em]"
          style={{ color: "var(--wwb-cream-45)" }}
        >
          {surface.index}
          <span
            className="mx-1.5"
            style={{ color: "var(--wwb-cream-30)" }}
            aria-hidden
          >
            —
          </span>
          {surface.name}
        </span>
        <span
          className="font-mono text-[9.5px] uppercase tracking-[0.32em]"
          style={{ color: "var(--wwb-cream-30)" }}
        >
          {surface.tag}
        </span>
      </div>

      {/* Middle row: serif italic name */}
      <div className="flex items-center pt-4 pb-3">
        <h3
          className="wwb-name font-serif italic font-normal leading-none m-0"
          style={{
            color: "var(--wwb-cream-95)",
            fontSize: "clamp(2rem, 2.8vw, 2.875rem)",
            letterSpacing: "-0.018em",
          }}
        >
          {surface.name}.
        </h3>
      </div>

      {/* Bottom row: description + arrow */}
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
        <p
          className="font-light text-[13.5px] leading-[1.55] m-0 max-w-[32ch]"
          style={{ color: "var(--wwb-cream-55)" }}
        >
          {surface.description}
        </p>
        <span
          className="wwb-arrow font-mono text-[11px] uppercase tracking-[0.18em] whitespace-nowrap shrink-0 self-start sm:self-end"
          style={{ color: "var(--wwb-cream-45)" }}
        >
          View →
        </span>
      </div>
    </motion.article>
  );
}

export function WhatWeBuild() {
  const reduceMotion = useReducedMotion();
  const reduce = !!reduceMotion;

  const reveal = (delay: number) =>
    reduce
      ? { initial: false, animate: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0, y: 12 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.4 },
          transition: { duration: 0.7, ease: EASE, delay },
        };

  return (
    <section
      aria-labelledby="what-we-build-heading"
      className="relative isolate w-full"
    >
      <style>{`
        .wwb-scope {
          --wwb-cream-95: rgba(244, 238, 225, 0.95);
          --wwb-cream-85: rgba(244, 238, 225, 0.85);
          --wwb-cream-65: rgba(244, 238, 225, 0.65);
          --wwb-cream-55: rgba(244, 238, 225, 0.55);
          --wwb-cream-45: rgba(244, 238, 225, 0.45);
          --wwb-cream-30: rgba(244, 238, 225, 0.30);
          --wwb-line:       rgba(244, 238, 225, 0.07);
          --wwb-line-hover: rgba(244, 238, 225, 0.18);
          --wwb-accent: #C9A86A;
        }

        .wwb-card {
          border: 1px solid var(--wwb-line);
          background: transparent;
          transition: border-color 0.5s ease, background 0.5s ease;
        }
        .wwb-card:hover {
          border-color: var(--wwb-line-hover);
          background: rgba(244, 238, 225, 0.014);
        }
        .wwb-card::after {
          content: "";
          position: absolute;
          left: 36px;
          bottom: 0;
          height: 1px;
          width: 0;
          background: var(--wwb-accent);
          opacity: 0.55;
          transition: width 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .wwb-card:hover::after {
          width: 36px;
        }

        .wwb-card .wwb-name {
          transition: letter-spacing 0.7s ease;
        }
        .wwb-card:hover .wwb-name {
          letter-spacing: -0.022em;
        }

        .wwb-card .wwb-arrow {
          transition: transform 0.5s ease, color 0.5s ease;
        }
        .wwb-card:hover .wwb-arrow {
          transform: translateX(4px);
          color: var(--wwb-cream-85);
        }

        @media (max-width: 640px) {
          .wwb-card::after { left: 28px; }
        }
      `}</style>

      <div className="wwb-scope mx-auto max-w-[1600px] px-6 md:px-10 lg:px-16 xl:px-20 py-10 md:py-12 lg:py-14">
        {/* ─── Section header ─── */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-y-5 md:gap-x-8 items-end mb-8 lg:mb-10">
          <div>
            <motion.p
              {...reveal(0)}
              className="font-mono text-[11px] uppercase tracking-[0.32em] mb-5"
              style={{ color: "var(--wwb-cream-55)" }}
            >
              <span style={{ color: "var(--wwb-cream-45)" }} className="mr-2">
                02
              </span>
              <span style={{ color: "var(--wwb-cream-30)" }} className="mr-2">
                /
              </span>
              What we build
            </motion.p>
            <motion.h2
              id="what-we-build-heading"
              {...reveal(0.08)}
              className="font-serif italic font-normal m-0 max-w-[18ch]"
              style={{
                color: "var(--wwb-cream-95)",
                fontSize: "clamp(1.75rem, 2.8vw, 2.5rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.018em",
              }}
            >
              We build for the ecosystem.
            </motion.h2>
          </div>
          <motion.p
            {...reveal(0.18)}
            className="font-serif italic m-0 max-w-[26ch] md:text-right md:self-end"
            style={{
              color: "var(--wwb-cream-55)",
              fontSize: "clamp(1rem, 1.2vw, 1.125rem)",
              lineHeight: 1.5,
              letterSpacing: "0.005em",
            }}
          >
            Four surfaces.
            <br />
            Designed{" "}
            <em
              className="not-italic font-serif italic"
              style={{ color: "var(--wwb-cream-95)" }}
            >
              together
            </em>
            . Shipped{" "}
            <em
              className="not-italic font-serif italic"
              style={{ color: "var(--wwb-cream-95)" }}
            >
              together
            </em>
            .
          </motion.p>
        </div>

        {/* ─── 2×2 quiet cards ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-3.5 mb-8 lg:mb-10">
          {SURFACES.map((surface, i) => (
            <QuietCard
              key={surface.index}
              surface={surface}
              index={i}
              reduce={reduce}
            />
          ))}
        </div>

        {/* ─── Footer line ─── */}
        <motion.div
          {...reveal(0.5)}
          className="pt-6 flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between sm:flex-wrap sm:gap-8"
          style={{ borderTop: "1px solid var(--wwb-line)" }}
        >
          <p
            className="font-serif italic m-0"
            style={{
              color: "var(--wwb-cream-55)",
              fontSize: "16px",
              lineHeight: 1.4,
              letterSpacing: "0.005em",
            }}
          >
            Every engagement closes with{" "}
            <em
              className="not-italic font-serif italic"
              style={{ color: "var(--wwb-cream-95)" }}
            >
              thirty days
            </em>{" "}
            of post-launch support, full documentation, and team training.
          </p>
          <p
            className="font-mono text-[10.5px] uppercase tracking-[0.28em] m-0"
            style={{ color: "var(--wwb-cream-45)" }}
          >
            Included
            <span
              className="mx-2.5"
              style={{ color: "var(--wwb-cream-30)" }}
              aria-hidden
            >
              ·
            </span>
            30d
            <span
              className="mx-2.5"
              style={{ color: "var(--wwb-cream-30)" }}
              aria-hidden
            >
              ·
            </span>
            Docs
            <span
              className="mx-2.5"
              style={{ color: "var(--wwb-cream-30)" }}
              aria-hidden
            >
              ·
            </span>
            Training
          </p>
        </motion.div>
      </div>
    </section>
  );
}
