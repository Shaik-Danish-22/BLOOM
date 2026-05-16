
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Cpu, Palette, Layout, Search, Zap, Rocket, Terminal, Command } from "lucide-react";

const agents = [
  { id: "sentinel", name: "Sentinel", role: "Market Scanner", icon: Search },
  { id: "forge", name: "Forge", role: "Brand Architect", icon: Palette },
  { id: "atlas", name: "Atlas", role: "Neural Designer", icon: Cpu },
  { id: "compass", name: "Compass", role: "UI Architect", icon: Layout },
  { id: "oracle", name: "Oracle", role: "Investor Analyst", icon: Command },
  { id: "launch", name: "Launch", role: "Execution Engine", icon: Rocket },
];

const agentMessages = [
  "Mapping market congestion patterns...",
  "Forging visual identity systems...",
  "Orchestrating layout hierarchy...",
  "Refining conversion dynamics...",
  "Validating investment potential...",
  "Finalizing production build..."
];

export const CinematicLoader = ({ onComplete }: { onComplete: () => void }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [logs, setLogs] = useState<string[]>(["Neural link active.", "FoundersOS session initialized."]);

  useEffect(() => {
    if (activeIdx < agents.length) {
      const timer = setTimeout(() => {
        const agent = agents[activeIdx];
        setLogs(prev => [...prev.slice(-5), `Agent ${agent.name}: ${agentMessages[activeIdx]}`]);
        setActiveIdx(prev => prev + 1);
      }, 1800);
      return () => clearTimeout(timer);
    } else {
      setTimeout(onComplete, 1500);
    }
  }, [activeIdx, onComplete]);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full max-w-4xl space-y-16">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full">
        {agents.map((agent, i) => (
          <motion.div
            key={agent.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ 
              opacity: i < activeIdx ? 1 : i === activeIdx ? 0.6 : 0.05,
              scale: i === activeIdx ? 1.05 : 1,
              filter: i === activeIdx ? 'blur(0px)' : i > activeIdx ? 'blur(4px)' : 'blur(0px)'
            }}
            className={`liquid-glass p-8 rounded-[32px] border transition-all duration-700 ${
              i === activeIdx 
              ? 'border-white/20 shadow-[0_0_50px_rgba(255,255,255,0.08)] bg-white/5' 
              : 'border-white/5'
            }`}
          >
            <agent.icon className={`w-10 h-10 mb-6 transition-colors duration-700 ${i === activeIdx ? 'text-white' : 'text-white/20'}`} />
            <h4 className={`text-sm font-bold tracking-tight transition-colors duration-700 ${i === activeIdx ? 'text-white' : 'text-white/20'}`}>{agent.name}</h4>
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/10 mt-1 font-bold">{agent.role}</p>
          </motion.div>
        ))}
      </div>

      <div className="w-full max-w-xl space-y-6">
        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
           <motion.div 
             initial={{ width: 0 }}
             animate={{ width: `${(activeIdx / agents.length) * 100}%` }}
             transition={{ duration: 1.5, ease: "circOut" }}
             className="h-full bg-white shadow-[0_0_30px_rgba(255,255,255,0.4)]"
           />
        </div>
        <div className="font-mono text-[11px] text-white/20 space-y-2 text-center uppercase tracking-widest">
          <AnimatePresence mode="popLayout">
            {logs.map((log, i) => (
              <motion.div
                key={log + i}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={i === logs.length - 1 ? "text-white/60 font-bold" : ""}
              >
                {log}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
