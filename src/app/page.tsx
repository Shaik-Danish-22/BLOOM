"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowRight, Sparkles, Rocket, Zap, Globe, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BackgroundEffects } from "@/components/cinematic/BackgroundEffects";

const placeholders = [
  "Uber for private jets",
  "AI that writes legal contracts",
  "Solar-powered vertical farming",
  "Neural link for pet communication",
  "Airbnb for creative workspaces",
  "Hyper-personalized skincare via DNA"
];

export default function LandingPage() {
  const router = useRouter();
  const [idea, setIdea] = useState("");
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIdx((prev) => (prev + 1) % placeholders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleStart = () => {
    if (!idea.trim()) return;
    setIsRedirecting(true);
    // Use session storage to pass idea across page transitions without complex state management
    sessionStorage.setItem("founder_idea", idea);
    setTimeout(() => {
      router.push("/generate");
    }, 800);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
      <BackgroundEffects />

      <AnimatePresence>
        {!isRedirecting && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="z-10 w-full max-w-4xl text-center"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-semibold mb-8 backdrop-blur-md"
            >
              <Sparkles className="w-3 h-3" />
              <span>THE FUTURE OF STARTUP BUILDING IS HERE</span>
            </motion.div>

            {/* Headline */}
            <h1 className="font-headline text-6xl md:text-8xl lg:text-9xl mb-6 tracking-tight leading-[0.9] text-glow">
              Founder<span className="text-primary italic">OS</span>
            </h1>
            
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light leading-relaxed">
              Type your startup idea. Watch a world-class company materialize around it in seconds.
            </p>

            {/* Main Input Experience */}
            <div className="relative max-w-2xl mx-auto group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative flex flex-col md:flex-row gap-3 p-2 bg-black/40 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-2xl">
                <div className="relative flex-1">
                  <Input
                    value={idea}
                    onChange={(e) => setIdea(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleStart()}
                    placeholder={placeholders[placeholderIdx]}
                    className="h-14 bg-transparent border-none text-xl focus-visible:ring-0 placeholder:text-white/20 px-4"
                  />
                </div>
                <Button 
                  onClick={handleStart}
                  disabled={!idea.trim()}
                  className="h-14 px-8 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold text-lg transition-all duration-300 shadow-[0_0_20px_rgba(159,92,240,0.4)] group"
                >
                  Generate Company
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>

            {/* Features Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 opacity-40 hover:opacity-100 transition-opacity duration-500">
              <div className="flex flex-col items-center gap-2">
                <Shield className="w-6 h-6 text-primary" />
                <span className="text-xs uppercase tracking-widest font-semibold">Oracle Analysis</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Globe className="w-6 h-6 text-primary" />
                <span className="text-xs uppercase tracking-widest font-semibold">GTM Engine</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Zap className="w-6 h-6 text-primary" />
                <span className="text-xs uppercase tracking-widest font-semibold">Neural Branding</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Rocket className="w-6 h-6 text-primary" />
                <span className="text-xs uppercase tracking-widest font-semibold">Launch Strategy</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading Transition Overlay */}
      <AnimatePresence>
        {isRedirecting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-background z-50 flex flex-col items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-primary mb-4"
            >
              <Sparkles className="w-12 h-12 animate-pulse" />
            </motion.div>
            <motion.p
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-white font-headline text-3xl italic"
            >
              Initializing Forge...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
