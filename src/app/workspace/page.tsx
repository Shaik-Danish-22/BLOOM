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
  Bot,
  MousePointer2
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
import ShaderBackground from "@/components/ui/shader-background";

type Step = 'prompt' | 'enhancing' | 'refine' | 'mode-selection' | 'research' | 'design-systems' | 'materializing';

const SCISSOR_SCENE = "https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode";

const SCISSOR_TALKS = [
  "Neural link active.",
  "Agents are ready.",
  "Nodes online.",
  "Bento grid ready.",
  "Luxury enabled.",
  "Scanning nodes.",
  "DNA derived."
];

export default function WorkspacePage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('prompt');
  const [prompt, setPrompt] = useState("");
  const [enhancedData, setEnhancedData] = useState<any>(null);
  const [oracleData, setOracleData] = useState<any>(null);
  const [selectedSystem, setSelectedSystem] = useState<DesignSystemId>('agentic');
  const [currentTalk, setCurrentTalk] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTalk(prev => (prev + 1) % SCISSOR_TALKS.length);
    }, 9000);
    return () => clearInterval(timer);
  }, []);

  const handleEnhance = async () => {
    if (!prompt.trim()) return;
    setStep('enhancing');
    try {
      const data = await enhancePrompt({ rawPrompt: prompt });
      setEnhancedData(data);
      setStep('refine');
    } catch (e) {
      console.error("Enhance failed", e);
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
        marketCategory: enhancedData?.designDNA?.mood
      });
      setOracleData(data);
      setStep('research');
    } catch (e) {
      setStep('mode-selection');
    }
  };

  const handleMaterializeClick = () => {
    const sessionContext = {
      prompt,
      enhancedData,
      oracleData,
      selectedSystem
    };
    localStorage.setItem("materialization_context", JSON.stringify(sessionContext));
    router.push('/generate');
  };

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-white/20 overflow-hidden font-body">
      <BackgroundEffects />
      <ShaderBackground />

      <nav className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center backdrop-blur-md border-b border-white/5 bg-black/40">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
            <span className="text-black font-bold text-sm">F</span>
          </div>
          <span className="text-lg font-headline italic tracking-tight text-white/90">FounderOS Workspace</span>
        </div>
        <div className="flex items-center gap-6">
           <button onClick={() => router.push('/')} className="text-white/40 hover:text-white text-[10px] font-bold uppercase tracking-[0.3em] transition-colors">
             End Session
           </button>
           <div className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center relative">
              <div className="absolute inset-0 bg-white/20 blur-xl animate-pulse" />
              <Zap size={18} className="text-white relative z-10" />
           </div>
        </div>
      </nav>

      <main className="pt-24 px-6 max-w-7xl mx-auto h-[calc(100vh-80px)] overflow-y-auto no-scrollbar pb-20">
        <AnimatePresence mode="wait">
          {step === 'prompt' && (
            <motion.div 
              key="prompt"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="flex flex-col min-h-[70vh] relative pt-12"
            >
              <div className="mb-8 text-left max-w-4xl relative z-30">
                <h2 className="text-6xl md:text-8xl font-headline italic tracking-tighter leading-tight mb-4 text-white/95">
                  What are we <br />
                  <em className="not-italic text-white/5 italic">materializing?</em>
                </h2>
                <p className="text-white/20 uppercase tracking-[0.6em] text-[11px] font-bold">Neural Link v2.5 Online</p>
              </div>
              
              <div className="w-full relative max-w-5xl">
                <div className="absolute -inset-1 bg-white/5 blur-2xl rounded-[48px]" />
                
                <div className="relative overflow-hidden rounded-[48px] bg-black/40 border border-white/10 backdrop-blur-3xl min-h-[420px]">
                  <Textarea 
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe your vision (e.g., Luxury AI coffee for developers)..."
                    className="w-full min-h-[420px] bg-transparent border-none p-12 text-2xl focus:ring-0 focus-visible:ring-0 transition-all pr-[300px] no-scrollbar"
                  />
                  
                  <div className="absolute bottom-6 right-6 flex flex-col items-end pointer-events-none z-20">
                    <AnimatePresence mode="wait">
                      <motion.div 
                        key={currentTalk}
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="bg-white/10 backdrop-blur-3xl border border-white/10 px-6 py-3 rounded-2xl mb-4 flex items-center gap-3 pointer-events-auto shadow-2xl relative max-w-[280px]"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shrink-0" />
                        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/90 leading-tight">
                          {SCISSOR_TALKS[currentTalk]}
                        </span>
                        <div className="absolute -bottom-1 right-8 w-3 h-3 bg-white/10 border-r border-b border-white/10 rotate-45" />
                      </motion.div>
                    </AnimatePresence>
                    
                    <div className="w-64 h-80 overflow-hidden relative flex items-center justify-center pointer-events-auto">
                      <div className="absolute inset-0 h-full w-full">
                        <InteractiveRobotSpline 
                          scene={SCISSOR_SCENE} 
                          className="w-full h-full scale-[1.6] translate-y-12" 
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-10 flex justify-start pl-6">
                  <Button 
                    onClick={handleEnhance}
                    disabled={!prompt.trim() || step === 'enhancing'}
                    className="bg-white text-black hover:bg-white/90 rounded-full px-16 h-20 flex items-center gap-4 font-bold uppercase tracking-[0.2em] shadow-[0_0_80px_rgba(255,255,255,0.2)] transition-all active:scale-95 hover:scale-105"
                  >
                    <Wand2 size={24} /> Neural Enhance
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {step === 'enhancing' && (
            <motion.div 
              key="enhancing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center h-full min-h-[60vh] text-center"
            >
              <div className="w-80 h-96 mb-12 pointer-events-none relative overflow-hidden flex items-center justify-center">
                 <div className="absolute inset-0 h-full w-full">
                   <InteractiveRobotSpline 
                     scene={SCISSOR_SCENE} 
                     className="w-full h-full scale-[1.8] translate-y-16" 
                   />
                 </div>
              </div>
              <h3 className="text-6xl font-headline italic text-white mb-6">Deriving Design DNA...</h3>
              <p className="text-white/20 uppercase tracking-[0.8em] text-[12px] font-bold animate-pulse">Positioning Neural Nodes & Visual Scaffolding</p>
            </motion.div>
          )}

          {step === 'refine' && (
            <motion.div 
              key="refine"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="max-w-6xl mx-auto py-12"
            >
              <header className="mb-24 flex justify-between items-end">
                <div className="space-y-6">
                  <Badge className="bg-white/10 text-white/60 border-none px-6 py-2.5 rounded-full text-[11px] tracking-[0.4em] uppercase">Neural Identity v1.0</Badge>
                  <h2 className="text-7xl font-headline italic leading-none">The Strategy Core.</h2>
                  <p className="text-white/40 italic text-xl">Review the derived DNA before materialization.</p>
                </div>
                <div className="flex gap-6">
                  <Button variant="ghost" onClick={() => setStep('prompt')} className="text-white/20 hover:text-white transition-colors h-16 px-10 border border-white/5 rounded-2xl">Retry Link</Button>
                  <Button onClick={() => setStep('mode-selection')} className="bg-white text-black rounded-full px-16 h-16 font-bold uppercase tracking-widest shadow-2xl transition-all active:scale-95 hover:scale-105">
                    Continue <ArrowRight size={20} className="ml-4" />
                  </Button>
                </div>
              </header>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <Card className="lg:col-span-2 bg-white/5 border-white/10 p-16 rounded-[64px] relative overflow-hidden shadow-2xl group">
                   <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/[0.03] blur-[150px] rounded-full group-hover:bg-white/[0.05] transition-all" />
                   <h4 className="text-[11px] uppercase tracking-[0.5em] font-bold text-white/20 mb-12 flex items-center gap-3">
                      <Target size={18} /> Strategic Brief
                   </h4>
                   <Textarea 
                     value={enhancedData?.professionalBrief}
                     onChange={(e) => setEnhancedData({...enhancedData, professionalBrief: e.target.value})}
                     className="bg-transparent border-none p-0 text-4xl leading-[1.3] italic text-white/80 resize-none min-h-[500px] focus-visible:ring-0 no-scrollbar"
                   />
                </Card>

                <div className="space-y-10">
                   <Card className="bg-white/5 border-white/10 p-12 rounded-[56px] shadow-xl">
                      <h4 className="text-[11px] uppercase tracking-[0.5em] font-bold text-white/20 mb-10 flex items-center gap-3">
                        <Palette size={18} /> Design DNA
                      </h4>
                      <div className="space-y-12">
                         <div>
                            <p className="text-[10px] uppercase tracking-[0.3em] text-white/10 mb-4">Mood</p>
                            <p className="text-3xl font-headline italic text-white/90">{enhancedData?.designDNA?.mood}</p>
                         </div>
                         <div>
                            <p className="text-[10px] uppercase tracking-[0.3em] text-white/10 mb-4">Motion</p>
                            <p className="text-3xl font-headline italic text-white/90">{enhancedData?.designDNA?.motionPhilosophy}</p>
                         </div>
                         <div>
                            <p className="text-[10px] uppercase tracking-[0.3em] text-white/10 mb-4">Interaction</p>
                            <p className="text-3xl font-headline italic text-white/90">{enhancedData?.designDNA?.interactionStyle}</p>
                         </div>
                      </div>
                   </Card>
                   
                   <Card className="bg-white/5 border-white/10 p-12 rounded-[56px] shadow-xl">
                      <h4 className="text-[11px] uppercase tracking-[0.5em] font-bold text-white/20 mb-10">Refinement Nodes</h4>
                      <ul className="space-y-6">
                         {enhancedData?.followUpQuestions.slice(0, 3).map((q: string, i: number) => (
                           <li key={i} className="text-[15px] text-white/30 italic flex gap-6 leading-relaxed group cursor-default">
                             <div className="w-2 h-2 rounded-full bg-white/10 mt-2 shrink-0 group-hover:bg-white transition-colors" />
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
              <h2 className="text-8xl md:text-[12rem] font-headline italic text-center mb-32 leading-none tracking-tighter">Choose your <br /> <em className="not-italic text-white/10">Trajectory.</em></h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                 <div 
                   onClick={handleStartResearch}
                   className="relative group p-20 rounded-[80px] border border-white/5 bg-white/[0.02] flex flex-col items-center text-center cursor-pointer hover:border-white/20 transition-all hover:scale-[1.03] shadow-2xl"
                 >
                    <div className="absolute inset-0 bg-white/[0.01] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="w-32 h-32 rounded-[48px] bg-white/5 border border-white/10 flex items-center justify-center mb-16 group-hover:bg-white group-hover:text-black transition-all duration-700">
                       <BarChart3 size={56} />
                    </div>
                    <h4 className="text-7xl font-bold mb-10 tracking-tight">THE ORACLE</h4>
                    <p className="text-white/30 leading-relaxed max-w-md italic text-2xl">
                      Market risks, strategic moats, and investor viability analysis.
                    </p>
                    <Badge variant="outline" className="mt-20 border-white/10 text-[12px] tracking-[0.6em] py-4 px-12">FOUNDEROS REPORT</Badge>
                 </div>

                 <div 
                   onClick={() => setStep('design-systems')}
                   className="relative group p-20 rounded-[80px] border border-white/5 bg-white flex flex-col items-center text-center cursor-pointer hover:scale-[1.03] transition-all text-black shadow-[0_0_120px_rgba(255,255,255,0.15)]"
                 >
                    <div className="w-32 h-32 rounded-[48px] bg-black/5 border border-black/10 flex items-center justify-center mb-16 group-hover:bg-black group-hover:text-white transition-all duration-700">
                       <Layers size={56} />
                    </div>
                    <h4 className="text-7xl font-bold mb-10 tracking-tight">THE FORGE</h4>
                    <p className="text-black/50 leading-relaxed max-w-md italic text-2xl">
                      Materialize high-fidelity UI systems from your Design DNA.
                    </p>
                    <Badge variant="outline" className="mt-20 border-black/10 text-[12px] tracking-[0.6em] text-black/40 py-4 px-12">FOUNDEROS STUDIO</Badge>
                 </div>
              </div>
            </motion.div>
          )}

          {step === 'research' && (
            <motion.div key="oracle-view" className="py-12 pb-40">
               <Button variant="ghost" onClick={() => setStep('mode-selection')} className="mb-20 text-white/20 hover:text-white transition-colors h-16 px-10 border border-white/5 rounded-2xl">
                 <ChevronLeft className="mr-4" /> Return to Trajectory
               </Button>
               
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-24">
                  <div className="lg:col-span-2 space-y-40">
                    <section className="space-y-16">
                      <div className="flex items-center gap-8">
                        <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center relative">
                          <Target size={32} className="text-white relative z-10" />
                          <div className="absolute inset-0 bg-white/10 blur-2xl animate-pulse rounded-full" />
                        </div>
                        <h3 className="text-6xl font-headline italic">Intelligence Verdict</h3>
                      </div>
                      
                      <Card className="bg-white/5 border-white/10 p-20 rounded-[80px] relative overflow-hidden shadow-2xl">
                        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-white/[0.02] blur-[150px] rounded-full" />
                        <p className="text-6xl font-light italic text-white/80 leading-[1.2] mb-24 border-b border-white/5 pb-24">
                          "{oracleData?.verdict}"
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
                           <div className="space-y-12">
                             <h5 className="text-[13px] uppercase tracking-[0.6em] font-bold text-white/20">Critical Risks</h5>
                             <div className="space-y-10">
                                {oracleData?.marketRisks.map((risk: string, i: number) => (
                                  <div key={i} className="flex gap-10 items-start text-xl text-white/40 italic leading-relaxed">
                                     <AlertTriangle size={24} className="text-white/20 shrink-0 mt-1" />
                                     {risk}
                                  </div>
                                ))}
                             </div>
                           </div>
                           <div className="space-y-12">
                             <h5 className="text-[13px] uppercase tracking-[0.6em] font-bold text-white/20">Strategic Moats</h5>
                             <div className="space-y-10">
                                {oracleData?.strategicMoats.map((moat: string, i: number) => (
                                  <div key={i} className="flex gap-10 items-start text-xl text-white/80 italic leading-relaxed">
                                     <CheckCircle2 size={24} className="text-white/40 shrink-0 mt-1" />
                                     {moat}
                                  </div>
                                ))}
                             </div>
                           </div>
                        </div>
                      </Card>
                    </section>

                    <section className="space-y-20">
                       <h5 className="text-[13px] uppercase tracking-[0.6em] font-bold text-white/20">Neural Scoring Metrics</h5>
                       <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                          {oracleData?.viabilityMetrics.map((s: any, i: number) => (
                            <div key={i} className="p-16 rounded-[64px] border border-white/5 bg-white/[0.02] flex flex-col justify-between h-72 group hover:border-white/20 transition-all hover:bg-white/[0.04] shadow-xl">
                               <h5 className="text-[12px] uppercase tracking-[0.5em] font-bold text-white/20">{s.category}</h5>
                               <span className="text-9xl font-headline text-white/40 group-hover:text-white transition-colors">{s.score}</span>
                            </div>
                          ))}
                       </div>
                    </section>
                  </div>

                  <div className="flex flex-col items-center justify-center p-20 rounded-[80px] border border-white/10 bg-white/[0.02] backdrop-blur-3xl sticky top-40 h-fit shadow-2xl">
                     <OracleGauge targetScore={oracleData?.score || 85} />
                     <div className="mt-32 text-center space-y-12 w-full">
                        <p className="text-[12px] uppercase tracking-[0.8em] font-bold text-white/20">Startup Readiness</p>
                        <Badge className="bg-white/10 text-white px-16 py-6 border-none text-[14px] tracking-[0.5em] font-bold rounded-full">FOUNDEROS VERIFIED</Badge>
                        <Button onClick={() => setStep('design-systems')} className="w-full bg-white text-black rounded-full h-28 text-2xl font-bold uppercase tracking-[0.2em] shadow-[0_0_120px_rgba(255,255,255,0.2)] hover:scale-[1.02] transition-all active:scale-95">
                          Forge Studio
                        </Button>
                     </div>
                  </div>
               </div>
            </motion.div>
          )}

          {step === 'design-systems' && (
            <motion.div key="design-select" className="py-12 max-w-7xl mx-auto pb-40">
               <h2 className="text-9xl md:text-[14rem] font-headline italic text-center mb-32 leading-none tracking-tighter">Direct the <br /> <em className="not-italic text-white/10">Neural Forge.</em></h2>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-40">
                  {Object.values(DESIGN_SYSTEMS).map((sys) => (
                    <div 
                      key={sys.id}
                      onClick={() => setSelectedSystem(sys.id)}
                      className={`relative overflow-hidden rounded-[80px] border transition-all cursor-pointer p-20 group ${
                        selectedSystem === sys.id ? 'border-white scale-105 bg-white/5 shadow-2xl' : 'border-white/5 opacity-40 hover:opacity-100 hover:bg-white/[0.02]'
                      }`}
                    >
                       <div className="flex justify-between items-start mb-20">
                         <div className="w-24 h-24 rounded-[40px] border border-white/10 flex items-center justify-center bg-white/5">
                            <Layers size={40} className={selectedSystem === sys.id ? 'text-white' : 'text-white/20'} />
                         </div>
                         {selectedSystem === sys.id && (
                           <motion.div 
                             layoutId="sys-check" 
                             className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl"
                           >
                             <CheckCircle2 size={32} className="text-black" />
                           </motion.div>
                         )}
                       </div>
                       <h4 className="text-5xl font-bold mb-8 tracking-tight">{sys.name}</h4>
                       <p className="text-xl text-white/30 leading-relaxed italic mb-16">{sys.description}</p>
                       <div className="flex flex-wrap gap-4">
                          {sys.principles.map((p, i) => (
                            <Badge key={i} className="bg-white/5 text-[12px] border-none text-white/30 uppercase px-6 py-3 font-bold tracking-[0.2em]">
                              {p}
                            </Badge>
                          ))}
                       </div>
                    </div>
                  ))}
               </div>
               <div className="flex justify-center">
                  <Button onClick={handleMaterializeClick} className="bg-white text-black rounded-full px-48 h-32 text-4xl font-bold uppercase tracking-[0.4em] shadow-[0_0_150px_rgba(255,255,255,0.3)] hover:scale-105 transition-all active:scale-95">
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
