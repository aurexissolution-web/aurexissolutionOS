"use client";

import React, { useEffect, useRef, useState } from "react";
import { Target, Zap, Cpu, Shield, Plus } from "lucide-react";
import { AnimatedBadge } from "@/components/ui/animated-badge";
import { cn } from "@/lib/utils";

export type TimelineEntry = {
  icon: React.ComponentType<{ className?: string }>;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  items?: string[];
  accentColor: string;
  button?: { url: string; text: string };
};

const entries: TimelineEntry[] = [
  {
    icon: Target,
    tag: "The Mission",
    title: "10x human output.",
    subtitle: "Eliminating Friction",
    accentColor: "#00F0FF",
    description:
      "To architect intelligent systems that eliminate manual friction. We don't just build software; we engineer autonomous workflows that work for you, not the other way around. Our mission is to fundamentally rethink how businesses operate in a digital-first world.",
    items: [
      "Architect intelligent systems that work autonomously.",
      "Eliminate manual friction across all operational layers.",
      "Empower human talent to focus on high-leverage strategy.",
      "Rethink legacy processes with AI-first architecture.",
    ],
  },
  {
    icon: Zap,
    tag: "The Vision",
    title: "The premier engine of efficiency.",
    subtitle: "Southeast Asia's Engine",
    accentColor: "#0047FF",
    description:
      "To be the premier engine behind the most automated, efficient companies in Southeast Asia. We envision a business landscape where technical infrastructure is entirely invisible, operating as a catalyst for explosive, unrestricted growth rather than a bottleneck.",
    items: [
      "Become the trusted technical partner for high-growth enterprises.",
      "Set the operational standard for automated efficiency.",
      "Turn infrastructure from a cost-center into a growth-driver.",
      "Lead the transition to AI-native business ecosystems.",
    ],
  },
  {
    icon: Cpu,
    tag: "The Goals",
    title: "Autonomous operations at scale.",
    subtitle: "Transforming Workflows",
    accentColor: "#00F0FF",
    description:
      "To transform workflows into autonomous operations by seamlessly integrating custom AI agents, high-performance web platforms, and data-driven systems. We aim to build moats for our clients by leveraging proprietary automation uniquely tailored to their business logic.",
    items: [
      "Deploy custom AI agents tailored to specific business logic.",
      "Integrate high-performance, scalable web platforms seamlessly.",
      "Establish deep, unified data architectures for real-time insights.",
      "Build technical moats that competitors cannot easily replicate.",
    ],
  },
  {
    icon: Shield,
    tag: "The Standard",
    title: "Architect-led. Privacy-First.",
    subtitle: "Our Execution Rigor",
    accentColor: "#0047FF",
    description:
      "Speed-to-Market, Privacy-First rigor, and Architect-led execution. We refuse to participate in development hell. We believe in shipping secure, scalable solutions rapidly, maintaining the highest standards of code quality, data security, and architectural integrity from Day 1.",
    items: [
      "Uncompromising privacy and security for all client data models.",
      "Rapid speed-to-market without sacrificing architectural integrity.",
      "Senior architect-led strategy from discovery to deployment.",
      "Zero templates. Every line of code is bespoke and scalable.",
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
      <div
        className="pointer-events-none absolute -inset-px rounded-[32px] transition-opacity duration-500"
        style={{
          opacity,
          background: `radial-gradient(800px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.06), transparent 40%)`,
        }}
      />
      <div
        className={cn("pointer-events-none absolute inset-0 transition-opacity duration-1000", isActive ? "opacity-100" : "opacity-0")}
        style={{
          background: `radial-gradient(120% 100% at 50% 0%, ${accent}08, transparent 50%)`,
        }}
      />
      <div
        className={cn("pointer-events-none absolute inset-0 rounded-[32px] border transition-all duration-700", isActive ? "border-white/[0.08]" : "border-transparent")}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export function AboutTimeline() {
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
    <section className="py-20 lg:py-40 bg-[#02040A]">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="max-w-5xl mb-32">
          <div className="mb-8">
            <AnimatedBadge text="The North Star" color="#00F0FF" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium tracking-tighter text-white mb-6 leading-[1.05]">
            We architect systems.<br className="hidden lg:block" />
            <span className="text-[#333333] lg:ml-0 m-0"> Not just software.</span>
          </h2>
          <p className="text-lg md:text-xl text-neutral-500 max-w-5xl font-light text-balance">
            Our mission is clear: eliminate manual friction and radically accelerate your efficiency. We build intelligent digital ecosystems that operate as the premier engines behind Southeast Asia's most automated companies.
          </p>
        </div>

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
                <div
                  ref={(el) => setSentinelRef(el, index)}
                  aria-hidden
                  className="absolute -top-32 left-0 h-12 w-12 opacity-0 pointer-events-none"
                />

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

                <div className="flex-1">
                  <SpotlightCard isActive={isActive} accent={entry.accentColor}>
                    <div className="flex items-center gap-3 mb-10">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-white/[0.02]">
                        <Icon className="w-4 h-4 text-neutral-400" />
                      </div>
                      <span className="text-sm font-medium tracking-widest text-[#00F0FF] uppercase">
                        {entry.subtitle}
                      </span>
                    </div>

                    <div className="space-y-6 max-w-3xl">
                      <h3 className="text-3xl md:text-5xl font-medium text-white tracking-tight leading-[1.15] text-balance">
                        {entry.title}
                      </h3>
                      <p className="text-lg md:text-xl text-neutral-400 leading-relaxed font-light text-pretty">
                        {entry.description}
                      </p>
                    </div>

                    {entry.items && (
                      <div className="mt-12 grid sm:grid-cols-2 gap-y-5 gap-x-8">
                        {entry.items.map((item, i) => (
                          <div key={i} className="flex items-start gap-3 group/item transition-colors duration-300">
                            <Plus className="w-5 h-5 text-neutral-600 shrink-0 mt-0.5 transition-colors group-hover/item:text-white" />
                            <span className="text-neutral-300 text-base font-light transition-colors group-hover/item:text-white">{item}</span>
                          </div>
                        ))}
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
