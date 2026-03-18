"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import {
  Users,
  Search,
  X,
  Building2,
  Mail,
  Phone,
  Ticket,
  MessageSquare,
  CreditCard,
  Map,
  ChevronRight,
  Trash2,
  AlertTriangle,
} from "lucide-react";
import type { ProjectPhase, TicketStatus } from "@/types/portal";
import { supabase } from "@/lib/supabase/client";

interface ClientSummary {
  id: string;
  company_name: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  services: string[];
  project_phase: ProjectPhase | null;
  open_tickets: number;
  total_invoiced: number;
  avg_nps: number;
  tickets: { id: string; subject: string; status: TicketStatus; urgency: string }[];
  feedback: { nps: number; comment: string; date: string }[];
}

function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
}

const phaseColors: Record<ProjectPhase, string> = {
  audit: "#64748B",
  blueprint: "#F59E0B",
  sprint: "#00F0FF",
  launch: "#10B981",
};

export default function ClientCRMPage() {
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [clients, setClients] = useState<ClientSummary[]>([]);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  async function load() {
    const { data: profiles } = await supabase
      .from("client_profiles")
      .select("id, user_id, company_name, contact_name, contact_email, contact_phone")
      .eq("role", "client")
      .order("created_at", { ascending: false });

    if (!profiles) return;

    const enriched: ClientSummary[] = await Promise.all(
      profiles.map(async (p) => {
        const [projectsRes, ticketsRes, invoicesRes, feedbackRes] = await Promise.all([
          supabase.from("projects").select("phase, services").eq("client_id", p.id).order("updated_at", { ascending: false }).limit(1),
          supabase.from("tickets").select("id, subject, status, urgency").eq("client_id", p.id).in("status", ["open", "in_progress"]),
          supabase.from("invoices").select("amount").eq("client_id", p.id),
          supabase.from("feedback").select("nps_score, comment, created_at").eq("client_id", p.id).order("created_at", { ascending: false }).limit(3),
        ]);

        const proj = projectsRes.data?.[0];
        const totalInvoiced = (invoicesRes.data ?? []).reduce((s, i) => s + Number(i.amount), 0);
        const fbData = feedbackRes.data ?? [];
        const avgNps = fbData.length > 0 ? fbData.reduce((s, f) => s + f.nps_score, 0) / fbData.length : 0;

        return {
          id: p.id,
          user_id: p.user_id,
          company_name: p.company_name,
          contact_name: p.contact_name,
          contact_email: p.contact_email,
          contact_phone: p.contact_phone,
          services: proj?.services ?? [],
          project_phase: proj?.phase ?? null,
          open_tickets: ticketsRes.data?.length ?? 0,
          total_invoiced: totalInvoiced,
          avg_nps: Math.round(avgNps * 10) / 10,
          tickets: (ticketsRes.data ?? []).map((t) => ({ id: t.id.slice(0, 8), subject: t.subject, status: t.status, urgency: t.urgency })),
          feedback: fbData.map((f) => ({ nps: f.nps_score, comment: f.comment, date: f.created_at?.slice(0, 10) })),
        } as ClientSummary & { user_id: string };
      })
    );

    setClients(enriched);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleDeleteClient(userId: string, clientId: string) {
    setDeletingId(clientId);
    try {
      const res = await fetch(`/api/delete-client?id=${userId}`, { method: "DELETE" });
      if (res.ok) {
        setSelectedId(null);
        setDeleteConfirm(null);
        await load();
      } else {
        alert("Failed to delete client");
      }
    } catch (e) {
      alert("Error deleting client");
    } finally {
      setDeletingId(null);
    }
  }

  const filtered = clients.filter(
    (c) =>
      c.company_name.toLowerCase().includes(search.toLowerCase()) ||
      c.contact_name.toLowerCase().includes(search.toLowerCase())
  );

  const selected = clients.find((c) => c.id === selectedId);

  return (
    <div className="space-y-6 max-w-6xl">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Client CRM</h1>
          <p className="text-sm text-[#94A3B8]">Master list of all clients with full profile details.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
          <input
            className="bg-[#02040A] border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00F0FF] transition-colors w-64 placeholder:text-[#64748B]"
            placeholder="Search clients..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </motion.div>

      <div className="flex gap-6">
        {/* Client list */}
        <div className="flex-1 space-y-3 min-w-0">
          {filtered.map((client, i) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <GlassCard
                className={`!p-4 cursor-pointer transition-all ${selectedId === client.id ? "!border-[#00F0FF]/30 shadow-[0_0_20px_rgba(0,240,255,0.1)]" : ""}`}
                onClick={() => setSelectedId(client.id)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00F0FF]/20 to-[#0047FF]/20 border border-[#00F0FF]/20 flex items-center justify-center shrink-0">
                    <span className="text-sm font-bold text-[#00F0FF]">{client.company_name[0]}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white truncate">{client.company_name}</p>
                    <p className="text-xs text-[#64748B]">{client.contact_name} • {client.services.join(", ")}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span
                      className="text-[10px] px-2 py-0.5 rounded-full font-medium uppercase tracking-wider"
                      style={{ backgroundColor: `${client.project_phase ? phaseColors[client.project_phase] : "#64748B"}15`, color: client.project_phase ? phaseColors[client.project_phase] : "#64748B" }}
                    >
                      {client.project_phase ?? "—"}
                    </span>
                    <ChevronRight className="w-4 h-4 text-[#64748B]" />
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-12 text-[#64748B] text-sm">No clients found.</div>
          )}
        </div>

        {/* Detail panel */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="w-96 shrink-0 hidden lg:block"
            >
              <GlassCard className="sticky top-4 !border-[#00F0FF]/10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white">{selected.company_name}</h3>
                  <button onClick={() => setSelectedId(null)} className="text-[#94A3B8] hover:text-white">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Contact info */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-[#94A3B8]"><Building2 className="w-3.5 h-3.5 text-[#00F0FF]" /> {selected.company_name}</div>
                    <div className="flex items-center gap-2 text-sm text-[#94A3B8]"><Users className="w-3.5 h-3.5 text-[#00F0FF]" /> {selected.contact_name}</div>
                    <div className="flex items-center gap-2 text-sm text-[#94A3B8]"><Mail className="w-3.5 h-3.5 text-[#00F0FF]" /> {selected.contact_email}</div>
                    <div className="flex items-center gap-2 text-sm text-[#94A3B8]"><Phone className="w-3.5 h-3.5 text-[#00F0FF]" /> {selected.contact_phone}</div>
                  </div>

                  <div className="border-t border-white/5 pt-4">
                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div>
                        <p className="text-lg font-bold text-white">{selected.open_tickets}</p>
                        <p className="text-[10px] text-[#64748B] uppercase">Open Tickets</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-white">{formatCurrency(selected.total_invoiced)}</p>
                        <p className="text-[10px] text-[#64748B] uppercase">Invoiced</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-white">{selected.avg_nps || "—"}</p>
                        <p className="text-[10px] text-[#64748B] uppercase">Avg NPS</p>
                      </div>
                    </div>
                  </div>

                  {/* Active services */}
                  <div className="border-t border-white/5 pt-4">
                    <p className="text-xs text-[#64748B] uppercase tracking-wider mb-2">Services</p>
                    <div className="flex flex-wrap gap-1.5">
                      {selected.services.map((s) => (
                        <span key={s} className="text-[10px] px-2 py-1 rounded-full bg-[#00F0FF]/10 text-[#00F0FF]">{s}</span>
                      ))}
                    </div>
                  </div>

                  {/* Recent tickets */}
                  {selected.tickets.length > 0 && (
                    <div className="border-t border-white/5 pt-4">
                      <p className="text-xs text-[#64748B] uppercase tracking-wider mb-2 flex items-center gap-1"><Ticket className="w-3 h-3" /> Open Tickets</p>
                      {selected.tickets.map((t) => (
                        <div key={t.id} className="flex items-center gap-2 py-1.5">
                          <span className="text-[10px] font-mono text-[#64748B]">{t.id}</span>
                          <span className="text-xs text-white truncate flex-1">{t.subject}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Feedback */}
                  {selected.feedback.length > 0 && (
                    <div className="border-t border-white/5 pt-4">
                      <p className="text-xs text-[#64748B] uppercase tracking-wider mb-2 flex items-center gap-1"><MessageSquare className="w-3 h-3" /> Recent Feedback</p>
                      {selected.feedback.map((fb, i) => (
                        <div key={i} className="py-1.5">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-xs font-bold" style={{ color: fb.nps >= 9 ? "#10B981" : fb.nps >= 7 ? "#F59E0B" : "#EF4444" }}>NPS {fb.nps}</span>
                            <span className="text-[10px] text-[#64748B]">{fb.date}</span>
                          </div>
                          <p className="text-xs text-[#94A3B8]">{fb.comment}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Danger Zone */}
                  <div className="border-t border-red-500/20 pt-4 mt-6">
                    {deleteConfirm === selected.id ? (
                      <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                        <p className="text-xs text-red-400 mb-3 flex items-center gap-1.5 font-medium">
                          <AlertTriangle className="w-4 h-4" /> This will permanently delete the client and ALL related data (projects, tickets, invoices).
                        </p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleDeleteClient((selected as any).user_id, selected.id)}
                            disabled={deletingId === selected.id}
                            className="flex-1 py-1.5 rounded-md bg-red-500 hover:bg-red-600 text-white text-xs font-bold transition-colors disabled:opacity-50"
                          >
                            {deletingId === selected.id ? "Deleting..." : "Confirm Delete"}
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(null)}
                            disabled={deletingId === selected.id}
                            className="flex-1 py-1.5 rounded-md bg-white/5 hover:bg-white/10 text-white text-xs font-medium transition-colors disabled:opacity-50"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeleteConfirm(selected.id)}
                        className="w-full py-2 rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10 hover:text-red-300 text-xs font-medium flex items-center justify-center gap-2 transition-all"
                      >
                        <Trash2 className="w-4 h-4" /> Delete Client
                      </button>
                    )}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
