"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronRight, ArrowRight, CheckCircle2, Layout, Zap, Rocket, Globe, Terminal, Code } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MaterializingWebsite({ isVisible }: { isVisible: boolean }) {
  const [stage, setStage] = useState<"wireframe" | "layout" | "content" | "final">("wireframe");

  useEffect(() => {
    if (!isVisible) return;
    
    const timers = [
      setTimeout(() => setStage("layout"), 1200),
      setTimeout(() => setStage("content"), 2500),
      setTimeout(() => setStage("final"), 4000),
    ];
    
    return () => timers.forEach(clearTimeout);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className={`bg-black min-h-full transition-all duration-[2500ms] relative overflow-hidden ${
      stage === 'wireframe' ? 'grayscale opacity-20 scale-95 blur-xl' : 
      stage === 'layout' ? 'grayscale opacity-50 scale-100 blur-sm' : ''
    }`}>
      {/* PROGRESS HUD */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 z-[200] flex gap-3 pointer-events-none">
         {["Scaffolding", "Node Grid", "Asset Inject", "Final Render"].map((s, i) => (
           <div key={s} className={`px-5 py-2 rounded-full border text-[8px] uppercase tracking-[0.4em] font-bold transition-all duration-1000 ${
             (stage === 'wireframe' && i === 0) || 
             (stage === 'layout' && i <= 1) || 
             (stage === 'content' && i <= 2) || 
             (stage === 'final' && i <= 3)
             ? 'bg-white text-black border-white shadow-[0_0_30px_white]'
             : 'bg-black/60 text-white/10 border-white/5'
           }`}>
             {s}
           </div>
         ))}
      </div>

      {/* CODE SCANLINE OVERLAY */}
      {stage !== 'final' && (
        <div className="absolute inset-0 z-50 pointer-events-none opacity-20 font-mono text-[8px] text-white overflow-hidden p-12 leading-relaxed">
           <pre className="animate-pulse">
             {`SCANNING DNS... [OK]
BUILDING NEURAL GRID... [ACTIVE]
INJECTING DESIGN DNA: minimal-luxury
MAPPING VIEWPORT NODES: 1920x1080
EXECUTING RENDER KERNEL v2.5
STAGING CONTENT CHUNKS...
...
...
`}
           </pre>
        </div>
      )}

      {/* NAVBAR */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 1.5 }}
        className="p-10 flex justify-between items-center border-b border-white/5 bg-black/40 backdrop-blur-3xl"
      >
         <div className="text-3xl font-headline italic tracking-tighter flex items-center gap-4">
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center">
               <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
            </div>
            STARTUP
         </div>
         <div className="flex gap-12 text-[10px] uppercase tracking-[0.6em] font-bold text-white/20">
            {['Vision', 'Technology', 'Connect'].map(item => (
              <span key={item} className="hover:text-white cursor-pointer transition-colors">
                {item}
              </span>
            ))}
         </div>
      </motion.nav>

      {/* HERO SECTION */}
      <section className="px-24 py-64 space-y-24 text-center relative">
         <motion.div 
           initial={{ opacity: 0 }}
           animate={{ opacity: stage === 'final' ? 1 : 0.1 }}
           transition={{ duration: 4 }}
           className="absolute top-0 left-1/2 -translate-x-1/2 w-[1400px] h-[700px] bg-white/[0.03] blur-[250px] rounded-full pointer-events-none" 
         />
         
         <div className="space-y-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-5 px-10 py-4 rounded-full border border-white/5 bg-white/[0.03] text-[10px] uppercase tracking-[0.8em] font-bold text-white/40"
            >
              Neural Intelligence Protocol
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 2.5 }}
              className="text-[12rem] font-headline italic leading-[0.75] tracking-tighter text-white"
            >
              Future <br /> <em className="not-italic text-white/5 italic">Materialized.</em>
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 3 }}
              className="text-4xl text-white/20 max-w-5xl mx-auto font-light leading-relaxed italic"
            >
              Constructing the next generation of industrial intelligence through neural node mapping and predictive logistics.
            </motion.p>
         </div>

         <motion.div
           initial={{ opacity: 0, y: 50 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 3 }}
           className="flex justify-center gap-8"
         >
           <Button className="bg-white text-black px-24 h-24 rounded-full font-bold text-2xl hover:scale-105 transition-all shadow-[0_0_100px_white]">
              Begin Transit <ArrowRight className="ml-6 w-10 h-10" />
           </Button>
         </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="p-32 border-t border-white/5 text-center bg-white/[0.01]">
         <div className="text-[11px] font-bold uppercase tracking-[1.5em] text-white/5 mb-6">Neural Construct v2.5 Stable</div>
         <p className="text-[9px] text-white/10 uppercase tracking-[0.8em] italic">FounderOS Intelligence Layer - Active Materialization</p>
      </footer>
    </div>
  );
}
