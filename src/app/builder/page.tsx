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
  Command,
  History,
  Terminal,
  Bot,
  User,
  Search,
  Code,
  Globe,
  Maximize2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { BackgroundEffects } from "@/components/cinematic/BackgroundEffects";
import { useRouter } from "next/navigation";
import { MaterializingWebsite } from "@/components/cinematic/MaterializingWebsite";
import { ScrollArea } from "@/components/ui/scroll-area";
import { InteractiveRobotSpline } from "@/components/ui/interactive-3d-robot";
import ShaderBackground from "@/components/ui/shader-background";

const SISSOR_SCENE = "https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode";

export default function BuilderPage() {
  const router = useRouter();
  const [view, setView] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [mode, setMode] = useState<"preview" | "code">("preview");
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const [chat, setChat] = useState<{role: 'user' | 'assistant' | 'agent', text: string, agent?: string}[]>([
    { role: 'agent', agent: 'SISSOR', text: "FounderOS intelligence materializing. I've analyzed your brief and the target audience psychology. Let's construct the experience." },
    { role: 'agent', agent: 'FORGE', text: "Neural Branding sequence active. Forging a high-end visual system with monochrome accents and cinematic spacing." },
    { role: 'assistant', text: "The foundation is laid. I've started materializing the hero section. How would you like to refine the interaction depth?" }
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
        agent: 'SISSOR',
        text: `Understood. Re-orchestrating the neural grid based on "${userText}". Adjusting typography density and motion curves.` 
      }]);
    }, 1200);
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden flex selection:bg-white/20">
      <BackgroundEffects />
      <ShaderBackground />
      
      {/* SIDEBAR: NEURAL ORCHESTRATOR */}
      <aside className="w-[520px] border-r border-white/5 bg-black/40 backdrop-blur-3xl flex flex-col z-10">
        <header className="p-8 border-b border-white/5 flex items-center justify-between">
           <button onClick={() => router.push('/workspace')} className="p-3 rounded-2xl hover:bg-white/5 transition-all group border border-white/5">
              <ArrowLeft className="w-5 h-5 text-white/40 group-hover:text-white" />
           </button>
           <div className="text-center">
             <h3 className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/60">SISSOR CORE</h3>
             <p className="text-[8px] text-white/10 uppercase tracking-[0.3em] font-bold mt-1">Active Construction</p>
           </div>
           <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
              <InteractiveRobotSpline scene={SISSOR_SCENE} className="w-full h-full scale-150" />
           </div>
        </header>

        <ScrollArea className="flex-1 p-8">
           <div className="space-y-8">
             {chat.map((msg, i) => (
               <motion.div 
                 key={i} 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
               >
                 <div className="flex flex-col gap-3 max-w-[90%]">
                    {msg.agent && (
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-4 h-4 rounded-full bg-white/5 flex items-center justify-center">
                           <Bot size={10} className="text-white/40" />
                        </div>
                        <span className="text-[9px] font-bold uppercase tracking-widest text-white/20">{msg.agent} AI Assistant</span>
                      </div>
                    )}
                    <div className={`p-6 rounded-[32px] text-sm leading-relaxed ${
                      msg.role === 'user' 
                      ? 'bg-white text-black font-semibold shadow-2xl' 
                      : msg.role === 'agent'
                      ? 'bg-white/[0.03] border border-white/10 text-white/70 italic'
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

        <div className="p-10 border-t border-white/5 space-y-8 bg-black/20">
           <div className="relative group">
              <div className="absolute -inset-1 bg-white/5 blur-xl group-hover:bg-white/10 transition-all rounded-[32px]" />
              <input 
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Message SISSOR to refine your startup..."
                className="relative w-full bg-black/40 border border-white/10 h-16 rounded-[28px] focus:ring-1 focus:ring-white/20 px-8 text-sm text-white placeholder:text-white/20"
              />
              <Button onClick={handleSend} size="icon" className="absolute right-2 top-2 h-12 w-12 rounded-[22px] bg-white text-black hover:bg-white/90 shadow-2xl transition-transform active:scale-95 z-10">
                 <Send className="w-5 h-5" />
              </Button>
           </div>
           
           <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
              {[
                { icon: Search, label: "ANALYSIS" },
                { icon: Palette, label: "DNA FORGE" },
                { icon: Command, label: "RENDER" },
                { icon: Shield, label: "ORACLE" }
              ].map((item, idx) => (
                <div 
                  key={idx}
                  className="flex items-center gap-3 px-6 py-3 rounded-full border border-white/5 text-[9px] whitespace-nowrap text-white/40 font-bold bg-white/[0.02] hover:bg-white/5 cursor-pointer transition-all"
                >
                  <item.icon className="w-3 h-3" />
                  {item.label}
                </div>
              ))}
           </div>
        </div>
      </aside>

      {/* MAIN VIEW: MATERIALIZATION PREVIEW */}
      <main className="flex-1 flex flex-col z-10 p-12 overflow-hidden bg-background/20 relative">
         <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
            <InteractiveRobotSpline scene={SISSOR_SCENE} className="w-full h-full" />
         </div>

         <header className="flex items-center justify-between mb-12 relative z-10">
            <div className="flex items-center gap-4 bg-white/5 p-2 rounded-2xl border border-white/5 backdrop-blur-3xl">
               {[
                 { id: 'desktop', icon: Monitor },
                 { id: 'tablet', icon: Tablet },
                 { id: 'mobile', icon: Smartphone }
               ].map((item) => (
                 <button 
                   key={item.id}
                   onClick={() => setView(item.id as any)} 
                   className={`p-3 rounded-xl transition-all ${view === item.id ? 'bg-white text-black shadow-lg' : 'text-white/20 hover:text-white'}`}
                 >
                   <item.icon className="w-4 h-4" />
                 </button>
               ))}
               <div className="w-px h-6 bg-white/10 mx-2" />
               <button 
                onClick={() => setMode(mode === 'preview' ? 'code' : 'preview')}
                className={`flex items-center gap-3 px-6 py-2 rounded-xl transition-all font-bold text-[10px] uppercase tracking-widest ${mode === 'code' ? 'bg-white text-black' : 'text-white/40 hover:text-white'}`}
               >
                 {mode === 'code' ? <Code className="w-4 h-4" /> : <Globe className="w-4 h-4" />}
                 {mode === 'code' ? 'Source' : 'Live Preview'}
               </button>
            </div>

            <div className="flex items-center gap-4">
               <Button variant="ghost" className="text-white/20 hover:text-white flex items-center gap-3 font-bold text-[10px] uppercase tracking-widest transition-colors">
                 <History className="w-4 h-4" /> History
               </Button>
               <Button className="bg-white text-black hover:bg-white/90 rounded-full px-12 h-14 flex items-center gap-3 font-bold text-xs uppercase tracking-widest transition-transform active:scale-95 shadow-[0_0_50px_rgba(255,255,255,0.2)]">
                 <Rocket className="w-4 h-4" /> Launch Startup
               </Button>
            </div>
         </header>

         <div className="flex-1 flex items-center justify-center bg-white/[0.02] rounded-[80px] border border-white/5 relative overflow-hidden p-10 group">
            <div className="absolute top-10 left-10 flex items-center gap-4 opacity-0 group-hover:opacity-40 transition-opacity">
               <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
               <span className="text-[10px] uppercase tracking-widest font-bold">Neural Sync Active</span>
            </div>

            <motion.div 
              layout
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className={`h-full bg-black rounded-[64px] border border-white/5 shadow-[0_50px_100px_rgba(0,0,0,0.8)] overflow-hidden relative ${
                view === 'desktop' ? 'w-full' : view === 'tablet' ? 'w-[768px]' : 'w-[375px]'
              }`}
            >
               <div className="h-full w-full overflow-y-auto no-scrollbar bg-black">
                  {mode === 'preview' ? (
                    <MaterializingWebsite isVisible={true} />
                  ) : (
                    <div className="p-16 font-mono text-sm text-white/40 leading-relaxed">
                       <pre className="animate-pulse">
                        {`// Neural Architecture Core v1.0
import { Construct } from '@siteforge/neural';

export default function StartupExperience() {
  const { mood, motion } = useDNA('luxury-minimal');

  return (
    <div className="neural-grid-nodes">
       <SissorAssistant position="absolute-top" />
       <MaterializeHero 
          intensity={0.8}
          typography="Instrument Serif"
          pacing="cinematic"
       />
       <BentoLayout density="high" />
    </div>
  );
}`}
                       </pre>
                    </div>
                  )}
               </div>
            </motion.div>
            
            <button className="absolute bottom-16 right-16 p-8 rounded-[40px] bg-white/5 border border-white/10 opacity-20 hover:opacity-100 transition-all hover:scale-110">
               <Maximize2 className="w-6 h-6 text-white" />
            </button>
         </div>
      </main>
    </div>
  );
}