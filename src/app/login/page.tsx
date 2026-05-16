
"use client";

import { motion } from "framer-motion";
import { Globe, ArrowRight, User, Lock, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { InteractiveRobotSpline } from "@/components/ui/interactive-3d-robot";
import { BackgroundEffects } from "@/components/cinematic/BackgroundEffects";
import ShaderBackground from "@/components/ui/shader-background";

const SCISSOR_SCENE = "https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode";

export default function LoginPage() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen bg-black overflow-hidden flex flex-col selection:bg-white/20 font-body text-white">
      <BackgroundEffects />
      <ShaderBackground />

      <nav className="relative z-50 px-8 py-8 flex justify-between items-center">
        <button onClick={() => router.push('/')} className="flex items-center gap-2">
          <Globe size={24} className="text-white" />
          <span className="text-white font-semibold text-lg tracking-tight">Bloom</span>
        </button>
        <button onClick={() => router.push('/signup')} className="text-white/40 hover:text-white text-xs font-bold uppercase tracking-widest transition-all">
          Create Account
        </button>
      </nav>

      <main className="flex-1 flex items-center justify-center relative z-10 px-6">
        <div className="w-full max-w-[1000px] grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block relative"
          >
            <div className="aspect-square relative w-full h-[600px] overflow-hidden rounded-[4rem] bg-white/[0.02] border border-white/5 backdrop-blur-3xl group">
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-[800px] w-full">
                    <InteractiveRobotSpline 
                      scene={SCISSOR_SCENE} 
                      className="w-full h-full scale-[1] translate-y-12" 
                    />
                  </div>
               </div>
               <div className="absolute bottom-12 left-12 right-12 p-8 liquid-glass-strong rounded-3xl">
                  <h3 className="text-2xl font-headline italic mb-2">Welcome Back.</h3>
                  <p className="text-sm text-white/40 leading-relaxed">Neural link is ready for re-establishment. Your Bloom workspace is currently in deep hibernation.</p>
               </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col space-y-12"
          >
            <div className="space-y-4">
              <span className="text-[#DCFF00] text-[10px] font-bold uppercase tracking-[0.4em] flex items-center gap-2">
                <Sparkles size={12} /> Bloom Studio Login
              </span>
              <h1 className="text-5xl lg:text-7xl font-headline italic tracking-tighter leading-none">Access your <br /><em className="italic text-white/40">Materializations.</em></h1>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <div className="liquid-glass rounded-2xl flex items-center px-6 h-16 group focus-within:bg-white/5 transition-all">
                  <User className="w-5 h-5 text-white/20 group-focus-within:text-white transition-colors" />
                  <input 
                    type="email" 
                    placeholder="Email Address" 
                    className="flex-1 bg-transparent border-none outline-none px-4 text-sm font-medium placeholder:text-white/10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="liquid-glass rounded-2xl flex items-center px-6 h-16 group focus-within:bg-white/5 transition-all">
                  <Lock className="w-5 h-5 text-white/20 group-focus-within:text-white transition-colors" />
                  <input 
                    type="password" 
                    placeholder="Access Key" 
                    className="flex-1 bg-transparent border-none outline-none px-4 text-sm font-medium placeholder:text-white/10"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-col space-y-6">
              <button 
                onClick={() => router.push('/workspace')}
                className="liquid-glass-strong bg-white text-black hover:bg-[#DCFF00] transition-colors rounded-full h-16 flex items-center justify-center gap-4 font-bold uppercase tracking-widest shadow-2xl group active:scale-95"
              >
                Establish Link <ArrowRight size={20} />
              </button>
              <div className="flex justify-between px-2">
                <button className="text-[10px] uppercase tracking-widest text-white/20 hover:text-white transition-colors">Forgot Key?</button>
                <button onClick={() => router.push('/signup')} className="text-[10px] uppercase tracking-widest text-[#DCFF00] hover:underline">New Identity?</button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      
      <footer className="p-12 text-center">
         <p className="text-[10px] text-white/10 uppercase tracking-[0.5em] italic">Bloom Security Protocol v2.5 Stable</p>
      </footer>
    </div>
  );
}
