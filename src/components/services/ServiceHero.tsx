"use client";

import { motion } from "framer-motion";
import { ServiceData } from "@/data/services";
import { Button } from "../ui/button";
import { BackgroundPaths } from "../ui/background-paths";
interface ServiceHeroProps {
  data: ServiceData;
}

export function ServiceHero({ data }: ServiceHeroProps) {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-24">
      {/* ── Animated Background Paths ── */}
      <BackgroundPaths 
        className="-z-10" 
        themeColor={data.themeColor} 
      />

      {/* Deep black overlay so text stays readable against the active paths */}
      <div className="absolute inset-0 bg-[#02040A]/10 -z-0 pointer-events-none" />

      {/* Content */}
      <div className="max-w-[1000px] mx-auto px-6 text-center z-10 flex flex-col items-center">
        
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md mb-8"
        >
          <span
            className="w-2 h-2 rounded-full animate-pulse shadow-[0_0_10px_currentColor]"
            style={{ backgroundColor: data.themeColor, color: data.themeColor }}
          />
          <span className="text-xs font-medium uppercase tracking-wider text-[#9ca3af]">Enterprise Solution</span>
        </motion.div>

        {/* Hook Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tighter leading-[1.05] mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60"
        >
          {data.hero.title}
        </motion.h1>

        {/* Agitation Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-2xl font-medium tracking-tight text-white/70 max-w-[700px] mx-auto leading-relaxed mb-12"
        >
          {data.hero.agitation}
        </motion.p>

        {/* Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <div className="relative group/btn">
            {/* The animated dynamic glow behind the button */}
            <div
              className="absolute -inset-1 rounded-full opacity-0 group-hover/btn:opacity-100 blur-lg transition-all duration-500"
              style={{ backgroundColor: data.themeColor, filter: "blur(20px)" }}
            />
            <Button
              onClick={() => {
                document.getElementById("conversion-block")?.scrollIntoView({ behavior: "smooth" });
              }}
              variant="default"
              className="relative px-8 py-6 rounded-full text-lg font-semibold tracking-wide transition-all duration-300 
                         group-hover/btn:-translate-y-1 overflow-hidden isolate"
              style={{
                backgroundColor: data.themeColor,
                color: "#010204", // Deep void text for maximum contrast against bright theme colours
                boxShadow: `0 0 20px -5px ${data.themeColor}`,
              }}
            >
              {/* Subtle inner highlight */}
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
              <span className="relative flex items-center gap-2">
                {data.hero.ctaText}
                <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
              </span>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
