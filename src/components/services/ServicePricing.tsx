"use client";

import { motion } from "framer-motion";
import React, { useState, useRef } from "react";
import { ServiceData } from "@/data/services";
import { ShieldCheck } from "lucide-react";
import { SectionBadge } from "@/components/ui/section-badge";
import { InteractiveStarfield, PricingCard } from "@/components/ui/interactive-pricing";

interface ServicePricingProps {
  data: ServiceData;
}

export function ServicePricing({ data }: ServicePricingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState<{ x: number | null; y: number | null }>({ x: null, y: null });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = event;
    setMousePosition({ x: clientX, y: clientY });
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePosition({ x: null, y: null })}
      className="relative w-full py-12 md:py-20 bg-[#000000] overflow-hidden"
    >
      <InteractiveStarfield mousePosition={mousePosition} containerRef={containerRef} themeColor={data.themeColor} />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        
        <div className="flex flex-col items-center text-center mb-24 cursor-default">
          <SectionBadge title="PRICING STRUCTURE" themeColor={data.themeColor} className="mb-8" />
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter text-white mb-6 leading-[1.05]">
            Transparent <span className="text-neutral-500">Scaling.</span>
          </h2>
          <p className="text-lg md:text-xl text-neutral-500 font-light text-balance max-w-2xl mx-auto mb-10">
            No hidden fees. We engineer custom systems designed to generate ROI far exceeding the build cost.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/5 bg-white/[0.02]"
          >
            <ShieldCheck className="w-4 h-4" style={{ color: data.themeColor }} />
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#d4d4d8]">
              Mutual NDA for complete IP protection
            </span>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch pt-4">
          {data.pricing.map((plan, index) => (
            <div key={plan.tier} className={plan.isRecommended ? "lg:-mt-8 lg:mb-8" : "relative"}>
              <PricingCard 
                plan={{
                  tier: plan.tier,
                  price: plan.price,
                  description: plan.description,
                  features: plan.features,
                  isRecommended: plan.isRecommended
                }} 
                index={index} 
                themeColor={data.themeColor} 
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
