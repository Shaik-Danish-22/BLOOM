"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { 
  ArrowRight, 
  Menu, 
  Download, 
  Sparkles, 
  Wand2, 
  BookOpen, 
  Twitter, 
  Linkedin, 
  Instagram,
  Plus
} from "lucide-react";
import Image from "next/image";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function BloomLanding() {
  const router = useRouter();

  const handleStart = () => {
    router.push('/workspace');
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden flex selection:bg-white/20">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="fixed inset-0 w-full h-full object-cover z-0 grayscale"
      >
        <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260315_073750_51473149-4350-4920-ae24-c8214286f323.mp4" type="video/mp4" />
      </video>
      <div className="fixed inset-0 bg-black/40 z-0" />

      {/* Main Content Grid */}
      <div className="relative z-10 flex flex-row w-full min-h-screen">
        
        {/* Left Panel: Bloom Hero */}
        <div className="w-full lg:w-[52%] relative flex p-4 lg:p-6">
          <div className="liquid-glass-strong w-full h-full rounded-[2rem] flex flex-col p-8 lg:p-12">
            {/* Nav */}
            <nav className="flex items-center justify-between w-full mb-auto">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 relative rounded-full overflow-hidden">
                   <Image src="https://picsum.photos/seed/bloom/64/64" fill alt="Logo" className="object-cover" />
                </div>
                <span className="text-2xl font-semibold tracking-tighter text-white">bloom</span>
              </div>
              <button className="liquid-glass px-6 py-2 rounded-full flex items-center gap-2 text-white/80 hover:scale-105 transition-all">
                <Menu size={18} />
                <span className="text-sm font-medium">Menu</span>
              </button>
            </nav>

            {/* Hero Center */}
            <div className="flex-1 flex flex-col items-center justify-center text-center max-w-2xl mx-auto space-y-12">
              <motion.div {...fadeUp(0.1)} className="w-20 h-20 relative rounded-2xl overflow-hidden shadow-2xl">
                 <Image src="https://picsum.photos/seed/bloom-hero/160/160" fill alt="Hero Logo" className="object-cover" />
              </motion.div>
              
              <motion.h1 
                {...fadeUp(0.3)}
                className="text-5xl lg:text-7xl leading-[1.05] tracking-tight text-white"
              >
                Innovating the <br /> 
                <span className="font-serif text-white/80">spirit of bloom AI</span>
              </motion.h1>

              <motion.div {...fadeUp(0.5)}>
                <button 
                  onClick={handleStart}
                  className="liquid-glass-strong bg-white/5 px-10 py-4 rounded-full flex items-center gap-4 text-white hover:scale-105 active:scale-95 transition-all shadow-xl"
                >
                  <span className="font-medium">Explore Now</span>
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <Download size={16} />
                  </div>
                </button>
              </motion.div>

              <motion.div {...fadeUp(0.7)} className="flex flex-wrap justify-center gap-3">
                {["Artistic Gallery", "AI Generation", "3D Structures"].map(pill => (
                  <span key={pill} className="liquid-glass px-5 py-2 rounded-full text-[11px] text-white/80 tracking-widest uppercase font-semibold">
                    {pill}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Bottom Quote */}
            <div className="mt-auto space-y-6">
              <span className="text-[10px] tracking-[0.4em] uppercase text-white/50 font-bold block">Visionary Design</span>
              <div className="flex items-center gap-6">
                <div className="h-px w-12 bg-white/20" />
                <p className="text-lg lg:text-xl text-white/90">
                  <span className="font-display">We imagined a realm </span>
                  <span className="font-serif">with no ending.</span>
                </p>
                <div className="h-px flex-1 bg-white/20" />
              </div>
              <p className="text-[10px] tracking-[0.3em] font-bold text-white/40 uppercase">Marcus Aurelio</p>
            </div>
          </div>
        </div>

        {/* Right Panel: Ecosystem (Desktop Only) */}
        <div className="hidden lg:flex w-[48%] flex-col p-6 space-y-6">
          <header className="flex justify-end gap-4">
            <div className="liquid-glass px-6 py-2 rounded-full flex items-center gap-5">
              {[Twitter, Linkedin, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="text-white/60 hover:text-white transition-colors">
                  <Icon size={16} />
                </a>
              ))}
              <div className="w-px h-4 bg-white/10" />
              <ArrowRight size={16} className="text-white/40" />
            </div>
            <button className="liquid-glass w-12 h-12 rounded-full flex items-center justify-center text-white hover:scale-105 transition-all">
              <Sparkles size={20} />
            </button>
          </header>

          <div className="flex-1 flex flex-col gap-6">
             <div className="liquid-glass p-8 rounded-[2.5rem] w-64 self-end">
                <h4 className="text-white font-medium mb-3">Enter our ecosystem</h4>
                <p className="text-white/40 text-sm leading-relaxed">Join 20k+ creators architecting the future of plant intelligence.</p>
             </div>

             <div className="mt-auto liquid-glass rounded-[2.5rem] p-10 flex flex-col gap-8">
                <div className="grid grid-cols-2 gap-6">
                   <div className="liquid-glass-strong bg-white/[0.02] p-8 rounded-[2rem] space-y-4 hover:scale-[1.02] transition-transform cursor-pointer">
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                        <Wand2 size={18} className="text-white/60" />
                      </div>
                      <h5 className="font-medium text-white">Processing</h5>
                      <p className="text-xs text-white/30">Real-time neural rendering of complex botanical meshes.</p>
                   </div>
                   <div className="liquid-glass-strong bg-white/[0.02] p-8 rounded-[2rem] space-y-4 hover:scale-[1.02] transition-transform cursor-pointer">
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                        <BookOpen size={18} className="text-white/60" />
                      </div>
                      <h5 className="font-medium text-white">Growth Archive</h5>
                      <p className="text-xs text-white/30">Historical documentation of AI-synthesized species.</p>
                   </div>
                </div>

                <div className="liquid-glass-strong bg-white/[0.02] p-6 rounded-[2rem] flex items-center gap-6 group hover:bg-white/[0.05] transition-all cursor-pointer">
                   <div className="w-24 h-16 relative rounded-xl overflow-hidden shrink-0">
                      <Image src="https://picsum.photos/seed/flower-sculpt/200/150" fill alt="Flower" className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                   </div>
                   <div className="flex-1">
                      <h5 className="font-medium text-white">Advanced Plant Sculpting</h5>
                      <p className="text-xs text-white/30">Modify structural integrity with AI.</p>
                   </div>
                   <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
                      <Plus size={20} />
                   </button>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
