
"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, ArrowRight, Instagram, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AboutSection } from "@/components/landing/AboutSection";
import { FeaturedVideoSection } from "@/components/landing/FeaturedVideoSection";
import { PhilosophySection } from "@/components/landing/PhilosophySection";
import { ServicesSection } from "@/components/landing/ServicesSection";

export default function AsmeLanding() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoOpacity, setVideoOpacity] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let animationFrame: number;
    let isFadingOut = false;

    const animateFade = (target: number, duration: number, callback?: () => void) => {
      const startOpacity = videoOpacity;
      const startTime = performance.now();

      const step = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = startOpacity + (target - startOpacity) * progress;
        setVideoOpacity(current);

        if (progress < 1) {
          animationFrame = requestAnimationFrame(step);
        } else if (callback) {
          callback();
        }
      };
      animationFrame = requestAnimationFrame(step);
    };

    const handleCanPlay = () => {
      video.play();
      animateFade(1, 500);
    };

    const handleTimeUpdate = () => {
      if (!isFadingOut && video.duration - video.currentTime <= 0.55) {
        isFadingOut = true;
        animateFade(0, 500);
      }
    };

    const handleEnded = () => {
      setVideoOpacity(0);
      setTimeout(() => {
        video.currentTime = 0;
        video.play();
        isFadingOut = false;
        animateFade(1, 500);
      }, 100);
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  const handleStart = () => {
    router.push('/workspace');
  };

  return (
    <div className="bg-black min-h-screen selection:bg-white/20">
      {/* SECTION 1 -- HERO */}
      <section className="min-h-screen relative flex flex-col overflow-hidden">
        <video
          ref={videoRef}
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_074625_a81f018a-956b-43fb-9aee-4d1508e30e6a.mp4"
          muted
          playsInline
          style={{ opacity: videoOpacity }}
          className="absolute inset-0 w-full h-full object-cover object-bottom z-0 transition-opacity duration-0"
        />

        {/* Navbar */}
        <nav className="relative z-20 px-6 py-6">
          <div className="liquid-glass rounded-full max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe size={24} className="text-white" />
              <span className="text-white font-semibold text-lg tracking-tight">Bloom</span>
              <div className="hidden md:flex items-center gap-8 ml-8">
                {["Features", "Pricing", "About"].map(link => (
                  <a key={link} href="#" className="text-white/80 hover:text-white text-sm font-medium transition-colors">
                    {link}
                  </a>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-white text-sm font-medium hover:text-white/80 transition-colors">
                Sign Up
              </button>
              <button className="liquid-glass rounded-full px-6 py-2 text-white text-sm font-medium hover:bg-white/5 transition-all">
                Login
              </button>
            </div>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center -translate-y-[12%]">
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-6xl md:text-7xl lg:text-8xl text-white tracking-tight font-serif mb-10 leading-[0.95]"
          >
            Materialize the <br /><em className="italic">unseen</em> vision.
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="max-w-xl w-full mb-8"
          >
            <div className="liquid-glass rounded-full pl-6 pr-2 py-2 flex items-center gap-3">
              <input 
                type="email"
                placeholder="Enter your email to start"
                className="flex-1 bg-transparent border-none text-white placeholder:text-white/40 focus:ring-0 focus:outline-none text-sm"
              />
              <button className="bg-white rounded-full p-3 text-black hover:bg-white/90 transition-all hover:scale-105 active:scale-95">
                <ArrowRight size={20} strokeWidth={2.5} />
              </button>
            </div>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="text-white text-sm leading-relaxed px-4 max-w-lg mb-10 opacity-60"
          >
            Harness the power of neural intelligence to architect, validate, and materialize your next venture with world-class precision and creative strategy.
          </motion.p>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
            <button 
              onClick={handleStart}
              className="liquid-glass rounded-full px-12 py-4 text-white text-sm font-bold uppercase tracking-widest hover:bg-white/5 transition-colors border-none"
            >
              Enter Neural Studio
            </button>
          </motion.div>
        </div>

        {/* Social Icons Footer */}
        <div className="relative z-10 flex justify-center gap-4 pb-12">
          {[Instagram, Twitter, Globe].map((Icon, i) => (
            <button key={i} className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all">
              <Icon size={20} />
            </button>
          ))}
        </div>
      </section>

      {/* ADDITIONAL SECTIONS */}
      <AboutSection />
      <FeaturedVideoSection />
      <PhilosophySection />
      <ServicesSection />
      
      {/* FINAL FOOTER */}
      <footer className="bg-black py-20 border-t border-white/5 text-center">
         <div className="max-w-5xl mx-auto px-6">
            <div className="font-serif text-4xl italic text-white/20 mb-4">Bloom</div>
            <p className="text-xs text-white/10 uppercase tracking-widest">Neural Materialization © 2026</p>
         </div>
      </footer>
    </div>
  );
}
