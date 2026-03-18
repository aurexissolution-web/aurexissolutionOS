"use client";

import { motion } from "framer-motion";
import { Check, X, ChevronRight } from "lucide-react";
import { PremiumBadge } from "@/components/ui/PremiumBadge";

interface ComparisonItem {
  feature: string;
  traditional: string;
  aurexis: string;
}

const comparisons: ComparisonItem[] = [
  {
    feature: "Development Speed",
    traditional: "Months of bureaucracy and 'development hell'",
    aurexis: "Rapid prototyping and weekly deployment cycles",
  },
  {
    feature: "System Intelligence",
    traditional: "Static software with manual data entry",
    aurexis: "Autonomous AI agents that learn and adapt",
  },
  {
    feature: "Workflow Efficiency",
    traditional: "Disconnected tools and manual bottlenecks",
    aurexis: "Seamlessly orchestrated, zero-busywork pipelines",
  },
  {
    feature: "Decision Making",
    traditional: "Reactive decisions based on old reports",
    aurexis: "Predictive intelligence with real-time command center",
  },
  {
    feature: "Scalability",
    traditional: "Rigid legacy systems that break under pressure",
    aurexis: "Modular, future-proof ecosystems that scale instantly",
  },
  {
    feature: "Partnership Type",
    traditional: "Order-taking vendors with opaque pricing",
    aurexis: "Technical partners architecting your growth engine",
  },
];

export const ComparisonSection = () => {
  return (
    <section className="container mx-auto px-6 max-w-7xl mb-24 pt-10">
      <div className="mb-12">
        <PremiumBadge text="Analysis & Benchmarks" />
        
        <div className="mt-8 space-y-4">
          <h2 className="text-5xl md:text-8xl font-medium tracking-tighter text-white leading-[0.9]">
            The problem isn't your technology. <br/>
            <span className="text-neutral-700">It's the friction between your systems.</span>
          </h2>
          <p className="text-xl md:text-2xl text-neutral-500 max-w-4xl font-light leading-relaxed mt-10">
            Most businesses are drowning in disconnected tools. We architect unified digital ecosystems combining AI automation, high-performance web and apps, and data-driven growth strategies to eliminate bottlenecks and scale seamlessly.
          </p>
        </div>
      </div>

      <div className="relative">
        {/* Header Row */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr_1.5fr] gap-4 mb-4 border-b border-white/5 pb-6">
          <div className="text-[10px] uppercase tracking-[0.4em] text-neutral-600 font-black">Benchmark feature</div>
          <div className="text-[10px] uppercase tracking-[0.4em] text-neutral-600 font-black">Traditional Vendors</div>
          <div className="text-[10px] uppercase tracking-[0.4em] text-[#00F0FF] font-black">Aurexis Solution</div>
        </div>

        {/* Comparison Rows */}
        <div className="space-y-4">
          {comparisons.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr_1.5fr] gap-6 lg:gap-8 p-8 rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/10 transition-all duration-500 group"
            >
              <div className="flex flex-col gap-1">
                <span className="text-xs font-mono text-neutral-600 italic">0{i + 1}</span>
                <h4 className="text-white font-medium group-hover:text-[#00F0FF] transition-colors duration-300">
                  {item.feature}
                </h4>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1 w-4 h-4 rounded-full border border-violet-500/20 flex items-center justify-center shrink-0">
                  <X className="w-2.5 h-2.5 text-violet-500/50" />
                </div>
                <p className="text-neutral-500 text-base font-light leading-relaxed italic">
                  {item.traditional}
                </p>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-emerald-500/[0.02] border border-emerald-500/5 group-hover:bg-emerald-500/[0.05] group-hover:border-emerald-500/20 transition-all duration-500">
                <div className="mt-1 w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 border border-emerald-500/20">
                  <Check className="w-3 h-3 text-emerald-400" />
                </div>
                <p className="text-white text-lg font-light leading-snug">
                  {item.aurexis}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Global CTA for Comparison */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-16 flex justify-end"
        >
          <div className="flex items-center gap-4 text-emerald-400 group cursor-pointer">
            <span className="text-sm font-bold tracking-widest uppercase border-b border-emerald-500/20 pb-1 group-hover:border-emerald-400 transition-all duration-300">
              See detailed technical breakdown
            </span>
            <div className="w-10 h-10 rounded-full border border-emerald-500/30 flex items-center justify-center group-hover:bg-emerald-500/10 transition-all duration-300">
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
