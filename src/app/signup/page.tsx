
"use client";

import { motion } from "framer-motion";
import { ArrowRight, User, Mail, Shield, Sparkles, Target } from "lucide-react";
import { useRouter } from "next/navigation";
import { InteractiveRobotSpline } from "@/components/ui/interactive-3d-robot";
import { BackgroundEffects } from "@/components/cinematic/BackgroundEffects";
import ShaderBackground from "@/components/ui/shader-background";
import { GradientBackground } from "@/components/ui/paper-design-shader-background";
import { BloomLogo } from "@/components/cinematic/BloomLogo";

const SCISSOR_SCENE = "https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode";

export default function SignupPage() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen bg-black overflow-hidden flex flex-col selection:bg-white/20 font-body text-white">
      {/* IMMERSIVE BACKGROUND STACK */}
      <BackgroundEffects />
      <GradientBackground />
      <ShaderBackground />
      <div className="absolute inset-0 -z-10 bg-black/40 backdrop-blur-[2px]" />

      <nav className="relative z-50 px-8 py-8 flex justify-between items-center">
        <button onClick={() => router.push('/')} className="flex items-center gap-3 group">
          <BloomLogo size={28} className="group-hover:rotate-180 transition-transform duration-1000" />
          <span className="text-white font-semibold text-xl tracking-tight">Bloom</span>
        </button>
        <button onClick={() => router.push('/login')} className="text-white/40 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-all">
          Identity Established? Login
        </button>
      </nav>

      <main className="flex-1 flex items-center justify-center relative z-10 px-6">
        <div className="w-full max-w-[1100px] grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block relative order-2"
          >
            <div className="aspect-[4/5] relative w-full overflow-hidden rounded-[4rem] bg-white/[0.02] border border-white/5 backdrop-blur-3xl group shadow-2xl">
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-[900px] w-full">
                    <InteractiveRobotSpline 
                      scene={SCISSOR_SCENE} 
                      className="w-full h-full scale-[1.1] translate-y-20" 
                    />
                  </div>
               </div>
               <div className="absolute top-12 left-12 right-12 p-10 liquid-glass-strong rounded-[2.5rem] border border-white/10">
                  <div className="flex items-center gap-3 mb-4">
                    <Target size={18} className="text-[#DCFF00]" />
                    <h3 className="text-2xl font-headline italic">Strategic Identity</h3>
                  </div>
                  <p className="text-sm text-white/40 leading-relaxed font-light italic">
                    Initializing your Bloom Persona. This identity governs your Design DNA extractions and FounderOS strategic verdicts.
                  </p>
               </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col space-y-12 order-1"
          >
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="text-[#DCFF00] text-[10px] font-bold uppercase tracking-[0.4em] flex items-center gap-2">
                  <Sparkles size={12} /> Bloom Persona Creation
                </span>
                <div className="h-px flex-1 bg-white/5" />
              </div>
              <h1 className="text-6xl lg:text-8xl font-headline italic tracking-tighter leading-[0.9]">
                Claim your <br />
                <em className="italic text-white/30">Bloom Identity.</em>
              </h1>
              <p className="text-white/40 text-lg font-light leading-relaxed max-w-md italic">
                Join the elite orchestrators using Anti-Slop technology to build believable startup experiences.
              </p>
            </div>

            <div className="space-y-5">
              <div className="liquid-glass rounded-2xl flex items-center px-6 h-18 border border-white/5 hover:border-white/10 transition-all group focus-within:bg-white/5">
                <User className="w-5 h-5 text-white/20 group-focus-within:text-[#DCFF00] transition-colors" />
                <input type="text" placeholder="Full Name" className="flex-1 bg-transparent border-none outline-none px-6 text-sm font-medium placeholder:text-white/10" />
              </div>
              <div className="liquid-glass rounded-2xl flex items-center px-6 h-18 border border-white/5 hover:border-white/10 transition-all group focus-within:bg-white/5">
                <Mail className="w-5 h-5 text-white/20 group-focus-within:text-[#DCFF00] transition-colors" />
                <input type="email" placeholder="Registry Email" className="flex-1 bg-transparent border-none outline-none px-6 text-sm font-medium placeholder:text-white/10" />
              </div>
              <div className="liquid-glass rounded-2xl flex items-center px-6 h-18 border border-white/5 hover:border-white/10 transition-all group focus-within:bg-white/5">
                <Shield className="w-5 h-5 text-white/20 group-focus-within:text-[#DCFF00] transition-colors" />
                <input type="password" placeholder="Define Access Key" className="flex-1 bg-transparent border-none outline-none px-6 text-sm font-medium placeholder:text-white/10" />
              </div>
            </div>

            <div className="pt-4 flex flex-col space-y-8">
              <button 
                onClick={() => router.push('/workspace')}
                className="liquid-glass-strong bg-white text-black hover:bg-[#DCFF00] transition-all rounded-full h-20 flex items-center justify-center gap-4 font-bold uppercase tracking-[0.2em] shadow-[0_0_50px_rgba(220,255,0,0.3)] group active:scale-95"
              >
                Initialize Identity <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform" />
              </button>
              <div className="text-center">
                <p className="text-[10px] text-white/20 uppercase tracking-[0.4em] leading-relaxed italic">
                  By initializing, you agree to the <button className="text-[#DCFF00] hover:underline underline-offset-4">Bloom Governance Protocol</button> and <button className="text-[#DCFF00] hover:underline underline-offset-4">Materialization Terms</button>.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      
      <footer className="p-16 border-t border-white/5 bg-black/40 backdrop-blur-xl mt-auto">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-[10px] text-white/10 uppercase tracking-[0.5em] italic">Siteforge x Bloom Architecture // Premium Creation Tier</p>
            <div className="flex gap-12 text-[10px] uppercase tracking-widest text-white/20">
               <button className="hover:text-white transition-colors">Neural Policy</button>
               <button className="hover:text-white transition-colors">Factory SLA</button>
            </div>
         </div>
      </footer>
    </div>
  );
}
