
"use client";

import { useState, useEffect, useRef } from "react";
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
  MousePointer2,
  Send
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

const DEFAULT_SUGGESTIONS = [
  "Inject luxury serif hierarchy.",
  "Optimize for mobile-first bento.",
  "Adopt brutalist neural aesthetic.",
  "Implement cinematic motion dna."
];

export default function WorkspacePage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('prompt');
  const [prompt, setPrompt] = useState("");
  const [enhancedData, setEnhancedData] = useState<any>(null);
  const [oracleData, setOracleData] = useState<any>(null);
  const [selectedSystem, setSelectedSystem] = useState<DesignSystemId>('agentic');
  const [currentTalk, setCurrentTalk] = useState("Neural link active. Systems ready.");
  const [suggestions, setSuggestions] = useState(DEFAULT_SUGGESTIONS);

  useEffect(() => {
    // Dynamic Scissor Suggestions
    if (prompt.length > 50) {
      setCurrentTalk("Analyzing high-density intent. Complex vision detected.");
      setSuggestions([
        "Refine monetization strategy.",
        "Deepen neural brand rationale.",
        "Assess enterprise scalability.",
        "Generate risk-adjusted verdict."
      ]);
    } else if (prompt.length > 0) {
      setCurrentTalk("Nodes scanning vision. Neural link establishing...");
    } else {
      setCurrentTalk("Neural link ready. Awaiting strategic injection.");
      setSuggestions(DEFAULT_SUGGESTIONS);
    }
  }, [prompt]);

  const handleEnhance = async () => {
    if (!prompt.trim()) return;
    setStep('enhancing');
    try {
      const data = await enhancePrompt({ rawPrompt: prompt });
      setEnhancedData(data);
      setTimeout(() => setStep('refine'), 1500);
    } catch (e) {
      console.error("Enhance failed", e);
      setStep('prompt');
    }
  };

  const handleMaterializeClick = () => {
    const sessionContext = { prompt, enhancedData, oracleData, selectedSystem };
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
          <span className="text-lg font-headline italic tracking-tight text-white/90 leading-none">FounderOS</span>
        </div>
        <div className="flex items-center gap-4">
           <button onClick={() => router.push('/')} className="text-white/40 hover:text-white text-[10px] font-bold uppercase tracking-[0.3em] transition-colors">
             Terminate
           </button>
           <div className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center">
              <Zap size={18} className="text-[#DCFF00]" />
           </div>
        </div>
      </nav>

      <main className="pt-24 px-6 max-w-7xl mx-auto h-[calc(100vh-80px)] overflow-y-auto no-scrollbar pb-20">
        <AnimatePresence mode="wait">
          {step === 'prompt' && (
            <motion.div 
              key="prompt"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col min-h-[75vh] relative pt-8"
            >
              <div className="mb-10 text-left max-w-4xl relative z-30">
                <h2 className="text-[64px] md:text-[84px] font-headline italic tracking-tighter leading-[0.9] mb-4 text-white">
                  Design the <br />
                  <span className="text-white/10 not-italic">unseen vision.</span>
                </h2>
              </div>
              
              <div className="w-full relative max-w-5xl">
                <div className="relative overflow-hidden rounded-[2.5rem] bg-black/60 border border-white/10 backdrop-blur-3xl min-h-[400px]">
                  <Textarea 
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe your vision (e.g., Luxury AI coffee for developers)..."
                    className="w-full min-h-[400px] bg-transparent border-none p-12 text-2xl lg:text-3xl focus:ring-0 focus-visible:ring-0 transition-all pr-[280px] no-scrollbar placeholder:text-white/5 font-light leading-relaxed"
                  />
                  
                  {/* Sissor Container - Medium & Exact */}
                  <div className="absolute bottom-4 right-4 flex flex-col items-end pointer-events-none z-20">
                    <AnimatePresence mode="wait">
                      <motion.div 
                        key={currentTalk}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="bg-white/10 backdrop-blur-3xl border border-white/10 px-6 py-4 rounded-2xl mb-2 max-w-[240px] pointer-events-auto"
                      >
                        <span className="text-[10px] uppercase tracking-widest font-bold text-white/90 leading-tight block">
                          {currentTalk}
                        </span>
                      </motion.div>
                    </AnimatePresence>
                    
                    <div className="w-56 h-64 overflow-hidden relative pointer-events-auto rounded-3xl bg-white/[0.02] border border-white/5">
                      <div className="absolute inset-0 h-[360px] w-full">
                        <InteractiveRobotSpline 
                          scene={SCISSOR_SCENE} 
                          className="w-full h-full scale-[0.85] translate-y-6" 
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between pl-4">
                  <div className="flex gap-3">
                    {suggestions.map((s, i) => (
                      <button 
                        key={i}
                        onClick={() => setPrompt(s)}
                        className="liquid-glass px-4 py-2 rounded-full text-[10px] text-white/40 uppercase tracking-widest font-bold hover:text-white transition-all"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                  <Button 
                    onClick={handleEnhance}
                    disabled={!prompt.trim() || step === 'enhancing'}
                    className="liquid-glass-strong bg-white text-black hover:bg-[#DCFF00] transition-colors rounded-full px-12 h-16 flex items-center gap-4 font-bold uppercase tracking-widest shadow-2xl active:scale-95 group"
                  >
                    <Wand2 size={20} className="group-hover:rotate-12 transition-transform" /> 
                    {step === 'enhancing' ? 'Analyzing' : 'Neural Enhance'}
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
              className="flex flex-col items-center justify-center min-h-[60vh] text-center"
            >
              <div className="w-56 h-64 mb-10 overflow-hidden relative rounded-3xl bg-white/[0.02] border border-white/5">
                 <div className="absolute inset-0 h-[360px] w-full">
                   <InteractiveRobotSpline 
                     scene={SCISSOR_SCENE} 
                     className="w-full h-full scale-[0.9] translate-y-6" 
                   />
                 </div>
              </div>
              <h3 className="text-6xl font-headline italic text-white mb-4 tracking-tighter animate-pulse">Establishing DNA...</h3>
              <p className="text-[#DCFF00] uppercase tracking-[0.6em] text-[11px] font-bold">Neural Link v2.5 Online</p>
            </motion.div>
          )}

          {step === 'refine' && (
            <motion.div 
              key="refine"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="py-8"
            >
              <header className="mb-12 flex justify-between items-end">
                <div className="space-y-4">
                  <Badge className="liquid-glass text-[#DCFF00] border-none px-6 py-2 rounded-full text-[10px] tracking-widest uppercase font-bold">Neural Identity</Badge>
                  <h2 className="text-6xl lg:text-[84px] font-headline italic tracking-tighter leading-none">The Strategy Core.</h2>
                </div>
                <div className="flex gap-4">
                  <Button variant="ghost" onClick={() => setStep('prompt')} className="liquid-glass h-14 px-8 rounded-2xl text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white">Retry Link</Button>
                  <Button onClick={handleMaterializeClick} className="liquid-glass-strong bg-[#DCFF00] text-black rounded-full px-12 h-14 font-bold uppercase tracking-widest shadow-2xl">
                    Materialize <ArrowRight size={20} className="ml-3" />
                  </Button>
                </div>
              </header>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2 liquid-glass-strong bg-white/[0.01] p-12 lg:p-16 rounded-[2.5rem] border-white/5 relative group">
                   <h4 className="text-[10px] uppercase tracking-widest font-bold text-white/20 mb-8 flex items-center gap-3">
                      <Target size={16} /> Strategic Brief
                   </h4>
                   <Textarea 
                     value={enhancedData?.professionalBrief}
                     onChange={(e) => setEnhancedData({...enhancedData, professionalBrief: e.target.value})}
                     className="bg-transparent border-none p-0 text-3xl lg:text-4xl leading-tight font-headline italic text-white/80 resize-none min-h-[400px] focus-visible:ring-0 no-scrollbar"
                   />
                </Card>

                <div className="space-y-8">
                   <Card className="liquid-glass-strong bg-white/[0.01] p-10 rounded-[2.5rem] border-white/5">
                      <h4 className="text-[10px] uppercase tracking-widest font-bold text-white/20 mb-10 flex items-center gap-3">
                        <Palette size={16} /> Design DNA
                      </h4>
                      <div className="space-y-8">
                         <div>
                            <p className="text-[10px] uppercase tracking-widest text-white/10 mb-2 font-bold">Mood</p>
                            <p className="text-2xl font-headline italic text-white/90">{enhancedData?.designDNA?.mood}</p>
                         </div>
                         <div>
                            <p className="text-[10px] uppercase tracking-widest text-white/10 mb-2 font-bold">Motion</p>
                            <p className="text-2xl font-headline italic text-white/90">{enhancedData?.designDNA?.motionPhilosophy}</p>
                         </div>
                         <div>
                            <p className="text-[10px] uppercase tracking-widest text-white/10 mb-2 font-bold">Sophistication</p>
                            <p className="text-2xl font-headline italic text-[#DCFF00] uppercase">{enhancedData?.sophisticationLevel}</p>
                         </div>
                      </div>
                   </Card>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
