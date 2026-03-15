"use client";

import { useState } from "react";
import { ServiceData } from "@/data/services";
import { Plus } from "lucide-react";
import { SectionBadge } from "@/components/ui/section-badge";

interface ServiceFAQProps {
  data: ServiceData;
}

function hexToRgbString(hex: string): string {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return `${r}, ${g}, ${b}`;
}

function ServiceFAQItem({ q, a, index, openIndex, toggleOpen, themeColor }: { q: string; a: string; index: number; openIndex: number | null; toggleOpen: (idx: number) => void; themeColor: string; }) {
  const open = openIndex === index;
  const rgb = hexToRgbString(themeColor);

  return (
    <button
      onClick={() => toggleOpen(index)}
      className="group w-full text-left focus:outline-none"
      aria-expanded={open}
    >
      <div
        className="relative rounded-2xl border transition-all duration-400"
        style={{
          borderColor: open ? `rgba(${rgb},0.2)` : "rgba(255,255,255,0.06)",
          background: open
            ? `linear-gradient(135deg, rgba(${rgb},0.04) 0%, rgba(255,255,255,0.02) 100%)`
            : "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          boxShadow: open
            ? `0 0 0 1px rgba(${rgb},0.06), inset 0 1px 0 rgba(255,255,255,0.05)`
            : "0 0 0 1px rgba(255,255,255,0.02), inset 0 1px 0 rgba(255,255,255,0.03)",
        }}
      >
        {/* Question row */}
        <div className="flex items-center justify-between gap-4 px-5 py-5 sm:py-6">
          <span
            className="text-[15px] sm:text-base font-medium transition-colors duration-300 text-left"
            style={{ color: open ? "#ffffff" : "rgba(255,255,255,0.75)" }}
          >
            {q}
          </span>

          {/* +/- button */}
          <span
            className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-400"
            style={{
              borderColor: open ? `rgba(${rgb},0.5)` : "rgba(255,255,255,0.1)",
              background: open ? `rgba(${rgb},0.12)` : "rgba(255,255,255,0.03)",
              boxShadow: open ? `0 0 16px rgba(${rgb},0.2)` : "none",
              transform: open ? "rotate(45deg)" : "rotate(0deg)",
              transitionDuration: "350ms",
            }}
          >
            <Plus
              className="w-3.5 h-3.5 transition-colors duration-300"
              style={{ color: open ? themeColor : "rgba(255,255,255,0.45)" }}
            />
          </span>
        </div>

        {/* Answer */}
        <div
          className="overflow-hidden transition-all"
          style={{
            maxHeight: open ? "400px" : "0px",
            transitionDuration: "400ms",
            transitionTimingFunction: "cubic-bezier(0.4,0,0.2,1)",
          }}
        >
          <div className="px-5 pb-5 sm:pb-6">
            <div className="h-px w-full mb-4 sm:mb-5" style={{ background: `rgba(${rgb},0.08)` }} />
            <p className="text-[14px] sm:text-[15px] text-neutral-400 leading-relaxed text-left">
              {a}
            </p>
          </div>
        </div>
      </div>
    </button>
  );
}

export function ServiceFAQ({ data }: ServiceFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Keep first open by default

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative w-full py-12 md:py-20 bg-[#000000] border-t border-white/[0.04]">
      <div className="container mx-auto px-6 max-w-3xl">
        
        <div className="flex flex-col items-center text-center mb-16 lg:mb-20">
          <div className="mb-6">
            <SectionBadge title="COMMON QUESTIONS" themeColor={data.themeColor} />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter text-white leading-[1.08] mt-2 mb-6">
            Anti-Risk <span className="text-neutral-500">F.A.Q.</span>
          </h2>
          <p className="text-[15px] md:text-base text-neutral-500 font-light text-balance max-w-sm mx-auto">
            Clear answers to technical and operational concerns before we begin execution.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {data.faq.map((faq, idx) => (
            <ServiceFAQItem 
              key={idx}
              q={faq.question}
              a={faq.answer}
              index={idx}
              openIndex={openIndex}
              toggleOpen={toggleOpen}
              themeColor={data.themeColor}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
