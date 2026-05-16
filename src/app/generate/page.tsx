
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BackgroundEffects } from "@/components/cinematic/BackgroundEffects";
import { motion, AnimatePresence } from "framer-motion";
import { InteractiveRobotSpline } from "@/components/ui/interactive-3d-robot";
import { Entropy } from "@/components/ui/entropy";
import { Brain, Cpu, Database, Network, Search, Zap, Code, Shield, Layers } from "lucide-react";

const SCISSOR_SCENE = "https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode";

const insights = [
  "FounderOS orchestrates high-density layout nodes in real-time.",
  "Neural positioning sequence: Scaffolding complete.",
  "Injecting conversion-optimized design DNA.",
  "Stabilizing grid nodes for enterprise responsiveness.",
  "AI creative team coordinating brand archetypes.",
  "Materializing cinematic interaction pathways.",
  "Training motion choreography for high-end luxury.",
  "Validating startup hierarchy across neural clusters."
];

export default function GeneratePage() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [currentInsight, setCurrentInsight] = useState(0);
  const [stage, setStage] = useState(0);

  const stages = [
    { label: "Neural Transit", icon: Network },
    { label: "DNA Forge", icon: Brain },
    { label: "Layout Scaffolding", icon: Layers },
    { label: "Strategic Oracle", icon: Shield },
    { label: "Final Materialization", icon: Zap }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => router.push("/builder"), 1000);
          return 100;
        }
        return prev + 0.4;
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
    <div className="relative min-h-screen bg-black flex flex-col items-center justify-center overflow-hidden font-body">
      <BackgroundEffects />
      
      {/* SCISSOR NEURAL TRANSIT */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
         <motion.div 
           animate={{
             y: [0, -15, 0],
             rotate: [-1, 1, -1]
           }}
           transition={{
             duration: 3,
             repeat: Infinity,
             ease: "easeInOut"
           }}
           className="w-[1000px] h-[700px] opacity-80 scale-100 relative overflow-hidden"
         >
            <InteractiveRobotSpline 
              scene={SCISSOR_SCENE} 
              className="w-full h-full scale-[1.2] translate-y-16" 
            />
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
               <h3 className="text-[12px] uppercase tracking-[0.5em] font-bold text-white/30">AI Factory Sequence Active</h3>
               <p className="text-2xl font-headline italic text-white/90">Scissor is assembling the design neural network...</p>
            </div>
            <span className="text-6xl font-headline italic">{Math.floor(progress)}%</span>
         </div>
         
         <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden relative">
            <motion.div 
              className="h-full bg-white shadow-[0_0_50px_white]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
         </div>

         <div className="mt-16 min-h-[80px] flex items-start gap-8">
            <div className="w-14 h-14 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 shadow-2xl">
               <AnimatePresence mode="wait">
                  <motion.div
                    key={currentInsight}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.2 }}
                    className="text-white/60"
                  >
                    <Cpu size={28} />
                  </motion.div>
               </AnimatePresence>
            </div>
            <div className="space-y-3">
               <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/20">FounderOS Machine Stream</span>
               <AnimatePresence mode="wait">
                  <motion.p
                    key={currentInsight}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="text-lg text-white/50 italic leading-relaxed tracking-tight"
                  >
                    {insights[currentInsight]}
                  </motion.p>
               </AnimatePresence>
            </div>
         </div>
      </div>

      <div className="fixed top-20 right-20 opacity-20 pointer-events-none">
         <Entropy size={400} />
      </div>
    </div>
  );
}
