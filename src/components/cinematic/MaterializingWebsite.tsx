"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StartupIdeaOutput } from "@/ai/flows/generate-startup-idea";

export function MaterializingWebsite({ isVisible }: { isVisible: boolean }) {
  const [stage, setStage] = useState<"wireframe" | "layout" | "content" | "final">("wireframe");
  const [startupData, setStartupData] = useState<StartupIdeaOutput | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("latest_startup");
    if (stored) setStartupData(JSON.parse(stored));

    if (!isVisible) return;
    const timers = [
      setTimeout(() => setStage("layout"), 1000),
      setTimeout(() => setStage("content"), 2200),
      setTimeout(() => setStage("final"), 3500),
    ];
    return () => timers.forEach(clearTimeout);
  }, [isVisible]);

  if (!isVisible || !startupData) return null;

  const heroSection = startupData.websiteContent.sections.find(s => s.type === 'hero');
  const featuresSection = startupData.websiteContent.sections.find(s => s.type === 'features');

  return (
    <div className={`bg-black min-h-full transition-all duration-[3000ms] relative overflow-hidden ${
      stage === 'wireframe' ? 'grayscale opacity-10 scale-95 blur-2xl' : 
      stage === 'layout' ? 'grayscale opacity-40 scale-100 blur-md' : ''
    }`}>
      {/* PROGRESS HUD */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 z-[200] flex gap-4 pointer-events-none">
         {["SCAFFOLD", "NODE GRID", "INJECT", "RENDER"].map((s, i) => (
           <div key={s} className={`px-6 py-2.5 rounded-full border text-[9px] uppercase tracking-[0.4em] font-bold transition-all duration-1000 ${
             (stage === 'wireframe' && i === 0) || 
             (stage === 'layout' && i <= 1) || 
             (stage === 'content' && i <= 2) || 
             (stage === 'final' && i <= 3)
             ? 'bg-white text-black border-white shadow-[0_0_40px_white]'
             : 'bg-black/60 text-white/10 border-white/5'
           }`}>
             {s}
           </div>
         ))}
      </div>

      {/* NAVBAR */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 1.5 }}
        className="p-12 flex justify-between items-center bg-black/40 backdrop-blur-3xl"
      >
         <div className="text-4xl font-headline italic tracking-tighter flex items-center gap-6">
            <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center">
               <div className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
            </div>
            {startupData.forgeBrandArchitect.companyName.toUpperCase()}
         </div>
         <div className="flex gap-16 text-[10px] uppercase tracking-[0.8em] font-bold text-white/20">
            {['VISION', 'TECH', 'LINK'].map(item => (
              <span key={item} className="hover:text-white cursor-pointer transition-colors">
                {item}
              </span>
            ))}
         </div>
      </motion.nav>

      {/* HERO SECTION */}
      <section className="px-24 py-72 space-y-24 text-center relative min-h-screen flex flex-col items-center justify-center">
         <motion.div 
           initial={{ opacity: 0 }}
           animate={{ opacity: stage === 'final' ? 1 : 0.05 }}
           transition={{ duration: 4 }}
           className="absolute top-0 left-1/2 -translate-x-1/2 w-[1600px] h-[800px] bg-white/[0.03] blur-[300px] rounded-full pointer-events-none" 
         />
         
         <div className="space-y-20 relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-6 px-12 py-5 rounded-full border border-white/5 bg-white/[0.02] text-[11px] uppercase tracking-[1em] font-bold text-white/30"
            >
              Protocol Active
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 2.5 }}
              className="text-[12rem] font-headline italic leading-[0.8] tracking-tighter text-white"
            >
              {heroSection?.title || "Neural Materialized"}
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 3 }}
              className="text-4xl text-white/20 max-w-6xl mx-auto font-light leading-relaxed italic"
            >
              {heroSection?.subtitle || startupData.forgeBrandArchitect.tagline}
            </motion.p>
         </div>

         <motion.div
           initial={{ opacity: 0, y: 50 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 3 }}
           className="flex justify-center pt-20"
         >
           <Button className="bg-white text-black px-32 h-28 rounded-full font-bold text-3xl hover:scale-105 transition-all shadow-[0_0_120px_white]">
              Launch Prototype <ArrowRight className="ml-8 w-12 h-12" />
           </Button>
         </motion.div>
      </section>

      {/* FEATURES SECTION */}
      {featuresSection && (
        <section className="px-24 py-40 border-t border-white/5 bg-black/40">
           <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-24">
              <div className="space-y-12">
                 <h3 className="text-7xl font-headline italic tracking-tighter">{featuresSection.title}</h3>
                 <p className="text-2xl text-white/40 font-light italic">{featuresSection.subtitle}</p>
              </div>
              <div className="grid grid-cols-1 gap-12">
                 {featuresSection.items?.map((item, i) => (
                   <div key={i} className="p-12 rounded-[40px] border border-white/5 bg-white/[0.02] flex items-start gap-8 group hover:border-white/20 transition-all">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center shrink-0">
                         <CheckCircle2 className="text-white/20 group-hover:text-white transition-colors" />
                      </div>
                      <p className="text-2xl font-light italic text-white/60 group-hover:text-white transition-colors">{item}</p>
                   </div>
                 ))}
              </div>
           </div>
        </section>
      )}

      {/* FOOTER */}
      <footer className="p-40 border-t border-white/5 text-center bg-white/[0.01]">
         <div className="text-[12px] font-bold uppercase tracking-[2em] text-white/5 mb-8">FounderOS Intelligence v2.5 Stable</div>
         <p className="text-[10px] text-white/10 uppercase tracking-[1em] italic">Neural Construct - Materialized with SCISSOR</p>
      </footer>
    </div>
  );
}
