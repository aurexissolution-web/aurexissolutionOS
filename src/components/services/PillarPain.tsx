"use client";

import { motion, useReducedMotion } from "framer-motion";
import type {
  Pillar,
  PillarAccent,
  PillarPainItem,
  PillarSlug,
} from "@/data/pillars";

const EASE = [0.2, 0.7, 0.2, 1] as const;

type VisualVariant =
  | "taskstack"
  | "chatmiss"
  | "costcurve"
  | "waterfall"
  | "templategrid"
  | "cage"
  | "islands"
  | "stars"
  | "fork";

/* Each pillar gets 3 pain-specific visuals, in card order. */
const VISUALS_BY_PILLAR: Record<
  PillarSlug,
  [VisualVariant, VisualVariant, VisualVariant]
> = {
  "ai-automation": ["taskstack", "chatmiss", "costcurve"],
  "web-engineering": ["waterfall", "templategrid", "cage"],
  "mobile-ecosystems": ["islands", "stars", "fork"],
  "data-engineering": ["islands", "taskstack", "cage"],
};

/**
 * Diagnosis section for sub-service pillar pages.
 *
 * Mirrors the visual rhythm of `ThePainWeSolve` (used by /services/ecosystem):
 * split section header on top, then a 3-column triptych. Each card has the
 * same five elements as ecosystem — index + category eyebrow, italic title
 * with pillar-accent line, body, abstract decorative SVG, mono metric row.
 *
 * Unlike the ecosystem section, the SVG visuals are pain-specific: each of
 * the 9 cards (3 pillars × 3 cards) gets its own metaphor (task-stack,
 * chat-miss, cost-curve, waterfall, template-grid, cage, islands, stars,
 * fork). The single saturated highlight in each visual is the pillar accent.
 */
export function PillarPain({ pillar }: { pillar: Pillar }) {
  const reduceMotion = useReducedMotion();
  const reduce = !!reduceMotion;
  const { accent, pain } = pillar;
  const visuals = VISUALS_BY_PILLAR[pillar.slug];

  const reveal = (delay: number) =>
    reduce
      ? { initial: false, animate: { opacity: 1, y: 0 } }
      : {
          initial: { y: 12 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.05 },
          transition: { duration: 0.7, ease: EASE, delay },
        };

  return (
    <section
      aria-labelledby="pillar-pain-heading"
      className="relative isolate w-full"
    >
      {/* soft pillar-accent radial behind the section header */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] -z-[1]"
        style={{
          background: `radial-gradient(ellipse 60% 55% at 50% 0%, rgba(${accent.rgb}, 0.04), transparent 70%)`,
        }}
      />

      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-16 xl:px-20 py-10 md:py-12 lg:py-14">
        {/* Section header — split: headline left, subhead right */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-6 md:gap-x-10 lg:gap-x-16 mb-10 lg:mb-14">
          <div className="md:col-span-7 lg:col-span-7">
            <motion.p
              {...reveal(0)}
              className="font-mono text-[11px] uppercase tracking-[0.32em] text-white/55 mb-6"
            >
              <span className="text-white/40 mr-2">{pain.header.eyebrowNum}</span>
              <span className="text-white/30 mr-2">/</span>
              {pain.header.eyebrowLabel}
            </motion.p>
            <motion.h2
              id="pillar-pain-heading"
              {...reveal(0.08)}
              className="font-serif italic font-normal text-white/95 leading-[1.05] tracking-[-0.018em] m-0"
              style={{ fontSize: "clamp(2rem, 3.4vw, 2.875rem)" }}
            >
              {pain.header.headlineLead}
              <em
                className="not-italic"
                style={{
                  fontFamily: "var(--font-serif), Georgia, serif",
                  fontStyle: "italic",
                  color: accent.hex,
                }}
              >
                {pain.header.headlineEm}
              </em>
              {pain.header.headlineRest}
            </motion.h2>
          </div>
          <motion.div
            {...reveal(0.16)}
            className="md:col-span-5 lg:col-span-4 lg:col-start-9 md:self-end"
          >
            <p
              className="font-serif italic m-0 text-[15px] sm:text-[16px] leading-[1.5] text-white/55"
              style={{ letterSpacing: "0.005em" }}
            >
              {pain.header.subhead}
            </p>
          </motion.div>
        </div>

        {/* Triptych — 3 columns at lg+, stacked below */}
        <div className="mt-2 lg:mt-4 pt-10 lg:pt-12 border-t border-white/[0.10] grid grid-cols-1 lg:grid-cols-3">
          {pain.items.map((item, i) => (
            <PainColumn
              key={item.index}
              item={item}
              variant={visuals[i] ?? "taskstack"}
              accent={accent}
              reduce={reduce}
              isFirst={i === 0}
              isLast={i === pain.items.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function PainColumn({
  item,
  variant,
  accent,
  reduce,
  isFirst,
  isLast,
}: {
  item: PillarPainItem;
  variant: VisualVariant;
  accent: PillarAccent;
  reduce: boolean;
  isFirst: boolean;
  isLast: boolean;
}) {
  const stage = (delay: number) =>
    reduce
      ? { initial: false, animate: { opacity: 1, y: 0 } }
      : {
          initial: { y: 10 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.05 },
          transition: { duration: 0.55, ease: EASE, delay },
        };

  return (
    <article
      className={[
        "relative flex flex-col",
        !isLast ? "pb-10 lg:pb-0 border-b lg:border-b-0 border-white/[0.08]" : "",
        isFirst ? "" : "pt-10 lg:pt-0",
        !isFirst ? "lg:pl-10 xl:pl-12 lg:border-l lg:border-white/[0.08]" : "",
        !isLast ? "lg:pr-10 xl:pr-12" : "",
      ].join(" ")}
    >
      {/* Index + category */}
      <motion.p
        {...stage(0)}
        className="font-mono text-[11px] uppercase tracking-[0.32em] text-white/65 mb-5"
      >
        <span className="text-white/40 mr-2">{item.index}</span>
        <span className="text-white/25 mr-2">—</span>
        {item.category}
      </motion.p>

      {/* Title with pillar accent line */}
      <div className="relative pl-5">
        {!reduce ? (
          <motion.span
            aria-hidden
            className="absolute left-0 top-1.5 w-px h-9"
            style={{ background: accent.hex, opacity: 0.7 }}
            initial={false}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.18 }}
          />
        ) : (
          <span
            aria-hidden
            className="absolute left-0 top-1.5 w-px h-9"
            style={{ background: accent.hex, opacity: 0.7 }}
          />
        )}
        <motion.h3
          {...stage(0.1)}
          className="font-serif italic font-normal text-[clamp(1.5rem,2.2vw,2rem)] leading-[1.1] tracking-[-0.018em] text-white/95 m-0"
        >
          {item.title}
        </motion.h3>
      </div>

      {/* Body */}
      <motion.p
        {...stage(0.18)}
        className="mt-5 text-[14.5px] sm:text-[15px] leading-[1.6] text-white/60 max-w-[36ch]"
      >
        {item.body}
      </motion.p>

      {/* Visual */}
      <motion.div {...stage(0.24)} className="mt-7 w-full">
        <PainVisual variant={variant} accent={accent} reduce={reduce} />
      </motion.div>

      {/* Metric row */}
      <motion.div
        {...stage(0.32)}
        className="mt-6 flex items-baseline gap-3"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-white/40">
          {item.metric.label}
        </span>
        <span aria-hidden className="h-px flex-1 max-w-[40px] bg-white/15" />
        <span className="font-mono text-[15px] tracking-[0.04em] text-white/90">
          {item.metric.value}
        </span>
      </motion.div>
    </article>
  );
}

/* ─────────────────────────────────────────────────────────────
   Visual switch — 9 pain-specific abstract metaphors. Same
   hairline language across all of them; single saturated
   highlight in each one is the pillar accent.
   ───────────────────────────────────────────────────────────── */

function PainVisual({
  variant,
  accent,
  reduce,
}: {
  variant: VisualVariant;
  accent: PillarAccent;
  reduce: boolean;
}) {
  switch (variant) {
    case "taskstack":
      return <TaskStackVisual accent={accent} reduce={reduce} />;
    case "chatmiss":
      return <ChatMissVisual accent={accent} reduce={reduce} />;
    case "costcurve":
      return <CostCurveVisual accent={accent} reduce={reduce} />;
    case "waterfall":
      return <WaterfallVisual accent={accent} reduce={reduce} />;
    case "templategrid":
      return <TemplateGridVisual accent={accent} reduce={reduce} />;
    case "cage":
      return <CageVisual accent={accent} reduce={reduce} />;
    case "islands":
      return <IslandsVisual accent={accent} reduce={reduce} />;
    case "stars":
      return <StarsVisual accent={accent} reduce={reduce} />;
    case "fork":
      return <ForkVisual accent={accent} reduce={reduce} />;
  }
}

/* ── helper: 5-point star path centred at (cx,cy) with outer radius r */
function starPath(cx: number, cy: number, r: number) {
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const angle = (Math.PI * 2 * i) / 10 - Math.PI / 2;
    const radius = i % 2 === 0 ? r : r * 0.45;
    const x = cx + Math.cos(angle) * radius;
    const y = cy + Math.sin(angle) * radius;
    pts.push(`${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`);
  }
  return pts.join(" ") + " Z";
}

type VisualProps = { accent: PillarAccent; reduce: boolean };

/* ─── AI · 01 / VOLUME — TaskStack ──────────────────────────────
   A vertical queue of identical task rows on the left. The top
   row is pulled out by a violet arc into an "AI · DONE" card on
   the right — the AI taking work off the human pile. */
function TaskStackVisual({ accent, reduce }: VisualProps) {
  const stackX = 22;
  const stackW = 180;
  const rowH = 14;
  const rowGap = 4;
  const stackTop = 56;
  const rows = [0, 1, 2, 3, 4, 5];

  return (
    <svg viewBox="0 0 360 200" className="w-full h-auto" aria-hidden="true" role="img">
      {/* QUEUE label */}
      <text
        x={stackX}
        y={42}
        fontSize={6}
        fill="rgba(255,255,255,0.5)"
        fontFamily="ui-monospace, monospace"
        letterSpacing="0.32em"
      >
        QUEUE
      </text>
      <line
        x1={stackX + 38}
        y1={39}
        x2={stackX + stackW}
        y2={39}
        stroke="rgba(255,255,255,0.18)"
        strokeWidth={0.4}
      />

      {/* The 6 task rows in the queue */}
      {rows.map((i) => {
        const y = stackTop + i * (rowH + rowGap);
        const op = 0.55 - i * 0.06;
        return (
          <motion.g
            key={i}
            initial={reduce ? false : { x: -8 }}
            whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.45, ease: EASE, delay: 0.1 + i * 0.07 }}
          >
            <rect
              x={stackX}
              y={y}
              width={stackW}
              height={rowH}
              rx={2}
              fill="rgba(255,255,255,0.025)"
              stroke={`rgba(255,255,255,${op})`}
              strokeWidth={0.55}
            />
            <line
              x1={stackX + 10}
              y1={y + rowH / 2}
              x2={stackX + 76}
              y2={y + rowH / 2}
              stroke={`rgba(255,255,255,${op + 0.1})`}
              strokeWidth={0.5}
            />
            <line
              x1={stackX + 86}
              y1={y + rowH / 2}
              x2={stackX + stackW - 24}
              y2={y + rowH / 2}
              stroke={`rgba(255,255,255,${op * 0.5})`}
              strokeWidth={0.45}
            />
            <circle
              cx={stackX + stackW - 12}
              cy={y + rowH / 2}
              r={1.3}
              fill={`rgba(255,255,255,${op + 0.15})`}
            />
          </motion.g>
        );
      })}

      {/* AI · DONE card on the upper right (the lifted task) */}
      <motion.g
        initial={reduce ? false : { y: 6 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.95 }}
      >
        <text
          x={234}
          y={42}
          fontSize={6}
          fill={`rgba(${accent.rgb}, 0.95)`}
          fontFamily="ui-monospace, monospace"
          letterSpacing="0.32em"
        >
          AI · DONE
        </text>
        <line
          x1={234 + 50}
          y1={39}
          x2={342}
          y2={39}
          stroke={`rgba(${accent.rgb}, 0.35)`}
          strokeWidth={0.4}
        />
        <rect
          x={234}
          y={56}
          width={108}
          height={28}
          rx={3}
          fill={`rgba(${accent.rgb}, 0.07)`}
          stroke={`rgba(${accent.rgb}, 0.95)`}
          strokeWidth={0.95}
        />
        <line
          x1={244}
          y1={70}
          x2={310}
          y2={70}
          stroke={`rgba(${accent.rgb}, 0.7)`}
          strokeWidth={0.55}
        />
        <text
          x={332}
          y={74}
          fontSize={9}
          fill={`rgba(${accent.rgb}, 0.95)`}
          textAnchor="end"
          fontFamily="ui-monospace, monospace"
        >
          ✓
        </text>
      </motion.g>

      {/* Curved arc — lifting the top row out of the queue
          into the DONE card */}
      <motion.path
        d={`M ${stackX + stackW + 4} ${stackTop + rowH / 2} Q 222 50, 234 70`}
        stroke={`rgba(${accent.rgb}, 0.7)`}
        strokeWidth={1}
        strokeDasharray="3 3"
        fill="none"
        initial={false}
        whileInView={reduce ? undefined : { pathLength: 1 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.55 }}
      />

      {/* Subtle highlight on the top queue row — "next up" */}
      <motion.line
        x1={stackX}
        y1={stackTop + rowH + 2}
        x2={stackX + stackW}
        y2={stackTop + rowH + 2}
        stroke={`rgba(${accent.rgb}, 0.55)`}
        strokeWidth={0.8}
        initial={false}
        whileInView={reduce ? undefined : { pathLength: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: 0.6, ease: EASE, delay: 1.2 }}
      />
    </svg>
  );
}

/* ─── AI · 02 / GENERIC AI — ChatMiss ───────────────────────────
   Two Q→A pairs, both bot answers shown as off-target (dashed,
   with × marks); a violet "→ HUMAN" escalation arrow at the
   bottom — the 70% escalation rate. */
function ChatMissVisual({ accent, reduce }: VisualProps) {
  const qBubble = (y: number, key: string) => (
    <motion.g
      key={key}
      initial={reduce ? false : { x: -8 }}
      whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.5, ease: EASE, delay: 0.2 }}
    >
      <rect
        x={20}
        y={y}
        width={100}
        height={42}
        rx={6}
        fill="rgba(255,255,255,0.025)"
        stroke="rgba(255,255,255,0.65)"
        strokeWidth={0.7}
      />
      <line
        x1={32}
        y1={y + 14}
        x2={92}
        y2={y + 14}
        stroke="rgba(255,255,255,0.55)"
        strokeWidth={0.5}
      />
      <line
        x1={32}
        y1={y + 26}
        x2={108}
        y2={y + 26}
        stroke="rgba(255,255,255,0.4)"
        strokeWidth={0.5}
      />
    </motion.g>
  );

  const aBubble = (y: number, key: string) => (
    <motion.g
      key={key}
      initial={reduce ? false : { x: 8 }}
      whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.5, ease: EASE, delay: 0.4 }}
    >
      <rect
        x={208}
        y={y}
        width={120}
        height={42}
        rx={6}
        fill="rgba(255,255,255,0.025)"
        stroke="rgba(255,255,255,0.45)"
        strokeWidth={0.65}
        strokeDasharray="3 3"
      />
      <line
        x1={220}
        y1={y + 14}
        x2={290}
        y2={y + 14}
        stroke="rgba(255,255,255,0.4)"
        strokeWidth={0.5}
        strokeDasharray="2 2"
      />
      <line
        x1={220}
        y1={y + 26}
        x2={310}
        y2={y + 26}
        stroke="rgba(255,255,255,0.3)"
        strokeWidth={0.5}
        strokeDasharray="2 2"
      />
      <text
        x={320}
        y={y + 12}
        fontSize={10}
        fill="rgba(255,255,255,0.4)"
        textAnchor="end"
      >
        ×
      </text>
    </motion.g>
  );

  return (
    <svg viewBox="0 0 360 200" className="w-full h-auto" aria-hidden="true" role="img">
      {qBubble(20, "q1")}
      {qBubble(80, "q2")}
      {aBubble(20, "a1")}
      {aBubble(80, "a2")}

      {/* Q → A connectors */}
      <line
        x1={120}
        y1={41}
        x2={208}
        y2={41}
        stroke="rgba(255,255,255,0.2)"
        strokeWidth={0.5}
        strokeDasharray="2 3"
      />
      <line
        x1={120}
        y1={101}
        x2={208}
        y2={101}
        stroke="rgba(255,255,255,0.2)"
        strokeWidth={0.5}
        strokeDasharray="2 3"
      />

      {/* Violet escalation arrow at bottom */}
      <motion.g
        initial={false}
        whileInView={reduce ? undefined : { opacity: 1 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: 0.5, ease: EASE, delay: 1.0 }}
      >
        <text
          x={20}
          y={170}
          fontSize={6.5}
          fill={`rgba(${accent.rgb}, 0.85)`}
          fontFamily="ui-monospace, monospace"
          letterSpacing="0.28em"
        >
          ESCALATE
        </text>
        <line
          x1={92}
          y1={167}
          x2={324}
          y2={167}
          stroke={`rgba(${accent.rgb}, 0.7)`}
          strokeWidth={1.1}
        />
        <path
          d="M 318 162 L 328 167 L 318 172"
          stroke={`rgba(${accent.rgb}, 0.85)`}
          strokeWidth={1}
          fill="none"
        />
        <text
          x={332}
          y={170}
          fontSize={6.5}
          fill={`rgba(${accent.rgb}, 0.85)`}
          fontFamily="ui-monospace, monospace"
          letterSpacing="0.28em"
          textAnchor="end"
        >
          HUMAN
        </text>
      </motion.g>
    </svg>
  );
}

/* ─── AI · 03 / HEADCOUNT — CostCurve ───────────────────────────
   A staircase of cost rising over time, against a flat output
   line. The widening gap (the loss) is washed in violet. */
function CostCurveVisual({ accent, reduce }: VisualProps) {
  const steps: [number, number][] = [
    [40, 140],
    [90, 140],
    [90, 122],
    [150, 122],
    [150, 100],
    [210, 100],
    [210, 76],
    [270, 76],
    [270, 50],
    [330, 50],
  ];
  const path =
    steps
      .map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x} ${y}`)
      .join(" ");
  const fillPath = `${path} L 330 140 L 40 140 Z`;

  return (
    <svg viewBox="0 0 360 200" className="w-full h-auto" aria-hidden="true" role="img">
      {/* Axes */}
      <line
        x1={40}
        y1={20}
        x2={40}
        y2={170}
        stroke="rgba(255,255,255,0.2)"
        strokeWidth={0.5}
      />
      <line
        x1={40}
        y1={170}
        x2={340}
        y2={170}
        stroke="rgba(255,255,255,0.2)"
        strokeWidth={0.5}
      />

      {/* Y-ticks */}
      {[140, 110, 80, 50].map((y, i) => (
        <line
          key={`tick-${i}`}
          x1={36}
          y1={y}
          x2={40}
          y2={y}
          stroke="rgba(255,255,255,0.25)"
          strokeWidth={0.5}
        />
      ))}

      {/* Violet wash between cost and output */}
      <motion.path
        d={fillPath}
        fill={`rgba(${accent.rgb}, 0.1)`}
        stroke="none"
        initial={false}
        whileInView={reduce ? undefined : { opacity: 1 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.7 }}
      />

      {/* Output line — flat */}
      <motion.line
        x1={40}
        y1={140}
        x2={330}
        y2={140}
        stroke="rgba(255,255,255,0.55)"
        strokeWidth={0.8}
        strokeDasharray="3 3"
        initial={false}
        whileInView={reduce ? undefined : { pathLength: 1 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
      />
      <text
        x={332}
        y={138}
        fontSize={6}
        fill="rgba(255,255,255,0.5)"
        fontFamily="ui-monospace, monospace"
        letterSpacing="0.22em"
        textAnchor="end"
      >
        OUTPUT
      </text>

      {/* Cost staircase */}
      <motion.path
        d={path}
        stroke="rgba(255,255,255,0.9)"
        strokeWidth={1}
        fill="none"
        initial={false}
        whileInView={reduce ? undefined : { pathLength: 1 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: 1.1, ease: EASE, delay: 0.5 }}
      />

      {/* Cost arrowhead at end */}
      <motion.g
        initial={false}
        whileInView={reduce ? undefined : { opacity: 1 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: 0.4, ease: EASE, delay: 1.6 }}
      >
        <path
          d="M 322 56 L 332 50 L 326 60 Z"
          fill="rgba(255,255,255,0.9)"
          stroke="none"
        />
      </motion.g>

      {/* Cost label */}
      <text
        x={300}
        y={36}
        fontSize={6}
        fill={`rgba(${accent.rgb}, 0.9)`}
        fontFamily="ui-monospace, monospace"
        letterSpacing="0.22em"
        textAnchor="end"
      >
        COST
      </text>
    </svg>
  );
}

/* ─── Web · 01 / SPEED — Waterfall ──────────────────────────────
   Network resource waterfall (devtools metaphor); one critical
   resource is highlighted in blue, blocking page-load. */
function WaterfallVisual({ accent, reduce }: VisualProps) {
  const bars: { y: number; x1: number; x2: number; op: number; accent?: boolean }[] = [
    { y: 22, x1: 40, x2: 90, op: 0.55 },
    { y: 36, x1: 60, x2: 130, op: 0.55 },
    { y: 50, x1: 90, x2: 180, op: 0.55 },
    { y: 64, x1: 110, x2: 290, op: 1, accent: true },
    { y: 78, x1: 150, x2: 220, op: 0.5 },
    { y: 92, x1: 170, x2: 250, op: 0.5 },
    { y: 106, x1: 200, x2: 270, op: 0.45 },
    { y: 120, x1: 220, x2: 280, op: 0.4 },
    { y: 134, x1: 240, x2: 295, op: 0.35 },
    { y: 148, x1: 260, x2: 305, op: 0.3 },
  ];

  return (
    <svg viewBox="0 0 360 200" className="w-full h-auto" aria-hidden="true" role="img">
      {/* Time baseline */}
      <line
        x1={40}
        y1={172}
        x2={340}
        y2={172}
        stroke="rgba(255,255,255,0.2)"
        strokeWidth={0.5}
      />

      {bars.map((b, i) => (
        <motion.rect
          key={i}
          x={b.x1}
          y={b.y}
          width={b.x2 - b.x1}
          height={6}
          rx={1.5}
          fill={
            b.accent
              ? `rgba(${accent.rgb}, 0.6)`
              : `rgba(255,255,255,${b.op * 0.6})`
          }
          stroke={
            b.accent
              ? `rgba(${accent.rgb}, 0.95)`
              : `rgba(255,255,255,${b.op})`
          }
          strokeWidth={0.6}
          initial={false}
          whileInView={reduce ? undefined : { scaleX: 1, opacity: 1 }}
          style={{ transformOrigin: `${b.x1}px ${b.y}px` }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.15 + i * 0.05 }}
        />
      ))}

      {/* Highlighted bar's blocking-time label */}
      <motion.text
        x={290}
        y={62}
        fontSize={6}
        fill={`rgba(${accent.rgb}, 0.95)`}
        fontFamily="ui-monospace, monospace"
        letterSpacing="0.22em"
        textAnchor="end"
        initial={false}
        whileInView={reduce ? undefined : { opacity: 1 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: 0.4, ease: EASE, delay: 0.7 }}
      >
        4.7s
      </motion.text>

      {/* TTI guide line at the right */}
      <motion.line
        x1={320}
        y1={20}
        x2={320}
        y2={170}
        stroke="rgba(255,255,255,0.3)"
        strokeWidth={0.5}
        strokeDasharray="2 3"
        initial={false}
        whileInView={reduce ? undefined : { pathLength: 1 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.9 }}
      />
      <text
        x={324}
        y={26}
        fontSize={5.5}
        fill="rgba(255,255,255,0.45)"
        fontFamily="ui-monospace, monospace"
        letterSpacing="0.28em"
      >
        TTI
      </text>
    </svg>
  );
}

/* ─── Web · 02 / TEMPLATES — TemplateGrid ───────────────────────
   Five identical website thumbnails — emphasising sameness.
   The centre one gets a faint blue tint (ironic: still identical). */
function TemplateGridVisual({ accent, reduce }: VisualProps) {
  const cols = [0, 1, 2, 3, 4];
  const cardW = 56;
  const cardH = 110;
  const startX = 16;
  const gap = 12;
  const yTop = 50;

  return (
    <svg viewBox="0 0 360 200" className="w-full h-auto" aria-hidden="true" role="img">
      {/* "×5 IDENTICAL" overhead */}
      <line
        x1={48}
        y1={32}
        x2={140}
        y2={32}
        stroke="rgba(255,255,255,0.18)"
        strokeWidth={0.4}
      />
      <text
        x={180}
        y={35}
        fontSize={6.5}
        fill="rgba(255,255,255,0.4)"
        textAnchor="middle"
        fontFamily="ui-monospace, monospace"
        letterSpacing="0.32em"
      >
        ×5 IDENTICAL
      </text>
      <line
        x1={220}
        y1={32}
        x2={312}
        y2={32}
        stroke="rgba(255,255,255,0.18)"
        strokeWidth={0.4}
      />

      {cols.map((i) => {
        const x = startX + i * (cardW + gap);
        const isCenter = i === 2;
        return (
          <motion.g
            key={i}
            initial={reduce ? false : { y: 6 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.2 + i * 0.07 }}
          >
            <rect
              x={x}
              y={yTop}
              width={cardW}
              height={cardH}
              rx={3}
              fill={
                isCenter
                  ? `rgba(${accent.rgb}, 0.06)`
                  : "rgba(255,255,255,0.025)"
              }
              stroke={
                isCenter
                  ? `rgba(${accent.rgb}, 0.85)`
                  : "rgba(255,255,255,0.45)"
              }
              strokeWidth={0.7}
            />
            {/* Header strip */}
            <rect
              x={x + 4}
              y={yTop + 5}
              width={cardW - 8}
              height={6}
              fill={
                isCenter
                  ? `rgba(${accent.rgb}, 0.5)`
                  : "rgba(255,255,255,0.3)"
              }
            />
            {/* Hero rule */}
            <line
              x1={x + 6}
              y1={yTop + 22}
              x2={x + cardW - 6}
              y2={yTop + 22}
              stroke="rgba(255,255,255,0.4)"
              strokeWidth={0.5}
            />
            {/* Content rows */}
            <line
              x1={x + 6}
              y1={yTop + 38}
              x2={x + cardW - 10}
              y2={yTop + 38}
              stroke="rgba(255,255,255,0.28)"
              strokeWidth={0.5}
            />
            <line
              x1={x + 6}
              y1={yTop + 50}
              x2={x + cardW - 16}
              y2={yTop + 50}
              stroke="rgba(255,255,255,0.25)"
              strokeWidth={0.5}
            />
            <line
              x1={x + 6}
              y1={yTop + 62}
              x2={x + cardW - 22}
              y2={yTop + 62}
              stroke="rgba(255,255,255,0.2)"
              strokeWidth={0.5}
            />
            {/* CTA box */}
            <rect
              x={x + 6}
              y={yTop + 78}
              width={cardW - 12}
              height={10}
              rx={1}
              fill="none"
              stroke="rgba(255,255,255,0.32)"
              strokeWidth={0.5}
            />
            {/* Footer rule */}
            <line
              x1={x + 6}
              y1={yTop + 96}
              x2={x + cardW - 6}
              y2={yTop + 96}
              stroke="rgba(255,255,255,0.2)"
              strokeWidth={0.4}
            />
          </motion.g>
        );
      })}
    </svg>
  );
}

/* ─── Web · 03 / LOCK-IN — Cage ────────────────────────────────
   A custom-feature card hemmed in by L-bracket "cage corners";
   a blue arrow tries to push out, blocked by the bracket. */
function CageVisual({ accent, reduce }: VisualProps) {
  const x = 80;
  const y = 50;
  const w = 200;
  const h = 100;
  const bracketLen = 18;
  const corners = [
    { cx: x - 10, cy: y - 10, dx: 1, dy: 1 },
    { cx: x + w + 10, cy: y - 10, dx: -1, dy: 1 },
    { cx: x - 10, cy: y + h + 10, dx: 1, dy: -1 },
    { cx: x + w + 10, cy: y + h + 10, dx: -1, dy: -1 },
  ];

  return (
    <svg viewBox="0 0 360 200" className="w-full h-auto" aria-hidden="true" role="img">
      {/* The "feature" card */}
      <motion.g
        initial={reduce ? false : { scale: 0.95 }}
        whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: 0.55, ease: EASE, delay: 0.2 }}
      >
        <rect
          x={x}
          y={y}
          width={w}
          height={h}
          rx={4}
          fill="rgba(255,255,255,0.025)"
          stroke="rgba(255,255,255,0.6)"
          strokeWidth={0.75}
        />
        <line
          x1={x + 14}
          y1={y + 22}
          x2={x + 78}
          y2={y + 22}
          stroke="rgba(255,255,255,0.6)"
          strokeWidth={0.55}
        />
        <line
          x1={x + 14}
          y1={y + 42}
          x2={x + w - 24}
          y2={y + 42}
          stroke="rgba(255,255,255,0.45)"
          strokeWidth={0.55}
        />
        <line
          x1={x + 14}
          y1={y + 60}
          x2={x + w - 44}
          y2={y + 60}
          stroke="rgba(255,255,255,0.4)"
          strokeWidth={0.55}
        />
        <line
          x1={x + 14}
          y1={y + 78}
          x2={x + w - 60}
          y2={y + 78}
          stroke="rgba(255,255,255,0.35)"
          strokeWidth={0.55}
        />
      </motion.g>

      {/* Cage corner brackets */}
      {corners.map((c, i) => (
        <motion.g
          key={i}
          initial={false}
          whileInView={reduce ? undefined : { opacity: 1 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.4, ease: EASE, delay: 0.4 + i * 0.08 }}
        >
          <line
            x1={c.cx}
            y1={c.cy}
            x2={c.cx + bracketLen * c.dx}
            y2={c.cy}
            stroke="rgba(255,255,255,0.78)"
            strokeWidth={1.2}
          />
          <line
            x1={c.cx}
            y1={c.cy}
            x2={c.cx}
            y2={c.cy + bracketLen * c.dy}
            stroke="rgba(255,255,255,0.78)"
            strokeWidth={1.2}
          />
        </motion.g>
      ))}

      {/* Blue arrow trying to escape on the right, blocked by bracket */}
      <motion.g
        initial={reduce ? false : { x: -8 }}
        whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: 0.6, ease: EASE, delay: 1.0 }}
      >
        <line
          x1={x + w - 4}
          y1={y + h / 2}
          x2={x + w + 22}
          y2={y + h / 2}
          stroke={`rgba(${accent.rgb}, 0.85)`}
          strokeWidth={1.2}
          strokeDasharray="4 3"
        />
        <path
          d={`M ${x + w + 16} ${y + h / 2 - 5} L ${x + w + 26} ${y + h / 2} L ${x + w + 16} ${y + h / 2 + 5}`}
          stroke={`rgba(${accent.rgb}, 0.95)`}
          strokeWidth={1}
          fill="none"
        />
      </motion.g>
    </svg>
  );
}

/* ─── Mobile · 01 / DISCONNECTED — Islands ─────────────────────
   A central app (emerald) surrounded by 4 system tiles; the
   dotted connections are broken (× marks mid-line). */
function IslandsVisual({ accent, reduce }: VisualProps) {
  const cx = 175;
  const cy = 70;
  const appW = 40;
  const appH = 60;

  const systems = [
    { x: 16, y: 18, w: 60, h: 36, label: "DATA" },
    { x: 284, y: 18, w: 60, h: 36, label: "API" },
    { x: 16, y: 144, w: 60, h: 36, label: "CRM" },
    { x: 284, y: 144, w: 60, h: 36, label: "PAY" },
  ];

  const ax = cx;
  const ay = cy + appH / 2;

  return (
    <svg viewBox="0 0 360 200" className="w-full h-auto" aria-hidden="true" role="img">
      {/* Broken dotted connections (behind tiles) */}
      {systems.map((s, i) => {
        const sx = s.x + s.w / 2;
        const sy = s.y + s.h / 2;
        const midX = (sx + ax) / 2;
        const midY = (sy + ay) / 2;
        return (
          <motion.g
            key={`c-${i}`}
            initial={false}
            whileInView={reduce ? undefined : { opacity: 1 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.4, ease: EASE, delay: 0.6 + i * 0.06 }}
          >
            <line
              x1={sx}
              y1={sy}
              x2={midX - 6}
              y2={midY - 4}
              stroke="rgba(255,255,255,0.32)"
              strokeWidth={0.6}
              strokeDasharray="3 3"
            />
            <line
              x1={midX + 6}
              y1={midY + 4}
              x2={ax}
              y2={ay}
              stroke="rgba(255,255,255,0.32)"
              strokeWidth={0.6}
              strokeDasharray="3 3"
            />
            <text
              x={midX}
              y={midY + 3}
              fontSize={9}
              fill="rgba(255,255,255,0.55)"
              textAnchor="middle"
              fontFamily="ui-monospace, monospace"
            >
              ×
            </text>
          </motion.g>
        );
      })}

      {/* System tiles */}
      {systems.map((s, i) => (
        <motion.g
          key={`s-${i}`}
          initial={reduce ? false : { y: 6 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.2 + i * 0.06 }}
        >
          <rect
            x={s.x}
            y={s.y}
            width={s.w}
            height={s.h}
            rx={3}
            fill="rgba(255,255,255,0.025)"
            stroke="rgba(255,255,255,0.55)"
            strokeWidth={0.7}
          />
          <text
            x={s.x + s.w / 2}
            y={s.y + s.h / 2 + 2}
            fontSize={6.5}
            fill="rgba(255,255,255,0.6)"
            textAnchor="middle"
            fontFamily="ui-monospace, monospace"
            letterSpacing="0.28em"
          >
            {s.label}
          </text>
        </motion.g>
      ))}

      {/* Centre app — phone-shaped, emerald accent */}
      <motion.g
        initial={reduce ? false : { scale: 0.92 }}
        whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.9 }}
      >
        <rect
          x={cx - appW / 2}
          y={cy}
          width={appW}
          height={appH}
          rx={6}
          fill={`rgba(${accent.rgb}, 0.06)`}
          stroke={`rgba(${accent.rgb}, 0.95)`}
          strokeWidth={1}
        />
        <rect
          x={cx - 6}
          y={cy + 4}
          width={12}
          height={2}
          rx={1}
          fill={`rgba(${accent.rgb}, 0.6)`}
        />
        <line
          x1={cx - appW / 2 + 6}
          y1={cy + 16}
          x2={cx + appW / 2 - 6}
          y2={cy + 16}
          stroke="rgba(255,255,255,0.45)"
          strokeWidth={0.5}
        />
        <line
          x1={cx - appW / 2 + 6}
          y1={cy + 28}
          x2={cx + appW / 2 - 10}
          y2={cy + 28}
          stroke="rgba(255,255,255,0.32)"
          strokeWidth={0.5}
        />
        <line
          x1={cx - appW / 2 + 6}
          y1={cy + 40}
          x2={cx + appW / 2 - 14}
          y2={cy + 40}
          stroke="rgba(255,255,255,0.3)"
          strokeWidth={0.5}
        />
        <rect
          x={cx - 8}
          y={cy + appH - 6}
          width={16}
          height={1.5}
          rx={0.5}
          fill={`rgba(${accent.rgb}, 0.6)`}
        />
      </motion.g>
    </svg>
  );
}

/* ─── Mobile · 02 / QUALITY — Stars ─────────────────────────────
   App-store stars (3.4★): 3 filled, 1 half (emerald), 1 empty —
   plus a descending bar chart showing the download dropoff. */
function StarsVisual({ accent, reduce }: VisualProps) {
  const r = 13;
  const cy = 38;
  const startX = 60;
  const gap = 52;

  const halfStarCx = startX + 3 * gap;

  return (
    <svg viewBox="0 0 360 200" className="w-full h-auto" aria-hidden="true" role="img">
      <defs>
        <clipPath id="halfStarClip">
          <rect
            x={halfStarCx - r}
            y={cy - r - 2}
            width={r}
            height={r * 2 + 4}
          />
        </clipPath>
      </defs>

      {/* Filled stars: 1, 2, 3 */}
      {[0, 1, 2].map((i) => (
        <motion.path
          key={`f-${i}`}
          d={starPath(startX + i * gap, cy, r)}
          fill="rgba(255,255,255,0.85)"
          initial={reduce ? false : { scale: 0.7 }}
          whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.4, ease: EASE, delay: 0.15 + i * 0.08 }}
          style={{ transformOrigin: `${startX + i * gap}px ${cy}px` }}
        />
      ))}

      {/* Half star outline + emerald left half */}
      <motion.path
        d={starPath(halfStarCx, cy, r)}
        fill="rgba(255,255,255,0.04)"
        stroke="rgba(255,255,255,0.55)"
        strokeWidth={0.7}
        initial={reduce ? false : { scale: 0.7 }}
        whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: 0.4, ease: EASE, delay: 0.4 }}
        style={{ transformOrigin: `${halfStarCx}px ${cy}px` }}
      />
      <motion.path
        d={starPath(halfStarCx, cy, r)}
        fill={`rgba(${accent.rgb}, 0.85)`}
        clipPath="url(#halfStarClip)"
        initial={false}
        whileInView={reduce ? undefined : { opacity: 1 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: 0.5, ease: EASE, delay: 0.6 }}
      />

      {/* Empty star */}
      <motion.path
        d={starPath(startX + 4 * gap, cy, r)}
        fill="none"
        stroke="rgba(255,255,255,0.3)"
        strokeWidth={0.6}
        initial={reduce ? false : { scale: 0.7 }}
        whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: 0.4, ease: EASE, delay: 0.5 }}
        style={{ transformOrigin: `${startX + 4 * gap}px ${cy}px` }}
      />

      {/* Rating */}
      <text
        x={180}
        y={84}
        fontSize={6.5}
        fill="rgba(255,255,255,0.55)"
        textAnchor="middle"
        fontFamily="ui-monospace, monospace"
        letterSpacing="0.32em"
      >
        3.4 / 5.0
      </text>

      {/* Descending download bars */}
      <line
        x1={40}
        y1={172}
        x2={320}
        y2={172}
        stroke="rgba(255,255,255,0.2)"
        strokeWidth={0.4}
      />
      {[0, 1, 2, 3, 4].map((i) => {
        const isLast = i === 4;
        const barH = 60 - i * 11;
        const x = 60 + i * 52;
        return (
          <motion.rect
            key={`bar-${i}`}
            x={x}
            y={172 - barH}
            width={32}
            height={barH}
            fill={
              isLast
                ? `rgba(${accent.rgb}, 0.4)`
                : `rgba(255,255,255,${0.5 - i * 0.07})`
            }
            stroke={
              isLast
                ? `rgba(${accent.rgb}, 0.85)`
                : `rgba(255,255,255,${0.6 - i * 0.07})`
            }
            strokeWidth={0.5}
            initial={false}
            whileInView={reduce ? undefined : { scaleY: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.7 + i * 0.08 }}
            style={{ transformOrigin: `${x}px 172px` }}
          />
        );
      })}
    </svg>
  );
}

/* ─── Mobile · 03 / WRONG STACK — Fork ──────────────────────────
   A "USE CASE" node forks into two columns: RN (greyed/dashed —
   what 85% of agencies pick by default) and NATIVE (emerald —
   the deliberate fit). */
function ForkVisual({ accent, reduce }: VisualProps) {
  const leftX = 50;
  const rightX = 220;
  const colW = 90;

  const rnLayers = [
    { y: 76, label: "RN", op: 0.55 },
    { y: 110, label: "JS BRIDGE", op: 0.4 },
    { y: 144, label: "SHARED UI", op: 0.32 },
  ];
  const nativeLayers = [
    { y: 76, label: "NATIVE", isAccent: true },
    { y: 110, label: "SWIFT" },
    { y: 144, label: "KOTLIN" },
  ];

  return (
    <svg viewBox="0 0 360 200" className="w-full h-auto" aria-hidden="true" role="img">
      {/* Top decision node */}
      <motion.g
        initial={reduce ? false : { y: -6 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: 0.5, ease: EASE, delay: 0.2 }}
      >
        <rect
          x={140}
          y={20}
          width={80}
          height={22}
          rx={3}
          fill="rgba(255,255,255,0.04)"
          stroke="rgba(255,255,255,0.7)"
          strokeWidth={0.75}
        />
        <text
          x={180}
          y={35}
          fontSize={6.5}
          fill="rgba(255,255,255,0.78)"
          textAnchor="middle"
          fontFamily="ui-monospace, monospace"
          letterSpacing="0.32em"
        >
          USE CASE
        </text>
      </motion.g>

      {/* Forking lines down */}
      <motion.line
        x1={170}
        y1={42}
        x2={leftX + colW / 2}
        y2={70}
        stroke="rgba(255,255,255,0.3)"
        strokeWidth={0.6}
        strokeDasharray="3 3"
        initial={false}
        whileInView={reduce ? undefined : { pathLength: 1 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: 0.55, ease: EASE, delay: 0.5 }}
      />
      <motion.line
        x1={190}
        y1={42}
        x2={rightX + colW / 2}
        y2={70}
        stroke={`rgba(${accent.rgb}, 0.85)`}
        strokeWidth={0.9}
        initial={false}
        whileInView={reduce ? undefined : { pathLength: 1 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: 0.55, ease: EASE, delay: 0.7 }}
      />

      {/* Left column — RN (default, greyed) */}
      <g opacity={0.7}>
        <text
          x={leftX + colW - 4}
          y={66}
          fontSize={5.5}
          fill="rgba(255,255,255,0.4)"
          textAnchor="end"
          fontFamily="ui-monospace, monospace"
          letterSpacing="0.28em"
        >
          85% DEFAULT
        </text>
        {rnLayers.map((l, i) => (
          <motion.g
            key={`rn-${i}`}
            initial={reduce ? false : { y: 4 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.45, ease: EASE, delay: 0.8 + i * 0.07 }}
          >
            <rect
              x={leftX}
              y={l.y}
              width={colW}
              height={26}
              rx={3}
              fill="rgba(255,255,255,0.02)"
              stroke={`rgba(255,255,255,${l.op})`}
              strokeWidth={0.55}
              strokeDasharray="2 2"
            />
            <text
              x={leftX + 8}
              y={l.y + 16}
              fontSize={6.5}
              fill={`rgba(255,255,255,${l.op + 0.1})`}
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.28em"
            >
              {l.label}
            </text>
          </motion.g>
        ))}
      </g>

      {/* Right column — NATIVE (the deliberate pick) */}
      <g>
        <text
          x={rightX + colW - 4}
          y={66}
          fontSize={5.5}
          fill={`rgba(${accent.rgb}, 0.95)`}
          textAnchor="end"
          fontFamily="ui-monospace, monospace"
          letterSpacing="0.28em"
        >
          RIGHT FIT ✓
        </text>
        {nativeLayers.map((l, i) => (
          <motion.g
            key={`n-${i}`}
            initial={reduce ? false : { y: 4 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.45, ease: EASE, delay: 1.0 + i * 0.07 }}
          >
            <rect
              x={rightX}
              y={l.y}
              width={colW}
              height={26}
              rx={3}
              fill={
                l.isAccent
                  ? `rgba(${accent.rgb}, 0.08)`
                  : "rgba(255,255,255,0.025)"
              }
              stroke={
                l.isAccent
                  ? `rgba(${accent.rgb}, 0.95)`
                  : "rgba(255,255,255,0.55)"
              }
              strokeWidth={l.isAccent ? 0.85 : 0.6}
            />
            <text
              x={rightX + 8}
              y={l.y + 16}
              fontSize={6.5}
              fill={
                l.isAccent
                  ? `rgba(${accent.rgb}, 0.95)`
                  : "rgba(255,255,255,0.65)"
              }
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.28em"
            >
              {l.label}
            </text>
          </motion.g>
        ))}
      </g>
    </svg>
  );
}
