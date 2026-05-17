"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, User, Lock, Shield, Brain, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { BackgroundEffects } from "@/components/cinematic/BackgroundEffects";
import { GradientBackground } from "@/components/ui/paper-design-shader-background";
import { BloomLogo } from "@/components/cinematic/BloomLogo";
import { InteractiveRobotSpline } from "@/components/ui/interactive-3d-robot";

const VIDEO_URL = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4";
const SCISSOR_SCENE = "https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode";

export default function LoginPage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoOpacity, setVideoOpacity] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let frameId: number;
    const handleLoop = () => {
      if (video.duration) {
        const remaining = video.duration - video.currentTime;
        if (video.currentTime < 0.5) {
          setVideoOpacity(video.currentTime / 0.5);
        } else if (remaining < 0.5) {
          setVideoOpacity(remaining / 0.5);
        } else {
          setVideoOpacity(1);
        }
      }
      frameId = requestAnimationFrame(handleLoop);
    };

    const onEnded = () => {
      setVideoOpacity(0);
      setTimeout(() => {
        if (video) {
          video.currentTime = 0;
          video.play().catch(() => {});
        }
      }, 100);
    };

    video.addEventListener('ended', onEnded);
    frameId = requestAnimationFrame(handleLoop);

    return () => {
      video?.removeEventListener('ended', onEnded);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-black overflow-hidden flex flex-col selection:bg-[#DCFF00]/30 font-body text-white">
      <div className="absolute inset-0 z-0 bg-black">
        <video
          ref={videoRef}
          src={VIDEO_URL}
          muted
          autoPlay
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ 
            opacity: videoOpacity, 
            transition: 'opacity 0.1s linear',
            filter: 'brightness(0.6) contrast(1.1)' 
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
      </div>

      <BackgroundEffects />
      <GradientBackground />

      <nav className="relative z-50 px-12 py-10 flex justify-between items-center">
        <button onClick={() => router.push('/')} className="flex items-center gap-4 group">
          <BloomLogo size={40} className="group-hover:rotate-180 transition-transform duration-1000 shadow-2xl" />
          <span className="text-white font-bold text-3xl tracking-tighter italic drop-shadow-2xl font-headline">Bloom</span>
        </button>
        <div className="flex items-center gap-12">
          <button className="text-white/40 hover:text-white text-[11px] font-bold uppercase tracking-[0.5em] transition-all">Registry Node</button>
          <button onClick={() => router.push('/signup')} className="text-[#DCFF00] hover:text-white text-[11px] font-bold uppercase tracking-[0.5em] transition-all drop-shadow-[0_0_10px_rgba(220,255,0,0.3)]">
            Initialize Account
          </button>
        </div>
      </nav>

      <main className="flex-1 flex items-center justify-center relative z-20 px-8">
        <div className="w-full max-w-[1200px] grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block relative"
          >
            <div className="aspect-[4/5] relative w-full overflow-hidden rounded-[5rem] bg-white/[0.02] border border-white/10 backdrop-blur-3xl group shadow-[0_50px_100px_rgba(0,0,0,0.6)]">
               <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-[#DCFF00]/10 to-transparent opacity-20" />
                  <div className="absolute inset-0 flex items-center justify-center scale-[1.6] translate-y-20">
                    <InteractiveRobotSpline scene={SCISSOR_SCENE} />
                  </div>
               </div>
               
               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 1.5, duration: 0.8 }}
                 className="absolute bottom-16 right-16 z-30"
               >
                 <div className="bg-black/80 backdrop-blur-3xl border border-[#DCFF00]/30 p-8 rounded-[2.5rem] shadow-2xl max-w-[280px] relative">
                    <div className="flex items-center gap-3 mb-3">
                       <div className="w-2 h-2 rounded-full bg-[#DCFF00] animate-pulse" />
                       <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#DCFF00]">Neural Link Active</span>
                    </div>
                    <p className="text-[15px] font-headline italic text-white/95 leading-tight">
                       "DeepSeek-V3 reasoning nodes established. Awaiting vision injection."
                    </p>
                    <div className="absolute -top-2 right-12 w-4 h-4 bg-black/80 border-l border-t border-[#DCFF00]/30 rotate-45" />
                 </div>
               </motion.div>
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
              <h1 className="text-7xl lg:text-9xl font-headline italic tracking-tighter leading-[0.85] text-glow drop-shadow-2xl text-white">
                Orchestrate your <br />
                <em className="italic text-white/30 not-italic">Next Vision.</em>
              </h1>
              <p className="text-white/70 text-2xl font-light leading-relaxed max-w-lg italic font-body">
                Access the Design DNA Engine and simulate shark interviews with our Materialization Core.
              </p>
            </div>

            <div className="space-y-8 font-body">
              <div className="bg-white/[0.04] rounded-[2rem] flex items-center px-8 h-24 group focus-within:bg-white/10 transition-all border border-white/10 hover:border-white/20 shadow-inner">
                <User className="w-6 h-6 text-white/30 group-focus-within:text-[#DCFF00] transition-colors" />
                <input 
                  type="email" 
                  placeholder="Registry Email" 
                  className="flex-1 bg-transparent border-none outline-none px-8 text-lg font-medium placeholder:text-white/10 text-white"
                />
              </div>
              <div className="bg-white/[0.04] rounded-[2rem] flex items-center px-8 h-24 group focus-within:bg-white/10 transition-all border border-white/10 hover:border-white/20 shadow-inner">
                <Lock className="w-6 h-6 text-white/30 group-focus-within:text-[#DCFF00] transition-colors" />
                <input 
                  type="password" 
                  placeholder="Access Key" 
                  className="flex-1 bg-transparent border-none outline-none px-8 text-lg font-medium placeholder:text-white/10 text-white"
                />
              </div>
            </div>

            <div className="pt-6 flex flex-col space-y-10">
              <button 
                onClick={() => router.push('/workspace')}
                className="bg-white text-black hover:bg-[#DCFF00] transition-all rounded-full h-24 flex items-center justify-center gap-6 font-bold uppercase tracking-[0.4em] shadow-[0_0_80px_rgba(220,255,0,0.3)] group active:scale-95 text-lg bloom-button-glow font-body"
              >
                Establish Neural Link <ArrowRight size={28} className="group-hover:translate-x-3 transition-transform" />
              </button>
              <div className="flex justify-between px-10 font-body">
                <button className="text-[11px] uppercase tracking-widest text-white/30 hover:text-white transition-colors font-bold">Key Recovery</button>
                <button onClick={() => router.push('/signup')} className="text-[11px] uppercase tracking-widest text-[#DCFF00] hover:underline underline-offset-8 font-bold">New Orchestrator Identity</button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      
      <footer className="p-20 border-t border-white/5 bg-black/60 backdrop-blur-3xl mt-auto relative z-30 font-body">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
            <p className="text-[11px] text-white/20 uppercase tracking-[0.8em] italic font-bold">Protocol v4.2 Stable // Bloom Neural Security Factory</p>
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
