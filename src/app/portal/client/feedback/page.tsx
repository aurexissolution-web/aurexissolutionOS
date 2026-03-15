"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { NeonButton } from "@/components/ui/NeonButton";
import { MessageSquare, Star, Send, CheckCircle2 } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { useProfile } from "@/lib/supabase/hooks";

const inputClass =
  "w-full bg-[#02040A] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#00F0FF] transition-colors placeholder:text-[#64748B]";

interface FeedbackRow {
  id: string;
  nps_score: number;
  comment: string;
  created_at: string;
  projects?: { name: string } | null;
}

export default function FeedbackPage() {
  const { profile } = useProfile();
  const [pastFeedback, setPastFeedback] = useState<FeedbackRow[]>([]);
  const [nps, setNps] = useState<number | null>(null);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const loadFeedback = useCallback(async () => {
    if (!profile) return;
    const { data } = await supabase
      .from("feedback")
      .select("id, nps_score, comment, created_at, projects(name)")
      .eq("client_id", profile.id)
      .order("created_at", { ascending: false });
    if (data) setPastFeedback(data as unknown as FeedbackRow[]);
  }, [profile]);

  useEffect(() => {
    loadFeedback();
  }, [loadFeedback]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!profile || nps === null) return;
    await supabase.from("feedback").insert({
      client_id: profile.id,
      nps_score: nps,
      comment,
    });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setNps(null);
      setComment("");
      loadFeedback();
    }, 3000);
  }

  function getNpsLabel(score: number) {
    if (score <= 6) return { text: "Detractor", color: "#EF4444" };
    if (score <= 8) return { text: "Passive", color: "#F59E0B" };
    return { text: "Promoter", color: "#10B981" };
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-white mb-1">Project Feedback</h1>
        <p className="text-sm text-[#94A3B8]">Share your experience and help us improve. High ratings may be featured as testimonials.</p>
      </motion.div>

      {/* NPS Form */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <GlassCard>
          {submitted ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8">
              <CheckCircle2 className="w-12 h-12 text-[#10B981] mx-auto mb-3" />
              <p className="text-white font-semibold">Thank you for your feedback!</p>
              <p className="text-sm text-[#94A3B8] mt-1">Your response has been recorded.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-[#94A3B8] mb-4">
                  <Star className="w-4 h-4 text-[#00F0FF]" />
                  How likely are you to recommend Aurexis to a colleague? (0–10)
                </label>
                <div className="flex gap-2 flex-wrap">
                  {Array.from({ length: 11 }, (_, i) => {
                    const { color } = getNpsLabel(i);
                    const isSelected = nps === i;
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setNps(i)}
                        className="w-11 h-11 rounded-lg text-sm font-bold transition-all duration-200 border"
                        style={{
                          backgroundColor: isSelected ? `${color}20` : "rgba(255,255,255,0.03)",
                          borderColor: isSelected ? color : "rgba(255,255,255,0.08)",
                          color: isSelected ? color : "#94A3B8",
                        }}
                      >
                        {i}
                      </button>
                    );
                  })}
                </div>
                {nps !== null && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs mt-2 font-medium"
                    style={{ color: getNpsLabel(nps).color }}
                  >
                    {getNpsLabel(nps).text} — {nps >= 9 ? "We're thrilled!" : nps >= 7 ? "Good to hear." : "We'll work harder."}
                  </motion.p>
                )}
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-[#94A3B8] mb-2">
                  <MessageSquare className="w-4 h-4 text-[#00F0FF]" /> Additional Comments
                </label>
                <textarea
                  rows={4}
                  className={inputClass + " resize-none"}
                  placeholder="Tell us about your experience..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>

              <NeonButton className="!px-6 !py-3 !text-sm" disabled={nps === null}>
                <Send className="w-4 h-4 mr-2" /> Submit Feedback
              </NeonButton>
            </form>
          )}
        </GlassCard>
      </motion.div>

      {/* Past feedback */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <h2 className="text-lg font-semibold text-white mb-4">Previous Feedback</h2>
        <div className="space-y-3">
          {pastFeedback.map((fb) => {
            const { color } = getNpsLabel(fb.nps_score);
            return (
              <GlassCard key={fb.id} className="!p-5">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-sm font-semibold text-white">{fb.projects?.name ?? "General"}</p>
                    <p className="text-xs text-[#64748B]">{fb.created_at?.slice(0, 10)}</p>
                  </div>
                  <div
                    className="px-3 py-1 rounded-full text-xs font-bold"
                    style={{ backgroundColor: `${color}15`, color }}
                  >
                    NPS: {fb.nps_score}
                  </div>
                </div>
                <p className="text-sm text-[#94A3B8]">{fb.comment}</p>
              </GlassCard>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
