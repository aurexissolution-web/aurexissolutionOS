"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import {
  AlertTriangle,
  Clock,
  CheckCircle2,
  Circle,
  Building2,
  MessageSquare,
  Send,
} from "lucide-react";
import type { LucideProps } from "lucide-react";
import type { TicketUrgency, TicketStatus } from "@/types/portal";
import { supabase } from "@/lib/supabase/client";

type IconComp = React.ComponentType<LucideProps>;

interface TicketItem {
  id: string;
  subject: string;
  description: string;
  urgency: TicketUrgency;
  status: TicketStatus;
  category: string;
  created_at: string;
  client_name: string;
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

export default function AdminTicketsPage() {
  const [tickets, setTickets] = useState<TicketItem[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [filter, setFilter] = useState<"all" | TicketStatus>("all");

  const loadTickets = useCallback(async () => {
    const { data } = await supabase
      .from("tickets")
      .select("id, subject, description, urgency, status, category, created_at, admin_reply, client_profiles(company_name)")
      .order("created_at", { ascending: false });

    if (data) {
      setTickets(
        data.map((t: Record<string, unknown>) => ({
          id: t.id as string,
          subject: t.subject as string,
          description: t.description as string,
          urgency: t.urgency as TicketUrgency,
          status: t.status as TicketStatus,
          category: t.category as string,
          created_at: t.created_at as string,
          admin_reply: (t.admin_reply as string) || null,
          client_name: (t.client_profiles as { company_name: string } | null)?.company_name ?? "Unknown",
        }))
      );
    }
  }, []);

  useEffect(() => {
    loadTickets();
  }, [loadTickets]);

  async function updateStatus(ticketId: string, status: TicketStatus) {
    const updates: Record<string, unknown> = { status, updated_at: new Date().toISOString() };
    if (status === "resolved") updates.resolved_at = new Date().toISOString();
    await supabase.from("tickets").update(updates).eq("id", ticketId);
    loadTickets();
  }

  async function handleReply(ticketId: string) {
    if (!replyText.trim()) return;
    setSubmitting(true);
    await supabase.from("tickets").update({
      admin_reply: replyText.trim(),
      status: "in_progress",
      updated_at: new Date().toISOString(),
    }).eq("id", ticketId);
    setReplyText("");
    setSubmitting(false);
    setExpandedId(null);
    loadTickets();
  }

  const filtered = filter === "all" ? tickets : tickets.filter((t) => t.status === filter);

  return (
    <div className="space-y-6 max-w-4xl">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Support Tickets</h1>
          <p className="text-sm text-[#94A3B8]">View all client tickets, update status, and reply.</p>
        </div>
        <div className="flex gap-2">
          {(["all", "open", "in_progress", "resolved", "closed"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${filter === f ? "bg-[#00F0FF]/15 text-[#00F0FF] border border-[#00F0FF]/30" : "bg-white/5 text-[#94A3B8] border border-white/10 hover:bg-white/10"}`}
            >
              {f === "all" ? "All" : f.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
            </button>
          ))}
        </div>
      </motion.div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-[#64748B] text-sm">No tickets found.</div>
      )}

      <div className="space-y-3">
        {filtered.map((ticket, i) => {
          const StatusIcon = statusIcons[ticket.status];
          const isExpanded = expandedId === ticket.id;

          return (
            <motion.div key={ticket.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
              <GlassCard className="!p-0 overflow-hidden">
                <div
                  className="p-4 flex items-center gap-4 cursor-pointer hover:bg-white/[0.02] transition-colors"
                  onClick={() => setExpandedId(isExpanded ? null : ticket.id)}
                >
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                    <AlertTriangle className="w-4 h-4" style={{ color: urgencyColors[ticket.urgency] }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-medium uppercase tracking-wider" style={{ color: urgencyColors[ticket.urgency], backgroundColor: `${urgencyColors[ticket.urgency]}15` }}>
                        {ticket.urgency}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-[#94A3B8]">{ticket.category}</span>
                      <span className="text-xs text-[#64748B] flex items-center gap-1"><Building2 className="w-3 h-3" />{ticket.client_name}</span>
                    </div>
                    <p className="text-sm text-white truncate">{ticket.subject}</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs shrink-0">
                    <StatusIcon className="w-3.5 h-3.5" style={{ color: ticket.status === "resolved" || ticket.status === "closed" ? "#10B981" : "#F59E0B" }} />
                    <span className="capitalize text-[#94A3B8]">{ticket.status.replace("_", " ")}</span>
                  </div>
                </div>

                {isExpanded && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="border-t border-white/5 p-4 space-y-4">
                    <div>
                      <p className="text-xs text-[#64748B] uppercase tracking-wider mb-1">Description</p>
                      <p className="text-sm text-[#94A3B8]">{ticket.description}</p>
                    </div>

                    {ticket.admin_reply && (
                      <div className="p-3 rounded-lg bg-[#00F0FF]/5 border border-[#00F0FF]/10">
                        <p className="text-xs text-[#00F0FF] uppercase tracking-wider mb-1 flex items-center gap-1"><MessageSquare className="w-3 h-3" /> Admin Reply</p>
                        <p className="text-sm text-white">{ticket.admin_reply}</p>
                      </div>
                    )}

                    <div className="flex items-end gap-3">
                      <div className="flex-1">
                        <textarea
                          rows={2}
                          className={inputClass + " resize-none"}
                          placeholder="Write a reply..."
                          value={expandedId === ticket.id ? replyText : ""}
                          onChange={(e) => setReplyText(e.target.value)}
                        />
                      </div>
                      <button
                        onClick={() => handleReply(ticket.id)}
                        disabled={submitting || !replyText.trim()}
                        className="p-3 rounded-lg bg-[#00F0FF]/10 hover:bg-[#00F0FF]/20 text-[#00F0FF] transition-colors disabled:opacity-50"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex gap-2 pt-2 border-t border-white/5">
                      <p className="text-xs text-[#64748B] mr-2 self-center">Set status:</p>
                      {(["open", "in_progress", "resolved", "closed"] as TicketStatus[]).map((s) => (
                        <button
                          key={s}
                          onClick={() => updateStatus(ticket.id, s)}
                          className={`px-3 py-1 rounded text-[10px] font-medium uppercase tracking-wider transition-all ${ticket.status === s ? "bg-[#00F0FF]/15 text-[#00F0FF] border border-[#00F0FF]/30" : "bg-white/5 text-[#64748B] border border-white/10 hover:text-white"}`}
                        >
                          {s.replace("_", " ")}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </GlassCard>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
