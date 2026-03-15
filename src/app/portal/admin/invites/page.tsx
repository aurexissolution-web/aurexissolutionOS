"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { NeonButton } from "@/components/ui/NeonButton";
import { Link2, Copy, CheckCircle2, Clock, XCircle, Send } from "lucide-react";
import type { UserRole } from "@/types/portal";
import { supabase } from "@/lib/supabase/client";

interface InviteItem {
  id: string;
  token: string;
  email: string;
  role: UserRole;
  used: boolean;
  expires_at: string;
  created_at: string;
}

const inputClass =
  "w-full bg-[#02040A] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#00F0FF] transition-colors placeholder:text-[#64748B]";

const roleColors: Record<UserRole, string> = {
  client: "#00F0FF",
  admin: "#F59E0B",
  sales: "#10B981",
};

export default function InvitesPage() {
  const [invites, setInvites] = useState<InviteItem[]>([]);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<UserRole>("client");
  const [generated, setGenerated] = useState(false);
  const [generatedLink, setGeneratedLink] = useState("");
  const [copied, setCopied] = useState(false);

  const loadInvites = useCallback(async () => {
    const { data } = await supabase
      .from("invite_links")
      .select("id, token, email, role, used, expires_at, created_at")
      .order("created_at", { ascending: false });
    if (data) setInvites(data as InviteItem[]);
  }, []);

  useEffect(() => {
    loadInvites();
  }, [loadInvites]);

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    const { data } = await supabase
      .from("invite_links")
      .insert({ email, role })
      .select("token")
      .single();
    if (data) {
      setGeneratedLink(`${window.location.origin}/invite/${data.token}`);
      setGenerated(true);
      loadInvites();
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-white mb-1">Access Control</h1>
        <p className="text-sm text-[#94A3B8]">Generate secure, single-use invite links to onboard new users.</p>
      </motion.div>

      {/* Generate form */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <GlassCard>
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Link2 className="w-5 h-5 text-[#00F0FF]" /> Generate Invite Link
          </h2>

          {generated ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <div className="flex items-center gap-2 p-3 rounded-lg bg-[#10B981]/10 border border-[#10B981]/20">
                <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                <span className="text-sm text-[#10B981]">Invite link generated for {email}</span>
              </div>
              <div className="flex items-center gap-2">
                <input readOnly value={generatedLink} className={inputClass + " font-mono text-xs"} />
                <button
                  onClick={handleCopy}
                  className="p-3 rounded-lg bg-[#00F0FF]/10 hover:bg-[#00F0FF]/20 text-[#00F0FF] transition-colors shrink-0"
                >
                  {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <button onClick={() => { setGenerated(false); setEmail(""); }} className="text-xs text-[#94A3B8] hover:text-white transition-colors">
                Generate another
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleGenerate} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#94A3B8] mb-2">Email Address</label>
                  <input
                    required
                    type="email"
                    className={inputClass}
                    placeholder="new-client@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#94A3B8] mb-2">Role</label>
                  <select className={inputClass} value={role} onChange={(e) => setRole(e.target.value as UserRole)}>
                    <option value="client">Client</option>
                    <option value="admin">Admin</option>
                    <option value="sales">Sales</option>
                  </select>
                </div>
              </div>
              <NeonButton className="!px-6 !py-3 !text-sm">
                <Send className="w-4 h-4 mr-2" /> Generate & Send Invite
              </NeonButton>
            </form>
          )}
        </GlassCard>
      </motion.div>

      {/* Past invites */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <h2 className="text-lg font-semibold text-white mb-4">Invite History</h2>
        <div className="space-y-3">
          {invites.map((inv, i) => (
            <motion.div key={inv.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 + i * 0.04 }}>
              <GlassCard className="!p-4 flex items-center gap-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${inv.used ? "bg-[#10B981]/10" : "bg-[#F59E0B]/10"}`}>
                  {inv.used ? <CheckCircle2 className="w-4 h-4 text-[#10B981]" /> : <Clock className="w-4 h-4 text-[#F59E0B]" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white truncate">{inv.email}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span
                      className="text-[10px] px-2 py-0.5 rounded-full font-medium uppercase tracking-wider"
                      style={{ backgroundColor: `${roleColors[inv.role]}15`, color: roleColors[inv.role] }}
                    >
                      {inv.role}
                    </span>
                    <span className="text-xs text-[#64748B] font-mono">{inv.token.slice(0, 12)}...</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs" style={{ color: inv.used ? "#10B981" : "#F59E0B" }}>
                    {inv.used ? "Used" : "Pending"}
                  </p>
                  <p className="text-[10px] text-[#64748B]">Expires {inv.expires_at}</p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
