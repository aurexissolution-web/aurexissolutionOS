"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ServiceData } from "@/data/services";
import { AnimatedBadge } from "@/components/ui/animated-badge";
import { X, Check } from "lucide-react";

interface ServiceBeforeAfterProps {
  data: ServiceData;
}

export function ServiceBeforeAfter({ data }: ServiceBeforeAfterProps) {
  const pairs = data.beforeAfter.oldWay.map((bad, i) => ({
    bad,
    good: data.beforeAfter.aurexisStandard[i] ?? "",
  }));

  return (
    <section className="relative w-full py-16 md:py-20 bg-[#000000] overflow-hidden">
      {/* — Ambient vertical glow from centre — */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 w-[800px] h-[600px] opacity-[0.14]"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${data.themeColor} 0%, transparent 70%)`,
        }}
      />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">

        {/* ── Header ── */}
        <div className="flex flex-col mb-20 max-w-3xl">
          <div className="mb-8">
            <AnimatedBadge text="The Paradigm Shift" color={data.themeColor} />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter text-white mb-6 leading-[1.05]">
            The difference is{" "}
            <span className="text-neutral-500">not the tools.</span>
            <br />
            {"It's the thinking behind them."}
          </h2>
          <p className="text-lg text-neutral-500 font-light max-w-lg">
            Every item below represents thousands of dollars in revenue gained or lost.
          </p>
        </div>

        {/* ── Column Headers ── */}
        <div className="grid grid-cols-[1fr_1fr] md:grid-cols-[60px_1fr_1fr] gap-0 mb-3 px-4">
          <div className="hidden md:block" />
          <div className="flex items-center gap-3 px-6 pb-3">
            <div className="w-5 h-5 rounded-full border border-white/10 bg-white/[0.02] flex items-center justify-center">
              <X className="w-2.5 h-2.5 text-neutral-500" />
            </div>
            <span className="text-xs font-mono tracking-[0.2em] uppercase text-neutral-500">The Old Way</span>
          </div>
          <div className="flex items-center gap-3 px-6 pb-3">
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${data.themeColor}20`, border: `1px solid ${data.themeColor}40` }}
            >
              <Check className="w-2.5 h-2.5" style={{ color: data.themeColor }} />
            </div>
            <span
              className="text-xs font-mono tracking-[0.2em] uppercase"
              style={{ color: data.themeColor }}
            >
              The Aurexis Standard
            </span>
          </div>
        </div>

        {/* ── Separator ── */}
        <div className="w-full h-px bg-white/[0.08] mb-2" />

        {/* ── Comparison Rows ── */}
        <div className="flex flex-col divide-y divide-white/[0.06]">
          {pairs.map(({ bad, good }, idx) => (
            <ComparisonRow
              key={idx}
              index={idx}
              bad={bad}
              good={good}
              themeColor={data.themeColor}
            />
          ))}
        </div>

        {/* ── Bottom CTA bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-8 rounded-[24px] border border-white/[0.04] bg-[#050505]"
          style={{ boxShadow: `0 0 80px -30px ${data.themeColor}20` }}
        >
          <div>
            <p className="text-white text-xl font-medium tracking-tight mb-1">
              Ready to make the switch?
            </p>
            <p className="text-neutral-500 text-sm">
              Every day you wait is a day behind. Let's close the gap.
            </p>
          </div>
          <a
            href="/contact"
            className="shrink-0 inline-flex items-center gap-3 px-7 py-3.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-300"
            style={{
              backgroundColor: `${data.themeColor}15`,
              border: `1px solid ${data.themeColor}40`,
              color: data.themeColor,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = `${data.themeColor}25`;
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 0 30px -5px ${data.themeColor}50`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = `${data.themeColor}15`;
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
            }}
          >
            Book a Strategy Call
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function ComparisonRow({
  index,
  bad,
  good,
  themeColor,
}: {
  index: number;
  bad: string;
  good: string;
  themeColor: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      className="grid grid-cols-[1fr_1fr] md:grid-cols-[60px_1fr_1fr] gap-0 group relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* — Full row hover highlight — */}
      <div
        className="pointer-events-none absolute inset-0 rounded-xl transition-opacity duration-300"
        style={{
          opacity: hovered ? 1 : 0,
          background: `linear-gradient(90deg, transparent 0%, ${themeColor}06 50%, transparent 100%)`,
        }}
      />

      {/* Row number ─ desktop only */}
      <div className="hidden md:flex items-center justify-center py-7">
        <span
          className="text-[11px] font-mono tabular-nums transition-colors duration-300"
          style={{ color: hovered ? themeColor : "rgba(255,255,255,0.12)" }}
        >
          0{index + 1}
        </span>
      </div>

      {/* Bad column */}
      <div className="flex items-start gap-4 py-7 px-5 md:px-6 border-r border-white/[0.03] relative">
        {/* Subtle X dot */}
        <span className="mt-1 flex-shrink-0 w-[5px] h-[5px] rounded-full bg-neutral-700 block" />
        <p className="text-neutral-400 text-[15px] leading-relaxed font-light">{bad}</p>
      </div>

      {/* Good column */}
      <div className="flex items-start gap-4 py-7 px-5 md:px-6 relative">
        {/* Glowing check dot */}
        <div className="mt-[6px] flex-shrink-0 relative">
          <span
            className="block w-[5px] h-[5px] rounded-full transition-all duration-500"
            style={{
              backgroundColor: hovered ? themeColor : `${themeColor}50`,
              boxShadow: hovered ? `0 0 8px ${themeColor}` : "none",
            }}
          />
        </div>
        <p
          className="text-[15px] leading-relaxed font-light transition-colors duration-300"
          style={{ color: hovered ? "#ffffff" : "rgba(255,255,255,0.85)" }}
        >
          {good}
        </p>
        {/* Slide-in right accent on hover */}
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 h-[60%] w-[2px] rounded-full transition-all duration-400"
          style={{
            backgroundColor: themeColor,
            opacity: hovered ? 0.4 : 0,
            transform: `translateY(-50%) scaleY(${hovered ? 1 : 0})`,
          }}
        />
      </div>
    </motion.div>
  );
}
