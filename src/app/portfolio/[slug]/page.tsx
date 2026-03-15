"use client";

import { use } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { NeonButton } from "@/components/ui/NeonButton";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);

  return (
    <div className="flex flex-col min-h-screen bg-[#02040A] text-[#F8FAFC]">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-24">
        <article className="container mx-auto px-6 max-w-5xl">
          
          <Link href="/portfolio" className="inline-flex items-center text-[#94A3B8] hover:text-[#00F0FF] transition-colors mb-12">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Case Files
          </Link>

          <header className="mb-16">
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 text-glow">
              Project Nexus
            </h1>
            <p className="text-2xl text-[#00F0FF] font-medium mb-12">
              Automated 50 hours of manual data entry per week.
            </p>
            
            <div className="w-full aspect-video rounded-2xl bg-[#09090B] border border-white/10 mb-16 overflow-hidden relative">
               <div className="absolute inset-0 bg-gradient-to-tr from-[#00F0FF]/10 to-[#0047FF]/10"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-8 border-y border-white/10">
               <div>
                 <h4 className="text-[#94A3B8] text-sm uppercase font-bold tracking-widest mb-2">Client</h4>
                 <p className="text-white">Confidential AI Startup</p>
               </div>
               <div>
                 <h4 className="text-[#94A3B8] text-sm uppercase font-bold tracking-widest mb-2">Category</h4>
                 <p className="text-white">AI Automation</p>
               </div>
               <div className="md:col-span-2">
                 <h4 className="text-[#94A3B8] text-sm uppercase font-bold tracking-widest mb-2">Tech Stack</h4>
                 <div className="flex flex-wrap gap-2">
                   {["OpenAI", "Supabase", "Next.js", "Python"].map(t => (
                      <span key={t} className="px-3 py-1 bg-white/5 border border-white/10 rounded text-sm text-white">{t}</span>
                   ))}
                 </div>
               </div>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-24">
            <div className="md:col-span-2 space-y-12">
               <section>
                 <h2 className="text-3xl font-bold text-white mb-6">The Challenge</h2>
                 <p className="text-[#94A3B8] leading-relaxed text-lg text-white/80">
                   The client's operations team was spending roughly 50 hours a week manually extracting data from unstructured PDFs and entering it into their legacy ERP system. This administrative friction was crippling their capacity to take on new accounts and scale. They needed a bridge between their disordered inputs and their highly structured database.
                 </p>
               </section>
               
               <section>
                 <h2 className="text-3xl font-bold text-white mb-6">The Architected Solution</h2>
                 <p className="text-[#94A3B8] leading-relaxed text-lg text-white/80">
                   We built an autonomous agent layer using LangChain and OpenAI's structured outputs. Not only did we automate the extraction process, but we developed a secure verification UI in Next.js, backed by Supabase. If the agent's confidence score dipped below 95%, the document was flagged for human review. Otherwise, it was processed end-to-end flawlessly.
                 </p>
               </section>
            </div>
            
            <div className="bg-[#09090B] p-8 rounded-2xl border border-[#00F0FF]/20 h-fit">
               <h3 className="text-xl font-bold text-white mb-6 text-center border-b border-white/10 pb-6 text-glow">
                 The Result
               </h3>
               <div className="text-center">
                 <div className="text-5xl font-extrabold text-[#00F0FF] mb-2">+200%</div>
                 <p className="text-white font-medium mb-8">Capacity for New Accounts</p>
                 
                 <div className="text-4xl font-extrabold text-[#00F0FF] mb-2">0</div>
                 <p className="text-white font-medium">Data Entry Errors Post-Launch</p>
               </div>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-16 text-center">
             <h2 className="text-3xl font-bold text-white mb-8">Inspired by this result?</h2>
             <NeonButton href="/contact">Let's build yours.</NeonButton>
          </div>
          
        </article>
      </main>

      <Footer />
    </div>
  );
}
