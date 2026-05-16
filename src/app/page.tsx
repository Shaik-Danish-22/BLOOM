"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BackgroundEffects } from "@/components/cinematic/BackgroundEffects";
import { ArrowRight, Sparkles, Send, Globe, Shield, Cpu, Zap } from "lucide-react";
import { Input } from "@/components/ui/input";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function LandingPage() {
  const router = useRouter();
  const [prompt, setPrompt] = useState("");

  const handleInitialize = () => {
    if (!prompt.trim()) return;
    localStorage.setItem("current_prompt", prompt);
    router.push("/generate");
  };

  return (
    <div className="relative min-h-screen bg-background text-white overflow-x-hidden selection:bg-white/20">
      <BackgroundEffects />
      
      {/* FULLSCREEN BACKGROUND VIDEO */}
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-60"
        >
          <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />
      </div>

      {/* NAVIGATION BAR */}
      <nav className="relative z-50 px-8 py-6 max-w-7xl mx-auto flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <span className="text-3xl tracking-tight font-headline text-foreground">
            Siteforge AI<sup className="text-[10px] ml-1 opacity-40 font-sans tracking-widest font-bold">OS</sup>
          </span>
        </motion.div>
        
        <div className="hidden md:flex items-center gap-10">
          {["Intelligence", "Protocols", "Ecosystem", "Access"].map((item, i) => (
            <motion.button 
              key={item}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="text-xs font-bold uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors"
            >
              {item}
            </motion.button>
          ))}
        </div>

        <motion.button 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={() => router.push("/generate")}
          className="liquid-glass rounded-full px-8 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] text-foreground hover:scale-[1.03] transition-all active:scale-95 shadow-2xl"
        >
          Sign In
        </motion.button>
      </nav>

      {/* HERO CONTENT */}
      <main className="relative z-10 flex flex-col items-center justify-center text-center px-6 min-h-[calc(100vh-120px)]">
        <div className="max-w-6xl space-y-16">
          <motion.div 
            {...fadeUp(0.2)}
            className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-white/5 bg-white/[0.02] text-[10px] uppercase tracking-[0.4em] font-bold text-white/40"
          >
            <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
            FounderOS Neural Engine v2.5 Stable
          </motion.div>

          <div className="space-y-6">
            <motion.h1 
              {...fadeUp(0.4)}
              className="text-6xl sm:text-8xl md:text-9xl leading-[0.9] tracking-[-0.04em] font-headline font-normal text-foreground"
            >
              Describe it. <br />
              <em className="not-italic text-white/40">Watch it materialize.</em>
            </motion.h1>

            <motion.p 
              {...fadeUp(0.6)}
              className="text-white/30 text-lg sm:text-2xl max-w-3xl mx-auto leading-relaxed font-light"
            >
              The era of manual builders is over. Experience the first neural <br className="hidden md:block" />
              materialization engine for high-end startup identities.
            </motion.p>
          </div>

          {/* NEURAL PROMPT INPUT */}
          <motion.div 
            {...fadeUp(0.8)}
            className="w-full max-w-3xl mx-auto group"
          >
            <div className="relative liquid-glass rounded-[40px] p-2 pr-4 flex items-center shadow-[0_0_80px_rgba(255,255,255,0.05)] border border-white/5 group-hover:border-white/20 transition-all duration-500">
              <div className="pl-8 text-white/20">
                <Sparkles className="w-6 h-6 animate-pulse" />
              </div>
              <input 
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleInitialize()}
                placeholder="Describe your vision (e.g. 'A futuristic AI coffee shop')..."
                className="flex-1 bg-transparent border-none focus:ring-0 text-lg py-8 px-6 placeholder:text-white/10 text-white font-light"
              />
              <button 
                onClick={handleInitialize}
                className="bg-white text-black h-16 w-16 rounded-[28px] flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-2xl"
              >
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
            
            <div className="mt-8 flex flex-wrap justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
               {["Cyberpunk SaaS", "Luxury Skincare", "Neural Fintech", "Industrial AI"].map((tag) => (
                 <button 
                   key={tag}
                   onClick={() => setPrompt(`A premium ${tag.toLowerCase()} website with cinematic animations.`)}
                   className="px-4 py-1.5 rounded-full border border-white/5 bg-white/[0.02] text-[9px] uppercase tracking-widest text-white/20 hover:text-white/60 hover:border-white/10 transition-all"
                 >
                   {tag}
                 </button>
               ))}
            </div>
          </motion.div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="relative z-10 p-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 bg-background">
        <div className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-bold">
          Siteforge AI — Neural Startup Materialization
        </div>
        <div className="flex gap-8 text-[10px] uppercase tracking-[0.3em] text-white/20 font-bold">
          <span>Neural Engine v2.5 Stable</span>
          <span className="text-white/40 hover:text-white cursor-pointer transition-colors">Documentation</span>
          <span className="text-white/40 hover:text-white cursor-pointer transition-colors">Access</span>
        </div>
      </footer>
    </div>
  );
}