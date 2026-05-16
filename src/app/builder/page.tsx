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
    { role: 'agent', agent: 'SCISSOR', text: "FounderOS intelligence materialized. Neural core is stable." },
    { role: 'assistant', text: "The first layer of materialization is complete. I've focused on the editorial serif hierarchy. What section should we optimize next?" }
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
        text: `Understood. Adjusting hierarchy density based on "${userText}".` 
      }]);
    }, 1500);
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden flex selection:bg-white/20 font-body">
      <BackgroundEffects />
      <ShaderBackground />
      
      {/* SIDEBAR: NEURAL ORCHESTRATOR */}
      <aside className="w-[580px] border-r border-white/5 bg-black/60 backdrop-blur-3xl flex flex-col z-10 shadow-2xl">
        <header className="p-10 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
           <button onClick={() => router.push('/workspace')} className="p-4 rounded-xl hover:bg-white/5 transition-all group border border-white/5 bg-black/20">
              <ArrowLeft className="w-6 h-6 text-white/40 group-hover:text-white" />
           </button>
           <div className="text-center">
             <h3 className="text-[11px] font-bold uppercase tracking-[0.7em] text-white/60">NEURAL STUDIO</h3>
           </div>
           <div className="w-24 h-24 overflow-hidden relative flex items-center justify-center rounded-2xl bg-white/5 pointer-events-none">
              <div className="absolute inset-0 h-[120%] w-full">
                <InteractiveRobotSpline 
                  scene={SCISSOR_SCENE} 
                  className="w-full h-full scale-[1.1] translate-y-2" 
                />
              </div>
           </div>
        </header>

        <ScrollArea className="flex-1 p-10">
           <div className="space-y-10">
             {chat.map((msg, i) => (
               <motion.div 
                 key={i} 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
               >
                 <div className="flex flex-col gap-4 max-w-[92%]">
                    {msg.agent && (
                      <div className="flex items-center gap-3 mb-1">
                        <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                           <Bot size={12} className="text-white/40" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/25">{msg.agent}</span>
                      </div>
                    )}
                    <div className={`p-8 rounded-[32px] text-[16px] leading-relaxed shadow-xl ${
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

        <div className="p-10 border-t border-white/5 space-y-10 bg-black/40">
           <div className="relative group">
              <input 
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Direct Scissor to refine..."
                className="relative w-full bg-black/60 border border-white/10 h-20 rounded-[30px] focus:ring-1 focus:ring-white/20 px-10 text-[16px] text-white placeholder:text-white/20 transition-all"
              />
              <Button onClick={handleSend} size="icon" className="absolute right-2 top-2 h-16 w-16 rounded-[24px] bg-white text-black hover:bg-white/90 shadow-2xl transition-all active:scale-95 z-10">
                 <Send className="w-6 h-6" />
              </Button>
           </div>
        </div>
      </aside>

      {/* MAIN VIEW */}
      <main className="flex-1 flex flex-col z-10 p-12 overflow-hidden bg-background/20 relative">
         <header className="flex items-center justify-between mb-12 relative z-10">
            <div className="flex items-center gap-4 bg-black/40 p-2 rounded-xl border border-white/5 backdrop-blur-3xl shadow-2xl">
               {[
                 { id: 'desktop', icon: Monitor },
                 { id: 'tablet', icon: Tablet },
                 { id: 'mobile', icon: Smartphone }
               ].map((item) => (
                 <button 
                   key={item.id}
                   onClick={() => setView(item.id as any)} 
                   className={`p-3 rounded-lg transition-all ${view === item.id ? 'bg-white text-black shadow-xl scale-110' : 'text-white/20 hover:text-white'}`}
                 >
                   <item.icon className="w-5 h-5" />
                 </button>
               ))}
               <div className="w-px h-8 bg-white/10 mx-2" />
               <button 
                onClick={() => setMode(mode === 'preview' ? 'code' : 'preview')}
                className={`flex items-center gap-4 px-8 py-3 rounded-lg transition-all font-bold text-[11px] uppercase tracking-[0.3em] ${mode === 'code' ? 'bg-white text-black shadow-lg' : 'text-white/40 hover:text-white'}`}
               >
                 {mode === 'code' ? <Code className="w-5 h-5" /> : <Globe className="w-5 h-5" />}
                 {mode === 'code' ? 'Registry' : 'Neural Preview'}
               </button>
            </div>

            <div className="flex items-center gap-6">
               <Button className="bg-white text-black hover:bg-white/90 rounded-full px-16 h-16 flex items-center gap-4 font-bold text-base uppercase tracking-[0.3em] transition-all active:scale-95 shadow-[0_0_80px_rgba(255,255,255,0.2)]">
                 <Rocket className="w-5 h-5" /> Deploy Startup
               </Button>
            </div>
         </header>

         <div className="flex-1 flex items-center justify-center bg-white/[0.01] rounded-[80px] border border-white/5 relative overflow-hidden p-12 group shadow-inner">
            <motion.div 
              layout
              transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
              className={`h-full bg-black rounded-[70px] border border-white/5 shadow-[0_100px_200px_rgba(0,0,0,1)] overflow-hidden relative ${
                view === 'desktop' ? 'w-full' : view === 'tablet' ? 'w-[768px]' : 'w-[375px]'
              }`}
            >
               <div className="h-full w-full overflow-y-auto no-scrollbar bg-black">
                  {mode === 'preview' ? (
                    <MaterializingWebsite isVisible={true} />
                  ) : (
                    <div className="p-20 font-mono text-[16px] text-white/30 leading-relaxed bg-black/40">
                       <pre className="animate-pulse">
                        {`// Neural Core v2.5\nimport { Materialize } from '@founder-os/neural';\n\nexport default function Startup() {\n  return (\n    <Canvas sophistication="ultra">\n       <Scaffold.Header />\n       <Scaffold.Hero />\n       <Scaffold.Footer />\n    </Canvas>\n  );\n}`}
                       </pre>
                    </div>
                  )}
               </div>
            </motion.div>
         </div>
      </main>
    </div>
  );
}
