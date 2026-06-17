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

const EASE = [0.16, 1, 0.3, 1] as const;

type Surface = { index: string; name: string; desc: string };
type SplitText = { lead: string; em: string; rest: string };
type Palette = "dental" | "commerce" | "service";

type UseCase = {
  index: string;
  id: string;
  name: string;
  metaShort: string;
  palette: Palette;
  headline: SplitText;
  body: string;
  surfaces: Surface[];
  outcome: SplitText;
  photo: { url: string; alt: string };
};

const USE_CASES: UseCase[] = [
  {
    index: "01",
    id: "dental",
    name: "Dental Clinic",
    metaShort: "4 surfaces · ai · whatsapp · invoice · db",
    palette: "dental",
    headline: {
      lead: "A single-chair practice that ",
      em: "fired its receptionist",
      rest: " on a busy Tuesday and never looked back.",
    },
    body:
      "After hours, the AI receptionist takes the call. WhatsApp confirms the booking. The visit auto-generates an LHDN-compliant e-invoice. Every patient record syncs back to the master DB.",
    surfaces: [
      { index: "01", name: "AI receptionist", desc: "voice + chat" },
      { index: "02", name: "WhatsApp booking", desc: "native channel" },
      { index: "03", name: "LHDN e-invoice", desc: "auto-issued" },
      { index: "04", name: "Patient DB", desc: "source of truth" },
    ],
    outcome: {
      lead: "Result: ",
      em: "after-hours bookings handled without staff",
      rest: ", every visit invoiced before the patient leaves the chair.",
    },
    photo: {
      url: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=1200&q=80",
      alt: "A modern dental clinic interior with treatment chair.",
    },
  },
  {
    index: "02",
    id: "commerce",
    name: "E-commerce",
    metaShort: "4 surfaces · store · ops · fulfilment · cs ai",
    palette: "commerce",
    headline: {
      lead: "A storefront that grew past ",
      em: "two hundred orders a day",
      rest: " and needed every piece to talk.",
    },
    body:
      "Customers checkout on the storefront. The ops dashboard sees the order live. Auto-fulfilment kicks the package toward dispatch. Customer-service AI handles status questions before the team wakes up.",
    surfaces: [
      { index: "01", name: "Storefront", desc: "checkout + portal" },
      { index: "02", name: "Ops dashboard", desc: "internal" },
      { index: "03", name: "Auto-fulfilment", desc: "dispatch trigger" },
      { index: "04", name: "Customer-service AI", desc: "chat agent" },
    ],
    outcome: {
      lead: "Result: ",
      em: "first-touch resolution before the team wakes up",
      rest: ", and every order routed without a human in the loop.",
    },
    photo: {
      url: "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1200&q=80",
      alt: "Inside a large fulfilment warehouse.",
    },
  },
  {
    index: "03",
    id: "service",
    name: "Service Business",
    metaShort: "4 surfaces · book · dispatch · quote · invoice",
    palette: "service",
    headline: {
      lead: "A fleet of field technicians whose dispatch sheet ",
      em: "lived in a WhatsApp group",
      rest: ".",
    },
    body:
      "Customers book on a public site. The dispatch app routes the next available technician. On-site, a quote is auto-generated from the spec sheet. The invoice fires the moment the job is closed.",
    surfaces: [
      { index: "01", name: "Booking site", desc: "public-facing" },
      { index: "02", name: "Dispatch app", desc: "field-ready" },
      { index: "03", name: "Auto quotes", desc: "spec-driven" },
      { index: "04", name: "Invoicing", desc: "job-closed trigger" },
    ],
    outcome: {
      lead: "Result: ",
      em: "the dispatch sheet became the dispatch app",
      rest: ", and the WhatsApp group is finally just a chat.",
    },
    photo: {
      url: "https://images.unsplash.com/photo-1613206485381-b028e578e791?auto=format&fit=crop&w=1200&q=80",
      alt: "A circular composition of metal wrenches and field tools.",
    },
  },
];

/* ─────────────────────────────────────────────────────────────
   Industry illustrations — multi-element compositions.
   All viewBox 0 0 600 400. Sit centered in the scene panel.
   ───────────────────────────────────────────────────────────── */

/* Photographic backdrop for each scene.
   Industry-tinted photo with cream gradient overlay, vignette, and grain. */
function ScenePhoto({ caseData }: { caseData: UseCase }) {
  return (
    <div className="absolute inset-0">
      {/* Photo */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={caseData.photo.url}
        alt={caseData.photo.alt}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: "saturate(0.78) contrast(1.05)" }}
      />

      {/* Industry-color tint */}
      <div
        aria-hidden
        className={`absolute inset-0 mix-blend-color tint-${caseData.palette}`}
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

/* ─────────────────────────────────────────────────────────────
   Subcomponents
   ───────────────────────────────────────────────────────────── */

function ScenePanel({
  caseData,
  total,
}: {
  caseData: UseCase;
  total: number;
}) {
  return (
    <div
      className={`uc-scene-wrap relative h-full overflow-hidden border border-[var(--uc-line)] scene-${caseData.palette}`}
    >
      <ScenePhoto caseData={caseData} />

      <span
        className="absolute top-5 left-5 font-mono text-[9.5px] uppercase tracking-[0.32em] px-2 py-1 backdrop-blur-md z-10"
        style={{
          color: "var(--uc-cream-95)",
          border: "1px solid var(--uc-cream-45)",
          background: "rgba(2,3,10,0.5)",
        }}
      >
        {caseData.name}
      </span>

      <div
        className="absolute top-5 right-5 font-mono text-[9px] uppercase tracking-[0.32em] text-right leading-[1.5] z-10"
        style={{ color: "var(--uc-cream-65)" }}
      >
        <span style={{ color: "var(--uc-champagne)" }}>●</span> ACTIVE{" "}
        {caseData.index}
        <br />0{caseData.surfaces.length} / 0{total} SURFACES
      </div>

      <h3
        className="absolute bottom-6 left-7 right-7 font-serif italic font-normal m-0 leading-none z-10"
        style={{
          color: "var(--uc-cream-95)",
          fontSize: "clamp(2rem, 3vw, 2.625rem)",
          letterSpacing: "-0.018em",
          textShadow: "0 2px 24px rgba(2,3,10,0.65)",
        }}
      >
        {caseData.name}.
      </h3>
    </div>
  );
}

function InfoColumn({
  caseData,
  activeIdx,
  total,
}: {
  caseData: UseCase;
  activeIdx: number;
  total: number;
}) {
  return (
    <div className="flex flex-col py-1">
      <p
        className="font-mono text-[10px] uppercase tracking-[0.32em] m-0 mb-3"
        style={{ color: "var(--uc-champagne)" }}
      >
        {caseData.index}
        <span className="mx-2" style={{ color: "var(--uc-cream-30)" }}>
          ·
        </span>
        {caseData.name} ecosystem
      </p>

      <h4
        className="font-serif italic font-normal m-0 mb-3 leading-[1.12]"
        style={{
          color: "var(--uc-cream-95)",
          fontSize: "clamp(1.375rem, 1.85vw, 1.625rem)",
          letterSpacing: "-0.012em",
        }}
      >
        {caseData.headline.lead}
        <em
          className="not-italic"
          style={{
            color: "var(--uc-champagne)",
            fontStyle: "italic",
          }}
        >
          {caseData.headline.em}
        </em>
        {caseData.headline.rest}
      </h4>

      <p
        className="font-light text-[13.5px] leading-[1.6] m-0 mb-4 max-w-[38ch]"
        style={{ color: "var(--uc-cream-65)" }}
      >
        {caseData.body}
      </p>

      <dl
        className="grid m-0 mb-4"
        style={{ borderTop: "1px solid var(--uc-line)" }}
      >
        {caseData.surfaces.map((surface) => (
          <div
            key={surface.index}
            className="grid grid-cols-[26px_1fr_auto] gap-3 items-baseline py-2.5"
            style={{ borderBottom: "1px solid var(--uc-line)" }}
          >
            <dt
              className="font-mono text-[9.5px] uppercase tracking-[0.32em] m-0"
              style={{ color: "var(--uc-cream-30)" }}
            >
              {surface.index}
            </dt>
            <dd
              className="font-serif italic font-normal text-[15px] leading-[1.2] m-0"
              style={{ color: "var(--uc-cream-95)" }}
            >
              {surface.name}
            </dd>
            <dd
              className="font-mono text-[9px] uppercase tracking-[0.28em] text-right m-0 whitespace-nowrap"
              style={{ color: "var(--uc-cream-45)" }}
            >
              {surface.desc}
            </dd>
          </div>
        ))}
      </dl>

      <p
        className="font-serif italic m-0 mb-4 text-[14.5px] leading-[1.5] relative pt-3"
        style={{ color: "var(--uc-cream-65)", letterSpacing: "0.005em" }}
      >
        <span
          aria-hidden
          className="absolute left-0 top-0 h-px w-8"
          style={{ background: "var(--uc-champagne)", opacity: 0.6 }}
        />
        {caseData.outcome.lead}
        <em
          className="not-italic"
          style={{ color: "var(--uc-cream-95)", fontStyle: "italic" }}
        >
          {caseData.outcome.em}
        </em>
        {caseData.outcome.rest}
      </p>

      <div
        className="flex items-baseline justify-between gap-4 mt-auto pt-3"
        style={{ borderTop: "1px solid var(--uc-line)" }}
      >
        <span
          className="font-mono text-[10px] uppercase tracking-[0.32em]"
          style={{ color: "var(--uc-cream-45)" }}
        >
          <span style={{ color: "var(--uc-cream-95)" }}>{caseData.index}</span>
          <span className="mx-1.5" style={{ color: "var(--uc-cream-30)" }}>
            /
          </span>
          0{total}
        </span>
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          className="uc-cta font-mono text-[10.5px] uppercase tracking-[0.28em] inline-flex items-baseline gap-2.5 no-underline"
          style={{ color: "var(--uc-cream-95)" }}
        >
          View full case study{" "}
          <span style={{ color: "var(--uc-champagne)" }}>→</span>
        </a>
      </div>

      <span className="sr-only">
        Active use case {activeIdx + 1} of {total}.
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   UseCases — public component
   ───────────────────────────────────────────────────────────── */

export function UseCases() {
  const [activeIdx, setActiveIdx] = useState(0);
  const reduceMotion = useReducedMotion();
  const reduce = !!reduceMotion;
  const headingId = useId();
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const total = USE_CASES.length;
  const active = USE_CASES[activeIdx];

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

  // Cleanup ref array on unmount
  useEffect(() => {
    const refs = tabRefs.current;
    return () => {
      refs.length = 0;
    };
  }, []);

  return (
    <section
      aria-labelledby={headingId}
      className="relative isolate w-full"
    >
      <style>{`
        .uc-scope {
          --uc-cream-95: rgba(244, 238, 225, 0.95);
          --uc-cream-85: rgba(244, 238, 225, 0.85);
          --uc-cream-65: rgba(244, 238, 225, 0.65);
          --uc-cream-55: rgba(244, 238, 225, 0.55);
          --uc-cream-45: rgba(244, 238, 225, 0.45);
          --uc-cream-30: rgba(244, 238, 225, 0.30);
          --uc-line:        rgba(244, 238, 225, 0.08);
          --uc-line-strong: rgba(244, 238, 225, 0.16);
          --uc-champagne: #C9A86A;

          --uc-dental-1:  #142A38;
          --uc-dental-2:  #234A60;
          --uc-dental-3:  #3F8AA8;
          --uc-dental-glow: rgba(106, 200, 230, 0.35);

          --uc-commerce-1: #2E1810;
          --uc-commerce-2: #5A2F1B;
          --uc-commerce-3: #9F5C2C;
          --uc-commerce-glow: rgba(232, 165, 90, 0.32);

          --uc-service-1:  #15281E;
          --uc-service-2:  #284838;
          --uc-service-3:  #4D7F62;
          --uc-service-glow: rgba(140, 200, 160, 0.28);
        }

        /* Photo tints — applied as mix-blend-color overlay over the photo */
        .tint-dental   { background-color: #2D5A6F; }
        .tint-commerce { background-color: #6B3F22; }
        .tint-service  { background-color: #2F5240; }

        /* Tab styles */
        .uc-tab {
          position: relative;
          display: grid;
          grid-template-rows: auto auto auto;
          gap: 4px;
          padding: 14px 20px 13px;
          background: transparent;
          border: 0;
          border-right: 1px solid var(--uc-line);
          cursor: pointer;
          text-align: left;
          font: inherit;
          color: inherit;
          transition: background 0.5s ease;
          width: 100%;
        }
        .uc-tab:last-child { border-right: 0; }
        .uc-tab:hover { background: rgba(244,238,225,0.012); }
        .uc-tab:focus-visible { outline: 1px solid var(--uc-champagne); outline-offset: -2px; }
        .uc-tab .num {
          font-family: var(--font-mono), ui-monospace, monospace;
          font-size: 9.5px; letter-spacing: 0.32em; text-transform: uppercase;
          color: var(--uc-cream-30);
          transition: color 0.5s ease;
        }
        .uc-tab .name {
          font-family: var(--font-serif), Georgia, serif;
          font-style: italic; font-weight: 400;
          font-size: 18px; line-height: 1.05; letter-spacing: -0.012em;
          color: var(--uc-cream-65);
          transition: color 0.5s ease;
        }
        .uc-tab .meta {
          font-family: var(--font-mono), ui-monospace, monospace;
          font-size: 9px; letter-spacing: 0.30em; text-transform: uppercase;
          color: var(--uc-cream-30);
          transition: color 0.5s ease;
        }
        .uc-tab[aria-selected="true"] .num { color: var(--uc-champagne); }
        .uc-tab[aria-selected="true"] .name { color: var(--uc-cream-95); }
        .uc-tab[aria-selected="true"] .meta { color: var(--uc-cream-45); }
        .uc-tab[aria-selected="true"]::after {
          content: ""; position: absolute;
          top: -1px; left: 0; right: 0; height: 1px;
          background: var(--uc-champagne);
        }
        .uc-tab[aria-selected="true"]::before {
          content: ""; position: absolute;
          bottom: -5px; left: 50%;
          width: 8px; height: 8px;
          background: #02030A;
          border-left: 1px solid var(--uc-line);
          border-bottom: 1px solid var(--uc-line);
          transform: translateX(-50%) rotate(-45deg);
        }

        /* CTA hover */
        .uc-cta { transition: gap 0.5s ease; }
        .uc-cta:hover { gap: 14px; }
      `}</style>

      <div className="uc-scope mx-auto max-w-[1600px] px-6 md:px-10 lg:px-16 xl:px-20 py-6 md:py-8 lg:py-10">
        {/* ─── Section header ─── */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-y-5 md:gap-x-8 items-end mb-6">
          <div>
            <motion.p
              {...reveal(0)}
              className="font-mono text-[11px] uppercase tracking-[0.32em] mb-4"
              style={{ color: "var(--uc-cream-55)" }}
            >
              <span style={{ color: "var(--uc-cream-45)" }} className="mr-2">
                03
              </span>
              <span style={{ color: "var(--uc-cream-30)" }} className="mr-2">
                /
              </span>
              Use cases
            </motion.p>
            <motion.h2
              id={headingId}
              {...reveal(0.08)}
              className="font-serif italic font-normal m-0 max-w-[18ch] md:max-w-[30ch]"
              style={{
                color: "var(--uc-cream-95)",
                fontSize: "clamp(1.75rem, 2.8vw, 2.5rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.018em",
              }}
            >
              Three ecosystems we&rsquo;ve built.
            </motion.h2>
          </div>
          <motion.p
            {...reveal(0.16)}
            className="font-serif italic m-0 max-w-[28ch] md:text-right md:self-end"
            style={{
              color: "var(--uc-cream-65)",
              fontSize: "clamp(1rem, 1.2vw, 1.125rem)",
              lineHeight: 1.5,
              letterSpacing: "0.005em",
            }}
          >
            From a{" "}
            <em
              className="not-italic"
              style={{ color: "var(--uc-cream-95)", fontStyle: "italic" }}
            >
              single dental clinic
            </em>{" "}
            to a{" "}
            <em
              className="not-italic"
              style={{ color: "var(--uc-cream-95)", fontStyle: "italic" }}
            >
              fleet of field technicians
            </em>
            .
          </motion.p>
        </div>

        {/* ─── Tabs ─── */}
        <motion.div
          {...reveal(0.18)}
          className="relative mb-6"
          style={{
            borderTop: "1px solid var(--uc-line)",
            borderBottom: "1px solid var(--uc-line)",
          }}
        >
          <div
            role="tablist"
            aria-label="Use case selection"
            className="grid grid-cols-1 md:grid-cols-3"
          >
            {USE_CASES.map((uc, i) => {
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
                  className="uc-tab"
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
          className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-6 lg:gap-10 items-stretch min-h-[340px] lg:min-h-[400px]"
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
              className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[400px]"
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
          className="pt-4 mt-6 flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between sm:flex-wrap sm:gap-8"
          style={{ borderTop: "1px solid var(--uc-line)" }}
        >
          <p
            className="font-serif italic m-0"
            style={{
              color: "var(--uc-cream-55)",
              fontSize: "16px",
              lineHeight: 1.4,
              letterSpacing: "0.005em",
            }}
          >
            Each ecosystem ships with a{" "}
            <em
              className="not-italic"
              style={{ color: "var(--uc-cream-95)", fontStyle: "italic" }}
            >
              30-day warranty
            </em>
            : post-launch support, full documentation, and team training.
          </p>
          <p
            className="font-mono text-[10.5px] uppercase tracking-[0.28em] m-0"
            style={{ color: "var(--uc-cream-45)" }}
          >
            Site
            <span className="mx-2.5" style={{ color: "var(--uc-cream-30)" }}>
              ·
            </span>
            Apps
            <span className="mx-2.5" style={{ color: "var(--uc-cream-30)" }}>
              ·
            </span>
            Agents
            <span className="mx-2.5" style={{ color: "var(--uc-cream-30)" }}>
              ·
            </span>
            Glue
          </p>
        </motion.div>
      </div>
    </section>
  );
}
