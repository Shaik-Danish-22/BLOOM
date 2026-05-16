
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  Search, 
  Palette, 
  ArrowRight, 
  ChevronLeft, 
  Zap, 
  BarChart3, 
  Layout, 
  Code, 
  Eye, 
  Rocket,
  Wand2,
  CheckCircle2,
  Cpu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useUser, useFirestore } from "@/firebase";
import { collection, addDoc, query, where, getDocs, orderBy, limit } from "firebase/firestore";
import { enhancePrompt } from "@/ai/flows/enhance-prompt";
import { generateStartupIdea } from "@/ai/flows/generate-startup-idea";
import { BackgroundEffects } from "@/components/cinematic/BackgroundEffects";
import { MaterializingWebsite } from "@/components/cinematic/MaterializingWebsite";
import { OracleGauge } from "@/components/cinematic/OracleGauge";
import { DEMO_ORACLE_SCORE } from "@/lib/demo-data";
import { useRouter } from "next/navigation";

type Step = 'prompt' | 'enhancing' | 'path-selection' | 'research' | 'design-selection' | 'execution';

export default function WorkspacePage() {
  const { user } = useUser();
  const db = useFirestore();
  const router = useRouter();
  const [step, setStep] = useState<Step>('prompt');
  const [prompt, setPrompt] = useState("");
  const [enhancedData, setEnhancedData] = useState<any>(null);
  const [startupData, setStartupData] = useState<any>(null);
  const [selectedTheme, setSelectedTheme] = useState<'dark' | 'light'>('dark');
  const [viewMode, setViewMode] = useState<'preview' | 'code'>('preview');

  // Guard: Redirect if not logged in
  useEffect(() => {
    if (!user) router.push('/');
  }, [user, router]);

  const handleEnhance = async () => {
    if (!prompt.trim()) return;
    setStep('enhancing');
    try {
      const data = await enhancePrompt({ rawPrompt: prompt });
      setEnhancedData(data);
      setStep('path-selection');
    } catch (e) {
      console.error(e);
      setStep('prompt');
    }
  };

  const handleStartDesign = async () => {
    setStep('design-selection');
  };

  const handleExecution = async () => {
    setStep('enhancing'); // Reuse loading state
    try {
      const data = await generateStartupIdea({ startupIdea: enhancedData.professionalBrief });
      setStartupData(data);
      setStep('execution');
    } catch (e) {
      console.error(e);
      setStep('design-selection');
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-white/20 overflow-hidden font-body">
      <BackgroundEffects />

      {/* HEADER */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
            <span className="text-black font-bold">S</span>
          </div>
          <span className="text-lg font-headline italic tracking-tight">Siteforge Workspace</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-[10px] text-white/40 uppercase font-bold">Session Active</p>
            <p className="text-xs">{user?.displayName}</p>
          </div>
          <div className="w-10 h-10 rounded-full border border-white/10 bg-white/5 overflow-hidden">
            <img src={user?.photoURL || ""} alt="Avatar" className="w-full h-full object-cover" />
          </div>
        </div>
      </nav>

      <main className="pt-32 px-6 max-w-7xl mx-auto h-[calc(100vh-80px)]">
        <AnimatePresence mode="wait">
          {/* STEP 1: PROMPT */}
          {step === 'prompt' && (
            <motion.div 
              key="prompt"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center justify-center h-full text-center max-w-3xl mx-auto"
            >
              <h2 className="text-5xl md:text-7xl font-headline italic mb-8">What shall we <em className="not-italic text-white/20">materialize</em>?</h2>
              <div className="w-full relative group">
                <Textarea 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe your vision in vague terms... we'll handle the precision."
                  className="w-full min-h-[200px] bg-white/5 border-white/10 rounded-[32px] p-8 text-xl focus:ring-1 focus:ring-white/20 transition-all liquid-glass"
                />
                <Button 
                  onClick={handleEnhance}
                  disabled={!prompt.trim()}
                  className="absolute bottom-4 right-4 bg-white text-black hover:bg-white/90 rounded-full px-8 h-14 flex items-center gap-3 font-bold uppercase tracking-widest"
                >
                  <Wand2 size={18} /> Enhance Idea
                </Button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: LOADING / ENHANCING */}
          {step === 'enhancing' && (
            <motion.div 
              key="enhancing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center h-full text-center"
            >
              <div className="relative w-24 h-24 mb-12">
                <div className="absolute inset-0 rounded-full border-2 border-white/10" />
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full border-2 border-t-white border-transparent"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Cpu className="text-white animate-pulse" />
                </div>
              </div>
              <h3 className="text-3xl font-headline italic text-white/60 mb-2">Neural Link Established</h3>
              <p className="text-white/20 uppercase tracking-[0.4em] text-[10px] font-bold">FounderOS Intelligence Refinement Active</p>
            </motion.div>
          )}

          {/* STEP 3: PATH SELECTION */}
          {step === 'path-selection' && (
            <motion.div 
              key="path"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="h-full flex flex-col"
            >
              <header className="mb-12">
                <Button variant="ghost" onClick={() => setStep('prompt')} className="mb-6 text-white/40 hover:text-white">
                  <ChevronLeft className="mr-2" /> Back to Prompt
                </Button>
                <div className="flex justify-between items-end">
                  <div>
                    <h2 className="text-4xl font-headline italic leading-none">{enhancedData?.suggestedName}</h2>
                    <p className="text-white/40 mt-2">Enhanced Prompt: <span className="text-white/80">{enhancedData?.coreConcept}</span></p>
                  </div>
                </div>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
                <div 
                  onClick={() => setStep('research')}
                  className="liquid-glass rounded-[48px] border border-white/5 p-12 flex flex-col justify-between group cursor-pointer hover:border-white/20 transition-all"
                >
                  <div className="w-16 h-16 rounded-[24px] bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                    <Search size={32} />
                  </div>
                  <div>
                    <h4 className="text-3xl font-bold mb-4">Research & Insight</h4>
                    <p className="text-white/40 leading-relaxed">
                      Enter "The Oracle". Deep market analysis, investor scoring, competitive moats, and identification of core friction points.
                    </p>
                  </div>
                  <ArrowRight className="text-white/20 group-hover:text-white transition-all self-end" />
                </div>

                <div 
                  onClick={handleStartDesign}
                  className="liquid-glass rounded-[48px] border border-white/5 p-12 flex flex-col justify-between group cursor-pointer hover:border-white/20 transition-all bg-white text-black"
                >
                  <div className="w-16 h-16 rounded-[24px] bg-black/5 border border-black/10 flex items-center justify-center">
                    <Palette size={32} />
                  </div>
                  <div>
                    <h4 className="text-3xl font-bold mb-4">Design & Execution</h4>
                    <p className="text-black/60 leading-relaxed font-medium">
                      Materialize the vision. Theme selection, UI orchestration, and progressive site assembly on the live canvas.
                    </p>
                  </div>
                  <ArrowRight className="text-black/20 group-hover:text-black transition-all self-end" />
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 4: RESEARCH (ORACLE) */}
          {step === 'research' && (
            <motion.div key="oracle" className="h-full">
              <Button variant="ghost" onClick={() => setStep('path-selection')} className="mb-12 text-white/40 hover:text-white">
                <ChevronLeft className="mr-2" /> Back to Selection
              </Button>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-12">
                  <section>
                    <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/20 mb-6">Strategic Brief</h3>
                    <p className="text-2xl font-light leading-relaxed text-white/80 italic">
                      "{enhancedData?.professionalBrief}"
                    </p>
                  </section>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-8 rounded-[32px] border border-white/5 bg-white/[0.02]">
                      <h4 className="font-bold mb-4">Market Potential</h4>
                      <p className="text-sm text-white/40 leading-relaxed">The AI has identified a significant TAM in the specialized niche. Growth trajectory is estimated at 24% CAGR over next 5 years.</p>
                    </div>
                    <div className="p-8 rounded-[32px] border border-white/5 bg-white/[0.02]">
                      <h4 className="font-bold mb-4">Investor Verdict</h4>
                      <p className="text-sm text-white/40 leading-relaxed">Highly Investable. Moat is strong due to the specific technical synergy and unique brand positioning.</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center p-12 rounded-[48px] border border-white/5 liquid-glass">
                   <OracleGauge targetScore={DEMO_ORACLE_SCORE.score} />
                   <Button onClick={handleStartDesign} className="mt-12 bg-white text-black rounded-full px-12 h-14 font-bold uppercase tracking-widest">
                     Proceed to Design
                   </Button>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 5: DESIGN SELECTION */}
          {step === 'design-selection' && (
            <motion.div key="design" className="flex flex-col items-center justify-center h-full max-w-4xl mx-auto">
              <h2 className="text-5xl font-headline italic mb-16">Choose your <em className="not-italic text-white/20">aesthetic</em></h2>
              <div className="grid grid-cols-2 gap-8 w-full mb-16">
                 <div 
                   onClick={() => setSelectedTheme('dark')}
                   className={`aspect-[4/5] rounded-[48px] border-2 cursor-pointer transition-all overflow-hidden relative ${
                     selectedTheme === 'dark' ? 'border-white scale-105' : 'border-white/5 opacity-40'
                   }`}
                 >
                    <div className="absolute inset-0 bg-black" />
                    <div className="absolute inset-0 flex items-center justify-center text-[10px] uppercase tracking-[0.5em] font-bold">Obsidian Dark</div>
                 </div>
                 <div 
                   onClick={() => setSelectedTheme('light')}
                   className={`aspect-[4/5] rounded-[48px] border-2 cursor-pointer transition-all overflow-hidden relative ${
                     selectedTheme === 'light' ? 'border-black scale-105' : 'border-white/5 opacity-40'
                   }`}
                 >
                    <div className="absolute inset-0 bg-white" />
                    <div className="absolute inset-0 flex items-center justify-center text-[10px] uppercase tracking-[0.5em] font-bold text-black">Alabaster Light</div>
                 </div>
              </div>
              <Button onClick={handleExecution} className="bg-white text-black rounded-full px-20 h-16 text-lg font-bold uppercase tracking-widest shadow-2xl">
                 Begin Materialization
              </Button>
            </motion.div>
          )}

          {/* STEP 6: EXECUTION (THE BUILDER) */}
          {step === 'execution' && (
            <motion.div key="execution" className="flex flex-col h-full -mx-6">
              <header className="px-12 py-4 border-b border-white/5 flex justify-between items-center bg-black/40 backdrop-blur-3xl">
                <div className="flex items-center gap-4">
                  <Button variant="ghost" onClick={() => setStep('design-selection')} size="icon" className="text-white/40">
                    <ChevronLeft />
                  </Button>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full animate-pulse ${viewMode === 'preview' ? 'bg-green-500' : 'bg-blue-500'}`} />
                    <span className="text-[10px] uppercase tracking-widest font-bold opacity-50">
                      {viewMode === 'preview' ? 'Live Canvas Rendering' : 'Source Protocol Active'}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-1 bg-white/5 rounded-full border border-white/10">
                   <Button 
                    variant={viewMode === 'preview' ? 'default' : 'ghost'} 
                    size="sm" 
                    onClick={() => setViewMode('preview')}
                    className="rounded-full text-[10px] h-8 px-6 font-bold"
                   >
                     <Eye className="mr-2 h-3 w-3" /> PREVIEW
                   </Button>
                   <Button 
                    variant={viewMode === 'code' ? 'default' : 'ghost'} 
                    size="sm" 
                    onClick={() => setViewMode('code')}
                    className="rounded-full text-[10px] h-8 px-6 font-bold"
                   >
                     <Code className="mr-2 h-3 w-3" /> SOURCE
                   </Button>
                </div>
                <Button className="bg-white text-black rounded-full px-8 h-10 font-bold text-[10px] uppercase tracking-widest">
                  <Rocket className="mr-2 h-3 w-3" /> Launch Prototype
                </Button>
              </header>

              <div className="flex-1 flex overflow-hidden">
                {/* SIDEBAR: NEURAL AGENTS */}
                <aside className="w-[380px] border-r border-white/5 bg-black/20 flex flex-col p-8 overflow-y-auto">
                   <div className="space-y-8">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <Zap size={14} className="text-white/40" />
                          <h5 className="text-[10px] uppercase tracking-widest font-bold text-white/40">Active Agents</h5>
                        </div>
                        <div className="space-y-2">
                           {['CEO', 'FORGE', 'ATLAS'].map((agent) => (
                             <div key={agent} className="flex items-center justify-between p-4 rounded-2xl border border-white/5 bg-white/[0.02]">
                                <span className="text-xs font-bold">{agent}</span>
                                <div className="flex gap-1">
                                   <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
                                   <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                                </div>
                             </div>
                           ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h5 className="text-[10px] uppercase tracking-widest font-bold text-white/40">Neural Chat</h5>
                        <div className="p-6 rounded-[28px] border border-white/5 bg-white/[0.01] text-xs leading-relaxed italic text-white/60">
                          "FounderOS has identified the core friction points. We are materializing a high-density bento grid with obsidian gradients to project technical authority."
                        </div>
                      </div>

                      <div className="mt-auto space-y-4">
                        <div className="relative">
                           <input 
                             placeholder="Select area to refine..." 
                             className="w-full bg-white/5 border border-white/10 rounded-2xl h-12 px-6 text-xs"
                           />
                        </div>
                      </div>
                   </div>
                </aside>

                {/* CANVAS */}
                <div className="flex-1 bg-zinc-950 p-12 overflow-y-auto">
                   <div className={`mx-auto max-w-5xl rounded-[40px] border border-white/5 shadow-2xl overflow-hidden min-h-[1200px] ${selectedTheme === 'light' ? 'bg-white text-black' : 'bg-black text-white'}`}>
                      {viewMode === 'preview' ? (
                        <MaterializingWebsite isVisible={true} />
                      ) : (
                        <div className="p-12 font-mono text-xs leading-relaxed opacity-40">
                          <pre>{`// Siteforge AI Source Materialization
import React from 'react';
import { motion } from 'framer-motion';

export const GeneratedStartup = () => {
  return (
    <div className="neural-grid">
      <header className="obsidian-glass">
        <h1>${enhancedData?.suggestedName}</h1>
      </header>
      {/* Materializing blocks... */}
    </div>
  );
};`}</pre>
                        </div>
                      )}
                   </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
