"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BackgroundEffects } from "@/components/cinematic/BackgroundEffects";
import { motion, AnimatePresence } from "framer-motion";
import MountainVistaParallax from "@/components/ui/mountain-vista-bg";
import { Network, Brain, Layers, Shield, Zap, Cpu, CheckCircle2 } from "lucide-react";
import { GradientBackground } from "@/components/ui/paper-design-shader-background";

const bloomQuotes = [
  "Materializing the unseen vision.",
  "Intelligence Materialized.",
  "Orchestrating startup futures.",
  "Calculating Neural Pacing.",
  "Extracting Design DNA tokens.",
  "Synchronizing Sensory Branding.",
  "Validating Market Congestion."
];

export default function GeneratePage() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [currentQuote, setCurrentQuote] = useState(0);
  const [stage, setStage] = useState(0);

  const stages = [
    { label: "Transit", icon: Network, desc: "Neural link establishing" },
    { label: "Forge", icon: Brain, desc: "Brand DNA extraction" },
    { label: "Scaffold", icon: Layers, desc: "UI hierarchy assembly" },
    { label: "Oracle", icon: Shield, desc: "Viability validation" },
    { label: "Result", icon: Zap, desc: "Cinematic materialization" }
  ];

  useEffect(() => {
    const context = localStorage.getItem("materialization_context");
    const startup = localStorage.getItem("latest_startup");
    
    if (!context || !startup) {
      router.push("/workspace");
      return;
    }

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => router.push("/builder"), 1500);
          return 100;
        }
        return prev + 0.55; 
      });
    }, 40);

    const quoteTimer = setInterval(() => {
      setCurrentQuote(prev => (prev + 1) % bloomQuotes.length);
    }, 3500);

    return () => {
      clearInterval(timer);
      clearInterval(quoteTimer);
    };
  }, [router]);

  useEffect(() => {
    const calculatedStage = Math.floor((progress / 100) * stages.length);
    setStage(Math.min(calculatedStage, stages.length - 1));
  }, [progress, stages.length]);

  const currentStageData = stages[stage] || stages[stages.length - 1];

  return (
    <div className="relative min-h-screen bg-[#050505] flex flex-col overflow-hidden font-body text-white">
      <BackgroundEffects />
      <GradientBackground />
      <div className="absolute inset-0 -z-10 bg-black/40" />
      
      <div className="absolute top-12 left-12 z-[100] flex flex-col">
        <span className="text-[28px] font-headline tracking-tight text-white/90 leading-none">Bloom Forge</span>
        <span className="text-[10px] tracking-[0.3em] font-medium text-white/40 mt-1 uppercase">NEURAL x MATERIALIZATION</span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative z-10 px-6">
        <div className="mb-12 relative w-full max-w-4xl h-[400px] overflow-hidden rounded-[3rem] bg-white/[0.02] border border-white/10 backdrop-blur-3xl group shadow-[0_50px_100px_rgba(0,0,0,0.5)]">
           <MountainVistaParallax 
             title="" 
             subtitle="" 
           />
           <div className="absolute top-8 left-8 flex items-center gap-3 bg-black/40 backdrop-blur-xl border border-white/10 px-6 py-2.5 rounded-full">
              <div className="w-2 h-2 rounded-full bg-[#DCFF00] animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#DCFF00]">Neural Sequence Active</span>
           </div>
           <div className="absolute bottom-8 right-8 flex items-center gap-2 bg-[#DCFF00] text-black px-6 py-2 rounded-full shadow-[0_0_30px_rgba(220,255,0,0.4)]">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em]">Node 0{stage + 1}</span>
           </div>
        </div>

        <div className="text-center max-w-3xl mb-16">
          <AnimatePresence mode="wait">
            <motion.h2 
              key={stage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-6xl font-headline italic tracking-tighter leading-none mb-6 text-glow"
            >
              {currentStageData.label}: <span className="text-white/40 not-italic">{currentStageData.desc}</span>
            </motion.h2>
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.p 
              key={currentQuote}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              className="text-[#DCFF00] text-xl font-light italic tracking-tight"
            >
              "{bloomQuotes[currentQuote]}"
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="w-full max-w-[720px] grid grid-cols-5 gap-4">
           {stages.map((s, i) => (
             <div 
               key={i} 
               className={`flex flex-col items-center gap-4 transition-all duration-700 ${
                 i <= stage ? 'opacity-100' : 'opacity-20'
               }`}
             >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                  i === stage 
                  ? 'bg-[#DCFF00] text-black shadow-[0_0_30px_rgba(220,255,0,0.3)] scale-110' 
                  : i < stage ? 'bg-white/10 text-white' : 'bg-white/5 text-white/20'
                }`}>
                   <s.icon size={24} />
                </div>
                <span className={`text-[9px] font-bold uppercase tracking-widest text-center ${i === stage ? 'text-[#DCFF00]' : 'text-white/40'}`}>
                  {s.label}
                </span>
             </div>
           ))}
        </div>
      </div>

      <div className="p-12 bg-[#080808] border-t border-white/5 flex items-center justify-between relative z-20">
         <div className="flex items-center gap-8 flex-1 max-w-5xl mx-auto">
            <span className="text-[64px] font-headline italic text-white/90 leading-none min-w-[140px]">{Math.floor(progress)}%</span>
            <div className="h-1.5 flex-1 bg-white/5 rounded-full overflow-hidden relative">
               <motion.div 
                 className="h-full bg-[#DCFF00] shadow-[0_0_30px_rgba(220,255,0,0.6)]"
                 initial={{ width: 0 }}
                 animate={{ width: `${progress}%` }}
                 transition={{ duration: 0.1 }}
               />
            </div>
         </div>
      </div>
    </div>
  );
}
