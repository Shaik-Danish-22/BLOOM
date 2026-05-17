
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { 
  ArrowRight, 
  CheckCircle2,
  ExternalLink,
  Activity,
  Globe,
  Shield,
  Brain,
  Plus,
  Box,
  Layout,
  Target,
  Zap,
  TrendingUp,
  Cpu
} from "lucide-react";
import Image from "next/image";
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
      setTimeout(() => setStage("layout"), 600),
      setTimeout(() => setStage("content"), 1400),
      setTimeout(() => setStage("final"), 2200),
    ];
    return () => timers.forEach(clearTimeout);
  }, [isVisible, data]);

  if (!isVisible || !startupData) return null;

  const isCoffee = context?.prompt?.toLowerCase().includes('coffee') || startupData.brand?.companyName?.toLowerCase().includes('coffee');
  const defaultSystemId = isCoffee ? 'cafe' : 'apple';
  const systemId = context?.selectedSystem || defaultSystemId;
  const system: DesignSystemTokens = DESIGN_SYSTEMS[systemId as any] || DESIGN_SYSTEMS.apple;

  const sections = startupData.content?.sections || [];
  const heroSection = sections.find(s => s.type === 'hero');
  const problemSection = sections.find(s => s.type === 'problem');
  const featuresSection = sections.find(s => s.type === 'features');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, filter: "blur(20px)" },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <div 
      className={cn(
        "min-h-full transition-all duration-[1500ms] relative overflow-x-hidden selection:bg-white/10",
        stage === 'wireframe' && "grayscale opacity-20 blur-[80px]",
        stage === 'layout' && "grayscale opacity-40 blur-[40px]",
        stage === 'content' && "opacity-90 blur-[10px]"
      )} 
      style={{ 
        backgroundColor: system.tokens.bg,
        color: system.tokens.fg,
        fontFamily: system.tokens.fontBody
      }}
    >
      
      {/* GLOBAL NAVIGATION node */}
      <nav 
        className="fixed top-0 left-0 right-0 z-[200] px-8 py-6 lg:px-16 flex justify-between items-center bg-black/5 backdrop-blur-xl border-b border-white/5"
      >
         <motion.div 
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
           className="text-2xl font-headline italic tracking-tighter flex items-center gap-4 cursor-pointer group" 
           onClick={() => setActivePage('home')}
         >
            <BloomLogo size={32} className="transition-transform group-hover:rotate-90 duration-700" />
            <span className="font-bold tracking-tight">
              {startupData.brand?.companyName || "BLOOM"}
            </span>
         </motion.div>
         
         <div className="hidden lg:flex items-center gap-12 text-[10px] font-bold uppercase tracking-[0.4em]" style={{ color: system.tokens.muted }}>
            {[
              { label: 'Vision', page: 'home' },
              { label: 'Intelligence', page: 'features' },
              { label: 'Access', page: 'pricing' }
            ].map((item) => (
              <button 
                key={item.label}
                onClick={() => setActivePage(item.page as any)}
                className={cn("transition-all hover:text-white relative py-2")}
                style={{ color: (activePage === item.page) ? system.tokens.fg : system.tokens.muted }}
              >
                {item.label}
                {activePage === item.page && (
                  <motion.div 
                    layoutId="nav-line" 
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-white shadow-[0_0_10px_white]" 
                  />
                )}
              </button>
            ))}
         </div>

         <div className="flex items-center gap-6">
            <Button variant="ghost" className="text-[10px] uppercase tracking-widest font-bold hidden sm:flex hover:bg-transparent" style={{ color: system.tokens.meta }}>Registry</Button>
            <Button 
              className="rounded-full px-8 h-12 text-[10px] font-bold uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95 shadow-xl" 
              style={{ backgroundColor: system.tokens.accent, color: system.tokens.accentOn }}
            >
               Initialize
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
              exit={{ opacity: 0, scale: 0.98, filter: "blur(20px)", transition: { duration: 0.5 } }}
              className="space-y-0"
            >
              {/* EDITORIAL HERO */}
              <section className="px-6 py-40 lg:py-64 text-center relative flex flex-col items-center justify-center overflow-hidden min-h-[90vh]">
                 <div className="absolute inset-0 z-0">
                    <div 
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1600px] h-[800px] blur-[400px] rounded-full opacity-20" 
                      style={{ backgroundColor: system.tokens.accent }} 
                    />
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
                    <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay grayscale">
                      <Image 
                        src={`https://picsum.photos/seed/${isCoffee ? 'coffee-beans' : 'minimal-tech'}/1920/1080`}
                        alt="Background"
                        fill
                        className="object-cover"
                        data-ai-hint={isCoffee ? "coffee" : "tech"}
                      />
                    </div>
                 </div>
                 
                 <div className="space-y-12 relative z-10 max-w-6xl px-4">
                    <motion.div
                      variants={itemVariants}
                      className="inline-flex items-center gap-4 px-6 py-2 rounded-full border bg-white/[0.03] text-[9px] uppercase tracking-[0.5em] font-bold mx-auto border-white/10"
                      style={{ color: system.tokens.muted }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                      {startupData.brand?.tone || "Neural Orchestration"}
                    </motion.div>

                    <div className="space-y-8">
                      <motion.h2 
                        variants={itemVariants}
                        className="text-5xl md:text-7xl lg:text-[9.5rem] italic leading-[0.85] tracking-tighter font-headline text-glow"
                        style={{ color: system.tokens.fg }}
                      >
                        {heroSection?.title || "Vision Materialized."}
                      </motion.h2>

                      <motion.p 
                        variants={itemVariants}
                        className="text-lg md:text-2xl lg:text-3xl max-w-3xl mx-auto font-light leading-relaxed italic opacity-80 tracking-tight"
                        style={{ color: system.tokens.muted }}
                      >
                        {heroSection?.subtitle || startupData.brand?.tagline}
                      </motion.p>
                    </div>

                    <motion.div variants={itemVariants} className="pt-12 flex flex-col md:flex-row items-center justify-center gap-8">
                      <Button 
                        className="px-12 h-16 rounded-full font-bold text-lg transition-all hover:scale-105 active:scale-95 shadow-2xl" 
                        style={{ backgroundColor: system.tokens.accent, color: system.tokens.accentOn }}
                      >
                        {heroSection?.ctaLabel || "Begin Journey"} <ArrowRight className="ml-4 w-6 h-6" strokeWidth={3} />
                      </Button>
                      <button 
                        className="flex items-center gap-6 text-[12px] uppercase tracking-[0.6em] font-bold opacity-40 hover:opacity-100 transition-all group"
                        style={{ color: system.tokens.meta }}
                      >
                         Brief <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </motion.div>
                 </div>
              </section>

              {/* BENTO ARCHITECTURE - EDITORIAL GRID */}
              <section className="px-6 lg:px-24 py-40 bg-black/20">
                 <div className="max-w-7xl mx-auto space-y-32">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                       <motion.div 
                         variants={itemVariants}
                         className="lg:col-span-12 space-y-6"
                       >
                          <span className="text-[10px] uppercase tracking-[1em] font-bold opacity-30 block" style={{ color: system.tokens.accent }}>Strategic Gap</span>
                          <h3 className="text-4xl md:text-6xl lg:text-8xl font-headline italic tracking-tighter leading-tight">
                            {problemSection?.title || "The Market Logic."}
                          </h3>
                       </motion.div>

                       <motion.div 
                         variants={itemVariants} 
                         className="lg:col-span-8 h-[500px] rounded-[3rem] bg-gradient-to-br from-white/[0.05] to-transparent border border-white/5 p-12 lg:p-20 flex flex-col justify-end relative overflow-hidden group shadow-2xl"
                       >
                          <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:scale-110 transition-transform duration-1000">
                             <Box size={400} strokeWidth={0.5} />
                          </div>
                          <div className="space-y-6 relative z-10">
                             <h4 className="text-3xl lg:text-5xl font-headline italic">Neural Orchestration</h4>
                             <p className="text-lg lg:text-xl font-light italic opacity-60 max-w-2xl leading-relaxed">
                               {problemSection?.subtitle || "Materializing visions with extraordinary precision."}
                             </p>
                          </div>
                       </motion.div>

                       <motion.div 
                         variants={itemVariants} 
                         className="lg:col-span-4 h-[500px] rounded-[3rem] bg-white/[0.02] border border-white/5 p-12 flex flex-col items-center justify-center text-center space-y-8 group shadow-2xl"
                       >
                          <div className="w-32 h-32 rounded-full border border-dashed border-white/10 flex items-center justify-center group-hover:rotate-180 transition-all duration-[8s] relative">
                             <Activity size={40} className="opacity-30" style={{ color: system.tokens.accent }} />
                          </div>
                          <div className="space-y-4">
                             <h4 className="text-2xl font-headline italic">Infinite Reach</h4>
                             <p className="text-[9px] uppercase tracking-[0.5em] font-bold opacity-30 italic">FounderOS Node 01</p>
                          </div>
                       </motion.div>
                    </div>
                 </div>
              </section>

              {/* STATS STRIP */}
              <section className="py-24 border-y border-white/5 bg-black/40">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
                   {[
                     { label: "Market TAM", value: startupData.intelligence?.tamSamSom?.tam || "$15.6T" },
                     { label: "Viability Score", value: "92/100" },
                     { label: "Active Nodes", value: "1,240" },
                     { label: "Protocol", value: "v3.5" }
                   ].map((stat, i) => (
                     <motion.div key={i} variants={itemVariants} className="space-y-2 text-center md:text-left">
                        <span className="text-[9px] uppercase tracking-[0.4em] font-bold opacity-30" style={{ color: system.tokens.accent }}>{stat.label}</span>
                        <p className="text-3xl lg:text-5xl font-headline italic">{stat.value}</p>
                     </motion.div>
                   ))}
                </div>
              </section>

              {/* FOOTER */}
              <footer className="p-24 lg:p-40 border-t text-center bg-black" style={{ borderColor: system.tokens.borderSoft }}>
                 <div className="max-w-4xl mx-auto flex flex-col items-center space-y-8">
                    <BloomLogo size={48} animate={false} />
                    <div className="text-[10px] font-bold uppercase tracking-[1em] opacity-20">BLOOM NEURAL STUDIO</div>
                    <div className="flex gap-10 text-[8px] uppercase tracking-[0.4em] font-bold opacity-30">
                       <button className="hover:text-white transition-colors">Privacy</button>
                       <button className="hover:text-white transition-colors">Protocol</button>
                       <button className="hover:text-white transition-colors">Nodes</button>
                    </div>
                    <div className="pt-12 text-[8px] opacity-10 uppercase tracking-[0.2em] font-bold">© 2026 // Stable Experience</div>
                 </div>
              </footer>
            </motion.div>
          )}

          {activePage === 'features' && (
            <motion.div
              key="features"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
              className="px-6 lg:px-24 py-40"
            >
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-40 items-start">
                 <div className="space-y-16 sticky top-40">
                    <div className="space-y-6">
                      <motion.span variants={itemVariants} className="text-[12px] uppercase tracking-[1em] font-bold opacity-30 block" style={{ color: system.tokens.muted }}>Intelligence</motion.span>
                      <motion.h3 variants={itemVariants} className="text-5xl md:text-7xl lg:text-9xl font-headline italic tracking-tighter leading-tight text-glow">
                         {isCoffee ? "The Ritual." : "The Protocol."}
                      </motion.h3>
                    </div>
                    <motion.p variants={itemVariants} className="text-xl md:text-3xl font-light italic leading-relaxed max-w-xl opacity-80 tracking-tight">
                       Every pixel is a derivation of core startup DNA. We build for the extraordinary orchestrator who demands flawless hierarchy.
                    </motion.p>
                 </div>

                 <div className="space-y-12">
                    {featuresSection?.items?.map((item, i) => (
                      <motion.div 
                        key={i} 
                        variants={itemVariants}
                        className="p-12 lg:p-16 border bg-white/[0.01] backdrop-blur-2xl flex items-start gap-12 group hover:bg-white/[0.04] transition-all relative overflow-hidden rounded-[2.5rem]"
                        style={{ borderColor: system.tokens.borderSoft }}
                      >
                         <div className="absolute inset-0 bg-gradient-to-br from-current to-transparent opacity-0 group-hover:opacity-[0.02] transition-opacity" style={{ color: system.tokens.accent }} />
                         <div 
                           className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 font-headline italic text-3xl transition-all group-hover:scale-110 shadow-lg border border-white/5" 
                           style={{ backgroundColor: system.tokens.accent, color: system.tokens.accentOn }}
                         >
                            0{i + 1}
                         </div>
                         <div className="space-y-4">
                            <h4 className="text-3xl lg:text-5xl font-headline italic drop-shadow-sm">{item}</h4>
                            <div className="flex items-center gap-4 opacity-30">
                               <CheckCircle2 size={16} />
                               <span className="text-[10px] uppercase tracking-[0.4em] font-bold">Validated</span>
                            </div>
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
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.3 } }}
              className="px-6 lg:px-24 py-40 text-center"
            >
               <div className="max-w-5xl mx-auto space-y-32">
                  <div className="space-y-8">
                    <motion.span variants={itemVariants} className="text-[12px] uppercase tracking-[1em] font-bold opacity-30 block">Access Nodes</motion.span>
                    <motion.h3 variants={itemVariants} className="text-5xl md:text-7xl lg:text-[8rem] font-headline italic tracking-tighter leading-none">Materialize.</motion.h3>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                     {[
                       { name: "Visionary", price: "$49", desc: "For independent creators.", perks: ["10 Neural Materializations", "DNA Registry", "Oracle Score"] },
                       { name: "Architect", price: "$149", desc: "For professional agencies.", perks: ["Unlimited Materializations", "Shark Intelligence", "Anti-Slop Validation"], active: true }
                     ].map((tier) => (
                       <motion.div 
                         key={tier.name}
                         variants={itemVariants}
                         className={cn(
                           "p-12 lg:p-16 border bg-white/[0.01] space-y-12 text-left group hover:bg-white/[0.03] transition-all relative overflow-hidden rounded-[3rem] backdrop-blur-3xl",
                           tier.active ? "border-white/20" : "border-white/5"
                         )}
                       >
                          <div className="space-y-6">
                             <h4 className="text-4xl lg:text-6xl font-headline italic">{tier.name}</h4>
                             <p className="text-lg font-light italic opacity-50 max-w-xs">{tier.desc}</p>
                             <div className="flex items-end gap-4 pt-4">
                                <span className="text-7xl lg:text-9xl font-headline italic leading-none" style={{ color: system.tokens.accent }}>{tier.price}</span>
                                <span className="text-xl opacity-20 mb-4 uppercase tracking-[0.2em] font-bold">/mo</span>
                             </div>
                          </div>
                          
                          <div className="h-px w-full bg-white/5" />

                          <ul className="space-y-6">
                             {tier.perks.map(perk => (
                               <li key={perk} className="flex items-center gap-6 text-[12px] uppercase tracking-[0.3em] font-bold opacity-40">
                                 <Plus size={16} style={{ color: system.tokens.accent }} /> {perk}
                               </li>
                             ))}
                          </ul>
                          <Button 
                            className="w-full h-16 rounded-full font-bold uppercase tracking-[0.3em] text-[10px] transition-all hover:scale-105"
                            style={{ 
                              backgroundColor: tier.active ? system.tokens.accent : 'white', 
                              color: tier.active ? system.tokens.accentOn : 'black'
                            }}
                          >
                            Access {tier.name}
                          </Button>
                       </motion.div>
                     ))}
                  </div>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
