"use client";

import { use, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { NeonButton } from "@/components/ui/NeonButton";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { PortfolioItem } from "@/types/portal";

export default function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [project, setProject] = useState<PortfolioItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProject() {
      try {
        const res = await fetch(`/api/portfolio?slug=${encodeURIComponent(slug)}`);
        const json = await res.json();
        setProject(json.data as PortfolioItem);
      } catch {}
      setLoading(false);
    }
    loadProject();
  }, [slug]);

  return (
    <div className="flex flex-col min-h-screen bg-[#02040A] text-[#F8FAFC]">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-24">
        <article className="container mx-auto px-6 max-w-5xl">
          
          <Link href="/portfolio" className="inline-flex items-center text-[#94A3B8] hover:text-[#00F0FF] transition-colors mb-12">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Case Files
          </Link>

          {loading ? (
            <div className="py-20 text-center text-white/40">Loading...</div>
          ) : !project ? (
            <div className="py-20 text-center text-white/40">Project not found.</div>
          ) : (
            <>
              <header className="mb-16">
                <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 text-glow">
                  {project.title}
                </h1>
                <p className="text-2xl text-[#00F0FF] font-medium mb-12">
                  {project.description}
                </p>
                
                {project.images?.[0] ? (
                  <div className="w-full aspect-video rounded-2xl bg-[#09090B] border border-white/10 mb-16 overflow-hidden relative">
                    <img src={project.images[0]} alt={project.title} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-full aspect-video rounded-2xl bg-[#09090B] border border-white/10 mb-16 overflow-hidden relative">
                     <div className="absolute inset-0 bg-gradient-to-tr from-[#00F0FF]/10 to-[#0047FF]/10"></div>
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-8 border-y border-white/10">
                   <div>
                     <h4 className="text-[#94A3B8] text-sm uppercase font-bold tracking-widest mb-2">Client</h4>
                     <p className="text-white">{project.client_name || "Confidential"}</p>
                   </div>
                   <div>
                     <h4 className="text-[#94A3B8] text-sm uppercase font-bold tracking-widest mb-2">Category</h4>
                     <p className="text-white">{project.tech_tags?.[0] || "Development"}</p>
                   </div>
                   <div className="md:col-span-2">
                     <h4 className="text-[#94A3B8] text-sm uppercase font-bold tracking-widest mb-2">Tech Stack</h4>
                     <div className="flex flex-wrap gap-2">
                       {project.tech_tags.map(t => (
                          <span key={t} className="px-3 py-1 bg-white/5 border border-white/10 rounded text-sm text-white">{t}</span>
                       ))}
                     </div>
                   </div>
                </div>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-24">
                <div className="md:col-span-2 space-y-12">
                   <section>
                     <h2 className="text-3xl font-bold text-white mb-6">Case Study</h2>
                     <div className="prose prose-invert prose-lg max-w-none text-[#94A3B8] leading-relaxed text-lg whitespace-pre-wrap">
                       {project.case_study}
                     </div>
                   </section>
                </div>
                
                <div className="bg-[#09090B] p-8 rounded-2xl border border-[#00F0FF]/20 h-fit">
                   <h3 className="text-xl font-bold text-white mb-6 text-center border-b border-white/10 pb-6 text-glow">
                     Action
                   </h3>
                   <div className="text-center">
                     <p className="text-white/80 font-medium mb-8">Ready to see similar results?</p>
                     <NeonButton href="/contact" className="w-full">Book a Session</NeonButton>
                     {project.live_url && (
                       <a href={project.live_url} target="_blank" rel="noreferrer" className="block mt-4 text-sm text-[#00F0FF] hover:text-white transition-colors">
                         View Live Project →
                       </a>
                     )}
                   </div>
                </div>
              </div>
            </>
          )}
          
        </article>
      </main>

      <Footer />
    </div>
  );
}
