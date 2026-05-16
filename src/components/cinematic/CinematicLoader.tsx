
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Cpu, Palette, Layout, Search, Zap, Rocket, Shield } from "lucide-react";

const agents = [
  { id: "sentinel", name: "Sentinel", role: "Neural Scanner", icon: Search },
  { id: "forge", name: "Forge", role: "Brand Architect", icon: Palette },
  { id: "atlas", name: "Atlas", role: "UI Orchestrator", icon: Layout },
  { id: "oracle", name: "Oracle", role: "Logic Validator", icon: Shield },
  { id: "launch", name: "Launch", role: "Neural Deployer", icon: Rocket },
];

const agentMessages = [
  "Analyzing market congestion and neural patterns...",
  "Forging high-contrast visual identity systems...",
  "Materializing layout hierarchy and responsive nodes...",
  "Validating investment potential and conversion scoring...",
  "Finalizing production build and neural deployment..."
];

export const CinematicLoader = ({ onComplete }: { onComplete: () => void }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [logs, setLogs] = useState<string[]>(["Neural link established.", "Bloom kernel booting..."]);

  useEffect(() => {
    if (activeIdx < agents.length) {
      const timer = setTimeout(() => {
        const agent = agents[activeIdx];
        setLogs(prev => [...prev.slice(-4), `[${agent.name.toUpperCase()}] ${agentMessages[activeIdx]}`]);
        setActiveIdx(prev => prev + 1);
      }, 2200);
      return () => clearTimeout(timer);
    } else {
      setTimeout(onComplete, 1500);
    }
  }, [activeIdx, onComplete]);

  return (
    <div className="relative h-screen w-screen flex flex-col items-center justify-center bg-black overflow-hidden p-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.03)_0%,_transparent_70%)]" />
      
      <div className="relative z-10 w-full max-w-6xl">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mb-24"
        >
          <h2 className="text-[10px] uppercase tracking-[0.8em] text-white/20 font-bold mb-4">Neural Materialization in Progress</h2>
          <p className="text-3xl font-headline italic text-white/60">Construction by Bloom Architecture Team</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-32">
          {agents.map((agent, i) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: i <= activeIdx ? 1 : 0.05,
                scale: i === activeIdx ? 1.05 : 1,
                filter: i === activeIdx ? 'blur(0px)' : i > activeIdx ? 'blur(12px)' : 'blur(0px)'
              }}
              className={`liquid-glass p-10 rounded-[40px] border transition-all duration-1000 flex flex-col items-center text-center ${
                i === activeIdx 
                ? 'border-white/20 shadow-[0_0_80px_rgba(255,255,255,0.1)] bg-white/5' 
                : 'border-white/5'
              }`}
            >
              <agent.icon className={`w-12 h-12 mb-8 transition-colors duration-1000 ${i === activeIdx ? 'text-white' : 'text-white/10'}`} />
              <h4 className={`text-xs font-bold tracking-[0.2em] transition-colors duration-1000 ${i === activeIdx ? 'text-white' : 'text-white/20'}`}>{agent.name}</h4>
              <p className="text-[8px] uppercase tracking-[0.4em] text-white/10 mt-2 font-bold">{agent.role}</p>
            </motion.div>
          ))}
        </div>

        <div className="relative w-full max-w-2xl mx-auto space-y-12">
          <div className="h-1 bg-white/5 rounded-full overflow-hidden">
             <motion.div 
               initial={{ width: 0 }}
               animate={{ width: `${((activeIdx + 1) / agents.length) * 100}%` }}
               transition={{ duration: 1.5, ease: "circOut" }}
               className="h-full bg-white shadow-[0_0_40px_rgba(255,255,255,0.8)]"
             />
          </div>
          <div className="font-mono text-[10px] text-white/10 space-y-4 text-center uppercase tracking-[0.4em] h-32 flex flex-col justify-center">
            <AnimatePresence mode="popLayout">
              {logs.map((log, i) => (
                <motion.div
                  key={log + i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={i === logs.length - 1 ? "text-white/50 font-bold" : ""}
                >
                  {log}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
