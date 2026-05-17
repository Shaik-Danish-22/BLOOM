"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BackgroundEffects } from "@/components/cinematic/BackgroundEffects";
import { motion, AnimatePresence } from "framer-motion";
import { InteractiveRobotSpline } from "@/components/ui/interactive-3d-robot";
import { Network, Brain, Layers, Shield, Zap, Cpu, CheckCircle2 } from "lucide-react";
import { GradientBackground } from "@/components/ui/paper-design-shader-background";

const SCISSOR_SCENE = "https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode";

const insights = [
  "Spotting AI opportunities for organization-wide productivity.",
  "Building structures to multiply team efficiencies.",
  "Driving culture change and securing cross-department buy-in.",
  "Delivering pilots that prove impact with measurable results.",
  "Materializing personal AI Transformation roadmap.",
  "Optimizing data strategy and responsible governance layers."
];

export default function GeneratePage() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [currentInsight, setCurrentInsight] = useState(0);
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
          setTimeout(() => router.push("/builder"), 1000);
          return 100;
        }
        return prev + 0.65; // Faster progress
      });
    }, 40);

    const insightTimer = setInterval(() => {
      setCurrentInsight(prev => (prev + 1) % insights.length);
    }, 3200);

    return () => {
      clearInterval(timer);
      clearInterval(insightTimer);
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
      <div className="absolute inset-0 -z-10 bg-black/20" />
      
      <div className="absolute top-12 left-12 z-[100] flex flex-col">
        <span className="text-[28px] font-headline tracking-tight text-white/90 leading-none">Bloom Forge</span>
        <span className="text-[10px] tracking-[0.3em] font-medium text-white/40 mt-1 uppercase">NEURAL x MATERIALIZATION</span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative z-10 px-6">
        <div className="mb-8 relative w-[300px] h-[340px] overflow-hidden rounded-[3rem] bg-white/[0.02] border border-white/5 backdrop-blur-3xl group shadow-2xl">
           <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-[480px] w-full">
                <InteractiveRobotSpline 
                  scene={SCISSOR_SCENE} 
                  className="w-full h-full scale-[0.85] translate-y-6" 
                />
              </div>
           </div>
           <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-[#DCFF00] text-black px-4 py-1.5 rounded-full shadow-[0_0_20px_rgba(220,255,0,0.3)]">
              <span className="text-[10px] font-bold uppercase tracking-widest">Node 0{stage + 1}</span>
           </div>
        </div>

        <div className="text-center max-w-2xl mb-12">
          <AnimatePresence mode="wait">
            <motion.h2 
              key={stage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-[46px] font-headline italic tracking-tight leading-[1.05] mb-4"
            >
              {currentStageData.label}: {currentStageData.desc}
            </motion.h2>
          </AnimatePresence>
          <p className="text-[#83837D] text-lg font-light italic">
            {insights[currentInsight]}
          </p>
        </div>

        <div className="w-full max-w-[640px] space-y-4">
           {stages.map((s, i) => (
             <div 
               key={i} 
               className={`flex items-center justify-between p-6 rounded-2xl border transition-all duration-700 ${
                 i === stage 
                 ? 'bg-white/[0.03] border-[#DCFF00]/30 shadow-[0_0_30px_rgba(220,255,0,0.05)]' 
                 : i < stage ? 'bg-white/[0.01] border-white/5 opacity-40' : 'bg-transparent border-white/5 opacity-10'
               }`}
             >
                <div className="flex items-center gap-5">
                   <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                     i <= stage ? 'bg-[#DCFF00] text-black' : 'bg-white/5 text-white/20'
                   }`}>
                      {i + 1}
                   </div>
                   <div>
                      <h4 className={`text-sm font-bold uppercase tracking-widest ${i === stage ? 'text-white' : 'text-white/40'}`}>
                        {s.label}
                      </h4>
                      <p className="text-[10px] text-white/20 uppercase tracking-tighter mt-1">{s.desc}</p>
                   </div>
                </div>
                {i < stage && <CheckCircle2 className="text-[#DCFF00] w-5 h-5" />}
                {i === stage && <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}><Cpu className="text-[#DCFF00] w-5 h-5" /></motion.div>}
             </div>
           ))}
        </div>
      </div>

      <div className="p-12 bg-[#080808] border-t border-white/5 flex items-center justify-between relative z-20">
         <div className="flex items-center gap-6 flex-1 max-w-4xl">
            <span className="text-[52px] font-headline italic text-white/90 leading-none">{Math.floor(progress)}%</span>
            <div className="h-1 flex-1 bg-white/5 rounded-full overflow-hidden relative">
               <motion.div 
                 className="h-full bg-[#DCFF00] shadow-[0_0_20px_rgba(220,255,0,0.5)]"
                 initial={{ width: 0 }}
                 animate={{ width: `${progress}%` }}
                 transition={{ duration: 0.1 }}
               />
            </div>
         </div>
         <div className="flex items-center gap-4 ml-12">
            <div className="w-1.5 h-1.5 rounded-full bg-[#DCFF00] animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/20">Neural Sequence Active</span>
         </div>
      </div>
    </div>
  );
}
