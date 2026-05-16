
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

const SISSOR_SCENE = "https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode";

const SISSOR_TALKS = [
  "Hi, I'm SISSOR. Let's materialize.",
  "Trends: AI Agents are the new 'SaaS'.",
  "Insight: Minimalism + High Motion = Digital Luxury.",
  "Neural interfaces are disrupting the web as we know it.",
  "Bento grids are evolving into fluid, organic nodes.",
  "Cinematic storytelling is the next conversion goldmine.",
  "Tip: High-contrast obsidian builds instant authority.",
  "Fact: Remote devs prioritize 'High-Density' info layouts."
];

export default function WorkspacePage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('prompt');
  const [prompt, setPrompt] = useState("");
  const [enhancedData, setEnhancedData] = useState<any>(null);
  const [oracleData, setOracleData] = useState<any>(null);
  const [selectedSystem, setSelectedSystem] = useState<DesignSystemId>('minimal');
  const [currentTalk, setCurrentTalk] = useState(0);

  useEffect(() => {
    const isMockAuth = localStorage.getItem("siteforge_dummy_user");
    if (!isMockAuth) router.push('/');
  }, [router]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTalk(prev => (prev + 1) % SISSOR_TALKS.length);
    }, 8000);
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
           <Button variant="ghost" onClick={() => { localStorage.removeItem("siteforge_dummy_user"); router.push('/'); }} className="text-white/40 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors">
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
                    className="relative w-full min-h-[240px] bg-black/40 border-white/10 rounded-[40px] p-10 text-xl focus:ring-1 focus:ring-white/20 transition-all backdrop-blur-3xl pr-20 scrollbar-hide"
                  />
                  
                  {/* SISSOR ASSISTANT - REPOSITIONED AND REFINED */}
                  <div className="absolute -bottom-10 -right-20 flex flex-col items-end pointer-events-none z-20">
                    <AnimatePresence mode="wait">
                      <motion.div 
                        key={currentTalk}
                        initial={{ opacity: 0, x: 20, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 20, y: -10, scale: 0.9 }}
                        className="bg-white/10 backdrop-blur-3xl border border-white/10 px-8 py-5 rounded-[32px] mb-16 flex items-center gap-4 pointer-events-auto shadow-2xl relative min-w-[240px] translate-x-24"
                      >
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shrink-0" />
                        <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-white/90 leading-relaxed whitespace-nowrap">
                          {SISSOR_TALKS[currentTalk]}
                        </span>
                        <div className="absolute -bottom-2 left-10 w-5 h-5 bg-white/10 border-r border-b border-white/10 rotate-45" />
                      </motion.div>
                    </AnimatePresence>
                    
                    <div className="w-80 h-80 pointer-events-auto cursor-grab active:cursor-grabbing relative overflow-hidden rounded-[80px]">
                      <InteractiveRobotSpline 
                        scene={SISSOR_SCENE} 
                        className="w-full h-full scale-[1.3] translate-y-4" 
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-start mt-8 pl-4">
                  <Button 
                    onClick={handleEnhance}
                    disabled={!prompt.trim()}
                    className="bg-white text-black hover:bg-white/90 rounded-full px-14 h-16 flex items-center gap-4 font-bold uppercase tracking-widest shadow-[0_0_60px_rgba(255,255,255,0.25)] transition-all active:scale-95 hover:scale-105"
                  >
                    <Wand2 size={20} /> Neural Enhance
                  </Button>
                </div>
              </div>
              
              <div className="mt-20 flex gap-12">
                 {[
                   { icon: Brain, label: "Intelligence" },
                   { icon: Cpu, label: "Orchestration" },
                   { icon: Network, label: "Neural Net" }
                 ].map((item, i) => (
                   <div key={i} className="flex items-center gap-3 opacity-20 hover:opacity-100 transition-all cursor-default scale-110">
                     <item.icon size={16} />
                     <span className="text-[10px] uppercase tracking-[0.4em] font-bold">{item.label}</span>
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
              <div className="w-80 h-80 mb-12 pointer-events-none relative overflow-hidden rounded-full">
                 <InteractiveRobotSpline 
                   scene={SISSOR_SCENE} 
                   className="w-full h-full scale-[1.3] translate-y-4" 
                 />
              </div>
              <h3 className="text-5xl font-headline italic text-white mb-6">Enhancing Neural Link...</h3>
              <p className="text-white/20 uppercase tracking-[0.6em] text-[11px] font-bold animate-pulse">Deriving Strategic DNA and Visual Scaffolding</p>
            </motion.div>
          )}

          {step === 'refine' && (
            <motion.div 
              key="refine"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="max-w-5xl mx-auto py-12"
            >
              <header className="mb-20 flex justify-between items-end">
                <div className="space-y-4">
                  <Badge className="bg-white/10 text-white/60 border-none px-5 py-2 rounded-full text-[10px] tracking-widest uppercase">ENHANCED BRIEF</Badge>
                  <h2 className="text-6xl font-headline italic leading-none">Neural Brief V1.0</h2>
                  <p className="text-white/40 italic text-lg">Review and refine the AI's derivation of your vision.</p>
                </div>
                <div className="flex gap-4">
                  <Button variant="ghost" onClick={() => setStep('prompt')} className="text-white/20 hover:text-white transition-colors h-14 px-8">Retry</Button>
                  <Button onClick={() => setStep('mode-selection')} className="bg-white text-black rounded-full px-12 h-14 font-bold uppercase tracking-widest shadow-2xl transition-all active:scale-95 hover:scale-105">
                    Materialize <ArrowRight size={18} className="ml-3" />
                  </Button>
                </div>
              </header>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <Card className="lg:col-span-2 bg-white/5 border-white/10 p-12 rounded-[56px] relative overflow-hidden shadow-2xl">
                   <div className="absolute top-0 right-0 w-80 h-80 bg-white/[0.03] blur-[120px] rounded-full" />
                   <h4 className="text-[10px] uppercase tracking-widest font-bold text-white/20 mb-10 flex items-center gap-2">
                      <Target size={14} /> Positioning Strategy
                   </h4>
                   <Textarea 
                     value={enhancedData?.professionalBrief}
                     onChange={(e) => setEnhancedData({...enhancedData, professionalBrief: e.target.value})}
                     className="bg-transparent border-none p-0 text-3xl leading-relaxed italic text-white/80 resize-none min-h-[450px] focus-visible:ring-0 scrollbar-hide"
                   />
                </Card>

                <div className="space-y-8">
                   <Card className="bg-white/5 border-white/10 p-10 rounded-[48px] shadow-xl">
                      <h4 className="text-[10px] uppercase tracking-widest font-bold text-white/20 mb-8 flex items-center gap-2">
                        <Palette size={14} /> Derived DNA
                      </h4>
                      <div className="space-y-10">
                         <div>
                            <p className="text-[9px] uppercase tracking-widest text-white/10 mb-3">Aesthetic</p>
                            <p className="text-2xl font-headline italic text-white/80">{enhancedData?.designDNA?.mood}</p>
                         </div>
                         <div>
                            <p className="text-[9px] uppercase tracking-widest text-white/10 mb-3">Typography</p>
                            <p className="text-2xl font-headline italic text-white/80">{enhancedData?.designDNA?.typographyIdentity}</p>
                         </div>
                         <div>
                            <p className="text-[9px] uppercase tracking-widest text-white/10 mb-3">Motion</p>
                            <p className="text-2xl font-headline italic text-white/80">{enhancedData?.designDNA?.motionPhilosophy}</p>
                         </div>
                      </div>
                   </Card>
                   
                   <Card className="bg-white/5 border-white/10 p-10 rounded-[48px] shadow-xl">
                      <h4 className="text-[10px] uppercase tracking-widest font-bold text-white/20 mb-8">Clarification Nodes</h4>
                      <ul className="space-y-5">
                         {enhancedData?.followUpQuestions.slice(0, 3).map((q: string, i: number) => (
                           <li key={i} className="text-sm text-white/30 italic flex gap-4 leading-relaxed">
                             <div className="w-1.5 h-1.5 rounded-full bg-white/10 mt-2 shrink-0" />
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
              <h2 className="text-7xl md:text-9xl font-headline italic text-center mb-24 leading-none tracking-tighter">Choose your <br /> <em className="not-italic text-white/10">Trajectory.</em></h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                 <div 
                   onClick={handleStartResearch}
                   className="relative group p-16 rounded-[72px] border border-white/5 bg-white/[0.02] flex flex-col items-center text-center cursor-pointer hover:border-white/20 transition-all hover:scale-[1.03] shadow-2xl"
                 >
                    <div className="absolute inset-0 bg-white/[0.01] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="w-28 h-28 rounded-[40px] bg-white/5 border border-white/10 flex items-center justify-center mb-12 group-hover:bg-white group-hover:text-black transition-all duration-700">
                       <BarChart3 size={48} />
                    </div>
                    <h4 className="text-6xl font-bold mb-8 tracking-tight">RESEARCH</h4>
                    <p className="text-white/30 leading-relaxed max-w-sm italic text-xl">
                      Strategic moats, market analytics, and investment readiness scores.
                    </p>
                    <Badge variant="outline" className="mt-14 border-white/10 text-[11px] tracking-[0.5em] py-3 px-10">FOUNDEROS ORACLE</Badge>
                 </div>

                 <div 
                   onClick={() => setStep('design-systems')}
                   className="relative group p-16 rounded-[72px] border border-white/5 bg-white flex flex-col items-center text-center cursor-pointer hover:scale-[1.03] transition-all text-black shadow-[0_0_100px_rgba(255,255,255,0.1)]"
                 >
                    <div className="w-28 h-28 rounded-[40px] bg-black/5 border border-black/10 flex items-center justify-center mb-12 group-hover:bg-black group-hover:text-white transition-all duration-700">
                       <Layers size={48} />
                    </div>
                    <h4 className="text-6xl font-bold mb-8 tracking-tight">EXECUTION</h4>
                    <p className="text-black/50 leading-relaxed max-w-sm italic text-xl">
                      Materialize the design DNA into a high-fidelity startup experience.
                    </p>
                    <Badge variant="outline" className="mt-14 border-black/10 text-[11px] tracking-[0.5em] text-black/40 py-3 px-10">THE FORGE STUDIO</Badge>
                 </div>
              </div>
            </motion.div>
          )}

          {step === 'research' && (
            <motion.div key="oracle-view" className="py-12 pb-32">
               <Button variant="ghost" onClick={() => setStep('mode-selection')} className="mb-14 text-white/20 hover:text-white transition-colors h-14 px-8">
                 <ChevronLeft className="mr-3" /> Return to Trajectory
               </Button>
               
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
                  <div className="lg:col-span-2 space-y-32">
                    <section className="space-y-12">
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center relative">
                          <Target size={28} className="text-white relative z-10" />
                          <div className="absolute inset-0 bg-white/10 blur-xl animate-pulse rounded-full" />
                        </div>
                        <h3 className="text-5xl font-headline italic">Strategic Intelligence Report</h3>
                      </div>
                      
                      <Card className="bg-white/5 border-white/10 p-16 rounded-[64px] relative overflow-hidden shadow-2xl">
                        <div className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-white/[0.02] blur-[150px] rounded-full" />
                        <p className="text-5xl font-light italic text-white/80 leading-[1.3] mb-20 border-b border-white/5 pb-20">
                          "{oracleData?.verdict}"
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                           <div className="space-y-10">
                             <h5 className="text-[12px] uppercase tracking-[0.5em] font-bold text-white/20">Critical Market Risks</h5>
                             <div className="space-y-8">
                                {oracleData?.marketRisks.map((risk: string, i: number) => (
                                  <div key={i} className="flex gap-8 items-start text-lg text-white/40 italic leading-relaxed">
                                     <AlertTriangle size={22} className="text-white/20 shrink-0 mt-1" />
                                     {risk}
                                  </div>
                                ))}
                             </div>
                           </div>
                           <div className="space-y-10">
                             <h5 className="text-[12px] uppercase tracking-[0.5em] font-bold text-white/20">Identified Moats</h5>
                             <div className="space-y-8">
                                {oracleData?.strategicMoats.map((moat: string, i: number) => (
                                  <div key={i} className="flex gap-8 items-start text-lg text-white/80 italic leading-relaxed">
                                     <CheckCircle2 size={22} className="text-white/40 shrink-0 mt-1" />
                                     {moat}
                                  </div>
                                ))}
                             </div>
                           </div>
                        </div>
                      </Card>
                    </section>

                    <section className="space-y-14">
                       <h5 className="text-[12px] uppercase tracking-[0.5em] font-bold text-white/20">Neural Scoring Metrics</h5>
                       <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                          {oracleData?.subScores.map((s: any, i: number) => (
                            <div key={i} className="p-14 rounded-[56px] border border-white/5 bg-white/[0.02] flex flex-col justify-between h-64 group hover:border-white/20 transition-all hover:bg-white/[0.04] shadow-xl">
                               <h5 className="text-[11px] uppercase tracking-[0.4em] font-bold text-white/20">{s.category}</h5>
                               <span className="text-8xl font-headline text-white/40 group-hover:text-white transition-colors">{s.score}</span>
                            </div>
                          ))}
                       </div>
                    </section>
                  </div>

                  <div className="flex flex-col items-center justify-center p-16 rounded-[72px] border border-white/10 bg-white/[0.02] backdrop-blur-3xl sticky top-32 h-fit shadow-2xl">
                     <OracleGauge targetScore={oracleData?.score || 85} />
                     <div className="mt-24 text-center space-y-10 w-full">
                        <p className="text-[11px] uppercase tracking-[0.7em] font-bold text-white/20">Readiness Score</p>
                        <Badge className="bg-white/10 text-white px-12 py-5 border-none text-[13px] tracking-[0.4em] font-bold rounded-full">FOUNDEROS VERIFIED</Badge>
                        <Button onClick={() => setStep('design-systems')} className="w-full bg-white text-black rounded-full h-28 text-2xl font-bold uppercase tracking-widest shadow-[0_0_100px_rgba(255,255,255,0.15)] hover:scale-[1.02] transition-all">
                          Proceed to Forge
                        </Button>
                     </div>
                  </div>
               </div>
            </motion.div>
          )}

          {step === 'design-systems' && (
            <motion.div key="design-select" className="py-12 max-w-6xl mx-auto pb-32">
               <h2 className="text-8xl font-headline italic text-center mb-24 leading-none tracking-tighter">Select your <br /> <em className="not-italic text-white/10">Design DNA.</em></h2>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-28">
                  {Object.values(DESIGN_SYSTEMS).map((sys) => (
                    <div 
                      key={sys.id}
                      onClick={() => setSelectedSystem(sys.id)}
                      className={`relative overflow-hidden rounded-[72px] border transition-all cursor-pointer p-16 group ${
                        selectedSystem === sys.id ? 'border-white scale-105 bg-white/5 shadow-2xl' : 'border-white/5 opacity-40 hover:opacity-100 hover:bg-white/[0.02]'
                      }`}
                    >
                       <div className="flex justify-between items-start mb-14">
                         <div className="w-20 h-20 rounded-[32px] border border-white/10 flex items-center justify-center bg-white/5">
                            <Layers size={32} className={selectedSystem === sys.id ? 'text-white' : 'text-white/20'} />
                         </div>
                         {selectedSystem === sys.id && <motion.div layoutId="sys-check" className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-2xl"><CheckCircle2 size={26} className="text-black" /></motion.div>}
                       </div>
                       <h4 className="text-4xl font-bold mb-6 tracking-tight">{sys.name}</h4>
                       <p className="text-base text-white/30 leading-relaxed italic mb-12">{sys.description}</p>
                       <div className="flex flex-wrap gap-3">
                          {sys.principles.map((p, i) => <Badge key={i} className="bg-white/5 text-[11px] border-none text-white/30 uppercase px-5 py-2 font-bold tracking-widest">{p}</Badge>)}
                       </div>
                    </div>
                  ))}
               </div>
               <div className="flex justify-center">
                  <Button onClick={() => router.push('/generate')} className="bg-white text-black rounded-full px-40 h-28 text-3xl font-bold uppercase tracking-[0.3em] shadow-[0_0_120px_rgba(255,255,255,0.25)] hover:scale-105 transition-all">
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
