"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  Palette, 
  ArrowRight, 
  Zap, 
  Wand2,
  Target,
  Shield,
  Brain,
  Rocket,
  Search,
  Layout,
  Terminal,
  Cpu,
  Layers,
  Activity
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { deriveDesignDNA, DesignDNAOutput } from "@/ai/flows/derive-design-dna";
import { orchestrateStartup } from "@/ai/flows/orchestrate-startup";
import { BackgroundEffects } from "@/components/cinematic/BackgroundEffects";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { InteractiveRobotSpline } from "@/components/ui/interactive-3d-robot";
import { GradientBackground } from "@/components/ui/paper-design-shader-background";
import { BloomLogo } from "@/components/cinematic/BloomLogo";
import { DESIGN_SYSTEMS } from "@/lib/design-systems";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

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
    if (prompt.length > 50) {
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
      // Orchestrate using DNA + Selected System
      const designSystem = DESIGN_SYSTEMS[selectedSystem as any];
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
      <div className="absolute inset-0 -z-10 bg-black/60" />

      <nav className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center backdrop-blur-md border-b border-white/5 bg-black/40">
        <div className="flex items-center gap-3">
          <BloomLogo size={28} />
          <span className="text-lg font-headline italic tracking-tight text-white/90 leading-none">Bloom</span>
        </div>
        <div className="flex items-center gap-4">
           <button onClick={() => router.push('/')} className="text-white/40 hover:text-white text-[10px] font-bold uppercase tracking-[0.3em] transition-colors">
             Terminate Session
           </button>
           <div className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center">
              <Zap size={18} className="text-[#DCFF00]" />
           </div>
        </div>
      </nav>

      <main className="pt-24 px-6 max-w-7xl mx-auto h-[calc(100vh-80px)] overflow-y-auto no-scrollbar pb-20">
        <AnimatePresence mode="wait">
          {(step === 'prompt' || step === 'choice') && (
            <motion.div 
              key="prompt"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col min-h-[75vh] relative pt-8"
            >
              <div className="mb-10 text-left max-w-4xl relative z-30">
                <h2 className="text-5xl md:text-7xl font-headline italic tracking-tighter leading-[0.9] mb-4 text-white">
                  Design the <br />
                  <span className="text-white/10 not-italic">unseen vision.</span>
                </h2>
              </div>
              
              <div className="w-full relative max-w-5xl">
                <div className="relative overflow-hidden rounded-[2.5rem] bg-black/60 border border-white/10 backdrop-blur-3xl min-h-[380px]">
                  <Textarea 
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe your vision (e.g., Luxury AI coffee for developers)..."
                    className="w-full min-h-[380px] bg-transparent border-none p-12 text-2xl lg:text-3xl focus:ring-0 focus-visible:ring-0 transition-all pr-[260px] no-scrollbar placeholder:text-white/5 font-light leading-relaxed"
                  />
                  
                  <div className="absolute bottom-4 right-4 flex flex-col items-end pointer-events-none z-20">
                    <AnimatePresence mode="wait">
                      <motion.div 
                        key={currentTalk}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="bg-white/10 backdrop-blur-3xl border border-white/10 px-6 py-4 rounded-2xl mb-2 max-w-[220px] pointer-events-auto"
                      >
                        <span className="text-[10px] uppercase tracking-widest font-bold text-white/90 leading-tight block">
                          {currentTalk}
                        </span>
                      </motion.div>
                    </AnimatePresence>
                    
                    <div className="w-52 h-60 overflow-hidden relative pointer-events-auto rounded-3xl bg-white/[0.02] border border-white/5">
                      <div className="absolute inset-0 h-[340px] w-full">
                        <InteractiveRobotSpline 
                          scene={SCISSOR_SCENE} 
                          className="w-full h-full scale-[0.82] translate-y-6" 
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between pl-4">
                  <div className="flex flex-wrap gap-3">
                    {DEFAULT_SUGGESTIONS.map((s, i) => (
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
                    onClick={handleDeriveDNA}
                    disabled={!prompt.trim() || step === 'deriving'}
                    className="liquid-glass-strong bg-white text-black hover:bg-[#DCFF00] transition-colors rounded-full px-12 h-16 flex items-center gap-4 font-bold uppercase tracking-widest shadow-2xl active:scale-95 group"
                  >
                    <Wand2 size={20} className="group-hover:rotate-12 transition-transform" /> 
                    Establish Neural Link
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {(step === 'deriving' || step === 'orchestrating') && (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center min-h-[60vh] text-center"
            >
              <div className="mb-10">
                <BloomLogo size={120} />
              </div>
              <h3 className="text-5xl font-headline italic text-white mb-4 tracking-tighter animate-pulse">
                {step === 'deriving' ? 'Extracting Design DNA...' : 'Orchestrating Experience...'}
              </h3>
              <p className="text-[#DCFF00] uppercase tracking-[0.6em] text-[11px] font-bold">FounderOS Intelligence Core Active</p>
              
              <div className="mt-12 w-full max-w-md space-y-4">
                 {[
                   { label: "Neural Pacing", icon: Activity },
                   { label: "Visual Tokenization", icon: Palette },
                   { label: "Hierarchy Validation", icon: Layers },
                   { label: "Prompt Reasoning", icon: Brain }
                 ].map((node, i) => (
                   <motion.div 
                     key={i}
                     initial={{ opacity: 0, x: -20 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ delay: i * 0.2 }}
                     className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5"
                   >
                      <div className="flex items-center gap-3">
                         <node.icon size={14} className="text-[#DCFF00]/40" />
                         <span className="text-[10px] uppercase tracking-widest font-bold text-white/40">{node.label}</span>
                      </div>
                      <div className="w-1.5 h-1.5 rounded-full bg-[#DCFF00] animate-pulse" />
                   </motion.div>
                 ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ORCHESTRATION CHOICE DIALOG */}
        <Dialog open={showChoice} onOpenChange={setShowChoice}>
          <DialogContent className="max-w-5xl bg-black/95 border-white/10 backdrop-blur-3xl p-0 overflow-hidden rounded-[3rem]">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-12 space-y-8 border-r border-white/5">
                <div className="space-y-4">
                   <div className="w-12 h-12 rounded-2xl bg-[#DCFF00]/10 flex items-center justify-center">
                      <Search className="text-[#DCFF00]" size={24} />
                   </div>
                   <h3 className="text-4xl font-headline italic">Research & Insight</h3>
                   <p className="text-white/40 text-lg leading-relaxed font-light italic">
                      Evaluate your vision through a multi-billion dollar shark lens. Analyze market performance, risks, and viability before building.
                   </p>
                </div>
                
                <div className="space-y-6 pt-4">
                   <div className="flex items-center gap-3 text-white/20 text-[10px] font-bold uppercase tracking-widest">
                      <Terminal size={14} /> Select Design System
                   </div>
                   <div className="grid grid-cols-2 gap-2">
                      {Object.values(DESIGN_SYSTEMS).map(sys => (
                        <button 
                          key={sys.id}
                          onClick={() => setSelectedSystem(sys.id)}
                          className={cn(
                            "p-4 rounded-xl border text-left transition-all",
                            selectedSystem === sys.id ? "bg-white/10 border-white/20" : "bg-white/[0.02] border-white/5 hover:border-white/10"
                          )}
                        >
                           <span className={cn("text-[10px] font-bold uppercase tracking-widest", selectedSystem === sys.id ? "text-[#DCFF00]" : "text-white/40")}>{sys.name}</span>
                        </button>
                      ))}
                   </div>
                </div>

                <div className="space-y-4 pt-4">
                   <div className="flex items-center gap-3 text-[#DCFF00]/40 text-[10px] font-bold uppercase tracking-widest">
                      <Shield size={14} /> FounderOS Intelligence Node
                   </div>
                   <Button onClick={() => handleOrchestrate('research')} className="w-full h-16 rounded-2xl bg-white text-black font-bold uppercase tracking-widest hover:bg-[#DCFF00] transition-all group">
                      Initialize Research <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
                   </Button>
                </div>
              </div>

              <div className="p-12 space-y-8 bg-[#DCFF00]/5">
                <div className="space-y-4">
                   <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                      <Palette className="text-white" size={24} />
                   </div>
                   <h3 className="text-4xl font-headline italic">Design & Build</h3>
                   <p className="text-white/40 text-lg leading-relaxed font-light italic">
                      Materialize your vision into a premium, interactive startup experience. Strictly derived from neural Design DNA.
                   </p>
                </div>

                <div className="p-8 rounded-[2rem] bg-black/40 border border-white/5 space-y-4">
                   <div className="flex items-center gap-3 text-white/30 text-[10px] font-bold uppercase tracking-widest">
                      <Activity size={14} /> Derived DNA Highlights
                   </div>
                   <div className="space-y-4">
                      <div>
                        <span className="text-[8px] uppercase tracking-widest text-[#DCFF00]/40 font-bold block mb-1">Archetype</span>
                        <p className="text-xs text-white/60 italic">{dna?.startupArchetype}</p>
                      </div>
                      <div>
                        <span className="text-[8px] uppercase tracking-widest text-[#DCFF00]/40 font-bold block mb-1">Interaction</span>
                        <p className="text-xs text-white/60 italic">{dna?.designDNA?.interactionStyle}</p>
                      </div>
                   </div>
                </div>

                <div className="space-y-4 pt-4">
                   <div className="flex items-center gap-3 text-white/20 text-[10px] font-bold uppercase tracking-widest">
                      <Zap size={14} /> Anti-Slop Validation Layer
                   </div>
                   <Button onClick={() => handleOrchestrate('design')} className="w-full h-16 rounded-2xl bg-white/10 border border-white/10 text-white font-bold uppercase tracking-widest hover:bg-white/20 transition-all group">
                      Materialize Experience <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
                   </Button>
                </div>
              </div>
            </div>
            <div className="p-6 bg-black border-t border-white/5 flex items-center justify-between">
               <div className="flex items-center gap-3">
                  <Brain size={14} className="text-[#DCFF00]" />
                  <span className="text-[9px] uppercase tracking-widest font-bold text-white/30 italic">Neural Brief Derived: "{dna?.startupArchetype}"</span>
               </div>
               <button onClick={() => setShowChoice(false)} className="text-[9px] uppercase tracking-widest font-bold text-white/20 hover:text-white transition-colors">Abort Orchestration</button>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
