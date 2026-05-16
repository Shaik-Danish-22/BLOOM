
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Cpu, Palette, Layout, Search, Zap, Rocket, Terminal, Command, Shield, Layers } from "lucide-react";

const agents = [
  { id: "sentinel", name: "Sentinel", role: "Market Intelligence", icon: Search },
  { id: "forge", name: "Forge", role: "Brand Architect", icon: Palette },
  { id: "atlas", name: "Atlas", role: "UI Architect", icon: Layout },
  { id: "oracle", name: "Oracle", role: "Investor Analyst", icon: Shield },
  { id: "launch", name: "Launch", role: "Production Engine", icon: Rocket },
];

const agentMessages = [
  "Mapping market congestion and neural patterns...",
  "Forging high-contrast visual identity systems...",
  "Orchestrating layout hierarchy and materialization...",
  "Validating investment potential and conversion logic...",
  "Finalizing production build and neural deployment..."
];

export const CinematicLoader = ({ onComplete }: { onComplete: () => void }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [logs, setLogs] = useState<string[]>(["Neural link established.", "FounderOS kernel booting..."]);

  useEffect(() => {
    if (activeIdx < agents.length) {
      const timer = setTimeout(() => {
        const agent = agents[activeIdx];
        setLogs(prev => [...prev.slice(-4), `[${agent.name}] ${agentMessages[activeIdx]}`]);
        setActiveIdx(prev => prev + 1);
      }, 1800);
      return () => clearTimeout(timer);
    } else {
      setTimeout(onComplete, 1200);
    }
  }, [activeIdx, onComplete]);

  return (
    <div className="relative h-screen w-screen flex flex-col items-center justify-center bg-black overflow-hidden p-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.03)_0%,_transparent_70%)]" />
      
      <div className="relative z-10 grid grid-cols-2 md:grid-cols-5 gap-8 w-full max-w-6xl mb-24">
        {agents.map((agent, i) => (
          <motion.div
            key={agent.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: i < activeIdx ? 1 : i === activeIdx ? 1 : 0.05,
              scale: i === activeIdx ? 1.05 : 1,
              filter: i === activeIdx ? 'blur(0px)' : i > activeIdx ? 'blur(8px)' : 'blur(0px)'
            }}
            className={`liquid-glass p-10 rounded-[40px] border transition-all duration-700 flex flex-col items-center text-center ${
              i === activeIdx 
              ? 'border-white/20 shadow-[0_0_60px_rgba(255,255,255,0.1)] bg-white/5' 
              : 'border-white/5'
            }`}
          >
            <agent.icon className={`w-12 h-12 mb-8 transition-colors duration-700 ${i === activeIdx ? 'text-white' : 'text-white/20'}`} />
            <h4 className={`text-sm font-bold tracking-[0.2em] transition-colors duration-700 ${i === activeIdx ? 'text-white' : 'text-white/20'}`}>{agent.name}</h4>
            <p className="text-[10px] uppercase tracking-[0.4em] text-white/10 mt-2 font-bold">{agent.role}</p>
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 w-full max-w-xl space-y-8">
        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
           <motion.div 
             initial={{ width: 0 }}
             animate={{ width: `${((activeIdx + 1) / agents.length) * 100}%` }}
             transition={{ duration: 1, ease: "circOut" }}
             className="h-full bg-white shadow-[0_0_40px_rgba(255,255,255,0.6)]"
           />
        </div>
        <div className="font-mono text-[11px] text-white/20 space-y-3 text-center uppercase tracking-[0.3em]">
          <AnimatePresence mode="popLayout">
            {logs.map((log, i) => (
              <motion.div
                key={log + i}
                initial={{ opacity: 0, y: 10 }}
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
