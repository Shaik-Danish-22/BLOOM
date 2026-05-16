"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronRight, ArrowRight, CheckCircle2, Layout, Zap, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MaterializingWebsite({ isVisible }: { isVisible: boolean }) {
  const [stage, setStage] = useState<"wireframe" | "layout" | "content" | "final">("wireframe");

  useEffect(() => {
    if (!isVisible) return;
    
    const timers = [
      setTimeout(() => setStage("layout"), 1000),
      setTimeout(() => setStage("content"), 2000),
      setTimeout(() => setStage("final"), 3000),
    ];
    
    return () => timers.forEach(clearTimeout);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className={`bg-black min-h-full transition-all duration-1000 ${stage === 'wireframe' ? 'grayscale opacity-30 scale-95 blur-sm' : ''}`}>
      {/* HUD OVERLAY - MATERIALIZATION STATUS */}
      <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] flex gap-4 pointer-events-none">
         {["Wireframe", "Layout", "Content", "Render"].map((s, i) => (
           <div key={s} className={`px-4 py-1.5 rounded-full border text-[8px] uppercase tracking-widest font-bold transition-all duration-500 ${
             stage === s.toLowerCase() || (stage === 'final' && i < 4)
             ? 'bg-white text-black border-white'
             : 'bg-black/40 text-white/20 border-white/5'
           }`}>
             {s}
           </div>
         ))}
      </div>

      {/* NAVBAR */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="p-10 flex justify-between items-center border-b border-white/5"
      >
         <div className="text-2xl font-bold tracking-tighter flex items-center gap-2">
            <div className="w-6 h-6 rounded-full border border-white/40 shadow-[0_0_10px_rgba(255,255,255,0.2)]" />
            MATERIAL
         </div>
         <div className="flex gap-10 text-[10px] uppercase tracking-[0.4em] font-bold text-white/20">
            <span className="hover:text-white cursor-pointer transition-colors">Neural</span>
            <span className="hover:text-white cursor-pointer transition-colors">Protocols</span>
            <span className="hover:text-white cursor-pointer transition-colors">Access</span>
         </div>
      </motion.nav>

      {/* HERO SECTION */}
      <section className="px-20 py-48 space-y-16 text-center relative overflow-hidden">
         <motion.div 
           initial={{ opacity: 0 }}
           animate={{ opacity: stage === 'final' ? 1 : 0.2 }}
           transition={{ duration: 2 }}
           className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-white/[0.03] blur-[150px] rounded-full pointer-events-none" 
         />
         
         <div className="space-y-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 }}
              className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-white/5 bg-white/[0.02] text-[10px] uppercase tracking-[0.5em] font-bold text-white/30"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              Neural Logistics Protocol v4
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 1.5 }}
              className="text-9xl font-headline italic leading-[0.85] tracking-tight text-white"
            >
              Beyond the <br /> <em className="not-italic text-white/20">Horizon.</em>
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 2 }}
              className="text-2xl text-white/20 max-w-3xl mx-auto font-light leading-relaxed"
            >
              Orchestrating the future of autonomous supply chains through <br />
              neural-mapped transit nodes and real-time efficiency protocols.
            </motion.p>
         </div>

         <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ delay: 2 }}
         >
           <Button className="bg-white text-black px-16 h-20 rounded-full font-bold text-xl hover:scale-105 transition-all shadow-2xl">
              Initialize Transit <ArrowRight className="ml-3 w-6 h-6" />
           </Button>
         </motion.div>
      </section>

      {/* FEATURES GRID */}
      <section className="px-20 pb-48">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Predictive Nodes", desc: "Autonomous rerouting before friction occurs." },
              { title: "Quantum Sync", desc: "Global visibility across every neural transit node." },
              { title: "Edge Logic", desc: "Self-correcting protocols for complex logistics." }
            ].map((card, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.5 + (idx * 0.2), duration: 1.2 }}
                className="aspect-[4/5] liquid-glass rounded-[56px] border border-white/5 p-16 flex flex-col justify-end gap-6 group cursor-pointer hover:border-white/20 transition-all"
              >
                 <div className="w-16 h-16 rounded-[28px] border border-white/10 flex items-center justify-center mb-auto group-hover:bg-white/5 transition-colors">
                    <Zap className="w-6 h-6 text-white/20 group-hover:text-white" />
                 </div>
                 <h4 className="text-4xl font-bold tracking-tight text-white leading-tight">{card.title}</h4>
                 <p className="text-lg text-white/10 leading-relaxed font-light">{card.desc}</p>
              </motion.div>
            ))}
         </div>
      </section>

      {/* FOOTER MATERIALIZATION */}
      <footer className="p-20 border-t border-white/5 text-center space-y-8">
         <div className="text-sm font-bold uppercase tracking-[0.8em] text-white/10">Material Logistics — Finalized</div>
         <p className="text-xs text-white/5 uppercase tracking-[0.4em]">Neural Materialization Session v2.5 Stable Output</p>
      </footer>
    </div>
  );
}