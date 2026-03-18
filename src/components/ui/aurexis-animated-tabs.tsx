"use client";

import { AnimatedTabs, type Tab } from "@/components/ui/animated-tabs";
import Image from "next/image";

const aurexisTabs: Tab[] = [
  {
    id: "mission",
    label: "Mission",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 w-full h-full pb-4">
        <div className="relative w-full h-64 md:h-[400px] rounded-2xl overflow-hidden border border-[#00F0FF]/10 shadow-2xl">
          <Image
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop"
            alt="The Mission"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center gap-y-6">
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            The Mission
          </h2>
          <p className="text-lg text-neutral-400 leading-relaxed font-light">
            To architect intelligent systems that eliminate manual friction and <span className="text-white font-medium">10x human output.</span>
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "vision",
    label: "Vision",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 w-full h-full pb-4">
        <div className="relative w-full h-64 md:h-[400px] rounded-2xl overflow-hidden border border-[#0047FF]/10 shadow-2xl">
          <Image
            src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop"
            alt="The Vision"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center gap-y-6">
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            The Vision
          </h2>
          <p className="text-lg text-neutral-400 leading-relaxed font-light">
            To be the premier engine behind the most <span className="text-white font-medium">automated, efficient companies</span> in Southeast Asia.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "goals",
    label: "Goals",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 w-full h-full pb-4">
        <div className="relative w-full h-64 md:h-[400px] rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
          <Image
            src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop"
            alt="The Goals"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center gap-y-6">
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            The Goals
          </h2>
          <p className="text-lg text-neutral-400 leading-relaxed font-light">
            To transform workflows into autonomous operations with custom AI agents and high-performance platforms.
          </p>
        </div>
      </div>
    ),
  },
];

function PremiumCardWrap({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full p-4 md:p-12 isolate mt-10">
      {/* Outer Dotted Frame container */}
      <div 
        className="absolute inset-0 border border-white/10 pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1.5px, transparent 1.5px)', backgroundSize: '16px 16px' }}
      >
        {/* Glow Effects linked to Brand Palette (Electric Cyan & Cyber Blue) */}
        <div className="absolute top-1/2 left-1/4 w-1/3 h-1/2 bg-[#00F0FF] rounded-full mix-blend-screen blur-[120px] opacity-20 -translate-y-1/2" />
        <div className="absolute top-1/2 right-1/4 w-1/3 h-1/2 bg-[#0047FF] rounded-full mix-blend-screen blur-[120px] opacity-20 -translate-y-1/2" />
      </div>

      {/* Crosshairs - Corners of the Dotted frame */}
      {/* Top Left */}
      <div className="absolute top-[-8px] left-[-1px] w-[1px] h-[16px] bg-neutral-500 pointer-events-none" />
      <div className="absolute top-[-1px] left-[-8px] w-[16px] h-[1px] bg-neutral-500 pointer-events-none" />
      {/* Top Right */}
      <div className="absolute top-[-8px] right-[-1px] w-[1px] h-[16px] bg-neutral-500 pointer-events-none" />
      <div className="absolute top-[-1px] right-[-8px] w-[16px] h-[1px] bg-neutral-500 pointer-events-none" />
      {/* Bottom Left */}
      <div className="absolute bottom-[-8px] left-[-1px] w-[1px] h-[16px] bg-neutral-500 pointer-events-none" />
      <div className="absolute bottom-[-1px] left-[-8px] w-[16px] h-[1px] bg-neutral-500 pointer-events-none" />
      {/* Bottom Right */}
      <div className="absolute bottom-[-8px] right-[-1px] w-[1px] h-[16px] bg-neutral-500 pointer-events-none" />
      <div className="absolute bottom-[-1px] right-[-8px] w-[16px] h-[1px] bg-neutral-500 pointer-events-none" />

      {/* Inner Solid Card containing the content */}
      <div className="relative z-10 w-full rounded-3xl bg-[#08080C] border border-white/[0.04] p-3 shadow-2xl overflow-hidden backdrop-blur-md">
        {/* Very subtle inner top edge glow */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00F0FF]/30 to-transparent" />
        {children}
      </div>
    </div>
  );
}

export function AurexisAnimatedTabs() {
  return (
    <div className="w-full flex justify-center max-w-5xl">
      <PremiumCardWrap>
        <AnimatedTabs tabs={aurexisTabs} className="w-full" />
      </PremiumCardWrap>
    </div>
  );
}
