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
  Layers,
  ArrowRightCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { OrchestratedStartup } from "@/ai/flows/orchestrate-startup";
import { cn } from "@/lib/utils";
import { BloomLogo } from "@/components/cinematic/BloomLogo";
import { DESIGN_SYSTEMS, DesignSystemTokens } from "@/lib/design-systems";

interface MaterializingWebsiteProps {
  isVisible: boolean;
  data?: OrchestratedStartup | null;
  context?: any;
}

export function MaterializingWebsite({ isVisible, data, context }: MaterializingWebsiteProps) {
  const [stage, setStage] = useState<"wireframe" | "layout" | "content" | "final">("wireframe");
  const [startupData, setStartupData] = useState<OrchestratedStartup | null>(data || null);
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

  const system: DesignSystemTokens = DESIGN_SYSTEMS[(context?.selectedSystem as any) || 'apple'];
  const sections = startupData.content?.sections || [];
  const heroSection = sections.find(s => s.type === 'hero');
  const problemSection = sections.find(s => s.type === 'problem');
  const featuresSection = sections.find(s => s.type === 'features');

  // Motion variants based on intensity
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: system.tokens.motionIntensity === 'high' ? 0.05 : 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <div 
      className={cn(
        "min-h-full transition-all duration-[1200ms] relative overflow-x-hidden",
        stage === 'wireframe' && "grayscale opacity-10 blur-xl",
        stage === 'layout' && "grayscale opacity-30 blur-sm",
        stage === 'content' && "opacity-80"
      )} 
      style={{ 
        backgroundColor: system.tokens.bg,
        color: system.tokens.fg,
        fontFamily: system.tokens.fontBody
      }}
    >
      
      {/* NAVIGATION ORCHESTRATOR */}
      <nav 
        className="fixed top-0 left-0 right-0 z-[200] p-8 lg:px-12 flex justify-between items-center bg-black/40 backdrop-blur-3xl border-b"
        style={{ borderColor: system.tokens.borderSoft }}
      >
         <div 
           className="text-2xl italic tracking-tighter flex items-center gap-4 cursor-pointer" 
           style={{ fontFamily: system.tokens.fontDisplay }}
           onClick={() => setActivePage('home')}
         >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: system.tokens.accent }}>
               <Zap size={14} style={{ color: system.tokens.accentOn }} />
            </div>
            {startupData.brand?.companyName || "BLOOM"}
         </div>
         
         <div className="hidden lg:flex items-center gap-12 text-[10px] font-bold uppercase tracking-[0.3em]" style={{ color: system.tokens.muted }}>
            {['Vision', 'Intelligence', 'Protocol'].map((item, i) => (
              <button 
                key={item}
                onClick={() => setActivePage(i === 0 ? 'home' : i === 1 ? 'features' : 'pricing')}
                className={cn("transition-all hover:text-white", (activePage === 'home' && i === 0) && "text-white")}
                style={{ color: (activePage === (i === 0 ? 'home' : i === 1 ? 'features' : 'pricing')) ? system.tokens.fg : system.tokens.muted }}
              >
                {item}
              </button>
            ))}
         </div>

         <div className="flex items-center gap-6">
            <Button variant="ghost" className="text-[9px] uppercase tracking-widest font-bold" style={{ color: system.tokens.meta }}>Registry</Button>
            <Button 
              className="rounded-full px-8 h-12 text-[10px] font-bold uppercase tracking-widest transition-all hover:scale-105 active:scale-95" 
              style={{ backgroundColor: system.tokens.accent, color: system.tokens.accentOn }}
            >
               Establish Link
            </Button>
         </div>
      </nav>

      <main className="pt-24 min-h-screen">
        <AnimatePresence mode="wait">
          {activePage === 'home' && (
            <motion.div
              key="home"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -20 }}
              className="space-y-0"
            >
              {/* HERO SECTION */}
              <section className="px-10 py-40 lg:py-64 text-center relative flex flex-col items-center justify-center overflow-hidden min-h-[90vh]">
                 <div className="absolute inset-0 z-0">
                    <div 
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1400px] h-[700px] blur-[300px] rounded-full opacity-20" 
                      style={{ backgroundColor: system.tokens.accent }} 
                    />
                    <div className="absolute inset-0 bg-black/40" />
                 </div>
                 
                 <div className="space-y-12 relative z-10 max-w-7xl">
                    <motion.div
                      variants={itemVariants}
                      className="inline-flex items-center gap-3 px-6 py-2 rounded-full border bg-white/[0.03] text-[9px] uppercase tracking-[0.4em] font-bold mx-auto"
                      style={{ borderColor: system.tokens.borderSoft, color: system.tokens.muted }}
                    >
                      <Cpu size={14} style={{ color: system.tokens.accent }} /> {startupData.brand?.tone || "Neural Orchestration"}
                    </motion.div>

                    <motion.h2 
                      variants={itemVariants}
                      className="text-7xl lg:text-[11rem] italic leading-[0.85] tracking-tighter"
                      style={{ fontFamily: system.tokens.fontDisplay, color: system.tokens.fg }}
                    >
                      {heroSection?.title || "Vision Materialized."}
                    </motion.h2>

                    <motion.p 
                      variants={itemVariants}
                      className="text-2xl lg:text-4xl max-w-4xl mx-auto font-light leading-relaxed italic"
                      style={{ color: system.tokens.muted }}
                    >
                      {heroSection?.subtitle || startupData.brand?.tagline}
                    </motion.p>

                    <motion.div variants={itemVariants} className="pt-12 flex flex-col md:flex-row items-center justify-center gap-6">
                      <Button 
                        className="px-12 h-20 rounded-full font-bold text-xl transition-all hover:scale-105 active:scale-95 shadow-2xl" 
                        style={{ backgroundColor: system.tokens.accent, color: system.tokens.accentOn, borderRadius: system.tokens.radiusPill }}
                      >
                        {heroSection?.ctaLabel || "Initialize Link"} <ArrowRight className="ml-4" size={24} />
                      </Button>
                      <button 
                        className="flex items-center gap-4 text-[11px] uppercase tracking-[0.5em] font-bold transition-all group"
                        style={{ color: system.tokens.meta }}
                      >
                         See Technical Brief <ChevronRight className="group-hover:translate-x-2 transition-transform" />
                      </button>
                    </motion.div>
                 </div>
              </section>

              {/* STATS STRIP */}
              <section 
                className="px-12 py-32 grid grid-cols-1 md:grid-cols-3 gap-12 border-y bg-black/20"
                style={{ borderColor: system.tokens.borderSoft }}
              >
                 {[
                   { label: "Neural Latency", value: "0.4ms", icon: Zap },
                   { label: "Audit Validation", value: "Verified", icon: Shield },
                   { label: "Global Reach", value: "Infinite", icon: Globe }
                 ].map((stat, i) => (
                   <motion.div 
                     key={i} 
                     variants={itemVariants}
                     className="flex flex-col items-center text-center space-y-4 p-10 border bg-white/[0.01]"
                     style={{ borderColor: system.tokens.borderSoft, borderRadius: system.tokens.radiusLg }}
                   >
                      <stat.icon size={24} style={{ color: system.tokens.meta }} />
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase tracking-widest font-bold" style={{ color: system.tokens.muted }}>{stat.label}</span>
                        <p className="text-4xl italic" style={{ fontFamily: system.tokens.fontDisplay, color: system.tokens.fg }}>{stat.value}</p>
                      </div>
                   </motion.div>
                 ))}
              </section>

              {/* PROBLEM / SOLUTION SECTION */}
              {problemSection && (
                <section className="px-12 py-40 bg-black/50 backdrop-blur-3xl relative z-10 overflow-hidden">
                   <div className="absolute top-0 right-0 p-20 opacity-5">
                      <Layers size={400} />
                   </div>
                   <div className="max-w-5xl mx-auto space-y-16 relative">
                      <motion.div 
                        variants={itemVariants}
                        className="inline-flex items-center gap-3 uppercase tracking-[0.4em] text-[10px] font-bold"
                        style={{ color: system.tokens.accent }}
                      >
                         <Brain size={16} /> Neural Context Analysis
                      </motion.div>
                      <motion.h3 
                        variants={itemVariants}
                        className="text-5xl lg:text-[6rem] italic tracking-tighter leading-[0.95]"
                        style={{ fontFamily: system.tokens.fontDisplay, color: system.tokens.fg }}
                      >
                         {problemSection.title}
                      </motion.h3>
                      <motion.p 
                        variants={itemVariants}
                        className="text-2xl lg:text-4xl font-light leading-relaxed italic max-w-4xl"
                        style={{ color: system.tokens.muted }}
                      >
                         {problemSection.subtitle}
                      </motion.p>
                      <motion.div variants={itemVariants} className="pt-10">
                        <Button 
                          variant="outline" 
                          className="rounded-full px-10 h-16 text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-white/5"
                          style={{ borderColor: system.tokens.borderSoft, color: system.tokens.muted }}
                        >
                          Analyze Performance Gap
                        </Button>
                      </motion.div>
                   </div>
                </section>
              )}
            </motion.div>
          )}

          {activePage === 'features' && (
            <motion.div
              key="features"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -20 }}
              className="px-12 py-40"
            >
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32">
                 <div className="space-y-12">
                    <div className="space-y-6">
                      <motion.span variants={itemVariants} className="text-[11px] uppercase tracking-[0.5em] font-bold" style={{ color: system.tokens.muted }}>Operational DNA</motion.span>
                      <motion.h3 variants={itemVariants} className="text-7xl lg:text-[9rem] italic tracking-tighter leading-[0.85]" style={{ fontFamily: system.tokens.fontDisplay }}>The Core Engine.</motion.h3>
                    </div>
                    <motion.p variants={itemVariants} className="text-3xl font-light italic leading-relaxed max-w-lg" style={{ color: system.tokens.muted }}>
                       Our intelligence architecture is designed for the high-end orchestrator. Every node is optimized for the extraordinary.
                    </motion.p>
                    <motion.div variants={itemVariants} className="pt-12">
                       <Button 
                         className="h-16 px-12 rounded-full font-bold uppercase tracking-widest"
                         style={{ backgroundColor: system.tokens.accent, color: system.tokens.accentOn }}
                       >
                          View Technical Specs
                       </Button>
                    </motion.div>
                 </div>

                 <div className="space-y-8">
                    {featuresSection?.items?.map((item, i) => (
                      <motion.div 
                        key={i} 
                        variants={itemVariants}
                        className="p-12 border bg-white/[0.01] flex items-start gap-10 group hover:bg-white/[0.03] transition-all cursor-pointer"
                        style={{ borderColor: system.tokens.borderSoft, borderRadius: system.tokens.radiusLg }}
                      >
                         <div 
                           className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 font-bold text-lg transition-transform group-hover:scale-110 shadow-lg" 
                           style={{ backgroundColor: system.tokens.accent, color: system.tokens.accentOn }}
                         >
                            0{i + 1}
                         </div>
                         <div className="space-y-3">
                            <h4 className="text-2xl italic opacity-80 group-hover:opacity-100 transition-opacity" style={{ fontFamily: system.tokens.fontDisplay }}>{item}</h4>
                            <p className="text-sm uppercase tracking-widest font-bold opacity-20 group-hover:opacity-40 transition-opacity">Neural Integrated</p>
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
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -20 }}
              className="px-12 py-40 text-center"
            >
               <div className="max-w-4xl mx-auto space-y-16">
                  <div className="space-y-6">
                    <motion.span variants={itemVariants} className="text-[11px] uppercase tracking-[0.5em] font-bold" style={{ color: system.tokens.muted }}>Access Protocol</motion.span>
                    <motion.h3 variants={itemVariants} className="text-7xl lg:text-[8rem] italic tracking-tighter leading-none" style={{ fontFamily: system.tokens.fontDisplay }}>Scale your Vision.</motion.h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                     {[
                       { name: "Visionary", price: "$49", perks: ["10 Neural Links", "Design DNA Registry", "Standard Oracle Score"] },
                       { name: "Architect", price: "$149", perks: ["Unlimited Links", "Shark Intelligence Layer", "Anti-Slop Validation"], active: true }
                     ].map((tier, i) => (
                       <motion.div 
                         key={tier.name}
                         variants={itemVariants}
                         className={cn(
                           "p-16 border bg-white/[0.01] space-y-10 text-left group hover:bg-white/[0.03] transition-all relative overflow-hidden",
                           tier.active && "bg-[#DCFF00]/5 border-[#DCFF00]/20"
                         )}
                         style={{ borderRadius: system.tokens.radiusLg, borderColor: tier.active ? undefined : system.tokens.borderSoft }}
                       >
                          {tier.active && <div className="absolute top-8 right-8 text-[9px] uppercase tracking-widest font-bold text-[#DCFF00] px-3 py-1 bg-[#DCFF00]/10 rounded-full">Most Orchestrated</div>}
                          <div className="space-y-4">
                             <h4 className="text-3xl italic" style={{ fontFamily: system.tokens.fontDisplay }}>{tier.name}</h4>
                             <p className="text-6xl italic" style={{ fontFamily: system.tokens.fontDisplay, color: system.tokens.accent }}>{tier.price}<span className="text-xl opacity-10 ml-2">/mo</span></p>
                          </div>
                          <ul className="space-y-4 text-[11px] uppercase tracking-widest font-bold" style={{ color: system.tokens.muted }}>
                             {tier.perks.map(perk => (
                               <li key={perk} className="flex items-center gap-3"><Zap size={12} style={{ color: system.tokens.accent }} /> {perk}</li>
                             ))}
                          </ul>
                          <Button 
                            className="w-full h-16 rounded-full font-bold uppercase tracking-widest transition-transform group-hover:scale-[1.02]"
                            style={{ 
                              backgroundColor: tier.active ? system.tokens.accent : 'transparent', 
                              color: tier.active ? system.tokens.accentOn : system.tokens.fg,
                              border: tier.active ? 'none' : `1px solid ${system.tokens.borderSoft}`
                            }}
                          >
                            Initialize Plan
                          </Button>
                       </motion.div>
                     ))}
                  </div>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* FOOTER */}
      <footer className="p-20 lg:p-40 border-t text-center bg-black relative z-10" style={{ borderColor: system.tokens.borderSoft }}>
         <div className="max-w-7xl mx-auto flex flex-col items-center space-y-12">
            <BloomLogo size={64} animate={false} />
            <div className="text-[12px] font-bold uppercase tracking-[1.2em] opacity-10">BLOOM NEURAL FACTORY</div>
            <div className="flex gap-12 text-[9px] uppercase tracking-[0.5em] font-bold" style={{ color: system.tokens.meta }}>
               {['Compliance', 'Governance', 'Privacy Node'].map(item => (
                 <button key={item} className="hover:text-white transition-colors">{item}</button>
               ))}
            </div>
            <p className="text-[10px] uppercase tracking-widest italic pt-12 opacity-20">Experience build v3.0 Stable // Anti-Slop Validated</p>
         </div>
      </footer>
    </div>
  );
}
