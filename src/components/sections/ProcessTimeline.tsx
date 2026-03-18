"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowRight, Search, Layers, Zap, Rocket } from "lucide-react";
import { AnimatedBadge } from "@/components/ui/animated-badge";

/* ── Data ─────────────────────────────────────────────────────── */
const steps = [
  {
    num: "01",
    title: "Discovery & Audit",
    subtitle: "Understanding your ecosystem end-to-end",
    icon: Search,
    tags: ["System Mapping", "Gap Analysis", "Stakeholder Interviews"],
    detail:
      "We run a deep diagnostic across your existing infrastructure, workflows, and data pipelines. Every bottleneck is catalogued, every inefficiency documented. The outcome: a ruthlessly prioritised opportunity map that guides every decision that follows.",
  },
  {
    num: "02",
    title: "Architecture Blueprint",
    subtitle: "Designing the precise solution with zero guesswork",
    icon: Layers,
    tags: ["Tech Stack Selection", "System Design", "Risk Assessment"],
    detail:
      "We translate discovery insights into a rigorous technical blueprint — defining stack choices, integration points, data flows, and security constraints. You see exactly what we're building before a single line of code is written.",
  },
  {
    num: "03",
    title: "Agile Sprint Build",
    subtitle: "Rapid iteration, constant visibility, zero dead weight",
    icon: Zap,
    tags: ["2-Week Sprints", "Demo Reviews", "CI/CD Pipeline"],
    detail:
      "Using disciplined two-week sprints, we ship functional increments you can test and provide feedback on. Every sprint ends with a live demo, a progress report, and a retrospective — keeping the build lean, on scope, and never stagnant.",
  },
  {
    num: "04",
    title: "Launch & Scale",
    subtitle: "Deploying to production, engineered for growth",
    icon: Rocket,
    tags: ["Production Deployment", "Performance Tuning", "Post-Launch Support"],
    detail:
      "Launch is not the finish line — it's the starting gun. We deploy to production with zero-downtime strategies, instrument observability tooling so you can see every metric in real time, and remain on-call for the critical post-launch window.",
  },
];

/* ── Drawer Row ───────────────────────────────────────────────── */
function DrawerRow({
  step,
  index: _index,
  isOpen,
  onToggle,
}: {
  step: (typeof steps)[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!bodyRef.current) return;
    const raf = requestAnimationFrame(() => {
      if (!bodyRef.current) return;
      setHeight(isOpen ? bodyRef.current.scrollHeight : 0);
    });
    return () => cancelAnimationFrame(raf);
  }, [isOpen]);

  const Icon = step.icon;
  const active = isOpen;
  const lit = active || hovered;

  return (
    <div
      className="group relative last:border-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ willChange: "transform" }}
    >
      {/* Gradient bottom separator */}
      <div
        className="absolute bottom-0 inset-x-0 h-px transition-opacity duration-300"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(0,240,255,0.12) 30%, rgba(255,255,255,0.06) 60%, transparent)",
          opacity: active ? 0 : 1,
        }}
      />

      {/* Hover sweep background */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500 rounded-xl"
        style={{
          background: "linear-gradient(90deg, rgba(0,240,255,0.04) 0%, rgba(0,240,255,0.01) 40%, transparent 80%)",
          opacity: lit && !active ? 1 : 0,
        }}
      />

      {/* Active row background */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500 rounded-xl"
        style={{
          background: "linear-gradient(90deg, rgba(0,240,255,0.07) 0%, rgba(0,240,255,0.02) 50%, transparent 85%)",
          opacity: active ? 1 : 0,
        }}
      />

      {/* Trigger row */}
      <button
        onClick={onToggle}
        className="relative w-full flex items-center gap-5 py-6 px-0 text-left focus:outline-none z-10"
        aria-expanded={isOpen}
      >
        {/* Step number */}
        <span
          className="shrink-0 w-8 text-[11px] font-bold tracking-[0.18em] tabular-nums transition-colors duration-300"
          style={{ color: lit ? "rgba(0,240,255,0.8)" : "rgba(255,255,255,0.18)" }}
        >
          {step.num}
        </span>

        {/* Icon badge */}
        <span
          className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-400"
          style={{
            borderColor: active
              ? "rgba(0,240,255,0.45)"
              : hovered
              ? "rgba(0,240,255,0.2)"
              : "rgba(255,255,255,0.07)",
            background: active
              ? "rgba(0,240,255,0.12)"
              : hovered
              ? "rgba(0,240,255,0.06)"
              : "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(0,0,0,0))",
            boxShadow: lit ? "0 0 18px rgba(0,240,255,0.1)" : "none",
          }}
        >
          <Icon
            className="w-4 h-4 transition-colors duration-300"
            style={{ color: active ? "#00F0FF" : hovered ? "rgba(0,240,255,0.75)" : "rgba(255,255,255,0.35)" }}
          />
        </span>

        {/* Title block */}
        <div className="flex-1 min-w-0">
          <h3
            className="text-base md:text-[17px] font-semibold tracking-tight transition-colors duration-300"
            style={{ color: active ? "#ffffff" : hovered ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.65)" }}
          >
            {step.title}
          </h3>
          <p
            className="text-[13px] mt-0.5 hidden sm:block transition-colors duration-300"
            style={{ color: lit ? "rgba(255,255,255,0.38)" : "rgba(255,255,255,0.22)" }}
          >
            {step.subtitle}
          </p>
        </div>

        {/* Tags — visible only when closed */}
        <div
          className="hidden lg:flex items-center gap-2 shrink-0 transition-all duration-400"
          style={{ opacity: active ? 0 : hovered ? 1 : 0.55 }}
        >
          {step.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-full text-[10px] font-semibold border transition-all duration-300"
              style={{
                color: hovered ? "rgba(0,240,255,0.9)" : "rgba(0,240,255,0.55)",
                borderColor: hovered ? "rgba(0,240,255,0.28)" : "rgba(0,240,255,0.12)",
                background: hovered ? "rgba(0,240,255,0.08)" : "rgba(0,240,255,0.03)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Arrow */}
        <span
          className="shrink-0 w-7 h-7 rounded-full border flex items-center justify-center ml-2 transition-all duration-500"
          style={{
            borderColor: active
              ? "rgba(0,240,255,0.55)"
              : hovered
              ? "rgba(0,240,255,0.25)"
              : "rgba(255,255,255,0.07)",
            background: active
              ? "rgba(0,240,255,0.12)"
              : hovered
              ? "rgba(0,240,255,0.05)"
              : "transparent",
            transform: active ? "rotate(90deg)" : "rotate(0deg)",
            boxShadow: active ? "0 0 12px rgba(0,240,255,0.2)" : "none",
          }}
        >
          <ArrowRight
            className="w-3.5 h-3.5 transition-colors duration-300"
            style={{ color: active ? "#00F0FF" : hovered ? "rgba(0,240,255,0.7)" : "rgba(255,255,255,0.3)" }}
          />
        </span>
      </button>

      {/* Expandable body */}
      <div
        className="overflow-hidden transition-all"
        style={{
          height: `${height}px`,
          transitionDuration: "420ms",
          transitionTimingFunction: "cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <div ref={bodyRef} className="pb-8 pl-[5.25rem] pr-0">
          {/* Cyan left accent */}
          <div
            className="relative pl-6 border-l"
            style={{ borderColor: "rgba(0,240,255,0.2)" }}
          >
            {/* Dot on border */}
            <div
              className="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full border-2"
              style={{ background: "#00F0FF", borderColor: "#000" }}
            />

            <p className="text-[15px] text-neutral-400 leading-relaxed max-w-xl mb-5">
              {step.detail}
            </p>

            {/* All tags */}
            <div className="flex flex-wrap gap-2">
              {step.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-full text-[11px] font-semibold border"
                  style={{
                    color: "rgba(0,240,255,0.8)",
                    borderColor: "rgba(0,240,255,0.2)",
                    background: "rgba(0,240,255,0.06)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Left cyan glow bar (active) */}
      <div
        className="pointer-events-none absolute left-0 top-0 bottom-0 w-[2px] rounded-full transition-all duration-500"
        style={{
          background: "linear-gradient(to bottom, transparent, #00F0FF, transparent)",
          opacity: active ? 1 : hovered ? 0.3 : 0,
          transform: lit ? "scaleY(1)" : "scaleY(0.3)",
          transformOrigin: "center",
        }}
      />
    </div>
  );
}


/* ── Section ──────────────────────────────────────────────────── */
export function ProcessTimeline() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => setOpenIndex((prev) => (prev === i ? null : i));

  return (
    <section className="pt-20 pb-4 bg-[#000000]">
      <div className="container mx-auto px-6 max-w-5xl">

        {/* Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <div className="mb-6">
              <AnimatedBadge text="Our Process" color="#00F0FF" />
            </div>
            <h2 className="text-4xl md:text-6xl font-medium tracking-tighter text-white leading-[1.06]">
              The Development<br />
              <span className="text-[#2a2a2a]">Roadmap.</span>
            </h2>
          </div>
          <p className="text-base text-neutral-500 max-w-xs md:text-right font-light leading-relaxed">
            A disciplined, four-phase process from raw idea to production-grade platform.
          </p>
        </div>

        {/* Drawers */}
        <div
          className="rounded-[24px] border border-white/[0.05] overflow-hidden"
          style={{ background: "#050505", boxShadow: "0 0 0 1px rgba(255,255,255,0.02)" }}
        >
          <div className="px-8 md:px-10">
            {steps.map((step, i) => (
              <DrawerRow
                key={step.num}
                step={step}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => toggle(i)}
              />
            ))}
          </div>
        </div>

        {/* Footer note */}
        <p className="mt-8 text-center text-xs text-neutral-600 tracking-wide">
          Average project cycle — 6 to 12 weeks from audit to launch
        </p>
      </div>
    </section>
  );
}
