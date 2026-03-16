"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import { ArrowUpRight, Clock, ArrowRight } from "lucide-react";
import type { BlogPost } from "@/types/portal";

const CATEGORIES = ["All", "AI Insights", "Dev Logs", "The KL Pivot"] as const;

const CATEGORY_COLORS: Record<string, string> = {
  "AI Insights": "#00F0FF",
  "Dev Logs": "#7C3AED",
  "The KL Pivot": "#059669",
  Internal: "#64748B",
};

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [email, setEmail] = useState("");
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      try {
        const res = await fetch("/api/blog");
        const json = await res.json();
        if (json.data) {
          setPosts(json.data as BlogPost[]);
        }
      } catch {}
      setLoading(false);
    }
    loadPosts();
  }, []);

  const filteredPosts =
    activeCategory === "All"
      ? posts
      : posts.filter((p) => p.tags?.includes(activeCategory));

  const FEATURED_POST = posts.length > 0 ? posts[0] : null;

  return (
    <div className="flex flex-col min-h-screen bg-[#02040A] text-[#F8FAFC]">
      <Navbar />

      <main className="flex-1 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[700px] h-[500px] bg-[#00F0FF]/6 blur-[160px] rounded-full" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[400px] bg-[#7C3AED]/6 blur-[140px] rounded-full" />
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />
        </div>

        <div className="relative z-10 container mx-auto px-6 max-w-7xl pt-36 pb-28">

          {/* ── HEADER ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-20"
          >
            <p className="text-xs text-[#64748B] uppercase tracking-[0.2em] mb-5 font-medium">
              Engineering Journal
            </p>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
              <h1 className="text-6xl md:text-7xl xl:text-8xl font-black tracking-tighter leading-[0.9] text-white">
                The{" "}
                <span
                  className="text-transparent"
                  style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.25)" }}
                >
                  Intel.
                </span>
              </h1>
              <p className="text-[#64748B] max-w-xs leading-relaxed">
                AI breakdowns, engineering logs, and dispatches from our move to{" "}
                <span className="text-white/50">Southeast Asia</span>.
              </p>
            </div>
          </motion.div>

          {/* ── FEATURED POST ── */}
          {FEATURED_POST && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mb-16"
            >
              <Link href={`/blog/${FEATURED_POST.id}`}>
                <div className="group relative rounded-3xl overflow-hidden border border-white/[0.07] bg-white/[0.01] hover:border-white/[0.14] transition-all duration-500 cursor-pointer">
                  {/* Top accent line */}
                  <div
                    className="absolute top-0 left-0 right-0 h-px"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${CATEGORY_COLORS[FEATURED_POST.tags?.[0] || "Internal"]}80, transparent)`,
                    }}
                  />

                  {/* Background glow */}
                  <div
                    className="absolute top-0 right-0 w-[400px] h-[300px] blur-[100px] opacity-10 transition-opacity duration-500 group-hover:opacity-20 pointer-events-none"
                    style={{ backgroundColor: CATEGORY_COLORS[FEATURED_POST.tags?.[0] || "Internal"] }}
                  />

                  <div className="relative z-10 grid lg:grid-cols-[1fr_2fr] gap-0">
                    {/* Left – metadata column */}
                    <div className="flex flex-col justify-between p-10 lg:border-r border-white/[0.05]">
                      <div>
                        <span
                          className="text-xs font-bold uppercase tracking-widest mb-6 block"
                          style={{ color: CATEGORY_COLORS[FEATURED_POST.tags?.[0] || "Internal"] }}
                        >
                          ★ Featured · {FEATURED_POST.tags?.[0] || "Update"}
                        </span>
                        <div className="text-[80px] md:text-[100px] font-black text-white/[0.04] leading-none tracking-tighter select-none">
                          01
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-[#64748B]">
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          5 min read
                        </span>
                        <span>·</span>
                        <span>{new Date(FEATURED_POST.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>

                    {/* Right – content column */}
                    <div className="flex flex-col justify-center p-10">
                      <h2 className="text-3xl md:text-4xl font-bold text-white mb-5 leading-tight group-hover:text-white transition-colors">
                        {FEATURED_POST.title}
                      </h2>
                      <p className="text-[#64748B] leading-relaxed mb-8 max-w-xl">
                        {FEATURED_POST.excerpt}
                      </p>
                      <div className="flex items-center gap-2 text-sm font-medium text-white group-hover:gap-3 transition-all">
                        Read Article
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* ── MAIN GRID ── */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 xl:gap-20">

            {/* LEFT — Article list */}
            <div>
              {/* Category filter */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex flex-wrap items-center gap-2 mb-10 pb-6 border-b border-white/[0.06]"
              >
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-1.5 text-xs rounded-full transition-all duration-300 font-medium ${
                      activeCategory === cat
                        ? "bg-white text-[#02040A]"
                        : "text-[#64748B] hover:text-white hover:bg-white/[0.05] border border-white/[0.08]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </motion.div>

              {/* Posts */}
              <div className="space-y-0">
                {loading ? (
                  <div className="py-12 text-center text-white/40 text-sm">Loading articles...</div>
                ) : filteredPosts.length === 0 ? (
                  <div className="py-12 text-center text-white/40 text-sm">No articles found in this category.</div>
                ) : (
                  filteredPosts.map((post, i) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.06 }}
                    >
                      <Link href={`/blog/${post.slug}`}>
                        <div className="group flex items-start gap-6 py-7 border-b border-white/[0.05] hover:bg-white/[0.015] rounded-xl px-3 transition-all duration-300 cursor-pointer">
                          {/* Large faded number */}
                          <span className="text-2xl font-black text-white/[0.06] font-mono tabular-nums shrink-0 mt-0.5">
                            {String(i + 1).padStart(2, "0")}
                          </span>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2.5">
                              <span
                                className="text-xs font-bold uppercase tracking-widest"
                                style={{ color: CATEGORY_COLORS[post.tags?.[0] || "Internal"] ?? "#64748B" }}
                              >
                                {post.tags?.[0] || "Update"}
                              </span>
                              <span className="text-[#334155] text-xs">·</span>
                              <span className="text-[#64748B] text-xs flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                5 min read
                              </span>
                            </div>
                            <h3 className="text-lg font-semibold text-white/90 group-hover:text-white leading-snug transition-colors">
                              {post.title}
                            </h3>
                          </div>

                          <ArrowUpRight className="w-4 h-4 text-[#334155] group-hover:text-white opacity-0 group-hover:opacity-100 shrink-0 mt-1 transition-all duration-300" />
                        </div>
                      </Link>
                    </motion.div>
                  ))
                )}
              </div>
            </div>

            {/* RIGHT — Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="space-y-8"
            >
              {/* Newsletter */}
              <div className="relative p-8 rounded-3xl border border-white/[0.07] bg-white/[0.01] overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00F0FF]/40 to-transparent" />
                <div className="absolute -top-20 right-0 w-40 h-40 bg-[#00F0FF]/10 blur-[60px] rounded-full pointer-events-none" />

                <div className="relative z-10">
                  <p className="text-xs text-[#64748B] uppercase tracking-widest font-medium mb-2">
                    Knowledge Loop
                  </p>
                  <h3 className="text-xl font-bold text-white mb-3">
                    Get the Automation Blueprint.
                  </h3>
                  <p className="text-[#64748B] text-sm leading-relaxed mb-6">
                    Architectural insights direct to your inbox. No spam, no pitches.
                  </p>
                  <div className="space-y-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl py-3 px-4 text-white text-sm placeholder-[#334155] focus:outline-none focus:border-[#00F0FF]/50 transition-colors"
                    />
                    <button className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white text-[#02040A] text-sm font-semibold hover:bg-white/90 transition-colors">
                      Subscribe
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Most Read */}
              <div className="p-8 rounded-3xl border border-white/[0.07] bg-white/[0.01]">
                <p className="text-xs text-[#64748B] uppercase tracking-widest font-medium mb-6 pb-4 border-b border-white/[0.06]">
                  Most Read
                </p>
                <div className="space-y-6">
                  {posts.slice(0, 3).map((post, i) => (
                    <Link key={post.id} href={`/blog/${post.slug}`}>
                      <div className="group flex gap-4 cursor-pointer py-1">
                        <span className="text-3xl font-black text-white/[0.05] group-hover:text-white/10 transition-colors tabular-nums leading-none mt-1">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <h4 className="text-sm font-medium text-white/70 group-hover:text-white leading-snug transition-colors">
                            {post.title}
                          </h4>
                          <span className="text-xs text-[#64748B] mt-1 block">
                            5 min read
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* CTA block */}
              <div className="relative p-8 rounded-3xl border border-white/[0.07] bg-white/[0.01] overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#7C3AED]/40 to-transparent" />
                <p className="text-xs text-[#64748B] uppercase tracking-widest font-medium mb-3">
                  Work with us
                </p>
                <h3 className="text-lg font-bold text-white mb-3 leading-snug">
                  Ready to automate your stack?
                </h3>
                <Link href="/contact">
                  <div className="flex items-center gap-2 text-sm font-medium text-white hover:gap-3 transition-all">
                    Book a session <ArrowUpRight className="w-4 h-4" />
                  </div>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
