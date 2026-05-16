"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BackgroundEffects } from "@/components/cinematic/BackgroundEffects";
import { motion, AnimatePresence } from "framer-motion";
import { InteractiveRobotSpline } from "@/components/ui/interactive-3d-robot";
import { Brain, Cpu, Database, Network, Search, Zap, Code, Shield, Layers } from "lucide-react";
import { generateStartupIdea } from "@/ai/flows/generate-startup-idea";

const SCISSOR_SCENE = "https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode";

const insights = [
  "Orchestrating high-density layout nodes.",
  "Neural positioning sequence: online.",
  "Injecting conversion-optimized DNA.",
  "Stabilizing grid nodes for enterprise.",
  "AI creative team coordinating brand.",
  "Materializing cinematic interactions.",
  "Training motion choreography.",
  "Validating startup hierarchy."
];

export default function GeneratePage() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [currentInsight, setCurrentInsight] = useState(0);
  const [stage, setStage] = useState(0);

  const stages = [
    { label: "Transit", icon: Network },
    { label: "Forge", icon: Brain },
    { label: "Scaffold", icon: Layers },
    { label: "Oracle", icon: Shield },
    { label: "Result", icon: Zap }
  ];

  useEffect(() => {
    // Neural materialization flow
    const materialize = async () => {
      const stored = localStorage.getItem("materialization_context");
      if (!stored) {
        router.push("/workspace");
        return;
      }
      const context = JSON.parse(stored);
      
      try {
        const result = await generateStartupIdea({
          startupIdea: context.prompt,
          designDNA: context.enhancedData?.designDNA
        });
        localStorage.setItem("latest_startup", JSON.stringify(result));
      } catch (e) {
        console.error("Materialization failed", e);
      }
    };

    materialize();

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => router.push("/builder"), 1000);
          return 100;
        }
        return prev + 0.3;
      });
    }, 40);

    const insightTimer = setInterval(() => {
      setCurrentInsight(prev => (prev + 1) % insights.length);
    }, 3500);

    return () => {
      clearInterval(timer);
      clearInterval(insightTimer);
    };
  }, [router]);

  useEffect(() => {
    setStage(Math.floor((progress / 100) * stages.length));
  }, [progress]);

  return (
    <div className="relative min-h-screen bg-black flex flex-col items-center justify-center overflow-hidden font-body text-white">
      <BackgroundEffects />
      
      {/* SCISSOR NEURAL TRANSIT */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
         <motion.div 
           animate={{
             y: [0, -10, 0],
           }}
           transition={{
             duration: 3,
             repeat: Infinity,
             ease: "easeInOut"
           }}
           className="w-[800px] h-[600px] opacity-80 scale-100 relative overflow-hidden flex items-center justify-center"
         >
            <div className="absolute inset-0 h-[120%] w-full">
              <InteractiveRobotSpline 
                scene={SCISSOR_SCENE} 
                className="w-full h-full scale-[1.1] translate-y-8" 
              />
            </div>
         </motion.div>
      </div>

      {/* STAGE HUD */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 flex gap-8 z-50">
         {stages.map((s, i) => (
           <div key={i} className="flex flex-col items-center gap-4 group">
              <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center transition-all duration-700 ${
                i <= stage ? 'bg-white text-black border-white shadow-[0_0_40px_rgba(255,255,255,0.5)]' : 'bg-white/5 text-white/20 border-white/5'
              }`}>
                <s.icon size={22} className={i === stage ? 'animate-pulse' : ''} />
              </div>
              <span className={`text-[9px] uppercase tracking-[0.4em] font-bold transition-all duration-700 ${
                i <= stage ? 'text-white' : 'text-white/10'
              }`}>{s.label}</span>
           </div>
         ))}
      </div>

      <div className="absolute bottom-32 w-full max-w-4xl px-20 z-50">
         <div className="flex justify-between items-end mb-8">
            <div className="space-y-3">
               <h3 className="text-[12px] uppercase tracking-[0.5em] font-bold text-white/30">Neural Sequence Active</h3>
               <p className="text-2xl font-headline italic text-white/90">SCISSOR is assembling your network...</p>
            </div>
            <span className="text-6xl font-headline italic">{Math.floor(progress)}%</span>
         </div>
         
         <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden relative">
            <motion.div 
              className="h-full bg-white shadow-[0_0_50px_white]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
         </div>

         <div className="mt-12 flex items-start gap-8">
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
               <AnimatePresence mode="wait">
                  <motion.div
                    key={currentInsight}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.2 }}
                  >
                    <Cpu size={24} className="text-white/40" />
                  </motion.div>
               </AnimatePresence>
            </div>
            <div className="space-y-2">
               <span className="text-[9px] uppercase tracking-[0.4em] font-bold text-white/20">Machine Stream</span>
               <AnimatePresence mode="wait">
                  <motion.p
                    key={currentInsight}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-lg text-white/50 italic"
                  >
                    {insights[currentInsight]}
                  </motion.p>
               </AnimatePresence>
            </div>
         </div>
      </div>
    </div>
  );
}
