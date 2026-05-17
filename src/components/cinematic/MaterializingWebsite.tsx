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
  ArrowRightCircle,
  Coffee,
  CheckCircle2,
  Lock,
  Search,
  Activity,
  Heart,
  ExternalLink,
  Plus
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
    hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
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
        "min-h-full transition-all duration-[1200ms] relative overflow-x-hidden selection:bg-white/10",
        stage === 'wireframe' && "grayscale opacity-10 blur-[100px]",
        stage === 'layout' && "grayscale opacity-30 blur-[40px]",
        stage === 'content' && "opacity-80 blur-[10px]"
      )} 
      style={{ 
        backgroundColor: system.tokens.bg,
        color: system.tokens.fg,
        fontFamily: system.tokens.fontBody
      }}
    >
      
      {/* GLOBAL NAVIGATION ORCHESTRATOR */}
      <nav 
        className="fixed top-0 left-0 right-0 z-[200] p-6 lg:px-12 flex justify-between items-center bg-black/5 backdrop-blur-xl border-b"
        style={{ borderColor: system.tokens.borderSoft }}
      >
         <motion.div 
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
           className="text-2xl font-headline italic tracking-tighter flex items-center gap-4 cursor-pointer group" 
           onClick={() => setActivePage('home')}
         >
            <BloomLogo size={32} className="transition-transform group-hover:rotate-180 duration-1000" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-current to-current/60">
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
                className={cn("transition-all hover:text-white relative group")}
                style={{ color: (activePage === item.page) ? system.tokens.fg : system.tokens.muted }}
              >
                {item.label}
                {activePage === item.page && (
                  <motion.div 
                    layoutId="nav-pill" 
                    className="absolute -bottom-2 left-0 right-0 h-px bg-current" 
                  />
                )}
              </button>
            ))}
         </div>

         <div className="flex items-center gap-6">
            <Button variant="ghost" className="text-[10px] uppercase tracking-widest font-bold hidden sm:flex" style={{ color: system.tokens.meta }}>Registry</Button>
            <Button 
              className="rounded-full px-10 h-14 text-[10px] font-bold uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-xl hover:shadow-[0_0_30px_rgba(0,0,0,0.1)]" 
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
              exit={{ opacity: 0, y: -20, transition: { duration: 0.5 } }}
              className="space-y-0"
            >
              {/* HERO MATERIALIZATION */}
              <section className="px-6 py-40 lg:py-72 text-center relative flex flex-col items-center justify-center overflow-hidden min-h-[95vh]">
                 <div className="absolute inset-0 z-0">
                    <div 
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1800px] h-[900px] blur-[400px] rounded-full opacity-10 animate-pulse" 
                      style={{ backgroundColor: system.tokens.accent }} 
                    />
                    <div className="absolute inset-0 bg-black/40" />
                    {isCoffee && (
                      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80')] bg-cover bg-center grayscale pointer-events-none" data-ai-hint="coffee background" />
                    )}
                 </div>
                 
                 <div className="space-y-16 relative z-10 max-w-7xl px-4">
                    <motion.div
                      variants={itemVariants}
                      className="inline-flex items-center gap-4 px-8 py-3 rounded-full border bg-white/[0.03] text-[10px] uppercase tracking-[0.5em] font-bold mx-auto shadow-2xl backdrop-blur-3xl"
                      style={{ borderColor: system.tokens.borderSoft, color: system.tokens.muted }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping" />
                      {startupData.brand?.tone || "Neural Orchestration"}
                    </motion.div>

                    <div className="space-y-8">
                      <motion.h2 
                        variants={itemVariants}
                        className="text-8xl lg:text-[14rem] italic leading-[0.8] tracking-tighter font-headline"
                        style={{ color: system.tokens.fg }}
                      >
                        {heroSection?.title || "Vision Materialized."}
                      </motion.h2>

                      <motion.p 
                        variants={itemVariants}
                        className="text-2xl lg:text-5xl max-w-5xl mx-auto font-light leading-[1.1] italic opacity-80"
                        style={{ color: system.tokens.muted }}
                      >
                        {heroSection?.subtitle || startupData.brand?.tagline}
                      </motion.p>
                    </div>

                    <motion.div variants={itemVariants} className="pt-16 flex flex-col md:flex-row items-center justify-center gap-8">
                      <Button 
                        className="px-16 h-24 rounded-full font-bold text-2xl transition-all hover:scale-105 active:scale-95 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.4)]" 
                        style={{ backgroundColor: system.tokens.accent, color: system.tokens.accentOn }}
                      >
                        {heroSection?.ctaLabel || "Initialize Link"} <ArrowRight className="ml-6 w-8 h-8" strokeWidth={2.5} />
                      </Button>
                      <button 
                        className="flex items-center gap-6 text-[12px] uppercase tracking-[0.6em] font-bold transition-all group opacity-40 hover:opacity-100"
                        style={{ color: system.tokens.meta }}
                      >
                         Technical Brief <ChevronRight className="group-hover:translate-x-2 transition-transform" />
                      </button>
                    </motion.div>
                 </div>

                 <motion.div 
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 0.2 }}
                   transition={{ delay: 2, duration: 1 }}
                   className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
                 >
                    <span className="text-[9px] uppercase tracking-[0.4em] font-bold">Discover Logic</span>
                    <div className="w-px h-16 bg-gradient-to-b from-current to-transparent" />
                 </motion.div>
              </section>

              {/* NEURAL STATS ORCHESTRATION */}
              <section 
                className="px-6 py-40 grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-16 border-y bg-black/5 backdrop-blur-3xl"
                style={{ borderColor: system.tokens.borderSoft }}
              >
                 {[
                   { label: isCoffee ? "Extraction Accuracy" : "Neural Latency", value: isCoffee ? "99.8%" : "0.4ms", icon: Activity, desc: "Real-time sync" },
                   { label: "Audit Validation", value: "Verified", icon: Shield, desc: "Secure Protocol" },
                   { label: "Global Reach", value: "Infinite", icon: Globe, desc: "Distributed Nodes" }
                 ].map((stat, i) => (
                   <motion.div 
                     key={i} 
                     variants={itemVariants}
                     className="flex flex-col items-center text-center space-y-8 p-16 border bg-white/[0.02] group hover:bg-white/[0.04] transition-all relative overflow-hidden"
                     style={{ borderColor: system.tokens.borderSoft, borderRadius: system.tokens.radiusLg }}
                   >
                      <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-5 transition-opacity">
                         <stat.icon size={120} />
                      </div>
                      <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center transition-all group-hover:scale-110 group-hover:rotate-6">
                        <stat.icon size={32} style={{ color: system.tokens.accent }} />
                      </div>
                      <div className="space-y-3">
                        <span className="text-[11px] uppercase tracking-[0.5em] font-bold opacity-30 group-hover:opacity-100 transition-opacity" style={{ color: system.tokens.muted }}>{stat.label}</span>
                        <p className="text-6xl font-headline italic" style={{ color: system.tokens.fg }}>{stat.value}</p>
                        <p className="text-[10px] uppercase tracking-widest font-bold opacity-20">{stat.desc}</p>
                      </div>
                   </motion.div>
                 ))}
              </section>

              {/* BENTO ARCHITECTURE SECTION */}
              <section className="px-6 py-56 bg-black/20 relative z-10 overflow-hidden">
                 <div className="max-w-7xl mx-auto space-y-32">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
                       <div className="space-y-10 max-w-4xl">
                          <motion.div 
                            variants={itemVariants}
                            className="inline-flex items-center gap-4 uppercase tracking-[0.6em] text-[11px] font-bold"
                            style={{ color: system.tokens.accent }}
                          >
                             <Brain size={20} /> Contextual Extraction
                          </motion.div>
                          <motion.h3 
                            variants={itemVariants}
                            className="text-6xl lg:text-[9rem] font-headline italic tracking-tighter leading-[0.85]"
                            style={{ color: system.tokens.fg }}
                          >
                             {problemSection?.title || "The Performance Gap."}
                          </motion.h3>
                       </div>
                       <motion.div variants={itemVariants} className="pb-4">
                          <p className="text-2xl font-light italic max-w-md" style={{ color: system.tokens.muted }}>
                            {problemSection?.subtitle}
                          </p>
                       </motion.div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                       <motion.div 
                         variants={itemVariants} 
                         className="md:col-span-8 h-[600px] rounded-[3rem] bg-gradient-to-br from-white/[0.05] to-transparent border border-white/5 p-20 flex flex-col justify-end relative overflow-hidden group"
                       >
                          <div className="absolute top-0 right-0 p-20 opacity-10 group-hover:scale-110 transition-transform duration-[2s]">
                             <Box size={400} strokeWidth={0.5} />
                          </div>
                          <div className="space-y-8 relative z-10">
                             <h4 className="text-5xl font-headline italic">Neural Orchestration</h4>
                             <p className="text-xl font-light italic opacity-60 max-w-xl">
                               Our platform leverages advanced high-density logic nodes to materialize startup visions with extraordinary precision.
                             </p>
                             <Button variant="link" className="p-0 text-xl font-headline italic group-hover:translate-x-2 transition-transform">
                                Explore the Protocol <ArrowRight className="ml-3" />
                             </Button>
                          </div>
                       </motion.div>
                       <motion.div 
                         variants={itemVariants} 
                         className="md:col-span-4 h-[600px] rounded-[3rem] bg-white/[0.02] border border-white/5 p-16 flex flex-col items-center justify-center text-center space-y-12 group"
                       >
                          <div className="w-32 h-32 rounded-full border border-dashed border-white/10 flex items-center justify-center group-hover:rotate-180 transition-transform duration-[3s]">
                             <Target size={48} className="opacity-20" />
                          </div>
                          <div className="space-y-4">
                             <h4 className="text-3xl font-headline italic">Direct Precision</h4>
                             <p className="text-sm uppercase tracking-widest font-bold opacity-30">Audit Validated</p>
                          </div>
                       </motion.div>
                    </div>
                 </div>
              </section>
            </motion.div>
          )}

          {activePage === 'features' && (
            <motion.div
              key="features"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -20, transition: { duration: 0.5 } }}
              className="px-6 py-56"
            >
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32 lg:gap-48 items-start">
                 <div className="space-y-16 sticky top-48">
                    <div className="space-y-8">
                      <motion.span variants={itemVariants} className="text-[12px] uppercase tracking-[0.6em] font-bold opacity-40" style={{ color: system.tokens.muted }}>Technical Blueprint</motion.span>
                      <motion.h3 variants={itemVariants} className="text-8xl lg:text-[12rem] font-headline italic tracking-tighter leading-[0.8]" style={{ color: system.tokens.fg }}>
                         {isCoffee ? "The Blend." : "The Core Engine."}
                      </motion.h3>
                    </div>
                    <motion.p variants={itemVariants} className="text-3xl font-light italic leading-relaxed max-w-xl opacity-70" style={{ color: system.tokens.muted }}>
                       Every interaction is a calculation. Every pixel is intentional. Our intelligence architecture is designed strictly for the extraordinary orchestrator.
                    </motion.p>
                    <motion.div variants={itemVariants} className="pt-8">
                       <Button 
                         className="h-20 px-16 rounded-full font-bold uppercase tracking-widest text-sm shadow-2xl transition-all hover:scale-105"
                         style={{ backgroundColor: system.tokens.accent, color: system.tokens.accentOn }}
                       >
                          View Tech Specs <ExternalLink className="ml-4" size={18} />
                       </Button>
                    </motion.div>
                 </div>

                 <div className="space-y-12">
                    {featuresSection?.items?.map((item, i) => (
                      <motion.div 
                        key={i} 
                        variants={itemVariants}
                        className="p-16 border bg-white/[0.01] backdrop-blur-3xl flex items-start gap-12 group hover:bg-white/[0.04] transition-all cursor-pointer relative overflow-hidden"
                        style={{ borderColor: system.tokens.borderSoft, borderRadius: system.tokens.radiusLg }}
                      >
                         <div className="absolute inset-0 bg-gradient-to-br from-current to-transparent opacity-0 group-hover:opacity-5 transition-opacity" style={{ color: system.tokens.accent }} />
                         <div 
                           className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 font-headline italic text-2xl transition-all group-hover:rotate-12 group-hover:scale-110 shadow-2xl" 
                           style={{ backgroundColor: system.tokens.accent, color: system.tokens.accentOn }}
                         >
                            0{i + 1}
                         </div>
                         <div className="space-y-4">
                            <h4 className="text-3xl font-headline italic group-hover:translate-x-2 transition-transform" style={{ color: system.tokens.fg }}>{item}</h4>
                            <div className="flex items-center gap-3 opacity-20 group-hover:opacity-50 transition-opacity">
                               <CheckCircle2 size={14} style={{ color: system.tokens.accent }} />
                               <span className="text-[10px] uppercase tracking-widest font-bold">Validated Module</span>
                            </div>
                            <p className="text-sm font-light italic opacity-40 leading-relaxed max-w-sm">
                               Synchronizing with derived startup DNA to ensure emotional branding consistency across all touchpoints.
                            </p>
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
              exit={{ opacity: 0, y: -20, transition: { duration: 0.5 } }}
              className="px-6 py-56 text-center"
            >
               <div className="max-w-6xl mx-auto space-y-32">
                  <div className="space-y-10">
                    <motion.span variants={itemVariants} className="text-[12px] uppercase tracking-[0.7em] font-bold opacity-30" style={{ color: system.tokens.muted }}>Governance Protocol</motion.span>
                    <motion.h3 variants={itemVariants} className="text-8xl lg:text-[11rem] font-headline italic tracking-tighter leading-none" style={{ color: system.tokens.fg }}>Materialize Reality.</motion.h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                     {[
                       { name: "Visionary", price: "$49", desc: "For the individual creator.", perks: ["10 Neural Links", "Design DNA Registry", "Standard Oracle Score"] },
                       { name: "Architect", price: "$149", desc: "For professional agencies.", perks: ["Unlimited Links", "Shark Intelligence Layer", "Anti-Slop Validation"], active: true }
                     ].map((tier) => (
                       <motion.div 
                         key={tier.name}
                         variants={itemVariants}
                         className={cn(
                           "p-20 border bg-white/[0.01] space-y-16 text-left group hover:bg-white/[0.03] transition-all relative overflow-hidden",
                           tier.active && "border-current shadow-2xl"
                         )}
                         style={{ borderRadius: system.tokens.radiusLg, borderColor: tier.active ? system.tokens.accent : system.tokens.borderSoft }}
                       >
                          {tier.active && (
                            <div className="absolute top-10 right-10 text-[10px] uppercase tracking-widest font-bold px-5 py-2 rounded-full backdrop-blur-3xl shadow-xl" style={{ backgroundColor: system.tokens.accent, color: system.tokens.accentOn }}>
                              Most Orchestrated
                            </div>
                          )}
                          <div className="space-y-6">
                             <h4 className="text-4xl font-headline italic" style={{ color: system.tokens.fg }}>{tier.name}</h4>
                             <p className="text-2xl font-light italic opacity-50">{tier.desc}</p>
                             <div className="flex items-end gap-3 pt-4">
                                <span className="text-8xl font-headline italic" style={{ color: system.tokens.accent }}>{tier.price}</span>
                                <span className="text-xl opacity-20 mb-3">/mo</span>
                             </div>
                          </div>
                          
                          <div className="h-px w-full bg-white/5" />

                          <ul className="space-y-6">
                             {tier.perks.map(perk => (
                               <li key={perk} className="flex items-center gap-5 text-[12px] uppercase tracking-[0.4em] font-bold opacity-40 group-hover:opacity-100 transition-opacity">
                                 <Plus size={16} style={{ color: system.tokens.accent }} /> {perk}
                               </li>
                             ))}
                          </ul>
                          <Button 
                            className="w-full h-24 rounded-full font-bold uppercase tracking-[0.4em] text-[11px] shadow-2xl transition-all hover:scale-[1.02] active:scale-95"
                            style={{ 
                              backgroundColor: tier.active ? system.tokens.accent : 'transparent', 
                              color: tier.active ? system.tokens.accentOn : system.tokens.fg,
                              border: tier.active ? 'none' : `1px solid ${system.tokens.borderSoft}`
                            }}
                          >
                            Initialize {tier.name} Plan
                          </Button>
                       </motion.div>
                     ))}
                  </div>

                  <motion.div variants={itemVariants} className="pt-24 opacity-20">
                     <p className="text-[11px] uppercase tracking-[0.8em] font-bold">Trusted by 12,000+ Orchestrators worldwide</p>
                  </motion.div>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* GLOBAL FOOTER */}
      <footer className="p-24 lg:p-64 border-t text-center bg-black/10 backdrop-blur-3xl relative z-10" style={{ borderColor: system.tokens.borderSoft }}>
         <div className="max-w-7xl mx-auto flex flex-col items-center space-y-24">
            <motion.div 
              whileHover={{ rotate: 180 }}
              transition={{ duration: 1.5 }}
              className="cursor-pointer"
            >
              <BloomLogo size={100} animate={false} />
            </motion.div>
            
            <div className="space-y-8">
              <div className="text-[16px] font-bold uppercase tracking-[1.5em] opacity-10">BLOOM NEURAL FACTORY</div>
              <p className="text-xl font-light italic opacity-30 max-w-xl mx-auto">
                Intelligence Materialized. Orchestrating the future of startup creation through high-density logic nodes.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-12 text-[10px] uppercase tracking-[0.6em] font-bold" style={{ color: system.tokens.meta }}>
               {['Compliance', 'Governance', 'Privacy Node', 'Audit Logs', 'Status'].map(item => (
                 <button key={item} className="hover:text-white transition-all hover:tracking-[0.8em]">{item}</button>
               ))}
            </div>
            
            <div className="pt-24 space-y-4">
              <p className="text-[10px] uppercase tracking-widest italic opacity-20">Experience build v3.0.2 Stable // Anti-Slop Validated</p>
              <div className="flex items-center justify-center gap-6 opacity-10">
                 <Heart size={14} />
                 <Lock size={14} />
                 <Shield size={14} />
              </div>
            </div>
         </div>
      </footer>
    </div>
  );
}
