"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { MessageSquare, Star, Building2, TrendingUp } from "lucide-react";
import { supabase } from "@/lib/supabase/client";

interface FeedbackItem {
  id: string;
  nps_score: number;
  comment: string;
  created_at: string;
  client_name: string;
  project_name: string | null;
  is_testimonial: boolean;
}

function getNpsLabel(score: number) {
  if (score <= 6) return { text: "Detractor", color: "#EF4444" };
  if (score <= 8) return { text: "Passive", color: "#F59E0B" };
  return { text: "Promoter", color: "#10B981" };
}

export default function AdminFeedbackPage() {
  const [feedback, setFeedback] = useState<FeedbackItem[]>([]);

  const loadFeedback = useCallback(async () => {
    const { data } = await supabase
      .from("feedback")
      .select("id, nps_score, comment, created_at, is_testimonial, client_profiles(company_name), projects(name)")
      .order("created_at", { ascending: false });

    if (data) {
      setFeedback(
        data.map((f: Record<string, unknown>) => ({
          id: f.id as string,
          nps_score: f.nps_score as number,
          comment: f.comment as string,
          created_at: f.created_at as string,
          is_testimonial: f.is_testimonial as boolean,
          client_name: (f.client_profiles as { company_name: string } | null)?.company_name ?? "Unknown",
          project_name: (f.projects as { name: string } | null)?.name ?? null,
        }))
      );
    }
  }, []);

  useEffect(() => {
    loadFeedback();
  }, [loadFeedback]);

  async function toggleTestimonial(id: string, current: boolean) {
    await supabase.from("feedback").update({ is_testimonial: !current }).eq("id", id);
    loadFeedback();
  }

  const avgNps = feedback.length > 0
    ? Math.round((feedback.reduce((s, f) => s + f.nps_score, 0) / feedback.length) * 10) / 10
    : 0;
  const promoters = feedback.filter((f) => f.nps_score >= 9).length;
  const detractors = feedback.filter((f) => f.nps_score <= 6).length;

  return (
    <div className="space-y-6 max-w-4xl">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-white mb-1">Client Feedback</h1>
        <p className="text-sm text-[#94A3B8]">View all client NPS scores and feedback. Mark items as testimonials.</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          <GlassCard className="!p-5 text-center">
            <TrendingUp className="w-5 h-5 text-[#00F0FF] mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{avgNps}</p>
            <p className="text-[10px] text-[#64748B] uppercase tracking-wider">Avg NPS</p>
          </GlassCard>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <GlassCard className="!p-5 text-center">
            <Star className="w-5 h-5 text-[#10B981] mx-auto mb-2" />
            <p className="text-2xl font-bold text-[#10B981]">{promoters}</p>
            <p className="text-[10px] text-[#64748B] uppercase tracking-wider">Promoters (9-10)</p>
          </GlassCard>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <GlassCard className="!p-5 text-center">
            <MessageSquare className="w-5 h-5 text-[#EF4444] mx-auto mb-2" />
            <p className="text-2xl font-bold text-[#EF4444]">{detractors}</p>
            <p className="text-[10px] text-[#64748B] uppercase tracking-wider">Detractors (0-6)</p>
          </GlassCard>
        </motion.div>
      </div>

      {feedback.length === 0 && (
        <div className="text-center py-12 text-[#64748B] text-sm">No feedback received yet.</div>
      )}

      {/* Feedback list */}
      <div className="space-y-3">
        {feedback.map((fb, i) => {
          const { color, text } = getNpsLabel(fb.nps_score);
          return (
            <motion.div key={fb.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.04 }}>
              <GlassCard className="!p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: `${color}15`, color }}>
                      NPS: {fb.nps_score}
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-medium uppercase tracking-wider" style={{ backgroundColor: `${color}15`, color }}>
                      {text}
                    </span>
                    {fb.is_testimonial && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#00F0FF]/10 text-[#00F0FF] font-medium uppercase tracking-wider">
                        Testimonial
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => toggleTestimonial(fb.id, fb.is_testimonial)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${fb.is_testimonial ? "bg-[#00F0FF]/15 text-[#00F0FF] border border-[#00F0FF]/30" : "bg-white/5 text-[#64748B] border border-white/10 hover:text-white"}`}
                  >
                    {fb.is_testimonial ? "Remove Testimonial" : "Mark as Testimonial"}
                  </button>
                </div>
                <p className="text-sm text-[#94A3B8] mb-3">{fb.comment}</p>
                <div className="flex items-center gap-3 text-xs text-[#64748B]">
                  <span className="flex items-center gap-1"><Building2 className="w-3 h-3" /> {fb.client_name}</span>
                  {fb.project_name && <span>• {fb.project_name}</span>}
                  <span>• {fb.created_at?.slice(0, 10)}</span>
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
