
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowRight, Menu, Sparkles, Zap, Shield, Target, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StartupIdeaOutput } from "@/ai/flows/generate-startup-idea";

interface MaterializingWebsiteProps {
  isVisible: boolean;
  data?: StartupIdeaOutput | null;
}

export function MaterializingWebsite({ isVisible, data }: MaterializingWebsiteProps) {
  const [stage, setStage] = useState<"wireframe" | "layout" | "content" | "final">("wireframe");
  const [startupData, setStartupData] = useState<StartupIdeaOutput | null>(data || null);

  useEffect(() => {
    if (data) {
      setStartupData(data);
    } else {
      const stored = localStorage.getItem("latest_startup");
      if (stored) {
        try {
          setStartupData(JSON.parse(stored));
        } catch (e) {
          console.error("Failed to parse startup data", e);
        }
      }
    }

    if (!isVisible) return;
    const timers = [
      setTimeout(() => setStage("layout"), 600),
      setTimeout(() => setStage("content"), 1400),
      setTimeout(() => setStage("final"), 2200),
    ];
    return () => timers.forEach(clearTimeout);
  }, [isVisible, data]);

  if (!isVisible || !startupData) return null;

  const sections = startupData.websiteContent?.sections || [];
  const heroSection = sections.find(s => s.type === 'hero');
  const problemSection = sections.find(s => s.type === 'problem');
  const featuresSection = sections.find(s => s.type === 'features');
  const palette = startupData.websiteContent?.colorPalette || ["#DCFF00", "#FFFFFF", "#000000"];

  const accentColor = palette[0];
  const backgroundColor = palette[2] || "#000000";

  return (
    <div 
      className={`bg-black min-h-full transition-all duration-[1500ms] relative overflow-x-hidden font-body text-white ${
        stage === 'wireframe' ? 'grayscale opacity-10 blur-xl' : 
        stage === 'layout' ? 'grayscale opacity-40 blur-sm' : ''
      }`} 
      style={{ backgroundColor }}
    >
      
      {/* HUD - ORCHESTRATION STATUS */}
      <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[200] flex gap-2 pointer-events-none">
         {["DNA_SCAN", "LOGIC_BUILD", "HIERARCHY", "MATERIALIZE"].map((s, i) => (
           <div key={s} className={`px-4 py-1.5 rounded-full border text-[8px] uppercase tracking-widest font-bold transition-all duration-700 ${
             (stage === 'wireframe' && i === 0) || 
             (stage === 'layout' && i <= 1) || 
             (stage === 'content' && i <= 2) || 
             (stage === 'final' && i <= 3)
             ? 'text-black border-transparent shadow-[0_0_25px_rgba(220,255,0,0.4)]'
             : 'bg-black/80 text-white/5 border-white/5'
           }`} style={{ 
             backgroundColor: ((stage === 'wireframe' && i === 0) || (stage === 'layout' && i <= 1) || (stage === 'content' && i <= 2) || (stage === 'final' && i <= 3)) ? accentColor : 'transparent' 
           }}>
             {s}
           </div>
         ))}
      </div>

      {/* NAVBAR */}
      <nav className="p-8 lg:p-10 flex justify-between items-center bg-black/50 backdrop-blur-3xl border-b border-white/5 relative z-[100]">
         <div className="text-2xl font-headline italic tracking-tighter flex items-center gap-4">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: accentColor }}>
               <Zap size={14} className="text-black" />
            </div>
            {startupData.forgeBrandArchitect?.companyName || "BLOOM"}
         </div>
         <div className="hidden lg:flex items-center gap-10 text-[10px] font-bold uppercase tracking-widest text-white/40">
            <button className="hover:text-white transition-colors">Our Vision</button>
            <button className="hover:text-white transition-colors">Design DNA</button>
            <button className="hover:text-white transition-colors">FounderOS</button>
         </div>
         <Menu size={18} className="text-white/40 cursor-pointer hover:text-white transition-colors" />
      </nav>

      {/* HERO SECTION */}
      <section className="px-10 py-32 lg:py-60 text-center relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
         <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[600px] blur-[250px] rounded-full opacity-20" style={{ backgroundColor: accentColor }} />
            <div className="absolute inset-0 bg-black/40" />
         </div>
         
         <div className="space-y-12 relative z-10 max-w-6xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-3 px-8 py-2.5 rounded-full border border-white/10 bg-white/[0.03] text-[10px] uppercase tracking-widest font-bold mx-auto text-white/60"
            >
              <Sparkles size={14} style={{ color: accentColor }} /> {startupData.forgeBrandArchitect?.neuralTone || "AI-Native Identity"}
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1.2 }}
              className="text-7xl lg:text-[10rem] font-headline italic leading-[0.9] tracking-tighter text-white"
            >
              {heroSection?.title || "Vision Materialized."}
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1.8 }}
              className="text-2xl lg:text-4xl text-white/30 max-w-4xl mx-auto font-light leading-relaxed italic"
            >
              {heroSection?.subtitle || startupData.forgeBrandArchitect?.tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              className="pt-10"
            >
              <Button className="px-14 h-20 rounded-full font-bold text-xl transition-all text-black hover:scale-105 active:scale-95 shadow-2xl" style={{ backgroundColor: accentColor }}>
                {heroSection?.ctaLabel || "Initialize Experience"} <ArrowRight className="ml-4" size={24} />
              </Button>
            </motion.div>
         </div>
      </section>

      {/* PROBLEM SECTION */}
      {problemSection && (
        <section className="px-10 py-40 border-t border-white/5 relative z-10 bg-black/50 backdrop-blur-3xl">
           <div className="max-w-5xl mx-auto space-y-14">
              <div className="inline-flex items-center gap-2 opacity-50 uppercase tracking-[0.4em] text-[11px] font-bold" style={{ color: accentColor }}>
                 <Brain size={16} /> Audience Psychology
              </div>
              <h3 className="text-5xl lg:text-7xl font-headline italic tracking-tighter leading-tight">
                 {problemSection.title}
              </h3>
              <p className="text-2xl lg:text-3xl text-white/40 font-light leading-relaxed italic">
                 {problemSection.subtitle}
              </p>
           </div>
        </section>
      )}

      {/* FEATURES SECTION */}
      {featuresSection && (
        <section className="px-10 py-48 border-t border-white/5 relative z-10">
           <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32">
              <div className="space-y-10">
                 <h3 className="text-6xl lg:text-9xl font-headline italic tracking-tighter leading-none">{featuresSection.title}</h3>
                 <p className="text-3xl text-white/25 font-light italic leading-relaxed">{featuresSection.subtitle}</p>
              </div>
              <div className="space-y-8">
                 {featuresSection.items?.map((item, i) => (
                   <motion.div 
                     key={i} 
                     initial={{ opacity: 0, x: 30 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true }}
                     className="p-10 rounded-[2.5rem] border border-white/5 bg-white/[0.01] flex items-start gap-8 group hover:bg-white/[0.03] transition-all"
                   >
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 font-bold text-sm text-black shadow-lg" style={{ backgroundColor: accentColor }}>
                         {i + 1}
                      </div>
                      <p className="text-2xl font-light italic text-white/40 group-hover:text-white transition-colors">{item}</p>
                   </motion.div>
                 ))}
              </div>
           </div>
        </section>
      )}

      {/* FOOTER */}
      <footer className="p-40 border-t border-white/5 text-center bg-black relative z-10">
         <div className="text-[12px] font-bold uppercase tracking-[1.2em] text-white/5 mb-10">BLOOM NEURAL FACTORY</div>
         <p className="text-[10px] text-white/10 uppercase tracking-widest italic">Experience build v2.5 Stable // Anti-Slop Validated</p>
      </footer>
    </div>
  );
}
