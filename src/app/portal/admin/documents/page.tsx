"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { NeonButton } from "@/components/ui/NeonButton";
import {
  FileText,
  Upload,
  Plus,
  X,
  CheckCircle2,
  Clock,
  AlertCircle,
  Building2,
  Trash2,
} from "lucide-react";
import { supabase } from "@/lib/supabase/client";

interface DocItem {
  id: string;
  name: string;
  type: string;
  status: "pending" | "signed" | "expired";
  file_url: string;
  created_at: string;
  signed_at: string | null;
  client_name: string;
}

interface ClientOption {
  id: string;
  company_name: string;
}

const statusConfig = {
  pending: { icon: Clock, color: "#F59E0B", label: "Pending" },
  signed: { icon: CheckCircle2, color: "#10B981", label: "Signed" },
  expired: { icon: AlertCircle, color: "#EF4444", label: "Expired" },
};

const typeLabels: Record<string, string> = {
  nda: "NDA",
  service_agreement: "Service Agreement",
  proposal: "Proposal",
  other: "Document",
};

const inputClass =
  "w-full bg-[#02040A] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#00F0FF] transition-colors placeholder:text-[#64748B]";

export default function AdminDocumentsPage() {
  const [docs, setDocs] = useState<DocItem[]>([]);
  const [clients, setClients] = useState<ClientOption[]>([]);
  const [showUpload, setShowUpload] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [form, setForm] = useState({
    client_id: "",
    name: "",
    type: "other" as string,
  });

  const loadDocs = useCallback(async () => {
    const { data } = await supabase
      .from("documents")
      .select("id, name, type, status, file_url, created_at, signed_at, client_profiles(company_name)")
      .order("created_at", { ascending: false });

    if (data) {
      setDocs(
        data.map((d: Record<string, unknown>) => ({
          id: d.id as string,
          name: d.name as string,
          type: d.type as string,
          status: d.status as "pending" | "signed" | "expired",
          file_url: d.file_url as string,
          created_at: d.created_at as string,
          signed_at: (d.signed_at as string) || null,
          client_name: (d.client_profiles as { company_name: string } | null)?.company_name ?? "Unknown",
        }))
      );
    }
  }, []);

  const loadClients = useCallback(async () => {
    const { data } = await supabase
      .from("client_profiles")
      .select("id, company_name")
      .eq("role", "client")
      .order("company_name");
    if (data) setClients(data as ClientOption[]);
  }, []);

  useEffect(() => {
    loadDocs();
    loadClients();
  }, [loadDocs, loadClients]);

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return;
    setUploading(true);

    const ext = file.name.split(".").pop();
    const filePath = `documents/${form.client_id}/${Date.now()}.${ext}`;

    const { error: uploadErr } = await supabase.storage
      .from("legal-docs")
      .upload(filePath, file, { upsert: true });

    if (uploadErr) {
      // Try creating the bucket if it doesn't exist, then retry
      await supabase.storage.createBucket("legal-docs", { public: true });
      await supabase.storage.from("legal-docs").upload(filePath, file, { upsert: true });
    }

    const { data: urlData } = supabase.storage.from("legal-docs").getPublicUrl(filePath);

    await supabase.from("documents").insert({
      client_id: form.client_id,
      name: form.name,
      type: form.type,
      file_url: urlData.publicUrl,
      status: "pending",
    });

    setUploading(false);
    setShowUpload(false);
    setFile(null);
    setForm({ client_id: "", name: "", type: "other" });
    loadDocs();
  }

  async function updateStatus(docId: string, status: "pending" | "signed" | "expired") {
    const updates: Record<string, unknown> = { status };
    if (status === "signed") updates.signed_at = new Date().toISOString();
    await supabase.from("documents").update(updates).eq("id", docId);
    loadDocs();
  }

  async function deleteDoc(docId: string) {
    await supabase.from("documents").delete().eq("id", docId);
    loadDocs();
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Document Manager</h1>
          <p className="text-sm text-[#94A3B8]">Upload NDAs, proposals, and agreements for clients.</p>
        </div>
        <NeonButton onClick={() => setShowUpload(true)} className="!px-5 !py-2.5 !text-sm">
          <Plus className="w-4 h-4 mr-2" /> Upload Document
        </NeonButton>
      </motion.div>

      {/* Upload Modal */}
      <AnimatePresence>
        {showUpload && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => setShowUpload(false)}>
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} onClick={(e) => e.stopPropagation()} className="w-full max-w-lg">
              <GlassCard className="!border-[#00F0FF]/20">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2"><Upload className="w-5 h-5 text-[#00F0FF]" /> Upload Document</h2>
                  <button onClick={() => setShowUpload(false)} className="text-[#94A3B8] hover:text-white"><X className="w-5 h-5" /></button>
                </div>
                <form onSubmit={handleUpload} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#94A3B8] mb-2">Client</label>
                    <select required className={inputClass} value={form.client_id} onChange={(e) => setForm({ ...form, client_id: e.target.value })}>
                      <option value="">Select client...</option>
                      {clients.map((c) => <option key={c.id} value={c.id}>{c.company_name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#94A3B8] mb-2">Document Name</label>
                    <input required className={inputClass} placeholder="e.g. Service Agreement Q1 2025" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#94A3B8] mb-2">Type</label>
                    <select className={inputClass} value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                      <option value="nda">NDA</option>
                      <option value="service_agreement">Service Agreement</option>
                      <option value="proposal">Proposal</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#94A3B8] mb-2">File</label>
                    <input
                      required
                      type="file"
                      accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                      className={inputClass}
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                    />
                  </div>
                  <NeonButton className="w-full !py-3 !text-sm" disabled={uploading || !file}>
                    {uploading ? "Uploading..." : "Upload Document"}
                  </NeonButton>
                </form>
              </GlassCard>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {docs.length === 0 && (
        <div className="text-center py-12 text-[#64748B] text-sm">No documents uploaded yet.</div>
      )}

      {/* Document list */}
      <div className="space-y-3">
        {docs.map((doc, i) => {
          const st = statusConfig[doc.status];
          const StatusIcon = st.icon;
          return (
            <motion.div key={doc.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
              <GlassCard className="!p-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-[#8B5CF6]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white mb-1 truncate">{doc.name}</p>
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-[#94A3B8] uppercase tracking-wider font-medium">{typeLabels[doc.type] || doc.type}</span>
                      <div className="flex items-center gap-1">
                        <StatusIcon className="w-3 h-3" style={{ color: st.color }} />
                        <span className="text-xs" style={{ color: st.color }}>{st.label}</span>
                      </div>
                      <span className="text-xs text-[#64748B] flex items-center gap-1"><Building2 className="w-3 h-3" />{doc.client_name}</span>
                      <span className="text-xs text-[#64748B]">{doc.created_at?.slice(0, 10)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <select
                      className="bg-[#02040A] border border-white/10 rounded-lg px-2 py-1 text-[10px] text-white focus:outline-none focus:border-[#00F0FF]"
                      value={doc.status}
                      onChange={(e) => updateStatus(doc.id, e.target.value as "pending" | "signed" | "expired")}
                    >
                      <option value="pending">Pending</option>
                      <option value="signed">Signed</option>
                      <option value="expired">Expired</option>
                    </select>
                    {doc.file_url && (
                      <a href={doc.file_url} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-[#94A3B8] hover:text-white transition-colors">
                        <FileText className="w-4 h-4" />
                      </a>
                    )}
                    <button onClick={() => deleteDoc(doc.id)} className="p-2 rounded-lg bg-white/5 hover:bg-red-500/10 text-[#94A3B8] hover:text-red-400 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
