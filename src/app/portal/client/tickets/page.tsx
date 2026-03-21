"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { NeonButton } from "@/components/ui/NeonButton";
import {
  Ticket,
  Plus,
  Send,
  X,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Circle,
} from "lucide-react";
import type { LucideProps } from "lucide-react";
import type { TicketUrgency, TicketStatus } from "@/types/portal";
import { supabase } from "@/lib/supabase/client";
import { useProfile } from "@/lib/supabase/hooks";

type IconComp = React.ComponentType<LucideProps>;

interface TicketItem {
  id: string;
  subject: string;
  description: string;
  urgency: TicketUrgency;
  status: TicketStatus;
  category: string;
  created_at: string;
  admin_reply: string | null;
}

const urgencyColors: Record<TicketUrgency, string> = {
  low: "#64748B",
  medium: "#F59E0B",
  high: "#F97316",
  critical: "#EF4444",
};

const statusIcons: Record<TicketStatus, IconComp> = {
  open: Circle,
  in_progress: Clock,
  resolved: CheckCircle2,
  closed: CheckCircle2,
};

const inputClass =
  "w-full bg-[#02040A] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#00F0FF] transition-colors placeholder:text-[#64748B]";

export default function TicketsPage() {
  const { profile } = useProfile();
  const [tickets, setTickets] = useState<TicketItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    subject: "",
    description: "",
    urgency: "medium" as TicketUrgency,
    category: "Bug",
  });

  const [expandedId, setExpandedId] = useState<string | null>(null);

  const loadTickets = useCallback(async () => {
    if (!profile) return;
    const { data } = await supabase
      .from("tickets")
      .select("id, subject, description, urgency, status, category, created_at, admin_reply")
      .eq("client_id", profile.id)
      .order("created_at", { ascending: false });
    if (data) setTickets(data as TicketItem[]);
  }, [profile]);

  useEffect(() => {
    loadTickets();
  }, [loadTickets]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!profile) return;
    setSubmitting(true);

    // Persist to Supabase
    await supabase.from("tickets").insert({
      client_id: profile.id,
      subject: form.subject,
      description: form.description,
      urgency: form.urgency,
      category: form.category,
    });

    // Fire Telegram webhook
    try {
      await fetch("/api/tickets/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_name: profile.company_name || profile.contact_name || profile.email || "Unknown Client",
          subject: form.subject,
          urgency: form.urgency,
          category: form.category,
          description: form.description,
        }),
      });
    } catch {
      // Telegram notification is best-effort
    }

    setSubmitting(false);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowForm(false);
      setForm({ subject: "", description: "", urgency: "medium", category: "Bug" });
      loadTickets();
    }, 2000);
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Priority Help Desk</h1>
          <p className="text-sm text-[#94A3B8]">Raise tickets for bugs, updates, or feature requests.</p>
        </div>
        <NeonButton onClick={() => setShowForm(true)} className="!px-5 !py-2.5 !text-sm">
          <Plus className="w-4 h-4 mr-2" /> Raise Ticket
        </NeonButton>
      </motion.div>

      {/* New Ticket Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
            onClick={() => setShowForm(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg"
            >
              <GlassCard className="!border-[#00F0FF]/20">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <Ticket className="w-5 h-5 text-[#00F0FF]" /> Raise a Ticket
                  </h2>
                  <button onClick={() => setShowForm(false)} className="text-[#94A3B8] hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {submitted ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8">
                    <CheckCircle2 className="w-12 h-12 text-[#10B981] mx-auto mb-3" />
                    <p className="text-white font-semibold">Ticket Submitted!</p>
                    <p className="text-sm text-[#94A3B8] mt-1">Our team has been notified via Telegram.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-[#94A3B8] mb-2">Subject</label>
                      <input
                        required
                        className={inputClass}
                        placeholder="Brief description of the issue"
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#94A3B8] mb-2">Category</label>
                        <select
                          className={inputClass}
                          value={form.category}
                          onChange={(e) => setForm({ ...form, category: e.target.value })}
                        >
                          <option value="Bug">Bug</option>
                          <option value="Feature Request">Feature Request</option>
                          <option value="Update">Update</option>
                          <option value="General">General</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#94A3B8] mb-2">Urgency</label>
                        <select
                          className={inputClass}
                          value={form.urgency}
                          onChange={(e) => setForm({ ...form, urgency: e.target.value as TicketUrgency })}
                        >
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                          <option value="critical">Critical</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#94A3B8] mb-2">Description</label>
                      <textarea
                        required
                        rows={4}
                        className={inputClass + " resize-none"}
                        placeholder="Provide detailed information about the issue..."
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                      />
                    </div>

                    <NeonButton className="w-full !py-3 !text-sm" disabled={submitting}>
                      <Send className="w-4 h-4 mr-2" />
                      {submitting ? "Submitting..." : "Submit Ticket"}
                    </NeonButton>
                  </form>
                )}
              </GlassCard>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ticket list */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <div className="space-y-3">
          {tickets.map((ticket, i) => {
            const StatusIcon = statusIcons[ticket.status];
            const isExpanded = expandedId === ticket.id;
            return (
              <motion.div
                key={ticket.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <GlassCard className="!p-0 overflow-hidden">
                  <div className="p-4 flex items-center gap-4 cursor-pointer hover:bg-white/[0.02] transition-colors" onClick={() => setExpandedId(isExpanded ? null : ticket.id)}>
                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                      <AlertTriangle className="w-4 h-4" style={{ color: urgencyColors[ticket.urgency] }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="text-[10px] px-2 py-0.5 rounded-full font-medium uppercase tracking-wider"
                          style={{
                            color: urgencyColors[ticket.urgency],
                            backgroundColor: `${urgencyColors[ticket.urgency]}15`,
                          }}
                        >
                          {ticket.urgency}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-[#94A3B8]">
                          {ticket.category}
                        </span>
                        {ticket.admin_reply && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#00F0FF]/10 text-[#00F0FF]">Reply available</span>
                        )}
                      </div>
                      <p className="text-sm text-white truncate">{ticket.subject}</p>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#94A3B8] shrink-0">
                      <StatusIcon className="w-3.5 h-3.5" />
                      <span className="capitalize">{ticket.status.replace("_", " ")}</span>
                    </div>
                  </div>
                  {isExpanded && (
                    <div className="border-t border-white/5 p-4 space-y-3">
                      <div>
                        <p className="text-xs text-[#64748B] uppercase tracking-wider mb-1">Your message</p>
                        <p className="text-sm text-[#94A3B8]">{ticket.description}</p>
                      </div>
                      {ticket.admin_reply && (
                        <div className="p-3 rounded-lg bg-[#00F0FF]/5 border border-[#00F0FF]/10">
                          <p className="text-xs text-[#00F0FF] uppercase tracking-wider mb-1">Admin Reply</p>
                          <p className="text-sm text-white">{ticket.admin_reply}</p>
                        </div>
                      )}
                    </div>
                  )}
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
