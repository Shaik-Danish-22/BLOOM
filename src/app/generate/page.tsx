
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BackgroundEffects } from "@/components/cinematic/BackgroundEffects";
import { motion, AnimatePresence } from "framer-motion";
import { InteractiveRobotSpline } from "@/components/ui/interactive-3d-robot";
import { Entropy } from "@/components/ui/entropy";
import { Brain, Cpu, Database, Network, Search, Zap } from "lucide-react";

const SISSOR_SCENE = "https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode";

const insights = [
  "Neural networks often require millions of parameters to identify a single object.",
  "FounderOS orchestrates high-density layout nodes in real-time.",
  "Large Language Models leverage transformers to maintain contextual memory.",
  "Machine Learning is the bridge between raw data and creative intent.",
  "Neural construction requires stabilizing grid nodes at the atomic level.",
  "AI Agents coordinate to balance design logic and aesthetic motion."
];

export default function GeneratePage() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [currentInsight, setCurrentInsight] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => router.push("/builder"), 1000);
          return 100;
        }
        return prev + 0.5;
      });
    }, 40);

    const insightTimer = setInterval(() => {
      setCurrentInsight(prev => (prev + 1) % insights.length);
    }, 4000);

    return () => {
      clearInterval(timer);
      clearInterval(insightTimer);
    };
  }, [router]);

  return (
    <div className="relative min-h-screen bg-black flex flex-col items-center justify-center overflow-hidden">
      <BackgroundEffects />
      
      {/* SISSOR CLIMBING SIMULATION */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
         <motion.div 
           animate={{
             y: [0, -10, 0],
             rotate: [-1, 1, -1]
           }}
           transition={{
             duration: 2,
             repeat: Infinity,
             ease: "easeInOut"
           }}
           className="w-[800px] h-[800px] opacity-80 scale-100"
         >
            <InteractiveRobotSpline 
              scene={SISSOR_SCENE} 
              className="w-full h-full scale-[1.3] translate-y-12" 
            />
         </motion.div>
      </div>

      <div className="absolute bottom-32 w-full max-w-2xl px-12 z-50">
         <div className="flex justify-between items-end mb-6">
            <div className="space-y-1">
               <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/40">Neural Materialization</h3>
               <p className="text-sm font-headline italic text-white/80">SISSOR is traversing the design architecture...</p>
            </div>
            <span className="text-4xl font-headline italic">{Math.floor(progress)}%</span>
         </div>
         
         <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden relative">
            <motion.div 
              className="h-full bg-white shadow-[0_0_30px_white]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
         </div>

         <div className="mt-12 min-h-[60px] flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
               <AnimatePresence mode="wait">
                  <motion.div
                    key={currentInsight}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.2 }}
                  >
                    <Brain className="w-5 h-5 text-white/40" />
                  </motion.div>
               </AnimatePresence>
            </div>
            <div className="space-y-2">
               <span className="text-[8px] uppercase tracking-widest font-bold text-white/20">Machine Intelligence Insight</span>
               <AnimatePresence mode="wait">
                  <motion.p
                    key={currentInsight}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-xs text-white/40 italic leading-relaxed"
                  >
                    {insights[currentInsight]}
                  </motion.p>
               </AnimatePresence>
            </div>
         </div>
      </div>

      <div className="fixed top-12 right-12 opacity-20 pointer-events-none">
         <Entropy size={300} />
      </div>
    </div>
  );
}
