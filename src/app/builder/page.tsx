"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, 
  ArrowLeft, 
  Monitor, 
  Smartphone, 
  Tablet, 
  Rocket, 
  Sparkles,
  Layers,
  Zap,
  Cpu,
  Shield,
  Layers as LayersIcon,
  Search,
  Code,
  Globe,
  Maximize2,
  Palette,
  Layout,
  MousePointer2,
  History,
  Bot,
  Wand2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { BackgroundEffects } from "@/components/cinematic/BackgroundEffects";
import { useRouter } from "next/navigation";
import { MaterializingWebsite } from "@/components/cinematic/MaterializingWebsite";
import { ScrollArea } from "@/components/ui/scroll-area";
import { InteractiveRobotSpline } from "@/components/ui/interactive-3d-robot";
import ShaderBackground from "@/components/ui/shader-background";

const SCISSOR_SCENE = "https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode";

export default function BuilderPage() {
  const router = useRouter();
  const [view, setView] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [mode, setMode] = useState<"preview" | "code">("preview");
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const [chat, setChat] = useState<{role: 'user' | 'assistant' | 'agent', text: string, agent?: string}[]>([
    { role: 'agent', agent: 'SCISSOR', text: "FounderOS intelligence materialized. I've orchestrated the high-density layout nodes according to your Design DNA. Let's refine the materialization." },
    { role: 'assistant', text: "The first layer of materialization is complete. I've focused on the editorial serif hierarchy and the cinematic motion curves. What section should we optimize next?" }
  ]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chat]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userText = input;
    setChat(prev => [...prev, { role: 'user', text: userText }]);
    setInput("");
    
    setTimeout(() => {
      setChat(prev => [...prev, { 
        role: 'agent', 
        agent: 'SCISSOR',
        text: `Understood. Re-orchestrating the neural grid based on "${userText}". Adjusting hierarchy density and shared-element transitions.` 
      }]);
    }, 1500);
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden flex selection:bg-white/20 font-body">
      <BackgroundEffects />
      <ShaderBackground />
      
      {/* SIDEBAR: NEURAL ORCHESTRATOR */}
      <aside className="w-[580px] border-r border-white/5 bg-black/60 backdrop-blur-3xl flex flex-col z-10 shadow-2xl">
        <header className="p-12 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
           <button onClick={() => router.push('/workspace')} className="p-5 rounded-2xl hover:bg-white/5 transition-all group border border-white/5 bg-black/20">
              <ArrowLeft className="w-7 h-7 text-white/40 group-hover:text-white" />
           </button>
           <div className="text-center">
             <h3 className="text-[13px] font-bold uppercase tracking-[0.7em] text-white/60">NEURAL STUDIO</h3>
             <p className="text-[10px] text-white/10 uppercase tracking-[0.5em] font-bold mt-3">FounderOS Kernel v2.5</p>
           </div>
           <div className="w-20 h-28 flex items-center justify-center overflow-hidden relative">
              <InteractiveRobotSpline 
                scene={SCISSOR_SCENE} 
                className="w-full h-full scale-[1.6] translate-y-4" 
              />
           </div>
        </header>

        <ScrollArea className="flex-1 p-12">
           <div className="space-y-12">
             {chat.map((msg, i) => (
               <motion.div 
                 key={i} 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
               >
                 <div className="flex flex-col gap-5 max-w-[92%]">
                    {msg.agent && (
                      <div className="flex items-center gap-4 mb-1">
                        <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                           <Bot size={14} className="text-white/40" />
                        </div>
                        <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/25">{msg.agent} OPERATOR</span>
                      </div>
                    )}
                    <div className={`p-10 rounded-[42px] text-[17px] leading-relaxed shadow-xl ${
                      msg.role === 'user' 
                      ? 'bg-white text-black font-semibold' 
                      : msg.role === 'agent'
                      ? 'bg-white/[0.02] border border-white/10 text-white/70 italic font-light'
                      : 'bg-white/5 border border-white/5 text-white/80'
                    }`}>
                      {msg.text}
                    </div>
                 </div>
               </motion.div>
             ))}
             <div ref={scrollRef} />
           </div>
        </ScrollArea>

        <div className="p-14 border-t border-white/5 space-y-12 bg-black/40">
           <div className="relative group">
              <div className="absolute -inset-2 bg-white/5 blur-3xl opacity-0 group-hover:opacity-100 transition-all rounded-[48px]" />
              <input 
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Direct Scissor to refine your startup..."
                className="relative w-full bg-black/60 border border-white/10 h-24 rounded-[40px] focus:ring-1 focus:ring-white/20 px-12 text-[17px] text-white placeholder:text-white/20 transition-all"
              />
              <Button onClick={handleSend} size="icon" className="absolute right-3 top-3 h-18 w-18 rounded-[32px] bg-white text-black hover:bg-white/90 shadow-2xl transition-all active:scale-95 z-10">
                 <Send className="w-8 h-8" />
              </Button>
           </div>
           
           <div className="flex gap-5 overflow-x-auto pb-8 no-scrollbar">
              {[
                { icon: Search, label: "REPORT" },
                { icon: Palette, label: "DNA LINK" },
                { icon: Layout, label: "FRAGMENTS" },
                { icon: MousePointer2, label: "PRECISION" },
                { icon: Wand2, label: "ENHANCE" }
              ].map((item, idx) => (
                <div 
                  key={idx}
                  className="flex items-center gap-5 px-10 py-5 rounded-full border border-white/5 text-[11px] whitespace-nowrap text-white/30 font-bold bg-white/[0.02] hover:bg-white/5 cursor-pointer transition-all shadow-sm hover:scale-105"
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </div>
              ))}
           </div>
        </div>
      </aside>

      {/* MAIN VIEW: MATERIALIZATION PREVIEW */}
      <main className="flex-1 flex flex-col z-10 p-16 overflow-hidden bg-background/20 relative">
         <header className="flex items-center justify-between mb-16 relative z-10">
            <div className="flex items-center gap-6 bg-black/40 p-3 rounded-2xl border border-white/5 backdrop-blur-3xl shadow-2xl">
               {[
                 { id: 'desktop', icon: Monitor },
                 { id: 'tablet', icon: Tablet },
                 { id: 'mobile', icon: Smartphone }
               ].map((item) => (
                 <button 
                   key={item.id}
                   onClick={() => setView(item.id as any)} 
                   className={`p-4 rounded-xl transition-all ${view === item.id ? 'bg-white text-black shadow-xl scale-110' : 'text-white/20 hover:text-white'}`}
                 >
                   <item.icon className="w-6 h-6" />
                 </button>
               ))}
               <div className="w-px h-10 bg-white/10 mx-4" />
               <button 
                onClick={() => setMode(mode === 'preview' ? 'code' : 'preview')}
                className={`flex items-center gap-5 px-10 py-4 rounded-xl transition-all font-bold text-[12px] uppercase tracking-[0.3em] ${mode === 'code' ? 'bg-white text-black shadow-lg' : 'text-white/40 hover:text-white'}`}
               >
                 {mode === 'code' ? <Code className="w-6 h-6" /> : <Globe className="w-6 h-6" />}
                 {mode === 'code' ? 'Registry' : 'Neural Preview'}
               </button>
            </div>

            <div className="flex items-center gap-6">
               <Button variant="ghost" className="text-white/20 hover:text-white flex items-center gap-5 font-bold text-[12px] uppercase tracking-[0.3em] transition-all hover:bg-white/5 h-16 px-10 rounded-2xl">
                 <History className="w-6 h-6" /> Timeline
               </Button>
               <Button className="bg-white text-black hover:bg-white/90 rounded-full px-20 h-20 flex items-center gap-5 font-bold text-lg uppercase tracking-[0.3em] transition-all active:scale-95 shadow-[0_0_100px_rgba(255,255,255,0.2)] hover:scale-105">
                 <Rocket className="w-6 h-6" /> Deploy Startup
               </Button>
            </div>
         </header>

         <div className="flex-1 flex items-center justify-center bg-white/[0.01] rounded-[120px] border border-white/5 relative overflow-hidden p-16 group shadow-inner">
            <div className="absolute top-16 left-16 flex items-center gap-6 opacity-0 group-hover:opacity-40 transition-opacity">
               <div className="w-3 h-3 rounded-full bg-white animate-pulse shadow-[0_0_15px_white]" />
               <span className="text-[12px] uppercase tracking-[0.6em] font-bold">Neural Sync Active</span>
            </div>

            <motion.div 
              layout
              transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
              className={`h-full bg-black rounded-[100px] border border-white/5 shadow-[0_100px_200px_rgba(0,0,0,1)] overflow-hidden relative ${
                view === 'desktop' ? 'w-full' : view === 'tablet' ? 'w-[768px]' : 'w-[375px]'
              }`}
            >
               <div className="h-full w-full overflow-y-auto no-scrollbar bg-black">
                  {mode === 'preview' ? (
                    <MaterializingWebsite isVisible={true} />
                  ) : (
                    <div className="p-24 font-mono text-[18px] text-white/30 leading-relaxed bg-black/40">
                       <pre className="animate-pulse">
                        {`// Neural Architecture Core v2.5
import { Materialize } from '@founder-os/neural';

export default function StartupExperience() {
  const dna = useDesignDNA('high-end-luxury');

  return (
    <Canvas 
      sophistication="ultra" 
      motion={dna.motion}
      typography="Instrument Serif"
    >
       <Scaffold.Header intensity={0.92} />
       <Scaffold.Hero pacing="cinematic" />
       <Scaffold.Bento density="high" radius="64px" />
       <Scaffold.Footer copyright="2026 FounderOS" />
    </Canvas>
  );
}`}
                       </pre>
                    </div>
                  )}
               </div>
            </motion.div>
            
            <button className="absolute bottom-24 right-24 p-12 rounded-[56px] bg-white/5 border border-white/10 opacity-20 hover:opacity-100 transition-all hover:scale-110 shadow-2xl hover:bg-white/10 backdrop-blur-3xl">
               <Maximize2 className="w-10 h-10 text-white" />
            </button>
         </div>
      </main>
    </div>
  );
}
