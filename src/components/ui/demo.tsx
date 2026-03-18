'use client';
import React from "react";

const GradientStartButton = () => {
  return (
    <div className="flex justify-center">
      <a
        href="/contact"
        className="group relative inline-flex items-center justify-center bg-[#11131A] px-6 py-2.5 rounded-xl border border-white/10 overflow-hidden transition-all duration-300 hover:border-white/20 hover:shadow-[0_0_20px_rgba(0,240,255,0.15)]"
      >
        {/* Glow effect that slides in on hover */}
        <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-[#00F0FF]/30 to-transparent opacity-0 translate-x-full group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out" />
        
        {/* Bright cyan accent bar on the right edge */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1/2 bg-[#00F0FF] rounded-l-md opacity-0 translate-x-full group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out shadow-[0_0_10px_#00F0FF]" />

        {/* Text */}
        <span className="relative z-10 text-white font-medium text-[14px]">
          Start Project
        </span>
      </a>
    </div>
  );
};
export default GradientStartButton;
