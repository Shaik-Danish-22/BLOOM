
"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { BackgroundEffects } from "@/components/cinematic/BackgroundEffects";
import { ArrowRight, Sparkles, Zap, Cpu, Layers, Shield } from "lucide-react";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function LandingPage() {
  const router = useRouter();

  const handleStart = () => {
    router.push("/generate");
  };

  return (
    <div className="relative min-h-screen bg-background text-white overflow-x-hidden selection:bg-white/20">
      <BackgroundEffects />
      
      {/* FULLSCREEN BACKGROUND VIDEO */}
      <div className="fixed inset-0 w-full h-full z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-60"
        >
          <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background" />
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
          {["Neural Team", "Protocols", "Journal", "Access"].map((item, i) => (
            <motion.button 
              key={item}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors"
            >
              {item}
            </motion.button>
          ))}
        </div>

        <motion.button 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={handleStart}
          className="liquid-glass rounded-full px-8 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] text-foreground hover:scale-[1.03] transition-all active:scale-95 shadow-2xl"
        >
          Begin Materialization
        </motion.button>
      </nav>

      {/* HERO CONTENT */}
      <main className="relative z-10 flex flex-col items-center justify-center text-center px-6 min-h-[calc(100vh-120px)]">
        <div className="max-w-6xl space-y-12">
          <motion.div 
            {...fadeUp(0.2)}
            className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-white/5 bg-white/[0.02] text-[10px] uppercase tracking-[0.4em] font-bold text-white/40"
          >
            <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
            FounderOS Intelligence v2.5
          </motion.div>

          <motion.h1 
            {...fadeUp(0.4)}
            className="text-5xl sm:text-7xl md:text-9xl leading-[0.9] tracking-[-0.04em] font-headline font-normal text-foreground"
          >
            Describe it. <br />
            <em className="not-italic text-muted-foreground">Watch it materialize.</em>
          </motion.h1>

          <motion.p 
            {...fadeUp(0.6)}
            className="text-muted-foreground text-lg sm:text-2xl max-w-3xl mx-auto leading-relaxed font-light"
          >
            The end of templates. The birth of materialization. <br className="hidden md:block" />
            From a single sentence to a live startup architecture in seconds.
          </motion.p>

          <motion.div 
            {...fadeUp(0.8)}
            className="flex flex-col md:flex-row items-center justify-center gap-6 pt-8"
          >
            <button
              onClick={handleStart}
              className="liquid-glass rounded-full px-16 py-7 text-lg font-bold uppercase tracking-[0.2em] text-foreground hover:scale-[1.03] transition-all active:scale-95 cursor-pointer shadow-[0_0_60px_rgba(255,255,255,0.1)] group"
            >
              Initialize Build <ArrowRight className="inline-block ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-10 py-7 text-xs font-bold uppercase tracking-[0.3em] text-white/40 hover:text-white transition-colors">
              Watch Demo
            </button>
          </motion.div>
        </div>
      </main>

      {/* FEATURE MATERIALIZATION SECTION */}
      <section className="relative z-10 max-w-7xl mx-auto px-8 py-40 grid grid-cols-1 md:grid-cols-3 gap-10">
         {[
           { icon: Cpu, title: "Neural Logic", desc: "Autonomous positioning and audience analysis." },
           { icon: Layers, title: "Forge Design", desc: "Materializing high-end visual identity systems." },
           { icon: Shield, title: "Oracle Strategy", desc: "Investor-grade analytics and conversion scoring." }
         ].map((feature, i) => (
           <motion.div 
             key={i}
             {...fadeUp(0.2 * i)}
             className="liquid-glass p-12 rounded-[48px] border border-white/5 space-y-6 group cursor-pointer hover:border-white/10 transition-colors"
           >
             <div className="w-16 h-16 rounded-[24px] bg-white/5 border border-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                <feature.icon className="w-6 h-6 text-white/40 group-hover:text-white transition-colors" />
             </div>
             <h3 className="text-2xl font-headline italic text-white">{feature.title}</h3>
             <p className="text-white/20 font-light leading-relaxed">{feature.desc}</p>
           </motion.div>
         ))}
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 p-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-bold">
          Siteforge AI — Neural Startup Materialization
        </div>
        <div className="flex gap-8 text-[10px] uppercase tracking-[0.3em] text-white/20 font-bold">
          <span>FounderOS v2.5 Stable</span>
          <span className="text-white/40 hover:text-white cursor-pointer transition-colors">Privacy</span>
          <span className="text-white/40 hover:text-white cursor-pointer transition-colors">Terms</span>
        </div>
      </footer>
    </div>
  );
}
