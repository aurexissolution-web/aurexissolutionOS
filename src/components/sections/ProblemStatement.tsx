"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, Brain, Clock4, Cpu, Crosshair, Plus } from "lucide-react";
import { AnimatedBadge } from "@/components/ui/animated-badge";
import { cn } from "@/lib/utils";

export type TimelineEntry = {
  icon: React.ComponentType<{ className?: string }>;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  items: string[];
  accentColor: string;
  button?: { url: string; text: string };
};

const entries: TimelineEntry[] = [
  {
    icon: Cpu,
    tag: "The Pivot",
    title: "Data is everywhere. Intelligence is rare.",
    subtitle: "AI Automation",
    accentColor: "#00F0FF",
    description:
      "Most businesses are drowning in disconnected tools, wasting valuable human hours on manual tasks. You don't need more generic software suites you need an autonomous ecosystem. We engineer custom AI automation workflows that eliminate operational friction. We don't just store your data; we build intelligent systems that put it to work, radically accelerating your efficiency.",
    items: [
      "Replace manual bottlenecks with unified, AI-driven workflow automations.",
      "Develop custom LLM agents trained securely on your proprietary business logic.",
      "Implement real time AI intelligence layers across your existing tech stack.",
      "Deploy enterprise grade, secure AI infrastructure built for high scalability.",
    ],
    button: { url: "/services", text: "Explore AI Services" },
  },
  {
    icon: Clock4,
    tag: "Efficiency",
    title: "Stop throwing human hours at machine tasks.",
    subtitle: "Process Automation",
    accentColor: "#0047FF",
    description:
      "The gap between high-growth companies and the rest is Automation. If your team is still performing repetitive digital tasks, you aren't scaling you're just busy. We exist to bridge that gap. By engineering custom AI agents and intelligent process automations, we help you reclaim your most valuable asset: time.",
    items: [
      "Automate repetitive operations end-to-end without sacrificing accuracy.",
      "Radically reduce manual overhead within the very first sprint.",
      "Liberate your team to focus exclusively on strategic, high-leverage work.",
      "Build continuous improvement loops powered by intelligent agent feedback.",
    ],
  },
  {
    icon: Brain,
    tag: "Future-Proof",
    title: "The digital standard has shifted.",
    subtitle: "AI-First Architecture",
    accentColor: "#00F0FF",
    description:
      "Traditional web and app development are no longer enough to stay competitive in an AI-first economy. To lead your industry, your entire digital presence must be intelligent, responsive, and autonomous. We don't just build software; we architect the future of your operations infusing custom AI automation directly into high-performance web platforms and scalable mobile apps.",
    items: [
      "AI Automation: Build workflows that learn, adapt, and autonomously improve over time.",
      "AI/Web Dev: Engineer AI-native web platforms with embedded reasoning and real-time data processing.",
      "AI/App Dev: Deploy intelligent mobile ecosystems built on scalable, next-decade infrastructure.",
      "The Moat: Secure a competitive advantage built on proprietary LLM models and unified codebases.",
    ],
    button: { url: "/contact", text: "Start the Conversation" },
  },
  {
    icon: Crosshair,
    tag: "Specialization",
    title: "Specialization is the ultimate unfair advantage.",
    subtitle: "The Aurexis Evolution",
    accentColor: "#0047FF",
    description:
      "Generalist agencies deliver average results. To truly move the needle in today's digital landscape, you need deep, specialized expertise. We shed the traditional agency fluff to master a unified ecosystem: AI Automation, High-Performance Web, Scalable Apps, and Data-Driven Growth. We don't do everything we do exactly what is engineered to scale your business.",
    items: [
      "Deep technical expertise across AI, Web, App, and Digital Marketing.",
      "Zero templates or shortcuts every architecture is bespoke and scalable.",
      "Unified growth strategies where your technology and marketing align.",
      "Measurable ROI directly tied to your core business revenue metrics.",
    ],
  },
];

function SpotlightCard({
  children,
  isActive,
  accent,
}: {
  children: React.ReactNode;
  isActive: boolean;
  accent: string;
}) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className="relative overflow-hidden rounded-[32px] border border-white/[0.03] bg-[#050505] p-8 md:p-14 transition-all duration-700 isolate"
      style={{
        transform: isActive ? "scale(1)" : "scale(0.97)",
        opacity: isActive ? 1 : 0.3,
        filter: isActive ? "blur(0px)" : "blur(2px)",
      }}
    >
      {/* Spotlight follower */}
      <div
        className="pointer-events-none absolute -inset-px rounded-[32px] transition-opacity duration-500"
        style={{
          opacity,
          background: `radial-gradient(800px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.06), transparent 40%)`,
        }}
      />
      {/* Subtle top glow */}
      <div
        className={cn("pointer-events-none absolute inset-0 transition-opacity duration-1000", isActive ? "opacity-100" : "opacity-0")}
        style={{
          background: `radial-gradient(120% 100% at 50% 0%, ${accent}08, transparent 50%)`,
        }}
      />
      {/* Active thin border override */}
      <div
        className={cn("pointer-events-none absolute inset-0 rounded-[32px] border transition-all duration-700", isActive ? "border-white/[0.08]" : "border-transparent")}
      />

      <div className="relative z-10">{children}</div>
    </div>
  );
}

export function ProblemStatement() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sentinelRefs = useRef<(HTMLDivElement | null)[]>([]);

  const setSentinelRef = (el: HTMLDivElement | null, i: number) => {
    sentinelRefs.current[i] = el;
  };

  useEffect(() => {
    let frame = 0;
    const tick = () => {
      frame = requestAnimationFrame(tick);
      const centerY = window.innerHeight / 3;
      let bestIdx = 0;
      let bestDist = Infinity;
      sentinelRefs.current.forEach((node, i) => {
        if (!node) return;
        const rect = node.getBoundingClientRect();
        const dist = Math.abs(rect.top + rect.height / 2 - centerY);
        if (dist < bestDist) { bestDist = dist; bestIdx = i; }
      });
      setActiveIndex((prev) => (prev !== bestIdx ? bestIdx : prev));
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section className="py-40 bg-[#000000]">
      <div className="container mx-auto px-6 max-w-7xl">

        {/* Section header */}
        <div className="max-w-5xl mb-32">
          <div className="mb-8">
            <AnimatedBadge text="Why Aurexis Solution" color="#00F0FF" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium tracking-tighter text-white mb-6 leading-[1.05]">
            The problem isn't your technology.<br className="hidden lg:block" />
            <span className="text-[#333333] lg:ml-0 m-0"> It's the friction between your systems.</span>
          </h2>
          <p className="text-lg md:text-xl text-neutral-500 max-w-5xl font-light text-balance">
            Most businesses are drowning in disconnected tools. We architect unified digital ecosystems combining AI automation, high-performance web and apps, and data-driven growth strategies to eliminate bottlenecks and scale seamlessly.
          </p>
        </div>

        {/* Timeline entries */}
        <div className="space-y-8">
          {entries.map((entry, index) => {
            const isActive = index === activeIndex;
            const Icon = entry.icon;

            return (
              <div
                key={index}
                className="relative flex flex-col gap-8 md:flex-row md:gap-20"
                aria-current={isActive ? "true" : "false"}
              >
                {/* Sentinel */}
                <div
                  ref={(el) => setSentinelRef(el, index)}
                  aria-hidden
                  className="absolute -top-32 left-0 h-12 w-12 opacity-0 pointer-events-none"
                />

                {/* ── Left sticky minimalist index ── */}
                <div className="top-32 flex h-min shrink-0 flex-col md:sticky md:w-32 pt-8">
                  <div 
                    className="text-[100px] leading-none font-light tracking-tighter text-white transition-all duration-700 origin-left"
                    style={{ 
                      opacity: isActive ? 1 : 0.05,
                      transform: isActive ? "scale(1)" : "scale(0.85)"
                    }}
                  >
                    0{index + 1}
                  </div>
                  <div 
                    className="mt-2 text-xs font-semibold tracking-[0.2em] text-neutral-500 uppercase transition-all duration-700" 
                    style={{ 
                      opacity: isActive ? 1 : 0.2,
                      transform: isActive ? "translateY(0)" : "translateY(-10px)"
                    }}
                  >
                    {entry.tag}
                  </div>
                </div>

                {/* ── Spotlight content card ── */}
                <div className="flex-1">
                  <SpotlightCard isActive={isActive} accent={entry.accentColor}>
                    {/* Upper Meta */}
                    <div className="flex items-center gap-3 mb-10">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-white/[0.02]">
                        <Icon className="w-4 h-4 text-neutral-400" />
                      </div>
                      <span className="text-sm font-medium tracking-widest text-[#00F0FF] uppercase">
                        {entry.subtitle}
                      </span>
                    </div>

                    {/* Main Content */}
                    <div className="space-y-6 max-w-3xl">
                      <h3 className="text-3xl md:text-5xl font-medium text-white tracking-tight leading-[1.15] text-balance">
                        {entry.title}
                      </h3>
                      <p className="text-lg md:text-xl text-neutral-400 leading-relaxed font-light text-pretty">
                        {entry.description}
                      </p>
                    </div>

                    {/* Feature Grid */}
                    <div className="mt-12 grid sm:grid-cols-2 gap-y-5 gap-x-8">
                      {entry.items.map((item, i) => (
                        <div key={i} className="flex items-start gap-3 group/item transition-colors duration-300">
                          <Plus className="w-5 h-5 text-neutral-600 shrink-0 mt-0.5 transition-colors group-hover/item:text-white" />
                          <span className="text-neutral-300 text-base font-light transition-colors group-hover/item:text-white">{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Elegant Button */}
                    {entry.button && (
                      <div className="mt-14 pt-8 border-t border-white/[0.06]">
                        <a 
                          href={entry.button.url} 
                          className="group inline-flex items-center gap-4 text-base font-medium text-white hover:text-neutral-300 transition-colors"
                        >
                          {entry.button.text}
                          <span className="relative flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all duration-300 group-hover:border-white/20 group-hover:bg-white/10">
                            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                          </span>
                        </a>
                      </div>
                    )}
                  </SpotlightCard>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
