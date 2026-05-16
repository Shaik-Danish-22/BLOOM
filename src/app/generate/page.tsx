"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CinematicLoader } from "@/components/cinematic/CinematicLoader";
import { BackgroundEffects } from "@/components/cinematic/BackgroundEffects";
import { motion, AnimatePresence } from "framer-motion";

export default function GeneratePage() {
  const router = useRouter();
  const [prompt, setPrompt] = useState("");

  useEffect(() => {
    const savedPrompt = localStorage.getItem("current_prompt");
    if (!savedPrompt) {
      router.push("/");
    } else {
      setPrompt(savedPrompt);
    }
  }, [router]);

  const handleComplete = () => {
    router.push("/builder");
  };

  return (
    <div className="relative min-h-screen bg-black flex flex-col items-center justify-center overflow-hidden">
      <BackgroundEffects />
      
      <div className="absolute top-12 left-12 z-[100] flex items-center gap-4">
        <div className="w-3 h-3 rounded-full bg-white animate-pulse" />
        <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/20">FounderOS Neural Session Active</span>
      </div>

      <AnimatePresence>
        <CinematicLoader onComplete={handleComplete} />
      </AnimatePresence>

      <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[100] text-center max-w-xl">
        <p className="text-[9px] uppercase tracking-[0.6em] text-white/10 font-bold mb-4">Initial Configuration Input</p>
        <div className="px-8 py-4 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-3xl text-xs text-white/20 font-light italic">
          "{prompt}"
        </div>
      </div>
    </div>
  );
}