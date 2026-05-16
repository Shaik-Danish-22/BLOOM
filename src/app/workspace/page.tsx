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
  Rocket,
  Wand2,
  Cpu,
  Shield,
  Layers,
  CheckCircle2,
  Target,
  AlertTriangle,
  Brain,
  Network,
  BarChart3,
  Bot
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { enhancePrompt } from "@/ai/flows/enhance-prompt";
import { generateOracleInvestorScore } from "@/ai/flows/generate-oracle-investor-score";
import { BackgroundEffects } from "@/components/cinematic/BackgroundEffects";
import { OracleGauge } from "@/components/cinematic/OracleGauge";
import { DESIGN_SYSTEMS, DesignSystemId } from "@/lib/design-systems";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { InteractiveRobotSpline } from "@/components/ui/interactive-3d-robot";
import SilkShader from "@/components/ui/silk-shader";

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
        companyName: enhancedData?.suggestedName || "Startup",
        tagline: enhancedData?.coreConcept || "Neural Project",
        valueProposition: enhancedData?.professionalBrief || "",
        marketCategory: enhancedData?.suggestedVibe
      });
      setOracleData(data);
      setStep('research');
    } catch (e) {
      setStep('mode-selection');
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-white/20 overflow-hidden font-body">
      <BackgroundEffects />
      <SilkShader />

      {/* HEADER */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center backdrop-blur-md border-b border-white/5 bg-black/40">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
            <span className="text-black font-bold">S</span>
          </div>
          <span className="text-lg font-headline italic tracking-tight">FounderOS Workspace</span>
        </div>
        <div className="flex items-center gap-4">
           <Button variant="ghost" onClick={() => { localStorage.removeItem("siteforge_dummy_user"); router.push('/'); }} className="text-white/40 hover:text-white text-xs font-bold uppercase tracking-widest">
             End Session
           </Button>
           <div className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center relative">
              <div className="absolute inset-0 bg-white/20 blur-xl animate-pulse" />
              <Zap size={18} className="text-white relative z-10" />
           </div>
        </div>
      </nav>

      <main className="pt-32 px-6 max-w-7xl mx-auto h-[calc(100vh-80px)] overflow-y-auto scrollbar-hide pb-20">
        <AnimatePresence mode="wait">
          {step === 'prompt' && (
            <motion.div 
              key="prompt"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center justify-center min-h-[70vh] text-center max-w-3xl mx-auto relative"
            >
              <h2 className="text-6xl md:text-8xl font-headline italic mb-12 tracking-tighter">What are we <br /><em className="not-italic text-white/10">building</em> today?</h2>
              
              <div className="w-full relative group">
                <div className="absolute -inset-1 bg-white/5 blur-2xl group-hover:bg-white/10 transition-all rounded-[40px]" />
                
                <div className="relative">
                  <Textarea 
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe your vision in vague or specific terms..."
                    className="relative w-full min-h-[220px] bg-black/40 border-white/10 rounded-[40px] p-10 text-xl focus:ring-1 focus:ring-white/20 transition-all backdrop-blur-3xl pr-40"
                  />
                  
                  {/* SISSOR ASSISTANT - POSITIONED BOTTOM RIGHT NEAR TEXTAREA */}
                  <div className="absolute bottom-6 right-6 flex flex-col items-end pointer-events-none z-20">
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-white/10 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-2xl mb-2 flex items-center gap-2 pointer-events-auto shadow-2xl"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-[10px] uppercase tracking-widest font-bold text-white/80">Hi, I'm SISSOR</span>
                    </motion.div>
                    
                    <div className="w-32 h-32 overflow-hidden rounded-3xl pointer-events-auto cursor-grab active:cursor-grabbing">
                      <InteractiveRobotSpline 
                        scene="https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode" 
                        className="w-full h-full scale-[2.2] translate-y-2" 
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-start mt-6 pl-4">
                  <Button 
                    onClick={handleEnhance}
                    disabled={!prompt.trim()}
                    className="bg-white text-black hover:bg-white/90 rounded-full px-10 h-16 flex items-center gap-3 font-bold uppercase tracking-widest shadow-2xl transition-transform active:scale-95"
                  >
                    <Wand2 size={20} /> Neural Enhance
                  </Button>
                </div>
              </div>
              
              <div className="mt-12 flex gap-8">
                 {[
                   { icon: Brain, label: "Intelligence" },
                   { icon: Cpu, label: "Orchestration" },
                   { icon: Network, label: "Neural Net" }
                 ].map((item, i) => (
                   <div key={i} className="flex items-center gap-3 opacity-20">
                     <item.icon size={14} />
                     <span className="text-[10px] uppercase tracking-[0.3em] font-bold">{item.label}</span>
                   </div>
                 ))}
              </div>
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
              <div className="w-48 h-48 mb-12 overflow-hidden rounded-full border border-white/10 bg-white/5">
                 <InteractiveRobotSpline 
                   scene="https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode" 
                   className="w-full h-full scale-[1.5] translate-y-6" 
                 />
              </div>
              <h3 className="text-4xl font-headline italic text-white mb-4">Enhancing Neural Link...</h3>
              <p className="text-white/20 uppercase tracking-[0.5em] text-[10px] font-bold animate-pulse">Deriving Strategic DNA and Visual Scaffolding</p>
            </motion.div>
          )}

          {step === 'refine' && (
            <motion.div 
              key="refine"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="max-w-5xl mx-auto py-12"
            >
              <header className="mb-16 flex justify-between items-end">
                <div className="space-y-2">
                  <Badge className="bg-white/10 text-white/60 border-none px-4 py-1.5 rounded-full">ENHANCED BRIEF</Badge>
                  <h2 className="text-5xl font-headline italic">Neural Brief V1.0</h2>
                  <p className="text-white/40 italic">Review and refine the AI's derivation of your vision.</p>
                </div>
                <div className="flex gap-4">
                  <Button variant="ghost" onClick={() => setStep('prompt')} className="text-white/20 hover:text-white">Retry</Button>
                  <Button onClick={() => setStep('mode-selection')} className="bg-white text-black rounded-full px-10 h-14 font-bold uppercase tracking-widest shadow-xl">
                    Materialize <ArrowRight size={18} className="ml-2" />
                  </Button>
                </div>
              </header>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2 bg-white/5 border-white/10 p-10 rounded-[48px] relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.02] blur-[100px] rounded-full" />
                   <h4 className="text-[10px] uppercase tracking-widest font-bold text-white/20 mb-8 flex items-center gap-2">
                      <Target size={12} /> Positioning Strategy
                   </h4>
                   <Textarea 
                     value={enhancedData?.professionalBrief}
                     onChange={(e) => setEnhancedData({...enhancedData, professionalBrief: e.target.value})}
                     className="bg-transparent border-none p-0 text-2xl leading-relaxed italic text-white/70 resize-none min-h-[400px] focus-visible:ring-0 scrollbar-hide"
                   />
                </Card>

                <div className="space-y-6">
                   <Card className="bg-white/5 border-white/10 p-10 rounded-[40px]">
                      <h4 className="text-[10px] uppercase tracking-widest font-bold text-white/20 mb-6 flex items-center gap-2">
                        <Palette size={12} /> Derived DNA
                      </h4>
                      <div className="space-y-8">
                         <div>
                            <p className="text-[9px] uppercase tracking-widest text-white/10 mb-2">Aesthetic</p>
                            <p className="text-xl font-headline italic text-white/80">{enhancedData?.designDNA?.mood}</p>
                         </div>
                         <div>
                            <p className="text-[9px] uppercase tracking-widest text-white/10 mb-2">Typography</p>
                            <p className="text-xl font-headline italic text-white/80">{enhancedData?.designDNA?.typographyIdentity}</p>
                         </div>
                         <div>
                            <p className="text-[9px] uppercase tracking-widest text-white/10 mb-2">Motion</p>
                            <p className="text-xl font-headline italic text-white/80">{enhancedData?.designDNA?.motionPhilosophy}</p>
                         </div>
                      </div>
                   </Card>
                   
                   <Card className="bg-white/5 border-white/10 p-10 rounded-[40px]">
                      <h4 className="text-[10px] uppercase tracking-widest font-bold text-white/20 mb-6">Clarification Nodes</h4>
                      <ul className="space-y-4">
                         {enhancedData?.followUpQuestions.slice(0, 3).map((q: string, i: number) => (
                           <li key={i} className="text-xs text-white/30 italic flex gap-4">
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
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="min-h-[70vh] flex flex-col justify-center max-w-6xl mx-auto"
            >
              <h2 className="text-7xl md:text-8xl font-headline italic text-center mb-24 leading-none tracking-tighter">Choose your <br /> <em className="not-italic text-white/10">Trajectory.</em></h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                 <div 
                   onClick={handleStartResearch}
                   className="relative group p-16 rounded-[64px] border border-white/5 bg-white/[0.02] flex flex-col items-center text-center cursor-pointer hover:border-white/20 transition-all hover:scale-[1.02]"
                 >
                    <div className="absolute inset-0 bg-white/[0.01] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="w-24 h-24 rounded-[32px] bg-white/5 border border-white/10 flex items-center justify-center mb-10 group-hover:bg-white group-hover:text-black transition-all duration-700">
                       <BarChart3 size={40} />
                    </div>
                    <h4 className="text-5xl font-bold mb-6 tracking-tight">RESEARCH</h4>
                    <p className="text-white/30 leading-relaxed max-w-xs italic text-lg">
                      Strategic moats, market analytics, and investment readiness scores.
                    </p>
                    <Badge variant="outline" className="mt-12 border-white/10 text-[10px] tracking-[0.4em] py-2 px-8">FOUNDEROS ORACLE</Badge>
                 </div>

                 <div 
                   onClick={() => setStep('design-systems')}
                   className="relative group p-16 rounded-[64px] border border-white/5 bg-white flex flex-col items-center text-center cursor-pointer hover:scale-[1.02] transition-all text-black"
                 >
                    <div className="w-24 h-24 rounded-[32px] bg-black/5 border border-black/10 flex items-center justify-center mb-10 group-hover:bg-black group-hover:text-white transition-all duration-700">
                       <Layers size={40} />
                    </div>
                    <h4 className="text-5xl font-bold mb-6 tracking-tight">EXECUTION</h4>
                    <p className="text-black/50 leading-relaxed max-w-xs italic text-lg">
                      Materialize the design DNA into a high-fidelity startup experience.
                    </p>
                    <Badge variant="outline" className="mt-12 border-black/10 text-[10px] tracking-[0.4em] text-black/40 py-2 px-8">THE FORGE STUDIO</Badge>
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
                  <div className="lg:col-span-2 space-y-24">
                    <section className="space-y-10">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center relative">
                          <Target size={24} className="text-white relative z-10" />
                          <div className="absolute inset-0 bg-white/10 blur-xl animate-pulse rounded-full" />
                        </div>
                        <h3 className="text-4xl font-headline italic">Strategic Intelligence Report</h3>
                      </div>
                      
                      <Card className="bg-white/5 border-white/10 p-16 rounded-[56px] relative overflow-hidden">
                        <div className="absolute -top-20 -right-20 w-96 h-96 bg-white/[0.02] blur-[120px] rounded-full" />
                        <p className="text-4xl font-light italic text-white/80 leading-[1.4] mb-16 border-b border-white/5 pb-16">
                          "{oracleData?.verdict}"
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                           <div className="space-y-8">
                             <h5 className="text-[11px] uppercase tracking-[0.4em] font-bold text-white/20">Critical Market Risks</h5>
                             <div className="space-y-6">
                                {oracleData?.marketRisks.map((risk: string, i: number) => (
                                  <div key={i} className="flex gap-6 items-start text-base text-white/40 italic">
                                     <AlertTriangle size={20} className="text-white/20 shrink-0 mt-1" />
                                     {risk}
                                  </div>
                                ))}
                             </div>
                           </div>
                           <div className="space-y-8">
                             <h5 className="text-[11px] uppercase tracking-[0.4em] font-bold text-white/20">Identified Moats</h5>
                             <div className="space-y-6">
                                {oracleData?.strategicMoats.map((moat: string, i: number) => (
                                  <div key={i} className="flex gap-6 items-start text-base text-white/80 italic">
                                     <CheckCircle2 size={20} className="text-white/40 shrink-0 mt-1" />
                                     {moat}
                                  </div>
                                ))}
                             </div>
                           </div>
                        </div>
                      </Card>
                    </section>

                    <section className="space-y-10">
                       <h5 className="text-[11px] uppercase tracking-[0.4em] font-bold text-white/20">Neural Scoring Metrics</h5>
                       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                          {oracleData?.subScores.map((s: any, i: number) => (
                            <div key={i} className="p-12 rounded-[48px] border border-white/5 bg-white/[0.02] flex flex-col justify-between h-56 group hover:border-white/20 transition-all hover:bg-white/[0.04]">
                               <h5 className="text-[11px] uppercase tracking-[0.3em] font-bold text-white/20">{s.category}</h5>
                               <span className="text-7xl font-headline text-white/40 group-hover:text-white transition-colors">{s.score}</span>
                            </div>
                          ))}
                       </div>
                    </section>
                  </div>

                  <div className="flex flex-col items-center justify-center p-16 rounded-[64px] border border-white/10 bg-white/[0.02] backdrop-blur-3xl sticky top-32 h-fit">
                     <OracleGauge targetScore={oracleData?.score || 85} />
                     <div className="mt-20 text-center space-y-8 w-full">
                        <p className="text-[10px] uppercase tracking-[0.6em] font-bold text-white/20">Readiness Score</p>
                        <Badge className="bg-white/10 text-white px-10 py-4 border-none text-[12px] tracking-[0.3em] font-bold rounded-full">FOUNDEROS VERIFIED</Badge>
                        <Button onClick={() => setStep('design-systems')} className="w-full bg-white text-black rounded-full h-24 text-xl font-bold uppercase tracking-widest shadow-[0_0_80px_rgba(255,255,255,0.1)] hover:scale-[1.02] transition-all">
                          Proceed to Forge
                        </Button>
                     </div>
                  </div>
               </div>
            </motion.div>
          )}

          {step === 'design-systems' && (
            <motion.div key="design-select" className="py-12 max-w-6xl mx-auto pb-32">
               <h2 className="text-7xl font-headline italic text-center mb-24 leading-none tracking-tighter">Select your <br /> <em className="not-italic text-white/10">Design DNA.</em></h2>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-24">
                  {Object.values(DESIGN_SYSTEMS).map((sys) => (
                    <div 
                      key={sys.id}
                      onClick={() => setSelectedSystem(sys.id)}
                      className={`relative overflow-hidden rounded-[64px] border transition-all cursor-pointer p-14 group ${
                        selectedSystem === sys.id ? 'border-white scale-105 bg-white/5' : 'border-white/5 opacity-40 hover:opacity-100 hover:bg-white/[0.02]'
                      }`}
                    >
                       <div className="flex justify-between items-start mb-12">
                         <div className="w-16 h-16 rounded-3xl border border-white/10 flex items-center justify-center bg-white/5">
                            <Layers size={28} className={selectedSystem === sys.id ? 'text-white' : 'text-white/20'} />
                         </div>
                         {selectedSystem === sys.id && <motion.div layoutId="sys-check" className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-2xl"><CheckCircle2 size={22} className="text-black" /></motion.div>}
                       </div>
                       <h4 className="text-3xl font-bold mb-4 tracking-tight">{sys.name}</h4>
                       <p className="text-sm text-white/30 leading-relaxed italic mb-10">{sys.description}</p>
                       <div className="flex flex-wrap gap-2">
                          {sys.principles.map((p, i) => <Badge key={i} className="bg-white/5 text-[10px] border-none text-white/30 uppercase px-4 py-1.5 font-bold">{p}</Badge>)}
                       </div>
                    </div>
                  ))}
               </div>
               <div className="flex justify-center">
                  <Button onClick={() => router.push('/generate')} className="bg-white text-black rounded-full px-32 h-24 text-2xl font-bold uppercase tracking-[0.2em] shadow-[0_0_100px_rgba(255,255,255,0.2)] hover:scale-105 transition-all">
                    Materialize Vision
                  </Button>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
