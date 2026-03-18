"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { NeonButton } from "@/components/ui/NeonButton";
import {
  Plus,
  X,
  Save,
  Calendar,
  User,
  Building2,
  GripVertical,
} from "lucide-react";
import type { LeadStage } from "@/types/portal";
import { supabase } from "@/lib/supabase/client";

interface LeadItem {
  id: string;
  name: string;
  company: string;
  email: string;
  stage: LeadStage;
  estimated_value: number;
  source: string;
  follow_up_date: string | null;
  notes: string;
}

const stageConfig: { key: LeadStage; label: string; color: string }[] = [
  { key: "new", label: "New", color: "#64748B" },
  { key: "contacted", label: "Contacted", color: "#F59E0B" },
  { key: "qualified", label: "Qualified", color: "#00F0FF" },
  { key: "proposal", label: "Proposal", color: "#8B5CF6" },
  { key: "negotiation", label: "Negotiation", color: "#F97316" },
  { key: "closed_won", label: "Closed Won", color: "#10B981" },
  { key: "closed_lost", label: "Closed Lost", color: "#EF4444" },
];

const inputClass =
  "w-full bg-[#02040A] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#00F0FF] transition-colors placeholder:text-[#64748B]";

function fmt(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
}

export default function PipelinePage() {
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    stage: "new" as LeadStage,
    estimated_value: "",
    source: "",
    follow_up_date: "",
    notes: "",
  });

  const loadLeads = useCallback(async () => {
    const { data } = await supabase
      .from("leads")
      .select("id, name, company, email, stage, estimated_value, source, follow_up_date, notes")
      .order("created_at", { ascending: false });
    if (data) setLeads(data as LeadItem[]);
  }, []);

  useEffect(() => {
     
    loadLeads();
  }, [loadLeads]);

  const activeStages = stageConfig.filter((s) => !s.key.startsWith("closed_"));
  const closedStages = stageConfig.filter((s) => s.key.startsWith("closed_"));

  const pipelineValue = leads
    .filter((l) => !l.stage.startsWith("closed_"))
    .reduce((s, l) => s + Number(l.estimated_value), 0);

  async function handleAdd() {
    await supabase.from("leads").insert({
      name: form.name,
      company: form.company,
      email: form.email,
      stage: form.stage,
      estimated_value: parseFloat(form.estimated_value) || 0,
      source: form.source,
      follow_up_date: form.follow_up_date || null,
      notes: form.notes,
    });
    setShowForm(false);
    setForm({ name: "", company: "", email: "", stage: "new", estimated_value: "", source: "", follow_up_date: "", notes: "" });
    loadLeads();
  }

  async function moveStage(leadId: string, newStage: LeadStage) {
    await supabase.from("leads").update({ stage: newStage, updated_at: new Date().toISOString() }).eq("id", leadId);
    loadLeads();
  }

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Lead Pipeline</h1>
          <p className="text-sm text-[#94A3B8]">
            Kanban board for tracking leads. Pipeline value: <span className="text-[#00F0FF] font-semibold">{fmt(pipelineValue)}</span>
          </p>
        </div>
        <NeonButton onClick={() => setShowForm(true)} className="!px-5 !py-2.5 !text-sm">
          <Plus className="w-4 h-4 mr-2" /> Add Lead
        </NeonButton>
      </motion.div>

      {/* Add lead modal */}
      {showForm && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} onClick={(e) => e.stopPropagation()} className="w-full max-w-lg">
            <GlassCard className="!border-[#00F0FF]/20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-white">Add New Lead</h2>
                <button onClick={() => setShowForm(false)} className="text-[#94A3B8] hover:text-white"><X className="w-5 h-5" /></button>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#94A3B8] mb-2">Contact Name</label>
                    <input className={inputClass} placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#94A3B8] mb-2">Company</label>
                    <input className={inputClass} placeholder="Company name" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#94A3B8] mb-2">Email</label>
                    <input type="email" className={inputClass} placeholder="email@company.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#94A3B8] mb-2">Estimated Value (USD)</label>
                    <input type="number" className={inputClass} placeholder="0" value={form.estimated_value} onChange={(e) => setForm({ ...form, estimated_value: e.target.value })} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#94A3B8] mb-2">Source</label>
                    <input className={inputClass} placeholder="Website, Referral, LinkedIn..." value={form.source} onChange={(e) => setForm({ ...form, source: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#94A3B8] mb-2">Follow-up Date</label>
                    <input type="date" className={inputClass} value={form.follow_up_date} onChange={(e) => setForm({ ...form, follow_up_date: e.target.value })} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#94A3B8] mb-2">Notes</label>
                  <textarea rows={2} className={inputClass + " resize-none"} placeholder="Context about the lead..." value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
                </div>
                <NeonButton onClick={handleAdd} className="w-full !py-3 !text-sm">
                  <Save className="w-4 h-4 mr-2" /> Save Lead
                </NeonButton>
              </div>
            </GlassCard>
          </motion.div>
        </motion.div>
      )}

      {/* Kanban Board */}
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-4 min-w-max">
          {[...activeStages, ...closedStages].map((stage, si) => {
            const stageLeads = leads.filter((l) => l.stage === stage.key);
            const stageValue = stageLeads.reduce((s, l) => s + l.estimated_value, 0);

            return (
              <motion.div
                key={stage.key}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: si * 0.05 }}
                className="w-72 shrink-0"
              >
                {/* Column header */}
                <div className="flex items-center justify-between mb-3 px-1">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: stage.color }} />
                    <span className="text-sm font-semibold text-white">{stage.label}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/5 text-[#94A3B8]">{stageLeads.length}</span>
                  </div>
                  {stageValue > 0 && (
                    <span className="text-[10px] font-mono" style={{ color: stage.color }}>{fmt(stageValue)}</span>
                  )}
                </div>

                {/* Cards */}
                <div className="space-y-2 min-h-[200px] p-2 rounded-xl bg-white/[0.02] border border-white/5">
                  {stageLeads.map((lead) => (
                    <div
                      key={lead.id}
                      className="p-3 rounded-lg bg-[#0A0D14] border border-white/5 hover:border-white/10 transition-colors group"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-white truncate flex items-center gap-1">
                            <User className="w-3 h-3 text-[#64748B] shrink-0" />
                            {lead.name}
                          </p>
                          <p className="text-[10px] text-[#64748B] flex items-center gap-1 mt-0.5">
                            <Building2 className="w-2.5 h-2.5" /> {lead.company}
                          </p>
                        </div>
                        <GripVertical className="w-3.5 h-3.5 text-[#64748B]/0 group-hover:text-[#64748B]/50 transition-colors cursor-grab" />
                      </div>

                      <p className="text-xs text-[#94A3B8] line-clamp-2 mb-2">{lead.notes}</p>

                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold" style={{ color: stage.color }}>{fmt(lead.estimated_value)}</span>
                        {lead.follow_up_date && (
                          <span className="text-[10px] text-[#64748B] flex items-center gap-0.5">
                            <Calendar className="w-2.5 h-2.5" /> {lead.follow_up_date}
                          </span>
                        )}
                      </div>

                      {/* Stage move buttons */}
                      {!stage.key.startsWith("closed_") && (
                        <div className="flex gap-1 mt-2 pt-2 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
                          {stageConfig
                            .filter((s) => s.key !== stage.key)
                            .slice(0, 3)
                            .map((s) => (
                              <button
                                key={s.key}
                                onClick={() => moveStage(lead.id, s.key)}
                                className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 hover:bg-white/10 transition-colors truncate"
                                style={{ color: s.color }}
                              >
                                → {s.label}
                              </button>
                            ))}
                        </div>
                      )}
                    </div>
                  ))}

                  {stageLeads.length === 0 && (
                    <div className="flex items-center justify-center h-24 text-[10px] text-[#64748B]">
                      No leads
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
