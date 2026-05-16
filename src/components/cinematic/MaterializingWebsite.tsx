"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronRight, ArrowRight, CheckCircle2, Layout, Zap, Rocket, Globe, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MaterializingWebsite({ isVisible }: { isVisible: boolean }) {
  const [stage, setStage] = useState<"wireframe" | "layout" | "content" | "final">("wireframe");

  useEffect(() => {
    if (!isVisible) return;
    
    const timers = [
      setTimeout(() => setStage("layout"), 1500),
      setTimeout(() => setStage("content"), 3000),
      setTimeout(() => setStage("final"), 4500),
    ];
    
    return () => timers.forEach(clearTimeout);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className={`bg-black min-h-full transition-all duration-[2000ms] relative ${
      stage === 'wireframe' ? 'grayscale opacity-30 scale-95 blur-md' : 
      stage === 'layout' ? 'grayscale opacity-60 scale-100 blur-sm' : ''
    }`}>
      {/* HUD OVERLAY - MATERIALIZATION STATUS */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 z-[100] flex gap-4 pointer-events-none">
         {["Nodes", "Grid", "Assets", "Final"].map((s, i) => (
           <div key={s} className={`px-6 py-2 rounded-full border text-[9px] uppercase tracking-[0.3em] font-bold transition-all duration-1000 ${
             (stage === 'wireframe' && i === 0) || 
             (stage === 'layout' && i <= 1) || 
             (stage === 'content' && i <= 2) || 
             (stage === 'final' && i <= 3)
             ? 'bg-white text-black border-white shadow-[0_0_20px_white]'
             : 'bg-black/40 text-white/10 border-white/5'
           }`}>
             {s}
           </div>
         ))}
      </div>

      {/* NAVBAR */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1.5 }}
        className="p-10 flex justify-between items-center border-b border-white/5 bg-black/40 backdrop-blur-xl"
      >
         <div className="text-3xl font-headline italic tracking-tighter flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border-2 border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.1)]" />
            NEXUS
         </div>
         <div className="flex gap-12 text-[10px] uppercase tracking-[0.5em] font-bold text-white/20">
            {['Neural', 'Systems', 'Access'].map(item => (
              <span key={item} className="hover:text-white cursor-pointer transition-colors relative group">
                {item}
                <div className="absolute -bottom-2 left-0 w-0 h-px bg-white group-hover:w-full transition-all" />
              </span>
            ))}
         </div>
      </motion.nav>

      {/* HERO SECTION */}
      <section className="px-24 py-56 space-y-20 text-center relative overflow-hidden">
         <motion.div 
           initial={{ opacity: 0 }}
           animate={{ opacity: stage === 'final' ? 1 : 0.2 }}
           transition={{ duration: 3 }}
           className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-white/[0.03] blur-[200px] rounded-full pointer-events-none" 
         />
         
         <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 }}
              className="inline-flex items-center gap-4 px-8 py-3 rounded-full border border-white/5 bg-white/[0.02] text-[10px] uppercase tracking-[0.6em] font-bold text-white/40"
            >
              <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
              Autonomous Supply Chain Protocol
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 2 }}
              className="text-[10rem] font-headline italic leading-[0.8] tracking-tight text-white"
            >
              Quiet <br /> <em className="not-italic text-white/10">Precision.</em>
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 2.5 }}
              className="text-3xl text-white/30 max-w-4xl mx-auto font-light leading-relaxed"
            >
              Redefining the architecture of global transit through neural node mapping and predictive logistics.
            </motion.p>
         </div>

         <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ delay: 2.5 }}
           className="flex justify-center gap-6"
         >
           <Button className="bg-white text-black px-20 h-24 rounded-full font-bold text-2xl hover:scale-105 transition-all shadow-[0_0_50px_white]">
              Initialize Network <ArrowRight className="ml-4 w-8 h-8" />
           </Button>
         </motion.div>
      </section>

      {/* BENTO GRID (THE DESIGN SYSTEM FRAGMENT) */}
      <section className="px-24 pb-64">
         <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3 }}
              className="md:col-span-2 aspect-[16/10] liquid-glass rounded-[64px] border border-white/5 p-16 flex flex-col justify-end gap-6 group hover:border-white/20 transition-all"
            >
              <Terminal className="w-10 h-10 text-white/20 mb-auto" />
              <h4 className="text-5xl font-bold text-white">Neural Routing</h4>
              <p className="text-xl text-white/20">Self-correcting transit nodes across 40+ global ports.</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.2 }}
              className="aspect-square liquid-glass rounded-[64px] border border-white/5 p-12 flex flex-col items-center justify-center text-center gap-6 group hover:border-white/20 transition-all bg-white text-black"
            >
              <Globe className="w-12 h-12" />
              <div className="text-4xl font-bold">24/7</div>
              <p className="text-xs font-bold uppercase tracking-widest opacity-60">Global Sync</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.4 }}
              className="aspect-square liquid-glass rounded-[64px] border border-white/5 p-12 flex flex-col items-center justify-center text-center gap-6 group hover:border-white/20 transition-all"
            >
              <Zap className="w-12 h-12 text-white/40" />
              <div className="text-4xl font-bold text-white">0.4s</div>
              <p className="text-xs font-bold uppercase tracking-widest text-white/20">Latency</p>
            </motion.div>
         </div>
      </section>

      {/* FOOTER MATERIALIZATION */}
      <footer className="p-24 border-t border-white/5 text-center space-y-10">
         <div className="text-[10px] font-bold uppercase tracking-[1em] text-white/10">Architecture Finalized</div>
         <p className="text-[9px] text-white/5 uppercase tracking-[0.5em]">Neural materialization protocol v2.5 Stable Output</p>
      </footer>
    </div>
  );
}
