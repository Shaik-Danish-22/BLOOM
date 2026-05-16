"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Loader2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

interface AgentStepProps {
  name: string;
  role: string;
  status: "waiting" | "active" | "completed";
  index: number;
}

export const AgentStep = ({ name, role, status, index }: AgentStepProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className={cn(
        "relative flex items-center gap-4 p-4 rounded-xl border transition-all duration-500",
        status === "active" ? "bg-primary/10 border-primary shadow-[0_0_15px_rgba(159,92,240,0.15)] scale-105" : "bg-card/40 border-white/5",
        status === "waiting" && "opacity-40"
      )}
    >
      <div className="flex-shrink-0">
        {status === "completed" ? (
          <CheckCircle2 className="w-6 h-6 text-primary" />
        ) : status === "active" ? (
          <Loader2 className="w-6 h-6 text-primary animate-spin" />
        ) : (
          <Circle className="w-6 h-6 text-white/20" />
        )}
      </div>
      <div className="flex-grow min-w-0">
        <h4 className="text-sm font-semibold text-white/90 truncate">{name}</h4>
        <p className="text-[10px] uppercase tracking-tighter text-white/40 font-bold">{role}</p>
      </div>
      
      {status === "active" && (
        <motion.div
          layoutId="agent-glow"
          className="absolute inset-0 rounded-xl bg-primary/5 blur-xl -z-10"
        />
      )}
    </motion.div>
  );
};
