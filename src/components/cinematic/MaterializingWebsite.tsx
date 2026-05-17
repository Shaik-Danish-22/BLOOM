"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { 
  ArrowRight, 
  Sparkles, 
  Zap, 
  Shield, 
  Brain, 
  ChevronRight,
  Box,
  Globe,
  Activity,
  Heart,
  ExternalLink,
  Plus,
  CheckCircle2,
  Lock
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
    hidden: { opacity: 0, y: 60, filter: "blur(20px)" },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 1.4, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <div 
      className={cn(
        "min-h-full transition-all duration-[1500ms] relative overflow-x-hidden selection:bg-white/10",
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
      
      {/* GLOBAL NAVIGATION */}
      <nav 
        className="fixed top-0 left-0 right-0 z-[200] p-8 lg:px-20 flex justify-between items-center bg-black/5 backdrop-blur-3xl border-b"
        style={{ borderColor: system.tokens.borderSoft }}
      >
         <motion.div 
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
           className="text-3xl font-headline italic tracking-tighter flex items-center gap-5 cursor-pointer group" 
           onClick={() => setActivePage('home')}
         >
            <BloomLogo size={40} className="transition-transform group-hover:rotate-180 duration-1000" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-current to-current/60">
              {startupData.brand?.companyName || "BLOOM"}
            </span>
         </motion.div>
         
         <div className="hidden lg:flex items-center gap-16 text-[11px] font-bold uppercase tracking-[0.5em]" style={{ color: system.tokens.muted }}>
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
                    className="absolute -bottom-3 left-0 right-0 h-0.5 bg-current shadow-[0_0_10px_currentColor]" 
                  />
                )}
              </button>
            ))}
         </div>

         <div className="flex items-center gap-8">
            <Button variant="ghost" className="text-[11px] uppercase tracking-widest font-bold hidden sm:flex hover:bg-transparent" style={{ color: system.tokens.meta }}>Registry Node</Button>
            <Button 
              className="rounded-full px-12 h-16 text-[11px] font-bold uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95 shadow-2xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)]" 
              style={{ backgroundColor: system.tokens.accent, color: system.tokens.accentOn }}
            >
               Initialize Link
            </Button>
         </div>
      </nav>

      <main className="pt-32 min-h-screen">
        <AnimatePresence mode="wait">
          {activePage === 'home' && (
            <motion.div
              key="home"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.6 } }}
              className="space-y-0"
            >
              {/* EXTRAVAGANT HERO */}
              <section className="px-6 py-48 lg:py-80 text-center relative flex flex-col items-center justify-center overflow-hidden min-h-[95vh]">
                 <div className="absolute inset-0 z-0">
                    <div 
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[2000px] h-[1000px] blur-[500px] rounded-full opacity-20 animate-pulse" 
                      style={{ backgroundColor: system.tokens.accent }} 
                    />
                    <div className="absolute inset-0 bg-black/40" />
                    {isCoffee && (
                      <div className="absolute inset-0 opacity-[0.05] bg-[url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80')] bg-cover bg-center grayscale pointer-events-none" data-ai-hint="coffee cinematic" />
                    )}
                 </div>
                 
                 <div className="space-y-20 relative z-10 max-w-7xl px-4">
                    <motion.div
                      variants={itemVariants}
                      className="inline-flex items-center gap-6 px-10 py-4 rounded-full border bg-white/[0.03] text-[11px] uppercase tracking-[0.6em] font-bold mx-auto shadow-2xl backdrop-blur-3xl"
                      style={{ borderColor: system.tokens.borderSoft, color: system.tokens.muted }}
                    >
                      <div className="w-2 h-2 rounded-full bg-current animate-ping" />
                      {startupData.brand?.tone || "Neural Orchestration"}
                    </motion.div>

                    <div className="space-y-12">
                      <motion.h2 
                        variants={itemVariants}
                        className="text-9xl lg:text-[18rem] italic leading-[0.75] tracking-tighter font-headline text-glow"
                        style={{ color: system.tokens.fg }}
                      >
                        {heroSection?.title || "Vision Materialized."}
                      </motion.h2>

                      <motion.p 
                        variants={itemVariants}
                        className="text-3xl lg:text-6xl max-w-6xl mx-auto font-light leading-[1.05] italic opacity-80"
                        style={{ color: system.tokens.muted }}
                      >
                        {heroSection?.subtitle || startupData.brand?.tagline}
                      </motion.p>
                    </div>

                    <motion.div variants={itemVariants} className="pt-20 flex flex-col md:flex-row items-center justify-center gap-12">
                      <Button 
                        className="px-20 h-28 rounded-full font-bold text-3xl transition-all hover:scale-105 active:scale-95 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.4)] hover:shadow-[0_60px_120px_-15px_rgba(0,0,0,0.5)]" 
                        style={{ backgroundColor: system.tokens.accent, color: system.tokens.accentOn }}
                      >
                        {heroSection?.ctaLabel || "Establish Link"} <ArrowRight className="ml-8 w-10 h-10" strokeWidth={3} />
                      </Button>
                      <button 
                        className="flex items-center gap-8 text-[14px] uppercase tracking-[0.8em] font-bold transition-all group opacity-50 hover:opacity-100"
                        style={{ color: system.tokens.meta }}
                      >
                         Technical Brief <ChevronRight className="group-hover:translate-x-4 transition-transform w-8 h-8" />
                      </button>
                    </motion.div>
                 </div>

                 <motion.div 
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 0.3 }}
                   transition={{ delay: 2.5, duration: 1.5 }}
                   className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6"
                 >
                    <span className="text-[10px] uppercase tracking-[0.5em] font-bold">Discover Protocol</span>
                    <div className="w-0.5 h-24 bg-gradient-to-b from-current to-transparent" />
                 </motion.div>
              </section>

              {/* NEURAL AUDIT STATS */}
              <section 
                className="px-8 lg:px-20 py-48 grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20 border-y bg-black/10 backdrop-blur-3xl"
                style={{ borderColor: system.tokens.borderSoft }}
              >
                 {[
                   { label: isCoffee ? "Extraction Accuracy" : "Neural Latency", value: isCoffee ? "99.8%" : "0.4ms", icon: Activity, desc: "Real-time network sync" },
                   { label: "Audit Validation", value: "Verified", icon: Shield, desc: "Secure Protocol Active" },
                   { label: "Global Reach", value: "Infinite", icon: Globe, desc: "Distributed Bloom Nodes" }
                 ].map((stat, i) => (
                   <motion.div 
                     key={i} 
                     variants={itemVariants}
                     className="flex flex-col items-center text-center space-y-10 p-20 border bg-white/[0.01] group hover:bg-white/[0.04] transition-all relative overflow-hidden"
                     style={{ borderColor: system.tokens.borderSoft, borderRadius: system.tokens.radiusLg }}
                   >
                      <div className="absolute top-0 right-0 p-12 opacity-0 group-hover:opacity-[0.03] transition-all duration-1000 group-hover:scale-150 group-hover:-rotate-12">
                         <stat.icon size={200} />
                      </div>
                      <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center transition-all duration-700 group-hover:scale-125 group-hover:rotate-12 shadow-2xl">
                        <stat.icon size={40} style={{ color: system.tokens.accent }} />
                      </div>
                      <div className="space-y-4">
                        <span className="text-[13px] uppercase tracking-[0.6em] font-bold opacity-30 group-hover:opacity-100 transition-opacity" style={{ color: system.tokens.muted }}>{stat.label}</span>
                        <p className="text-8xl font-headline italic" style={{ color: system.tokens.fg }}>{stat.value}</p>
                        <p className="text-[11px] uppercase tracking-[0.4em] font-bold opacity-20 italic">{stat.desc}</p>
                      </div>
                   </motion.div>
                 ))}
              </section>

              {/* BENTO ARCHITECTURE */}
              <section className="px-8 lg:px-20 py-64 bg-black/20 relative z-10 overflow-hidden">
                 <div className="max-w-7xl mx-auto space-y-40">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-16">
                       <div className="space-y-12 max-w-5xl">
                          <motion.div 
                            variants={itemVariants}
                            className="inline-flex items-center gap-6 uppercase tracking-[0.8em] text-[12px] font-bold"
                            style={{ color: system.tokens.accent }}
                          >
                             <Brain size={24} /> Contextual Extraction Engine
                          </motion.div>
                          <motion.h3 
                            variants={itemVariants}
                            className="text-8xl lg:text-[13rem] font-headline italic tracking-tighter leading-[0.8] text-glow"
                            style={{ color: system.tokens.fg }}
                          >
                             {problemSection?.title || "The Logic Gap."}
                          </motion.h3>
                       </div>
                       <motion.div variants={itemVariants} className="pb-8">
                          <p className="text-3xl font-light italic max-w-lg leading-relaxed opacity-60" style={{ color: system.tokens.muted }}>
                            {problemSection?.subtitle}
                          </p>
                       </motion.div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                       <motion.div 
                         variants={itemVariants} 
                         className="md:col-span-8 h-[700px] rounded-[4rem] bg-gradient-to-br from-white/[0.05] to-transparent border border-white/5 p-24 flex flex-col justify-end relative overflow-hidden group shadow-2xl"
                       >
                          <div className="absolute top-0 right-0 p-24 opacity-[0.04] group-hover:scale-125 transition-transform duration-[4s]">
                             <Box size={500} strokeWidth={0.5} />
                          </div>
                          <div className="space-y-10 relative z-10">
                             <h4 className="text-6xl lg:text-7xl font-headline italic">Neural Orchestration</h4>
                             <p className="text-2xl font-light italic opacity-60 max-w-2xl leading-relaxed">
                               Our platform leverages advanced high-density logic nodes to materialize startup visions with extraordinary precision and sensory branding.
                             </p>
                             <Button variant="link" className="p-0 text-2xl font-headline italic group-hover:translate-x-6 transition-all h-auto text-white">
                                Explore the Protocol <ArrowRight className="ml-4 w-8 h-8" />
                             </Button>
                          </div>
                       </motion.div>
                       <motion.div 
                         variants={itemVariants} 
                         className="md:col-span-4 h-[700px] rounded-[4rem] bg-white/[0.02] border border-white/10 p-20 flex flex-col items-center justify-center text-center space-y-16 group shadow-2xl"
                       >
                          <div className="w-40 h-40 rounded-full border border-dashed border-[#DCFF00]/20 flex items-center justify-center group-hover:rotate-180 transition-all duration-[6s] relative">
                             <div className="absolute inset-0 bg-[#DCFF00]/5 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity" />
                             <Sparkles size={64} className="opacity-40 text-[#DCFF00]" />
                          </div>
                          <div className="space-y-6">
                             <h4 className="text-4xl font-headline italic">Direct Precision</h4>
                             <p className="text-[11px] uppercase tracking-[0.6em] font-bold opacity-30 italic">FounderOS Validated</p>
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
              exit={{ opacity: 0, x: -20, transition: { duration: 0.6 } }}
              className="px-8 lg:px-20 py-64"
            >
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-40 lg:gap-64 items-start">
                 <div className="space-y-20 sticky top-56">
                    <div className="space-y-10">
                      <motion.span variants={itemVariants} className="text-[14px] uppercase tracking-[1em] font-bold opacity-40" style={{ color: system.tokens.muted }}>Strategic Blueprint</motion.span>
                      <motion.h3 variants={itemVariants} className="text-9xl lg:text-[15rem] font-headline italic tracking-tighter leading-[0.75] text-glow" style={{ color: system.tokens.fg }}>
                         {isCoffee ? "The Ritual." : "The Intelligence Core."}
                      </motion.h3>
                    </div>
                    <motion.p variants={itemVariants} className="text-4xl font-light italic leading-[1.2] max-w-xl opacity-70" style={{ color: system.tokens.muted }}>
                       Every interaction is a calculation. Every pixel is intentional. Our architecture is designed strictly for the extraordinary orchestrator.
                    </motion.p>
                    <motion.div variants={itemVariants} className="pt-12">
                       <Button 
                         className="h-24 px-20 rounded-full font-bold uppercase tracking-[0.4em] text-[12px] shadow-2xl transition-all hover:scale-105 active:scale-95"
                         style={{ backgroundColor: system.tokens.accent, color: system.tokens.accentOn }}
                       >
                          View Tech Specifications <ExternalLink className="ml-6" size={24} />
                       </Button>
                    </motion.div>
                 </div>

                 <div className="space-y-16">
                    {featuresSection?.items?.map((item, i) => (
                      <motion.div 
                        key={i} 
                        variants={itemVariants}
                        className="p-20 border bg-white/[0.01] backdrop-blur-3xl flex items-start gap-16 group hover:bg-white/[0.04] transition-all cursor-pointer relative overflow-hidden shadow-2xl"
                        style={{ borderColor: system.tokens.borderSoft, borderRadius: system.tokens.radiusLg }}
                      >
                         <div className="absolute inset-0 bg-gradient-to-br from-current to-transparent opacity-0 group-hover:opacity-[0.03] transition-opacity" style={{ color: system.tokens.accent }} />
                         <div 
                           className="w-20 h-20 rounded-3xl flex items-center justify-center shrink-0 font-headline italic text-3xl transition-all duration-700 group-hover:rotate-12 group-hover:scale-125 shadow-2xl" 
                           style={{ backgroundColor: system.tokens.accent, color: system.tokens.accentOn }}
                         >
                            0{i + 1}
                         </div>
                         <div className="space-y-6">
                            <h4 className="text-4xl lg:text-5xl font-headline italic group-hover:translate-x-4 transition-transform text-glow" style={{ color: system.tokens.fg }}>{item}</h4>
                            <div className="flex items-center gap-4 opacity-30 group-hover:opacity-70 transition-opacity">
                               <CheckCircle2 size={18} style={{ color: system.tokens.accent }} />
                               <span className="text-[12px] uppercase tracking-[0.4em] font-bold">Validated Module 0{i+1}</span>
                            </div>
                            <p className="text-lg font-light italic opacity-40 leading-relaxed max-w-md">
                               Synchronizing with derived startup DNA to ensure emotional branding consistency and technological authority across all digital touchpoints.
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
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.6 } }}
              className="px-8 lg:px-20 py-64 text-center"
            >
               <div className="max-w-7xl mx-auto space-y-40">
                  <div className="space-y-12">
                    <motion.span variants={itemVariants} className="text-[14px] uppercase tracking-[1.2em] font-bold opacity-30" style={{ color: system.tokens.muted }}>Governance Protocol</motion.span>
                    <motion.h3 variants={itemVariants} className="text-9xl lg:text-[14rem] font-headline italic tracking-tighter leading-none text-glow" style={{ color: system.tokens.fg }}>Materialize Reality.</motion.h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                     {[
                       { name: "Visionary", price: "$49", desc: "For the individual creator materializing first neural concepts.", perks: ["10 Neural Links / mo", "Design DNA Registry", "Standard Oracle Score", "Scissor Assistant"] },
                       { name: "Architect", price: "$149", desc: "For professional agencies building high-density identities.", perks: ["Unlimited Neural Links", "Shark Intelligence Layer", "Anti-Slop Validation", "Priority Materialization"], active: true }
                     ].map((tier) => (
                       <motion.div 
                         key={tier.name}
                         variants={itemVariants}
                         className={cn(
                           "p-24 border bg-white/[0.01] space-y-20 text-left group hover:bg-white/[0.03] transition-all relative overflow-hidden shadow-2xl",
                           tier.active && "border-current"
                         )}
                         style={{ borderRadius: system.tokens.radiusLg, borderColor: tier.active ? system.tokens.accent : system.tokens.borderSoft }}
                       >
                          {tier.active && (
                            <div className="absolute top-12 right-12 text-[11px] uppercase tracking-[0.5em] font-bold px-8 py-3 rounded-full backdrop-blur-3xl shadow-2xl" style={{ backgroundColor: system.tokens.accent, color: system.tokens.accentOn }}>
                              Preferred Node
                            </div>
                          )}
                          <div className="space-y-8">
                             <h4 className="text-5xl font-headline italic" style={{ color: system.tokens.fg }}>{tier.name}</h4>
                             <p className="text-2xl font-light italic opacity-50 max-w-sm">{tier.desc}</p>
                             <div className="flex items-end gap-4 pt-6">
                                <span className="text-9xl font-headline italic" style={{ color: system.tokens.accent }}>{tier.price}</span>
                                <span className="text-2xl opacity-20 mb-4 uppercase tracking-widest">/mo</span>
                             </div>
                          </div>
                          
                          <div className="h-px w-full bg-white/10" />

                          <ul className="space-y-8">
                             {tier.perks.map(perk => (
                               <li key={perk} className="flex items-center gap-6 text-[13px] uppercase tracking-[0.4em] font-bold opacity-40 group-hover:opacity-100 transition-opacity">
                                 <Plus size={20} style={{ color: system.tokens.accent }} /> {perk}
                               </li>
                             ))}
                          </ul>
                          <Button 
                            className="w-full h-28 rounded-full font-bold uppercase tracking-[0.5em] text-[12px] shadow-2xl transition-all hover:scale-[1.03] active:scale-95"
                            style={{ 
                              backgroundColor: tier.active ? system.tokens.accent : 'transparent', 
                              color: tier.active ? system.tokens.accentOn : system.tokens.fg,
                              border: tier.active ? 'none' : `2px solid ${system.tokens.borderSoft}`
                            }}
                          >
                            Initialize {tier.name} Access
                          </Button>
                       </motion.div>
                     ))}
                  </div>

                  <motion.div variants={itemVariants} className="pt-32 opacity-30">
                     <p className="text-[12px] uppercase tracking-[1.5em] font-bold">Trusted by 12,000+ Orchestrators</p>
                  </motion.div>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* FOOTER */}
      <footer className="p-32 lg:p-80 border-t text-center bg-black/20 backdrop-blur-3xl relative z-10" style={{ borderColor: system.tokens.borderSoft }}>
         <div className="max-w-7xl mx-auto flex flex-col items-center space-y-32">
            <motion.div 
              whileHover={{ rotate: 180, scale: 1.1 }}
              transition={{ duration: 1.5, ease: "anticipate" }}
              className="cursor-pointer shadow-[0_0_50px_rgba(255,255,255,0.1)] rounded-full p-4"
            >
              <BloomLogo size={140} animate={false} />
            </motion.div>
            
            <div className="space-y-12">
              <div className="text-[20px] font-bold uppercase tracking-[2em] opacity-10">BLOOM NEURAL FACTORY</div>
              <p className="text-2xl font-light italic opacity-40 max-w-3xl mx-auto leading-relaxed">
                Intelligence Materialized. Orchestrating the future of startup creation through high-density logic nodes and sensory brand DNA.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-16 text-[12px] uppercase tracking-[0.8em] font-bold" style={{ color: system.tokens.meta }}>
               {['Compliance', 'Governance', 'Privacy Node', 'Audit Logs', 'Protocol Status'].map(item => (
                 <button key={item} className="hover:text-white transition-all hover:tracking-[1.2em] font-bold">{item}</button>
               ))}
            </div>
            
            <div className="pt-32 space-y-6">
              <p className="text-[11px] uppercase tracking-[0.5em] italic opacity-30 font-bold">Experience Build v3.5.0 Stable // Anti-Slop Validated Core</p>
              <div className="flex items-center justify-center gap-10 opacity-15">
                 <Heart size={20} className="hover:text-red-500 transition-colors cursor-pointer" />
                 <Lock size={20} />
                 <Shield size={20} />
              </div>
            </div>
         </div>
      </footer>
    </div>
  );
}
