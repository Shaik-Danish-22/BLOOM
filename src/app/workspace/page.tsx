"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  Search, 
  Palette, 
  ArrowRight, 
  ChevronLeft, 
  Zap, 
  BarChart3, 
  Rocket,
  Wand2,
  Cpu,
  Shield,
  Layers,
  CheckCircle2,
  Terminal,
  Bot,
  AlertTriangle,
  Target
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { enhancePrompt } from "@/ai/flows/enhance-prompt";
import { generateOracleInvestorScore } from "@/ai/flows/generate-oracle-investor-score";
import { BackgroundEffects } from "@/components/cinematic/BackgroundEffects";
import { OracleGauge } from "@/components/cinematic/OracleGauge";
import { DESIGN_SYSTEMS, DesignSystemId } from "@/lib/design-systems";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

type Step = 'prompt' | 'enhancing' | 'refine' | 'mode-selection' | 'research' | 'design-systems' | 'materializing';

export default function WorkspacePage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('prompt');
  const [prompt, setPrompt] = useState("");
  const [enhancedData, setEnhancedData] = useState<any>(null);
  const [oracleData, setOracleData] = useState<any>(null);
  const [selectedSystem, setSelectedSystem] = useState<DesignSystemId>('minimal');

  useEffect(() => {
    const isMockAuth = localStorage.getItem("siteforge_dummy_user");
    if (!isMockAuth) router.push('/');
  }, [router]);

  const handleEnhance = async () => {
    if (!prompt.trim()) return;
    setStep('enhancing');
    try {
      const data = await enhancePrompt({ rawPrompt: prompt });
      setEnhancedData(data);
      setStep('refine');
    } catch (e) {
      setStep('prompt');
    }
  };

  const handleStartResearch = async () => {
    setStep('enhancing'); 
    try {
      const data = await generateOracleInvestorScore({
        companyName: enhancedData?.suggestedName || "NexusFlow",
        tagline: enhancedData?.coreConcept || "Neural Supply Chain",
        valueProposition: enhancedData?.professionalBrief || "",
        marketCategory: enhancedData?.suggestedVibe
      });
      setOracleData(data);
      setStep('research');
    } catch (e) {
      setStep('mode-selection');
    }
  };

  const startMaterialization = () => {
    setStep('materializing');
    setTimeout(() => {
      router.push('/builder');
    }, 4000);
  };

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-white/20 overflow-hidden font-body">
      <BackgroundEffects />

      {/* HEADER */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center backdrop-blur-md border-b border-white/5 bg-black/40">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
            <span className="text-black font-bold">S</span>
          </div>
          <span className="text-lg font-headline italic tracking-tight">FounderOS Neural Link</span>
        </div>
        <div className="flex items-center gap-4">
           <Button variant="ghost" onClick={() => { localStorage.removeItem("siteforge_dummy_user"); router.push('/'); }} className="text-white/40 hover:text-white text-xs font-bold uppercase tracking-widest">
             End Session
           </Button>
           <div className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center">
              <Zap size={18} className="text-white/40 animate-pulse" />
           </div>
        </div>
      </nav>

      <main className="pt-32 px-6 max-w-7xl mx-auto h-[calc(100vh-80px)] overflow-y-auto scrollbar-hide">
        <AnimatePresence mode="wait">
          {step === 'prompt' && (
            <motion.div 
              key="prompt"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="flex flex-col items-center justify-center min-h-[70vh] text-center max-w-3xl mx-auto"
            >
              <h2 className="text-5xl md:text-7xl font-headline italic mb-8">What shall we <em className="not-italic text-white/20">materialize</em>?</h2>
              <div className="w-full relative">
                <Textarea 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe your vision in vague terms..."
                  className="w-full min-h-[220px] bg-white/5 border-white/10 rounded-[40px] p-10 text-xl focus:ring-1 focus:ring-white/20 transition-all liquid-glass"
                />
                <Button 
                  onClick={handleEnhance}
                  disabled={!prompt.trim()}
                  className="absolute bottom-6 right-6 bg-white text-black hover:bg-white/90 rounded-full px-10 h-16 flex items-center gap-3 font-bold uppercase tracking-widest shadow-2xl transition-transform active:scale-95"
                >
                  <Wand2 size={20} /> Enhance Idea
                </Button>
              </div>
              <p className="mt-8 text-white/10 text-[10px] uppercase tracking-[0.4em] font-bold">Intelligence Link v2.5 Stable</p>
            </motion.div>
          )}

          {step === 'enhancing' && (
            <motion.div 
              key="enhancing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center h-full text-center"
            >
              <div className="relative w-40 h-40 mb-12">
                <motion.div 
                  animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full border-t-2 border-white/20 border-transparent shadow-[0_0_80px_rgba(255,255,255,0.05)]"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Cpu className="text-white w-12 h-12 animate-pulse" />
                </div>
              </div>
              <h3 className="text-3xl font-headline italic text-white/60 mb-2">Neural Expansion Active</h3>
              <p className="text-white/10 uppercase tracking-[0.4em] text-[10px] font-bold">Deriving Design DNA and Market Positioning...</p>
            </motion.div>
          )}

          {step === 'refine' && (
            <motion.div 
              key="refine"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="max-w-5xl mx-auto py-12"
            >
              <header className="mb-12 flex justify-between items-end">
                <div>
                  <h2 className="text-4xl font-headline italic mb-2">Neural DNA Brief</h2>
                  <p className="text-white/40 italic">Review the derived intelligence before materialization.</p>
                </div>
                <Button onClick={() => setStep('mode-selection')} className="bg-white text-black rounded-full px-8 h-12 font-bold uppercase tracking-widest shadow-xl">
                  Commit Brief <ArrowRight size={18} className="ml-2" />
                </Button>
              </header>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2 liquid-glass p-10 border-white/10">
                   <h4 className="text-[10px] uppercase tracking-widest font-bold text-white/20 mb-6">Strategic Positioning</h4>
                   <Textarea 
                     value={enhancedData?.professionalBrief}
                     onChange={(e) => setEnhancedData({...enhancedData, professionalBrief: e.target.value})}
                     className="bg-transparent border-none p-0 text-xl leading-relaxed italic text-white/70 resize-none min-h-[400px] focus-visible:ring-0"
                   />
                </Card>

                <div className="space-y-6">
                   <Card className="liquid-glass p-8 border-white/5">
                      <h4 className="text-[10px] uppercase tracking-widest font-bold text-white/20 mb-4">Design DNA</h4>
                      <div className="space-y-4">
                         <div>
                            <p className="text-[8px] uppercase tracking-widest text-white/10 mb-1">Mood</p>
                            <p className="text-sm font-headline italic">{enhancedData?.designDNA?.mood}</p>
                         </div>
                         <div>
                            <p className="text-[8px] uppercase tracking-widest text-white/10 mb-1">Motion</p>
                            <p className="text-sm font-headline italic">{enhancedData?.designDNA?.motionPhilosophy}</p>
                         </div>
                         <div>
                            <p className="text-[8px] uppercase tracking-widest text-white/10 mb-1">Interaction</p>
                            <p className="text-sm font-headline italic">{enhancedData?.designDNA?.interactionStyle}</p>
                         </div>
                      </div>
                   </Card>
                   
                   <Card className="liquid-glass p-8 border-white/5 bg-white/5">
                      <h4 className="text-[10px] uppercase tracking-widest font-bold text-white/20 mb-4">Neural Nodes</h4>
                      <ul className="space-y-3">
                         {enhancedData?.followUpQuestions.slice(0, 3).map((q: string, i: number) => (
                           <li key={i} className="text-[11px] text-white/30 italic flex gap-3">
                             <div className="w-1.5 h-1.5 rounded-full bg-white/10 mt-1.5 shrink-0" />
                             {q}
                           </li>
                         ))}
                      </ul>
                   </Card>
                </div>
              </div>
            </motion.div>
          )}

          {step === 'mode-selection' && (
            <motion.div 
              key="modes"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="h-full flex flex-col justify-center max-w-6xl mx-auto"
            >
              <h2 className="text-7xl font-headline italic text-center mb-20 leading-tight">Choose your <br /> <em className="not-italic text-white/10">Trajectory.</em></h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                 <div 
                   onClick={handleStartResearch}
                   className="liquid-glass p-20 rounded-[64px] border border-white/5 flex flex-col items-center text-center group cursor-pointer hover:border-white/20 transition-all hover:scale-[1.02]"
                 >
                    <div className="w-24 h-24 rounded-[36px] bg-white/5 border border-white/10 flex items-center justify-center mb-10 group-hover:bg-white group-hover:text-black transition-all duration-700">
                       <Shield size={48} />
                    </div>
                    <h4 className="text-5xl font-bold mb-6">The Oracle</h4>
                    <p className="text-white/30 leading-relaxed max-w-xs italic">
                      Strategic research, investor readiness, and competitive moats. Genuinely analyze the vision.
                    </p>
                    <Badge variant="outline" className="mt-12 border-white/10 text-[10px] tracking-[0.4em] py-2 px-6">RESEARCH MODE</Badge>
                 </div>

                 <div 
                   onClick={() => setStep('design-systems')}
                   className="p-20 rounded-[64px] border border-white/5 flex flex-col items-center text-center group cursor-pointer hover:border-white/20 transition-all hover:scale-[1.02] bg-white text-black"
                 >
                    <div className="w-24 h-24 rounded-[36px] bg-black/5 border border-black/10 flex items-center justify-center mb-10 group-hover:bg-black group-hover:text-white transition-all duration-700">
                       <Palette size={48} />
                    </div>
                    <h4 className="text-5xl font-bold mb-6">The Forge</h4>
                    <p className="text-black/50 leading-relaxed max-w-xs italic">
                      Cinematic execution. Watch your startup website materialize live through premium design fragments.
                    </p>
                    <Badge variant="outline" className="mt-12 border-black/10 text-[10px] tracking-[0.4em] text-black/40 py-2 px-6">DESIGN STUDIO</Badge>
                 </div>
              </div>
            </motion.div>
          )}

          {step === 'research' && (
            <motion.div key="oracle-view" className="py-12 pb-32">
               <Button variant="ghost" onClick={() => setStep('mode-selection')} className="mb-12 text-white/20 hover:text-white transition-colors">
                 <ChevronLeft className="mr-2" /> Return to Trajectory
               </Button>
               
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                  <div className="lg:col-span-2 space-y-20">
                    <section className="space-y-8">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                          <Target size={22} className="text-white/60" />
                        </div>
                        <h3 className="text-2xl font-headline italic">Strategic Intelligence</h3>
                      </div>
                      <Card className="liquid-glass p-12 border-white/10">
                        <p className="text-3xl font-light italic text-white/70 leading-relaxed mb-12 border-b border-white/5 pb-12">
                          "{oracleData?.verdict}"
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                           <div className="space-y-6">
                             <h5 className="text-[10px] uppercase tracking-widest font-bold text-white/20">Critical Market Risks</h5>
                             <div className="space-y-4">
                                {oracleData?.marketRisks.map((risk: string, i: number) => (
                                  <div key={i} className="flex gap-4 items-start text-sm text-white/40 italic">
                                     <AlertTriangle size={16} className="text-amber-500/40 shrink-0 mt-0.5" />
                                     {risk}
                                  </div>
                                ))}
                             </div>
                           </div>
                           <div className="space-y-6">
                             <h5 className="text-[10px] uppercase tracking-widest font-bold text-white/20">Identified Moats</h5>
                             <div className="space-y-4">
                                {oracleData?.strategicMoats.map((moat: string, i: number) => (
                                  <div key={i} className="flex gap-4 items-start text-sm text-white/70 italic">
                                     <CheckCircle2 size={16} className="text-green-500/40 shrink-0 mt-0.5" />
                                     {moat}
                                  </div>
                                ))}
                             </div>
                           </div>
                        </div>
                      </Card>
                    </section>

                    <section className="space-y-8">
                       <h5 className="text-[10px] uppercase tracking-widest font-bold text-white/20">Neural Sub-Metrics</h5>
                       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {oracleData?.subScores.map((s: any, i: number) => (
                            <div key={i} className="p-10 rounded-[40px] border border-white/5 liquid-glass flex flex-col justify-between h-48 group hover:border-white/20 transition-all">
                               <h5 className="text-[10px] uppercase tracking-widest font-bold text-white/20">{s.category}</h5>
                               <span className="text-6xl font-headline text-white/40 group-hover:text-white transition-colors">{s.score}</span>
                            </div>
                          ))}
                       </div>
                    </section>
                  </div>

                  <div className="flex flex-col items-center justify-center p-16 rounded-[64px] border border-white/10 liquid-glass sticky top-32 h-fit bg-white/[0.02]">
                     <OracleGauge targetScore={oracleData?.score || 88} />
                     <div className="mt-16 text-center space-y-6">
                        <p className="text-[10px] uppercase tracking-[0.5em] font-bold text-white/20">Oracle Readiness Score</p>
                        <Badge className="bg-white/10 text-white px-8 py-3 border-none text-[11px] tracking-[0.2em] font-bold">ALPHA VERIFIED</Badge>
                     </div>
                     <Button onClick={() => setStep('design-systems')} className="mt-20 w-full bg-white text-black rounded-full h-20 text-lg font-bold uppercase tracking-widest shadow-[0_0_80px_rgba(255,255,255,0.1)] hover:scale-[1.02] transition-all">
                       Proceed to Forge
                     </Button>
                  </div>
               </div>
            </motion.div>
          )}

          {step === 'design-systems' && (
            <motion.div key="design-select" className="py-12 max-w-6xl mx-auto pb-32">
               <h2 className="text-6xl font-headline italic text-center mb-24 leading-tight">Select your <br /> <em className="not-italic text-white/10">Design Fragment.</em></h2>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-24">
                  {Object.values(DESIGN_SYSTEMS).map((sys) => (
                    <div 
                      key={sys.id}
                      onClick={() => setSelectedSystem(sys.id)}
                      className={`liquid-glass rounded-[56px] border transition-all cursor-pointer p-12 group relative ${
                        selectedSystem === sys.id ? 'border-white scale-105 bg-white/5' : 'border-white/5 opacity-40 hover:opacity-100'
                      }`}
                    >
                       <div className="flex justify-between items-start mb-10">
                         <div className="w-14 h-14 rounded-2xl border border-white/10 flex items-center justify-center bg-white/5">
                            <Layers size={24} className={selectedSystem === sys.id ? 'text-white' : 'text-white/20'} />
                         </div>
                         {selectedSystem === sys.id && <motion.div layoutId="sys-check" className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-2xl"><CheckCircle2 size={18} className="text-black" /></motion.div>}
                       </div>
                       <h4 className="text-2xl font-bold mb-3">{sys.name}</h4>
                       <p className="text-xs text-white/30 leading-relaxed italic mb-8">{sys.description}</p>
                       <div className="flex flex-wrap gap-2">
                          {sys.principles.map((p, i) => <Badge key={i} className="bg-white/5 text-[9px] border-none text-white/20 uppercase px-3 py-1 font-bold">{p}</Badge>)}
                       </div>
                    </div>
                  ))}
               </div>
               <div className="flex justify-center">
                  <Button onClick={startMaterialization} className="bg-white text-black rounded-full px-24 h-24 text-2xl font-bold uppercase tracking-[0.2em] shadow-[0_0_100px_rgba(255,255,255,0.2)] hover:scale-105 transition-all">
                    Materialize Vision
                  </Button>
               </div>
            </motion.div>
          )}

          {step === 'materializing' && (
            <motion.div 
              key="materializing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center h-full text-center"
            >
               <div className="relative w-full max-w-5xl">
                  <motion.div 
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 4, ease: "linear" }}
                    className="h-1.5 w-full bg-white origin-left shadow-[0_0_50px_white]"
                  />
                  <div className="mt-16 space-y-6">
                     <h2 className="text-8xl font-headline italic tracking-tighter leading-none">Materializing {enhancedData?.suggestedName}</h2>
                     <div className="flex items-center justify-center gap-6 text-[11px] uppercase tracking-[0.5em] font-bold text-white/20">
                        <span className="animate-pulse">Neural Transit active</span>
                        <div className="w-2 h-2 rounded-full bg-white/10" />
                        <span>Rendering {selectedSystem} nodes</span>
                     </div>
                  </div>
                  
                  <div className="mt-24 grid grid-cols-4 gap-12">
                     {[
                       { icon: Search, label: "Scanning DNS" },
                       { icon: Palette, label: "Forging Brand" },
                       { icon: Layers, label: "Scaffolding" },
                       { icon: Zap, label: "Motion Sync" }
                     ].map((item, i) => (
                       <motion.div 
                         key={i}
                         initial={{ opacity: 0, y: 20 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ delay: i * 0.8 }}
                         className="flex flex-col items-center gap-4"
                       >
                         <div className="w-16 h-16 rounded-3xl border border-white/5 liquid-glass flex items-center justify-center">
                            <item.icon size={28} className="text-white/40" />
                         </div>
                         <span className="text-[10px] uppercase tracking-widest font-bold opacity-30">{item.label}</span>
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
