
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
  Code, 
  Globe, 
  Bot,
  Zap,
  Cpu
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
    { role: 'agent', agent: 'SCISSOR', text: "Bloom intelligence materialized. Neural core is stable." },
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
      
      <aside className="w-[480px] border-r border-white/5 bg-black/60 backdrop-blur-3xl flex flex-col z-10">
        <header className="p-8 border-b border-white/5 flex items-center justify-between">
           <button onClick={() => router.push('/workspace')} className="p-3 rounded-xl hover:bg-white/5 border border-white/5">
              <ArrowLeft size={20} className="text-white/40" />
           </button>
           <h3 className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/40">Bloom Neural Studio</h3>
           <div className="w-16 h-20 overflow-hidden relative rounded-xl bg-white/5">
              <div className="absolute inset-0 h-[120%] w-full">
                <InteractiveRobotSpline 
                  scene={SCISSOR_SCENE} 
                  className="w-full h-full scale-[1] translate-y-2" 
                />
              </div>
           </div>
        </header>

        <ScrollArea className="flex-1 p-8">
           <div className="space-y-8">
             {chat.map((msg, i) => (
               <motion.div 
                 key={i} 
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
               >
                 <div className="flex flex-col gap-2 max-w-[90%]">
                    {msg.agent && (
                      <div className="flex items-center gap-2 mb-1">
                        <Bot size={12} className="text-white/20" />
                        <span className="text-[9px] font-bold uppercase tracking-widest text-white/20">{msg.agent}</span>
                      </div>
                    )}
                    <div className={`p-6 rounded-2xl text-[14px] leading-relaxed ${
                      msg.role === 'user' 
                      ? 'bg-white text-black font-medium' 
                      : 'liquid-glass border border-white/5 text-white/80'
                    }`}>
                      {msg.text}
                    </div>
                 </div>
               </motion.div>
             ))}
             <div ref={scrollRef} />
           </div>
        </ScrollArea>

        <div className="p-8 border-t border-white/5 space-y-4">
           <div className="relative group">
              <input 
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Direct Scissor..."
                className="w-full bg-white/5 border border-white/10 h-14 rounded-2xl px-6 text-sm text-white placeholder:text-white/10"
              />
              <Button onClick={handleSend} size="icon" className="absolute right-2 top-2 h-10 w-10 bg-white text-black hover:bg-white/90 rounded-xl">
                 <Send size={16} />
              </Button>
           </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col z-10 p-8 overflow-hidden bg-background/20 relative">
         <header className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3 liquid-glass p-1.5 rounded-xl">
               {[
                 { id: 'desktop', icon: Monitor },
                 { id: 'tablet', icon: Tablet },
                 { id: 'mobile', icon: Smartphone }
               ].map((item) => (
                 <button 
                   key={item.id}
                   onClick={() => setView(item.id as any)} 
                   className={`p-2.5 rounded-lg transition-all ${view === item.id ? 'bg-white text-black shadow-lg' : 'text-white/20 hover:text-white'}`}
                 >
                   <item.icon size={16} />
                 </button>
               ))}
               <div className="w-px h-6 bg-white/10 mx-1" />
               <button 
                onClick={() => setMode(mode === 'preview' ? 'code' : 'preview')}
                className={`flex items-center gap-3 px-6 py-2 rounded-lg text-[10px] uppercase tracking-widest font-bold ${mode === 'code' ? 'bg-white text-black shadow-lg' : 'text-white/40 hover:text-white'}`}
               >
                 {mode === 'code' ? 'Registry' : 'Materialization'}
               </button>
            </div>

            <Button className="liquid-glass-strong bg-white text-black rounded-full px-12 h-14 font-bold uppercase tracking-widest shadow-xl">
               <Rocket size={18} className="mr-3" /> Deploy
            </Button>
         </header>

         <div className="flex-1 flex items-center justify-center liquid-glass bg-white/[0.01] rounded-[3rem] border-white/5 p-8 overflow-hidden">
            <motion.div 
              layout
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className={`h-full bg-black rounded-[2rem] border border-white/5 shadow-2xl overflow-hidden relative ${
                view === 'desktop' ? 'w-full' : view === 'tablet' ? 'w-[768px]' : 'w-[375px]'
              }`}
            >
               <div className="h-full w-full overflow-y-auto no-scrollbar bg-black">
                  {mode === 'preview' ? (
                    <MaterializingWebsite isVisible={true} />
                  ) : (
                    <div className="p-16 font-code text-sm text-white/30 leading-relaxed">
                       <pre className="animate-pulse">
                        {`// Bloom Architecture v2.5\nimport { Bloom } from '@bloom/core';\n\nexport default function Startup() {\n  return (\n    <Canvas mode="cinematic">\n       <Header />\n       <Hero content="AI Materialization" />\n       <Features items={['Mesh Extraction', 'Growth Neural']} />\n    </Canvas>\n  );\n}`}
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
