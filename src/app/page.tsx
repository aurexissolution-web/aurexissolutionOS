import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { TechStackMarquee } from "@/components/sections/TechStackMarquee";
import { TheShift } from "@/components/sections/TheShift";
import { TheEcosystem } from "@/components/sections/TheEcosystem";
import { WhatWeBuild } from "@/components/sections/WhatWeBuild";
import { PortfolioTeaser } from "@/components/sections/PortfolioTeaser";
import { HowAurexisWorks } from "@/components/sections/HowAurexisWorks";
import { Calculator } from "@/components/sections/Calculator";
import { StatsSection } from "@/components/sections/StatsSection";
import { ReviewsSection } from "@/components/sections/reviews/ReviewsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { FinalCTA } from "@/components/sections/FinalCTA";

// Re-render on every request so newly-approved reviews show up immediately.
export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <TechStackMarquee />
        <TheShift />
        <TheEcosystem />
        <WhatWeBuild />
        <PortfolioTeaser />
        <HowAurexisWorks />
        <Calculator />
        <StatsSection />
        <ReviewsSection />
        <FAQSection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
