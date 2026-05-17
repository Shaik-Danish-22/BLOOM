"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, 
  ArrowLeft, 
  Monitor, 
  Smartphone, 
  Tablet, 
  Rocket, 
  ExternalLink,
  Palette,
  Briefcase,
  Layers,
  Search,
  ChevronRight,
  Terminal,
  Cpu,
  Code2,
  Settings,
  Eye,
  CheckCircle2,
  Activity,
  Brain,
  Shield,
  Layout,
  TrendingUp,
  AlertTriangle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { BackgroundEffects } from "@/components/cinematic/BackgroundEffects";
import { useRouter } from "next/navigation";
import { MaterializingWebsite } from "@/components/cinematic/MaterializingWebsite";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GradientBackground } from "@/components/ui/paper-design-shader-background";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { OracleGauge } from "@/components/cinematic/OracleGauge";
import { BloomLogo } from "@/components/cinematic/BloomLogo";
import { Separator } from "@/components/ui/separator";
import { DESIGN_SYSTEMS } from "@/lib/design-systems";
import { cn } from "@/lib/utils";

type Tab = 'preview' | 'registry' | 'dna' | 'thought';

export default function BuilderPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [view, setView] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [mode, setMode] = useState<"materialization" | "strategy">("materialization");
  const [activeTab, setActiveTab] = useState<Tab>("preview");
  const [startupData, setStartupData] = useState<any>(null);
  const [context, setContext] = useState<any>(null);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("latest_startup");
    const storedContext = localStorage.getItem("materialization_context");
    
    if (stored) {
      try {
        const data = JSON.parse(stored);
        setStartupData(data);
        if (storedContext) {
          const ctx = JSON.parse(storedContext);
          setContext(ctx);
          if (ctx.selectedPath === 'research') setMode('strategy');
        }
      } catch (e) {
        console.error("Failed to parse startup data", e);
      }
    } else {
      router.push('/workspace');
    }
  }, [router]);

  const activeSystem = DESIGN_SYSTEMS[(context?.selectedSystem as any) || 'apple'];

  const handleUpdateSystem = (id: string) => {
    setIsSyncing(true);
    const newContext = { ...context, selectedSystem: id };
    setContext(newContext);
    localStorage.setItem("materialization_context", JSON.stringify(newContext));
    
    setTimeout(() => {
      setIsSyncing(false);
      toast({
        title: "Neural Sync Complete",
        description: `Orchestrating design tokens for "${DESIGN_SYSTEMS[id as any].name}" system.`,
      });
    }, 1200);
  };

  return (
    <div className="relative h-screen overflow-hidden flex bg-black text-white font-body selection:bg-[#DCFF00]/30">
      <BackgroundEffects />
      <GradientBackground />
      <div className="absolute inset-0 -z-10 bg-black/40" />

      {/* LEFT SIDEBAR - DESIGN OS PANELS */}
      <aside className="w-[440px] border-r border-white/10 bg-black/95 backdrop-blur-3xl flex flex-col z-30 relative shadow-2xl">
        <header className="p-8 border-b border-white/5 flex items-center justify-between">
           <div className="flex items-center gap-4">
              <BloomLogo size={32} />
              <div className="flex flex-col">
                <h3 className="text-[11px] font-bold uppercase tracking-[0.4em] text-white/40 leading-none">BLOOM STUDIO</h3>
                <span className="text-[14px] font-headline italic text-white/95 mt-1">{startupData?.brand?.companyName || "Project Neural"}</span>
              </div>
           </div>
           <button onClick={() => router.push('/workspace')} className="p-2.5 rounded-xl hover:bg-white/5 text-white/40 hover:text-white transition-all group">
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
           </button>
        </header>

        <div className="flex border-b border-white/10 px-4 py-3 bg-black/60">
           {(['preview', 'registry', 'dna', 'thought'] as Tab[]).map((tab) => (
             <button 
               key={tab}
               onClick={() => setActiveTab(tab)}
               className={cn(
                 "flex-1 py-3 px-2 rounded-xl text-[10px] uppercase tracking-[0.3em] font-bold transition-all flex flex-col items-center gap-2",
                 activeTab === tab ? "bg-white/10 text-[#DCFF00] bloom-button-glow" : "text-white/30 hover:text-white/60"
               )}
             >
               {tab === 'preview' && <Eye size={16} />}
               {tab === 'registry' && <Layers size={16} />}
               {tab === 'dna' && <Activity size={16} />}
               {tab === 'thought' && <Brain size={16} />}
               <span className="opacity-80">{tab}</span>
             </button>
           ))}
        </div>

        <ScrollArea className="flex-1">
           <div className="p-8 space-y-10">
              {activeTab === 'registry' && (
                <div className="space-y-10 animate-in fade-in slide-in-from-left-4 duration-500">
                   <div className="space-y-5">
                      <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-widest text-white/30">
                         <span>Neural Design Systems</span>
                         <Palette size={16} />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                         {Object.values(DESIGN_SYSTEMS).map((sys) => (
                           <button 
                             key={sys.id}
                             onClick={() => handleUpdateSystem(sys.id)}
                             className={cn(
                               "p-5 rounded-2xl border text-left transition-all group relative overflow-hidden",
                               context?.selectedSystem === sys.id 
                               ? "bg-[#DCFF00]/10 border-[#DCFF00]/40 shadow-2xl" 
                               : "bg-white/[0.03] border-white/5 hover:border-white/10"
                             )}
                           >
                              <h4 className={cn("text-[12px] font-bold uppercase tracking-widest mb-1.5", context?.selectedSystem === sys.id ? "text-[#DCFF00]" : "text-white/70")}>{sys.name}</h4>
                              <p className="text-[10px] text-white/40 italic line-clamp-1">{sys.inspiration}</p>
                              {context?.selectedSystem === sys.id && (
                                <motion.div layoutId="sys-glow" className="absolute inset-0 bg-[#DCFF00]/5 pointer-events-none" />
                              )}
                           </button>
                         ))}
                      </div>
                   </div>

                   <div className="space-y-5">
                      <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-widest text-white/30">
                         <span>Component Artifacts</span>
                         <Code2 size={16} />
                      </div>
                      <div className="space-y-3">
                         {['CinematicHero_Node', 'BentoFeatures_Module', 'NeuralPsychology_Section', 'AuditProtocol_Pricing'].map((item) => (
                           <div key={item} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.04] border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all group cursor-pointer">
                              <div className="flex items-center gap-4">
                                 <div className="w-2 h-2 rounded-full bg-[#DCFF00]/60 group-hover:bg-[#DCFF00] group-hover:shadow-[0_0_10px_#DCFF00] transition-all" />
                                 <span className="text-[12px] text-white/70 font-mono tracking-tight group-hover:text-white">{item}</span>
                              </div>
                              <ChevronRight size={14} className="text-white/20 group-hover:text-[#DCFF00] group-hover:translate-x-1 transition-all" />
                           </div>
                         ))}
                      </div>
                   </div>
                </div>
              )}

              {activeTab === 'dna' && (
                <div className="space-y-10 animate-in fade-in slide-in-from-left-4 duration-500">
                   <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-[#DCFF00]/10 to-transparent border border-[#DCFF00]/20 space-y-8 shadow-2xl relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-6 opacity-10">
                        <Activity size={80} />
                      </div>
                      <div className="flex items-center gap-4 text-[#DCFF00]">
                         <Activity size={24} />
                         <span className="text-[12px] font-bold uppercase tracking-[0.4em]">Neural Profile</span>
                      </div>
                      <div className="space-y-8 relative z-10">
                         {[
                           { label: "Startup Archetype", value: context?.enhancedData?.startupArchetype },
                           { label: "Audience Psychology", value: context?.enhancedData?.audiencePsychology },
                           { label: "Brand Personality", value: context?.enhancedData?.brandPersonality },
                           { label: "Sophistication", value: context?.enhancedData?.sophisticationLevel }
                         ].map((item, i) => (
                           <div key={i} className="space-y-2">
                              <span className="text-[10px] text-white/30 uppercase tracking-widest block font-bold">{item.label}</span>
                              <p className="text-[14px] text-white/90 italic leading-relaxed font-medium">{item.value || "Analyzing..."}</p>
                           </div>
                         ))}
                      </div>
                   </div>
                   
                   <div className="space-y-5">
                      <div className="flex items-center gap-4 text-white/40">
                        <Settings size={18} />
                        <span className="text-[11px] font-bold uppercase tracking-widest">Active Logic Tokens</span>
                      </div>
                      <div className="grid grid-cols-1 gap-3">
                        {Object.entries(context?.enhancedData?.designDNA || {}).map(([key, val]: any, i) => (
                          <div key={i} className="p-5 rounded-2xl bg-white/[0.04] border border-white/5 space-y-2 hover:bg-white/[0.06] transition-all group">
                             <span className="text-[9px] uppercase tracking-widest text-[#DCFF00]/50 font-bold group-hover:text-[#DCFF00] transition-colors">{key}</span>
                             <p className="text-[13px] text-white/70 italic leading-relaxed">{val}</p>
                          </div>
                        ))}
                      </div>
                   </div>
                </div>
              )}

              {activeTab === 'thought' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
                   <div className="space-y-5">
                      <div className="flex items-center gap-3 text-[#DCFF00]">
                         <Brain size={20} />
                         <span className="text-[11px] font-bold uppercase tracking-widest">Reasoning Stream</span>
                      </div>
                      <div className="font-mono text-[12px] text-white/40 space-y-5 bg-black/60 p-6 rounded-2xl border border-white/10 shadow-inner">
                        <p className="text-white/80">[NEURAL_LINK] Establishing connection to core prompt intent...</p>
                        <p className="text-[#DCFF00]/60 italic">Analyzing: "{context?.prompt?.substring(0, 80)}..."</p>
                        <p className="text-white/80">[DNA_EXTRACTION] Derived "{context?.enhancedData?.startupArchetype}" archetype.</p>
                        <p className="text-white/80">[ORCHESTRATOR] Routing to "{activeSystem.name}" token system.</p>
                        <p className="text-white/80">[MATERIALIZE] Finalizing CinematicHero_Node assembly.</p>
                        <p className="text-[#DCFF00] animate-pulse font-bold mt-8">_ Awaiting user refinement...</p>
                      </div>
                   </div>
                   
                   <div className="p-6 rounded-[2rem] bg-red-500/5 border border-red-500/20 space-y-4 shadow-xl">
                      <div className="flex items-center gap-3 text-red-500">
                         <Shield size={18} />
                         <span className="text-[11px] font-bold uppercase tracking-widest">Anti-Slop Layer</span>
                      </div>
                      <p className="text-[13px] text-red-500/70 italic leading-relaxed font-medium">
                        Validation active. Correcting generic AI patterns, optimizing typography pacing, and ensuring high-contrast consistency.
                      </p>
                   </div>
                </div>
              )}

              {activeTab === 'preview' && (
                <div className="space-y-10 animate-in fade-in slide-in-from-left-4 duration-500">
                   <div className="space-y-5">
                      <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-widest text-white/30">
                         <span>Experience States</span>
                         <Rocket size={18} />
                      </div>
                      <div className="space-y-3">
                        {['Default State', 'Scroll Reveal', 'Hover Interactions', 'Mobile Entry'].map((state, i) => (
                           <button 
                             key={state}
                             className={cn(
                               "w-full flex items-center justify-between p-4 rounded-xl border transition-all text-left group",
                               i === 0 ? "bg-white/10 border-white/30 text-white shadow-xl" : "bg-white/[0.03] border-white/5 text-white/40 hover:bg-white/10 hover:border-white/20"
                             )}
                           >
                             <span className="text-[12px] font-bold uppercase tracking-widest">{state}</span>
                             {i === 0 && <CheckCircle2 size={14} className="text-[#DCFF00]" />}
                           </button>
                        ))}
                      </div>
                   </div>
                   
                   <div className="p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/10 space-y-8 shadow-2xl relative overflow-hidden">
                      <div className="flex items-center gap-4 text-white/40">
                         <Layout size={20} />
                         <span className="text-[11px] font-bold uppercase tracking-widest">Active Canvas</span>
                      </div>
                      <div className="space-y-8">
                         <div className="space-y-4">
                            <span className="text-[10px] text-white/30 uppercase tracking-widest block font-bold">Accent Palette</span>
                            <div className="flex gap-4">
                               <div className="w-12 h-12 rounded-2xl border border-white/20 shadow-2xl flex flex-col items-center justify-center gap-1" style={{ backgroundColor: activeSystem.tokens.accent }}>
                                  <span className="text-[8px] font-bold text-black opacity-40 uppercase">ACC</span>
                               </div>
                               <div className="w-12 h-12 rounded-2xl border border-white/20 shadow-2xl flex flex-col items-center justify-center gap-1" style={{ backgroundColor: activeSystem.tokens.bg }}>
                                  <span className="text-[8px] font-bold text-white opacity-40 uppercase">BG</span>
                               </div>
                               <div className="w-12 h-12 rounded-2xl border border-white/20 shadow-2xl flex flex-col items-center justify-center gap-1" style={{ backgroundColor: activeSystem.tokens.fg }}>
                                  <span className="text-[8px] font-bold text-black opacity-40 uppercase">FG</span>
                               </div>
                            </div>
                         </div>
                         <div className="space-y-4">
                            <span className="text-[10px] text-white/30 uppercase tracking-widest block font-bold">Typography</span>
                            <div className="p-5 rounded-2xl bg-black/40 border border-white/10 text-[14px] text-white/95 italic font-headline leading-tight shadow-inner">
                               {activeSystem.tokens.fontDisplay}
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
              )}
           </div>
        </ScrollArea>

        <div className="p-8 border-t border-white/10 bg-black/60 shadow-2xl">
           <div className="relative group">
              <input 
                placeholder="Direct Scissor refinement..."
                className="w-full bg-white/5 border border-white/10 h-14 rounded-2xl px-6 text-[14px] text-white focus:ring-1 focus:ring-[#DCFF00]/40 outline-none transition-all placeholder:text-white/20 shadow-inner"
              />
              <Button size="icon" className="absolute right-1.5 top-1.5 h-11 w-11 bg-white text-black hover:bg-[#DCFF00] rounded-xl transition-all active:scale-90 shadow-2xl">
                 <Send size={18} />
              </Button>
           </div>
        </div>
      </aside>

      {/* MAIN VIEWPORT - CINEMATIC CANVAS */}
      <main className="flex-1 flex flex-col z-20 p-8 overflow-hidden relative">
         <header className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3 bg-black/80 backdrop-blur-3xl p-1.5 rounded-2xl border border-white/10 shadow-2xl">
               {[
                 { id: 'desktop', icon: Monitor },
                 { id: 'tablet', icon: Tablet },
                 { id: 'mobile', icon: Smartphone }
               ].map((item) => (
                 <button 
                   key={item.id}
                   onClick={() => setView(item.id as any)} 
                   className={cn(
                     "p-3 rounded-xl transition-all",
                     view === item.id ? "bg-white text-black shadow-2xl" : "text-white/30 hover:text-white/60"
                   )}
                 >
                   <item.icon size={18} />
                 </button>
               ))}
               <div className="w-px h-6 bg-white/10 mx-2" />
               <div className="flex bg-black/40 rounded-xl p-1">
                  <button 
                    onClick={() => setMode('materialization')}
                    className={cn(
                      "px-6 py-2.5 rounded-lg text-[10px] uppercase tracking-widest font-bold transition-all flex items-center gap-3",
                      mode === 'materialization' ? "bg-white/10 text-white shadow-inner" : "text-white/30 hover:text-white/60"
                    )}
                  >
                    <Layout size={14} /> Design & Build
                  </button>
                  <button 
                    onClick={() => setMode('strategy')}
                    className={cn(
                      "px-6 py-2.5 rounded-lg text-[10px] uppercase tracking-widest font-bold transition-all flex items-center gap-3",
                      mode === 'strategy' ? "bg-white/10 text-white shadow-inner" : "text-white/30 hover:text-white/60"
                    )}
                  >
                    <Search size={14} /> Research & Insight
                  </button>
               </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 mr-6">
                 <Terminal size={14} className="text-[#DCFF00]" />
                 <span className="text-[11px] font-mono text-[#DCFF00]/60 uppercase tracking-widest">Studio_v3.5_Stable</span>
              </div>
              <Button variant="ghost" className="text-white/40 hover:text-white hover:bg-white/5 gap-3 text-[10px] uppercase tracking-[0.2em] font-bold px-6 h-12 rounded-xl">
                Preview <ExternalLink size={14} />
              </Button>
              <Button className="bg-[#DCFF00] text-black hover:bg-[#DCFF00]/90 rounded-2xl px-8 h-12 font-bold uppercase tracking-widest text-[11px] shadow-[0_0_30px_rgba(220,255,0,0.3)] transition-all active:scale-95 group">
                 <Rocket size={15} className="mr-3 group-hover:-translate-y-1 transition-transform" /> Neural Deploy
              </Button>
            </div>
         </header>

         <div className="flex-1 flex items-center justify-center bg-white/[0.02] rounded-[3.5rem] border border-white/5 p-6 overflow-hidden backdrop-blur-md relative shadow-inner">
            <div className="absolute inset-0 pointer-events-none border-[12px] border-black/30 rounded-[3.5rem] z-20" />
            
            <AnimatePresence>
              {isSyncing && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur-2xl"
                >
                  <BloomLogo size={120} />
                  <p className="mt-8 text-[12px] uppercase tracking-[0.5em] font-bold text-[#DCFF00] animate-pulse">Syncing Neural Tokens...</p>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div 
              layout
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "h-full bg-black rounded-[2.5rem] border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.8)] overflow-hidden relative",
                view === 'desktop' ? 'w-full' : view === 'tablet' ? 'w-[768px]' : 'w-[375px]'
              )}
            >
               <div className="h-full w-full overflow-y-auto no-scrollbar bg-black relative">
                  {mode === 'materialization' ? (
                    <MaterializingWebsite isVisible={true} data={startupData} context={context} />
                  ) : (
                    <div className="p-16 space-y-24 bg-black min-h-full relative overflow-y-auto no-scrollbar selection:bg-white/10 animate-in fade-in zoom-in-95 duration-1000">
                       <header className="flex flex-col md:flex-row items-end justify-between border-b border-white/10 pb-16 gap-12">
                          <div className="space-y-8 max-w-3xl">
                             <div className="flex items-center gap-6">
                                <Badge className="bg-[#DCFF00] text-black border-none px-6 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest shadow-[0_0_30px_rgba(220,255,0,0.3)]">
                                  Shark Protocol v3.5
                                </Badge>
                                <span className="text-[11px] text-white/40 uppercase tracking-[0.4em] font-bold">FounderOS Intelligence Core</span>
                             </div>
                             <h2 className="text-7xl font-headline italic text-white/95 leading-[0.85] tracking-tighter">Strategic <br/> Intelligence Hub</h2>
                             <p className="text-white/50 text-xl font-light leading-relaxed italic max-w-2xl">
                               Recursive analysis of {startupData?.brand?.companyName || 'Startup'} through our multi-billion dollar shark intelligence layer. Identify risks, size markets, and validate logic before execution.
                             </p>
                          </div>
                          <div className="flex items-center gap-12 bg-white/[0.03] border border-white/10 p-10 rounded-[3.5rem] backdrop-blur-3xl shadow-2xl">
                             <div className="text-right space-y-3">
                                <span className="text-[11px] text-white/30 uppercase tracking-[0.5em] block font-bold">Viability Score</span>
                                <span className="text-8xl font-headline italic text-[#DCFF00] tracking-tighter shadow-[#DCFF00]/10 text-glow">
                                  {context?.enhancedData?.oracleScore || '92'}
                                  <span className="text-3xl text-white/10 ml-3">/100</span>
                                </span>
                             </div>
                             <div className="w-28 h-28">
                                <OracleGauge targetScore={context?.enhancedData?.oracleScore || 92} className="scale-[0.5]" />
                             </div>
                          </div>
                       </header>

                       <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 relative z-10">
                          {/* EXECUTIVE NEURAL BRIEF */}
                          <Card className="lg:col-span-3 p-12 rounded-[3.5rem] bg-gradient-to-br from-white/[0.08] to-transparent border border-white/10 space-y-10 backdrop-blur-3xl shadow-2xl">
                             <div className="flex items-center justify-between">
                                <div className="flex items-center gap-5 text-[#DCFF00]">
                                   <Activity size={24} />
                                   <h4 className="text-[12px] font-bold uppercase tracking-[0.4em]">Executive Neural Brief</h4>
                                </div>
                                <div className="flex items-center gap-3 text-white/30">
                                   <CheckCircle2 size={16} className="text-[#DCFF00]" />
                                   <span className="text-[11px] font-bold uppercase tracking-widest">Anti-Slop Logic Validated</span>
                                </div>
                             </div>
                             <p className="text-4xl font-headline italic text-white/90 leading-relaxed max-w-5xl">
                                {startupData?.brand?.rationale || "Consolidating neural identity..."}
                             </p>
                             <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pt-8 border-t border-white/5">
                                {[
                                  { label: "Neural Tone", value: startupData?.brand?.tone },
                                  { label: "Sophistication", value: context?.enhancedData?.sophisticationLevel },
                                  { label: "Archetype", value: context?.enhancedData?.startupArchetype },
                                  { label: "Design System", value: activeSystem.name }
                                ].map((item, i) => (
                                  <div key={i} className="space-y-2">
                                     <span className="text-[10px] text-white/30 uppercase tracking-widest block font-bold">{item.label}</span>
                                     <p className="text-lg font-bold text-white/70">{item.value || "Calculating..."}</p>
                                  </div>
                                ))}
                             </div>
                          </Card>

                          {/* THE SHARK VERDICT */}
                          <Card className="lg:col-span-2 p-16 rounded-[4rem] bg-white/[0.03] border border-white/10 space-y-12 backdrop-blur-3xl group shadow-2xl relative overflow-hidden">
                             <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity duration-1000">
                                <Briefcase size={120} className="text-[#DCFF00]" />
                             </div>
                             <div className="flex items-center gap-6 text-[#DCFF00]">
                                <div className="w-14 h-14 rounded-[1.5rem] bg-[#DCFF00]/10 flex items-center justify-center border border-[#DCFF00]/20 shadow-2xl">
                                   <Briefcase size={28} />
                                </div>
                                <h4 className="text-[14px] font-bold uppercase tracking-[0.4em]">The Shark Verdict</h4>
                             </div>
                             <div className="space-y-8">
                               <p className="text-5xl font-headline italic text-white/95 leading-[1.2] max-w-4xl tracking-tight">
                                  {context?.enhancedData?.strategicVerdict || "Analyzing market congestions..."}
                               </p>
                               <p className="text-2xl text-white/50 font-light leading-relaxed italic max-w-3xl">
                                  {startupData?.intelligence?.marketAnalysis || "Waiting for neural consensus..."}
                               </p>
                             </div>
                          </Card>

                          {/* MARKET SIZING */}
                          <Card className="p-12 rounded-[4rem] bg-white/[0.02] border border-white/10 space-y-12 backdrop-blur-3xl shadow-2xl">
                             <div className="flex items-center gap-5 text-white/40">
                                <TrendingUp size={24} />
                                <h4 className="text-[12px] font-bold uppercase tracking-[0.4em]">Opportunity Map</h4>
                             </div>
                             <div className="space-y-10">
                                <div className="space-y-3">
                                   <span className="text-[11px] text-white/30 uppercase tracking-[0.2em] block font-bold">TAM (Total Market)</span>
                                   <span className="text-3xl font-headline italic text-[#DCFF00]">{startupData?.intelligence?.tamSamSom?.tam || "$15.6T"}</span>
                                </div>
                                <div className="space-y-3">
                                   <span className="text-[11px] text-white/30 uppercase tracking-[0.2em] block font-bold">SAM (Serviceable)</span>
                                   <span className="text-3xl font-headline italic text-white/80">{startupData?.intelligence?.tamSamSom?.sam || "$240B"}</span>
                                </div>
                                <div className="space-y-3">
                                   <span className="text-[11px] text-white/30 uppercase tracking-[0.2em] block font-bold">SOM (Obtainable)</span>
                                   <span className="text-3xl font-headline italic text-white/60">{startupData?.intelligence?.tamSamSom?.som || "$2.4B"}</span>
                                </div>
                             </div>
                          </Card>

                          {/* STRATEGIC RISKS */}
                          <Card className="lg:col-span-1 p-12 rounded-[3.5rem] bg-white/[0.02] border border-white/10 space-y-10 backdrop-blur-3xl shadow-2xl">
                             <div className="flex items-center gap-5 text-red-500">
                                <AlertTriangle size={24} />
                                <h4 className="text-[12px] font-bold uppercase tracking-[0.4em]">Critical Risks</h4>
                             </div>
                             <div className="space-y-5">
                                {(startupData?.intelligence?.risks || ["Saturated Market", "Execution Risk"]).map((risk: string, i: number) => (
                                  <div key={i} className="flex items-center gap-5 p-5 rounded-[2rem] bg-red-500/5 border border-red-500/10 hover:bg-red-500/10 transition-all cursor-default group">
                                     <div className="w-2 h-2 rounded-full bg-red-500 group-hover:scale-150 transition-transform" />
                                     <span className="text-[14px] text-red-500 font-bold uppercase tracking-widest">{risk}</span>
                                  </div>
                                ))}
                             </div>
                          </Card>

                          {/* STRATEGIC MOATS */}
                          <Card className="lg:col-span-2 p-12 rounded-[3.5rem] bg-white/[0.02] border border-white/10 space-y-10 backdrop-blur-3xl shadow-2xl">
                             <div className="flex items-center gap-5 text-[#DCFF00]">
                                <Target size={24} />
                                <h4 className="text-[12px] font-bold uppercase tracking-[0.4em]">Identified Moats</h4>
                             </div>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                {(startupData?.intelligence?.moats || []).map((moat: string, i: number) => (
                                  <div key={i} className="p-10 rounded-[2.5rem] bg-white/[0.04] border border-white/10 space-y-5 hover:bg-white/[0.08] transition-all group">
                                     <h5 className="text-[11px] font-bold uppercase tracking-widest text-[#DCFF00] opacity-40 group-hover:opacity-100 transition-opacity">Neural Node 0{i + 1}</h5>
                                     <p className="text-2xl font-headline italic text-white/90 leading-tight">{moat}</p>
                                  </div>
                                ))}
                             </div>
                          </Card>
                       </div>
                    </div>
                  )}
               </div>
            </motion.div>
         </div>
      </main>
    </div>
  );
}
