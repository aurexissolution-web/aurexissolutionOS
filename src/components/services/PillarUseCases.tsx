"use client";

import {
  KeyboardEvent,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Pillar, PillarUseCase } from "@/data/pillars";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * "Use cases" section for sub-service pillar pages.
 *
 * Mirrors `UseCases` (used by /services/ecosystem) — same tab navigation,
 * same scene-panel + info-column stage, same footer. Three differences:
 *
 *   1. **4 tabs** (one per use case) instead of 3.
 *   2. The accent (tab top-rail, "01" eyebrow, em phrases in headline + outcome,
 *      result-row hairline, view-cta arrow) takes the **pillar accent hex**
 *      instead of champagne.
 *   3. The photo tint is **per-pillar** (single colour) rather than
 *      per-case — cleaner colour identity across the section.
 *
 * Dimensions are tightened (tabs, stage, padding) so the section fits a
 * standard desktop viewport (~770px section height).
 */
export function PillarUseCases({ pillar }: { pillar: Pillar }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const reduceMotion = useReducedMotion();
  const reduce = !!reduceMotion;
  const headingId = useId();
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const { accent, useCases } = pillar;
  const total = useCases.length;
  const active = useCases[activeIdx];

  const focusTab = useCallback((i: number) => {
    tabRefs.current[i]?.focus();
  }, []);

  const onTabKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      const next = (i + 1) % total;
      setActiveIdx(next);
      focusTab(next);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      const prev = (i + total - 1) % total;
      setActiveIdx(prev);
      focusTab(prev);
    } else if (e.key === "Home") {
      e.preventDefault();
      setActiveIdx(0);
      focusTab(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setActiveIdx(total - 1);
      focusTab(total - 1);
    }
  };

  const reveal = (delay: number) =>
    reduce
      ? { initial: false, animate: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0, y: 12 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.3 },
          transition: { duration: 0.7, ease: EASE, delay },
        };

  useEffect(() => {
    const refs = tabRefs.current;
    return () => {
      refs.length = 0;
    };
  }, []);

  return (
    <section aria-labelledby={headingId} className="relative isolate w-full">
      <style>{`
        .puc-scope {
          --puc-cream-95: rgba(244, 238, 225, 0.95);
          --puc-cream-85: rgba(244, 238, 225, 0.85);
          --puc-cream-65: rgba(244, 238, 225, 0.65);
          --puc-cream-55: rgba(244, 238, 225, 0.55);
          --puc-cream-45: rgba(244, 238, 225, 0.45);
          --puc-cream-30: rgba(244, 238, 225, 0.30);
          --puc-line:        rgba(244, 238, 225, 0.08);
          --puc-line-strong: rgba(244, 238, 225, 0.16);
          --puc-accent: ${accent.hex};
        }

        .puc-tab {
          position: relative;
          display: grid;
          grid-template-rows: auto auto auto;
          gap: 3px;
          padding: 11px 16px 10px;
          background: transparent;
          border: 0;
          border-right: 1px solid var(--puc-line);
          cursor: pointer;
          text-align: left;
          font: inherit;
          color: inherit;
          transition: background 0.5s ease;
          width: 100%;
        }
        .puc-tab:last-child { border-right: 0; }
        .puc-tab:hover { background: rgba(244,238,225,0.012); }
        .puc-tab:focus-visible { outline: 1px solid var(--puc-accent); outline-offset: -2px; }
        .puc-tab .num {
          font-family: var(--font-mono), ui-monospace, monospace;
          font-size: 9.5px; letter-spacing: 0.32em; text-transform: uppercase;
          color: var(--puc-cream-30);
          transition: color 0.5s ease;
        }
        .puc-tab .name {
          font-family: var(--font-serif), Georgia, serif;
          font-style: italic; font-weight: 400;
          font-size: 16.5px; line-height: 1.05; letter-spacing: -0.012em;
          color: var(--puc-cream-65);
          transition: color 0.5s ease;
        }
        .puc-tab .meta {
          font-family: var(--font-mono), ui-monospace, monospace;
          font-size: 8.5px; letter-spacing: 0.30em; text-transform: uppercase;
          color: var(--puc-cream-30);
          transition: color 0.5s ease;
        }
        .puc-tab[aria-selected="true"] .num { color: var(--puc-accent); }
        .puc-tab[aria-selected="true"] .name { color: var(--puc-cream-95); }
        .puc-tab[aria-selected="true"] .meta { color: var(--puc-cream-45); }
        .puc-tab[aria-selected="true"]::after {
          content: ""; position: absolute;
          top: -1px; left: 0; right: 0; height: 1px;
          background: var(--puc-accent);
        }
        .puc-tab[aria-selected="true"]::before {
          content: ""; position: absolute;
          bottom: -5px; left: 50%;
          width: 8px; height: 8px;
          background: #02030A;
          border-left: 1px solid var(--puc-line);
          border-bottom: 1px solid var(--puc-line);
          transform: translateX(-50%) rotate(-45deg);
        }

        .puc-cta { transition: gap 0.5s ease; }
        .puc-cta:hover { gap: 14px; }
      `}</style>

      <div className="puc-scope mx-auto max-w-[1600px] px-6 md:px-10 lg:px-16 xl:px-20 py-8 md:py-9 lg:py-10">
        {/* ─── Section header ─── */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-y-4 md:gap-x-8 items-end mb-5">
          <div>
            <motion.p
              {...reveal(0)}
              className="font-mono text-[10.5px] uppercase tracking-[0.32em] mb-3"
              style={{ color: "var(--puc-cream-55)" }}
            >
              <span style={{ color: "var(--puc-cream-45)" }} className="mr-2">
                03
              </span>
              <span style={{ color: "var(--puc-cream-30)" }} className="mr-2">
                /
              </span>
              Use cases
            </motion.p>
            <motion.h2
              id={headingId}
              {...reveal(0.08)}
              className="font-serif italic font-normal m-0 max-w-[18ch] md:max-w-[30ch]"
              style={{
                color: "var(--puc-cream-95)",
                fontSize: "clamp(1.5rem, 2.4vw, 2rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.018em",
              }}
            >
              Four ecosystems we&rsquo;ve built.
            </motion.h2>
          </div>
          <motion.p
            {...reveal(0.16)}
            className="font-serif italic m-0 max-w-[28ch] md:text-right md:self-end"
            style={{
              color: "var(--puc-cream-65)",
              fontSize: "clamp(0.95rem, 1.05vw, 1.05rem)",
              lineHeight: 1.45,
              letterSpacing: "0.005em",
            }}
          >
            From a{" "}
            <em
              className="not-italic"
              style={{ color: "var(--puc-accent)", fontStyle: "italic" }}
            >
              {useCases[0].name.toLowerCase()}
            </em>{" "}
            to a{" "}
            <em
              className="not-italic"
              style={{ color: "var(--puc-accent)", fontStyle: "italic" }}
            >
              {useCases[total - 1].name.toLowerCase()}
            </em>
            .
          </motion.p>
        </div>

        {/* ─── Tabs (4 cols) ─── */}
        <motion.div
          {...reveal(0.18)}
          className="relative mb-5"
          style={{
            borderTop: "1px solid var(--puc-line)",
            borderBottom: "1px solid var(--puc-line)",
          }}
        >
          <div
            role="tablist"
            aria-label="Use case selection"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
          >
            {useCases.map((uc, i) => {
              const isActive = i === activeIdx;
              return (
                <button
                  key={uc.id}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`${baseId}-tab-${uc.id}`}
                  aria-selected={isActive}
                  aria-controls={`${baseId}-panel-${uc.id}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveIdx(i)}
                  onKeyDown={(e) => onTabKeyDown(e, i)}
                  className="puc-tab"
                >
                  <span className="num">{uc.index}</span>
                  <span className="name">{uc.name}.</span>
                  <span className="meta">{uc.metaShort}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* ─── Stage ─── */}
        <motion.div
          {...(reduce
            ? { initial: false, animate: { opacity: 1, scale: 1 } }
            : {
                initial: { opacity: 0, scale: 0.985 },
                whileInView: { opacity: 1, scale: 1 },
                viewport: { once: true, amount: 0.25 },
                transition: { duration: 0.8, ease: EASE, delay: 0.28 },
              })}
          className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-5 lg:gap-9 items-stretch min-h-[320px] lg:min-h-[360px]"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`scene-${active.id}`}
              role="tabpanel"
              id={`${baseId}-panel-${active.id}`}
              aria-labelledby={`${baseId}-tab-${active.id}`}
              initial={reduce ? false : { opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.985 }}
              transition={{ duration: reduce ? 0.2 : 0.4, ease: EASE }}
              className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[360px]"
            >
              <ScenePanel caseData={active} total={total} />
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`info-${active.id}`}
              initial={reduce ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -4 }}
              transition={{ duration: reduce ? 0.2 : 0.4, ease: EASE }}
            >
              <InfoColumn
                caseData={active}
                activeIdx={activeIdx}
                total={total}
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* ─── Footer ─── */}
        <motion.div
          {...reveal(0.5)}
          className="pt-4 mt-5 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:flex-wrap sm:gap-8"
          style={{ borderTop: "1px solid var(--puc-line)" }}
        >
          <p
            className="font-serif italic m-0"
            style={{
              color: "var(--puc-cream-55)",
              fontSize: "14.5px",
              lineHeight: 1.4,
              letterSpacing: "0.005em",
            }}
          >
            Each build ships with a{" "}
            <em
              className="not-italic"
              style={{ color: "var(--puc-accent)", fontStyle: "italic" }}
            >
              30-day warranty
            </em>
            : post-launch support, full documentation, and team training.
          </p>
          <p
            className="font-mono text-[10.5px] uppercase tracking-[0.28em] m-0"
            style={{ color: "var(--puc-cream-45)" }}
          >
            Discover
            <span className="mx-2.5" style={{ color: "var(--puc-cream-30)" }}>
              ·
            </span>
            Build
            <span className="mx-2.5" style={{ color: "var(--puc-cream-30)" }}>
              ·
            </span>
            Ship
            <span className="mx-2.5" style={{ color: "var(--puc-cream-30)" }}>
              ·
            </span>
            Train
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   Scene panel — photo backdrop + name overlay
   ───────────────────────────────────────────────────────────── */

function ScenePhoto({ caseData }: { caseData: PillarUseCase }) {
  return (
    <div className="absolute inset-0">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={caseData.photo.url}
        alt={caseData.photo.alt}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: "saturate(0.85) contrast(1.05)" }}
      />

      {/* Darkening + cream lift */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(2,3,10,0.45) 0%, rgba(2,3,10,0.30) 30%, rgba(2,3,10,0.55) 100%)",
        }}
      />

      {/* Vignette */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 50% 45%, transparent 30%, rgba(2,3,10,0.55) 100%)",
        }}
      />

      {/* Grain */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.7 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
        }}
      />
    </div>
  );
}

function ScenePanel({
  caseData,
  total,
}: {
  caseData: PillarUseCase;
  total: number;
}) {
  return (
    <div
      className="relative h-full overflow-hidden border"
      style={{ borderColor: "var(--puc-line)" }}
    >
      <ScenePhoto caseData={caseData} />

      <span
        className="absolute top-4 left-4 font-mono text-[9.5px] uppercase tracking-[0.32em] px-2 py-1 backdrop-blur-md z-10"
        style={{
          color: "var(--puc-cream-95)",
          border: "1px solid var(--puc-cream-45)",
          background: "rgba(2,3,10,0.5)",
        }}
      >
        {caseData.name}
      </span>

      <div
        className="absolute top-4 right-4 font-mono text-[9px] uppercase tracking-[0.32em] text-right leading-[1.5] z-10"
        style={{ color: "var(--puc-cream-65)" }}
      >
        <span style={{ color: "var(--puc-accent)" }}>●</span> ACTIVE{" "}
        {caseData.index}
        <br />0{caseData.surfaces.length} / 0{total} SURFACES
      </div>

      <h3
        className="absolute bottom-5 left-6 right-6 font-serif italic font-normal m-0 leading-none z-10"
        style={{
          color: "var(--puc-cream-95)",
          fontSize: "clamp(1.75rem, 2.6vw, 2.25rem)",
          letterSpacing: "-0.018em",
          textShadow: "0 2px 24px rgba(2,3,10,0.65)",
        }}
      >
        {caseData.name}.
      </h3>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Info column — eyebrow, headline, body, surfaces, outcome, cta
   ───────────────────────────────────────────────────────────── */

function InfoColumn({
  caseData,
  activeIdx,
  total,
}: {
  caseData: PillarUseCase;
  activeIdx: number;
  total: number;
}) {
  return (
    <div className="flex flex-col py-1">
      <p
        className="font-mono text-[10px] uppercase tracking-[0.32em] m-0 mb-2.5"
        style={{ color: "var(--puc-accent)" }}
      >
        {caseData.index}
        <span className="mx-2" style={{ color: "var(--puc-cream-30)" }}>
          ·
        </span>
        {caseData.name}
      </p>

      <h4
        className="font-serif italic font-normal m-0 mb-2.5 leading-[1.12]"
        style={{
          color: "var(--puc-cream-95)",
          fontSize: "clamp(1.25rem, 1.7vw, 1.5rem)",
          letterSpacing: "-0.012em",
        }}
      >
        {caseData.headline.lead}
        <em
          className="not-italic"
          style={{
            color: "var(--puc-accent)",
            fontStyle: "italic",
          }}
        >
          {caseData.headline.em}
        </em>
        {caseData.headline.rest}
      </h4>

      <p
        className="font-light text-[12.5px] leading-[1.55] m-0 mb-3 max-w-[42ch]"
        style={{ color: "var(--puc-cream-65)" }}
      >
        {caseData.body}
      </p>

      <dl
        className="grid m-0 mb-3"
        style={{ borderTop: "1px solid var(--puc-line)" }}
      >
        {caseData.surfaces.map((surface) => (
          <div
            key={surface.index}
            className="grid grid-cols-[24px_1fr_auto] gap-3 items-baseline py-2"
            style={{ borderBottom: "1px solid var(--puc-line)" }}
          >
            <dt
              className="font-mono text-[9.5px] uppercase tracking-[0.32em] m-0"
              style={{ color: "var(--puc-cream-30)" }}
            >
              {surface.index}
            </dt>
            <dd
              className="font-serif italic font-normal text-[14.5px] leading-[1.2] m-0"
              style={{ color: "var(--puc-cream-95)" }}
            >
              {surface.name}
            </dd>
            <dd
              className="font-mono text-[9px] uppercase tracking-[0.28em] text-right m-0 whitespace-nowrap"
              style={{ color: "var(--puc-cream-45)" }}
            >
              {surface.desc}
            </dd>
          </div>
        ))}
      </dl>

      <p
        className="font-serif italic m-0 mb-3 text-[13.5px] leading-[1.5] relative pt-2.5"
        style={{ color: "var(--puc-cream-65)", letterSpacing: "0.005em" }}
      >
        <span
          aria-hidden
          className="absolute left-0 top-0 h-px w-8"
          style={{ background: "var(--puc-accent)", opacity: 0.65 }}
        />
        {caseData.outcome.lead}
        <em
          className="not-italic"
          style={{ color: "var(--puc-cream-95)", fontStyle: "italic" }}
        >
          {caseData.outcome.em}
        </em>
        {caseData.outcome.rest}
      </p>

      <div
        className="flex items-baseline justify-between gap-4 mt-auto pt-2.5"
        style={{ borderTop: "1px solid var(--puc-line)" }}
      >
        <span
          className="font-mono text-[10px] uppercase tracking-[0.32em]"
          style={{ color: "var(--puc-cream-45)" }}
        >
          <span style={{ color: "var(--puc-cream-95)" }}>{caseData.index}</span>
          <span className="mx-1.5" style={{ color: "var(--puc-cream-30)" }}>
            /
          </span>
          0{total}
        </span>
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          className="puc-cta font-mono text-[10.5px] uppercase tracking-[0.28em] inline-flex items-baseline gap-2.5 no-underline"
          style={{ color: "var(--puc-cream-95)" }}
        >
          View full case study{" "}
          <span style={{ color: "var(--puc-accent)" }}>→</span>
        </a>
      </div>

      <span className="sr-only">
        Active use case {activeIdx + 1} of {total}.
      </span>
    </div>
  );
}
