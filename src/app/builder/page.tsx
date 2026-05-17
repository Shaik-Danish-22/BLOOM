"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, 
  ArrowLeft, 
  Monitor, 
  Smartphone, 
  Tablet, 
  Rocket, 
  ExternalLink,
  Bot,
  Shield,
  Layout,
  Target,
  Activity,
  Brain,
  Palette,
  Briefcase,
  Layers,
  Search,
  ChevronRight,
  Terminal,
  Cpu,
  Code2,
  GitBranch,
  Settings,
  Eye,
  CheckCircle2,
  Zap,
  Globe,
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
import { DESIGN_SYSTEMS, DesignSystemTokens } from "@/lib/design-systems";
import { cn } from "@/lib/utils";

type Tab = 'preview' | 'code' | 'dna' | 'registry' | 'thought';

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
        setStartupData(JSON.parse(stored));
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
      <aside className="w-[420px] border-r border-white/5 bg-black/90 backdrop-blur-3xl flex flex-col z-30 relative">
        <header className="p-6 border-b border-white/5 flex items-center justify-between">
           <div className="flex items-center gap-3">
              <BloomLogo size={24} />
              <div className="flex flex-col">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/40 leading-none">BLOOM STUDIO</h3>
                <span className="text-[12px] font-headline italic text-white/80 mt-1">{startupData?.brand?.companyName || "Project Neural"}</span>
              </div>
           </div>
           <button onClick={() => router.push('/workspace')} className="p-2.5 rounded-xl hover:bg-white/5 text-white/40 hover:text-white transition-all">
              <ArrowLeft size={16} />
           </button>
        </header>

        <div className="flex border-b border-white/5 px-2 py-2 bg-black/40">
           {(['preview', 'registry', 'dna', 'thought'] as Tab[]).map((tab) => (
             <button 
               key={tab}
               onClick={() => setActiveTab(tab)}
               className={cn(
                 "flex-1 py-2 px-3 rounded-lg text-[9px] uppercase tracking-[0.3em] font-bold transition-all flex flex-col items-center gap-1.5",
                 activeTab === tab ? "bg-white/5 text-[#DCFF00]" : "text-white/20 hover:text-white/40"
               )}
             >
               {tab === 'preview' && <Eye size={14} />}
               {tab === 'registry' && <Layers size={14} />}
               {tab === 'dna' && <Activity size={14} />}
               {tab === 'thought' && <Brain size={14} />}
               {tab}
             </button>
           ))}
        </div>

        <ScrollArea className="flex-1">
           <div className="p-6 space-y-8">
              {activeTab === 'registry' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
                   <div className="space-y-4">
                      <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-white/20">
                         <span>Neural Design Systems</span>
                         <Palette size={14} />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                         {Object.values(DESIGN_SYSTEMS).map((sys) => (
                           <button 
                             key={sys.id}
                             onClick={() => handleUpdateSystem(sys.id)}
                             className={cn(
                               "p-4 rounded-2xl border text-left transition-all group",
                               context?.selectedSystem === sys.id 
                               ? "bg-[#DCFF00]/10 border-[#DCFF00]/30 shadow-[0_0_20px_rgba(220,255,0,0.05)]" 
                               : "bg-white/[0.02] border-white/5 hover:border-white/10"
                             )}
                           >
                              <h4 className={cn("text-[11px] font-bold uppercase tracking-widest mb-1", context?.selectedSystem === sys.id ? "text-[#DCFF00]" : "text-white/60")}>{sys.name}</h4>
                              <p className="text-[9px] text-white/30 italic line-clamp-1">{sys.inspiration}</p>
                           </button>
                         ))}
                      </div>
                   </div>

                   <div className="space-y-4">
                      <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-white/20">
                         <span>Component Artifacts</span>
                         <Code2 size={14} />
                      </div>
                      <div className="space-y-2">
                         {['CinematicHero_Node', 'BentoFeatures_Module', 'NeuralPsychology_Section', 'AuditProtocol_Pricing'].map((item) => (
                           <div key={item} className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/5 transition-all group cursor-pointer">
                              <div className="flex items-center gap-3">
                                 <div className="w-1.5 h-1.5 rounded-full bg-[#DCFF00]/40 group-hover:bg-[#DCFF00]" />
                                 <span className="text-[11px] text-white/60 font-mono tracking-tight group-hover:text-white">{item}</span>
                              </div>
                              <ChevronRight size={12} className="text-white/20 group-hover:text-[#DCFF00]" />
                           </div>
                         ))}
                      </div>
                   </div>
                </div>
              )}

              {activeTab === 'dna' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
                   <div className="p-6 rounded-[2rem] bg-gradient-to-br from-[#DCFF00]/5 to-transparent border border-[#DCFF00]/10 space-y-6">
                      <div className="flex items-center gap-3 text-[#DCFF00]">
                         <Activity size={18} />
                         <span className="text-[11px] font-bold uppercase tracking-[0.4em]">Neural Profile</span>
                      </div>
                      <div className="space-y-6">
                         {[
                           { label: "Startup Archetype", value: context?.enhancedData?.startupArchetype },
                           { label: "Audience Psychology", value: context?.enhancedData?.audiencePsychology },
                           { label: "Brand Personality", value: context?.enhancedData?.brandPersonality },
                           { label: "Sophistication", value: context?.enhancedData?.sophisticationLevel }
                         ].map((item, i) => (
                           <div key={i} className="space-y-1.5">
                              <span className="text-[9px] text-white/20 uppercase tracking-widest block font-bold">{item.label}</span>
                              <p className="text-[12px] text-white/70 italic leading-relaxed">{item.value || "Analyzing..."}</p>
                           </div>
                         ))}
                      </div>
                   </div>
                   
                   <div className="space-y-4">
                      <div className="flex items-center gap-3 text-white/40">
                        <Settings size={14} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Active Logic Tokens</span>
                      </div>
                      <div className="grid grid-cols-1 gap-2">
                        {Object.entries(context?.enhancedData?.designDNA || {}).map(([key, val]: any, i) => (
                          <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                             <span className="text-[8px] uppercase tracking-widest text-[#DCFF00]/40 font-bold">{key}</span>
                             <p className="text-[11px] text-white/60 italic">{val}</p>
                          </div>
                        ))}
                      </div>
                   </div>
                </div>
              )}

              {activeTab === 'thought' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-500">
                   <div className="space-y-4">
                      <div className="flex items-center gap-2 text-[#DCFF00]">
                         <Brain size={16} />
                         <span className="text-[10px] font-bold uppercase tracking-widest">Reasoning Stream</span>
                      </div>
                      <div className="font-mono text-[11px] text-white/30 space-y-4 bg-black/40 p-4 rounded-xl border border-white/5">
                        <p className="text-white/60">[NEURAL_LINK] Establishing connection to core prompt intent...</p>
                        <p className="text-[#DCFF00]/40">Analyzing: "{context?.prompt?.substring(0, 40)}..."</p>
                        <p className="text-white/60">[DNA_EXTRACTION] Derived "{context?.enhancedData?.startupArchetype}" archetype.</p>
                        <p className="text-white/60">[ORCHESTRATOR] Routing to "{activeSystem.name}" token system.</p>
                        <p className="text-white/60">[MATERIALIZE] Finalizing CinematicHero_Node assembly.</p>
                        <p className="text-[#DCFF00]/80 animate-pulse">_ Awaiting user refinement...</p>
                      </div>
                   </div>
                   
                   <div className="p-5 rounded-2xl bg-red-500/5 border border-red-500/10 space-y-3">
                      <div className="flex items-center gap-2 text-red-500">
                         <Shield size={14} />
                         <span className="text-[10px] font-bold uppercase tracking-widest">Anti-Slop Layer</span>
                      </div>
                      <p className="text-[11px] text-red-500/60 italic leading-relaxed">
                        Validation active. Correcting generic AI patterns, optimizing typography pacing, and ensuring high-contrast consistency.
                      </p>
                   </div>
                </div>
              )}

              {activeTab === 'preview' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
                   <div className="space-y-4">
                      <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-white/20">
                         <span>Experience States</span>
                         <Rocket size={14} />
                      </div>
                      <div className="space-y-2">
                        {['Default State', 'Scroll Reveal', 'Hover Interactions', 'Mobile Entry'].map((state, i) => (
                           <button 
                             key={state}
                             className={cn(
                               "w-full flex items-center justify-between p-3.5 rounded-xl border transition-all text-left group",
                               i === 0 ? "bg-white/10 border-white/20 text-white" : "bg-white/[0.02] border-white/5 text-white/40 hover:bg-white/5"
                             )}
                           >
                             <span className="text-[11px] font-bold uppercase tracking-widest">{state}</span>
                             {i === 0 && <CheckCircle2 size={12} className="text-[#DCFF00]" />}
                           </button>
                        ))}
                      </div>
                   </div>
                   
                   <div className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 space-y-6">
                      <div className="flex items-center gap-3 text-white/40">
                         <Layout size={16} />
                         <span className="text-[10px] font-bold uppercase tracking-widest">Active Canvas</span>
                      </div>
                      <div className="space-y-4">
                         <div className="space-y-2">
                            <span className="text-[9px] text-white/20 uppercase tracking-widest block font-bold">Accent Palette</span>
                            <div className="flex gap-2">
                               <div className="w-8 h-8 rounded-lg border border-white/10" style={{ backgroundColor: activeSystem.tokens.accent }} />
                               <div className="w-8 h-8 rounded-lg border border-white/10" style={{ backgroundColor: activeSystem.tokens.bg }} />
                               <div className="w-8 h-8 rounded-lg border border-white/10" style={{ backgroundColor: activeSystem.tokens.fg }} />
                            </div>
                         </div>
                         <div className="space-y-2">
                            <span className="text-[9px] text-white/20 uppercase tracking-widest block font-bold">Typography</span>
                            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-[11px] text-white/80 italic font-headline">
                               {activeSystem.tokens.fontDisplay}
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
              )}
           </div>
        </ScrollArea>

        <div className="p-6 border-t border-white/5 bg-black/40">
           <div className="relative group">
              <input 
                placeholder="Direct Scissor refinement..."
                className="w-full bg-white/5 border border-white/10 h-12 rounded-xl px-4 text-[12px] text-white focus:ring-1 focus:ring-[#DCFF00]/20 outline-none transition-all placeholder:text-white/10"
              />
              <Button size="icon" className="absolute right-1 top-1 h-10 w-10 bg-white text-black hover:bg-[#DCFF00] rounded-lg transition-all active:scale-90">
                 <Send size={14} />
              </Button>
           </div>
        </div>
      </aside>

      {/* MAIN VIEWPORT - CINEMATIC CANVAS */}
      <main className="flex-1 flex flex-col z-20 p-6 overflow-hidden relative">
         <header className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 bg-black/60 backdrop-blur-2xl p-1 rounded-xl border border-white/10 shadow-2xl">
               {[
                 { id: 'desktop', icon: Monitor },
                 { id: 'tablet', icon: Tablet },
                 { id: 'mobile', icon: Smartphone }
               ].map((item) => (
                 <button 
                   key={item.id}
                   onClick={() => setView(item.id as any)} 
                   className={cn(
                     "p-2 rounded-lg transition-all",
                     view === item.id ? "bg-white text-black shadow-lg" : "text-white/30 hover:text-white"
                   )}
                 >
                   <item.icon size={14} />
                 </button>
               ))}
               <div className="w-px h-4 bg-white/10 mx-1" />
               <div className="flex bg-black/40 rounded-lg p-0.5">
                  <button 
                    onClick={() => setMode('materialization')}
                    className={cn(
                      "px-4 py-2 rounded-md text-[9px] uppercase tracking-widest font-bold transition-all flex items-center gap-2",
                      mode === 'materialization' ? "bg-white/10 text-white shadow-inner" : "text-white/30 hover:text-white/60"
                    )}
                  >
                    <Layout size={12} /> Design & Execution
                  </button>
                  <button 
                    onClick={() => setMode('strategy')}
                    className={cn(
                      "px-4 py-2 rounded-md text-[9px] uppercase tracking-widest font-bold transition-all flex items-center gap-2",
                      mode === 'strategy' ? "bg-white/10 text-white shadow-inner" : "text-white/30 hover:text-white/60"
                    )}
                  >
                    <Search size={12} /> Research & Insight
                  </button>
               </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-3 mr-4">
                 <Terminal size={12} className="text-[#DCFF00]" />
                 <span className="text-[10px] font-mono text-[#DCFF00]/40 uppercase tracking-widest">Studio_v3.0_Stable</span>
              </div>
              <Button variant="ghost" className="text-white/40 hover:text-white hover:bg-white/5 gap-2 text-[9px] uppercase tracking-[0.2em] font-bold px-4 h-10 rounded-lg">
                Preview <ExternalLink size={12} />
              </Button>
              <Button className="bg-[#DCFF00] text-black hover:bg-[#DCFF00]/90 rounded-xl px-6 h-10 font-bold uppercase tracking-widest text-[10px] shadow-[0_0_20px_rgba(220,255,0,0.2)] transition-all active:scale-95 group">
                 <Rocket size={13} className="mr-2 group-hover:-translate-y-1 transition-transform" /> Neural Deploy
              </Button>
            </div>
         </header>

         <div className="flex-1 flex items-center justify-center bg-white/[0.01] rounded-[2.5rem] border border-white/5 p-4 overflow-hidden backdrop-blur-sm relative">
            <div className="absolute inset-0 pointer-events-none border-[8px] border-black/20 rounded-[2.5rem] z-20" />
            
            <AnimatePresence>
              {isSyncing && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/60 backdrop-blur-xl"
                >
                  <BloomLogo size={80} />
                  <p className="mt-6 text-[10px] uppercase tracking-[0.5em] font-bold text-[#DCFF00] animate-pulse">Syncing Neural Tokens...</p>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div 
              layout
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "h-full bg-black rounded-[2rem] border border-white/10 shadow-2xl overflow-hidden relative",
                view === 'desktop' ? 'w-full' : view === 'tablet' ? 'w-[768px]' : 'w-[375px]'
              )}
            >
               <div className="h-full w-full overflow-y-auto no-scrollbar bg-black relative">
                  {mode === 'materialization' ? (
                    <MaterializingWebsite isVisible={true} data={startupData} context={context} />
                  ) : (
                    <div className="p-12 space-y-16 bg-black min-h-full relative overflow-y-auto no-scrollbar selection:bg-white/10 animate-in fade-in zoom-in-95 duration-1000">
                       <header className="flex flex-col md:flex-row items-end justify-between border-b border-white/5 pb-12 gap-8">
                          <div className="space-y-6 max-w-2xl">
                             <div className="flex items-center gap-4">
                                <Badge className="bg-[#DCFF00] text-black border-none px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(220,255,0,0.15)]">
                                  Shark Protocol v3.0
                                </Badge>
                                <span className="text-[10px] text-white/30 uppercase tracking-[0.4em] font-bold">FounderOS Intelligence</span>
                             </div>
                             <h2 className="text-6xl font-headline italic text-white/95 leading-[0.9]">Strategic <br/> Intelligence Hub</h2>
                             <p className="text-white/40 text-lg font-light leading-relaxed italic">
                               Recursive analysis of {startupData?.brand?.companyName || 'Startup'} through our multi-billion dollar shark intelligence layer. Identify risks, size markets, and validate logic before execution.
                             </p>
                          </div>
                          <div className="flex items-center gap-10 bg-white/[0.02] border border-white/10 p-8 rounded-[3rem] backdrop-blur-3xl">
                             <div className="text-right space-y-2">
                                <span className="text-[10px] text-white/20 uppercase tracking-[0.5em] block font-bold">Viability Score</span>
                                <span className="text-7xl font-headline italic text-[#DCFF00] tracking-tighter">
                                  {context?.enhancedData?.oracleScore || '92'}
                                  <span className="text-2xl text-white/10 ml-2">/100</span>
                                </span>
                             </div>
                             <div className="w-24 h-24">
                                <OracleGauge targetScore={context?.enhancedData?.oracleScore || 92} className="scale-[0.4]" />
                             </div>
                          </div>
                       </header>

                       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
                          {/* EXECUTIVE NEURAL BRIEF */}
                          <Card className="lg:col-span-3 p-10 rounded-[3rem] bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 space-y-8 backdrop-blur-3xl">
                             <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4 text-[#DCFF00]">
                                   <Activity size={20} />
                                   <h4 className="text-[11px] font-bold uppercase tracking-[0.4em]">Executive Neural Brief</h4>
                                </div>
                                <div className="flex items-center gap-2 text-white/20">
                                   <CheckCircle2 size={14} className="text-[#DCFF00]" />
                                   <span className="text-[10px] font-bold uppercase tracking-widest">Anti-Slop Validated</span>
                                </div>
                             </div>
                             <p className="text-3xl font-headline italic text-white/80 leading-relaxed max-w-4xl">
                                {startupData?.brand?.rationale || "Consolidating neural identity..."}
                             </p>
                             <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-6">
                                {[
                                  { label: "Neural Tone", value: startupData?.brand?.tone },
                                  { label: "Sophistication", value: context?.enhancedData?.sophisticationLevel },
                                  { label: "Archetype", value: context?.enhancedData?.startupArchetype },
                                  { label: "System", value: activeSystem.name }
                                ].map((item, i) => (
                                  <div key={i} className="space-y-1">
                                     <span className="text-[9px] text-white/20 uppercase tracking-widest block font-bold">{item.label}</span>
                                     <p className="text-sm font-bold text-white/60">{item.value || "Calculating..."}</p>
                                  </div>
                                ))}
                             </div>
                          </Card>

                          {/* THE SHARK VERDICT */}
                          <Card className="lg:col-span-2 p-12 rounded-[3.5rem] bg-white/[0.02] border border-white/10 space-y-10 backdrop-blur-3xl group shadow-2xl relative overflow-hidden">
                             <div className="absolute top-0 right-0 p-8">
                                <Briefcase size={24} className="text-[#DCFF00]/20" />
                             </div>
                             <div className="flex items-center gap-5 text-[#DCFF00]">
                                <div className="w-12 h-12 rounded-2xl bg-[#DCFF00]/10 flex items-center justify-center">
                                   <Briefcase size={24} />
                                </div>
                                <h4 className="text-[12px] font-bold uppercase tracking-[0.4em]">The Shark Verdict</h4>
                             </div>
                             <div className="space-y-6">
                               <p className="text-4xl font-headline italic text-white/90 leading-[1.3] max-w-3xl">
                                  {context?.enhancedData?.strategicVerdict || "Analyzing market congestions..."}
                               </p>
                               <p className="text-xl text-white/40 font-light leading-relaxed italic">
                                  {startupData?.intelligence?.marketAnalysis || "Waiting for neural consensus..."}
                               </p>
                             </div>
                          </Card>

                          {/* MARKET SIZING */}
                          <Card className="p-10 rounded-[3.5rem] bg-white/[0.02] border border-white/10 space-y-10 backdrop-blur-3xl">
                             <div className="flex items-center gap-4 text-white/30">
                                <TrendingUp size={20} />
                                <h4 className="text-[11px] font-bold uppercase tracking-[0.4em]">Opportunity Map</h4>
                             </div>
                             <div className="space-y-8">
                                <div className="space-y-2">
                                   <span className="text-[10px] text-white/20 uppercase tracking-[0.2em] block font-bold">TAM (Global)</span>
                                   <span className="text-2xl font-headline italic text-[#DCFF00]">{startupData?.intelligence?.tamSamSom?.tam || "$15.6T"}</span>
                                </div>
                                <div className="space-y-2">
                                   <span className="text-[10px] text-white/20 uppercase tracking-[0.2em] block font-bold">SAM (Serviceable)</span>
                                   <span className="text-2xl font-headline italic text-white/80">{startupData?.intelligence?.tamSamSom?.sam || "$240B"}</span>
                                </div>
                                <div className="space-y-2">
                                   <span className="text-[10px] text-white/20 uppercase tracking-[0.2em] block font-bold">SOM (Obtainable)</span>
                                   <span className="text-2xl font-headline italic text-white/60">{startupData?.intelligence?.tamSamSom?.som || "$2.4B"}</span>
                                </div>
                             </div>
                          </Card>

                          {/* STRATEGIC RISKS */}
                          <Card className="lg:col-span-1 p-10 rounded-[3rem] bg-white/[0.02] border border-white/10 space-y-8 backdrop-blur-3xl">
                             <div className="flex items-center gap-4 text-red-500">
                                <AlertTriangle size={20} />
                                <h4 className="text-[11px] font-bold uppercase tracking-[0.4em]">Critical Risks</h4>
                             </div>
                             <div className="space-y-4">
                                {(startupData?.intelligence?.risks || ["Saturated Market", "Execution Risk"]).map((risk: string, i: number) => (
                                  <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-red-500/5 border border-red-500/10">
                                     <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                                     <span className="text-[12px] text-red-500 font-bold uppercase tracking-widest">{risk}</span>
                                  </div>
                                ))}
                             </div>
                          </Card>

                          {/* STRATEGIC MOATS */}
                          <Card className="lg:col-span-2 p-10 rounded-[3rem] bg-white/[0.02] border border-white/10 space-y-8 backdrop-blur-3xl">
                             <div className="flex items-center gap-4 text-[#DCFF00]">
                                <Target size={20} />
                                <h4 className="text-[11px] font-bold uppercase tracking-[0.4em]">Identified Moats</h4>
                             </div>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {(startupData?.intelligence?.moats || []).map((moat: string, i: number) => (
                                  <div key={i} className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 space-y-4">
                                     <h5 className="text-[10px] font-bold uppercase tracking-widest text-[#DCFF00]">Node 0{i + 1}</h5>
                                     <p className="text-lg font-headline italic text-white/80">{moat}</p>
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
