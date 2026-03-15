"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { CheckCircle2, Circle, Loader2, Flag } from "lucide-react";
import type { LucideProps } from "lucide-react";
import { PROJECT_PHASES, type ProjectPhase } from "@/types/portal";
import { supabase } from "@/lib/supabase/client";
import { useProfile } from "@/lib/supabase/hooks";

type IconComp = React.ComponentType<LucideProps>;

interface ProjectRoadmap {
  id: string;
  name: string;
  phase: ProjectPhase;
  phase_progress: number;
  start_date: string;
  target_launch_date: string | null;
}

const phaseIcons: Record<string, IconComp> = {
  completed: CheckCircle2,
  active: Loader2,
  upcoming: Circle,
  final: Flag,
};

export default function RoadmapPage() {
  const { profile } = useProfile();
  const [projects, setProjects] = useState<ProjectRoadmap[]>([]);

  const loadProjects = useCallback(async () => {
    if (!profile) return;
    const { data } = await supabase
      .from("projects")
      .select("id, name, phase, phase_progress, start_date, target_launch_date")
      .eq("client_id", profile.id)
      .order("created_at", { ascending: false });
    if (data) setProjects(data as ProjectRoadmap[]);
  }, [profile]);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  return (
    <div className="space-y-6 max-w-4xl">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-white mb-1">Project Roadmap</h1>
        <p className="text-sm text-[#94A3B8]">Track the exact phase of each of your active projects.</p>
      </motion.div>

      {projects.length === 0 && (
        <div className="text-center py-12 text-[#64748B] text-sm">No active projects yet.</div>
      )}

      {projects.map((project, pi) => {
        const currentPhaseIndex = PROJECT_PHASES.findIndex((p) => p.key === project.phase);
        const overallProgress = ((currentPhaseIndex * 100 + project.phase_progress) / (PROJECT_PHASES.length * 100)) * 100;

        return (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: pi * 0.1 }}
          >
            <GlassCard>
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-lg font-bold text-white">{project.name}</h2>
                  <p className="text-xs text-[#64748B] mt-1">
                    Started {project.start_date} • Target launch {project.target_launch_date}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-[#00F0FF]">{Math.round(overallProgress)}%</p>
                  <p className="text-[10px] text-[#64748B] uppercase tracking-wider">Overall</p>
                </div>
              </div>

              {/* Overall progress bar */}
              <div className="w-full h-2 rounded-full bg-white/5 mb-8 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${overallProgress}%` }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-[#00F0FF] to-[#0047FF]"
                  style={{ boxShadow: "0 0 12px rgba(0,240,255,0.4)" }}
                />
              </div>

              {/* Phase timeline */}
              <div className="relative">
                {/* Connecting line */}
                <div className="absolute top-5 left-5 right-5 h-px bg-white/10" />

                <div className="grid grid-cols-4 gap-2 relative">
                  {PROJECT_PHASES.map((phase, i) => {
                    const isCurrent = i === currentPhaseIndex;
                    const isCompleted = i < currentPhaseIndex;
                    const isUpcoming = i > currentPhaseIndex;

                    let status: string;
                    if (isCompleted) status = "completed";
                    else if (isCurrent) status = "active";
                    else if (i === PROJECT_PHASES.length - 1) status = "final";
                    else status = "upcoming";

                    const Icon = phaseIcons[status];
                    const color = isCompleted ? "#10B981" : isCurrent ? "#00F0FF" : "#64748B";

                    return (
                      <div key={phase.key} className="flex flex-col items-center text-center">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center relative z-10 transition-all duration-300"
                          style={{
                            backgroundColor: isCurrent ? `${color}15` : isCompleted ? `${color}15` : "rgba(255,255,255,0.03)",
                            border: `2px solid ${isCurrent ? color : isCompleted ? color : "rgba(255,255,255,0.1)"}`,
                            boxShadow: isCurrent ? `0 0 16px ${color}40` : "none",
                          }}
                        >
                          <Icon
                            className={`w-4 h-4 ${isCurrent ? "animate-spin" : ""}`}
                            style={{
                              color,
                              animationDuration: isCurrent ? "3s" : undefined,
                            }}
                          />
                        </div>
                        <p
                          className="text-xs font-semibold mt-2 transition-colors"
                          style={{ color: isUpcoming ? "#64748B" : color }}
                        >
                          {phase.label}
                        </p>
                        {isCurrent && (
                          <p className="text-[10px] text-[#00F0FF] mt-0.5">{project.phase_progress}%</p>
                        )}
                        {isCompleted && (
                          <p className="text-[10px] text-[#10B981] mt-0.5">Done</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </GlassCard>
          </motion.div>
        );
      })}
    </div>
  );
}
