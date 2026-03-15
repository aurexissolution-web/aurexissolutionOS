"use client";
import { motion } from "framer-motion";
import { GlassCard } from "./GlassCard";
import { NeonButton } from "./NeonButton";
import { Check } from "lucide-react";

export interface PricingTier {
  name: string;
  focus: string;
  bestFor: string;
  features: string[];
  popular?: boolean;
}

export function PricingTable({ tiers }: { tiers: PricingTier[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {tiers.map((tier, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.1, duration: 0.4 }}
          className="relative"
        >
          {tier.popular && (
             <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#00F0FF] text-[#02040A] text-xs py-1 px-4 rounded-full font-bold uppercase tracking-widest z-20">
               Most Popular
             </div>
          )}
          <GlassCard className={`h-full flex flex-col items-start ${tier.popular ? 'border-[#00F0FF]/50 shadow-[0_0_30px_rgba(0,240,255,0.1)]' : ''}`}>
            <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
            <p className="text-[#00F0FF] font-medium mb-4">{tier.focus}</p>
            <p className="text-sm text-[#94A3B8] mb-8 pb-8 border-b border-white/10 w-full">Ideal for: {tier.bestFor}</p>
            
            <ul className="flex-1 w-full space-y-4 mb-8">
              {tier.features.map((feature, fIdx) => (
                <li key={fIdx} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#00F0FF] shrink-0 mt-0.5" />
                  <span className="text-white text-sm">{feature}</span>
                </li>
              ))}
            </ul>
            
            <div className="w-full mt-auto pt-8 border-t border-white/10">
              <NeonButton 
                variant={tier.popular ? 'primary' : 'secondary'} 
                href="/contact" 
                className="w-full"
              >
                Check Availability
              </NeonButton>
            </div>
          </GlassCard>
        </motion.div>
      ))}
    </div>
  );
}
