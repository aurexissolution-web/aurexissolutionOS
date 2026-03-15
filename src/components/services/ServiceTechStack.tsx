"use client";

import type React from "react";
import { ServiceData } from "@/data/services";

interface ServiceTechStackProps {
  data: ServiceData;
}

function TextTrack({ data }: { data: ServiceData }) {
  return (
    <div
      className="flex flex-shrink-0 animate-marquee items-center group-hover:[animation-play-state:paused]"
      style={{ "--duration": "50s" } as React.CSSProperties}
      aria-hidden="true"
    >
      {data.techStack.logos.map((logo, idx) => (
        <div key={`${logo.name}-${idx}`} className="flex items-center">
          <span
            className="text-5xl md:text-7xl lg:text-[6rem] font-black uppercase tracking-tighter transition-all duration-500 cursor-default px-6 xl:px-8 select-none"
            style={{
              color: "transparent",
              WebkitTextStroke: "1px rgba(255, 255, 255, 0.25)",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.webkitTextStroke = "0px";
              el.style.backgroundImage = `linear-gradient(to bottom, #ffffff, ${data.themeColor})`;
              el.style.backgroundClip = "text";
              el.style.webkitBackgroundClip = "text";
              el.style.color = "transparent";
              el.style.textShadow = `0 0 60px ${data.themeColor}80, 0 0 20px ${data.themeColor}40`;
              el.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.webkitTextStroke = "1px rgba(255, 255, 255, 0.25)";
              el.style.backgroundImage = "none";
              el.style.textShadow = "none";
              el.style.transform = "scale(1)";
            }}
          >
            {logo.name}
          </span>
          <span
            className="text-4xl md:text-6xl font-light italic"
            style={{ color: "rgba(255, 255, 255, 0.15)" }}
          >
            /
          </span>
        </div>
      ))}
    </div>
  );
}

export function ServiceTechStack({ data }: ServiceTechStackProps) {
  return (
    <section className="relative w-full py-16 md:py-20 bg-[#02040A] overflow-hidden border-y border-white/[0.04] flex items-center justify-center">
      {/* Deep ambient background glow behind the entire ticker */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          background: `radial-gradient(ellipse 70% 50% at 50% 50%, ${data.themeColor} 0%, transparent 60%)`,
        }}
      />

      {/* "POWERED BY" minimal label tucked subtly above the giant text */}
      <div className="absolute top-8 left-1/2 -tracking-normal -translate-x-1/2 flex items-center gap-4 z-20">
        <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-white/20" />
        <span
          className="text-[10px] font-mono tracking-[0.4em] uppercase font-bold"
          style={{ color: data.themeColor }}
        >
          Powering the Web
        </span>
        <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-white/20" />
      </div>

      <div className="relative flex overflow-hidden w-full group">
        {/* Soft blackout fades at the very edges to make the text emerge from shadows */}
        <div className="absolute top-0 left-0 w-32 md:w-64 h-full bg-gradient-to-r from-[#02040A] to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 right-0 w-32 md:w-64 h-full bg-gradient-to-l from-[#02040A] to-transparent z-20 pointer-events-none" />

        {/* CSS Infinite loops */}
        <TextTrack data={data} />
        <TextTrack data={data} />
        <TextTrack data={data} />
        <TextTrack data={data} />
      </div>
    </section>
  );
}
