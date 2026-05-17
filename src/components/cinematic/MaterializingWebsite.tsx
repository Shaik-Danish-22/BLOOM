"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { 
  ArrowRight, 
  CheckCircle2,
  Zap,
  Box,
  Layout,
  MousePointer2
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { OrchestratedStartup } from "@/ai/flows/orchestrate-startup";
import { cn } from "@/lib/utils";
import { BloomLogo } from "@/components/cinematic/BloomLogo";
import { DESIGN_SYSTEMS, DesignSystemTokens } from "@/lib/design-systems";
import { SudokuBoard, SudokuBoardRef } from "@/components/games/sudoku-board";
import { TicTacToe } from "@/components/games/tic-tac-toe";
import { ScrollArea } from "@/components/ui/scroll-area";

interface MaterializingWebsiteProps {
  isVisible: boolean;
  data?: OrchestratedStartup | null;
  context?: any;
}

export function MaterializingWebsite({ isVisible, data, context }: MaterializingWebsiteProps) {
  const [stage, setStage] = useState<"wireframe" | "layout" | "content" | "final">("wireframe");
  const [startupData, setStartupData] = useState<OrchestratedStartup | null>(data || null);
  const [activePage, setActivePage] = useState<"home" | "features" | "pricing">("home");
  const sudokuRef = useRef<SudokuBoardRef>(null);

  useEffect(() => {
    if (data) {
      setStartupData(data);
    } else {
      const stored = localStorage.getItem("latest_startup");
      if (stored) {
        try {
          setStartupData(JSON.parse(stored));
        } catch (e) {
          console.error("Failed to parse startup data", e);
        }
      }
    }

    if (!isVisible) return;
    const timers = [
      setTimeout(() => setStage("layout"), 600),
      setTimeout(() => setStage("content"), 1400),
      setTimeout(() => setStage("final"), 2200),
    ];
    return () => timers.forEach(clearTimeout);
  }, [isVisible, data]);

  if (!isVisible || !startupData) return null;

  const systemId = context?.selectedSystem || 'apple';
  const system: DesignSystemTokens = DESIGN_SYSTEMS[systemId as any] || DESIGN_SYSTEMS.apple;
  
  // Dynamic background logic to ensure uniqueness and high quality
  const getThemeBg = () => {
    const prompt = (context?.prompt || "").toLowerCase();
    
    if (prompt.includes('car') || prompt.includes('auto')) {
      return 'linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%)';
    }
    if (prompt.includes('coffee') || prompt.includes('starbucks')) {
      return 'linear-gradient(180deg, #1A120B 0%, #3C2A21 100%)';
    }
    if (prompt.includes('bakery') || prompt.includes('pantry') || prompt.includes('bread')) {
      return 'linear-gradient(180deg, #FBFBF9 0%, #F5F5F1 100%)';
    }
    return system.tokens.bg;
  };

  const sections = startupData.content?.sections || [];
  const heroSection = sections.find(s => s.type === 'hero');
  const problemSection = sections.find(s => s.type === 'problem');
  const featuresSection = sections.find(s => s.type === 'features');
  const gameSection = sections.find(s => s.type === 'game');

  // Text color override for dark backgrounds if the system is light
  const isDarkBg = getThemeBg().includes('#0a0a0a') || getThemeBg().includes('#1A120B');
  const textColor = isDarkBg ? '#ffffff' : system.tokens.fg;
  const mutedColor = isDarkBg ? 'rgba(255,255,255,0.6)' : system.tokens.muted;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, filter: "blur(20px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <div 
      className={cn(
        "h-full w-full transition-all duration-[1500ms] relative selection:bg-white/10 flex flex-col overflow-hidden",
        stage === 'wireframe' && "grayscale opacity-20 blur-[80px]",
        stage === 'layout' && "grayscale opacity-40 blur-[40px]",
        stage === 'content' && "opacity-90 blur-[10px]"
      )} 
      style={{ background: getThemeBg(), color: textColor, fontFamily: system.tokens.fontBody }}
    >
      <nav className={cn("sticky top-0 left-0 right-0 z-[200] px-8 py-4 lg:px-12 flex justify-between items-center backdrop-blur-xl border-b", isDarkBg ? "border-white/5 bg-black/20" : "border-black/5 bg-white/20")}>
         <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-xl font-headline italic tracking-tighter flex items-center gap-3 cursor-pointer group" onClick={() => setActivePage('home')}>
            <BloomLogo size={24} />
            <span className="font-bold tracking-tight">{startupData.brand?.companyName || "BLOOM"}</span>
         </motion.div>
         <div className="hidden lg:flex items-center gap-10 text-[9px] font-bold uppercase tracking-[0.4em]" style={{ color: mutedColor }}>
            {['Vision', 'Intelligence', 'Access'].map((label, i) => (
              <button key={label} onClick={() => setActivePage(['home', 'features', 'pricing'][i] as any)} className="transition-all hover:opacity-100 opacity-60">{label}</button>
            ))}
         </div>
         <Button className="rounded-full px-6 h-10 text-[9px] font-bold uppercase tracking-[0.2em]" style={{ backgroundColor: system.tokens.accent, color: system.tokens.accentOn, borderRadius: system.tokens.radiusPill }}>Initialize</Button>
      </nav>

      <ScrollArea className="flex-1">
        <main className="pb-32">
          <AnimatePresence mode="wait">
            {activePage === 'home' && (
              <motion.div key="home" variants={containerVariants} initial="hidden" animate="visible" className="space-y-0">
                {/* Hero Section */}
                <section className="px-6 py-32 lg:py-48 text-center relative flex flex-col items-center justify-center min-h-[70vh]">
                   <div className="space-y-10 relative z-10 max-w-6xl">
                      <motion.h2 variants={itemVariants} className="text-5xl md:text-7xl lg:text-[7rem] italic leading-[0.9] tracking-tighter font-headline text-glow" style={{ fontWeight: 300 }}>
                        {heroSection?.title || "Vision Materialized."}
                      </motion.h2>
                      <motion.p variants={itemVariants} className="text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto font-light leading-relaxed italic opacity-80" style={{ color: mutedColor }}>
                        {heroSection?.subtitle || startupData.brand?.tagline}
                      </motion.p>
                      <motion.div variants={itemVariants} className="pt-8">
                         <Button className="h-16 px-12 rounded-full text-sm font-bold uppercase tracking-widest shadow-2xl" style={{ backgroundColor: system.tokens.accent, color: system.tokens.accentOn }}>
                            {heroSection?.ctaLabel || "Get Started"}
                         </Button>
                      </motion.div>
                   </div>
                </section>

                {/* Game Section (Sudoku / Tic Tac Toe) */}
                {gameSection && (
                  <section className="py-24 flex flex-col items-center bg-black/10 backdrop-blur-3xl my-16 rounded-[4rem] mx-6">
                    <div className="max-w-3xl w-full text-center space-y-6 mb-16">
                       <span className="text-[10px] uppercase tracking-[1em] font-bold opacity-40 block" style={{ color: system.tokens.accent }}>Interactive Node</span>
                       <h3 className="text-3xl md:text-5xl font-headline italic tracking-tighter">{gameSection.title}</h3>
                       <p className="text-base opacity-60 italic max-w-xl mx-auto">{gameSection.subtitle}</p>
                    </div>
                    {gameSection.gameConfig?.type === 'sudoku' ? (
                      <div className="space-y-10 flex flex-col items-center">
                        <SudokuBoard 
                          ref={sudokuRef}
                          initialBoard={gameSection.gameConfig.initialBoard || Array(9).fill(Array(9).fill(null))} 
                          system={system}
                          delay={400}
                        />
                        <Button 
                          onClick={() => sudokuRef.current?.solve()}
                          className="rounded-full px-10 h-14 bg-white text-black font-bold uppercase tracking-[0.2em] hover:bg-[#DCFF00] transition-all shadow-xl"
                        >
                           <Zap className="mr-3 w-4 h-4 fill-current" /> AI Auto-Solve
                        </Button>
                      </div>
                    ) : (
                      <TicTacToe system={system} />
                    )}
                  </section>
                )}

                {/* Problem & Features Section */}
                <section className="px-6 lg:px-16 py-32">
                   <div className="max-w-7xl mx-auto space-y-24">
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                         <motion.div variants={itemVariants} className="lg:col-span-7 h-[500px] lg:h-[600px] p-12 lg:p-16 flex flex-col justify-end relative overflow-hidden group shadow-2xl" style={{ borderRadius: system.tokens.radiusLg }}>
                            <div className="absolute inset-0 z-0 grayscale opacity-40 group-hover:scale-105 transition-transform duration-1000">
                               <Image 
                                 src={`https://picsum.photos/seed/${startupData.brand?.companyName}/1200/800`} 
                                 alt="Concept" 
                                 fill 
                                 className="object-cover"
                                 data-ai-hint={context?.prompt?.includes('car') ? 'luxury car' : context?.prompt?.includes('coffee') ? 'espresso' : 'bakery bread'}
                               />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                            <div className="space-y-4 relative z-10">
                               <h4 className="text-3xl lg:text-5xl font-headline italic leading-none tracking-tighter text-white">{problemSection?.title}</h4>
                               <p className="text-base lg:text-xl font-light italic opacity-80 max-w-xl leading-relaxed text-white/80">{problemSection?.subtitle}</p>
                            </div>
                         </motion.div>
                         
                         <motion.div variants={itemVariants} className="lg:col-span-5 bg-white/[0.03] border border-white/5 p-12 rounded-[3.5rem] flex flex-col justify-center gap-8 backdrop-blur-3xl shadow-xl">
                            <div className="flex items-center gap-4 text-[#DCFF00]">
                               <Layout size={20} />
                               <h5 className="text-[10px] uppercase tracking-[0.4em] font-bold opacity-50">Neural Advantage</h5>
                            </div>
                            <div className="space-y-8">
                               {(featuresSection?.items || []).slice(0, 4).map((item: string, i: number) => (
                                 <div key={i} className="space-y-3 group cursor-pointer">
                                    <div className="w-6 h-px bg-[#DCFF00]/40 group-hover:w-12 transition-all duration-500" />
                                    <p className="text-lg lg:text-2xl font-headline italic opacity-90 group-hover:opacity-100 group-hover:translate-x-2 transition-all">{item}</p>
                                 </div>
                               ))}
                            </div>
                         </motion.div>
                      </div>
                   </div>
                </section>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </ScrollArea>
    </div>
  );
}
