"use client";

import { use, useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#02040A] text-[#F8FAFC]">
      {/* Read Time Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-[#00F0FF] z-[60] origin-left"
        style={{ scaleX }}
      />
      
      <Navbar />
      
      <main className="flex-1 pt-32 pb-24">
        <article className="container mx-auto px-6 max-w-3xl">
          
          <Link href="/blog" className="inline-flex items-center text-[#94A3B8] hover:text-[#00F0FF] transition-colors mb-12">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Journal
          </Link>

          <header className="mb-16">
            <div className="flex items-center gap-4 mb-6 text-sm">
              <span className="text-[#00F0FF] font-bold uppercase tracking-widest">AI Insights</span>
              <span className="text-[#94A3B8] flex items-center gap-1"><Clock className="w-4 h-4"/> 8 min read</span>
              <span className="text-[#94A3B8]">Aug 15, 2024</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-8 leading-tight">
              How RAG Architecture is Replacing Traditional SaaS Dashboards
            </h1>
            
            <div className="w-full aspect-video rounded-2xl bg-[#09090B] border border-white/10 mb-12 overflow-hidden relative">
               <div className="absolute inset-0 bg-gradient-to-tr from-[#00F0FF]/20 to-transparent mix-blend-overlay"></div>
            </div>
          </header>

          <div className="prose prose-invert prose-lg max-w-none text-[#94A3B8]">
            <p className="text-xl leading-relaxed text-white">
              A deep dive into Retrieval-Augmented Generation and why your next software build shouldn't rely on 2010s database structures. Legacy SaaS depends on users clicking through 4 layers of navigation to find one metric.
            </p>
            <h2 className="text-2xl font-bold text-white mt-12 mb-6">The Death of the Nav Bar</h2>
            <p>
              When a user logs in, they want an answer, not a treasure map. By utilizing RAG directly against your primary Postgres instance, the UI shifts from "Dashboard" to "Command Center".
            </p>
            <p>
              We've seen clients reduce their onboarding time by 80% simply by letting new employees "talk" to the database instead of reading a 40-page software manual.
            </p>

            <blockquote className="border-l-4 border-[#00F0FF] pl-6 my-12 text-white font-medium italic">
              "The future of B2B software isn't more buttons. It's fewer buttons, backed by highly specific context windows."
            </blockquote>

            <h2 className="text-2xl font-bold text-white mt-12 mb-6">Architecting the Shift</h2>
            <p>
              Moving to an AI-first architecture requires a fundamental shift in how you think about your data. It's no longer just rows and columns; it's embeddings and vectors.
            </p>

            <div className="mt-24 p-8 glass rounded-2xl text-center border-[#00F0FF]/20 bg-[#00F0FF]/5">
              <h3 className="text-xl font-bold text-white mb-4">Want to implement this in your own stack?</h3>
              <p className="mb-6 text-sm">Let our architecture team audit your current database.</p>
              <Link href="/contact" className="inline-flex items-center justify-center font-bold tracking-wide transition-all duration-300 rounded-lg bg-[#00F0FF] text-[#02040A] px-6 py-3 hover:shadow-[0_0_15px_rgba(0,240,255,0.4)]">
                Book an Audit
              </Link>
            </div>
          </div>
          
        </article>
      </main>

      <Footer />
    </div>
  );
}
