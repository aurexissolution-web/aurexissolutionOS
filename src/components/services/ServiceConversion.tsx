"use client";

import { ServiceData } from "@/data/services";
import Cal, { getCalApi } from "@calcom/embed-react";
import { SectionBadge } from "@/components/ui/section-badge";
import { useEffect } from "react";

interface ServiceConversionProps {
  data: ServiceData;
}

export function ServiceConversion({ data }: ServiceConversionProps) {

  useEffect(() => {
    (async function() {
      const cal = await getCalApi({ namespace: "discovery" });
      cal("ui", {
        hideEventTypeDetails: true,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <section
      id="conversion-block"
      className="relative w-full py-10 md:py-16 bg-[#000000] border-t overflow-hidden"
      style={{ borderColor: `${data.themeColor}30` }}
    >
      {/* Background ambient light */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{ background: `radial-gradient(circle at 50% 0%, ${data.themeColor} 0%, transparent 70%)` }}
      />

      <div className="max-w-[1200px] mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">

        {/* Left: Copy */}
        <div className="flex flex-col justify-center h-full">
          <SectionBadge title="GET STARTED" themeColor={data.themeColor} className="mb-6 self-start" />

          <h2 className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-medium tracking-tighter text-white mb-6 leading-[1.05]">
            {data.conversion.headline}
          </h2>

          <p className="text-[#a1a1aa] text-base md:text-lg leading-relaxed mb-8 max-w-lg">
            Book a complimentary strategy session. We&apos;ll audit your current architecture, identify critical bottlenecks, and outline exactly how to build a scalable, automated ecosystem.
          </p>

          <div className="flex items-center gap-6">
            {/* eslint-disable @next/next/no-img-element */}
            <div className="flex -space-x-3">
              <div className="w-10 h-10 rounded-full border-2 border-[#02040A] bg-zinc-800 overflow-hidden">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aurexis1" alt="Avatar 1" className="w-full h-full object-cover" />
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-[#02040A] bg-zinc-800 overflow-hidden">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aurexis2" alt="Avatar 2" className="w-full h-full object-cover" />
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-[#02040A] bg-zinc-800 overflow-hidden">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aurexis3" alt="Avatar 3" className="w-full h-full object-cover" />
              </div>
            </div>
            {/* eslint-enable @next/next/no-img-element */}
            <div className="text-sm text-[#9ca3af]">
              Join <strong className="text-white font-medium">50+</strong> technical founders.
            </div>
          </div>
        </div>

        {/* Right: Cal.com Embed */}
        <div className="relative w-full h-[500px] md:h-[550px] lg:h-[600px] rounded-3xl overflow-hidden border border-white/10 bg-[#050714] shadow-2xl">
          <Cal
            namespace="discovery"
            calLink="aurexis-solution/45min"
            style={{ width: "100%", height: "100%", overflow: "scroll" }}
            config={{ layout: "month_view", hideEventTypeDetails: "true" }}
          />
        </div>

      </div>
    </section>
  );
}
