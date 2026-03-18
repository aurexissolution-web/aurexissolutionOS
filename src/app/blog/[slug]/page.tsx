"use client";

import { use, useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { BlogPost } from "@/types/portal";

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function loadPost() {
      try {
        const res = await fetch(`/api/blog?slug=${encodeURIComponent(slug)}`);
        const json = await res.json();
        setPost(json.data as BlogPost);
      } catch {}
      setLoading(false);
    }
    loadPost();
  }, [slug]);

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

          {loading ? (
            <div className="py-20 text-center text-white/40">Loading...</div>
          ) : !post ? (
            <div className="py-20 text-center text-white/40">Post not found.</div>
          ) : (
            <>
              <header className="mb-16">
                <div className="flex items-center gap-4 mb-6 text-sm">
                  <span className="text-[#00F0FF] font-bold uppercase tracking-widest">{post.tags?.[0] || "Update"}</span>
                  <span className="text-[#94A3B8]">{new Date(post.created_at).toLocaleDateString()}</span>
                </div>
                
                <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-8 leading-tight">
                  {post.title}
                </h1>
                
                {post.cover_image ? (
                  <div className="w-full aspect-video rounded-2xl bg-[#09090B] border border-white/10 mb-12 overflow-hidden relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-full aspect-video rounded-2xl bg-[#09090B] border border-white/10 mb-12 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#00F0FF]/20 to-transparent mix-blend-overlay"></div>
                  </div>
                )}
              </header>

              <div className="prose prose-invert prose-lg max-w-none text-[#94A3B8] whitespace-pre-wrap">
                {post.content}
              </div>
            </>
          )}
          
          <div className="mt-24 p-8 glass rounded-2xl text-center border-[#00F0FF]/20 bg-[#00F0FF]/5">
            <h3 className="text-xl font-bold text-white mb-4">Want to implement this in your own stack?</h3>
            <p className="mb-6 text-sm text-[#94A3B8]">Let our architecture team audit your current database.</p>
            <Link href="/contact" className="inline-flex items-center justify-center font-bold tracking-wide transition-all duration-300 rounded-lg bg-[#00F0FF] text-[#02040A] px-6 py-3 hover:shadow-[0_0_15px_rgba(0,240,255,0.4)]">
              Book an Audit
            </Link>
          </div>
          
        </article>
      </main>

      <Footer />
    </div>
  );
}
