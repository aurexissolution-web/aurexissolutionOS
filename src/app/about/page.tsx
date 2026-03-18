"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useSpring, useInView } from "framer-motion";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AboutHero } from "@/components/ui/hero-futuristic";
import { PremiumBadge } from "@/components/ui/PremiumBadge";
import { ComparisonSection } from "@/components/sections/ComparisonSection";
import { ValueAdd } from "@/components/sections/ValueAdd";
import { CulturalFit } from "@/components/sections/CulturalFit";
import { AboutCTA } from "@/components/sections/AboutCTA";
import { LocationSection } from "@/components/sections/LocationSection";
import { Shield, Rocket, Layers } from "lucide-react";

const focusThreads = [
  "01 The Mission",
  "02 The Vision",
  "03 The Goals",
];

const visionCards = [
  {
    id: "mission",
    eyebrow: "— W H Y  W E  E X I S T",
    title: "To architect autonomous growth.",
    description:
      "Our mission is to strip away operational noise. We exist to transform traditional businesses into high-speed, AI-driven ecosystems. We build the specialized infrastructure that allows companies to scale their revenue aggressively without infinitely scaling their headcount.",
    points: ["Eliminate friction", "Engineer autonomy"],
    accent: "from-[#00F0FF]/20 via-transparent to-[#0047FF]/5",
  },
  {
    id: "vision",
    eyebrow: "— W H E R E  W E  A R E  G O I N G",
    title: "A digital landscape without limits.",
    description:
      "We envision a future where manual workflows are entirely obsolete. Aurexis Solution aims to be the premier technical partner in Kuala Lumpur and beyond, setting the absolute gold standard for how enterprise AI, web architecture, and mobile platforms operate as a single, unified brain.",
    points: ["The new standard", "Unified ecosystems"],
    accent: "from-[#0047FF]/20 via-[#09090B] to-transparent",
  },
  {
    id: "goals",
    eyebrow: "— H O W  W E  M E A S U R E  I T",
    title: "Relentless, measurable dominance.",
    description:
      "Our primary goal is to deploy custom engineering that guarantees undeniable, measurable ROI for our partners. Internally, we are driven by aggressive expansion—scaling our own operations, refining our proprietary tech stacks, and pushing the boundaries of what specialized AI can achieve.",
    points: ["Measurable ROI", "Continuous expansion"],
    accent: "from-white/10 via-transparent to-[#00F0FF]/10",
  },
];

// Helper component for the active section tracker
const SectionTracker = ({ activeIndex, total }: { activeIndex: number; total: number }) => {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="relative h-12 w-[2px] bg-white/5 overflow-hidden">
          <motion.div
            initial={false}
            animate={{ 
              height: activeIndex === i ? "100%" : "0%",
              backgroundColor: activeIndex === i ? "#00F0FF" : "transparent"
            }}
            transition={{ duration: 0.5, ease: "circOut" }}
            className="absolute top-0 left-0 w-full bg-[#00F0FF]"
          />
        </div>
      ))}
    </div>
  );
};

type VisionCardData = (typeof visionCards)[number];

const VisionCard = ({
  card,
  index,
  setActiveIndex,
}: {
  card: VisionCardData;
  index: number;
  setActiveIndex: (i: number) => void;
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      setActiveIndex(index);
    }
  }, [isInView, index, setActiveIndex]);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="group relative rounded-[32px] border border-white/5 overflow-hidden bg-[#05060A] hover:border-[#00F0FF]/20 transition-colors duration-500 shadow-[0_25px_120px_rgba(0,0,0,0.55)] min-h-[400px] flex flex-col justify-center"
    >
      <div className={`absolute inset-0 bg-gradient-to-b ${card.accent} opacity-50 group-hover:opacity-70 transition-opacity duration-700`} />
      
      {/* Subtle glow effect on hover */}
      <div className="absolute -inset-px bg-gradient-to-r from-[#00F0FF]/0 via-[#00F0FF]/10 to-[#00F0FF]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none blur-xl" />

      <div className="relative p-10 md:p-14 z-10">
        <div className="text-xs uppercase tracking-[0.5em] text-[#00F0FF] mb-6 flex items-center gap-3 font-semibold">
          <span className="w-12 h-[1px] bg-gradient-to-r from-[#00F0FF] to-transparent" />
          {card.eyebrow}
        </div>
        <h4 className="text-4xl md:text-5xl text-white font-medium tracking-tight leading-[1.1] mb-8 group-hover:text-white transition-colors duration-300">
          {card.title}
        </h4>
        <p className="text-xl text-neutral-400 leading-relaxed mb-10 max-w-2xl font-light">
          {card.description}
        </p>
        <div className="flex flex-wrap gap-3">
          {card.points.map((point: string) => (
            <span
              key={point}
              className="px-5 py-2 rounded-full border border-white/5 bg-white/[0.03] text-sm text-white/60 font-medium hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300"
            >
              {point}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
};

export default function AboutPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#02040A] text-[#F8FAFC]">
      <Navbar />
      
      <main className="flex-1 pb-8">
        {/* Full-screen Futuristic Hero Segment */}
        <section className="relative w-full mb-16">
          <AboutHero />
        </section>

        {/* 2. Mission, Vision & Goals — Cinematic Scroll Cards */}
        <section ref={containerRef} className="container mx-auto px-6 max-w-7xl mb-32 pt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-6xl mb-16"
          >
            <div className="mb-12">
              <PremiumBadge text="The North Star" />
            </div>
            <h2 className="text-6xl md:text-9xl font-medium tracking-tighter text-white mb-10 leading-[0.85]">
              Mission, Vision <br/>
              <span className="text-neutral-800">And the Aurexis Standard.</span>
            </h2>
            <p className="text-2xl md:text-3xl text-neutral-500 max-w-4xl font-light leading-relaxed">
              We don't just build software. We architect intelligent systems that eliminate manual friction, 10x human output, and transform your business into an autonomous powerhouse.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-[0.7fr_1.3fr] gap-12 lg:gap-32 items-start relative">
            {/* Left Sticky Content */}
            <motion.div
              className="lg:sticky lg:top-40 space-y-12"
            >
              <div className="flex gap-10">
                <SectionTracker activeIndex={activeIndex} total={visionCards.length} />
                
                <div className="space-y-12">
                  <div className="space-y-6">
                    <p className="text-xs uppercase tracking-[0.4em] text-[#00F0FF] font-bold">The Aurexis Advantage</p>
                    <h3 className="text-4xl md:text-5xl text-white font-medium leading-[1.1] tracking-tight">
                      Intelligent <br/>
                      <span className="text-neutral-500">Infrastructure.</span>
                    </h3>
                  </div>

                  <div className="relative space-y-8">
                    {focusThreads.map((thread: string, index: number) => (
                      <motion.div 
                        key={thread} 
                        initial={false}
                        animate={{ 
                          opacity: activeIndex === index ? 1 : 0.3,
                          x: activeIndex === index ? 10 : 0
                        }}
                        className="flex items-center gap-6"
                      >
                        <div className={`w-10 h-10 rounded-full border flex items-center justify-center text-sm font-mono transition-colors duration-500 ${
                          activeIndex === index ? "bg-[#00F0FF]/10 border-[#00F0FF] text-[#00F0FF]" : "bg-white/5 border-white/10 text-white/40"
                        }`}>
                          0{index + 1}
                        </div>
                        <span className={`text-xl font-light tracking-wide transition-colors duration-500 ${
                          activeIndex === index ? "text-white" : "text-white/40"
                        }`}>
                          {thread}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                  
                  <motion.div 
                    style={{ scaleX: smoothProgress }}
                    className="h-[1px] w-full bg-gradient-to-r from-[#00F0FF] to-transparent origin-left opacity-20"
                  />
                </div>
              </div>
            </motion.div>

            {/* Right Scrolling Cards */}
            <div className="space-y-16 lg:space-y-24 pb-12">
              {visionCards.map((card, index) => (
                <VisionCard 
                  key={card.id} 
                  card={card} 
                  index={index} 
                  setActiveIndex={setActiveIndex} 
                />
              ))}
            </div>
          </div>
        </section>

        {/* 2.5 Comparison Section */}
        <ComparisonSection />

        {/* 3. What We Do (The Value Add) */}
        <ValueAdd />

        {/* 4. Meet the Founder */}
        <section className="bg-gradient-to-b from-[#02040A] via-[#09090B] to-[#02040A] py-16 relative overflow-hidden mb-16 border-y border-white/5">
          {/* Subtle background glow */}
          <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#0047FF]/5 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
          
          <div className="container mx-auto px-6 max-w-7xl relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              
              {/* Image Column */}
              <motion.div 
                className="lg:col-span-5 relative"
                initial={{ opacity: 0, scale: 0.95 }} 
                whileInView={{ opacity: 1, scale: 1 }} 
                viewport={{ once: true }}
              >
                <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 bg-[#02040A] shadow-[0_0_40px_rgba(0,240,255,0.05)]">
                  <Image 
                    src="/images/cto.jpg"
                    alt="Aurexis Solution CTO"
                    fill
                    className="object-cover object-center mix-blend-luminosity opacity-90 transition-opacity duration-500 hover:mix-blend-normal hover:opacity-100"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  {/* Subtle lighting overlay on bottom edge to blend with dark mode */}
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#02040A] to-transparent pointer-events-none" />
                </div>
                
                {/* Decorative UI elements around image */}
                <div className="absolute -bottom-6 -right-6 w-32 h-32 border-r border-b border-[#00F0FF]/30 rounded-br-3xl pointer-events-none" />
                <div className="absolute top-8 -left-4 w-1 h-16 bg-gradient-to-b from-[#00F0FF] to-transparent rounded-full" />
              </motion.div>
              
              {/* Text Column */}
              <motion.div 
                className="lg:col-span-7"
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }}
              >
                <h2 className="text-sm font-bold text-[#00F0FF] tracking-widest uppercase mb-4 flex items-center gap-2">
                  <span className="w-8 h-px bg-[#00F0FF]" /> Leadership
                </h2>
                <h3 className="text-4xl md:text-5xl font-bold text-white mb-8">
                  Built for the Future. <br/>
                  <span className="text-[#94A3B8]">Engineered for Scale.</span>
                </h3>
                
                <div className="space-y-6 text-[#94A3B8] text-lg leading-relaxed mb-10">
                  <p>
                    <strong className="text-white">The Story:</strong> I started Aurexis Solution with a singular vision: to bridge the gap between abstract AI concepts and tangible, automated business outcomes. Traditional agencies focus on isolated deliverables; we focus on unified ecosystems. We exist to architect the underlying digital infrastructure that allows forward-thinking innovators to scale their revenue aggressively without infinitely scaling their headcount.
                  </p>
                  <p>
                    <strong className="text-white">The Expertise:</strong> As Founder & CTO, I don't just manage projects; I architect them. True innovation requires deep, hands-on technical expertise. When you partner with Aurexis, you are working directly with leadership that understands the code, the modern tech stack, and the exact mechanical workflows required to bring your vision to life.
                  </p>
                </div>
                
                {/* 5. The Aurexis Standard */}
                <div className="pt-8 border-t border-white/10">
                  <h4 className="text-white font-bold mb-6 text-xl">The "Aurexis Standard"</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                        <Rocket className="w-4 h-4 text-[#00F0FF]" />
                      </div>
                      <div>
                        <h5 className="text-white font-semibold text-sm mb-1">Speed-to-Market</h5>
                        <p className="text-sm text-[#94A3B8]">We don't believe in "development hell."</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                        <Shield className="w-4 h-4 text-[#00F0FF]" />
                      </div>
                      <div>
                        <h5 className="text-white font-semibold text-sm mb-1">Privacy-First</h5>
                        <p className="text-sm text-[#94A3B8]">Rigorous NDAs and Service Agreements protect your IP.</p>
                      </div>
                    </div>
                    <div className="flex gap-4 sm:col-span-2">
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                        <Layers className="w-4 h-4 text-[#00F0FF]" />
                      </div>
                      <div>
                        <h5 className="text-white font-semibold text-sm mb-1">Scalability</h5>
                        <p className="text-sm text-[#94A3B8]">Built on modern stacks (like Next.js & Supabase) that grow with your business.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
              </motion.div>
            </div>
          </div>
        </section>

        {/* 6. Cultural Fit — Premium Accordion */}
        <CulturalFit />

        {/* 7. Location Globe */}
        <LocationSection />

        {/* 8. Full-Bleed CTA */}
        <AboutCTA />
      </main>

      <Footer />
    </div>
  );
}
