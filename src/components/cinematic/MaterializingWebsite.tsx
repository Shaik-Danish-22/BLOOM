
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { 
  ArrowRight, 
  CheckCircle2,
  Zap,
  Box,
  Layout,
  MousePointer2,
  Activity,
  Target,
  Sparkles,
  Info,
  ChevronRight
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
      setTimeout(() => setStage("layout"), 400),
      setTimeout(() => setStage("content"), 1000),
      setTimeout(() => setStage("final"), 1600),
    ];
    return () => timers.forEach(clearTimeout);
  }, [isVisible, data]);

  if (!isVisible || !startupData) return null;

  const systemId = context?.selectedSystem || 'apple';
  const system: DesignSystemTokens = DESIGN_SYSTEMS[systemId as any] || DESIGN_SYSTEMS.apple;
  
  const getThemeBg = () => {
    const prompt = (context?.prompt || "").toLowerCase();
    
    if (prompt.includes('car') || prompt.includes('auto')) {
      return 'linear-gradient(180deg, #050505 0%, #111111 100%)';
    }
    if (prompt.includes('coffee') || prompt.includes('starbucks')) {
      return 'linear-gradient(180deg, #1A120B 0%, #3C2A21 100%)';
    }
    if (prompt.includes('bakery') || prompt.includes('pantry') || prompt.includes('bread')) {
      return 'linear-gradient(180deg, #FBFBF9 0%, #F5F5F1 100%)';
    }
    if (prompt.includes('wellness') || prompt.includes('altina') || prompt.includes('drink')) {
      return 'linear-gradient(180deg, #0F1713 0%, #1A241F 100%)';
    }
    return system.tokens.bg;
  };

  const sections = startupData.content?.sections || [];
  const heroSection = sections.find(s => s.type === 'hero');
  const problemSection = sections.find(s => s.type === 'problem');
  const featuresSection = sections.find(s => s.type === 'features');
  const gameSection = sections.find(s => s.type === 'game');

  const isDarkBg = getThemeBg().includes('#0') || getThemeBg().includes('#1A') || getThemeBg().includes('#3C');
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
        "h-full w-full transition-all duration-[1500ms] relative selection:bg-[#DCFF00]/20 flex flex-col overflow-hidden",
        stage === 'wireframe' && "grayscale opacity-20 blur-[60px]",
        stage === 'layout' && "grayscale opacity-40 blur-[30px]",
        stage === 'content' && "opacity-90 blur-[10px]"
      )} 
      style={{ background: getThemeBg(), color: textColor, fontFamily: system.tokens.fontBody }}
    >
      <nav className={cn("sticky top-0 left-0 right-0 z-[200] px-8 py-4 lg:px-12 flex justify-between items-center backdrop-blur-3xl border-b transition-all duration-700", isDarkBg ? "border-white/5 bg-black/20" : "border-black/5 bg-white/20")}>
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

      <div className="flex-1 overflow-hidden relative">
        <ScrollArea className="h-full">
          <main className="pb-40">
            <AnimatePresence mode="wait">
              {activePage === 'home' && (
                <motion.div key="home" variants={containerVariants} initial="hidden" animate="visible" className="space-y-0">
                  {/* Hero Section - Magazine Grade */}
                  <section className="px-6 py-32 lg:py-56 text-center relative flex flex-col items-center justify-center min-h-[90vh]">
                    <div className="space-y-12 relative z-10 max-w-7xl">
                        <motion.div variants={itemVariants} className="flex items-center justify-center gap-4 mb-4">
                          <div className="w-12 h-px bg-[#DCFF00]/40" />
                          <span className="text-[11px] font-bold uppercase tracking-[0.8em]" style={{ color: system.tokens.accent }}>{startupData.brand?.companyName} Protocol</span>
                          <div className="w-12 h-px bg-[#DCFF00]/40" />
                        </motion.div>
                        <motion.h2 variants={itemVariants} className="text-7xl md:text-9xl lg:text-[11rem] italic leading-[0.8] tracking-tighter font-headline text-glow" style={{ fontWeight: 300 }}>
                          {heroSection?.title || "Vision Materialized."}
                        </motion.h2>
                        <motion.p variants={itemVariants} className="text-xl md:text-3xl lg:text-4xl max-w-4xl mx-auto font-light leading-relaxed italic opacity-80" style={{ color: mutedColor }}>
                          {heroSection?.subtitle || startupData.brand?.tagline}
                        </motion.p>
                        <motion.div variants={itemVariants} className="pt-16">
                          <Button className="h-24 px-20 rounded-full text-sm font-bold uppercase tracking-[0.5em] shadow-2xl transition-all hover:scale-105 active:scale-95 group" style={{ backgroundColor: system.tokens.accent, color: system.tokens.accentOn }}>
                              {heroSection?.ctaLabel || "Get Started"} <ArrowRight className="ml-4 group-hover:translate-x-2 transition-transform" />
                          </Button>
                        </motion.div>
                    </div>
                    
                    {/* Background Decor */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-full max-w-[1200px] aspect-square bg-[#DCFF00]/5 blur-[200px] rounded-full opacity-40 animate-pulse" />
                  </section>

                  {/* Game Section (Sudoku / Tic Tac Toe) */}
                  {gameSection && (
                    <section className="py-40 flex flex-col items-center bg-white/[0.02] backdrop-blur-3xl my-32 rounded-[5rem] mx-10 border border-white/5 shadow-2xl overflow-hidden">
                      <div className="max-w-[1400px] w-full grid grid-cols-1 lg:grid-cols-12 gap-20 px-20">
                        <div className="lg:col-span-7 flex flex-col items-center justify-center space-y-16">
                          <div className="text-center space-y-6">
                            <span className="text-[11px] uppercase tracking-[1.5em] font-bold opacity-40 block" style={{ color: system.tokens.accent }}>Interactive Neural Node</span>
                            <h3 className="text-5xl md:text-8xl font-headline italic tracking-tighter">{gameSection.title}</h3>
                          </div>
                          
                          {gameSection.gameConfig?.type === 'sudoku' ? (
                            <div className="space-y-16 flex flex-col items-center">
                              <SudokuBoard 
                                ref={sudokuRef}
                                initialBoard={gameSection.gameConfig.initialBoard || Array(9).fill(Array(9).fill(null))} 
                                system={system}
                                delay={400}
                              />
                              <Button 
                                onClick={() => sudokuRef.current?.solve()}
                                className="rounded-full h-24 px-20 bg-white text-black font-bold uppercase tracking-[0.4em] hover:bg-[#DCFF00] transition-all shadow-[0_30px_60px_rgba(0,0,0,0.5)] active:scale-95 group"
                              >
                                <Zap className="mr-4 w-6 h-6 fill-current group-hover:animate-pulse" /> AI Neural Solve
                              </Button>
                            </div>
                          ) : (
                            <TicTacToe system={system} />
                          )}
                        </div>

                        <div className="lg:col-span-5 flex flex-col justify-center">
                           <div className="p-12 rounded-[4rem] bg-white/[0.03] border border-white/10 backdrop-blur-3xl space-y-12 shadow-inner h-full">
                              <div className="flex items-center gap-6 text-[#DCFF00]">
                                 <Info size={28} />
                                 <h4 className="text-[11px] uppercase tracking-[0.8em] font-bold">Neural Directives</h4>
                              </div>
                              <div className="space-y-10">
                                 {gameSection.gameConfig?.instructions ? (
                                   <div className="space-y-8">
                                      {gameSection.gameConfig.instructions.split('\n').map((line, i) => (
                                        <div key={i} className="flex gap-6 group">
                                           <div className="w-1.5 h-1.5 rounded-full bg-[#DCFF00] mt-2.5 shrink-0 opacity-40 group-hover:opacity-100 transition-opacity" />
                                           <p className="text-xl italic font-light opacity-80 leading-relaxed text-left">{line.replace('- ', '')}</p>
                                        </div>
                                      ))}
                                   </div>
                                 ) : (
                                   <p className="text-xl italic font-light opacity-60">Initializing tactical interface...</p>
                                 )}
                              </div>
                           </div>
                        </div>
                      </div>
                    </section>
                  )}

                  {/* Problem & Features Section - Editorial Grid */}
                  <section className="px-6 lg:px-20 py-56">
                    <div className="max-w-[1500px] mx-auto space-y-56">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-stretch">
                          <motion.div variants={itemVariants} className="lg:col-span-7 min-h-[700px] lg:min-h-[850px] p-16 lg:p-32 flex flex-col justify-end relative overflow-hidden group shadow-[0_80px_160px_rgba(0,0,0,0.7)]" style={{ borderRadius: system.tokens.radiusLg }}>
                              <div className="absolute inset-0 z-0 grayscale opacity-40 group-hover:scale-110 transition-transform duration-[3000ms] ease-out">
                                <Image 
                                  src={`https://picsum.photos/seed/${startupData.brand?.companyName}/2000/1200`} 
                                  alt="Concept" 
                                  fill 
                                  className="object-cover"
                                  data-ai-hint={context?.prompt?.includes('car') ? 'luxury supercar interior' : context?.prompt?.includes('coffee') ? 'espresso steam texture' : context?.prompt?.includes('bakery') ? 'bakery heritage bread' : 'architectural minimalist texture'}
                                />
                              </div>
                              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
                              <div className="space-y-10 relative z-10 text-left">
                                <span className="text-[10px] uppercase tracking-[1em] font-bold text-[#DCFF00]">Strategic Insight</span>
                                <h4 className="text-5xl lg:text-8xl font-headline italic leading-[0.9] tracking-tighter text-white">{problemSection?.title}</h4>
                                <p className="text-xl lg:text-3xl font-light italic opacity-80 max-w-3xl leading-relaxed text-white/80">{problemSection?.subtitle}</p>
                              </div>
                          </motion.div>
                          
                          <motion.div variants={itemVariants} className="lg:col-span-5 bg-white/[0.03] border border-white/5 p-16 lg:p-24 rounded-[4rem] flex flex-col justify-center gap-16 backdrop-blur-3xl shadow-2xl">
                              <div className="flex items-center gap-6 text-[#DCFF00]">
                                <Activity size={28} />
                                <h5 className="text-[11px] uppercase tracking-[0.8em] font-bold opacity-50">Neural Advantage</h5>
                              </div>
                              <div className="space-y-16">
                                {(featuresSection?.items || []).slice(0, 5).map((item: string, i: number) => (
                                  <div key={i} className="space-y-6 group cursor-pointer text-left">
                                      <div className="flex items-center gap-4">
                                        <span className="text-[10px] font-bold opacity-20 group-hover:opacity-100 transition-opacity">0{i+1}</span>
                                        <div className="h-px flex-1 bg-white/10 group-hover:bg-[#DCFF00]/40 transition-all duration-700" />
                                      </div>
                                      <p className="text-2xl lg:text-4xl font-headline italic opacity-70 group-hover:opacity-100 group-hover:translate-x-6 transition-all duration-700">{item}</p>
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
    </div>
  );
}
