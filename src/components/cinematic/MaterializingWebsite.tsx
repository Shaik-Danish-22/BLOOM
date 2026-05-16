
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowRight, Menu, Sparkles, Zap, Shield, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StartupIdeaOutput } from "@/ai/flows/generate-startup-idea";

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
      setTimeout(() => setStage("layout"), 400),
      setTimeout(() => setStage("content"), 1000),
      setTimeout(() => setStage("final"), 1600),
    ];
    return () => timers.forEach(clearTimeout);
  }, [isVisible]);

  if (!isVisible || !startupData) return null;

  const sections = startupData.websiteContent?.sections || [];
  const heroSection = sections.find(s => s.type === 'hero');
  const problemSection = sections.find(s => s.type === 'problem');
  const featuresSection = sections.find(s => s.type === 'features');
  const palette = startupData.websiteContent?.colorPalette || ["#DCFF00", "#FFFFFF", "#000000"];

  // Determine accent color (usually the first generated color)
  const accentColor = palette[0];
  const secondaryColor = palette[1] || palette[0];

  return (
    <div className={`bg-black min-h-full transition-all duration-[1500ms] relative overflow-hidden font-body text-white ${
      stage === 'wireframe' ? 'grayscale opacity-10 blur-xl' : 
      stage === 'layout' ? 'grayscale opacity-40 blur-sm' : ''
    }`} style={{ backgroundColor: palette[2] || '#000000' }}>
      
      {/* HUD INDICATORS */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-[200] flex gap-2 pointer-events-none">
         {["SCAFFOLD", "NODE", "INJECT", "RENDER"].map((s, i) => (
           <div key={s} className={`px-4 py-1.5 rounded-full border text-[8px] uppercase tracking-widest font-bold transition-all duration-700 ${
             (stage === 'wireframe' && i === 0) || 
             (stage === 'layout' && i <= 1) || 
             (stage === 'content' && i <= 2) || 
             (stage === 'final' && i <= 3)
             ? 'text-black border-transparent shadow-[0_0_20px_rgba(220,255,0,0.5)]'
             : 'bg-black/60 text-white/10 border-white/5'
           }`} style={{ 
             backgroundColor: ((stage === 'wireframe' && i === 0) || (stage === 'layout' && i <= 1) || (stage === 'content' && i <= 2) || (stage === 'final' && i <= 3)) ? accentColor : 'transparent' 
           }}>
             {s}
           </div>
         ))}
      </div>

      {/* NAVBAR */}
      <motion.nav 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-8 lg:p-10 flex justify-between items-center bg-black/40 backdrop-blur-3xl border-b border-white/5"
      >
         <div className="text-2xl font-headline italic tracking-tighter flex items-center gap-4">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: accentColor }}>
               <Zap size={14} className="text-black" />
            </div>
            {startupData.forgeBrandArchitect?.companyName || "STARTUP"}
         </div>
         <div className="hidden lg:flex items-center gap-10 text-[10px] font-bold uppercase tracking-widest text-white/40">
            <button className="hover:text-white transition-colors">Vision</button>
            <button className="hover:text-white transition-colors">Method</button>
            <button className="hover:text-white transition-colors">Manifesto</button>
         </div>
         <Button variant="ghost" className="rounded-full w-10 h-10 p-0 text-white/40 hover:text-white hover:bg-white/5">
            <Menu size={18} />
         </Button>
      </motion.nav>

      {/* HERO */}
      <section className="px-10 py-32 lg:py-56 text-center relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
         <motion.div 
           initial={{ opacity: 0 }}
           animate={{ opacity: stage === 'final' ? 1 : 0.05 }}
           transition={{ duration: 3 }}
           className="absolute inset-0 z-0 pointer-events-none"
         >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[600px] blur-[200px] rounded-full opacity-20" style={{ backgroundColor: accentColor }} />
            <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-10 grayscale scale-110">
               <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260419_065931_e3ca7b53-d32e-4ad5-81de-dc9d6fcfda6d.mp4" type="video/mp4" />
            </video>
         </motion.div>
         
         <div className="space-y-10 relative z-10 max-w-5xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-white/10 bg-white/[0.02] text-[9px] uppercase tracking-widest font-bold"
              style={{ color: secondaryColor }}
            >
              <Sparkles size={12} /> {startupData.forgeBrandArchitect?.neuralTone || "Neural Protocol"}
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="text-6xl lg:text-9xl font-headline italic leading-[0.95] tracking-tighter text-white"
            >
              {heroSection?.title || "Axiom Neural Engine"}
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1.5 }}
              className="text-xl lg:text-3xl text-white/30 max-w-3xl mx-auto font-light leading-relaxed italic"
            >
              {heroSection?.subtitle || startupData.forgeBrandArchitect?.tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="pt-8"
            >
              <Button className="px-12 h-16 rounded-full font-bold text-lg shadow-[0_0_50px_rgba(255,255,255,0.1)] hover:scale-105 transition-all text-black" style={{ backgroundColor: accentColor }}>
                {heroSection?.ctaLabel || "Initialize Vision"} <ArrowRight className="ml-3" />
              </Button>
            </motion.div>
         </div>
      </section>

      {/* PROBLEM / SOLUTION */}
      {problemSection && (
        <section className="px-10 py-32 border-t border-white/5" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
           <div className="max-w-4xl mx-auto space-y-12">
              <div className="inline-flex items-center gap-2 opacity-40 uppercase tracking-[0.3em] text-[10px] font-bold" style={{ color: accentColor }}>
                 <Shield size={14} /> Logic Validation
              </div>
              <h3 className="text-4xl lg:text-6xl font-headline italic tracking-tighter leading-tight">
                 {problemSection.title}
              </h3>
              <p className="text-xl lg:text-2xl text-white/40 font-light leading-relaxed italic">
                 {problemSection.subtitle}
              </p>
           </div>
        </section>
      )}

      {/* FEATURES */}
      {featuresSection && (
        <section className="px-10 py-40 border-t border-white/5">
           <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
              <div className="space-y-8">
                 <h3 className="text-5xl lg:text-8xl font-headline italic tracking-tighter leading-none">{featuresSection.title}</h3>
                 <p className="text-2xl text-white/20 font-light italic leading-relaxed">{featuresSection.subtitle}</p>
              </div>
              <div className="space-y-6">
                 {featuresSection.items?.map((item, i) => (
                   <motion.div 
                     key={i} 
                     initial={{ opacity: 0, x: 20 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true }}
                     transition={{ delay: i * 0.1 }}
                     className="p-8 rounded-[2rem] border border-white/5 bg-white/[0.01] flex items-start gap-6 group hover:bg-white/[0.03] transition-all cursor-pointer"
                   >
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 font-bold text-xs text-black shadow-[0_0_15px_rgba(255,255,255,0.1)]" style={{ backgroundColor: accentColor }}>
                         {i + 1}
                      </div>
                      <div>
                        <p className="text-xl font-light italic text-white/50 group-hover:text-white transition-colors">{item}</p>
                      </div>
                   </motion.div>
                 ))}
              </div>
           </div>
        </section>
      )}

      {/* FOOTER */}
      <footer className="p-32 border-t border-white/5 text-center bg-black">
         <div className="text-[10px] font-bold uppercase tracking-[1em] text-white/5 mb-8">Bloom Neural Ecosystem</div>
         <p className="text-[9px] text-white/10 uppercase tracking-widest italic">Bloom Architecture v2.5 Stable Build</p>
      </footer>
    </div>
  );
}
