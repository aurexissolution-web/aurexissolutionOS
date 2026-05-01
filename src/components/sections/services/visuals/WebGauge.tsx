"use client";

import { useEffect, useRef, useState } from "react";

const ARC_RADIUS = 80;
const ARC_CIRC = 2 * Math.PI * ARC_RADIUS; // ~502.65
const TARGET_PCT = 0.99;
const TARGET_NUM = 99;

export function WebGauge() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  const [num, setNum] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setInView(true);
            obs.disconnect();
            return;
          }
        }
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setNum(TARGET_NUM);
      return;
    }
    const start = performance.now();
    const dur = 2200;
    let raf = 0;
    const tick = (t: number) => {
      const k = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - k, 3);
      setNum(Math.round(TARGET_NUM * eased));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView]);

  const offset = inView ? ARC_CIRC * (1 - TARGET_PCT) : ARC_CIRC;

  return (
    <div ref={ref} className="w-full max-w-[540px] flex flex-col gap-7">
      {/* gauge */}
      <div className="relative w-full aspect-square max-w-[360px] mx-auto">
        <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
          <defs>
            <linearGradient id="web-gauge-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="50%" stopColor="#00F0FF" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
          <circle
            cx="100"
            cy="100"
            r={ARC_RADIUS}
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="10"
            fill="none"
          />
          <circle
            cx="100"
            cy="100"
            r={ARC_RADIUS}
            stroke="url(#web-gauge-grad)"
            strokeWidth="10"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={ARC_CIRC}
            strokeDashoffset={offset}
            style={{
              transition: "stroke-dashoffset 2.2s cubic-bezier(.2,.7,.2,1) .5s",
              filter: "drop-shadow(0 0 14px rgba(139,92,246,0.5))",
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="font-serif italic text-[96px] leading-none tracking-[-0.04em] text-white">
            {num}
            <span className="text-[48px] text-[#8B5CF6] align-top">+</span>
          </div>
          <div className="font-mono text-[10px] tracking-[0.26em] uppercase text-[#6B7588] mt-3">
            Lighthouse · perf
          </div>
        </div>
      </div>

      {/* perf bars */}
      <div className="flex flex-col gap-3.5">
        <Bar label="LCP" widthPct={88} value="0.92s" delay="1.0s" inView={inView} />
        <Bar label="CLS" widthPct={96} value="0.01" delay="1.2s" inView={inView} />
        <Bar label="FID" widthPct={92} value="12ms" delay="1.4s" inView={inView} />
        <Bar label="TTFB" widthPct={90} value="98ms" delay="1.6s" inView={inView} />
      </div>
    </div>
  );
}

function Bar({
  label,
  widthPct,
  value,
  delay,
  inView,
}: {
  label: string;
  widthPct: number;
  value: string;
  delay: string;
  inView: boolean;
}) {
  return (
    <div className="grid grid-cols-[70px_1fr_60px] gap-4 items-center font-mono text-[11px]">
      <span className="text-[#6B7588] tracking-[0.14em] uppercase">{label}</span>
      <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden relative">
        <div
          className="h-full rounded-full"
          style={{
            width: inView ? `${widthPct}%` : "0%",
            background: "linear-gradient(90deg, #8B5CF6, #C4B5FD)",
            boxShadow: "0 0 12px rgba(139,92,246,0.45)",
            transition: `width 1.6s cubic-bezier(.2,.7,.2,1) ${delay}`,
          }}
        />
      </div>
      <span className="text-white text-right font-medium">{value}</span>
    </div>
  );
}
