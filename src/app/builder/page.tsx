
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
  Brain,
  Palette,
  Briefcase,
  Layers,
  Search,
  ChevronRight,
  Settings,
  Terminal,
  MousePointer2
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
import { Separator } from "@/components/ui/separator";

const SCISSOR_SCENE = "https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode";

export default function BuilderPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [view, setView] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [mode, setMode] = useState<"materialization" | "strategy">("materialization");
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [startupData, setStartupData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("registry");
  
  const [chat, setChat] = useState<{role: 'user' | 'assistant' | 'agent', text: string, agent?: string}[]>([
    { role: 'agent', agent: 'SCISSOR', text: "Neural core synchronized. Startup experience orchestration complete." }
  ]);

  useEffect(() => {
    const stored = localStorage.getItem("latest_startup");
    const context = localStorage.getItem("materialization_context");
    
    if (stored) {
      try {
        const data = JSON.parse(stored);
        setStartupData(data);
        
        // Handle initial path selection
        if (context) {
          const { selectedPath } = JSON.parse(context);
          if (selectedPath === 'research') setMode('strategy');
        }
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
    <div className="relative min-h-screen overflow-hidden flex selection:bg-[#DCFF00]/30 font-body bg-black text-white">
      <BackgroundEffects />
      <GradientBackground />
      <div className="absolute inset-0 -z-10 bg-black/40" />
      
      {/* IDE SIDEBAR - PROJECT REGISTRY & DESIGN DNA */}
      <aside className="w-[380px] border-r border-white/5 bg-black/90 backdrop-blur-3xl flex flex-col z-20 relative">
        <header className="p-6 border-b border-white/5 flex items-center justify-between">
           <div className="flex items-center gap-3">
              <BloomLogo size={24} />
              <div className="flex flex-col">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/40 leading-none">BLOOM STUDIO</h3>
                <span className="text-[12px] font-headline italic text-white/80 mt-1">{startupData?.forgeBrandArchitect?.companyName || "Project Neural"}</span>
              </div>
           </div>
           <button onClick={() => router.push('/workspace')} className="p-2.5 rounded-xl hover:bg-white/5 text-white/40 hover:text-white transition-all">
              <ArrowLeft size={16} />
           </button>
        </header>

        <nav className="flex border-b border-white/5 px-4 bg-black/20">
           {['registry', 'dna', 'chat'].map((tab) => (
             <button 
               key={tab}
               onClick={() => setActiveTab(tab)}
               className={`flex-1 py-3 text-[9px] uppercase tracking-[0.3em] font-bold transition-all border-b-2 ${activeTab === tab ? 'border-[#DCFF00] text-[#DCFF00]' : 'border-transparent text-white/20 hover:text-white/40'}`}
             >
               {tab}
             </button>
           ))}
        </nav>

        <ScrollArea className="flex-1">
           <div className="p-6 space-y-8">
              {activeTab === 'registry' && (
                <div className="space-y-8">
                   <div className="space-y-4">
                      <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-white/20">
                         <span>Startup Artifacts</span>
                         <Layers size={14} />
                      </div>
                      <div className="space-y-2">
                         {['Market Thesis', 'Brand Rationale', 'Pricing Node', 'Anti-Slop Validation'].map((item) => (
                           <div key={item} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/5 transition-all group cursor-pointer">
                              <span className="text-[11px] text-white/60 group-hover:text-white">{item}</span>
                              <ChevronRight size={12} className="text-white/20 group-hover:text-[#DCFF00]" />
                           </div>
                         ))}
                      </div>
                   </div>

                   <div className="p-5 rounded-2xl bg-[#DCFF00]/5 border border-[#DCFF00]/10 space-y-4">
                      <div className="flex items-center gap-2 text-[#DCFF00]">
                         <Shield size={14} />
                         <span className="text-[10px] font-bold uppercase tracking-widest">Quality Node</span>
                      </div>
                      <p className="text-[11px] text-[#DCFF00]/80 italic leading-relaxed">
                        Anti-Slop Validation active. Ensuring consistent hierarchy, typography pacing, and emotional resonance across all materializations.
                      </p>
                   </div>
                </div>
              )}

              {activeTab === 'dna' && (
                <div className="space-y-8">
                   <div className="space-y-6">
                      <div className="flex items-center gap-2 text-white/40">
                         <Palette size={14} />
                         <span className="text-[10px] font-bold uppercase tracking-widest">Visual Orchestration</span>
                      </div>
                      <div className="space-y-6">
                         <div className="space-y-3">
                            <span className="text-[10px] text-white/20 uppercase tracking-widest block font-bold">Primary Palette</span>
                            <div className="flex gap-2">
                               {startupData?.websiteContent?.colorPalette?.map((c: string, i: number) => (
                                 <div key={i} className="w-8 h-8 rounded-lg border border-white/10" style={{ backgroundColor: c }} />
                               ))}
                            </div>
                         </div>
                         <div className="space-y-3">
                            <span className="text-[10px] text-white/20 uppercase tracking-widest block font-bold">Motion Intensity</span>
                            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-[11px] text-white/80 italic">
                               {startupData?.websiteContent?.motionPhilosophy || "Subtle Cinematic Fades"}
                            </div>
                         </div>
                         <div className="space-y-3">
                            <span className="text-[10px] text-white/20 uppercase tracking-widest block font-bold">Typography DNA</span>
                            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-[11px] text-white/80 italic font-headline">
                               {startupData?.websiteContent?.typographyStrategy || "High-Contrast Editorial Serif"}
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
              )}

              {activeTab === 'chat' && (
                <div className="space-y-6">
                   {chat.map((msg, i) => (
                     <div key={i} className="space-y-2">
                        {msg.agent && (
                          <div className="flex items-center gap-2 px-1">
                             <Bot size={11} className="text-[#DCFF00]" />
                             <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#DCFF00]/40">{msg.agent}</span>
                          </div>
                        )}
                        <div className={`p-4 rounded-xl text-[12px] leading-relaxed ${msg.role === 'user' ? 'bg-[#DCFF00] text-black font-semibold' : 'bg-white/[0.03] border border-white/5 text-white/60'}`}>
                           {msg.text}
                        </div>
                     </div>
                   ))}
                </div>
              )}
           </div>
        </ScrollArea>

        {activeTab === 'chat' && (
          <div className="p-6 border-t border-white/5 bg-black/40">
             <div className="relative group">
                <input 
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSend()}
                  placeholder="Direct Scissor refinement..."
                  className="w-full bg-white/5 border border-white/10 h-12 rounded-xl px-4 text-[12px] text-white focus:ring-1 focus:ring-[#DCFF00]/20 outline-none transition-all"
                />
                <Button onClick={handleSend} size="icon" className="absolute right-1 top-1 h-10 w-10 bg-white text-black hover:bg-[#DCFF00] rounded-lg transition-all active:scale-90">
                   <ChevronRight size={14} />
                </Button>
             </div>
          </div>
        )}
      </aside>

      {/* MAIN VIEWPORT */}
      <main className="flex-1 flex flex-col z-10 p-6 overflow-hidden">
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
                   className={`p-2 rounded-lg transition-all ${view === item.id ? 'bg-white text-black shadow-lg' : 'text-white/30 hover:text-white'}`}
                 >
                   <item.icon size={14} />
                 </button>
               ))}
               <div className="w-px h-4 bg-white/10 mx-1" />
               <div className="flex bg-black/40 rounded-lg p-0.5">
                  <button 
                    onClick={() => setMode('materialization')}
                    className={`px-4 py-2 rounded-md text-[9px] uppercase tracking-widest font-bold transition-all flex items-center gap-2 ${mode === 'materialization' ? 'bg-white/10 text-white shadow-inner' : 'text-white/30 hover:text-white/60'}`}
                  >
                    <Layout size={12} /> Design & Execution
                  </button>
                  <button 
                    onClick={() => setMode('strategy')}
                    className={`px-4 py-2 rounded-md text-[9px] uppercase tracking-widest font-bold transition-all flex items-center gap-2 ${mode === 'strategy' ? 'bg-white/10 text-white shadow-inner' : 'text-white/30 hover:text-white/60'}`}
                  >
                    <Search size={12} /> Research & Insight
                  </button>
               </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-3 mr-4">
                 <Terminal size={12} className="text-[#DCFF00]" />
                 <span className="text-[10px] font-mono text-[#DCFF00]/40 uppercase tracking-widest">Studio_v2.5_Stable</span>
              </div>
              <Button onClick={openPreview} variant="ghost" className="text-white/40 hover:text-white hover:bg-white/5 gap-2 text-[9px] uppercase tracking-[0.2em] font-bold px-4 h-10 rounded-lg">
                Preview <ExternalLink size={12} />
              </Button>
              <Button className="bg-[#DCFF00] text-black hover:bg-[#DCFF00]/90 rounded-xl px-6 h-10 font-bold uppercase tracking-widest text-[10px] shadow-[0_0_20px_rgba(220,255,0,0.2)] transition-all active:scale-95 group">
                 <Rocket size={13} className="mr-2 group-hover:-translate-y-1 transition-transform" /> Neural Deploy
              </Button>
            </div>
         </header>

         <div className="flex-1 flex items-center justify-center bg-white/[0.01] rounded-[2.5rem] border border-white/5 p-4 overflow-hidden backdrop-blur-sm relative">
            <div className="absolute inset-0 pointer-events-none border-[8px] border-black/20 rounded-[2.5rem] z-20" />
            
            <motion.div 
              layout
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className={`h-full bg-black rounded-[2rem] border border-white/10 shadow-2xl overflow-hidden relative ${
                view === 'desktop' ? 'w-full' : view === 'tablet' ? 'w-[768px]' : 'w-[375px]'
              }`}
            >
               <div className="h-full w-full overflow-y-auto no-scrollbar bg-black relative">
                  {mode === 'materialization' ? (
                    <MaterializingWebsite isVisible={true} data={startupData} />
                  ) : (
                    <div className="p-12 space-y-16 bg-black min-h-full relative overflow-y-auto no-scrollbar selection:bg-white/10">
                       <header className="flex flex-col md:flex-row items-end justify-between border-b border-white/5 pb-12 gap-8">
                          <div className="space-y-6 max-w-2xl">
                             <div className="flex items-center gap-4">
                                <Badge className="bg-[#DCFF00] text-black border-none px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(220,255,0,0.15)]">
                                  Shark Protocol v2.5
                                </Badge>
                                <span className="text-[10px] text-white/30 uppercase tracking-[0.4em] font-bold">Brutal Strategic Consensus</span>
                             </div>
                             <h2 className="text-6xl font-headline italic text-white/95 leading-[0.9]">Strategic <br/> Intelligence Hub</h2>
                             <p className="text-white/40 text-lg font-light leading-relaxed italic">
                               Recursive analysis of {startupData?.forgeBrandArchitect?.companyName || 'Startup'} through our multi-billion dollar shark intelligence layer. Identify risks, size markets, and validate logic before execution.
                             </p>
                          </div>
                          <div className="flex items-center gap-10 bg-white/[0.02] border border-white/10 p-8 rounded-[3rem] backdrop-blur-3xl">
                             <div className="text-right space-y-2">
                                <span className="text-[10px] text-white/20 uppercase tracking-[0.5em] block font-bold">Viability Score</span>
                                <span className="text-7xl font-headline italic text-[#DCFF00] tracking-tighter">
                                  {startupData?.oracleInvestorAnalysis?.investorScore || '92'}
                                  <span className="text-2xl text-white/10 ml-2">/100</span>
                                </span>
                             </div>
                             <div className="w-24 h-24">
                                <OracleGauge targetScore={startupData?.oracleInvestorAnalysis?.investorScore || 92} className="scale-[0.4]" />
                             </div>
                          </div>
                       </header>

                       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
                          {/* THE SHARK VERDICT */}
                          <Card className="lg:col-span-2 p-12 rounded-[3.5rem] bg-white/[0.02] border border-white/10 space-y-10 backdrop-blur-3xl group shadow-2xl relative overflow-hidden">
                             <div className="absolute top-0 right-0 p-8">
                                <Bot size={24} className="text-[#DCFF00]/20" />
                             </div>
                             <div className="flex items-center gap-5 text-[#DCFF00]">
                                <div className="w-12 h-12 rounded-2xl bg-[#DCFF00]/10 flex items-center justify-center">
                                   <Briefcase size={24} />
                                </div>
                                <h4 className="text-[12px] font-bold uppercase tracking-[0.4em]">The Shark Verdict</h4>
                             </div>
                             <div className="space-y-6">
                               <p className="text-4xl font-headline italic text-white/90 leading-[1.3] max-w-3xl">
                                  {startupData?.oracleInvestorAnalysis?.investorVerdict || "Analyzing market congestions..."}
                               </p>
                               <p className="text-xl text-white/40 font-light leading-relaxed italic">
                                  {startupData?.oracleInvestorAnalysis?.viabilityLogic || "Waiting for neural consensus..."}
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
                                   <span className="text-2xl font-headline italic text-[#DCFF00]">{startupData?.sentinelAtlasMarketIntelligence?.tamSamSom?.tam || "$15.6T"}</span>
                                </div>
                                <div className="space-y-2">
                                   <span className="text-[10px] text-white/20 uppercase tracking-[0.2em] block font-bold">SAM (Serviceable)</span>
                                   <span className="text-2xl font-headline italic text-white/80">{startupData?.sentinelAtlasMarketIntelligence?.tamSamSom?.sam || "$240B"}</span>
                                </div>
                                <div className="space-y-2">
                                   <span className="text-[10px] text-white/20 uppercase tracking-[0.2em] block font-bold">SOM (Obtainable)</span>
                                   <span className="text-2xl font-headline italic text-white/60">{startupData?.sentinelAtlasMarketIntelligence?.tamSamSom?.som || "$2.4B"}</span>
                                </div>
                             </div>
                          </Card>

                          {/* STRATEGIC RISKS */}
                          <Card className="lg:col-span-1 p-10 rounded-[3rem] bg-white/[0.02] border border-white/10 space-y-8 backdrop-blur-3xl">
                             <div className="flex items-center gap-4 text-red-500">
                                <AlertTriangle size={20} />
                                <h4 className="text-[11px] font-bold uppercase tracking-[0.4em]">Brutal Risks</h4>
                             </div>
                             <div className="space-y-4">
                                {(startupData?.sentinelAtlasMarketIntelligence?.marketRisks || ["Saturated Market", "Execution Risk"]).map((risk: string, i: number) => (
                                  <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-red-500/5 border border-red-500/10">
                                     <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                                     <span className="text-[12px] text-red-500 font-bold uppercase tracking-widest">{risk}</span>
                                  </div>
                                ))}
                             </div>
                          </Card>

                          {/* RECOMMENDATIONS */}
                          <Card className="lg:col-span-2 p-10 rounded-[3rem] bg-white/[0.02] border border-white/10 space-y-8 backdrop-blur-3xl">
                             <div className="flex items-center gap-4 text-white/40">
                                <Target size={20} />
                                <h4 className="text-[11px] font-bold uppercase tracking-[0.4em]">Shark Recommendations</h4>
                             </div>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 space-y-4">
                                   <h5 className="text-[10px] font-bold uppercase tracking-widest text-[#DCFF00]">Strategic Moat</h5>
                                   <p className="text-lg font-headline italic text-white/80">
                                      Leverage the proprietary neural logic to create a defensive barrier against legacy incumbents.
                                   </p>
                                </div>
                                <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 space-y-4">
                                   <h5 className="text-[10px] font-bold uppercase tracking-widest text-[#DCFF00]">Scale Strategy</h5>
                                   <p className="text-lg font-headline italic text-white/80">
                                      Focus on high-value niche segments first to prove ROI before horizontal expansion.
                                   </p>
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
