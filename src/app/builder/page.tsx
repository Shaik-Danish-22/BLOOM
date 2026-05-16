
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
  Share2,
  Bot,
  Shield,
  Code,
  TrendingUp,
  AlertTriangle,
  Zap,
  ChevronRight,
  Info,
  Target,
  Activity,
  Layout,
  Sparkles,
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
    { role: 'agent', agent: 'SCISSOR', text: "Neural core synchronized. Brand DNA materialization complete." },
    { role: 'assistant', text: "I've optimized the layout hierarchy and logic nodes. Ready to refine the strategic verdict?" }
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
        text: `Refinement node activated. Re-calculating brand alignment for "${userText}"...` 
      }]);
    }, 1500);
  };

  const openPreview = () => {
    window.open('/preview', '_blank');
  };

  const handleShare = () => {
    toast({
      title: "Neural Node Shared",
      description: "Secure link materializing for collaborators.",
    });
  };

  const handleDeploy = () => {
    toast({
      title: "Live Deployment Initiated",
      description: "Vision has been established in the neural registry.",
    });
  };

  return (
    <div className="relative min-h-screen overflow-hidden flex selection:bg-[#DCFF00]/30 font-body bg-black">
      <BackgroundEffects />
      <GradientBackground />
      <div className="absolute inset-0 -z-10 bg-black/40" />
      
      {/* SIDEBAR - SCISSOR ASSISTANT */}
      <aside className="w-[420px] border-r border-white/5 bg-black/80 backdrop-blur-3xl flex flex-col z-20 relative">
        <header className="p-8 border-b border-white/5 flex items-center justify-between">
           <button onClick={() => router.push('/workspace')} className="p-2.5 rounded-xl hover:bg-white/5 text-white/40 hover:text-white transition-all group">
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
           </button>
           <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/40">Sissor Neural Studio</h3>
           <div className="w-12 h-12 overflow-hidden relative rounded-xl bg-white/[0.03] border border-white/10">
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
              <div className="absolute -inset-1 bg-[#DCFF00]/5 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
              <input 
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Direct Scissor refinement..."
                className="w-full bg-white/5 border border-white/10 h-14 rounded-2xl px-6 text-sm text-white placeholder:text-white/20 focus:ring-1 focus:ring-[#DCFF00]/20 outline-none transition-all relative z-10"
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
                  <button 
                    onClick={() => setMode('registry')}
                    className={`px-5 py-2 rounded-lg text-[10px] uppercase tracking-widest font-bold transition-all flex items-center gap-2 ${mode === 'registry' ? 'bg-white/10 text-white shadow-inner' : 'text-white/30 hover:text-white/60'}`}
                  >
                    <Code size={13} /> Neural Registry
                  </button>
               </div>
            </div>

            <div className="flex items-center gap-4">
              <Button onClick={openPreview} variant="ghost" className="text-white/40 hover:text-white hover:bg-white/5 gap-2.5 text-[10px] uppercase tracking-[0.2em] font-bold px-5 h-12 rounded-xl">
                Full Preview <ExternalLink size={14} />
              </Button>
              <Button onClick={handleShare} variant="ghost" className="text-white/40 hover:text-white hover:bg-white/5 gap-2.5 text-[10px] uppercase tracking-[0.2em] font-bold px-5 h-12 rounded-xl">
                Share <Share2 size={14} />
              </Button>
              <Button onClick={handleDeploy} className="bg-[#DCFF00] text-black hover:bg-[#DCFF00]/90 rounded-2xl px-8 h-12 font-bold uppercase tracking-widest text-[11px] shadow-[0_0_30px_rgba(220,255,0,0.3)] transition-all active:scale-95 group">
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
                  ) : mode === 'strategy' ? (
                    <div className="p-16 space-y-16 bg-black min-h-full relative overflow-y-auto no-scrollbar">
                       <div className="absolute inset-0 pointer-events-none -z-10">
                          <GradientBackground />
                       </div>
                       
                       <header className="flex items-end justify-between border-b border-white/5 pb-12 relative z-10">
                          <div className="space-y-6">
                             <div className="flex items-center gap-4">
                                <Badge className="bg-[#DCFF00] text-black border-none px-5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(220,255,0,0.2)]">
                                  Neural Oracle v2.5
                                </Badge>
                                <span className="text-[11px] text-white/30 uppercase tracking-[0.4em]">Direct Strategic Insight</span>
                             </div>
                             <h2 className="text-6xl font-headline italic text-white/95 leading-none">Market Viability Materialization</h2>
                             <p className="text-white/40 max-w-2xl text-lg font-light leading-relaxed italic">
                               Recursive analysis of the {startupData?.forgeBrandArchitect?.companyName || 'Neural Node'} strategy core, cross-referenced with simulated global indices.
                             </p>
                          </div>
                          <div className="flex items-center gap-12 bg-white/[0.02] border border-white/10 p-10 rounded-[3rem] backdrop-blur-3xl shadow-2xl">
                             <div className="text-right space-y-2">
                                <span className="text-[11px] text-white/20 uppercase tracking-[0.5em] block">Investment Rating</span>
                                <span className="text-8xl font-headline italic text-[#DCFF00] tracking-tighter">
                                  {startupData?.oracleInvestorAnalysis?.investorScore || '94'}
                                  <span className="text-3xl text-white/10 ml-2">/100</span>
                                </span>
                             </div>
                             <div className="w-32 h-32 scale-125">
                                <OracleGauge targetScore={startupData?.oracleInvestorAnalysis?.investorScore || 94} className="scale-[0.5]" />
                             </div>
                          </div>
                       </header>

                       <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 relative z-10">
                          <Card className="lg:col-span-2 p-12 rounded-[3.5rem] bg-white/[0.02] border border-white/10 space-y-10 backdrop-blur-3xl group hover:bg-white/[0.04] transition-all shadow-2xl">
                             <div className="flex items-center gap-5 text-[#DCFF00]">
                                <div className="w-12 h-12 rounded-2xl bg-[#DCFF00]/10 flex items-center justify-center">
                                   <TrendingUp size={24} />
                                </div>
                                <h4 className="text-[12px] font-bold uppercase tracking-[0.4em]">Opportunity Architecture</h4>
                             </div>
                             <p className="text-4xl font-headline italic text-white/90 leading-[1.35] max-w-3xl">
                                {startupData?.sentinelAtlasMarketIntelligence?.marketOpportunityAnalysis || "Aggregating neural market intelligence..."}
                             </p>
                             <div className="grid grid-cols-3 gap-12 pt-10 border-t border-white/5">
                                <div className="space-y-3">
                                   <span className="text-[10px] text-white/20 uppercase tracking-[0.2em] block font-bold">Total Addressable Market</span>
                                   <span className="text-2xl font-headline italic text-[#DCFF00]">{startupData?.sentinelAtlasMarketIntelligence?.tamSamSom?.tam || "$15.6T"}</span>
                                </div>
                                <div className="space-y-3">
                                   <span className="text-[10px] text-white/20 uppercase tracking-[0.2em] block font-bold">Serviceable Addressable</span>
                                   <span className="text-2xl font-headline italic text-white/80">{startupData?.sentinelAtlasMarketIntelligence?.tamSamSom?.sam || "$240B"}</span>
                                </div>
                                <div className="space-y-3">
                                   <span className="text-[10px] text-white/20 uppercase tracking-[0.2em] block font-bold">Serviceable Obtainable</span>
                                   <span className="text-2xl font-headline italic text-white/60">{startupData?.sentinelAtlasMarketIntelligence?.tamSamSom?.som || "$2.4B"}</span>
                                </div>
                             </div>
                          </Card>

                          <Card className="p-12 rounded-[3.5rem] bg-white/[0.02] border border-white/10 space-y-10 backdrop-blur-3xl shadow-2xl">
                             <div className="flex items-center gap-5 text-red-500">
                                <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center">
                                   <AlertTriangle size={24} />
                                </div>
                                <h4 className="text-[12px] font-bold uppercase tracking-[0.4em]">Logical Friction</h4>
                             </div>
                             <div className="space-y-5">
                                {(startupData?.sentinelAtlasMarketIntelligence?.marketRisks || ["Competitive Density", "Execution Lag"]).map((risk: string, i: number) => (
                                  <motion.div 
                                    key={i} 
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-center justify-between p-5 rounded-2xl bg-red-500/5 border border-red-500/10 hover:bg-red-500/10 transition-all cursor-help"
                                  >
                                     <div className="flex items-center gap-5">
                                        <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                                        <span className="text-[13px] text-red-500 font-bold uppercase tracking-wider">{risk}</span>
                                     </div>
                                     <Info size={16} className="text-red-500/30" />
                                  </motion.div>
                                ))}
                             </div>
                             <div className="pt-6">
                                <p className="text-[11px] text-white/20 italic leading-relaxed text-center font-medium uppercase tracking-widest">
                                  Oracle risk analysis is reactive.
                                </p>
                             </div>
                          </Card>

                          <Card className="lg:col-span-3 p-16 rounded-[4rem] bg-white/[0.02] border border-white/10 space-y-16 backdrop-blur-3xl relative overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.3)]">
                             <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#DCFF00]/5 blur-[150px] rounded-full -z-10 animate-pulse" />
                             <div className="flex items-center gap-5 text-white/40">
                                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
                                   <Target size={24} />
                                </div>
                                <h4 className="text-[12px] font-bold uppercase tracking-[0.5em]">Neural Moats & Strategic Positioning</h4>
                             </div>
                             
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                                <div className="space-y-10">
                                   <div className="grid grid-cols-1 gap-8">
                                      {(startupData?.sentinelAtlasMarketIntelligence?.strategicMoats || ["Neural Identity", "Scale Logistics"]).map((moat: string, i: number) => (
                                        <motion.div 
                                          key={i} 
                                          initial={{ opacity: 0, y: 20 }}
                                          whileInView={{ opacity: 1, y: 0 }}
                                          className="p-10 rounded-[3rem] bg-white/[0.03] border border-white/10 group hover:bg-white/[0.06] transition-all relative overflow-hidden shadow-xl"
                                        >
                                           <div className="flex items-center justify-between mb-6">
                                              <h5 className="text-3xl font-headline italic text-white/95">{moat}</h5>
                                              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[#DCFF00] opacity-20 group-hover:opacity-100 transition-all">
                                                 <ChevronRight size={20} />
                                              </div>
                                           </div>
                                           <p className="text-[15px] text-white/40 leading-relaxed italic font-light">
                                              Competitive advantage derived from recursive materialization and logic validation.
                                           </p>
                                        </motion.div>
                                      ))}
                                   </div>
                                </div>

                                <div className="space-y-10">
                                   <div className="p-12 rounded-[3.5rem] bg-[#DCFF00]/5 border border-[#DCFF00]/15 space-y-8 relative group shadow-2xl">
                                      <div className="absolute inset-0 bg-[#DCFF00]/5 opacity-0 group-hover:opacity-100 blur-3xl transition-opacity -z-10" />
                                      <div className="flex items-center gap-4 text-[#DCFF00]">
                                         <Activity size={20} className="animate-pulse" />
                                         <h4 className="text-[12px] font-bold uppercase tracking-[0.4em]">Oracle Final Verdict</h4>
                                      </div>
                                      <p className="text-4xl font-headline italic text-white/95 leading-[1.3] tracking-tight">
                                         {startupData?.oracleInvestorAnalysis?.viabilityLogic || "Materializing logical consensus..."}
                                      </p>
                                      <div className="pt-6 flex flex-wrap items-center gap-6">
                                         <Badge variant="outline" className="border-[#DCFF00]/40 text-[#DCFF00] text-[11px] font-bold tracking-[0.3em] uppercase py-3 px-10 rounded-full bg-[#DCFF00]/10 shadow-[0_0_30px_rgba(220,255,0,0.2)]">
                                           {startupData?.oracleInvestorAnalysis?.investorVerdict || "Strategic Investment Recommended"}
                                         </Badge>
                                         <div className="flex items-center gap-3 text-white/20 italic text-[12px] font-medium tracking-widest uppercase">
                                            <MousePointer2 size={12} /> Interactive Node
                                         </div>
                                      </div>
                                   </div>
                                </div>
                             </div>
                          </Card>
                       </div>
                    </div>
                  ) : (
                    <div className="p-16 font-code text-[13px] text-white/40 leading-loose bg-black min-h-full relative overflow-y-auto no-scrollbar">
                       <div className="absolute inset-0 pointer-events-none -z-10">
                          <GradientBackground />
                       </div>
                       <header className="mb-12 border-b border-white/10 pb-10">
                          <h4 className="text-[12px] font-bold uppercase tracking-[0.6em] text-white/80">Bloom Neural Registry v2.5 Stable</h4>
                          <p className="text-[10px] text-white/20 mt-3 font-medium uppercase tracking-widest">NODE SYNC: 100% | MATERIALIZATION: VALIDATED</p>
                       </header>
                       <pre className="opacity-90 relative z-10 bg-black/80 p-12 rounded-[3rem] border border-white/10 backdrop-blur-3xl shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-x-auto selection:bg-[#DCFF00]/30 selection:text-white">
                        {`// Neural Forge Materialization Source\n// Timestamp: ${new Date().toISOString()}\n\nimport { BloomForge } from '@bloom/neural';\n\nexport default function Materialization() {\n  const palette = ${JSON.stringify(startupData?.websiteContent?.colorPalette || [], null, 2)};\n  const strategy = "${startupData?.oracleInvestorAnalysis?.investorVerdict || 'BULLISH'}";\n\n  return (\n    <NeuralCanvas \n       palette={palette} \n       intensity="high-fidelity"\n       mode="${(startupData?.oracleInvestorAnalysis?.investorScore || 0) > 90 ? 'prime' : 'standard'}"\n    >\n       <Branding \n          name="${startupData?.forgeBrandArchitect?.companyName || 'BLOOM'}" \n          dna="${startupData?.forgeBrandArchitect?.neuralTone || 'Vision'}"\n       />\n       \n       <StrategicHub \n          verdict={strategy}\n          viability={${startupData?.oracleInvestorAnalysis?.investorScore || 92}}\n       />\n\n       <Hero \n          title="${startupData?.websiteContent?.sections?.find((s: any) => s.type === 'hero')?.title || 'Vision'}"\n          typography="${startupData?.websiteContent?.typographyStrategy || 'Editorial High-Contrast'}"\n       />\n\n       <Features \n          layout="bento-dynamic" \n          items={${JSON.stringify(startupData?.websiteContent?.sections?.find((s: any) => s.type === 'features')?.items || [], null, 2)}}\n       />\n\n       <DeployNode status="synchronized" />\n    </NeuralCanvas>\n  );\n}`}
                       </pre>
                    </div>
                  )}
               </div>
            </motion.div>
         </div>
      </main>
    </div>
  );
}
