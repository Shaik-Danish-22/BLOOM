"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function LandingPage() {
  const router = useRouter();
  const [isNavHovered, setIsNavHovered] = useState(false);

  const handleStart = () => {
    router.push("/generate");
  };

  return (
    <div className="relative min-h-screen bg-background text-white overflow-hidden selection:bg-white/20">
      {/* FULLSCREEN BACKGROUND VIDEO */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-background/30" />
      </div>

      {/* NAVIGATION BAR */}
      <nav className="relative z-50 px-8 py-6 max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-3xl tracking-tight font-headline text-foreground">
            Velorah<sup className="text-xs">®</sup>
          </span>
        </div>
        
        <div className="hidden md:flex items-center gap-10">
          <button className="text-sm font-medium text-foreground transition-colors">Home</button>
          <button className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Studio</button>
          <button className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">About</button>
          <button className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Journal</button>
          <button className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Reach Us</button>
        </div>

        <button 
          onClick={handleStart}
          className="liquid-glass rounded-full px-8 py-2.5 text-sm font-medium text-foreground hover:scale-[1.03] transition-transform active:scale-95"
        >
          Begin Journey
        </button>
      </nav>

      {/* HERO CONTENT */}
      <main className="relative z-10 flex flex-col items-center justify-center text-center px-6 min-h-[calc(100vh-180px)]">
        <div className="max-w-6xl space-y-12">
          <h1 className="text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-[-0.03em] font-headline font-normal text-foreground animate-fade-rise">
            Where dreams <em className="not-italic text-muted-foreground">rise</em> <br />
            <em className="not-italic text-muted-foreground">through the silence.</em>
          </h1>

          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed animate-fade-rise-delay">
            We're designing tools for deep thinkers, bold creators, and quiet rebels. 
            Amid the chaos, we build digital spaces for sharp focus and inspired work.
          </p>

          <div className="flex justify-center pt-8 animate-fade-rise-delay-2">
            <button
              onClick={handleStart}
              className="liquid-glass rounded-full px-16 py-6 text-lg font-medium text-foreground hover:scale-[1.03] transition-all active:scale-95 cursor-pointer shadow-2xl"
            >
              Begin Journey
            </button>
          </div>
        </div>
      </main>

      {/* FOOTER INFO */}
      <footer className="absolute bottom-8 left-8 right-8 z-10 flex justify-between items-center text-[10px] uppercase tracking-[0.3em] text-white/20 font-bold">
        <span>Siteforge AI — Neural Architecture</span>
        <span>FounderOS v2.5 Stable</span>
      </footer>
    </div>
  );
}