
"use client";

import { useState, useEffect, useRef } from "react";
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
  Activity,
  ChevronRight,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { deriveDesignDNA, DesignDNAOutput } from "@/ai/flows/derive-design-dna";
import { orchestrateStartup } from "@/ai/flows/orchestrate-startup";
import { useRouter } from "next/navigation";
import { InteractiveRobotSpline } from "@/components/ui/interactive-3d-robot";
import { BloomLogo } from "@/components/cinematic/BloomLogo";
import { DESIGN_SYSTEMS } from "@/lib/design-systems";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type Step = 'prompt' | 'deriving' | 'choice' | 'orchestrating';

const SCISSOR_SCENE = "https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode";
const VIDEO_URL = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4";

const DEFAULT_SUGGESTIONS = [
  "Luxury AI coffee experience for developers.",
  "Neural highway for global logistics.",
  "Brutalist fintech for the creator economy.",
  "Cinematic wellness platform for burnout."
];

export default function WorkspacePage() {
  const router = useRouter();
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoOpacity, setVideoOpacity] = useState(0);
  const [step, setStep] = useState<Step>('prompt');
  const [prompt, setPrompt] = useState("");
  const [dna, setDna] = useState<DesignDNAOutput | null>(null);
  const [currentTalk, setCurrentTalk] = useState("Neural link ready. Awaiting strategic injection.");
  const [showChoice, setShowChoice] = useState(false);
  const [selectedSystem, setSelectedSystem] = useState<string>('apple');

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let frameId: number;
    const handleLoop = () => {
      if (video.duration) {
        const remaining = video.duration - video.currentTime;
        // Manual smooth cross-fade loop logic (0.5s fade)
        if (video.currentTime < 0.5) {
          setVideoOpacity(video.currentTime / 0.5);
        } else if (remaining < 0.5) {
          setVideoOpacity(remaining / 0.5);
        } else {
          setVideoOpacity(1);
        }
      }
      frameId = requestAnimationFrame(handleLoop);
    };

    const onEnded = () => {
      setVideoOpacity(0);
      setTimeout(() => {
        if (video) {
          video.currentTime = 0;
          video.play().catch(() => {});
        }
      }, 100);
    };

    video.addEventListener('ended', onEnded);
    frameId = requestAnimationFrame(handleLoop);

    return () => {
      video?.removeEventListener('ended', onEnded);
      cancelAnimationFrame(frameId);
    };
  }, []);

  useEffect(() => {
    if (prompt.toLowerCase().includes('coffee')) {
      setSelectedSystem('cafe');
      setCurrentTalk("Aroma detected. Roasting a premium brand identity...");
    } else if (prompt.length > 80) {
      setCurrentTalk("Analyzing high-density intent. Complex vision detected. Optimizing neural nodes for strategic depth.");
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
      <div className="absolute inset-0 z-0 bg-black">
        <video
          ref={videoRef}
          src={VIDEO_URL}
          muted
          autoPlay
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ 
            opacity: videoOpacity, 
            transition: 'opacity 0.2s ease-in-out',
            filter: 'brightness(1.1) contrast(1.1) saturate(1.2)' 
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-80" />
      </div>

      <nav className="fixed top-0 left-0 right-0 z-[100] p-8 lg:px-12 flex justify-between items-center bg-black/5 backdrop-blur-2xl border-b border-white/5">
        <div className="flex items-center gap-4 group cursor-pointer" onClick={() => router.push('/')}>
          <BloomLogo size={36} className="group-hover:rotate-180 transition-transform duration-1000" />
          <span className="text-3xl font-headline italic tracking-tighter text-white drop-shadow-2xl">Bloom Studio®</span>
        </div>
        <div className="flex items-center gap-10">
           <div className="hidden md:flex items-center gap-12 text-[11px] font-bold uppercase tracking-[0.5em] text-white/60">
             <button className="hover:text-white transition-colors">Workspace</button>
             <button className="hover:text-white transition-colors">Registry</button>
             <button className="hover:text-white transition-colors">Intelligence</button>
           </div>
           <Button 
            onClick={() => router.push('/')}
            className="text-[#DCFF00] hover:text-white text-[11px] font-bold uppercase tracking-[0.5em] border border-[#DCFF00]/40 rounded-full px-8 py-3 bg-[#DCFF00]/5 hover:bg-[#DCFF00]/10 transition-all active:scale-95 shadow-[0_0_20px_rgba(220,255,0,0.2)]"
           >
             Terminate Session
           </Button>
        </div>
      </nav>

      <main className="relative z-20 flex flex-col items-center justify-center min-h-screen px-6 pt-32 pb-40 text-center">
        <AnimatePresence mode="wait">
          {(step === 'prompt' || step === 'choice') && (
            <motion.div 
              key="prompt"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, filter: "blur(20px)" }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-7xl flex flex-col items-center"
            >
              <div className="space-y-8 mb-16 animate-fade-rise">
                <h2 className="text-6xl md:text-9xl font-headline italic tracking-tighter leading-[0.85] text-white text-glow drop-shadow-2xl">
                  Beyond silence, we <br />
                  <span className="text-white/40 not-italic italic">build the eternal.</span>
                </h2>
                <p className="text-xl text-white/70 font-light max-w-2xl mx-auto italic leading-relaxed animate-fade-rise-delay font-body">
                  Building platforms for brilliant minds and fearless makers. Through the noise, we craft digital havens for deep work and pure flows.
                </p>
              </div>
              
              <div className="w-full relative max-w-5xl animate-fade-rise-delay-2">
                <div className="relative overflow-hidden rounded-[4rem] bg-black/60 border border-white/10 backdrop-blur-3xl min-h-[480px] shadow-[0_50px_100px_rgba(0,0,0,0.8)] transition-all hover:bg-black/70 hover:border-white/20 group">
                  <Textarea 
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe your vision (e.g., Luxury AI coffee for developers)..."
                    className="w-full min-h-[480px] bg-transparent border-none p-16 text-3xl lg:text-5xl focus:ring-0 focus-visible:ring-0 transition-all pr-[400px] no-scrollbar placeholder:text-white/30 font-medium leading-[1.1] text-white font-body"
                  />
                  
                  <div className="absolute bottom-12 right-12 flex flex-col items-end z-30 max-w-[380px]">
                    <AnimatePresence mode="wait">
                      <motion.div 
                        key={currentTalk}
                        initial={{ opacity: 0, x: 20, y: 10 }}
                        animate={{ opacity: 1, x: 0, y: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="bg-black/95 backdrop-blur-3xl border border-[#DCFF00]/50 px-8 py-6 rounded-[2.5rem] mb-8 w-full shadow-[0_0_50px_rgba(0,0,0,0.9)] relative overflow-visible"
                      >
                        <div className="flex items-center gap-3 mb-3 shrink-0">
                          <div className="w-2.5 h-2.5 rounded-full bg-[#DCFF00] animate-pulse shadow-[0_0_15px_#DCFF00]" />
                          <span className="text-[11px] uppercase tracking-widest font-bold text-[#DCFF00] font-body">Neural Node Active</span>
                        </div>
                        <p className="text-[14px] text-white font-medium italic leading-relaxed block font-body break-words whitespace-normal">
                          "{currentTalk}"
                        </p>
                        <div className="absolute -bottom-2 right-12 w-4 h-4 bg-black/95 border-r border-b border-[#DCFF00]/50 rotate-45" />
                      </motion.div>
                    </AnimatePresence>
                    
                    <div className="w-80 h-96 overflow-hidden relative rounded-[3rem] bg-black/50 border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.8)] group-hover:scale-105 transition-transform duration-700">
                      <div className="absolute inset-0 h-[480px] w-full">
                        <InteractiveRobotSpline 
                          scene={SCISSOR_SCENE} 
                          className="w-full h-full scale-[0.9] translate-y-12" 
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-10">
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    {DEFAULT_SUGGESTIONS.map((s, i) => (
                      <button 
                        key={i}
                        onClick={() => setPrompt(s)}
                        className="bg-white/10 border border-white/20 px-8 py-4 rounded-full text-[10px] text-white/80 uppercase tracking-[0.4em] font-bold hover:text-[#DCFF00] hover:border-[#DCFF00]/60 hover:bg-[#DCFF00]/20 transition-all active:scale-95 hover:tracking-[0.5em] font-body shadow-xl"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                  <Button 
                    onClick={handleDeriveDNA}
                    disabled={!prompt.trim() || step === 'deriving'}
                    className="bg-white text-black hover:bg-[#DCFF00] transition-all rounded-full px-20 h-24 flex items-center gap-8 font-bold uppercase tracking-[0.4em] shadow-[0_0_80px_rgba(220,255,0,0.4)] active:scale-95 group text-lg bloom-button-glow font-body"
                  >
                    <Wand2 size={28} className="group-hover:rotate-12 transition-transform" /> 
                    Establish Neural Link
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {(step === 'deriving' || step === 'orchestrating') && (
            <motion.div 
              key="loading"
              initial={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              className="flex flex-col items-center justify-center min-h-[65vh] text-center"
            >
              <div className="mb-20 relative">
                <div className="absolute inset-0 bg-[#DCFF00]/20 blur-[120px] animate-pulse rounded-full" />
                <BloomLogo size={200} />
              </div>
              <h3 className="text-7xl md:text-8xl font-headline italic text-white mb-8 tracking-tighter animate-pulse text-glow leading-none">
                {step === 'deriving' ? 'Extracting Design DNA...' : 'Orchestrating Experience...'}
              </h3>
              <p className="text-[#DCFF00] uppercase tracking-[1em] text-[14px] font-bold mb-20 opacity-80 font-body">FounderOS Intelligence Core Active</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
                 {[
                   { label: "Neural Pacing", icon: Activity, desc: "Synchronizing motion tokens" },
                   { label: "Visual Tokenization", icon: Palette, desc: "Deriving high-contrast hierarchy" },
                   { label: "Hierarchy Validation", icon: Layers, desc: "Anti-slop logic processing" },
                   { label: "Prompt Reasoning", icon: Brain, desc: "DeepSeek-V3 intent analysis" }
                 ].map((node, i) => (
                   <motion.div 
                     key={i}
                     initial={{ opacity: 0, y: 15 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: i * 0.2 }}
                     className="flex items-center gap-6 p-8 rounded-[2.5rem] bg-white/[0.08] border border-white/20 hover:bg-white/[0.12] hover:border-white/30 transition-all text-left group shadow-2xl backdrop-blur-3xl"
                   >
                      <div className="w-16 h-16 rounded-3xl bg-[#DCFF00]/20 flex items-center justify-center border border-[#DCFF00]/40 shadow-inner group-hover:scale-110 transition-transform">
                         <node.icon size={28} className="text-[#DCFF00]" />
                      </div>
                      <div className="font-body">
                        <span className="text-[12px] uppercase tracking-[0.2em] font-bold text-white block mb-1">{node.label}</span>
                        <span className="text-[10px] text-white/60 italic uppercase tracking-widest">{node.desc}</span>
                      </div>
                      <div className="ml-auto w-2 h-2 rounded-full bg-[#DCFF00] animate-ping" />
                   </motion.div>
                 ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <Dialog open={showChoice} onOpenChange={setShowChoice}>
          <DialogContent className="max-w-6xl bg-black/98 border-white/10 backdrop-blur-[100px] p-0 overflow-hidden rounded-[4rem] shadow-[0_0_200px_rgba(0,0,0,0.95)] border">
            <DialogTitle className="sr-only">Choose Materialization Path</DialogTitle>
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[720px]">
              <div className="p-16 lg:p-24 space-y-12 border-r border-white/5 relative overflow-hidden group flex flex-col justify-between">
                <div className="absolute inset-0 bg-white/[0.01] transition-all group-hover:bg-white/[0.03]" />
                <div className="relative z-10 space-y-8">
                   <div className="w-20 h-20 rounded-[2.5rem] bg-[#DCFF00]/10 flex items-center justify-center border border-[#DCFF00]/30 shadow-2xl group-hover:scale-110 transition-transform">
                      <Search className="text-[#DCFF00]" size={40} />
                   </div>
                   <h3 className="text-6xl font-headline italic text-white leading-none tracking-tighter">Research & <br/> Insight</h3>
                   <p className="text-white/70 text-2xl leading-relaxed font-light italic max-w-md tracking-tight font-body">
                      Evaluate your vision through a multi-billion dollar shark lens. Analyze market performance, risks, and viability before building.
                   </p>
                </div>
                
                <div className="relative z-10 space-y-10 pt-4">
                   <div className="flex items-center gap-4 text-white/50 text-[11px] font-bold uppercase tracking-[0.6em] font-body">
                      <Terminal size={18} /> Design System Core
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                      {Object.values(DESIGN_SYSTEMS).map(sys => (
                        <button 
                          key={sys.id}
                          onClick={() => setSelectedSystem(sys.id)}
                          className={cn(
                            "p-6 rounded-[2rem] border text-left transition-all relative overflow-hidden group/btn",
                            selectedSystem === sys.id 
                            ? "bg-[#DCFF00]/20 border-[#DCFF00]/70 shadow-[0_0_40px_rgba(220,255,0,0.3)]" 
                            : "bg-white/[0.05] border-white/20 hover:border-white/30 hover:bg-white/[0.08]"
                          )}
                        >
                           <span className={cn(
                             "text-[11px] font-bold uppercase tracking-[0.3em] block mb-2 font-body", 
                             selectedSystem === sys.id ? "text-[#DCFF00]" : "text-white"
                           )}>{sys.name}</span>
                           <span className="text-[10px] text-white/60 italic line-clamp-1 block uppercase tracking-tighter font-bold font-body">Inspiration: {sys.inspiration}</span>
                        </button>
                      ))}
                   </div>
                </div>

                <div className="relative z-10 pt-10">
                   <Button 
                    onClick={() => handleOrchestrate('research')} 
                    className="w-full h-24 rounded-[2.5rem] bg-white text-black font-bold uppercase tracking-[0.3em] hover:bg-[#DCFF00] transition-all group shadow-2xl text-xl bloom-button-glow font-body"
                   >
                      Initialize Strategic Audit <ArrowRight className="ml-6 w-8 h-8 group-hover:translate-x-3 transition-transform" />
                   </Button>
                </div>
              </div>

              <div className="p-16 lg:p-24 space-y-12 bg-white/[0.02] relative overflow-hidden group flex flex-col justify-between">
                <div className="absolute inset-0 bg-[#DCFF00]/[0.02] transition-all group-hover:bg-[#DCFF00]/[0.04]" />
                <div className="relative z-10 space-y-8">
                   <div className="w-20 h-20 rounded-[2.5rem] bg-white/10 flex items-center justify-center border border-white/20 shadow-2xl group-hover:scale-110 transition-transform">
                      <Palette className="text-white" size={40} />
                   </div>
                   <h3 className="text-6xl font-headline italic text-white leading-none tracking-tighter">Design & <br/> Materialize</h3>
                   <p className="text-white/70 text-2xl leading-relaxed font-light italic max-w-md tracking-tight font-body">
                      Orchestrate your vision into a premium, functional startup experience. Strictly derived from neural Design DNA tokens.
                   </p>
                </div>

                <div className="relative z-10 p-12 rounded-[3.5rem] bg-black/50 border border-white/10 space-y-8 shadow-inner">
                   <div className="flex items-center gap-4 text-white/50 text-[11px] font-bold uppercase tracking-[0.6em] font-body">
                      <Activity size={18} /> Derived Design DNA
                   </div>
                   <div className="space-y-8">
                      <div className="space-y-2">
                        <span className="text-[11px] uppercase tracking-widest text-[#DCFF00] font-bold block opacity-80 font-body">Neural Archetype</span>
                        <p className="text-3xl font-headline italic text-white leading-tight">{dna?.startupArchetype || "Analyzing..."}</p>
                      </div>
                      <div className="space-y-2">
                        <span className="text-[11px] uppercase tracking-widest text-[#DCFF00] font-bold block opacity-80 font-body">Motion Philosophy</span>
                        <p className="text-3xl font-headline italic text-white leading-tight">{dna?.designDNA?.motionPhilosophy || "Analyzing..."}</p>
                      </div>
                   </div>
                </div>

                <div className="relative z-10 pt-10">
                   <Button 
                    onClick={() => handleOrchestrate('design')} 
                    className="w-full h-24 rounded-[2.5rem] bg-white/10 border border-white/20 text-white font-bold uppercase tracking-[0.3em] hover:bg-white/20 transition-all group shadow-2xl backdrop-blur-3xl text-xl font-body"
                   >
                      Materialize Experience <ArrowRight className="ml-6 w-8 h-8 group-hover:translate-x-3 transition-transform" />
                   </Button>
                </div>
              </div>
            </div>
            <div className="p-10 bg-black/80 border-t border-white/10 flex items-center justify-between px-20">
               <div className="flex items-center gap-6">
                  <div className="w-3 h-3 rounded-full bg-[#DCFF00] animate-pulse shadow-[0_0_20px_#DCFF00]" />
                  <span className="text-[12px] uppercase tracking-[0.5em] font-bold text-white/90 italic font-body">
                    Neural Identity Sync Complete: "{dna?.startupArchetype}"
                  </span>
               </div>
               <button onClick={() => setShowChoice(false)} className="text-[11px] uppercase tracking-[0.6em] font-bold text-white/60 hover:text-[#DCFF00] transition-all hover:tracking-[0.8em] font-body">Abort Sequence</button>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
