"use client";

import { motion } from "framer-motion";
import { ServiceData } from "@/data/services";
import { Server, Code2, Cpu, Globe } from "lucide-react"; 
import { SectionBadge } from "@/components/ui/section-badge";
import { BentoGrid, BentoItem } from "@/components/ui/bento-grid";

interface ServiceFeaturesProps {
  data: ServiceData;
}

export function ServiceFeatures({ data }: ServiceFeaturesProps) {
  
  // We'll cycle through a few generic high-tech icons for the features
  const iconsList = [Server, Code2, Cpu, Globe];

  // Map the Service page capabilities into BentoGrid items
  const bentoItems: BentoItem[] = data.features.map((feat, idx) => {
    const IconComponent = iconsList[idx % iconsList.length];
    
    return {
      title: feat.title,
      description: feat.description,
      // Pass the icon pre-styled with the themeColor
      icon: <IconComponent className="w-5 h-5" style={{ color: data.themeColor }} />,
      // Left-side items take 2 columns, right-side items take 1 column
      colSpan: idx % 2 === 0 ? 2 : 1,
      // Tag it with a generic label for the premium bento look
      status: `CAPABILITY 0${idx + 1}`,
      // Faux tags for the tech aesthetic
      tags: ["Infrastructure", "Scalable", "Architecture"].slice(0, 2 + (idx % 2)),
      cta: "Explore →",
      hasPersistentHover: idx === 0 // Make the first card glow permanently
    };
  });

  return (
    <section className="relative w-full py-12 md:py-20 bg-[#000000]">
      <div className="max-w-[1200px] mx-auto px-6">
        
        <div className="flex flex-col mb-20 max-w-4xl">
          <SectionBadge title="CORE CAPABILITIES" themeColor={data.themeColor} className="mb-8 self-start" />
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter text-white mb-6 leading-[1.05]">
            Engineered for <span className="text-neutral-500">absolute dominance.</span>
          </h2>
          <p className="text-lg md:text-xl text-neutral-500 font-light text-balance max-w-2xl">
            We don't just use buzzwords. We engineer tangible, specific solutions that directly impact your bottom line.
          </p>
        </div>

        {/* --- Render the Bento Grid --- */}
        <BentoGrid items={bentoItems} themeColor={data.themeColor} />

      </div>
    </section>
  );
}
