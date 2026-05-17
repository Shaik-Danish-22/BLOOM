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
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 80, filter: "blur(40px)" },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 1.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <div 
      className={cn(
        "min-h-full transition-all duration-[2000ms] relative overflow-x-hidden selection:bg-white/10",
        stage === 'wireframe' && "grayscale opacity-10 blur-[120px]",
        stage === 'layout' && "grayscale opacity-30 blur-[60px]",
        stage === 'content' && "opacity-80 blur-[20px]"
      )} 
      style={{ 
        backgroundColor: system.tokens.bg,
        color: system.tokens.fg,
        fontFamily: system.tokens.fontBody
      }}
    >
      
      {/* GLOBAL NAVIGATION */}
      <nav 
        className="fixed top-0 left-0 right-0 z-[200] p-10 lg:px-24 flex justify-between items-center bg-black/5 backdrop-blur-3xl border-b"
        style={{ borderColor: system.tokens.borderSoft }}
      >
         <motion.div 
           initial={{ opacity: 0, x: -30 }}
           animate={{ opacity: 1, x: 0 }}
           className="text-4xl font-headline italic tracking-tighter flex items-center gap-6 cursor-pointer group" 
           onClick={() => setActivePage('home')}
         >
            <BloomLogo size={48} className="transition-transform group-hover:rotate-180 duration-1000" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-current to-current/60 drop-shadow-2xl">
              {startupData.brand?.companyName || "BLOOM"}
            </span>
         </motion.div>
         
         <div className="hidden lg:flex items-center gap-20 text-[12px] font-bold uppercase tracking-[0.6em]" style={{ color: system.tokens.muted }}>
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
                    layoutId="nav-pill-active" 
                    className="absolute -bottom-4 left-0 right-0 h-1 bg-current shadow-[0_0_20px_currentColor]" 
                  />
                )}
              </button>
            ))}
         </div>

         <div className="flex items-center gap-10">
            <Button variant="ghost" className="text-[12px] uppercase tracking-widest font-bold hidden sm:flex hover:bg-transparent transition-all hover:tracking-widest" style={{ color: system.tokens.meta }}>Registry Node</Button>
            <Button 
              className="rounded-full px-16 h-20 text-[12px] font-bold uppercase tracking-[0.3em] transition-all hover:scale-110 active:scale-95 shadow-[0_30px_60px_rgba(0,0,0,0.3)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.4)]" 
              style={{ backgroundColor: system.tokens.accent, color: system.tokens.accentOn }}
            >
               Initialize Link
            </Button>
         </div>
      </nav>

      <main className="pt-40 min-h-screen">
        <AnimatePresence mode="wait">
          {activePage === 'home' && (
            <motion.div
              key="home"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, scale: 0.98, filter: "blur(20px)", transition: { duration: 0.8 } }}
              className="space-y-0"
            >
              {/* EXTRAVAGANT HERO */}
              <section className="px-10 py-64 lg:py-96 text-center relative flex flex-col items-center justify-center overflow-hidden min-h-[100vh]">
                 <div className="absolute inset-0 z-0">
                    <div 
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[2400px] h-[1200px] blur-[600px] rounded-full opacity-30 animate-pulse" 
                      style={{ backgroundColor: system.tokens.accent }} 
                    />
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
                    <div className="absolute inset-0 opacity-[0.1] mix-blend-overlay grayscale pointer-events-none">
                      <Image 
                        src={`https://picsum.photos/seed/${isCoffee ? 'coffee' : 'tech'}/1920/1080`}
                        alt="Background"
                        fill
                        className="object-cover"
                        data-ai-hint={isCoffee ? "coffee artisanal" : "minimal high-tech"}
                      />
                    </div>
                 </div>
                 
                 <div className="space-y-24 relative z-10 max-w-7xl px-6">
                    <motion.div
                      variants={itemVariants}
                      className="inline-flex items-center gap-8 px-12 py-5 rounded-full border bg-white/[0.05] text-[12px] uppercase tracking-[0.7em] font-bold mx-auto shadow-2xl backdrop-blur-3xl border-white/20"
                      style={{ color: system.tokens.muted }}
                    >
                      <div className="w-3 h-3 rounded-full bg-current animate-ping" />
                      {startupData.brand?.tone || "Neural Orchestration"}
                    </motion.div>

                    <div className="space-y-16">
                      <motion.h2 
                        variants={itemVariants}
                        className="text-9xl lg:text-[20rem] italic leading-[0.7] tracking-tighter font-headline text-glow drop-shadow-2xl"
                        style={{ color: system.tokens.fg }}
                      >
                        {heroSection?.title || "Vision Materialized."}
                      </motion.h2>

                      <motion.p 
                        variants={itemVariants}
                        className="text-4xl lg:text-7xl max-w-6xl mx-auto font-light leading-[1.0] italic opacity-90 tracking-tight"
                        style={{ color: system.tokens.muted }}
                      >
                        {heroSection?.subtitle || startupData.brand?.tagline}
                      </motion.p>
                    </div>

                    <motion.div variants={itemVariants} className="pt-24 flex flex-col md:flex-row items-center justify-center gap-16">
                      <Button 
                        className="px-24 h-32 rounded-full font-bold text-4xl transition-all hover:scale-110 active:scale-95 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] hover:shadow-[0_80px_160px_-20px_rgba(0,0,0,0.6)]" 
                        style={{ backgroundColor: system.tokens.accent, color: system.tokens.accentOn }}
                      >
                        {heroSection?.ctaLabel || "Establish Link"} <ArrowRight className="ml-10 w-12 h-12" strokeWidth={4} />
                      </Button>
                      <button 
                        className="flex items-center gap-10 text-[16px] uppercase tracking-[1em] font-bold transition-all group opacity-40 hover:opacity-100 hover:tracking-[1.2em]"
                        style={{ color: system.tokens.meta }}
                      >
                         Technical Brief <ChevronRight className="group-hover:translate-x-6 transition-transform w-10 h-10" />
                      </button>
                    </motion.div>
                 </div>

                 <motion.div 
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 0.4 }}
                   transition={{ delay: 3, duration: 2 }}
                   className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-8"
                 >
                    <span className="text-[12px] uppercase tracking-[0.6em] font-bold opacity-30">Scroll to Explore</span>
                    <div className="w-1 h-32 bg-gradient-to-b from-current to-transparent opacity-20" />
                 </motion.div>
              </section>

              {/* NEURAL AUDIT STATS */}
              <section 
                className="px-10 lg:px-24 py-64 grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24 border-y bg-black/20 backdrop-blur-3xl"
                style={{ borderColor: system.tokens.borderSoft }}
              >
                 {[
                   { label: isCoffee ? "Extraction Accuracy" : "Neural Latency", value: isCoffee ? "99.9%" : "0.2ms", icon: Activity, desc: "Real-time network synchronization" },
                   { label: "Audit Validation", value: "Verified", icon: Shield, desc: "FounderOS Protocol Active" },
                   { label: "Global Reach", value: "Infinite", icon: Globe, desc: "Distributed Neural Nodes" }
                 ].map((stat, i) => (
                   <motion.div 
                     key={i} 
                     variants={itemVariants}
                     className="flex flex-col items-center text-center space-y-12 p-24 border bg-white/[0.02] group hover:bg-white/[0.06] transition-all relative overflow-hidden shadow-2xl"
                     style={{ borderColor: system.tokens.borderSoft, borderRadius: system.tokens.radiusLg }}
                   >
                      <div className="absolute top-0 right-0 p-16 opacity-0 group-hover:opacity-[0.05] transition-all duration-1000 group-hover:scale-150 group-hover:-rotate-12 pointer-events-none">
                         <stat.icon size={280} />
                      </div>
                      <div className="w-24 h-24 rounded-[2rem] bg-white/10 flex items-center justify-center transition-all duration-1000 group-hover:scale-125 group-hover:rotate-12 shadow-[0_30px_60px_rgba(0,0,0,0.4)] border border-white/10">
                        <stat.icon size={48} style={{ color: system.tokens.accent }} />
                      </div>
                      <div className="space-y-6">
                        <span className="text-[14px] uppercase tracking-[0.7em] font-bold opacity-30 group-hover:opacity-100 transition-opacity" style={{ color: system.tokens.muted }}>{stat.label}</span>
                        <p className="text-9xl font-headline italic drop-shadow-2xl" style={{ color: system.tokens.fg }}>{stat.value}</p>
                        <p className="text-[12px] uppercase tracking-[0.5em] font-bold opacity-20 italic leading-relaxed">{stat.desc}</p>
                      </div>
                   </motion.div>
                 ))}
              </section>

              {/* BENTO ARCHITECTURE */}
              <section className="px-10 lg:px-24 py-80 bg-black/30 relative z-10 overflow-hidden">
                 <div className="max-w-[1800px] mx-auto space-y-48">
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-24">
                       <div className="space-y-16 max-w-6xl">
                          <motion.div 
                            variants={itemVariants}
                            className="inline-flex items-center gap-8 uppercase tracking-[1em] text-[14px] font-bold shadow-2xl"
                            style={{ color: system.tokens.accent }}
                          >
                             <Brain size={32} /> Logic Architecture Core
                          </motion.div>
                          <motion.h3 
                            variants={itemVariants}
                            className="text-9xl lg:text-[15rem] font-headline italic tracking-tighter leading-[0.8] text-glow drop-shadow-2xl"
                            style={{ color: system.tokens.fg }}
                          >
                             {problemSection?.title || "The Logic Gap."}
                          </motion.h3>
                       </div>
                       <motion.div variants={itemVariants} className="pb-12">
                          <p className="text-4xl font-light italic max-w-xl leading-relaxed opacity-70 tracking-tight" style={{ color: system.tokens.muted }}>
                            {problemSection?.subtitle}
                          </p>
                       </motion.div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                       <motion.div 
                         variants={itemVariants} 
                         className="lg:col-span-8 h-[800px] rounded-[5rem] bg-gradient-to-br from-white/[0.08] to-transparent border border-white/10 p-28 flex flex-col justify-end relative overflow-hidden group shadow-[0_80px_160px_rgba(0,0,0,0.6)]"
                       >
                          <div className="absolute top-0 right-0 p-28 opacity-[0.05] group-hover:scale-125 transition-transform duration-[6s] pointer-events-none">
                             <Box size={700} strokeWidth={0.3} />
                          </div>
                          <div className="space-y-12 relative z-10">
                             <h4 className="text-7xl lg:text-9xl font-headline italic drop-shadow-2xl">Neural Orchestration</h4>
                             <p className="text-3xl font-light italic opacity-70 max-w-3xl leading-relaxed tracking-tight">
                               Our platform leverages advanced high-density logic nodes to materialize startup visions with extraordinary precision and high-fidelity sensory branding.
                             </p>
                             <Button variant="link" className="p-0 text-3xl font-headline italic group-hover:translate-x-10 transition-all h-auto text-white gap-6">
                                Explore the Protocol <ArrowRight size={40} />
                             </Button>
                          </div>
                       </motion.div>
                       <motion.div 
                         variants={itemVariants} 
                         className="lg:col-span-4 h-[800px] rounded-[5rem] bg-white/[0.03] border border-white/10 p-24 flex flex-col items-center justify-center text-center space-y-20 group shadow-[0_80px_160px_rgba(0,0,0,0.6)]"
                       >
                          <div className="w-56 h-56 rounded-full border border-dashed border-[#DCFF00]/30 flex items-center justify-center group-hover:rotate-180 transition-all duration-[10s] relative">
                             <div className="absolute inset-0 bg-[#DCFF00]/10 blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity" />
                             <Sparkles size={80} className="opacity-50 text-[#DCFF00] drop-shadow-[0_0_20px_#DCFF00]" />
                          </div>
                          <div className="space-y-8">
                             <h4 className="text-5xl font-headline italic drop-shadow-2xl">Direct Precision</h4>
                             <p className="text-[14px] uppercase tracking-[0.8em] font-bold opacity-30 italic">FounderOS Protocol Validated</p>
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
              exit={{ opacity: 0, x: -40, filter: "blur(20px)", transition: { duration: 0.8 } }}
              className="px-10 lg:px-24 py-80"
            >
              <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-48 lg:gap-80 items-start">
                 <div className="space-y-28 sticky top-72">
                    <div className="space-y-12">
                      <motion.span variants={itemVariants} className="text-[16px] uppercase tracking-[1.2em] font-bold opacity-40 block" style={{ color: system.tokens.muted }}>Strategic Intelligence</motion.span>
                      <motion.h3 variants={itemVariants} className="text-9xl lg:text-[18rem] font-headline italic tracking-tighter leading-[0.7] text-glow drop-shadow-2xl" style={{ color: system.tokens.fg }}>
                         {isCoffee ? "The Ritual." : "The Neural Core."}
                      </motion.h3>
                    </div>
                    <motion.p variants={itemVariants} className="text-5xl font-light italic leading-[1.1] max-w-2xl opacity-80 tracking-tight" style={{ color: system.tokens.muted }}>
                       Every interaction is a calculation. Every pixel is intentional. Our architecture is designed strictly for the extraordinary orchestrator.
                    </motion.p>
                    <motion.div variants={itemVariants} className="pt-16">
                       <Button 
                         className="h-28 px-24 rounded-full font-bold uppercase tracking-[0.5em] text-[14px] shadow-[0_40px_80px_rgba(0,0,0,0.5)] transition-all hover:scale-110 active:scale-95"
                         style={{ backgroundColor: system.tokens.accent, color: system.tokens.accentOn }}
                       >
                          View Tech Specifications <ExternalLink className="ml-10" size={32} />
                       </Button>
                    </motion.div>
                 </div>

                 <div className="space-y-20">
                    {featuresSection?.items?.map((item, i) => (
                      <motion.div 
                        key={i} 
                        variants={itemVariants}
                        className="p-24 border bg-white/[0.02] backdrop-blur-3xl flex items-start gap-20 group hover:bg-white/[0.08] transition-all cursor-pointer relative overflow-hidden shadow-[0_60px_120px_rgba(0,0,0,0.4)]"
                        style={{ borderColor: system.tokens.borderSoft, borderRadius: system.tokens.radiusLg }}
                      >
                         <div className="absolute inset-0 bg-gradient-to-br from-current to-transparent opacity-0 group-hover:opacity-[0.06] transition-opacity duration-1000" style={{ color: system.tokens.accent }} />
                         <div 
                           className="w-24 h-24 rounded-[2.5rem] flex items-center justify-center shrink-0 font-headline italic text-5xl transition-all duration-1000 group-hover:rotate-12 group-hover:scale-125 shadow-2xl border border-white/10" 
                           style={{ backgroundColor: system.tokens.accent, color: system.tokens.accentOn }}
                         >
                            0{i + 1}
                         </div>
                         <div className="space-y-8">
                            <h4 className="text-5xl lg:text-7xl font-headline italic group-hover:translate-x-8 transition-transform duration-1000 text-glow drop-shadow-2xl" style={{ color: system.tokens.fg }}>{item}</h4>
                            <div className="flex items-center gap-6 opacity-30 group-hover:opacity-100 transition-opacity duration-700">
                               <CheckCircle2 size={24} style={{ color: system.tokens.accent }} />
                               <span className="text-[14px] uppercase tracking-[0.5em] font-bold">Validated Module 0{i+1}</span>
                            </div>
                            <p className="text-2xl font-light italic opacity-50 leading-relaxed max-w-lg tracking-tight">
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
              exit={{ opacity: 0, scale: 0.95, filter: "blur(20px)", transition: { duration: 0.8 } }}
              className="px-10 lg:px-24 py-80 text-center"
            >
               <div className="max-w-[1600px] mx-auto space-y-64">
                  <div className="space-y-16">
                    <motion.span variants={itemVariants} className="text-[16px] uppercase tracking-[1.5em] font-bold opacity-30 block" style={{ color: system.tokens.muted }}>Access Protocol</motion.span>
                    <motion.h3 variants={itemVariants} className="text-9xl lg:text-[18rem] font-headline italic tracking-tighter leading-none text-glow drop-shadow-2xl" style={{ color: system.tokens.fg }}>Materialize Reality.</motion.h3>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
                     {[
                       { name: "Visionary", price: "$49", desc: "For the individual creator materializing first neural concepts.", perks: ["10 Neural Materializations / mo", "Design DNA Registry", "Standard Oracle Score", "Scissor Assistant Pro"] },
                       { name: "Architect", price: "$149", desc: "For professional agencies building high-density startup identities.", perks: ["Unlimited Materializations", "Shark Intelligence Layer", "Anti-Slop Logic Validated", "Priority Neural Compute"], active: true }
                     ].map((tier) => (
                       <motion.div 
                         key={tier.name}
                         variants={itemVariants}
                         className={cn(
                           "p-28 border bg-white/[0.02] space-y-24 text-left group hover:bg-white/[0.05] transition-all relative overflow-hidden shadow-[0_100px_200px_rgba(0,0,0,0.6)] backdrop-blur-3xl",
                           tier.active && "border-current"
                         )}
                         style={{ borderRadius: system.tokens.radiusLg, borderColor: tier.active ? system.tokens.accent : system.tokens.borderSoft }}
                       >
                          {tier.active && (
                            <div className="absolute top-16 right-16 text-[12px] uppercase tracking-[0.6em] font-bold px-10 py-4 rounded-full backdrop-blur-3xl shadow-2xl border border-white/20" style={{ backgroundColor: system.tokens.accent, color: system.tokens.accentOn }}>
                              Preferred Node
                            </div>
                          )}
                          <div className="space-y-10">
                             <h4 className="text-7xl font-headline italic drop-shadow-2xl" style={{ color: system.tokens.fg }}>{tier.name}</h4>
                             <p className="text-3xl font-light italic opacity-60 max-w-md leading-relaxed tracking-tight">{tier.desc}</p>
                             <div className="flex items-end gap-6 pt-10">
                                <span className="text-[12rem] font-headline italic text-glow leading-none" style={{ color: system.tokens.accent }}>{tier.price}</span>
                                <span className="text-3xl opacity-30 mb-8 uppercase tracking-[0.3em] font-bold">/mo</span>
                             </div>
                          </div>
                          
                          <div className="h-px w-full bg-white/10" />

                          <ul className="space-y-10">
                             {tier.perks.map(perk => (
                               <li key={perk} className="flex items-center gap-8 text-[16px] uppercase tracking-[0.5em] font-bold opacity-40 group-hover:opacity-100 transition-opacity duration-700">
                                 <Plus size={24} style={{ color: system.tokens.accent }} /> {perk}
                               </li>
                             ))}
                          </ul>
                          <Button 
                            className="w-full h-32 rounded-full font-bold uppercase tracking-[0.6em] text-[14px] shadow-[0_40px_80px_rgba(0,0,0,0.4)] transition-all hover:scale-105 active:scale-95 border-none"
                            style={{ 
                              backgroundColor: tier.active ? system.tokens.accent : 'white', 
                              color: tier.active ? system.tokens.accentOn : 'black'
                            }}
                          >
                            Initialize {tier.name} Access
                          </Button>
                       </motion.div>
                     ))}
                  </div>

                  <motion.div variants={itemVariants} className="pt-40 opacity-20">
                     <p className="text-[14px] uppercase tracking-[2em] font-bold">Trusted by 14,000+ Visionary Orchestrators</p>
                  </motion.div>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* FOOTER */}
      <footer className="p-40 lg:p-96 border-t text-center bg-black/40 backdrop-blur-3xl relative z-10" style={{ borderColor: system.tokens.borderSoft }}>
         <div className="max-w-7xl mx-auto flex flex-col items-center space-y-40">
            <motion.div 
              whileHover={{ rotate: 180, scale: 1.1 }}
              transition={{ duration: 1.5, ease: "anticipate" }}
              className="cursor-pointer shadow-[0_0_100px_rgba(255,255,255,0.1)] rounded-full p-8 bg-white/5 border border-white/10"
            >
              <BloomLogo size={180} animate={false} />
            </motion.div>
            
            <div className="space-y-16">
              <div className="text-[28px] font-bold uppercase tracking-[2.5em] opacity-10 leading-none">BLOOM NEURAL FACTORY</div>
              <p className="text-3xl font-light italic opacity-50 max-w-4xl mx-auto leading-relaxed tracking-tight">
                Intelligence Materialized. Orchestrating the future of startup creation through high-density logic nodes and high-fidelity sensory branding.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-20 text-[14px] uppercase tracking-[1em] font-bold" style={{ color: system.tokens.meta }}>
               {['Compliance', 'Governance', 'Privacy Node', 'Audit Logs', 'Protocol Status'].map(item => (
                 <button key={item} className="hover:text-white transition-all hover:tracking-[1.4em] font-bold">{item}</button>
               ))}
            </div>
            
            <div className="pt-48 space-y-10">
              <p className="text-[13px] uppercase tracking-[0.7em] italic opacity-20 font-bold">Experience Build v3.8.0 Stable // FounderOS Validated Core</p>
              <div className="flex items-center justify-center gap-16 opacity-10">
                 <Heart size={28} className="hover:text-red-500 transition-colors cursor-pointer" />
                 <Lock size={28} />
                 <Shield size={28} />
              </div>
            </div>
         </div>
      </footer>
    </div>
  );
}
