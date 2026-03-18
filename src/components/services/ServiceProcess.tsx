"use client";

import { useState, useRef, useEffect } from "react";
import { ServiceData } from "@/data/services";
import { ArrowRight, Crosshair, Blocks, Cpu, Rocket } from "lucide-react";
import { SectionBadge } from "@/components/ui/section-badge";

interface ServiceProcessProps {
  data: ServiceData;
}

function hexToRgbString(hex: string): string {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return `${r}, ${g}, ${b}`;
}

const icons = [Crosshair, Blocks, Cpu, Rocket];

function ServiceDrawerRow({
  process,
  index,
  isOpen,
  onToggle,
  themeColor,
}: {
  process: ServiceData["process"][0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  themeColor: string;
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

  const Icon = icons[index % icons.length];
  const active = isOpen;
  const lit = active || hovered;
  const rgb = hexToRgbString(themeColor);

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
          background: `linear-gradient(90deg, transparent, rgba(${rgb},0.15) 30%, rgba(255,255,255,0.06) 60%, transparent)`,
          opacity: active ? 0 : 1,
        }}
      />

      {/* Hover sweep background */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500 rounded-2xl"
        style={{
          background: `linear-gradient(90deg, rgba(${rgb},0.05) 0%, rgba(${rgb},0.01) 40%, transparent 80%)`,
          opacity: lit && !active ? 1 : 0,
        }}
      />

      {/* Active row background */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500 rounded-2xl"
        style={{
          background: `linear-gradient(90deg, rgba(${rgb},0.08) 0%, rgba(${rgb},0.02) 50%, transparent 85%)`,
          opacity: active ? 1 : 0,
        }}
      />

      {/* Trigger row */}
      <button
        onClick={onToggle}
        className="relative w-full flex items-center gap-5 py-6 px-4 md:px-0 text-left focus:outline-none z-10"
        aria-expanded={isOpen}
      >
        {/* Step number */}
        <span
          className="shrink-0 w-8 text-[11px] font-bold tracking-[0.18em] tabular-nums transition-colors duration-300 hidden sm:block"
          style={{ color: lit ? themeColor : "rgba(255,255,255,0.18)" }}
        >
          {process.step}
        </span>

        {/* Icon badge */}
        <span
          className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-400"
          style={{
            borderColor: active
              ? `rgba(${rgb},0.45)`
              : hovered
              ? `rgba(${rgb},0.2)`
              : "rgba(255,255,255,0.05)",
            background: active
              ? `rgba(${rgb},0.12)`
              : hovered
              ? `rgba(${rgb},0.06)`
              : "rgba(255,255,255,0.02)",
            boxShadow: lit ? `0 0 20px rgba(${rgb},0.15)` : "none",
          }}
        >
          <Icon
            className="w-5 h-5 transition-colors duration-300"
            style={{ color: active ? themeColor : hovered ? `rgba(${rgb},0.8)` : "rgba(255,255,255,0.4)" }}
          />
        </span>

        {/* Title block */}
        <div className="flex-1 min-w-0">
          <h3
            className="text-lg md:text-xl font-medium tracking-tight transition-colors duration-300"
            style={{ color: active ? "#ffffff" : hovered ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.7)" }}
          >
            {process.title}
          </h3>
        </div>

        {/* Arrow */}
        <span
          className="shrink-0 w-8 h-8 rounded-full border flex items-center justify-center ml-2 transition-all duration-500"
          style={{
            borderColor: active
              ? `rgba(${rgb},0.55)`
              : hovered
              ? `rgba(${rgb},0.25)`
              : "rgba(255,255,255,0.07)",
            background: active
              ? `rgba(${rgb},0.12)`
              : hovered
              ? `rgba(${rgb},0.05)`
              : "transparent",
            transform: active ? "rotate(90deg)" : "rotate(0deg)",
            boxShadow: active ? `0 0 15px rgba(${rgb},0.2)` : "none",
          }}
        >
          <ArrowRight
            className="w-4 h-4 transition-colors duration-300"
            style={{ color: active ? themeColor : hovered ? `rgba(${rgb},0.8)` : "rgba(255,255,255,0.3)" }}
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
        <div ref={bodyRef} className="pb-8 pl-4 sm:pl-[5.5rem] pr-4 sm:pr-0">
          {/* Cyan left accent */}
          <div
             className="relative pl-6 border-l"
             style={{ borderColor: `rgba(${rgb},0.2)` }}
          >
            {/* Dot on border */}
            <div
              className="absolute -left-[5px] top-2 w-2 h-2 rounded-full border border-[#000]"
              style={{ background: themeColor }}
            />

            <p className="text-[15px] text-neutral-400 font-light leading-relaxed max-w-2xl">
              {process.description}
            </p>
          </div>
        </div>
      </div>

      {/* Left indicator glow bar (active) */}
      <div
        className="pointer-events-none absolute left-0 top-0 bottom-0 w-[2px] rounded-full transition-all duration-500"
        style={{
          background: `linear-gradient(to bottom, transparent, ${themeColor}, transparent)`,
          opacity: active ? 1 : hovered ? 0.3 : 0,
          transform: lit ? "scaleY(1)" : "scaleY(0.3)",
          transformOrigin: "center",
        }}
      />
    </div>
  );
}

export function ServiceProcess({ data }: ServiceProcessProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => setOpenIndex((prev) => (prev === i ? null : i));

  return (
    <section className="relative w-full py-12 md:py-20 bg-[#000000] border-t border-white/[0.05]">
      
      {/* Background ambient light */}
      <div 
        className="absolute bottom-0 right-0 w-1/2 h-full opacity-[0.03] pointer-events-none"
        style={{ background: `radial-gradient(1000px circle at bottom right, ${data.themeColor}, transparent)` }}
      />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        
        {/* Header grid matching the homepage ProcessTimeline style */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <div className="mb-6">
              <SectionBadge title="OUR PROCESS" themeColor={data.themeColor} />
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter text-white leading-[1.05]">
              The Roadmap to <br className="hidden md:block" />
              <span className="text-neutral-500">Launch.</span>
            </h2>
          </div>
          <p className="text-lg text-neutral-500 max-w-sm md:text-right font-light text-balance">
            We move fast and break bottlenecks. Our specialized process ensures a seamless transition to a deployed reality.
          </p>
        </div>

        {/* Drawers Container */}
        <div className="max-w-4xl mx-auto">
          <div
            className="rounded-[24px] border border-white/[0.05] overflow-hidden backdrop-blur-sm"
            style={{ background: "#050505", boxShadow: "0 0 0 1px rgba(255,255,255,0.02)" }}
          >
            <div className="px-4 md:px-10">
              {data.process.map((process, i) => (
                <ServiceDrawerRow
                  key={process.step}
                  process={process}
                  index={i}
                  isOpen={openIndex === i}
                  onToggle={() => toggle(i)}
                  themeColor={data.themeColor}
                />
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
