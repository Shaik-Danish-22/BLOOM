"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  Zap, 
  Wand2,
  Search,
  Palette,
  Terminal,
  Brain,
  Layers,
  Activity
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { deriveDesignDNA, DesignDNAOutput } from "@/ai/flows/derive-design-dna";
import { orchestrateStartup } from "@/ai/flows/orchestrate-startup";
import { BackgroundEffects } from "@/components/cinematic/BackgroundEffects";
import { useRouter } from "next/navigation";
import { InteractiveRobotSpline } from "@/components/ui/interactive-3d-robot";
import { GradientBackground } from "@/components/ui/paper-design-shader-background";
import { BloomLogo } from "@/components/cinematic/BloomLogo";
import { DESIGN_SYSTEMS } from "@/lib/design-systems";
import { BackgroundPaths } from "@/components/ui/background-paths";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type Step = 'prompt' | 'deriving' | 'choice' | 'orchestrating';

const SCISSOR_SCENE = "https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode";

const DEFAULT_SUGGESTIONS = [
  "Luxury AI coffee experience for developers.",
  "Neural highway for global logistics.",
  "Brutalist fintech for the creator economy.",
  "Cinematic wellness platform for burnout."
];

export default function WorkspacePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [step, setStep] = useState<Step>('prompt');
  const [prompt, setPrompt] = useState("");
  const [dna, setDna] = useState<DesignDNAOutput | null>(null);
  const [currentTalk, setCurrentTalk] = useState("Neural link active. Systems ready.");
  const [showChoice, setShowChoice] = useState(false);
  const [selectedSystem, setSelectedSystem] = useState<string>('apple');

  useEffect(() => {
    if (prompt.toLowerCase().includes('coffee')) {
      setSelectedSystem('cafe');
      setCurrentTalk("Aroma detected. Roasting a premium brand identity...");
    } else if (prompt.length > 50) {
      setCurrentTalk("Analyzing high-density intent. Complex vision detected.");
    } else if (prompt.length > 0) {
      setCurrentTalk("Nodes scanning vision. Neural link establishing...");
    } else {
      setCurrentTalk("Neural link ready. Awaiting strategic injection.");
    }
  }, [prompt]);

  const handleDeriveDNA = async () => {
    if (!prompt.trim()) return;
    setStep('deriving');
    try {
      const data = await deriveDesignDNA({ rawPrompt: prompt });
      setDna(data);
      setStep('choice');
      setShowChoice(true);
    } catch (e) {
      console.error("DNA derivation failed", e);
      setStep('prompt');
      toast({ variant: 'destructive', title: "Neural Link Error", description: "Failed to derive startup DNA." });
    }
  };

  const handleOrchestrate = async (path: 'research' | 'design') => {
    setStep('orchestrating');
    setShowChoice(false);
    
    try {
      const designSystem = DESIGN_SYSTEMS[selectedSystem as any] || DESIGN_SYSTEMS.apple;
      const result = await orchestrateStartup({
        prompt,
        dna,
        designSystem
      });
      
      const sessionContext = { 
        prompt, 
        enhancedData: dna,
        selectedPath: path,
        selectedSystem
      };
      
      localStorage.setItem("materialization_context", JSON.stringify(sessionContext));
      localStorage.setItem("latest_startup", JSON.stringify(result));
      
      router.push('/generate');
    } catch (e) {
      console.error("Orchestration failed", e);
      setStep('choice');
      setShowChoice(true);
      toast({ variant: 'destructive', title: "Orchestration Error", description: "Neural materialization failed." });
    }
  };

  return (
    <div className="relative min-h-screen text-white selection:bg-[#DCFF00]/30 overflow-hidden font-body bg-black">
      <BackgroundEffects />
      <GradientBackground />
      <div className="absolute inset-0 z-0 opacity-20">
        <BackgroundPaths />
      </div>
      <div className="absolute inset-0 -z-10 bg-black/60" />

      <nav className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center backdrop-blur-3xl border-b border-white/10 bg-black/40">
        <div className="flex items-center gap-3">
          <BloomLogo size={32} />
          <span className="text-xl font-headline italic tracking-tighter text-white/95 leading-none">Bloom Studio</span>
        </div>
        <div className="flex items-center gap-6">
           <button onClick={() => router.push('/')} className="text-white/60 hover:text-white text-[10px] font-bold uppercase tracking-[0.4em] transition-all">
             Terminate Session
           </button>
           <div className="w-11 h-11 rounded-full border border-white/20 bg-[#DCFF00]/10 flex items-center justify-center shadow-[0_0_20px_rgba(220,255,0,0.1)]">
              <Zap size={20} className="text-[#DCFF00]" />
           </div>
        </div>
      </nav>

      <main className="pt-32 px-6 max-w-7xl mx-auto h-[calc(100vh-80px)] overflow-y-auto no-scrollbar pb-24 relative z-10">
        <AnimatePresence mode="wait">
          {(step === 'prompt' || step === 'choice') && (
            <motion.div 
              key="prompt"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="flex flex-col min-h-[70vh] relative"
            >
              <div className="mb-12 text-left max-w-4xl relative z-30">
                <h2 className="text-6xl md:text-8xl font-headline italic tracking-tighter leading-[0.85] mb-6 text-white text-glow">
                  Materialize the <br />
                  <span className="text-white/20 not-italic">unseen vision.</span>
                </h2>
                <p className="text-xl text-white/60 font-light max-w-2xl italic leading-relaxed">
                  Inject your startup intent. Our Design DNA Engine will extract audience psychology and visual logic before orchestrating the experience.
                </p>
              </div>
              
              <div className="w-full relative max-w-5xl">
                <div className="relative overflow-hidden rounded-[3rem] bg-white/[0.03] border border-white/10 backdrop-blur-3xl min-h-[440px] shadow-2xl transition-all hover:bg-white/[0.05] hover:border-white/20 group">
                  <Textarea 
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe your vision (e.g., Luxury AI coffee for developers)..."
                    className="w-full min-h-[440px] bg-transparent border-none p-12 text-3xl lg:text-4xl focus:ring-0 focus-visible:ring-0 transition-all pr-[320px] no-scrollbar placeholder:text-white/10 font-light leading-[1.2] text-white/90"
                  />
                  
                  <div className="absolute bottom-8 right-8 flex flex-col items-end pointer-events-none z-20">
                    <AnimatePresence mode="wait">
                      <motion.div 
                        key={currentTalk}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="bg-black/80 backdrop-blur-3xl border border-[#DCFF00]/30 px-8 py-5 rounded-[2rem] mb-6 max-w-[280px] pointer-events-auto shadow-2xl"
                      >
                        <span className="text-[11px] uppercase tracking-widest font-bold text-[#DCFF00] leading-tight block mb-1">Scissor_Node</span>
                        <span className="text-[14px] text-white/90 font-medium italic leading-snug block">
                          {currentTalk}
                        </span>
                      </motion.div>
                    </AnimatePresence>
                    
                    <div className="w-72 h-80 overflow-hidden relative pointer-events-auto rounded-[2.5rem] bg-black/60 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                      <div className="absolute inset-0 h-[420px] w-full">
                        <InteractiveRobotSpline 
                          scene={SCISSOR_SCENE} 
                          className="w-full h-full scale-[0.9] translate-y-10" 
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-8 pl-4">
                  <div className="flex flex-wrap gap-4">
                    {DEFAULT_SUGGESTIONS.map((s, i) => (
                      <button 
                        key={i}
                        onClick={() => setPrompt(s)}
                        className="bg-white/5 border border-white/10 px-6 py-3 rounded-full text-[10px] text-white/60 uppercase tracking-[0.3em] font-bold hover:text-[#DCFF00] hover:border-[#DCFF00]/30 hover:bg-[#DCFF00]/5 transition-all active:scale-95"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                  <Button 
                    onClick={handleDeriveDNA}
                    disabled={!prompt.trim() || step === 'deriving'}
                    className="bg-white text-black hover:bg-[#DCFF00] transition-all rounded-full px-16 h-20 flex items-center gap-6 font-bold uppercase tracking-[0.3em] shadow-[0_0_50px_rgba(220,255,0,0.3)] active:scale-95 group text-sm"
                  >
                    <Wand2 size={24} className="group-hover:rotate-12 transition-transform" /> 
                    Initialize Link
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {(step === 'deriving' || step === 'orchestrating') && (
            <motion.div 
              key="loading"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center min-h-[65vh] text-center"
            >
              <div className="mb-16 relative">
                <div className="absolute inset-0 bg-[#DCFF00]/20 blur-[100px] animate-pulse rounded-full" />
                <BloomLogo size={160} />
              </div>
              <h3 className="text-6xl md:text-7xl font-headline italic text-white mb-6 tracking-tighter animate-pulse text-glow">
                {step === 'deriving' ? 'Extracting Design DNA...' : 'Orchestrating Experience...'}
              </h3>
              <p className="text-[#DCFF00] uppercase tracking-[0.8em] text-[12px] font-bold mb-16">FounderOS Intelligence Core Active</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
                 {[
                   { label: "Neural Pacing", icon: Activity, desc: "Synchronizing motion tokens" },
                   { label: "Visual Tokenization", icon: Palette, desc: "Deriving high-contrast hierarchy" },
                   { label: "Hierarchy Validation", icon: Layers, desc: "Anti-slop logic processing" },
                   { label: "Prompt Reasoning", icon: Brain, desc: "DeepSeek-V3 intent analysis" }
                 ].map((node, i) => (
                   <motion.div 
                     key={i}
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: i * 0.15 }}
                     className="flex items-center gap-5 p-6 rounded-[2rem] bg-white/[0.03] border border-white/10 hover:bg-white/[0.05] transition-all text-left"
                   >
                      <div className="w-12 h-12 rounded-2xl bg-[#DCFF00]/10 flex items-center justify-center border border-[#DCFF00]/20">
                         <node.icon size={20} className="text-[#DCFF00]" />
                      </div>
                      <div>
                        <span className="text-[11px] uppercase tracking-widest font-bold text-white/90 block">{node.label}</span>
                        <span className="text-[10px] text-white/40 italic uppercase tracking-tighter">{node.desc}</span>
                      </div>
                      <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#DCFF00] animate-ping" />
                   </motion.div>
                 ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <Dialog open={showChoice} onOpenChange={setShowChoice}>
          <DialogContent className="max-w-6xl bg-black/95 border-white/10 backdrop-blur-[60px] p-0 overflow-hidden rounded-[3.5rem] shadow-[0_0_100px_rgba(0,0,0,0.8)] border">
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
              <div className="p-16 space-y-12 border-r border-white/5 relative overflow-hidden group">
                <div className="absolute inset-0 bg-white/[0.01] transition-all group-hover:bg-white/[0.03]" />
                <div className="relative z-10 space-y-6">
                   <div className="w-16 h-16 rounded-[2rem] bg-[#DCFF00]/10 flex items-center justify-center border border-[#DCFF00]/20 shadow-[0_0_30px_rgba(220,255,0,0.1)]">
                      <Search className="text-[#DCFF00]" size={32} />
                   </div>
                   <h3 className="text-5xl font-headline italic text-white leading-none">Research & <br/> Insight</h3>
                   <p className="text-white/60 text-xl leading-relaxed font-light italic max-w-md">
                      Evaluate your vision through a multi-billion dollar shark lens. Analyze market performance, risks, and viability before building.
                   </p>
                </div>
                
                <div className="relative z-10 space-y-8 pt-4">
                   <div className="flex items-center gap-3 text-white/40 text-[11px] font-bold uppercase tracking-[0.4em]">
                      <Terminal size={16} /> Select Design System
                   </div>
                   <div className="grid grid-cols-2 gap-3">
                      {Object.values(DESIGN_SYSTEMS).map(sys => (
                        <button 
                          key={sys.id}
                          onClick={() => setSelectedSystem(sys.id)}
                          className={cn(
                            "p-5 rounded-[1.5rem] border text-left transition-all relative overflow-hidden group/btn",
                            selectedSystem === sys.id 
                            ? "bg-[#DCFF00]/10 border-[#DCFF00]/30 shadow-2xl" 
                            : "bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]"
                          )}
                        >
                           <span className={cn(
                             "text-[10px] font-bold uppercase tracking-[0.3em] block mb-1", 
                             selectedSystem === sys.id ? "text-[#DCFF00]" : "text-white/60"
                           )}>{sys.name}</span>
                           <span className="text-[9px] text-white/30 italic line-clamp-1 block uppercase tracking-tighter font-bold">Inspiration: {sys.inspiration}</span>
                        </button>
                      ))}
                   </div>
                </div>

                <div className="relative z-10 pt-8">
                   <Button 
                    onClick={() => handleOrchestrate('research')} 
                    className="w-full h-20 rounded-[2rem] bg-white text-black font-bold uppercase tracking-[0.2em] hover:bg-[#DCFF00] transition-all group shadow-2xl text-sm"
                   >
                      Initialize Strategic Audit <ArrowRight className="ml-4 w-6 h-6 group-hover:translate-x-2 transition-transform" />
                   </Button>
                </div>
              </div>

              <div className="p-16 space-y-12 bg-white/[0.02] relative overflow-hidden group">
                <div className="absolute inset-0 bg-[#DCFF00]/[0.02] transition-all group-hover:bg-[#DCFF00]/[0.04]" />
                <div className="relative z-10 space-y-6">
                   <div className="w-16 h-16 rounded-[2rem] bg-white/10 flex items-center justify-center border border-white/20 shadow-2xl">
                      <Palette className="text-white" size={32} />
                   </div>
                   <h3 className="text-5xl font-headline italic text-white leading-none">Design & <br/> Materialize</h3>
                   <p className="text-white/60 text-xl leading-relaxed font-light italic max-w-md">
                      Orchestrate your vision into a premium, functional startup experience. Strictly derived from neural Design DNA tokens.
                   </p>
                </div>

                <div className="relative z-10 p-10 rounded-[3rem] bg-black/40 border border-white/10 space-y-6 shadow-inner">
                   <div className="flex items-center gap-3 text-white/40 text-[11px] font-bold uppercase tracking-[0.4em]">
                      <Activity size={16} /> Derived Design DNA
                   </div>
                   <div className="space-y-6">
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase tracking-widest text-[#DCFF00] font-bold block opacity-60">Neural Archetype</span>
                        <p className="text-lg font-headline italic text-white/90 leading-tight">{dna?.startupArchetype || "Analyzing..."}</p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase tracking-widest text-[#DCFF00] font-bold block opacity-60">Motion Philosophy</span>
                        <p className="text-lg font-headline italic text-white/90 leading-tight">{dna?.designDNA?.motionPhilosophy || "Analyzing..."}</p>
                      </div>
                   </div>
                </div>

                <div className="relative z-10 pt-8">
                   <Button 
                    onClick={() => handleOrchestrate('design')} 
                    className="w-full h-20 rounded-[2rem] bg-white/5 border border-white/10 text-white font-bold uppercase tracking-[0.2em] hover:bg-white/10 transition-all group shadow-2xl backdrop-blur-3xl text-sm"
                   >
                      Materialize Experience <ArrowRight className="ml-4 w-6 h-6 group-hover:translate-x-2 transition-transform" />
                   </Button>
                </div>
              </div>
            </div>
            <div className="p-8 bg-black/80 border-t border-white/10 flex items-center justify-between px-16">
               <div className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-[#DCFF00] animate-pulse shadow-[0_0_10px_#DCFF00]" />
                  <span className="text-[11px] uppercase tracking-[0.4em] font-bold text-white/40 italic">
                    Neural Identity Sync Complete: "{dna?.startupArchetype}"
                  </span>
               </div>
               <button onClick={() => setShowChoice(false)} className="text-[11px] uppercase tracking-[0.4em] font-bold text-white/30 hover:text-[#DCFF00] transition-all hover:tracking-[0.6em]">Abort Materialization</button>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
