
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowRight, CheckCircle2, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StartupIdeaOutput } from "@/ai/flows/generate-startup-idea";
import Image from "next/image";

export function MaterializingWebsite({ isVisible }: { isVisible: boolean }) {
  const [stage, setStage] = useState<"wireframe" | "layout" | "content" | "final">("wireframe");
  const [startupData, setStartupData] = useState<StartupIdeaOutput | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("latest_startup");
    if (stored) {
      try {
        setStartupData(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse startup data", e);
      }
    }

    if (!isVisible) return;
    const timers = [
      setTimeout(() => setStage("layout"), 800),
      setTimeout(() => setStage("content"), 1800),
      setTimeout(() => setStage("final"), 2800),
    ];
    return () => timers.forEach(clearTimeout);
  }, [isVisible]);

  if (!isVisible || !startupData) return null;

  const sections = startupData.websiteContent?.sections || [];
  const heroSection = sections.find(s => s.type === 'hero');
  const featuresSection = sections.find(s => s.type === 'features');

  return (
    <div className={`bg-black min-h-full transition-all duration-[2000ms] relative overflow-hidden font-body ${
      stage === 'wireframe' ? 'grayscale opacity-10 blur-xl' : 
      stage === 'layout' ? 'grayscale opacity-40 blur-sm' : ''
    }`}>
      {/* PROGRESS HUD - DESIGN ROCKET THEME */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-[200] flex gap-2 pointer-events-none">
         {["SCAFFOLD", "NODE", "INJECT", "RENDER"].map((s, i) => (
           <div key={s} className={`px-4 py-1.5 rounded-full border text-[8px] uppercase tracking-widest font-bold transition-all duration-700 ${
             (stage === 'wireframe' && i === 0) || 
             (stage === 'layout' && i <= 1) || 
             (stage === 'content' && i <= 2) || 
             (stage === 'final' && i <= 3)
             ? 'bg-[#DCFF00] text-black border-[#DCFF00] shadow-[0_0_20px_rgba(220,255,0,0.5)]'
             : 'bg-black/60 text-white/10 border-white/5'
           }`}>
             {s}
           </div>
         ))}
      </div>

      {/* NAVBAR */}
      <motion.nav 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-8 lg:p-12 flex justify-between items-center bg-black/40 backdrop-blur-3xl"
      >
         <div className="text-3xl font-headline italic tracking-tighter flex items-center gap-4">
            <div className="w-8 h-8 rounded-lg bg-[#DCFF00] flex items-center justify-center">
               <div className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
            </div>
            {startupData.forgeBrandArchitect?.companyName?.toUpperCase() || "STARTUP"}
         </div>
         <button className="liquid-glass-strong bg-white/5 w-10 h-10 rounded-full flex items-center justify-center">
            <Menu size={18} />
         </button>
      </motion.nav>

      {/* HERO SECTION */}
      <section className="px-12 py-32 lg:py-56 space-y-16 text-center relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
         <motion.div 
           initial={{ opacity: 0 }}
           animate={{ opacity: stage === 'final' ? 1 : 0.05 }}
           transition={{ duration: 3 }}
           className="absolute inset-0 z-0 pointer-events-none"
         >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[600px] bg-[#DCFF00]/[0.05] blur-[200px] rounded-full" />
            <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-20 grayscale">
               <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260419_065931_e3ca7b53-d32e-4ad5-81de-dc9d6fcfda6d.mp4" type="video/mp4" />
            </video>
         </motion.div>
         
         <div className="space-y-10 relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-4 px-8 py-3 rounded-full border border-white/5 bg-white/[0.02] text-[9px] uppercase tracking-widest font-bold text-white/30"
            >
              Neural Construct v2.5 x Microsoft
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1.5 }}
              className="text-6xl lg:text-9xl font-headline italic leading-[0.9] tracking-tighter text-white"
            >
              {heroSection?.title || "Neural Materialized"}
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 2 }}
              className="text-xl lg:text-3xl text-white/20 max-w-4xl mx-auto font-light leading-relaxed italic"
            >
              {heroSection?.subtitle || startupData.forgeBrandArchitect?.tagline || "Visionary Startup Identity"}
            </motion.p>
         </div>

         <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 1.5 }}
           className="relative z-10 pt-10"
         >
           <Button className="liquid-glass-strong bg-[#DCFF00] text-black px-16 h-20 rounded-full font-bold text-xl shadow-[0_0_80px_rgba(220,255,0,0.3)]">
              Explore Vision <ArrowRight className="ml-4 w-6 h-6" />
           </Button>
         </motion.div>
      </section>

      {/* FEATURES SECTION */}
      {featuresSection && (
        <section className="px-12 py-32 border-t border-white/5 bg-black/40">
           <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">
              <div className="space-y-8">
                 <h3 className="text-5xl lg:text-7xl font-headline italic tracking-tighter leading-none">{featuresSection.title}</h3>
                 <p className="text-xl text-white/30 font-light italic">{featuresSection.subtitle}</p>
              </div>
              <div className="grid grid-cols-1 gap-8">
                 {featuresSection.items?.map((item, i) => (
                   <div key={i} className="liquid-glass-strong p-8 rounded-[2rem] border border-white/5 flex items-start gap-6 group hover:bg-[#DCFF00]/[0.02] transition-all">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 font-bold ${stage === 'final' ? 'bg-[#DCFF00] text-black' : 'bg-white/5 text-white/20'}`}>
                         {i + 1}
                      </div>
                      <p className="text-xl font-light italic text-white/60 group-hover:text-white transition-colors">{item}</p>
                   </div>
                 ))}
              </div>
           </div>
        </section>
      )}

      {/* FOOTER */}
      <footer className="p-32 border-t border-white/5 text-center bg-[#080808]">
         <div className="text-[10px] font-bold uppercase tracking-[1em] text-white/5 mb-6">Bloom Engine Stable</div>
         <p className="text-[9px] text-[#83837D] uppercase tracking-widest italic">Microsoft x Design Rocket Neural Architecture</p>
      </footer>
    </div>
  );
}
