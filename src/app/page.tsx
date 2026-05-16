
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowRight, Sparkles, Zap, Command, Shield, Code, Cpu, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SplineScene } from "@/components/ui/spline-scene";
import { Spotlight } from "@/components/ui/spotlight";
import { BackgroundEffects } from "@/components/cinematic/BackgroundEffects";
import { useState } from "react";

export default function LandingPage() {
  const router = useRouter();
  const [idea, setIdea] = useState("");
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Section Opacity/Scale Transforms
  const heroOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(smoothProgress, [0, 0.15], [1, 0.8]);
  
  const oldWayOpacity = useTransform(smoothProgress, [0.15, 0.25, 0.35, 0.45], [0, 1, 1, 0]);
  const oldWayScale = useTransform(smoothProgress, [0.15, 0.25], [1.2, 1]);

  const agentsOpacity = useTransform(smoothProgress, [0.45, 0.55, 0.65, 0.75], [0, 1, 1, 0]);
  const materializeOpacity = useTransform(smoothProgress, [0.75, 0.85, 0.95, 1], [0, 1, 1, 1]);

  const handleStart = () => {
    if (!idea.trim()) return;
    sessionStorage.setItem("founder_idea", idea);
    router.push("/generate");
  };

  return (
    <div ref={containerRef} className="relative bg-black h-[600vh] text-white selection:bg-white/20">
      <BackgroundEffects />
      
      {/* FIXED NAV */}
      <nav className="fixed top-0 left-0 right-0 z-[100] px-8 py-6 mix-blend-difference">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-white animate-pulse" />
            </div>
            <span className="text-xl font-bold tracking-tighter uppercase italic">Siteforge</span>
          </div>
          <div className="flex items-center gap-6">
            <Button variant="ghost" className="text-white/40 hover:text-white text-xs uppercase tracking-widest font-bold">Showcase</Button>
            <Button className="liquid-glass rounded-full border-white/10 px-6 h-10 text-[10px] uppercase tracking-[0.2em] font-bold">Enter Founder Mode</Button>
          </div>
        </div>
      </nav>

      {/* SECTION 1: CINEMATIC HERO */}
      <motion.section 
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="fixed inset-0 z-10 flex flex-col items-center justify-center pointer-events-auto"
      >
        <Spotlight className="-top-40 left-0 md:left-60" fill="white" />
        <div className="absolute inset-0 z-0 opacity-40">
           <SplineScene 
             scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
             className="w-full h-full"
           />
        </div>
        
        <div className="relative z-10 text-center space-y-12 max-w-5xl px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-[10px] uppercase tracking-[0.3em] font-bold text-white/60"
          >
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span>Siteforge AI — The Neural Architecture</span>
          </motion.div>

          <h1 className="text-7xl md:text-[10rem] font-headline leading-[0.8] tracking-tight">
            Describe it. <br />
            Watch it <span className="italic text-white/20">materialize.</span>
          </h1>

          <p className="text-xl md:text-2xl text-white/40 max-w-xl mx-auto font-light leading-relaxed">
            The first AI startup team that builds <br /> <span className="text-white/80">premium, cinematic websites</span> in 30 seconds.
          </p>

          <div className="relative max-w-2xl mx-auto group">
            <div className="absolute -inset-1 bg-white/20 rounded-[32px] blur opacity-10 group-hover:opacity-20 transition duration-1000" />
            <div className="relative flex items-center p-2 liquid-glass rounded-[32px] border border-white/10 shadow-2xl">
              <Input
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleStart()}
                placeholder="What startup are we building today?"
                className="bg-transparent border-none text-xl h-16 focus-visible:ring-0 placeholder:text-white/10 px-6"
              />
              <Button 
                onClick={handleStart}
                disabled={!idea.trim()}
                className="h-14 w-14 rounded-2xl bg-white text-black hover:bg-white/90 shrink-0 shadow-2xl transition-transform active:scale-95 disabled:opacity-50"
              >
                <ArrowRight className="w-7 h-7" />
              </Button>
            </div>
          </div>
          
          <div className="pt-12 animate-bounce opacity-20">
            <p className="text-[10px] uppercase tracking-[0.5em] font-bold">Scroll to Begin</p>
          </div>
        </div>
      </motion.section>

      {/* SECTION 2: THE OLD WAY (CHAOS) */}
      <motion.section 
        style={{ opacity: oldWayOpacity, scale: oldWayScale }}
        className="fixed inset-0 z-20 flex items-center justify-center p-12 overflow-hidden"
      >
        <div className="max-w-4xl text-center space-y-12">
          <h2 className="text-5xl md:text-7xl font-headline italic text-white/80">The old way was broken.</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
             {[
               { icon: Code, label: "Messy Code" },
               { icon: Zap, label: "Slow Builders" },
               { icon: Shield, label: "Ugly Templates" },
               { icon: Command, label: "Infinite Stress" }
             ].map((item, i) => (
               <div key={i} className="liquid-glass p-8 rounded-3xl border border-white/5 space-y-4 opacity-40">
                 <item.icon className="w-8 h-8 text-white mx-auto" />
                 <p className="text-[10px] uppercase tracking-widest font-bold">{item.label}</p>
               </div>
             ))}
          </div>
          <div className="font-mono text-[10px] text-white/10 space-y-1 animate-pulse">
            <p>{">"} REJECTING LEGACY_FRAMEWORK...</p>
            <p>{">"} DELETING UGLY_TEMPLATE.CSS...</p>
            <p>{">"} BOOTSTRAPPING NEURAL_CORE...</p>
          </div>
        </div>
      </motion.section>

      {/* SECTION 3: THE AI TEAM */}
      <motion.section 
        style={{ opacity: agentsOpacity }}
        className="fixed inset-0 z-30 flex items-center justify-center"
      >
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl w-full px-8">
          {[
            { id: "sentinel", name: "Sentinel", role: "Market Intelligence", icon: Cpu },
            { id: "forge", name: "Forge", role: "Brand Architect", icon: Layers },
            { id: "atlas", name: "Atlas", role: "UI Designer", icon: Command },
            { id: "compass", name: "Compass", role: "GTM Strategist", icon: Zap },
            { id: "oracle", name: "Oracle", role: "Investor Analyst", icon: Shield },
            { id: "launch", name: "Launch", role: "Production Engine", icon: Sparkles },
          ].map((agent, i) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="liquid-glass p-10 rounded-[40px] border border-white/10 group hover:bg-white/5 transition-all"
            >
              <agent.icon className="w-12 h-12 mb-8 text-white/20 group-hover:text-white transition-colors" />
              <h4 className="text-xl font-bold mb-2">{agent.name}</h4>
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-bold">{agent.role}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* SECTION 4: MATERIALIZATION DEMO */}
      <motion.section 
        style={{ opacity: materializeOpacity }}
        className="fixed inset-0 z-40 flex items-center justify-center p-8 bg-black/40 backdrop-blur-3xl"
      >
        <div className="relative w-full max-w-6xl aspect-video rounded-[48px] border border-white/5 overflow-hidden shadow-2xl bg-zinc-950/80 p-12">
           <div className="absolute top-8 left-12 flex gap-2">
              <div className="w-3 h-3 rounded-full bg-white/20" />
              <div className="w-3 h-3 rounded-full bg-white/20" />
              <div className="w-3 h-3 rounded-full bg-white/20" />
           </div>
           
           <div className="h-full flex flex-col items-center justify-center text-center space-y-12">
              <div className="space-y-4">
                 <motion.h3 
                   animate={{ opacity: [0, 1, 0] }}
                   transition={{ duration: 2, repeat: Infinity }}
                   className="text-xs uppercase tracking-[1em] font-bold text-white/20"
                 >
                   Materializing Startup Website...
                 </motion.h3>
                 <div className="h-0.5 w-64 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      animate={{ x: [-256, 256] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      className="h-full w-32 bg-white shadow-[0_0_20px_rgba(255,255,255,0.5)]"
                    />
                 </div>
              </div>
              
              <div className="w-full max-w-4xl space-y-8">
                 <div className="h-12 w-full bg-white/5 rounded-2xl animate-pulse" />
                 <div className="grid grid-cols-2 gap-8">
                    <div className="h-64 w-full bg-white/5 rounded-[32px] animate-pulse" />
                    <div className="h-64 w-full bg-white/5 rounded-[32px] animate-pulse" />
                 </div>
              </div>
           </div>
           
           <div className="absolute bottom-12 left-12 right-12 flex justify-between items-center text-[10px] uppercase tracking-widest text-white/20 font-bold">
              <span>Status: Rendering Cinematic Assets</span>
              <span>FounderOS v2.5 Stable</span>
           </div>
        </div>
      </motion.section>

      {/* FINAL SECTION: YOUR STARTUP ALREADY EXISTS */}
      <section className="h-screen w-full" /> {/* Spacer */}
      <motion.section 
        className="h-screen flex flex-col items-center justify-center text-center space-y-12 px-8 z-50 relative"
      >
        <div className="space-y-6">
          <h2 className="text-7xl md:text-9xl font-headline tracking-tighter leading-[0.8]">
            Your startup <br /> <span className="italic">already exists.</span>
          </h2>
          <p className="text-2xl text-white/40 font-light">
            You just haven&apos;t generated it yet.
          </p>
        </div>
        
        <Button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="bg-white text-black px-12 h-16 rounded-full font-bold text-lg hover:bg-white/90 shadow-2xl transition-all"
        >
          Initialize Experience <ArrowRight className="ml-3" />
        </Button>
      </motion.section>
    </div>
  );
}
