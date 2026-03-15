"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

/* ── Counter Hook ─────────────────────────────────────────────────── */
function useCounter(endValue: number, inView: boolean, duration: number = 2000) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let startTime: number;
    let animationFrame: number;

    const tick = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing: easeOutExpo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      setCount(Math.floor(easeProgress * endValue));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(tick);
      }
    };

    animationFrame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrame);
  }, [endValue, inView, duration]);

  return count;
}

/* ── Stat Item Component ──────────────────────────────────────────── */
type StatProps = {
  value: number;
  suffix?: string;
  decimals?: number;
  label: string;
  description: string;
  delay?: number;
};

function StatItem({ value, suffix = "", decimals = 0, label, description, delay = 0 }: StatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  // Start counter slightly after the fade-in begins
  const [startCounting, setStartCounting] = useState(false);
  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setStartCounting(true), delay + 200);
      return () => clearTimeout(timer);
    }
  }, [isInView, delay]);

  const count = useCounter(value * Math.pow(10, decimals), startCounting, 2000);
  const displayValue = (count / Math.pow(10, decimals)).toFixed(decimals);

  return (
    <div 
      ref={ref}
      className="relative flex flex-col items-center md:items-start text-center md:text-left py-12 px-6 group transition-all duration-1000"
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(24px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {/* Number + Suffix */}
      <div className="relative mb-6">
        <h3 className="text-6xl md:text-[5.5rem] font-medium tracking-tighter text-white tabular-nums leading-none flex items-baseline z-10 relative">
          {displayValue}
          <span className="text-4xl md:text-6xl font-light text-[#00F0FF] ml-1">{suffix}</span>
        </h3>
        
        {/* Subtle background glow that pulses once on entry */}
        <div 
          className="absolute inset-0 z-0 blur-[60px] rounded-full transition-all duration-1000"
          style={{
            background: "rgba(0,240,255,0.15)",
            opacity: startCounting ? 0.6 : 0,
            transform: startCounting ? "scale(1.2)" : "scale(0.8)",
          }}
        />
      </div>

      {/* Label & Description */}
      <div className="relative z-10 mt-auto">
        <div className="h-px w-8 bg-[#00F0FF] mb-5 mx-auto md:mx-0 transition-all duration-700"
             style={{ width: isInView ? "32px" : "0px", transitionDelay: `${delay + 400}ms` }} />
        <h4 className="text-lg font-bold tracking-wide text-white mb-2 uppercase" style={{ letterSpacing: "0.15em" }}>
          {label}
        </h4>
        <p className="text-[15px] text-neutral-500 leading-relaxed font-light">
          {description}
        </p>
      </div>
    </div>
  );
}

/* ── Section ──────────────────────────────────────────────────────── */
export function StatsSection() {
  return (
    <section className="relative py-4 bg-[#000000] border-t border-white/[0.04]">
      {/* Background radial highlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] pointer-events-none opacity-40">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(0,240,255,0.05)_0%,_transparent_70%)]" />
      </div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-16">
          <StatItem 
            value={40} 
            suffix="%" 
            label="Reduction" 
            description="In manual overhead & recurring operational friction."
            delay={0}
          />
          
          {/* Vertical dividers for md+ screens */}
          <div className="absolute top-12 bottom-12 left-1/3 hidden md:block w-px bg-gradient-to-b from-transparent via-white/[0.08] to-transparent" />
          
          <StatItem 
            value={99.9} 
            decimals={1}
            suffix="%" 
            label="Uptime Architecture" 
            description="Engineered for absolute reliability on Vercel & Supabase."
            delay={150}
          />
          
          <div className="absolute top-12 bottom-12 left-2/3 hidden md:block w-px bg-gradient-to-b from-transparent via-white/[0.08] to-transparent" />
          
          <StatItem 
            value={10} 
            suffix="x" 
            label="Human Output" 
            description="Amplified throughput driven by custom AI agent ecosystems."
            delay={300}
          />
        </div>
      </div>
    </section>
  );
}
