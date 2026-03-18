"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { FileText, Download, CheckCircle2, Clock, AlertCircle, Shield } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { useProfile } from "@/lib/supabase/hooks";

interface DocItem {
  id: string;
  name: string;
  type: "nda" | "service_agreement" | "proposal" | "other";
  status: "pending" | "signed" | "expired";
  file_url: string;
  created_at: string;
  signed_at: string | null;
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

export default function DocumentsPage() {
  const { profile } = useProfile();
  const [docs, setDocs] = useState<DocItem[]>([]);

  const loadDocs = useCallback(async () => {
    if (!profile) return;
    const { data } = await supabase
      .from("documents")
      .select("id, name, type, status, file_url, created_at, signed_at")
      .eq("client_id", profile.id)
      .order("created_at", { ascending: false });
    if (data) setDocs(data as DocItem[]);
  }, [profile]);

  useEffect(() => {
    loadDocs();
  }, [loadDocs]);
  return (
    <div className="space-y-6 max-w-4xl">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-white mb-1">Secure Document Vault</h1>
        <p className="text-sm text-[#94A3B8]">Review and download your NDAs and service agreements.</p>
      </motion.div>

      {/* Security badge */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#00F0FF]/5 border border-[#00F0FF]/10 w-fit">
          <Shield className="w-4 h-4 text-[#00F0FF]" />
          <span className="text-xs text-[#00F0FF] font-medium">All documents are encrypted and stored securely via Supabase Storage</span>
        </div>
      </motion.div>

      {/* Document list */}
      <div className="space-y-3">
        {docs.map((doc, i) => {
          const st = statusConfig[doc.status];
          const StatusIcon = st.icon;
          return (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
            >
              <GlassCard className="!p-5">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-[#8B5CF6]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white mb-1 truncate">{doc.name}</p>
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-[#94A3B8] uppercase tracking-wider font-medium">
                        {typeLabels[doc.type]}
                      </span>
                      <div className="flex items-center gap-1">
                        <StatusIcon className="w-3 h-3" style={{ color: st.color }} />
                        <span className="text-xs" style={{ color: st.color }}>{st.label}</span>
                      </div>
                      <span className="text-xs text-[#64748B]">Created {doc.created_at}</span>
                      {doc.signed_at && (
                        <span className="text-xs text-[#64748B]">Signed {doc.signed_at}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <a
                      href={`/api/download-doc?url=${encodeURIComponent(doc.file_url)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-[#94A3B8] hover:text-white transition-colors"
                    >
                      <Download className="w-4 h-4" />
                    </a>
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
