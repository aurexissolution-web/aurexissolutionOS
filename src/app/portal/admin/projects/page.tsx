"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { NeonButton } from "@/components/ui/NeonButton";
import { Settings, ChevronRight, CheckCircle2, Building2 } from "lucide-react";
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

const phaseColors: Record<ProjectPhase, string> = {
  audit: "#64748B",
  blueprint: "#F59E0B",
  sprint: "#00F0FF",
  launch: "#10B981",
};

export default function ProjectControlPage() {
  const [projects, setProjects] = useState<ProjectControl[]>([]);
  const [updatedId, setUpdatedId] = useState<string | null>(null);

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

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

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
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-white mb-1">Project Controller</h1>
        <p className="text-sm text-[#94A3B8]">Manage project phases. Changes instantly update the client&apos;s roadmap view.</p>
      </motion.div>

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
