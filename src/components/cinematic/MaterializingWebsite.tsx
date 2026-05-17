"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { 
  ArrowRight, 
  CheckCircle2,
  ExternalLink,
  Activity,
  Box,
  Plus,
  Zap,
  Play
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
  const isDark = system.tokens.bg === '#000000' || system.tokens.bg.startsWith('#0') || system.tokens.bg.startsWith('#1');

  // Industry-specific background logic
  const getThemeBg = () => {
    const name = (startupData.brand?.companyName || "").toLowerCase();
    const prompt = (context?.prompt || "").toLowerCase();
    
    if (prompt.includes('car') || prompt.includes('auto')) return 'radial-gradient(circle at center, #111 0%, #000 100%)';
    if (prompt.includes('coffee') || prompt.includes('starbucks')) return 'radial-gradient(circle at center, #3C2A21 0%, #1A120B 100%)';
    if (prompt.includes('bakery') || prompt.includes('pantry')) return 'radial-gradient(circle at center, #F9F7F5 0%, #E9E3DD 100%)';
    return system.tokens.bg;
  };

  const sections = startupData.content?.sections || [];
  const heroSection = sections.find(s => s.type === 'hero');
  const problemSection = sections.find(s => s.type === 'problem');
  const featuresSection = sections.find(s => s.type === 'features');
  const gameSection = sections.find(s => s.type === 'game');

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
        "h-full w-full transition-all duration-[1500ms] relative selection:bg-white/10 flex flex-col",
        stage === 'wireframe' && "grayscale opacity-20 blur-[80px]",
        stage === 'layout' && "grayscale opacity-40 blur-[40px]",
        stage === 'content' && "opacity-90 blur-[10px]"
      )} 
      style={{ background: getThemeBg(), color: system.tokens.fg, fontFamily: system.tokens.fontBody }}
    >
      <nav className={cn("sticky top-0 left-0 right-0 z-[200] px-8 py-6 lg:px-16 flex justify-between items-center backdrop-blur-xl border-b", isDark ? "bg-black/5 border-white/5" : "bg-white/5 border-black/5")}>
         <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-2xl font-headline italic tracking-tighter flex items-center gap-4 cursor-pointer group" onClick={() => setActivePage('home')}>
            <BloomLogo size={32} />
            <span className="font-bold tracking-tight">{startupData.brand?.companyName || "BLOOM"}</span>
         </motion.div>
         <div className="hidden lg:flex items-center gap-12 text-[10px] font-bold uppercase tracking-[0.4em]" style={{ color: system.tokens.muted }}>
            {['Vision', 'Intelligence', 'Access'].map((label, i) => (
              <button key={label} onClick={() => setActivePage(['home', 'features', 'pricing'][i] as any)} className={cn("transition-all hover:text-white relative py-2")}>{label}</button>
            ))}
         </div>
         <Button className="rounded-full px-8 h-12 text-[10px] font-bold uppercase tracking-[0.2em]" style={{ backgroundColor: system.tokens.accent, color: system.tokens.accentOn, borderRadius: system.tokens.radiusPill }}>Initialize</Button>
      </nav>

      <ScrollArea className="flex-1">
        <main className="pb-40">
          <AnimatePresence mode="wait">
            {activePage === 'home' && (
              <motion.div key="home" variants={containerVariants} initial="hidden" animate="visible" className="space-y-0">
                <section className="px-6 py-40 text-center relative flex flex-col items-center justify-center min-h-[80vh]">
                   <div className="space-y-12 relative z-10 max-w-7xl">
                      <motion.h2 variants={itemVariants} className="text-5xl md:text-7xl lg:text-[8rem] italic leading-[0.85] tracking-tighter font-headline text-glow" style={{ fontWeight: 300 }}>
                        {heroSection?.title || "Vision Materialized."}
                      </motion.h2>
                      <motion.p variants={itemVariants} className="text-lg md:text-2xl lg:text-3xl max-w-3xl mx-auto font-light leading-relaxed italic opacity-80">
                        {heroSection?.subtitle || startupData.brand?.tagline}
                      </motion.p>
                   </div>
                </section>

                {gameSection && (
                  <section className="py-32 flex flex-col items-center bg-black/20 backdrop-blur-3xl my-20">
                    <div className="max-w-4xl w-full text-center space-y-12 mb-20">
                       <span className="text-[10px] uppercase tracking-[1em] font-bold opacity-30 block" style={{ color: system.tokens.accent }}>Neural Interaction</span>
                       <h3 className="text-4xl md:text-6xl font-headline italic tracking-tighter">{gameSection.title}</h3>
                       <p className="text-lg opacity-60 italic max-w-2xl mx-auto">{gameSection.subtitle}</p>
                    </div>
                    {gameSection.gameConfig?.type === 'sudoku' ? (
                      <div className="space-y-12 flex flex-col items-center">
                        <SudokuBoard 
                          ref={sudokuRef}
                          initialBoard={gameSection.gameConfig.initialBoard || Array(9).fill(Array(9).fill(null))} 
                          system={system}
                          delay={600}
                        />
                        <Button 
                          onClick={() => sudokuRef.current?.solve()}
                          className="rounded-full px-12 h-16 bg-white text-black font-bold uppercase tracking-[0.3em] hover:bg-[#DCFF00] transition-all shadow-2xl"
                        >
                           <Zap className="mr-4 w-5 h-5 fill-current" /> AI Solve Sequence
                        </Button>
                      </div>
                    ) : (
                      <TicTacToe system={system} />
                    )}
                  </section>
                )}

                <section className="px-6 lg:px-24 py-40">
                   <div className="max-w-7xl mx-auto space-y-32">
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                         <motion.div variants={itemVariants} className="lg:col-span-8 h-[700px] p-12 lg:p-20 flex flex-col justify-end relative overflow-hidden group shadow-2xl" style={{ borderRadius: system.tokens.radiusLg }}>
                            <div className="absolute inset-0 z-0 grayscale opacity-40 group-hover:scale-105 transition-transform duration-1000">
                               <Image 
                                 src={`https://picsum.photos/seed/${startupData.brand?.companyName}/1200/800`} 
                                 alt="Concept" 
                                 fill 
                                 className="object-cover"
                                 data-ai-hint={context?.prompt?.includes('car') ? 'luxury car' : context?.prompt?.includes('coffee') ? 'espresso cup' : 'abstract design'}
                               />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                            <div className="space-y-6 relative z-10">
                               <h4 className="text-3xl lg:text-6xl font-headline italic leading-none tracking-tighter">{problemSection?.title}</h4>
                               <p className="text-lg lg:text-2xl font-light italic opacity-70 max-w-2xl leading-relaxed">{problemSection?.subtitle}</p>
                            </div>
                         </motion.div>
                         <motion.div variants={itemVariants} className="lg:col-span-4 bg-white/5 border border-white/10 p-12 rounded-[3.5rem] flex flex-col justify-center gap-8 backdrop-blur-3xl">
                            <h5 className="text-[10px] uppercase tracking-[0.4em] font-bold opacity-30">Neural Advantage</h5>
                            <div className="space-y-10">
                               {(featuresSection?.items || []).slice(0, 3).map((item: string, i: number) => (
                                 <div key={i} className="space-y-2">
                                    <div className="w-8 h-px bg-[#DCFF00]/40" />
                                    <p className="text-xl font-headline italic text-white/90">{item}</p>
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
