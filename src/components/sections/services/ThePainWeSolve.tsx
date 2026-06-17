"use client";

import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.2, 0.7, 0.2, 1] as const;
const CYAN = "var(--color-electric-cyan)";

type VisualType = "scatter" | "bridge" | "stack";

type Pain = {
  index: string;
  label: string;
  headline: string;
  body: string;
  metric: { label: string; value: string };
  visual: VisualType;
};

const PAINS: Pain[] = [
  {
    index: "01",
    label: "Tool sprawl",
    headline: "Eight subscriptions that don’t talk.",
    body: "You’re paying for HubSpot, Notion, Slack, Sheets, Stripe, Calendly, and three more. None of them know about each other.",
    metric: { label: "Measured cost", value: "8+ tools" },
    visual: "scatter",
  },
  {
    index: "02",
    label: "Manual data bridging",
    headline: "Your team is the API.",
    body: "Copy-pasting between systems is the invisible tax on every operator you’ve hired. It compounds, and it never shows up on a P&L.",
    metric: { label: "Measured cost", value: "~14 hrs / wk" },
    visual: "bridge",
  },
  {
    index: "03",
    label: "No source of truth",
    headline: "Three customers, one customer.",
    body: "Sales sees one record. Support sees another. Finance sees a third. Every meeting begins with “wait, which number is right?”",
    metric: { label: "Measured cost", value: "3 versions" },
    visual: "stack",
  },
];

/* ─────────────────────────────────────────────────────────────
   ScatterVisual — eight floating "app tiles" with broken links
   ───────────────────────────────────────────────────────────── */
function ScatterVisual({ reduce }: { reduce: boolean }) {
  const tiles: Array<{
    x: number;
    y: number;
    w: number;
    h: number;
    op: number;
  }> = [
    { x: 24, y: 22, w: 60, h: 46, op: 0.65 },
    { x: 110, y: 8, w: 60, h: 46, op: 0.85 },
    { x: 198, y: 36, w: 60, h: 46, op: 0.5 },
    { x: 282, y: 14, w: 60, h: 46, op: 0.7 },
    { x: 56, y: 116, w: 60, h: 46, op: 0.6 },
    { x: 144, y: 138, w: 60, h: 46, op: 0.4 },
    { x: 232, y: 116, w: 60, h: 46, op: 0.85 },
    { x: 310, y: 150, w: 38, h: 32, op: 0.5 },
  ];

  // dotted broken connections that try (and fail) to bind the tiles
  const lines: Array<{
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    op: number;
  }> = [
    { x1: 84, y1: 44, x2: 110, y2: 30, op: 0.22 },
    { x1: 170, y1: 30, x2: 198, y2: 58, op: 0.18 },
    { x1: 258, y1: 58, x2: 282, y2: 36, op: 0.22 },
    { x1: 86, y1: 138, x2: 144, y2: 158, op: 0.18 },
    { x1: 204, y1: 160, x2: 232, y2: 138, op: 0.2 },
    { x1: 116, y1: 68, x2: 56, y2: 116, op: 0.15 },
  ];

  return (
    <svg
      viewBox="0 0 360 200"
      className="w-full h-auto"
      aria-hidden="true"
      role="img"
    >
      {/* broken connections (drawn behind tiles) */}
      {lines.map((l, i) => (
        <motion.line
          key={`l-${i}`}
          x1={l.x1}
          y1={l.y1}
          x2={l.x2}
          y2={l.y2}
          stroke={`rgba(255,255,255,${l.op})`}
          strokeWidth={0.7}
          strokeDasharray="3 4"
          initial={reduce ? false : { pathLength: 0, opacity: 0 }}
          whileInView={
            reduce ? undefined : { pathLength: 1, opacity: 1 }
          }
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.4 + i * 0.06 }}
        />
      ))}

      {/* tiles */}
      {tiles.map((t, i) => (
        <motion.g
          key={`t-${i}`}
          initial={reduce ? false : { opacity: 0, y: 8 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.15 + i * 0.06 }}
        >
          <rect
            x={t.x}
            y={t.y}
            width={t.w}
            height={t.h}
            rx={4}
            fill="rgba(255,255,255,0.025)"
            stroke={`rgba(255,255,255,${t.op})`}
            strokeWidth={0.7}
          />
          {/* tiny inner detail to suggest "an app" */}
          <line
            x1={t.x + 8}
            y1={t.y + t.h * 0.42}
            x2={t.x + t.w - 12}
            y2={t.y + t.h * 0.42}
            stroke={`rgba(255,255,255,${t.op * 0.45})`}
            strokeWidth={0.5}
          />
          <line
            x1={t.x + 8}
            y1={t.y + t.h * 0.62}
            x2={t.x + t.w - 22}
            y2={t.y + t.h * 0.62}
            stroke={`rgba(255,255,255,${t.op * 0.3})`}
            strokeWidth={0.5}
          />
          <circle
            cx={t.x + 11}
            cy={t.y + t.h * 0.82}
            r={1.6}
            fill={`rgba(255,255,255,${t.op * 0.7})`}
          />
        </motion.g>
      ))}

      {/* one tile gets a soft cyan undersweep — the only saturated color */}
      <motion.line
        x1={tiles[1].x}
        y1={tiles[1].y + tiles[1].h + 4}
        x2={tiles[1].x + tiles[1].w}
        y2={tiles[1].y + tiles[1].h + 4}
        stroke="rgba(0,240,255,0.55)"
        strokeWidth={1}
        initial={reduce ? false : { pathLength: 0, opacity: 0 }}
        whileInView={
          reduce ? undefined : { pathLength: 1, opacity: 1 }
        }
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: EASE, delay: 1.0 }}
      />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   BridgeVisual — two records joined by a copy-paste cycle arrow
   ───────────────────────────────────────────────────────────── */
function BridgeVisual({ reduce }: { reduce: boolean }) {
  const cardW = 220;
  const cardH = 56;
  const c1 = { x: 70, y: 14 };
  const c2 = { x: 70, y: 130 };

  const fields = (cx: number, cy: number, op: number) => (
    <>
      <line
        x1={cx + 12}
        y1={cy + 18}
        x2={cx + 78}
        y2={cy + 18}
        stroke={`rgba(255,255,255,${op * 0.65})`}
        strokeWidth={0.55}
      />
      <line
        x1={cx + 12}
        y1={cy + 32}
        x2={cx + 132}
        y2={cy + 32}
        stroke={`rgba(255,255,255,${op * 0.45})`}
        strokeWidth={0.55}
      />
      <line
        x1={cx + 12}
        y1={cy + 44}
        x2={cx + 102}
        y2={cy + 44}
        stroke={`rgba(255,255,255,${op * 0.45})`}
        strokeWidth={0.55}
      />
    </>
  );

  return (
    <svg
      viewBox="0 0 360 200"
      className="w-full h-auto"
      aria-hidden="true"
      role="img"
    >
      {/* Card 1 — source */}
      <motion.g
        initial={reduce ? false : { opacity: 0, y: -8 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55, ease: EASE, delay: 0.2 }}
      >
        <rect
          x={c1.x}
          y={c1.y}
          width={cardW}
          height={cardH}
          rx={4}
          fill="rgba(255,255,255,0.03)"
          stroke="rgba(255,255,255,0.7)"
          strokeWidth={0.7}
        />
        {fields(c1.x, c1.y, 1)}
        <text
          x={c1.x + cardW - 10}
          y={c1.y + 12}
          fontSize={5.5}
          fill="rgba(255,255,255,0.45)"
          textAnchor="end"
          fontFamily="ui-monospace, monospace"
          letterSpacing="0.18em"
        >
          SYSTEM A
        </text>
      </motion.g>

      {/* Bridging arrow — dotted curve */}
      <motion.path
        d={`M ${c1.x + cardW / 2} ${c1.y + cardH + 4} Q ${
          c1.x + cardW / 2 + 50
        } 100, ${c2.x + cardW / 2} ${c2.y - 4}`}
        stroke="rgba(0,240,255,0.55)"
        strokeWidth={0.9}
        strokeDasharray="3 3"
        fill="none"
        initial={reduce ? false : { pathLength: 0 }}
        whileInView={reduce ? undefined : { pathLength: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.0, ease: EASE, delay: 0.5 }}
      />

      {/* ↺ glyph at the curve apex — the "your team is the API" mark */}
      <motion.text
        x={c1.x + cardW / 2 + 50}
        y={104}
        fontSize={11}
        fill="rgba(0,240,255,0.85)"
        textAnchor="middle"
        initial={reduce ? false : { opacity: 0, scale: 0.8 }}
        whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.4, ease: EASE, delay: 1.2 }}
      >
        ↺
      </motion.text>

      {/* Ghost duplicate card — the "extra version" your team manually creates */}
      <motion.g
        initial={reduce ? false : { opacity: 0, x: 12 }}
        whileInView={reduce ? undefined : { opacity: 0.5, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: EASE, delay: 1.0 }}
      >
        <rect
          x={c1.x + cardW / 2 + 70}
          y={86}
          width={cardW * 0.7}
          height={cardH * 0.6}
          rx={3}
          fill="none"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth={0.5}
          strokeDasharray="2 3"
        />
        <line
          x1={c1.x + cardW / 2 + 78}
          y1={100}
          x2={c1.x + cardW / 2 + 130}
          y2={100}
          stroke="rgba(255,255,255,0.3)"
          strokeWidth={0.5}
        />
        <line
          x1={c1.x + cardW / 2 + 78}
          y1={112}
          x2={c1.x + cardW / 2 + 154}
          y2={112}
          stroke="rgba(255,255,255,0.22)"
          strokeWidth={0.5}
        />
      </motion.g>

      {/* Card 2 — destination */}
      <motion.g
        initial={reduce ? false : { opacity: 0, y: 8 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55, ease: EASE, delay: 0.35 }}
      >
        <rect
          x={c2.x}
          y={c2.y}
          width={cardW}
          height={cardH}
          rx={4}
          fill="rgba(255,255,255,0.03)"
          stroke="rgba(255,255,255,0.7)"
          strokeWidth={0.7}
        />
        {fields(c2.x, c2.y, 1)}
        <text
          x={c2.x + cardW - 10}
          y={c2.y + 12}
          fontSize={5.5}
          fill="rgba(255,255,255,0.45)"
          textAnchor="end"
          fontFamily="ui-monospace, monospace"
          letterSpacing="0.18em"
        >
          SYSTEM B
        </text>
      </motion.g>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   StackVisual — three customer records, same name, different data
   ───────────────────────────────────────────────────────────── */
function StackVisual({ reduce }: { reduce: boolean }) {
  const cardW = 230;
  const cardH = 100;
  const cards = [
    {
      ox: 14,
      oy: 14,
      tint: "16,185,129", // emerald
      label: "SUPPORT",
      email: "ada@acme.io",
      strokeOp: 0.32,
    },
    {
      ox: 38,
      oy: 38,
      tint: "139,92,246", // violet
      label: "FINANCE",
      email: "ada+billing@acme.io",
      strokeOp: 0.5,
    },
    {
      ox: 62,
      oy: 62,
      tint: "0,240,255", // cyan
      label: "SALES",
      email: "a.lovelace@acme.io",
      strokeOp: 0.85,
    },
  ];

  return (
    <svg
      viewBox="0 0 360 200"
      className="w-full h-auto"
      aria-hidden="true"
      role="img"
    >
      {cards.map((c, i) => (
        <motion.g
          key={i}
          initial={
            reduce ? false : { opacity: 0, x: c.ox - 14, y: c.oy - 6 }
          }
          whileInView={
            reduce ? undefined : { opacity: 1, x: c.ox, y: c.oy }
          }
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.2 + i * 0.13 }}
        >
          <rect
            x={0}
            y={0}
            width={cardW}
            height={cardH}
            rx={4}
            fill={`rgba(${c.tint},0.025)`}
            stroke={`rgba(${c.tint},${c.strokeOp})`}
            strokeWidth={0.75}
          />
          {/* system badge */}
          <text
            x={14}
            y={20}
            fontSize={5.5}
            fill={`rgba(${c.tint},0.85)`}
            fontFamily="ui-monospace, monospace"
            letterSpacing="0.22em"
          >
            {c.label}
          </text>
          {/* name field — same value */}
          <text
            x={14}
            y={42}
            fontSize={5}
            fill="rgba(255,255,255,0.42)"
            fontFamily="ui-monospace, monospace"
            letterSpacing="0.18em"
          >
            NAME
          </text>
          <text
            x={14}
            y={56}
            fontSize={11}
            fill="rgba(255,255,255,0.92)"
            fontFamily="ui-serif, Georgia, serif"
            fontStyle="italic"
          >
            Ada Lovelace
          </text>
          {/* email — DIFFERENT value per card */}
          <text
            x={14}
            y={76}
            fontSize={5}
            fill="rgba(255,255,255,0.42)"
            fontFamily="ui-monospace, monospace"
            letterSpacing="0.18em"
          >
            EMAIL
          </text>
          <text
            x={14}
            y={89}
            fontSize={8}
            fill={`rgba(${c.tint},0.85)`}
            fontFamily="ui-monospace, monospace"
          >
            {c.email}
          </text>
        </motion.g>
      ))}
    </svg>
  );
}

function PainVisual({
  type,
  reduce,
}: {
  type: VisualType;
  reduce: boolean;
}) {
  switch (type) {
    case "scatter":
      return <ScatterVisual reduce={reduce} />;
    case "bridge":
      return <BridgeVisual reduce={reduce} />;
    case "stack":
      return <StackVisual reduce={reduce} />;
  }
}

function PainColumn({
  pain,
  reduce,
  isFirst,
  isLast,
}: {
  pain: Pain;
  reduce: boolean;
  isFirst: boolean;
  isLast: boolean;
}) {
  const item = (delay: number) =>
    reduce
      ? { initial: false, animate: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0, y: 10 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.25 },
          transition: { duration: 0.55, ease: EASE, delay },
        };

  return (
    <article
      className={[
        "relative flex flex-col",
        // mobile/tablet: horizontal hairline between columns
        !isLast ? "pb-10 lg:pb-0 border-b lg:border-b-0 border-white/[0.08]" : "",
        isFirst ? "" : "pt-10 lg:pt-0",
        // lg+: vertical hairline between columns
        !isFirst ? "lg:pl-10 xl:pl-12 lg:border-l lg:border-white/[0.08]" : "",
        !isLast ? "lg:pr-10 xl:pr-12" : "",
      ].join(" ")}
    >
      {/* Index + label */}
      <motion.p
        {...item(0)}
        className="font-mono text-[11px] uppercase tracking-[0.32em] text-white/65 mb-5"
      >
        <span className="text-white/40 mr-2">{pain.index}</span>
        <span className="text-white/25 mr-2">—</span>
        {pain.label}
      </motion.p>

      {/* headline + cyan accent mark */}
      <div className="relative pl-5">
        {!reduce ? (
          <motion.span
            aria-hidden
            className="absolute left-0 top-1.5 w-px h-8"
            style={{ background: CYAN, opacity: 0.7 }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.18 }}
          />
        ) : (
          <span
            aria-hidden
            className="absolute left-0 top-1.5 w-px h-8"
            style={{ background: CYAN, opacity: 0.7 }}
          />
        )}
        <motion.h3
          {...item(0.1)}
          className="font-serif italic font-normal text-[clamp(1.5rem,2.2vw,2rem)] leading-[1.08] tracking-[-0.018em] text-white/95"
        >
          {pain.headline}
        </motion.h3>
      </div>

      <motion.p
        {...item(0.18)}
        className="mt-4 text-[14.5px] leading-[1.6] text-white/60"
      >
        {pain.body}
      </motion.p>

      {/* Visual */}
      <motion.div
        {...item(0.24)}
        className="mt-7 w-full"
      >
        <PainVisual type={pain.visual} reduce={reduce} />
      </motion.div>

      {/* Metric — caption beneath the visual */}
      <motion.div
        {...item(0.32)}
        className="mt-6 flex items-baseline gap-3"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-white/40">
          {pain.metric.label}
        </span>
        <span aria-hidden className="h-px flex-1 max-w-[40px] bg-white/15" />
        <span className="font-mono text-[15px] tracking-[0.04em] text-white/90">
          {pain.metric.value}
        </span>
      </motion.div>
    </article>
  );
}

export function ThePainWeSolve() {
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
      aria-labelledby="the-pain-we-solve-heading"
      className="relative isolate w-full"
    >
      {/* soft cyan radial behind the section header */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px] -z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 50% 0%, rgba(0,240,255,0.05), transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-16 xl:px-20 py-10 md:py-12 lg:py-14">
        {/* Section header — split: headline left, blurb right */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-8 md:gap-x-10 lg:gap-x-16">
          <div className="md:col-span-7 lg:col-span-7">
            <motion.p
              {...reveal(0)}
              className="font-mono text-[11px] uppercase tracking-[0.32em] text-white/55 mb-7"
            >
              <span className="text-white/40 mr-2">01</span>
              <span className="text-white/30 mr-2">/</span>
              Diagnosis
            </motion.p>
            <motion.h2
              id="the-pain-we-solve-heading"
              {...reveal(0.08)}
              className="font-serif italic font-normal text-[clamp(2.125rem,4vw,3.25rem)] leading-[1.05] tracking-[-0.02em] text-white/95"
            >
              The pain you&rsquo;re already feeling.
            </motion.h2>
          </div>
          <motion.div
            {...reveal(0.16)}
            className="md:col-span-5 lg:col-span-4 lg:col-start-9 md:self-end"
          >
            <p className="text-[15px] sm:text-[16px] leading-[1.65] text-white/60">
              Three failure modes the Ecosystem shuts down before they show up
              on your team&rsquo;s calendar &mdash; or your P&amp;L.
            </p>
            <p className="mt-4 font-mono text-[10.5px] uppercase tracking-[0.32em] text-white/35">
              <span className="text-white/55">3</span>
              <span className="mx-2 text-white/20">·</span>
              Failure modes diagnosed
            </p>
          </motion.div>
        </div>

        {/* Triptych — 3 columns at lg+, stacked below */}
        <div className="mt-8 lg:mt-10 pt-8 lg:pt-10 border-t border-white/[0.10] grid grid-cols-1 lg:grid-cols-3">
          {PAINS.map((pain, i) => (
            <PainColumn
              key={pain.index}
              pain={pain}
              reduce={reduce}
              isFirst={i === 0}
              isLast={i === PAINS.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
