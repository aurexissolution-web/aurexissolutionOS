"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { NeonButton } from "@/components/ui/NeonButton";
import { Settings, ChevronRight, CheckCircle2, Building2, Plus, X } from "lucide-react";
import { PROJECT_PHASES, type ProjectPhase } from "@/types/portal";
import { supabase } from "@/lib/supabase/client";

interface ProjectControl {
  id: string;
  name: string;
  client_name: string;
  phase: ProjectPhase;
  phase_progress: number;
  services: string[];
  start_date: string;
  target_launch_date: string;
}

interface ClientOption {
  id: string;
  company_name: string;
}

const phaseColors: Record<ProjectPhase, string> = {
  audit: "#64748B",
  blueprint: "#F59E0B",
  sprint: "#00F0FF",
  launch: "#10B981",
};

const inputClass =
  "w-full bg-[#02040A] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#00F0FF] transition-colors placeholder:text-[#64748B]";

export default function ProjectControlPage() {
  const [projects, setProjects] = useState<ProjectControl[]>([]);
  const [updatedId, setUpdatedId] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [clients, setClients] = useState<ClientOption[]>([]);
  const [creating, setCreating] = useState(false);
  const [createForm, setCreateForm] = useState({
    name: "",
    description: "",
    client_id: "",
    services: "",
    start_date: new Date().toISOString().slice(0, 10),
    target_launch_date: "",
  });

  const loadProjects = useCallback(async () => {
    const { data } = await supabase
      .from("projects")
      .select("id, name, phase, phase_progress, services, start_date, target_launch_date, client_profiles(company_name)")
      .order("created_at", { ascending: false });
    if (data) {
      setProjects(
        data.map((p: Record<string, unknown>) => ({
          id: p.id as string,
          name: p.name as string,
          client_name: (p.client_profiles as { company_name: string } | null)?.company_name ?? "—",
          phase: p.phase as ProjectPhase,
          phase_progress: p.phase_progress as number,
          services: p.services as string[],
          start_date: p.start_date as string,
          target_launch_date: p.target_launch_date as string,
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
    loadProjects();
    loadClients();
  }, [loadProjects, loadClients]);

  async function handleCreateProject(e: React.FormEvent) {
    e.preventDefault();
    setCreating(true);
    await supabase.from("projects").insert({
      client_id: createForm.client_id,
      name: createForm.name,
      description: createForm.description,
      services: createForm.services.split(",").map((s) => s.trim()).filter(Boolean),
      start_date: createForm.start_date,
      target_launch_date: createForm.target_launch_date || null,
      phase: "audit",
      phase_progress: 0,
    });
    setCreating(false);
    setShowCreate(false);
    setCreateForm({ name: "", description: "", client_id: "", services: "", start_date: new Date().toISOString().slice(0, 10), target_launch_date: "" });
    loadProjects();
  }

  async function advancePhase(projectId: string) {
    const project = projects.find((p) => p.id === projectId);
    if (!project) return;
    const currentIdx = PROJECT_PHASES.findIndex((ph) => ph.key === project.phase);
    if (currentIdx >= PROJECT_PHASES.length - 1) return;
    const newPhase = PROJECT_PHASES[currentIdx + 1].key;
    await supabase.from("projects").update({ phase: newPhase, phase_progress: 0, updated_at: new Date().toISOString() }).eq("id", projectId);
    setUpdatedId(projectId);
    loadProjects();
    setTimeout(() => setUpdatedId(null), 2500);
  }

  async function setPhase(projectId: string, phase: ProjectPhase) {
    await supabase.from("projects").update({ phase, phase_progress: 0, updated_at: new Date().toISOString() }).eq("id", projectId);
    setUpdatedId(projectId);
    loadProjects();
    setTimeout(() => setUpdatedId(null), 2500);
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Project Controller</h1>
          <p className="text-sm text-[#94A3B8]">Manage project phases. Changes instantly update the client&apos;s roadmap view.</p>
        </div>
        <NeonButton onClick={() => setShowCreate(true)} className="!px-5 !py-2.5 !text-sm">
          <Plus className="w-4 h-4 mr-2" /> New Project
        </NeonButton>
      </motion.div>

      {/* Create Project Modal */}
      <AnimatePresence>
        {showCreate && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => setShowCreate(false)}>
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} onClick={(e) => e.stopPropagation()} className="w-full max-w-lg">
              <GlassCard className="!border-[#00F0FF]/20">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2"><Settings className="w-5 h-5 text-[#00F0FF]" /> Create Project</h2>
                  <button onClick={() => setShowCreate(false)} className="text-[#94A3B8] hover:text-white"><X className="w-5 h-5" /></button>
                </div>
                <form onSubmit={handleCreateProject} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#94A3B8] mb-2">Client</label>
                    <select required className={inputClass} value={createForm.client_id} onChange={(e) => setCreateForm({ ...createForm, client_id: e.target.value })}>
                      <option value="">Select client...</option>
                      {clients.map((c) => <option key={c.id} value={c.id}>{c.company_name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#94A3B8] mb-2">Project Name</label>
                    <input required className={inputClass} placeholder="e.g. Website Redesign" value={createForm.name} onChange={(e) => setCreateForm({ ...createForm, name: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#94A3B8] mb-2">Description</label>
                    <textarea rows={3} className={inputClass + " resize-none"} placeholder="Project description..." value={createForm.description} onChange={(e) => setCreateForm({ ...createForm, description: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#94A3B8] mb-2">Services (comma-separated)</label>
                    <input className={inputClass} placeholder="e.g. Web, AI, Mobile" value={createForm.services} onChange={(e) => setCreateForm({ ...createForm, services: e.target.value })} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#94A3B8] mb-2">Start Date</label>
                      <input type="date" required className={inputClass} value={createForm.start_date} onChange={(e) => setCreateForm({ ...createForm, start_date: e.target.value })} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#94A3B8] mb-2">Target Launch</label>
                      <input type="date" className={inputClass} value={createForm.target_launch_date} onChange={(e) => setCreateForm({ ...createForm, target_launch_date: e.target.value })} />
                    </div>
                  </div>
                  <NeonButton className="w-full !py-3 !text-sm" disabled={creating}>
                    {creating ? "Creating..." : "Create Project"}
                  </NeonButton>
                </form>
              </GlassCard>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {projects.length === 0 && (
        <div className="text-center py-12 text-[#64748B] text-sm">No projects yet. Click &quot;New Project&quot; to create one.</div>
      )}

      <div className="space-y-4">
        {projects.map((project, i) => {
          const currentIdx = PROJECT_PHASES.findIndex((ph) => ph.key === project.phase);
          const canAdvance = currentIdx < PROJECT_PHASES.length - 1;

          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <GlassCard className="!p-5">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${phaseColors[project.phase]}15` }}>
                    <Settings className="w-5 h-5" style={{ color: phaseColors[project.phase] }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-bold text-white">{project.name}</h3>
                      {updatedId === project.id && (
                        <motion.span initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-1 text-[10px] text-[#10B981]">
                          <CheckCircle2 className="w-3 h-3" /> Updated
                        </motion.span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <Building2 className="w-3 h-3 text-[#64748B]" />
                      <span className="text-xs text-[#64748B]">{project.client_name}</span>
                      <span className="text-xs text-[#64748B]">•</span>
                      <span className="text-xs text-[#64748B]">{project.services.join(", ")}</span>
                    </div>

                    {/* Phase timeline */}
                    <div className="flex items-center gap-1 mb-3">
                      {PROJECT_PHASES.map((phase, pi) => {
                        const isActive = pi === currentIdx;
                        const isCompleted = pi < currentIdx;
                        const color = isCompleted ? "#10B981" : isActive ? phaseColors[project.phase] : "#64748B";

                        return (
                          <div key={phase.key} className="flex items-center gap-1">
                            <button
                              onClick={() => setPhase(project.id, phase.key)}
                              className="px-2.5 py-1 rounded text-[10px] font-medium uppercase tracking-wider transition-all cursor-pointer hover:ring-1 hover:ring-white/20"
                              style={{
                                backgroundColor: isActive ? `${color}20` : isCompleted ? `${color}10` : "rgba(255,255,255,0.03)",
                                color,
                                border: isActive ? `1px solid ${color}40` : "1px solid transparent",
                              }}
                            >
                              {phase.label}
                            </button>
                            {pi < PROJECT_PHASES.length - 1 && (
                              <ChevronRight className="w-3 h-3 text-[#64748B]/30" />
                            )}
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex items-center gap-3 text-[10px] text-[#64748B]">
                      <span>Started {project.start_date}</span>
                      <span>Target {project.target_launch_date}</span>
                    </div>
                  </div>
                  <div className="shrink-0">
                    {canAdvance ? (
                      <NeonButton onClick={() => advancePhase(project.id)} className="!px-4 !py-2 !text-xs">
                        Advance <ChevronRight className="w-3 h-3 ml-1" />
                      </NeonButton>
                    ) : (
                      <span className="text-xs text-[#10B981] flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Launched
                      </span>
                    )}
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
