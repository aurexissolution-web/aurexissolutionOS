"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

type Capability = {
  number: string;
  id: string;
  name: string;
  title: string;
  description: string;
  color: string;
  outcomes: string[];
  examples: string[];
};

const capabilities: Capability[] = [
  {
    number: "01",
    id: "presence",
    name: "Presence",
    title: "Turn attention into opportunity.",
    description:
      "Websites, digital platforms and customer touchpoints designed to attract, engage and convert.",
    color: "#00F0FF",
    examples: ["Website", "WhatsApp", "Email", "Social", "Ads"],
    outcomes: [
      "High-converting websites",
      "Lead capture",
      "Customer portals",
      "Digital campaigns",
      "Omnichannel experiences",
    ],
  },
  {
    number: "02",
    id: "flow",
    name: "Flow",
    title: "Make work move automatically.",
    description:
      "Connected workflows that reduce manual follow-up, repetitive tasks and operational delays.",
    color: "#1BC9FF",
    examples: ["Follow-ups", "Approvals", "Routing", "Alerts"],
    outcomes: [
      "Automated follow-ups",
      "Task routing",
      "Approvals",
      "Notifications",
      "Workflow automation",
    ],
  },
  {
    number: "03",
    id: "core",
    name: "Core",
    title: "Run the business from one foundation.",
    description:
      "Central systems for customers, projects, operations, finance and internal management.",
    color: "#2E90FF",
    examples: ["CRM", "Projects", "Finance", "Operations"],
    outcomes: [
      "CRM",
      "Project management",
      "Operations systems",
      "Finance visibility",
      "Internal dashboards",
    ],
  },
  {
    number: "04",
    id: "connect",
    name: "Connect",
    title: "Make every system work together.",
    description:
      "Integrations that connect tools, teams, channels and information across the business.",
    color: "#4E68FF",
    examples: ["APIs", "Webhooks", "Sync", "Channels"],
    outcomes: [
      "API integrations",
      "System synchronisation",
      "Webhooks",
      "Cross-platform workflows",
      "Unified communication",
    ],
  },
  {
    number: "05",
    id: "data",
    name: "Data Foundation",
    title: "Create one reliable source of truth.",
    description:
      "Structured, governed data that improves reporting, visibility and future scalability.",
    color: "#6D57F5",
    examples: ["Reporting", "Dashboards", "Governance", "Unified Data"],
    outcomes: [
      "Centralised data",
      "Clean reporting",
      "Data governance",
      "Business visibility",
      "Scalable architecture",
    ],
  },
  {
    number: "06",
    id: "intelligence",
    name: "Intelligence",
    title: "Turn business data into better decisions.",
    description:
      "AI, automation and intelligent insights built on top of connected systems.",
    color: "#8B5CF6",
    examples: ["AI Assistants", "Forecasting", "Insights", "Automation"],
    outcomes: [
      "AI assistants",
      "Intelligent recommendations",
      "Forecasting",
      "Automated analysis",
      "Decision support",
    ],
  },
];

const businessOutcomes = ["More leads", "Better efficiency", "Full visibility", "Smarter decisions"];

const tileCls =
  "rounded-md border border-white/20 bg-black/55 px-2.5 py-1.5 text-[11px] font-medium text-white/90 whitespace-nowrap";

// Decorative, capability-specific "mini interface" shown inside the colour field.
// Recognisable structure over density; animation only on Flow + Connect.
function CapabilityPreview({
  id,
  color,
  reduce,
}: {
  id: string;
  color: string;
  reduce: boolean | null;
}) {
  const dash = reduce ? undefined : { animation: "ecoDash 1s linear infinite" };
  const shimmer = reduce ? undefined : { animation: "ecoShimmer 2s ease-in-out infinite" };

  if (id === "presence") {
    return (
      <div className="flex h-full flex-col overflow-hidden rounded-lg border border-white/12 bg-black/35">
        <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="ml-2 h-3.5 max-w-[170px] flex-1 rounded bg-white/10" />
        </div>
        <div className="flex flex-1 flex-col gap-3 p-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="h-4 w-4 rounded" style={{ background: color }} />
              <span className="h-2.5 w-10 rounded bg-white/20" />
              <span className="h-2.5 w-7 rounded bg-white/12" />
              <span className="h-2.5 w-7 rounded bg-white/12" />
            </div>
            <span className="h-5 w-14 rounded-full" style={{ background: color }} />
          </div>
          <div className="flex flex-col gap-2">
            <span className="h-4 w-4/5 rounded bg-white/30" />
            <span className="h-3 w-3/5 rounded bg-white/18" />
            <span className="mt-1 h-8 w-28 rounded-md" style={{ background: color }} />
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            <span className="h-8 flex-1 rounded-md border border-white/15 bg-white/5" />
            <span className="h-8 w-8 rounded-md" style={{ background: color }} />
            <span className="h-8 w-8 rounded-full bg-[#25D366]" />
          </div>
          <div className="hidden gap-2 sm:grid sm:grid-cols-3">
            <span className="h-11 rounded-md bg-white/[0.06]" />
            <span className="h-11 rounded-md bg-white/[0.06]" />
            <span className="h-11 rounded-md bg-white/[0.06]" />
          </div>
        </div>
      </div>
    );
  }

  if (id === "flow") {
    const stages = [
      { label: "Lead", hide: false, active: false },
      { label: "Assigned", hide: true, active: false },
      { label: "Follow-up", hide: false, active: true },
      { label: "Proposal", hide: true, active: false },
      { label: "Won", hide: false, active: false },
    ];
    return (
      <div className="flex h-full flex-col justify-center gap-5 px-1">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/50">
            Sales pipeline
          </span>
          <span
            className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium text-white/85"
            style={{ borderColor: `${color}66` }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: color }} />
            Approved
          </span>
        </div>
        <div className="flex items-center">
          {stages.map((s, i) => (
            <div
              key={s.label}
              className={`items-center ${i === 0 ? "flex" : "flex flex-1"} ${
                s.hide ? "hidden sm:flex" : ""
              }`}
            >
              {i > 0 && (
                <span
                  className="mx-1.5 h-[2px] flex-1 rounded"
                  style={{ background: color, ...shimmer }}
                />
              )}
              <span
                className={`shrink-0 rounded-md border px-2.5 py-1.5 text-[11px] font-medium ${
                  s.active ? "text-white" : "text-white/70"
                }`}
                style={
                  s.active
                    ? { borderColor: color, background: `${color}26` }
                    : { borderColor: "rgba(255,255,255,0.15)", background: "rgba(0,0,0,0.28)" }
                }
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 text-[11px] text-white/45">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: color }} />
          Notification sent · follow-up due today
        </div>
      </div>
    );
  }

  if (id === "core") {
    return (
      <div className="flex h-full overflow-hidden rounded-lg border border-white/12 bg-black/35">
        <div className="hidden w-9 flex-col items-center gap-3 border-r border-white/10 py-3.5 sm:flex">
          <span className="h-3.5 w-3.5 rounded" style={{ background: color }} />
          <span className="h-2 w-2 rounded-full bg-white/25" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
        </div>
        <div className="flex flex-1 flex-col gap-3 p-3.5">
          <div className="flex items-center justify-between">
            <span className="h-3 w-20 rounded bg-white/25" />
            <span
              className="rounded-md border px-2.5 py-1 text-[12px] font-semibold text-white/90"
              style={{ borderColor: `${color}55` }}
            >
              $42k
            </span>
          </div>
          {[0, 1].map((r) => (
            <div key={r} className="flex items-center gap-2.5">
              <span className="h-6 w-6 rounded-full bg-white/15" />
              <span className="h-2.5 flex-1 rounded bg-white/15" />
              <span
                className="h-5 w-12 rounded-full border"
                style={{ borderColor: `${color}55`, background: `${color}1f` }}
              />
            </div>
          ))}
          <div className="hidden flex-col gap-2.5 sm:flex">
            {[62, 38].map((w, r) => (
              <div key={r} className="flex items-center gap-2.5">
                <span className="h-2 w-12 rounded bg-white/15" />
                <span className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
                  <span
                    className="block h-full rounded-full"
                    style={{ width: `${w}%`, background: color }}
                  />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (id === "connect") {
    const points = [
      [18, 22],
      [82, 22],
      [14, 50],
      [86, 50],
      [18, 78],
      [82, 78],
    ];
    return (
      <div className="relative h-full">
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {points.map(([x, y], i) => (
            <line
              key={i}
              x1="50"
              y1="50"
              x2={x}
              y2={y}
              stroke="#ffffff"
              strokeOpacity="0.32"
              strokeWidth="1"
              strokeDasharray="3 4"
              vectorEffect="non-scaling-stroke"
              style={dash}
            />
          ))}
        </svg>
        <div className="relative grid h-full grid-cols-3 grid-rows-3 items-center justify-items-center">
          <span className={tileCls}>Website</span>
          <span />
          <span className={tileCls}>WhatsApp</span>
          <span className={tileCls}>Email</span>
          <span
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/25"
            style={{ background: color }}
          >
            <span className="h-3.5 w-3.5 rounded-full bg-white/95" />
          </span>
          <span className={tileCls}>CRM</span>
          <span className={tileCls}>Project</span>
          <span />
          <span className={tileCls}>Accounting</span>
        </div>
      </div>
    );
  }

  if (id === "data") {
    return (
      <div className="flex h-full flex-col gap-2.5 rounded-lg border border-white/12 bg-black/35 p-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="rounded border border-white/15 px-1.5 py-0.5 text-[10px] text-white/70">Web</span>
            <span className="rounded border border-white/15 px-1.5 py-0.5 text-[10px] text-white/70">CRM</span>
            <span className="hidden rounded border border-white/15 px-1.5 py-0.5 text-[10px] text-white/70 sm:inline">Finance</span>
          </div>
          <span
            className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium text-white/85"
            style={{ borderColor: `${color}55` }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: color }} />
            Unified
          </span>
        </div>
        <div className="overflow-hidden rounded-md border border-white/10">
          {[0, 1, 2, 3].map((r) => (
            <div
              key={r}
              className={`grid grid-cols-4 ${r === 0 ? "bg-white/[0.06]" : ""} ${
                r < 3 ? "border-b border-white/10" : ""
              }`}
            >
              {[0, 1, 2, 3].map((c) => (
                <div key={c} className="border-r border-white/10 px-2.5 py-2 last:border-r-0">
                  <span
                    className="block h-2 rounded"
                    style={{
                      width: c === 0 ? "85%" : "55%",
                      background: r === 0 ? `${color}aa` : "rgba(255,255,255,0.16)",
                    }}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="hidden items-end gap-2 sm:flex">
          {[20, 34, 26, 40].map((h, i) => (
            <span
              key={i}
              className="w-5 rounded-t"
              style={{ height: h, background: i === 3 ? color : `${color}88` }}
            />
          ))}
          <span className="ml-auto inline-flex items-center gap-1.5 self-center text-[10px] text-white/55">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: color }} />
            Governed
          </span>
        </div>
      </div>
    );
  }

  if (id === "intelligence") {
    return (
      <div className="flex h-full flex-col gap-3 rounded-lg border border-white/12 bg-black/35 p-3.5">
        <div className="flex items-center gap-2">
          <span className="flex h-5 w-5 items-center justify-center rounded-md" style={{ background: color }}>
            <span className="h-2 w-2 rounded-[1px] bg-black/70" />
          </span>
          <span className="text-[12px] font-semibold text-white/90">AI Business Copilot</span>
        </div>
        <div className="rounded-md border border-white/10 bg-white/[0.04] p-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-white/55">Revenue forecast</span>
            <span className="text-[13px] font-bold" style={{ color }}>
              ↑ 18%
            </span>
          </div>
          <svg viewBox="0 0 100 24" preserveAspectRatio="none" className="mt-2 hidden h-6 w-full sm:block">
            <polyline
              points="0,20 22,16 44,17 66,9 88,10 100,3"
              fill="none"
              stroke={color}
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
            <circle cx="100" cy="3" r="2.5" fill={color} />
          </svg>
        </div>
        <div className="mt-auto flex items-center justify-between gap-2 rounded-md border border-white/12 bg-black/30 px-3 py-2">
          <span className="text-[11px] text-white/80">Recommended: follow up 12 leads</span>
          <span
            className="shrink-0 rounded-md px-2.5 py-1 text-[11px] font-semibold text-black"
            style={{ background: color }}
          >
            Run
          </span>
        </div>
      </div>
    );
  }

  return null;
}

export function TheEcosystem() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const current = capabilities[active];

  function onTabKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const n = capabilities.length;
    let next: number | null = null;
    switch (e.key) {
      case "ArrowDown":
      case "ArrowRight":
        next = (active + 1) % n;
        break;
      case "ArrowUp":
      case "ArrowLeft":
        next = (active - 1 + n) % n;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = n - 1;
        break;
      default:
        return;
    }
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <section
      aria-labelledby="eco-heading"
      className="relative overflow-hidden bg-[var(--color-background)] px-6 py-16 md:py-20 lg:flex lg:min-h-screen lg:items-center"
    >
      <style>{`@keyframes ecoDash{to{stroke-dashoffset:-12}}@keyframes ecoShimmer{0%,100%{opacity:.4}50%{opacity:1}}`}</style>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.10] to-transparent"
      />

      <div className="relative mx-auto w-full max-w-7xl">
        {/* Masthead */}
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: reduce ? 0 : 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: reduce ? 0 : 0.5 }}
        >
          <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.28em] text-white/40">
            The Aurexis Ecosystem
          </span>
          <h2
            id="eco-heading"
            className="mt-4 text-3xl font-extrabold leading-[1.05] tracking-[-0.02em] text-white text-balance md:text-4xl lg:text-5xl"
          >
            Six connected capabilities.
            <br className="hidden sm:block" /> One business{" "}
            <em
              className="font-serif font-normal italic text-[var(--color-electric-cyan)]"
              style={{ filter: "drop-shadow(0 0 18px rgba(0,240,255,0.32))" }}
            >
              ecosystem
            </em>
            .
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-[1.6] text-white/55 md:text-[16px]">
            Each Aurexis capability solves a different part of the business—but the real
            advantage comes when they work together.
          </p>
        </motion.div>

        {/* Feature spread */}
        <div className="mt-10 grid gap-8 border-t border-white/[0.08] pt-8 lg:mt-12 lg:grid-cols-[220px_1fr] lg:gap-12 lg:pt-10">
          {/* Index */}
          <div
            role="tablist"
            aria-orientation="vertical"
            aria-label="Aurexis ecosystem capabilities"
            onKeyDown={onTabKeyDown}
            className="flex flex-wrap gap-x-5 gap-y-1 lg:flex-col lg:flex-nowrap lg:gap-0"
          >
            {capabilities.map((c, i) => {
              const on = i === active;
              return (
                <button
                  key={c.id}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  role="tab"
                  id={`eco-tab-${c.id}`}
                  aria-selected={on}
                  aria-controls={`eco-panel-${c.id}`}
                  tabIndex={on ? 0 : -1}
                  onClick={() => setActive(i)}
                  className="group relative flex items-baseline gap-3 py-2.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-electric-cyan)]/70 focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--color-background)] lg:w-full lg:border-b lg:border-white/[0.06] lg:py-3.5"
                >
                  <span
                    aria-hidden
                    className={`absolute -left-4 top-1/2 hidden h-5 w-[2px] -translate-y-1/2 transition-opacity duration-300 lg:block ${
                      on ? "opacity-100" : "opacity-0"
                    }`}
                    style={{ background: c.color }}
                  />
                  <span
                    className="font-serif text-[15px] italic tabular-nums transition-colors duration-300"
                    style={{ color: on ? c.color : "rgba(255,255,255,0.3)" }}
                  >
                    {c.number}
                  </span>
                  <span
                    className={`text-[13.5px] font-semibold uppercase tracking-[0.14em] transition-colors duration-300 ${
                      on ? "text-white" : "text-white/45 group-hover:text-white/75"
                    }`}
                  >
                    {c.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active feature */}
          <div
            role="tabpanel"
            id={`eco-panel-${current.id}`}
            aria-labelledby={`eco-tab-${current.id}`}
            tabIndex={0}
            className="min-w-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-electric-cyan)]/70 focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--color-background)]"
          >
            <motion.div
              key={current.id}
              className="grid gap-6 lg:grid-cols-[1fr_minmax(300px,0.95fr)] lg:items-stretch lg:gap-6"
              initial={{ opacity: 0, y: reduce ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduce ? 0 : 0.4, ease: "easeOut" }}
            >
              {/* Text */}
              <div className="order-2 flex flex-col justify-center lg:order-1">
                <div
                  className="text-[12px] font-semibold uppercase tracking-[0.2em]"
                  style={{ color: current.color }}
                >
                  {current.number} <span className="text-white/30">/ 06</span>
                </div>
                <h3 className="mt-2 text-4xl font-extrabold leading-[0.95] tracking-[-0.02em] text-white md:text-6xl">
                  {current.name}
                </h3>
                <p
                  className="mt-4 font-serif text-xl italic md:text-2xl"
                  style={{ color: current.color }}
                >
                  {current.title}
                </p>
                <p className="mt-4 max-w-xl text-[15px] leading-[1.7] text-white/60 md:text-[16px]">
                  {current.description}
                </p>
                <ul className="mt-6 flex max-w-xl flex-wrap gap-x-5 gap-y-2.5">
                  {current.outcomes.map((o) => (
                    <li key={o} className="inline-flex items-center gap-2 text-[13px] text-white/70">
                      <span
                        aria-hidden
                        className="h-1 w-1 rounded-full"
                        style={{ background: current.color }}
                      />
                      {o}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Colour field */}
              <div
                className="relative order-1 min-h-[280px] overflow-hidden rounded-2xl border border-white/10 sm:min-h-[300px] lg:order-2 lg:min-h-[340px]"
                style={{
                  background: `linear-gradient(152deg, ${current.color} 0%, ${current.color}2e 46%, #06090f 100%)`,
                }}
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-[0.14]"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(135deg, rgba(255,255,255,0.55) 0 1px, transparent 1px 22px)",
                  }}
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/40 to-transparent"
                />
                <div className="absolute inset-0 flex flex-col gap-3 p-4 lg:p-5">
                  <span
                    aria-hidden="true"
                    className="block text-[11px] font-semibold uppercase tracking-[0.22em] text-white/80"
                  >
                    {current.name}
                  </span>
                  <ul
                    aria-label={`${current.name} includes`}
                    className="flex max-w-[90%] flex-wrap gap-1.5 sm:gap-2"
                  >
                    {current.examples.slice(0, 4).map((example) => (
                      <li key={example}>
                        <span className="inline-flex rounded-full border border-white/20 bg-black/25 px-2.5 py-1 text-[11px] font-medium text-white/90 backdrop-blur-sm">
                          {example}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div aria-hidden="true" className="relative min-h-0 flex-1">
                    <CapabilityPreview id={current.id} color={current.color} reduce={reduce} />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Closing */}
        <motion.div
          className="mt-12 flex flex-col gap-6 border-t border-white/[0.08] pt-8 md:flex-row md:items-center md:justify-between lg:mt-14"
          initial={{ opacity: 0, y: reduce ? 0 : 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: reduce ? 0 : 0.5 }}
        >
          <div className="max-w-lg">
            <p className="text-lg font-medium leading-snug text-white/75 md:text-xl">
              Not six separate products.{" "}
              <em
                className="font-serif font-normal italic text-[var(--color-electric-cyan)]"
                style={{ filter: "drop-shadow(0 0 14px rgba(0,240,255,0.28))" }}
              >
                One connected ecosystem
              </em>{" "}
              designed around your business.
            </p>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[12px] uppercase tracking-[0.12em] text-white/35">
              {businessOutcomes.map((o, i) => (
                <span key={o} className="inline-flex items-center gap-4">
                  {i > 0 && <span aria-hidden className="text-[var(--color-electric-cyan)]/40">·</span>}
                  {o}
                </span>
              ))}
            </div>
          </div>

          <Link
            href="/services/ecosystem"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-[var(--color-electric-cyan)]/40 bg-[var(--color-electric-cyan)]/[0.04] px-7 py-3 text-[14px] font-semibold text-white transition-all hover:-translate-y-0.5 hover:border-[var(--color-electric-cyan)]/70 hover:bg-[var(--color-electric-cyan)]/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-electric-cyan)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)]"
          >
            Explore the Full Ecosystem
            <ArrowRight className="h-4 w-4 text-[var(--color-electric-cyan)] transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
