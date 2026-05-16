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
  Bot
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
    setStep('enhancing'); // Reuse for analysis feel
    try {
      // Dummy data for demo if actual flow fails, but calling logic
      const data = await generateOracleInvestorScore({
        companyName: enhancedData?.suggestedName || "NexusFlow",
        tagline: enhancedData?.coreConcept || "Neural Supply Chain",
        valueProposition: enhancedData?.professionalBrief || "",
        marketOpportunityAnalysis: "Analysis of " + enhancedData?.targetAudience,
        tamSamSomSummary: "$10B Market",
        competitorInsights: "Direct moats identified",
        gtmStrategy: "Direct sales",
        pricingModel: "SaaS",
        startupRoadmapSummary: "Q1 Launch"
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
          <span className="text-lg font-headline italic tracking-tight">Siteforge Neural Command</span>
        </div>
        <div className="flex items-center gap-4">
           <Button variant="ghost" onClick={() => { localStorage.removeItem("siteforge_dummy_user"); router.push('/'); }} className="text-white/40 hover:text-white text-xs font-bold uppercase tracking-widest">
             End Session
           </Button>
           <div className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center animate-pulse-slow">
              <Zap size={18} className="text-white/40" />
           </div>
        </div>
      </nav>

      <main className="pt-32 px-6 max-w-7xl mx-auto h-[calc(100vh-80px)] overflow-y-auto scrollbar-hide">
        <AnimatePresence mode="wait">
          {step === 'prompt' && (
            <motion.div 
              key="prompt"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center justify-center min-h-[70vh] text-center max-w-3xl mx-auto"
            >
              <h2 className="text-5xl md:text-7xl font-headline italic mb-8">What shall we <em className="not-italic text-white/20">materialize</em>?</h2>
              <div className="w-full relative">
                <Textarea 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe your vision in vague terms... we'll handle the precision."
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
              <p className="mt-8 text-white/10 text-[10px] uppercase tracking-[0.4em] font-bold">FounderOS Intelligence Neural Link v2.5</p>
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
              <div className="relative w-32 h-32 mb-12">
                <motion.div 
                  animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full border-t-2 border-white/40 border-transparent shadow-[0_0_50px_rgba(255,255,255,0.1)]"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Cpu className="text-white w-10 h-10 animate-pulse" />
                </div>
              </div>
              <h3 className="text-3xl font-headline italic text-white/60 mb-2">Neural Expansion Active</h3>
              <p className="text-white/20 uppercase tracking-[0.4em] text-[10px] font-bold">Constructing technical brief and market positioning...</p>
            </motion.div>
          )}

          {step === 'refine' && (
            <motion.div 
              key="refine"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="max-w-4xl mx-auto py-12"
            >
              <header className="mb-12 flex justify-between items-end">
                <div>
                  <h2 className="text-4xl font-headline italic mb-2">Refine the Brief</h2>
                  <p className="text-white/40">The AI has structured your vague idea into a professional vision.</p>
                </div>
                <Button onClick={() => setStep('mode-selection')} className="bg-white text-black rounded-full px-8 h-12 font-bold uppercase tracking-widest">
                  Lock Brief <ArrowRight size={18} className="ml-2" />
                </Button>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2 liquid-glass p-8 border-white/10">
                   <h4 className="text-[10px] uppercase tracking-widest font-bold text-white/40 mb-4">The Professional Brief</h4>
                   <Textarea 
                     value={enhancedData?.professionalBrief}
                     onChange={(e) => setEnhancedData({...enhancedData, professionalBrief: e.target.value})}
                     className="bg-transparent border-none p-0 text-lg leading-relaxed italic text-white/80 resize-none min-h-[300px] focus-visible:ring-0"
                   />
                </Card>

                <div className="space-y-6">
                   <Card className="liquid-glass p-6 border-white/5">
                      <h4 className="text-[10px] uppercase tracking-widest font-bold text-white/40 mb-3">Suggested Identity</h4>
                      <Input 
                        value={enhancedData?.suggestedName}
                        onChange={(e) => setEnhancedData({...enhancedData, suggestedName: e.target.value})}
                        className="bg-white/5 border-white/10 text-xl font-headline italic"
                      />
                   </Card>
                   <Card className="liquid-glass p-6 border-white/5">
                      <h4 className="text-[10px] uppercase tracking-widest font-bold text-white/40 mb-3">Core Vibe</h4>
                      <Badge className="bg-white/10 text-white border-none px-4 py-1.5 uppercase tracking-widest text-[9px]">{enhancedData?.suggestedVibe}</Badge>
                   </Card>
                   <Card className="liquid-glass p-6 border-white/5">
                      <h4 className="text-[10px] uppercase tracking-widest font-bold text-white/40 mb-3">Refinement Nodes</h4>
                      <ul className="space-y-3">
                         {enhancedData?.followUpQuestions.map((q: string, i: number) => (
                           <li key={i} className="text-xs text-white/30 flex gap-2">
                             <div className="w-1.5 h-1.5 rounded-full bg-white/20 mt-1" />
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
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="h-full flex flex-col justify-center max-w-5xl mx-auto"
            >
              <h2 className="text-6xl font-headline italic text-center mb-16">Choose your <em className="not-italic text-white/20">trajectory</em>.</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                 <div 
                   onClick={handleStartResearch}
                   className="liquid-glass p-16 rounded-[64px] border border-white/5 flex flex-col items-center text-center group cursor-pointer hover:border-white/20 transition-all hover:scale-[1.02]"
                 >
                    <div className="w-20 h-20 rounded-[32px] bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:bg-white group-hover:text-black transition-all">
                       <Shield size={40} />
                    </div>
                    <h4 className="text-4xl font-bold mb-4">The Oracle</h4>
                    <p className="text-white/40 leading-relaxed max-w-xs">
                      Deep market intelligence, investor scoring, and strategic moats. Analyze before you build.
                    </p>
                    <Badge variant="outline" className="mt-8 border-white/10 text-[9px] tracking-[0.3em]">STRATEGIC MODE</Badge>
                 </div>

                 <div 
                   onClick={() => setStep('design-systems')}
                   className="liquid-glass p-16 rounded-[64px] border border-white/5 flex flex-col items-center text-center group cursor-pointer hover:border-white/20 transition-all hover:scale-[1.02] bg-white text-black"
                 >
                    <div className="w-20 h-20 rounded-[32px] bg-black/5 border border-black/10 flex items-center justify-center mb-8 group-hover:bg-black group-hover:text-white transition-all">
                       <Palette size={40} />
                    </div>
                    <h4 className="text-4xl font-bold mb-4">The Forge</h4>
                    <p className="text-black/60 leading-relaxed max-w-xs">
                      Cinematic execution. Materialize your startup website live through premium design systems.
                    </p>
                    <Badge variant="outline" className="mt-8 border-black/10 text-[9px] tracking-[0.3em] text-black/60">EXECUTION MODE</Badge>
                 </div>
              </div>
            </motion.div>
          )}

          {step === 'research' && (
            <motion.div key="oracle-view" className="py-12">
               <Button variant="ghost" onClick={() => setStep('mode-selection')} className="mb-12 text-white/40 hover:text-white">
                 <ChevronLeft className="mr-2" /> Back to Trajectory
               </Button>
               
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                  <div className="lg:col-span-2 space-y-12">
                    <section className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                          <BarChart3 size={18} className="text-white/60" />
                        </div>
                        <h3 className="text-xl font-headline italic">Market Opportunity Analysis</h3>
                      </div>
                      <Card className="liquid-glass p-10 border-white/10">
                        <p className="text-2xl font-light italic text-white/70 leading-relaxed mb-8">
                          "{oracleData?.verdict}"
                        </p>
                        <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/5">
                           <div>
                             <h5 className="text-[10px] uppercase tracking-widest font-bold text-white/20 mb-2">Moat Identification</h5>
                             <p className="text-sm text-white/50">High technical synergy and unique market entry point through {enhancedData?.suggestedName}.</p>
                           </div>
                           <div>
                             <h5 className="text-[10px] uppercase tracking-widest font-bold text-white/20 mb-2">Target Saturation</h5>
                             <p className="text-sm text-white/50">Primary: {enhancedData?.targetAudience}. Low current competition in high-fidelity niches.</p>
                           </div>
                        </div>
                      </Card>
                    </section>

                    <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       {oracleData?.subScores.map((s: any, i: number) => (
                         <div key={i} className="p-8 rounded-[32px] border border-white/5 liquid-glass flex items-center justify-between">
                            <div>
                               <h5 className="text-[10px] uppercase tracking-widest font-bold text-white/20">{s.category}</h5>
                               <p className="text-xl font-headline italic mt-1">Optimization Required</p>
                            </div>
                            <span className="text-3xl font-bold text-white/40">{s.score}</span>
                         </div>
                       ))}
                    </section>
                  </div>

                  <div className="flex flex-col items-center justify-center p-12 rounded-[56px] border border-white/5 liquid-glass sticky top-32 h-fit">
                     <OracleGauge targetScore={oracleData?.score || 88} />
                     <div className="mt-12 text-center space-y-4">
                        <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/20">Oracle Confidence Rating</p>
                        <Badge className="bg-white/10 text-white px-6 py-2 border-none text-[10px] tracking-widest">HIGH POTENTIAL</Badge>
                     </div>
                     <Button onClick={() => setStep('design-systems')} className="mt-16 w-full bg-white text-black rounded-full h-16 font-bold uppercase tracking-widest shadow-2xl">
                       Proceed to Forge
                     </Button>
                  </div>
               </div>
            </motion.div>
          )}

          {step === 'design-systems' && (
            <motion.div key="design-select" className="py-12 max-w-5xl mx-auto">
               <h2 className="text-5xl font-headline italic text-center mb-16">Choose your <em className="not-italic text-white/20">design language</em>.</h2>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                  {Object.values(DESIGN_SYSTEMS).map((sys) => (
                    <div 
                      key={sys.id}
                      onClick={() => setSelectedSystem(sys.id)}
                      className={`liquid-glass rounded-[40px] border transition-all cursor-pointer p-8 group relative ${
                        selectedSystem === sys.id ? 'border-white scale-105 bg-white/5' : 'border-white/5 opacity-50'
                      }`}
                    >
                       <div className="flex justify-between items-start mb-6">
                         <div className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center bg-white/5">
                            <Layers size={18} className={selectedSystem === sys.id ? 'text-white' : 'text-white/20'} />
                         </div>
                         {selectedSystem === sys.id && <CheckCircle2 size={20} className="text-white" />}
                       </div>
                       <h4 className="text-xl font-bold mb-2">{sys.name}</h4>
                       <p className="text-[10px] text-white/40 leading-relaxed">{sys.description}</p>
                       <div className="mt-6 flex gap-2">
                          {sys.principles.map((p, i) => <Badge key={i} className="bg-white/5 text-[8px] border-none text-white/30 uppercase px-2">{p}</Badge>)}
                       </div>
                    </div>
                  ))}
               </div>
               <div className="flex justify-center">
                  <Button onClick={startMaterialization} className="bg-white text-black rounded-full px-20 h-20 text-xl font-bold uppercase tracking-widest shadow-[0_0_80px_rgba(255,255,255,0.2)] hover:scale-105 transition-all">
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
               <div className="relative w-full max-w-4xl">
                  <motion.div 
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 4, ease: "linear" }}
                    className="h-1 w-full bg-white origin-left shadow-[0_0_30px_white]"
                  />
                  <div className="mt-12 space-y-4">
                     <h2 className="text-6xl font-headline italic tracking-tighter">Materializing {enhancedData?.suggestedName}</h2>
                     <div className="flex items-center justify-center gap-4 text-[10px] uppercase tracking-[0.4em] font-bold text-white/20">
                        <span className="animate-pulse">Neural Transit active</span>
                        <div className="w-1 h-1 rounded-full bg-white/20" />
                        <span>Rendering {selectedSystem} nodes</span>
                     </div>
                  </div>
                  
                  <div className="mt-16 grid grid-cols-4 gap-8">
                     {[
                       { icon: Search, label: "Scanning" },
                       { icon: Palette, label: "Branding" },
                       { icon: Layers, label: "Layout" },
                       { icon: Zap, label: "Motion" }
                     ].map((item, i) => (
                       <motion.div 
                         key={i}
                         initial={{ opacity: 0, y: 10 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ delay: i * 0.8 }}
                         className="flex flex-col items-center gap-3"
                       >
                         <item.icon size={24} className="text-white/40" />
                         <span className="text-[9px] uppercase tracking-widest font-bold opacity-30">{item.label}</span>
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
