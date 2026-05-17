
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
  TrendingUp,
  AlertTriangle,
  Layout,
  Target,
  Activity,
  Brain
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { BackgroundEffects } from "@/components/cinematic/BackgroundEffects";
import { useRouter } from "next/navigation";
import { MaterializingWebsite } from "@/components/cinematic/MaterializingWebsite";
import { ScrollArea } from "@/components/ui/scroll-area";
import { InteractiveRobotSpline } from "@/components/ui/interactive-3d-robot";
import { GradientBackground } from "@/components/ui/paper-design-shader-background";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { OracleGauge } from "@/components/cinematic/OracleGauge";
import { BloomLogo } from "@/components/cinematic/BloomLogo";

const SCISSOR_SCENE = "https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode";

export default function BuilderPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [view, setView] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [mode, setMode] = useState<"materialization" | "strategy" | "registry">("materialization");
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [startupData, setStartupData] = useState<any>(null);
  
  const [chat, setChat] = useState<{role: 'user' | 'assistant' | 'agent', text: string, agent?: string}[]>([
    { role: 'agent', agent: 'SCISSOR', text: "Neural core synchronized. Startup experience orchestration complete." },
    { role: 'assistant', text: "I've optimized the motion philosophy and typography strategy based on your vision. Shall we review the Strategy verdict?" }
  ]);

  useEffect(() => {
    const stored = localStorage.getItem("latest_startup");
    if (stored) {
      try {
        setStartupData(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse stored startup data", e);
      }
    }
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chat]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userText = input;
    setChat(prev => [...prev, { role: 'user', text: userText }]);
    setInput("");
    
    setTimeout(() => {
      setChat(prev => [...prev, { 
        role: 'agent', 
        agent: 'SCISSOR',
        text: `Refinement node activated. Re-orchestrating experience DNA for "${userText}"...` 
      }]);
    }, 1500);
  };

  const openPreview = () => {
    window.open('/preview', '_blank');
  };

  return (
    <div className="relative min-h-screen overflow-hidden flex selection:bg-[#DCFF00]/30 font-body bg-black">
      <BackgroundEffects />
      <GradientBackground />
      <div className="absolute inset-0 -z-10 bg-black/40" />
      
      {/* SIDEBAR - SCISSOR ASSISTANT */}
      <aside className="w-[420px] border-r border-white/5 bg-black/90 backdrop-blur-3xl flex flex-col z-20 relative">
        <header className="p-8 border-b border-white/5 flex items-center justify-between">
           <button onClick={() => router.push('/workspace')} className="p-2.5 rounded-xl hover:bg-white/5 text-white/40 hover:text-white transition-all group">
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
           </button>
           <div className="flex items-center gap-2">
              <BloomLogo size={20} animate={false} />
              <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/40">BLOOM STUDIO CORE</h3>
           </div>
           <div className="w-10 h-10 overflow-hidden relative rounded-xl bg-white/[0.03] border border-white/10">
              <div className="absolute inset-0 h-[140%] w-full">
                <InteractiveRobotSpline 
                  scene={SCISSOR_SCENE} 
                  className="w-full h-full scale-[1.1] translate-y-1" 
                />
              </div>
           </div>
        </header>

        <ScrollArea className="flex-1 px-8 py-6">
           <div className="space-y-8 pb-20">
             {chat.map((msg, i) => (
               <motion.div 
                 key={i} 
                 initial={{ opacity: 0, y: 15 }}
                 animate={{ opacity: 1, y: 0 }}
                 className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
               >
                 <div className="flex flex-col gap-2 max-w-[90%]">
                    {msg.agent && (
                      <div className="flex items-center gap-2 mb-1 px-1">
                        <Bot size={11} className="text-[#DCFF00]" />
                        <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#DCFF00]/40">{msg.agent}</span>
                      </div>
                    )}
                    <div className={`p-5 rounded-2xl text-[14px] leading-relaxed shadow-2xl transition-all ${
                      msg.role === 'user' 
                      ? 'bg-[#DCFF00] text-black font-semibold' 
                      : 'bg-white/[0.03] border border-white/5 text-white/70 backdrop-blur-md'
                    }`}>
                      {msg.text}
                    </div>
                 </div>
               </motion.div>
             ))}
             <div ref={scrollRef} />
           </div>
        </ScrollArea>

        <div className="p-8 border-t border-white/5 bg-black/40 backdrop-blur-xl">
           <div className="relative group">
              <input 
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Direct Scissor refinement..."
                className="w-full bg-white/5 border border-white/10 h-14 rounded-2xl px-6 text-sm text-white focus:ring-1 focus:ring-[#DCFF00]/20 outline-none transition-all relative z-10"
              />
              <Button onClick={handleSend} size="icon" className="absolute right-2 top-2 h-10 w-10 bg-white text-black hover:bg-[#DCFF00] rounded-xl transition-all active:scale-90 z-20">
                 <Send size={16} />
              </Button>
           </div>
        </div>
      </aside>

      {/* MAIN VIEWPORT */}
      <main className="flex-1 flex flex-col z-10 p-8 overflow-hidden">
         <header className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2 bg-black/60 backdrop-blur-2xl p-1.5 rounded-2xl border border-white/10 shadow-2xl">
               {[
                 { id: 'desktop', icon: Monitor },
                 { id: 'tablet', icon: Tablet },
                 { id: 'mobile', icon: Smartphone }
               ].map((item) => (
                 <button 
                   key={item.id}
                   onClick={() => setView(item.id as any)} 
                   className={`p-2.5 rounded-xl transition-all ${view === item.id ? 'bg-white text-black shadow-lg scale-105' : 'text-white/30 hover:text-white'}`}
                 >
                   <item.icon size={15} />
                 </button>
               ))}
               <div className="w-px h-5 bg-white/10 mx-2" />
               <div className="flex bg-black/40 rounded-xl p-1">
                  <button 
                    onClick={() => setMode('materialization')}
                    className={`px-5 py-2 rounded-lg text-[10px] uppercase tracking-widest font-bold transition-all flex items-center gap-2 ${mode === 'materialization' ? 'bg-white/10 text-white shadow-inner' : 'text-white/30 hover:text-white/60'}`}
                  >
                    <Layout size={13} /> Design & Execution
                  </button>
                  <button 
                    onClick={() => setMode('strategy')}
                    className={`px-5 py-2 rounded-lg text-[10px] uppercase tracking-widest font-bold transition-all flex items-center gap-2 ${mode === 'strategy' ? 'bg-white/10 text-white shadow-inner' : 'text-white/30 hover:text-white/60'}`}
                  >
                    <Shield size={13} /> Research & Insight
                  </button>
               </div>
            </div>

            <div className="flex items-center gap-4">
              <Button onClick={openPreview} variant="ghost" className="text-white/40 hover:text-white hover:bg-white/5 gap-2.5 text-[10px] uppercase tracking-[0.2em] font-bold px-5 h-12 rounded-xl">
                Full Preview <ExternalLink size={14} />
              </Button>
              <Button className="bg-[#DCFF00] text-black hover:bg-[#DCFF00]/90 rounded-2xl px-8 h-12 font-bold uppercase tracking-widest text-[11px] shadow-[0_0_30px_rgba(220,255,0,0.3)] transition-all active:scale-95 group">
                 <Rocket size={15} className="mr-2.5 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" /> Neural Deploy
              </Button>
            </div>
         </header>

         <div className="flex-1 flex items-center justify-center bg-white/[0.01] rounded-[3rem] border border-white/5 p-6 overflow-hidden backdrop-blur-sm relative">
            <div className="absolute inset-0 pointer-events-none border-[12px] border-black/20 rounded-[3rem] z-20" />
            
            <motion.div 
              layout
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className={`h-full bg-black rounded-[2rem] border border-white/10 shadow-2xl overflow-hidden relative shadow-[0_0_100px_rgba(0,0,0,0.5)] ${
                view === 'desktop' ? 'w-full' : view === 'tablet' ? 'w-[768px]' : 'w-[375px]'
              }`}
            >
               <div className="h-full w-full overflow-y-auto no-scrollbar bg-black relative">
                  {mode === 'materialization' ? (
                    <MaterializingWebsite isVisible={true} data={startupData} />
                  ) : (
                    <div className="p-16 space-y-16 bg-black min-h-full relative overflow-y-auto no-scrollbar">
                       <header className="flex items-end justify-between border-b border-white/5 pb-12 relative z-10">
                          <div className="space-y-6">
                             <div className="flex items-center gap-4">
                                <Badge className="bg-[#DCFF00] text-black border-none px-5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(220,255,0,0.2)]">
                                  FounderOS Intelligence
                                </Badge>
                                <span className="text-[11px] text-white/30 uppercase tracking-[0.4em]">Honest Strategic Verdict</span>
                             </div>
                             <h2 className="text-6xl font-headline italic text-white/95 leading-none">Market Intelligence Hub</h2>
                             <p className="text-white/40 max-w-2xl text-lg font-light leading-relaxed italic">
                               Recursive analysis of {startupData?.forgeBrandArchitect?.companyName || 'Startup'} through global market congestion mapping.
                             </p>
                          </div>
                          <div className="flex items-center gap-12 bg-white/[0.02] border border-white/10 p-10 rounded-[3rem] backdrop-blur-3xl shadow-2xl">
                             <div className="text-right space-y-2">
                                <span className="text-[11px] text-white/20 uppercase tracking-[0.5em] block">Investor Score</span>
                                <span className="text-8xl font-headline italic text-[#DCFF00] tracking-tighter">
                                  {startupData?.oracleInvestorAnalysis?.investorScore || '92'}
                                  <span className="text-3xl text-white/10 ml-2">/100</span>
                                </span>
                             </div>
                             <div className="w-32 h-32 scale-125">
                                <OracleGauge targetScore={startupData?.oracleInvestorAnalysis?.investorScore || 92} className="scale-[0.5]" />
                             </div>
                          </div>
                       </header>

                       <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 relative z-10">
                          <Card className="lg:col-span-2 p-12 rounded-[3.5rem] bg-white/[0.02] border border-white/10 space-y-10 backdrop-blur-3xl group shadow-2xl">
                             <div className="flex items-center gap-5 text-[#DCFF00]">
                                <div className="w-12 h-12 rounded-2xl bg-[#DCFF00]/10 flex items-center justify-center">
                                   <TrendingUp size={24} />
                                </div>
                                <h4 className="text-[12px] font-bold uppercase tracking-[0.4em]">Opportunity Sizing</h4>
                             </div>
                             <p className="text-4xl font-headline italic text-white/90 leading-[1.35] max-w-3xl">
                                {startupData?.sentinelAtlasMarketIntelligence?.marketOpportunityAnalysis || "Aggregating neural market intelligence..."}
                             </p>
                             <div className="grid grid-cols-3 gap-12 pt-10 border-t border-white/5">
                                <div className="space-y-3">
                                   <span className="text-[10px] text-white/20 uppercase tracking-[0.2em] block font-bold">TAM</span>
                                   <span className="text-2xl font-headline italic text-[#DCFF00]">{startupData?.sentinelAtlasMarketIntelligence?.tamSamSom?.tam || "$15.6T"}</span>
                                </div>
                                <div className="space-y-3">
                                   <span className="text-[10px] text-white/20 uppercase tracking-[0.2em] block font-bold">SAM</span>
                                   <span className="text-2xl font-headline italic text-white/80">{startupData?.sentinelAtlasMarketIntelligence?.tamSamSom?.sam || "$240B"}</span>
                                </div>
                                <div className="space-y-3">
                                   <span className="text-[10px] text-white/20 uppercase tracking-[0.2em] block font-bold">SOM</span>
                                   <span className="text-2xl font-headline italic text-white/60">{startupData?.sentinelAtlasMarketIntelligence?.tamSamSom?.som || "$2.4B"}</span>
                                </div>
                             </div>
                          </Card>

                          <Card className="p-12 rounded-[3.5rem] bg-white/[0.02] border border-white/10 space-y-10 backdrop-blur-3xl shadow-2xl">
                             <div className="flex items-center gap-5 text-red-500">
                                <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center">
                                   <AlertTriangle size={24} />
                                </div>
                                <h4 className="text-[12px] font-bold uppercase tracking-[0.4em]">Strategic Risks</h4>
                             </div>
                             <div className="space-y-5">
                                {(startupData?.sentinelAtlasMarketIntelligence?.marketRisks || ["Execution Risk", "Market Saturation"]).map((risk: string, i: number) => (
                                  <div key={i} className="flex items-center justify-between p-5 rounded-2xl bg-red-500/5 border border-red-500/10 transition-all">
                                     <div className="flex items-center gap-5">
                                        <div className="w-2 h-2 rounded-full bg-red-500" />
                                        <span className="text-[13px] text-red-500 font-bold uppercase tracking-wider">{risk}</span>
                                     </div>
                                  </div>
                                ))}
                             </div>
                          </Card>

                          <Card className="lg:col-span-3 p-16 rounded-[4rem] bg-white/[0.02] border border-white/10 space-y-16 backdrop-blur-3xl relative overflow-hidden shadow-2xl">
                             <div className="flex items-center gap-5 text-white/40">
                                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
                                   <Target size={24} />
                                </div>
                                <h4 className="text-[12px] font-bold uppercase tracking-[0.5em]">Experience DNA & Anti-Slop Validation</h4>
                             </div>
                             
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                                <div className="space-y-10">
                                   <div className="p-10 rounded-[3rem] bg-white/[0.03] border border-white/10 space-y-6">
                                      <div className="flex items-center gap-3 text-[#DCFF00]">
                                         <Brain size={16} />
                                         <span className="text-[10px] uppercase tracking-widest font-bold">Audience Psychology</span>
                                      </div>
                                      <p className="text-2xl font-headline italic text-white/90">
                                         {startupData?.forgeBrandArchitect?.audiencePsychology || "Analyzing target desires..."}
                                      </p>
                                   </div>
                                   <div className="p-10 rounded-[3rem] bg-white/[0.03] border border-white/10 space-y-6">
                                      <div className="flex items-center gap-3 text-[#DCFF00]">
                                         <Activity size={16} />
                                         <span className="text-[10px] uppercase tracking-widest font-bold">Motion Philosophy</span>
                                      </div>
                                      <p className="text-2xl font-headline italic text-white/90">
                                         {startupData?.websiteContent?.motionPhilosophy || "Defining interaction behavior..."}
                                      </p>
                                   </div>
                                </div>

                                <div className="p-12 rounded-[3.5rem] bg-[#DCFF00]/5 border border-[#DCFF00]/15 space-y-8 relative group shadow-2xl">
                                   <div className="flex items-center gap-4 text-[#DCFF00]">
                                      <Shield size={20} />
                                      <h4 className="text-[12px] font-bold uppercase tracking-[0.4em]">Anti-Slop Validation Node</h4>
                                   </div>
                                   <div className="space-y-4">
                                      {(startupData?.antiSlopValidation?.checks || ["Hierarchy Verified", "Spacing Standardized", "Typography Optimized"]).map((check: string, i: number) => (
                                        <div key={i} className="flex items-center gap-3 text-[13px] text-white/60 italic">
                                           <div className="w-1.5 h-1.5 rounded-full bg-[#DCFF00]" />
                                           {check}
                                        </div>
                                      ))}
                                   </div>
                                   <div className="pt-6 border-t border-[#DCFF00]/10">
                                      <p className="text-4xl font-headline italic text-white/95 leading-[1.3] tracking-tight">
                                         {startupData?.oracleInvestorAnalysis?.viabilityLogic || "Materializing logical consensus..."}
                                      </p>
                                   </div>
                                </div>
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
