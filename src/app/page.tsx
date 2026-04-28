import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { TechStackMarquee } from "@/components/sections/TechStackMarquee";
import { TheShift } from "@/components/sections/TheShift";
import { TheArchitecture } from "@/components/sections/TheArchitecture";
import { WhatWeBuild } from "@/components/sections/WhatWeBuild";
import { TheMath } from "@/components/sections/TheMath";
import { Calculator } from "@/components/sections/Calculator";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { StatsSection } from "@/components/sections/StatsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <TechStackMarquee />
        <TheShift />
        <TheArchitecture />
        <WhatWeBuild />
        <TheMath />
        <Calculator />
        <ProcessTimeline />
        <StatsSection />
        <TestimonialsSection />
        <FAQSection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
