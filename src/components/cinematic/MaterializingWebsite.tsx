
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

  const isDarkBg = getThemeBg().includes('#0a0a0a') || getThemeBg().includes('#1A120B');
  const textColor = isDarkBg ? '#ffffff' : system.tokens.fg;
  const mutedColor = isDarkBg ? 'rgba(255,255,255,0.6)' : system.tokens.muted;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 60, filter: "blur(30px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1.4, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <div 
      className={cn(
        "h-full w-full transition-all duration-[2000ms] relative selection:bg-white/10 flex flex-col overflow-hidden",
        stage === 'wireframe' && "grayscale opacity-20 blur-[100px]",
        stage === 'layout' && "grayscale opacity-40 blur-[50px]",
        stage === 'content' && "opacity-90 blur-[15px]"
      )} 
      style={{ background: getThemeBg(), color: textColor, fontFamily: system.tokens.fontBody }}
    >
      <nav className={cn("sticky top-0 left-0 right-0 z-[200] px-8 py-4 lg:px-12 flex justify-between items-center backdrop-blur-xl border-b transition-all duration-700", isDarkBg ? "border-white/5 bg-black/20" : "border-black/5 bg-white/20")}>
         <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-xl font-headline italic tracking-tighter flex items-center gap-3 cursor-pointer group" onClick={() => setActivePage('home')}>
            <BloomLogo size={24} />
            <span className="font-bold tracking-tight">{startupData.brand?.companyName || "BLOOM"}</span>
         </motion.div>
         <div className="hidden lg:flex items-center gap-10 text-[9px] font-bold uppercase tracking-[0.4em]" style={{ color: mutedColor }}>
            {['Vision', 'Intelligence', 'Access'].map((label, i) => (
              <button key={label} onClick={() => setActivePage(['home', 'features', 'pricing'][i] as any)} className="transition-all hover:opacity-100 opacity-60">{label}</button>
            ))}
         </div>
         <Button className="rounded-full px-6 h-10 text-[9px] font-bold uppercase tracking-[0.2em] transition-all active:scale-95" style={{ backgroundColor: system.tokens.accent, color: system.tokens.accentOn, borderRadius: system.tokens.radiusPill }}>Initialize</Button>
      </nav>

      <ScrollArea className="flex-1">
        <main className="pb-40">
          <AnimatePresence mode="wait">
            {activePage === 'home' && (
              <motion.div key="home" variants={containerVariants} initial="hidden" animate="visible" className="space-y-0">
                {/* Hero Section */}
                <section className="px-6 py-40 lg:py-64 text-center relative flex flex-col items-center justify-center min-h-[85vh]">
                   <div className="space-y-12 relative z-10 max-w-7xl">
                      <motion.h2 variants={itemVariants} className="text-6xl md:text-8xl lg:text-[8.5rem] italic leading-[0.85] tracking-tighter font-headline text-glow" style={{ fontWeight: 300 }}>
                        {heroSection?.title || "Vision Materialized."}
                      </motion.h2>
                      <motion.p variants={itemVariants} className="text-xl md:text-2xl lg:text-3xl max-w-3xl mx-auto font-light leading-relaxed italic opacity-80" style={{ color: mutedColor }}>
                        {heroSection?.subtitle || startupData.brand?.tagline}
                      </motion.p>
                      <motion.div variants={itemVariants} className="pt-12">
                         <Button className="h-20 px-16 rounded-full text-sm font-bold uppercase tracking-[0.4em] shadow-2xl transition-all hover:scale-105 active:scale-95" style={{ backgroundColor: system.tokens.accent, color: system.tokens.accentOn }}>
                            {heroSection?.ctaLabel || "Get Started"}
                         </Button>
                      </motion.div>
                   </div>
                </section>

                {/* Game Section (Sudoku / Tic Tac Toe) */}
                {gameSection && (
                  <section className="py-32 flex flex-col items-center bg-black/10 backdrop-blur-3xl my-24 rounded-[5rem] mx-10">
                    <div className="max-w-4xl w-full text-center space-y-8 mb-20">
                       <span className="text-[11px] uppercase tracking-[1.2em] font-bold opacity-40 block" style={{ color: system.tokens.accent }}>Interactive Node</span>
                       <h3 className="text-4xl md:text-6xl font-headline italic tracking-tighter">{gameSection.title}</h3>
                       <p className="text-lg opacity-60 italic max-w-2xl mx-auto">{gameSection.subtitle}</p>
                    </div>
                    {gameSection.gameConfig?.type === 'sudoku' ? (
                      <div className="space-y-12 flex flex-col items-center">
                        <SudokuBoard 
                          ref={sudokuRef}
                          initialBoard={gameSection.gameConfig.initialBoard || Array(9).fill(Array(9).fill(null))} 
                          system={system}
                          delay={400}
                        />
                        <Button 
                          onClick={() => sudokuRef.current?.solve()}
                          className="rounded-full px-12 h-16 bg-white text-black font-bold uppercase tracking-[0.3em] hover:bg-[#DCFF00] transition-all shadow-2xl active:scale-95"
                        >
                           <Zap className="mr-3 w-5 h-5 fill-current" /> AI Auto-Solve
                        </Button>
                      </div>
                    ) : (
                      <TicTacToe system={system} />
                    )}
                  </section>
                )}

                {/* Problem & Features Section */}
                <section className="px-6 lg:px-20 py-40">
                   <div className="max-w-[1400px] mx-auto space-y-40">
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
                         <motion.div variants={itemVariants} className="lg:col-span-7 h-[600px] lg:h-[750px] p-16 lg:p-24 flex flex-col justify-end relative overflow-hidden group shadow-[0_50px_100px_rgba(0,0,0,0.5)]" style={{ borderRadius: system.tokens.radiusLg }}>
                            <div className="absolute inset-0 z-0 grayscale opacity-40 group-hover:scale-105 transition-transform duration-[2000ms]">
                               <Image 
                                 src={`https://picsum.photos/seed/${startupData.brand?.companyName}/1600/1000`} 
                                 alt="Concept" 
                                 fill 
                                 className="object-cover"
                                 data-ai-hint={context?.prompt?.includes('car') ? 'luxury car interior' : context?.prompt?.includes('coffee') ? 'espresso texture' : 'bakery bread artisan'}
                               />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />
                            <div className="space-y-6 relative z-10 text-left">
                               <h4 className="text-4xl lg:text-6xl font-headline italic leading-none tracking-tighter text-white">{problemSection?.title}</h4>
                               <p className="text-lg lg:text-2xl font-light italic opacity-80 max-w-2xl leading-relaxed text-white/80">{problemSection?.subtitle}</p>
                            </div>
                         </motion.div>
                         
                         <motion.div variants={itemVariants} className="lg:col-span-5 bg-white/[0.03] border border-white/5 p-16 rounded-[4rem] flex flex-col justify-center gap-12 backdrop-blur-3xl shadow-2xl">
                            <div className="flex items-center gap-5 text-[#DCFF00] mb-4">
                               <Activity size={24} />
                               <h5 className="text-[11px] uppercase tracking-[0.6em] font-bold opacity-50">Neural Advantage</h5>
                            </div>
                            <div className="space-y-12">
                               {(featuresSection?.items || []).slice(0, 5).map((item: string, i: number) => (
                                 <div key={i} className="space-y-4 group cursor-pointer text-left">
                                    <div className="w-10 h-px bg-[#DCFF00]/40 group-hover:w-20 transition-all duration-700" />
                                    <p className="text-xl lg:text-3xl font-headline italic opacity-80 group-hover:opacity-100 group-hover:translate-x-4 transition-all duration-500">{item}</p>
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
