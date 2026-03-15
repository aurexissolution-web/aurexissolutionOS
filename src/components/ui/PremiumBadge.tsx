"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

interface PremiumBadgeProps {
  text: string;
}

export const PremiumBadge = ({ text }: PremiumBadgeProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="inline-flex items-center gap-3 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md group cursor-default"
    >
      <div className="relative flex items-center justify-center">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 z-10" />
        <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-emerald-400/40 animate-ping" />
      </div>
      
      <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-emerald-400 group-hover:text-[#00F0FF] transition-colors duration-500">
        {text}
      </span>
      
      <ChevronRight className="w-3 h-3 text-white/30 group-hover:text-emerald-400 transition-colors duration-300" />
    </motion.div>
  );
};
