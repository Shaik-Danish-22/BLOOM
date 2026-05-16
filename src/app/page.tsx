
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowRight, Sparkles, Command, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SplineScene } from "@/components/ui/spline-scene";
import { Spotlight } from "@/components/ui/spotlight";
import { BackgroundEffects } from "@/components/cinematic/BackgroundEffects";

const placeholders = [
  "Build a futuristic AI coffee subscription for developers",
  "Create a luxury law firm website for tech founders",
  "Design a high-performance fitness platform for athletes",
  "Generate a cinematic portfolio for a top-tier designer",
  "Craft a next-gen fintech experience for digital nomads"
];

export default function LandingPage() {
  const router = useRouter();
  const [idea, setIdea] = useState("");
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIdx((prev) => (prev + 1) % placeholders.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const handleStart = () => {
    if (!idea.trim()) return;
    setIsRedirecting(true);
    sessionStorage.setItem("founder_idea", idea);
    setTimeout(() => {
      router.push("/generate");
    }, 1200);
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden flex flex-col">
      <BackgroundEffects />
      
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-8 h-8 rounded-full border-2 border-white/20 flex items-center justify-center overflow-hidden bg-white/5">
               <div className="w-4 h-4 rounded-full border border-white/40" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">Siteforge <span className="text-white/40 italic font-medium font-headline text-2xl">AI</span></span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/50">
            <span className="hover:text-white transition-colors cursor-pointer">Showcase</span>
            <span className="hover:text-white transition-colors cursor-pointer">Technology</span>
            <span className="hover:text-white transition-colors cursor-pointer">Pricing</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-white/60 hover:text-white cursor-pointer transition-colors">Login</span>
            <Button variant="outline" className="liquid-glass rounded-full border-white/10 text-[10px] uppercase tracking-widest font-bold h-9 hover:bg-white/5">
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      <main className="flex-1 flex flex-col md:flex-row items-center px-8 pt-32 md:pt-0">
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
        
        <div className="flex-1 z-10 space-y-10 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-[10px] uppercase tracking-[0.3em] font-bold text-white/60"
          >
            <Sparkles className="w-3.5 h-3.5 text-white animate-pulse" />
            <span>Powered by FounderOS Intelligence</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-7xl md:text-9xl font-headline leading-[0.85] tracking-tight text-white"
          >
            Describe it. <br />
            Watch it <span className="italic text-white/30">build.</span>
          </motion.h1>

          <motion.p 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2 }}
             className="text-lg md:text-2xl text-white/40 max-w-xl font-light leading-relaxed"
          >
            From one sentence to a live startup website in under 30 seconds. <span className="text-white/80">Premium, immersive, intelligent.</span>
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative max-w-2xl group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-white/20 to-transparent rounded-[32px] blur opacity-10 group-hover:opacity-30 transition duration-1000" />
            <div className="relative flex items-center p-2 liquid-glass rounded-[32px] border border-white/10 shadow-2xl">
              <Input
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleStart()}
                placeholder={placeholders[placeholderIdx]}
                className="bg-transparent border-none text-xl h-16 focus-visible:ring-0 placeholder:text-white/15 px-6"
              />
              <Button 
                onClick={handleStart}
                disabled={!idea.trim()}
                className="h-14 w-14 rounded-2xl bg-white text-black hover:bg-white/90 shrink-0 shadow-2xl transition-transform active:scale-95 disabled:opacity-50"
              >
                <ArrowRight className="w-7 h-7" />
              </Button>
            </div>
          </motion.div>
        </div>

        <div className="flex-1 w-full h-[600px] md:h-screen relative mt-12 md:mt-0">
          <SplineScene 
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
          <div className="absolute bottom-16 right-0 md:right-16 flex flex-col gap-4">
             {[
               { icon: Command, label: "AI Core", value: "Gemini 2.5 Flash" },
               { icon: Zap, label: "Latency", value: "42ms" }
             ].map((item, i) => (
               <div key={i} className="liquid-glass p-4 rounded-2xl border border-white/5 flex items-center gap-4 min-w-[180px]">
                 <div className="p-2 bg-white/5 rounded-lg">
                    <item.icon className="w-4 h-4 text-white/60" />
                 </div>
                 <div className="flex flex-col">
                   <span className="text-[10px] uppercase tracking-widest font-bold text-white/20">{item.label}</span>
                   <span className="text-xs font-medium text-white/60">{item.value}</span>
                 </div>
               </div>
             ))}
          </div>
        </div>
      </main>

      <AnimatePresence>
        {isRedirecting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center space-y-12"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative w-32 h-32"
            >
              <div className="absolute inset-0 border-2 border-white/5 rounded-full" />
              <div className="absolute inset-0 border-2 border-white/40 border-t-transparent rounded-full animate-spin" />
              <div className="absolute inset-4 border border-white/10 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              </div>
            </motion.div>
            <div className="text-center space-y-4">
              <motion.p
                 initial={{ y: 20, opacity: 0 }}
                 animate={{ y: 0, opacity: 1 }}
                 transition={{ delay: 0.2 }}
                 className="text-4xl font-headline italic text-white/80"
              >
                Syncing with FounderOS...
              </motion.p>
              <motion.p
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ delay: 0.4 }}
                 className="text-xs uppercase tracking-[0.4em] text-white/20 font-bold"
              >
                Neural session established
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
