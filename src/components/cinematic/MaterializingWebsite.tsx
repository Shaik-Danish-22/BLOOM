
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { 
  ArrowRight, 
  Menu, 
  Sparkles, 
  Zap, 
  Shield, 
  Target, 
  Brain, 
  ChevronRight,
  Monitor,
  Rocket,
  ArrowUpRight,
  Box,
  Globe,
  Cpu,
  Layers
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { StartupIdeaOutput } from "@/ai/flows/generate-startup-idea";
import { cn } from "@/lib/utils";
import { BloomLogo } from "@/components/cinematic/BloomLogo";

interface MaterializingWebsiteProps {
  isVisible: boolean;
  data?: StartupIdeaOutput | null;
}

export function MaterializingWebsite({ isVisible, data }: MaterializingWebsiteProps) {
  const [stage, setStage] = useState<"wireframe" | "layout" | "content" | "final">("wireframe");
  const [startupData, setStartupData] = useState<StartupIdeaOutput | null>(data || null);
  const [activePage, setActivePage] = useState<"home" | "features" | "pricing">("home");

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
      setTimeout(() => setStage("layout"), 500),
      setTimeout(() => setStage("content"), 1200),
      setTimeout(() => setStage("final"), 2000),
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
      className={cn(
        "bg-black min-h-full transition-all duration-[1200ms] relative overflow-x-hidden font-body text-white selection:bg-white/20",
        stage === 'wireframe' && "grayscale opacity-10 blur-xl",
        stage === 'layout' && "grayscale opacity-30 blur-sm",
        stage === 'content' && "opacity-80"
      )} 
      style={{ backgroundColor }}
    >
      
      {/* NAVIGATION ORCHESTRATOR */}
      <nav className="fixed top-0 left-0 right-0 z-[200] p-8 lg:px-12 flex justify-between items-center bg-black/40 backdrop-blur-3xl border-b border-white/5">
         <div className="text-2xl font-headline italic tracking-tighter flex items-center gap-4 cursor-pointer" onClick={() => setActivePage('home')}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: accentColor }}>
               <Zap size={14} className="text-black" />
            </div>
            {startupData.forgeBrandArchitect?.companyName || "BLOOM"}
         </div>
         
         <div className="hidden lg:flex items-center gap-12 text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
            <button onClick={() => setActivePage('home')} className={cn("transition-all hover:text-white", activePage === 'home' && "text-white")}>Vision</button>
            <button onClick={() => setActivePage('features')} className={cn("transition-all hover:text-white", activePage === 'features' && "text-white")}>Intelligence</button>
            <button onClick={() => setActivePage('pricing')} className={cn("transition-all hover:text-white", activePage === 'pricing' && "text-white")}>Protocol</button>
         </div>

         <div className="flex items-center gap-6">
            <Button variant="ghost" className="text-[9px] uppercase tracking-widest font-bold text-white/30 hover:text-white">Registry</Button>
            <Button className="rounded-full px-8 h-12 text-[10px] font-bold uppercase tracking-widest text-black transition-all hover:scale-105 active:scale-95" style={{ backgroundColor: accentColor }}>
               Establish Link
            </Button>
         </div>
      </nav>

      <main className="pt-24 min-h-screen">
        <AnimatePresence mode="wait">
          {activePage === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-0"
            >
              {/* HERO */}
              <section className="px-10 py-40 lg:py-64 text-center relative flex flex-col items-center justify-center overflow-hidden min-h-[90vh]">
                 <div className="absolute inset-0 z-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1400px] h-[700px] blur-[300px] rounded-full opacity-20" style={{ backgroundColor: accentColor }} />
                    <div className="absolute inset-0 bg-black/40" />
                 </div>
                 
                 <div className="space-y-12 relative z-10 max-w-7xl">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-white/10 bg-white/[0.03] text-[9px] uppercase tracking-[0.4em] font-bold mx-auto text-white/60"
                    >
                      <Cpu size={14} style={{ color: accentColor }} /> {startupData.forgeBrandArchitect?.neuralTone || "AI-Native Identity"}
                    </motion.div>

                    <h2 className="text-7xl lg:text-[11rem] font-headline italic leading-[0.85] tracking-tighter text-white">
                      {heroSection?.title || "Vision Materialized."}
                    </h2>

                    <p className="text-2xl lg:text-4xl text-white/30 max-w-4xl mx-auto font-light leading-relaxed italic">
                      {heroSection?.subtitle || startupData.forgeBrandArchitect?.tagline}
                    </p>

                    <div className="pt-12 flex flex-col md:flex-row items-center justify-center gap-6">
                      <Button className="px-12 h-20 rounded-full font-bold text-xl transition-all text-black hover:scale-105 active:scale-95 shadow-2xl" style={{ backgroundColor: accentColor }}>
                        {heroSection?.ctaLabel || "Initialize Link"} <ArrowRight className="ml-4" size={24} />
                      </Button>
                      <button className="flex items-center gap-4 text-[11px] uppercase tracking-[0.5em] font-bold text-white/20 hover:text-white transition-all group">
                         See Technical Brief <ChevronRight className="group-hover:translate-x-2 transition-transform" />
                      </button>
                    </div>
                 </div>
              </section>

              {/* STATS / NODES */}
              <section className="px-12 py-32 grid grid-cols-1 md:grid-cols-3 gap-12 border-y border-white/5 bg-black/20">
                 {[
                   { label: "Neural Latency", value: "0.4ms", icon: Zap },
                   { label: "Audit Validation", value: "Verified", icon: Shield },
                   { label: "Global Reach", value: "Infinite", icon: Globe }
                 ].map((stat, i) => (
                   <div key={i} className="flex flex-col items-center text-center space-y-4 p-10 rounded-[3rem] bg-white/[0.01] border border-white/5">
                      <stat.icon size={24} className="text-white/20" />
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase tracking-widest font-bold text-white/20">{stat.label}</span>
                        <p className="text-4xl font-headline italic text-white/90">{stat.value}</p>
                      </div>
                   </div>
                 ))}
              </section>

              {/* PROBLEM / PSYCHOLOGY */}
              {problemSection && (
                <section className="px-12 py-40 bg-black/50 backdrop-blur-3xl relative z-10 overflow-hidden">
                   <div className="absolute top-0 right-0 p-20 opacity-5">
                      <Layers size={400} />
                   </div>
                   <div className="max-w-5xl mx-auto space-y-16 relative">
                      <div className="inline-flex items-center gap-3 text-[#DCFF00]/60 uppercase tracking-[0.4em] text-[10px] font-bold">
                         <Brain size={16} /> Neural Context Analysis
                      </div>
                      <h3 className="text-5xl lg:text-[6rem] font-headline italic tracking-tighter leading-[0.95] text-white/95">
                         {problemSection.title}
                      </h3>
                      <p className="text-2xl lg:text-4xl text-white/30 font-light leading-relaxed italic max-w-4xl">
                         {problemSection.subtitle}
                      </p>
                      <div className="pt-10">
                        <Button variant="outline" className="rounded-full px-10 h-16 border-white/10 text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-white/5 text-white/60">
                          Analyze Performance Gap
                        </Button>
                      </div>
                   </div>
                </section>
              )}
            </motion.div>
          )}

          {activePage === 'features' && (
            <motion.div
              key="features"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="px-12 py-40"
            >
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32">
                 <div className="space-y-12">
                    <div className="space-y-6">
                      <span className="text-[11px] uppercase tracking-[0.5em] font-bold text-white/20">Operational DNA</span>
                      <h3 className="text-7xl lg:text-[9rem] font-headline italic tracking-tighter leading-[0.85] text-white">The Core Engine.</h3>
                    </div>
                    <p className="text-3xl text-white/25 font-light italic leading-relaxed max-w-lg">
                       Our intelligence architecture is designed for the high-end orchestrator. Every node is optimized for the extraordinary.
                    </p>
                    <div className="pt-12">
                       <Button className="h-16 px-12 rounded-full font-bold uppercase tracking-widest text-black" style={{ backgroundColor: accentColor }}>
                          View Technical Specs
                       </Button>
                    </div>
                 </div>

                 <div className="space-y-8">
                    {featuresSection?.items?.map((item, i) => (
                      <motion.div 
                        key={i} 
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-12 rounded-[3.5rem] border border-white/5 bg-white/[0.01] flex items-start gap-10 group hover:bg-white/[0.03] transition-all cursor-pointer"
                      >
                         <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 font-bold text-lg text-black shadow-lg transition-transform group-hover:scale-110" style={{ backgroundColor: accentColor }}>
                            0{i + 1}
                         </div>
                         <div className="space-y-3">
                            <h4 className="text-2xl font-headline italic text-white/80 group-hover:text-white transition-colors">{item}</h4>
                            <p className="text-sm text-white/20 uppercase tracking-widest font-bold group-hover:text-white/40 transition-colors">Neural Integrated</p>
                         </div>
                      </motion.div>
                    ))}
                 </div>
              </div>
            </motion.div>
          )}

          {activePage === 'pricing' && (
            <motion.div
              key="pricing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="px-12 py-40 text-center"
            >
               <div className="max-w-4xl mx-auto space-y-16">
                  <div className="space-y-6">
                    <span className="text-[11px] uppercase tracking-[0.5em] font-bold text-white/20">Access Protocol</span>
                    <h3 className="text-7xl lg:text-[8rem] font-headline italic tracking-tighter leading-none">Scale your Vision.</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                     <div className="p-16 rounded-[4rem] border border-white/5 bg-white/[0.01] space-y-10 text-left group hover:bg-white/[0.03] transition-all">
                        <div className="space-y-4">
                           <h4 className="text-3xl font-headline italic">Visionary</h4>
                           <p className="text-6xl font-headline italic text-[#DCFF00]">$49<span className="text-xl text-white/10 ml-2">/mo</span></p>
                        </div>
                        <ul className="space-y-4 text-[11px] uppercase tracking-widest font-bold text-white/30">
                           <li className="flex items-center gap-3"><Zap size={12} className="text-[#DCFF00]" /> 10 Neural Links</li>
                           <li className="flex items-center gap-3"><Zap size={12} className="text-[#DCFF00]" /> Design DNA Registry</li>
                           <li className="flex items-center gap-3"><Zap size={12} className="text-[#DCFF00]" /> Standard Oracle Score</li>
                        </ul>
                        <Button className="w-full h-16 rounded-full bg-white/5 border border-white/10 text-white font-bold uppercase tracking-widest hover:bg-white/10">Initialize Plan</Button>
                     </div>
                     <div className="p-16 rounded-[4rem] border border-[#DCFF00]/20 bg-[#DCFF00]/5 space-y-10 text-left relative overflow-hidden group">
                        <div className="absolute top-8 right-8 text-[9px] uppercase tracking-widest font-bold text-[#DCFF00] px-3 py-1 bg-[#DCFF00]/10 rounded-full">Most Orchestrated</div>
                        <div className="space-y-4">
                           <h4 className="text-3xl font-headline italic">Architect</h4>
                           <p className="text-6xl font-headline italic text-[#DCFF00]">$149<span className="text-xl text-white/10 ml-2">/mo</span></p>
                        </div>
                        <ul className="space-y-4 text-[11px] uppercase tracking-widest font-bold text-white/30">
                           <li className="flex items-center gap-3"><Zap size={12} className="text-[#DCFF00]" /> Unlimited Links</li>
                           <li className="flex items-center gap-3"><Zap size={12} className="text-[#DCFF00]" /> Shark Intelligence Layer</li>
                           <li className="flex items-center gap-3"><Zap size={12} className="text-[#DCFF00]" /> Anti-Slop Validation</li>
                        </ul>
                        <Button className="w-full h-16 rounded-full bg-[#DCFF00] text-black font-bold uppercase tracking-widest shadow-2xl transition-transform group-hover:scale-105">Orchestrate Team</Button>
                     </div>
                  </div>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* FOOTER */}
      <footer className="p-20 lg:p-40 border-t border-white/5 text-center bg-black relative z-10">
         <div className="max-w-7xl mx-auto flex flex-col items-center space-y-12">
            <BloomLogo size={64} animate={false} />
            <div className="text-[12px] font-bold uppercase tracking-[1.2em] text-white/5">BLOOM NEURAL FACTORY</div>
            <div className="flex gap-12 text-[9px] uppercase tracking-[0.5em] font-bold text-white/20">
               <button className="hover:text-white transition-colors">Compliance</button>
               <button className="hover:text-white transition-colors">Governance</button>
               <button className="hover:text-white transition-colors">Privacy Node</button>
            </div>
            <p className="text-[10px] text-white/10 uppercase tracking-widest italic pt-12">Experience build v2.5 Stable // Anti-Slop Validated</p>
         </div>
      </footer>
    </div>
  );
}
