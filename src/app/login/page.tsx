"use client";

import { motion } from "framer-motion";
import { ArrowRight, User, Lock, Shield, Brain } from "lucide-react";
import { useRouter } from "next/navigation";
import { InteractiveRobotSpline } from "@/components/ui/interactive-3d-robot";
import { BackgroundEffects } from "@/components/cinematic/BackgroundEffects";
import { GradientBackground } from "@/components/ui/paper-design-shader-background";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { BloomLogo } from "@/components/cinematic/BloomLogo";

const SCISSOR_SCENE = "https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode";

export default function LoginPage() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen bg-black overflow-hidden flex flex-col selection:bg-[#DCFF00]/30 font-body text-white">
      {/* IMMERSIVE BACKGROUND STACK */}
      <BackgroundEffects />
      <GradientBackground />
      <BackgroundPaths />
      <div className="absolute inset-0 -z-10 bg-black/50 backdrop-blur-[2px]" />

      <nav className="relative z-50 px-12 py-10 flex justify-between items-center">
        <button onClick={() => router.push('/')} className="flex items-center gap-4 group">
          <BloomLogo size={40} className="group-hover:rotate-180 transition-transform duration-1000" />
          <span className="text-white font-bold text-3xl tracking-tighter italic drop-shadow-2xl">Bloom</span>
        </button>
        <div className="flex items-center gap-12">
          <button className="text-white/40 hover:text-white text-[11px] font-bold uppercase tracking-[0.5em] transition-all">Documentation</button>
          <button onClick={() => router.push('/signup')} className="text-[#DCFF00] hover:text-white text-[11px] font-bold uppercase tracking-[0.5em] transition-all drop-shadow-[0_0_10px_rgba(220,255,0,0.3)]">
            Initialize Account
          </button>
        </div>
      </nav>

      <main className="flex-1 flex items-center justify-center relative z-10 px-8">
        <div className="w-full max-w-[1200px] grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block relative"
          >
            <div className="aspect-[4/5] relative w-full overflow-hidden rounded-[5rem] bg-white/[0.02] border border-white/10 backdrop-blur-3xl group shadow-[0_50px_100px_rgba(0,0,0,0.6)]">
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-[1000px] w-full">
                    <InteractiveRobotSpline 
                      scene={SCISSOR_SCENE} 
                      className="w-full h-full scale-[1.2] translate-y-24" 
                    />
                  </div>
               </div>
               <div className="absolute bottom-16 left-12 right-12 p-12 bg-black/60 backdrop-blur-3xl rounded-[3rem] border border-white/10 shadow-2xl">
                  <div className="flex items-center gap-4 mb-6">
                    <Brain size={24} className="text-[#DCFF00] drop-shadow-[0_0_10px_rgba(220,255,0,0.5)]" />
                    <h3 className="text-3xl font-headline italic">Neural Link v3.8</h3>
                  </div>
                  <p className="text-lg text-white/60 leading-relaxed font-light italic">
                    Re-establishing secure connection to FounderOS Intelligence. Your strategic materializations are in hibernation mode.
                  </p>
               </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col space-y-16"
          >
            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <span className="text-[#DCFF00] text-[11px] font-bold uppercase tracking-[0.8em] flex items-center gap-3 drop-shadow-[0_0_10px_rgba(220,255,0,0.4)]">
                  <Shield size={14} /> Secure Gateway
                </span>
                <div className="h-px flex-1 bg-white/10" />
              </div>
              <h1 className="text-7xl lg:text-9xl font-headline italic tracking-tighter leading-[0.85] text-glow drop-shadow-2xl">
                Orchestrate your <br />
                <em className="italic text-white/30 not-italic">Next Vision.</em>
              </h1>
              <p className="text-white/50 text-2xl font-light leading-relaxed max-w-lg italic">
                Access the Design DNA Engine and simulate investor interviews with our Materialization Core.
              </p>
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <div className="bg-white/[0.04] rounded-[2rem] flex items-center px-8 h-24 group focus-within:bg-white/10 transition-all border border-white/10 hover:border-white/20 shadow-inner">
                  <User className="w-6 h-6 text-white/30 group-focus-within:text-[#DCFF00] transition-colors" />
                  <input 
                    type="email" 
                    placeholder="Registry Email" 
                    className="flex-1 bg-transparent border-none outline-none px-8 text-lg font-medium placeholder:text-white/10 text-white"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-white/[0.04] rounded-[2rem] flex items-center px-8 h-24 group focus-within:bg-white/10 transition-all border border-white/10 hover:border-white/20 shadow-inner">
                  <Lock className="w-6 h-6 text-white/30 group-focus-within:text-[#DCFF00] transition-colors" />
                  <input 
                    type="password" 
                    placeholder="Access Key" 
                    className="flex-1 bg-transparent border-none outline-none px-8 text-lg font-medium placeholder:text-white/10 text-white"
                  />
                </div>
              </div>
            </div>

            <div className="pt-6 flex flex-col space-y-10">
              <button 
                onClick={() => router.push('/workspace')}
                className="bg-white text-black hover:bg-[#DCFF00] transition-all rounded-full h-24 flex items-center justify-center gap-6 font-bold uppercase tracking-[0.4em] shadow-[0_0_80px_rgba(220,255,0,0.3)] group active:scale-95 text-lg"
              >
                Establish Neural Link <ArrowRight size={28} className="group-hover:translate-x-3 transition-transform" />
              </button>
              <div className="flex justify-between px-10">
                <button className="text-[11px] uppercase tracking-widest text-white/30 hover:text-white transition-colors font-bold">Key Recovery</button>
                <button onClick={() => router.push('/signup')} className="text-[11px] uppercase tracking-widest text-[#DCFF00] hover:underline underline-offset-8 font-bold">New Orchestrator Identity</button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      
      <footer className="p-20 border-t border-white/5 bg-black/60 backdrop-blur-3xl">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
            <p className="text-[11px] text-white/20 uppercase tracking-[0.8em] italic font-bold">Protocol v3.8 Stable // Bloom Neural Security Factory</p>
            <div className="flex gap-16 text-[11px] uppercase tracking-widest text-white/40 font-bold">
               <button className="hover:text-white transition-colors">Compliance</button>
               <button className="hover:text-white transition-colors">Privacy Node</button>
               <button className="hover:text-white transition-colors">Governance</button>
            </div>
         </div>
      </footer>
    </div>
  );
}
