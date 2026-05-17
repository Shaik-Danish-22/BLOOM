
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Activity, Palette, Layers, Brain } from "lucide-react";
import MountainVistaParallax from "@/components/ui/mountain-vista-bg";
import { BloomLogo } from "@/components/cinematic/BloomLogo";

const agents = [
  { label: "Neural Pacing", icon: Activity, desc: "Synchronizing motion tokens" },
  { label: "Visual Tokenization", icon: Palette, desc: "Deriving high-contrast hierarchy" },
  { label: "Hierarchy Validation", icon: Layers, desc: "Anti-slop logic processing" },
  { label: "Prompt Reasoning", icon: Brain, desc: "DeepSeek-V3 intent analysis" }
];

export const CinematicLoader = ({ onComplete }: { onComplete: () => void }) => {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    if (activeIdx < agents.length) {
      const timer = setTimeout(() => {
        setActiveIdx(prev => prev + 1);
      }, 1800);
      return () => clearTimeout(timer);
    } else {
      setTimeout(onComplete, 1200);
    }
  }, [activeIdx, onComplete]);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black">
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0">
        <MountainVistaParallax />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
      </div>

      <div className="relative z-10 h-full w-full flex flex-col items-center justify-center p-12">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-12"
        >
          <BloomLogo size={120} />
        </motion.div>

        <div className="text-center mb-20 space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-headline italic text-white tracking-tighter text-glow"
          >
            Orchestrating Experience...
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            className="text-[#DCFF00] uppercase tracking-[0.8em] text-[12px] font-bold"
          >
            FounderOS Intelligence Core Active
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
          {agents.map((node, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ 
                opacity: i <= activeIdx ? 1 : 0.2, 
                y: 0,
                scale: i === activeIdx ? 1.05 : 1
              }}
              transition={{ duration: 0.8 }}
              className={`flex items-center gap-6 p-8 rounded-[2.5rem] border transition-all duration-1000 backdrop-blur-3xl shadow-2xl ${
                i === activeIdx 
                ? 'bg-white/15 border-[#DCFF00]/50 ring-1 ring-[#DCFF00]/20' 
                : 'bg-white/5 border-white/10'
              }`}
            >
              <div className={`w-16 h-16 rounded-3xl flex items-center justify-center border transition-all duration-1000 shadow-inner ${
                i === activeIdx ? 'bg-[#DCFF00]/20 border-[#DCFF00]/40' : 'bg-white/5 border-white/10'
              }`}>
                <node.icon size={28} className={i === activeIdx ? 'text-[#DCFF00]' : 'text-white/20'} />
              </div>
              <div className="flex-1">
                <span className="text-[12px] uppercase tracking-[0.2em] font-bold text-white block mb-1">{node.label}</span>
                <span className="text-[10px] text-white/40 italic uppercase tracking-widest">{node.desc}</span>
              </div>
              {i === activeIdx && (
                <div className="w-2 h-2 rounded-full bg-[#DCFF00] animate-ping" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
