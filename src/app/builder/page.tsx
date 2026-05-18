
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
  Palette,
  Layers,
  Search,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Target,
  Share2,
  Sparkles,
  User,
  Bot,
  Layout
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
import { DESIGN_SYSTEMS } from "@/lib/design-systems";
import { cn } from "@/lib/utils";

type Tab = 'preview' | 'registry' | 'dna' | 'chat';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function BuilderPage() {
  const router = useRouter();
  const { toast } = useToast();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [mode, setMode] = useState<"materialization" | "strategy">("materialization");
  const [activeTab, setActiveTab] = useState<Tab>("preview");
  const [startupData, setStartupData] = useState<any>(null);
  const [context, setContext] = useState<any>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: "Neural connection established. I am ready to refine your materialized vision. What adjustments shall we orchestrate?", timestamp: new Date() }
  ]);

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

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

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

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;
    
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: chatInput, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setChatInput("");
    setIsSyncing(true);

    // Simulate AI Refinement of the actual materialization
    setTimeout(() => {
      const lowerInput = userMsg.content.toLowerCase();
      let feedback = `Vision refined. Intent "${userMsg.content}" injected into the design DNA. Recalculating neural tokens...`;
      
      if (lowerInput.includes('background') || lowerInput.includes('color')) {
        feedback = "Neural palette updated. Recalculating atmospheric gradients and surface tokens...";
      } else if (lowerInput.includes('font') || lowerInput.includes('text') || lowerInput.includes('typography')) {
        feedback = "Typographic hierarchy re-tokenized. Adjusting weight-300 contrast and tracking...";
      }

      const assistantMsg: Message = { 
        id: (Date.now() + 1).toString(), 
        role: 'assistant', 
        content: feedback, 
        timestamp: new Date() 
      };
      setMessages(prev => [...prev, assistantMsg]);
      setIsSyncing(false);
      
      toast({
        title: "Neural Refinement Applied",
        description: "Vision updated with direct user intent.",
      });
    }, 1500);
  };

  const handleOpenPreview = () => {
    window.open('/preview', '_blank');
  };

  const handleShare = () => {
    const url = window.location.origin + '/preview';
    navigator.clipboard.writeText(url);
    toast({
      title: "Vision Shared",
      description: "Neural link URL copied to clipboard.",
    });
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden flex bg-black text-white font-body selection:bg-[#DCFF00]/30">
      <BackgroundEffects />
      <GradientBackground />
      <div className="absolute inset-0 -z-10 bg-black/40" />

      {/* LEFT SIDEBAR - Viewport Locked */}
      <aside className="w-[420px] h-full border-r border-white/10 bg-black/95 backdrop-blur-3xl flex flex-col z-30 relative shadow-2xl shrink-0">
        <header className="p-8 border-b border-white/5 flex items-center justify-between shrink-0">
           <div className="flex items-center gap-4">
              <BloomLogo size={32} />
              <div className="flex flex-col">
                <h3 className="text-[11px] font-bold uppercase tracking-[0.4em] text-white/40 leading-none">BLOOM STUDIO</h3>
                <span className="text-[14px] font-headline italic text-white/95 mt-1 truncate max-w-[200px]">{startupData?.brand?.companyName || "Project Neural"}</span>
              </div>
           </div>
           <button onClick={() => router.push('/workspace')} className="p-2.5 rounded-xl hover:bg-white/5 text-white/40 hover:text-white transition-all group">
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
           </button>
        </header>

        <div className="flex border-b border-white/10 px-4 py-3 bg-black/60 shrink-0">
           {(['preview', 'registry', 'dna', 'chat'] as Tab[]).map((tab) => (
             <button 
               key={tab}
               onClick={() => setActiveTab(tab)}
               className={cn(
                 "flex-1 py-3 px-2 rounded-xl text-[10px] uppercase tracking-[0.3em] font-bold transition-all flex flex-col items-center gap-2",
                 activeTab === tab ? "bg-white/10 text-[#DCFF00] bloom-button-glow" : "text-white/30 hover:text-white/60"
               )}
             >
               {tab === 'preview' && <Layout size={16} />}
               {tab === 'registry' && <Layers size={16} />}
               {tab === 'dna' && <Activity size={16} />}
               {tab === 'chat' && <Sparkles size={16} />}
               <span className="opacity-80">{tab}</span>
             </button>
           ))}
        </div>

        <div className="flex-1 overflow-hidden relative">
          <ScrollArea className="h-full">
            <div className="p-8 space-y-10 pb-12">
                {activeTab === 'chat' && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-500">
                    <div className="flex items-center gap-3 text-[#DCFF00]">
                      <Sparkles size={18} />
                      <span className="text-[11px] font-bold uppercase tracking-widest">Neural Refinement</span>
                    </div>
                    <div className="space-y-6">
                      {messages.map((msg) => (
                        <div key={msg.id} className={cn("flex gap-4 w-full", msg.role === 'user' ? "flex-row-reverse" : "flex-row")}>
                          <div className={cn("w-8 h-8 rounded-full flex items-center justify-center shrink-0", msg.role === 'assistant' ? "bg-[#DCFF00]/20 text-[#DCFF00]" : "bg-white/10 text-white")}>
                            {msg.role === 'assistant' ? <Bot size={14} /> : <User size={14} />}
                          </div>
                          <div className={cn(
                            "p-5 rounded-2xl text-[13px] leading-relaxed break-words max-w-[85%]", 
                            msg.role === 'assistant' ? "bg-white/[0.04] border border-white/5 text-white/80 text-left" : "bg-[#DCFF00] text-black font-bold shadow-xl text-right"
                          )}>
                            {msg.content}
                          </div>
                        </div>
                      ))}
                      <div ref={scrollRef} />
                    </div>
                  </div>
                )}

                {activeTab === 'registry' && (
                  <div className="space-y-10 animate-in fade-in slide-in-from-left-4 duration-500">
                    <div className="space-y-5">
                        <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-widest text-white/30">
                          <span>Neural Design Systems</span>
                          <Palette size={16} />
                        </div>
                        <div className="grid grid-cols-1 gap-4">
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
                            </button>
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
                        <div className="space-y-8 relative z-10 text-left">
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
                          {['Default State', 'Scroll Reveal', 'Hover Interactions'].map((state, i) => (
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
                  </div>
                )}
            </div>
          </ScrollArea>
        </div>

        <div className="p-8 border-t border-white/10 bg-black/60 shadow-2xl shrink-0">
           <div className="relative group">
              <input 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Direct refinement..."
                className="w-full bg-white/5 border border-white/10 h-14 rounded-2xl px-6 text-[14px] text-white focus:ring-1 focus:ring-[#DCFF00]/40 outline-none transition-all placeholder:text-white/20 shadow-inner"
              />
              <Button 
                onClick={handleSendMessage}
                size="icon" 
                className="absolute right-1.5 top-1.5 h-11 w-11 bg-white text-black hover:bg-[#DCFF00] rounded-xl transition-all active:scale-90 shadow-2xl"
              >
                 <Send size={18} />
              </Button>
           </div>
        </div>
      </aside>

      {/* MAIN VIEWPORT - Absolute 100vh Universal Fit */}
      <main className="flex-1 flex flex-col z-20 p-8 overflow-hidden relative min-w-0 h-screen">
         <header className="flex items-center justify-between mb-8 shrink-0">
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
              <Button onClick={handleOpenPreview} variant="ghost" className="text-white/40 hover:text-white hover:bg-white/5 gap-3 text-[10px] uppercase tracking-[0.2em] font-bold px-6 h-12 rounded-xl">
                Open Preview <ExternalLink size={14} />
              </Button>
              <Button onClick={handleShare} variant="ghost" className="text-white/40 hover:text-white hover:bg-white/5 gap-3 text-[10px] uppercase tracking-[0.2em] font-bold px-6 h-12 rounded-xl">
                Share <Share2 size={14} />
              </Button>
              <Button className="bg-[#DCFF00] text-black hover:bg-[#DCFF00]/90 rounded-2xl px-8 h-12 font-bold uppercase tracking-widest text-[11px] shadow-[0_0_30px_rgba(220,255,0,0.3)] transition-all active:scale-95 group">
                 <Rocket size={15} className="mr-3 group-hover:-translate-y-1 transition-transform" /> Neural Deploy
              </Button>
            </div>
         </header>

         {/* Container fitting the 100vh window exactly */}
         <div className="flex-1 flex items-center justify-center bg-white/[0.02] rounded-[3.5rem] border border-white/5 p-4 overflow-hidden backdrop-blur-md relative shadow-inner">
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
                "h-full bg-black rounded-[2.5rem] border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.8)] overflow-hidden relative flex flex-col transition-all duration-700",
                view === 'desktop' ? 'w-full' : view === 'tablet' ? 'w-[768px]' : 'w-[375px]'
              )}
            >
               {mode === 'materialization' ? (
                 <MaterializingWebsite isVisible={true} data={startupData} context={context} />
               ) : (
                 <ScrollArea className="flex-1">
                    <div className="p-16 space-y-24">
                       <header className="flex flex-col md:flex-row items-end justify-between border-b border-white/10 pb-16 gap-12">
                          <div className="space-y-8 max-w-3xl text-left">
                             <div className="flex items-center gap-6">
                                <Badge className="bg-[#DCFF00] text-black border-none px-6 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest shadow-[0_0_30px_rgba(220,255,0,0.3)]">
                                  Shark Protocol v3.5
                                </Badge>
                                <span className="text-[11px] text-white/40 uppercase tracking-[0.4em] font-bold">FounderOS Intelligence Core</span>
                             </div>
                             <h2 className="text-7xl font-headline italic text-white/95 leading-[0.85] tracking-tighter">Strategic <br/> Intelligence Hub</h2>
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

                       <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                          <Card className="lg:col-span-3 p-12 rounded-[3.5rem] bg-gradient-to-br from-white/[0.08] to-transparent border border-white/10 space-y-10 backdrop-blur-3xl shadow-2xl">
                             <div className="flex items-center justify-between">
                                <div className="flex items-center gap-5 text-[#DCFF00]">
                                   <Activity size={24} />
                                   <h4 className="text-[12px] font-bold uppercase tracking-[0.4em]">Executive Neural Brief</h4>
                                </div>
                             </div>
                             <p className="text-4xl font-headline italic text-white/90 leading-relaxed max-w-5xl text-left">
                                {startupData?.brand?.rationale || "Consolidating neural identity..."}
                             </p>
                          </Card>

                          <Card className="lg:col-span-2 p-12 rounded-[3.5rem] bg-white/[0.02] border border-white/10 space-y-10 backdrop-blur-3xl shadow-2xl">
                             <div className="flex items-center gap-5 text-[#DCFF00]">
                                <Target size={24} />
                                <h4 className="text-[12px] font-bold uppercase tracking-[0.4em]">Identified Moats</h4>
                             </div>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                {startupData?.intelligence?.moats?.map((moat: string, i: number) => (
                                  <div key={i} className="flex gap-6 p-8 rounded-3xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] transition-all text-left">
                                     <div className="w-10 h-10 rounded-full bg-[#DCFF00]/20 flex items-center justify-center shrink-0 border border-[#DCFF00]/40">
                                        <CheckCircle2 size={16} className="text-[#DCFF00]" />
                                     </div>
                                     <p className="text-[15px] text-white/80 leading-relaxed">{moat}</p>
                                  </div>
                                ))}
                             </div>
                          </Card>

                          <Card className="p-12 rounded-[3.5rem] bg-[#DCFF00]/5 border border-[#DCFF00]/20 space-y-8 backdrop-blur-3xl shadow-2xl">
                             <div className="flex items-center gap-5 text-[#DCFF00]">
                                <AlertTriangle size={24} />
                                <h4 className="text-[12px] font-bold uppercase tracking-[0.4em]">Strategic Risks</h4>
                             </div>
                             <div className="space-y-6 text-left">
                                {startupData?.intelligence?.risks?.map((risk: string, i: number) => (
                                  <div key={i} className="flex gap-4 items-start">
                                     <div className="w-1.5 h-1.5 rounded-full bg-[#DCFF00]/60 mt-2 shrink-0" />
                                     <p className="text-[13px] text-white/60 italic">{risk}</p>
                                  </div>
                                ))}
                             </div>
                          </Card>
                       </div>
                    </div>
                 </ScrollArea>
               )}
            </motion.div>
         </div>
      </main>
    </div>
  );
}
