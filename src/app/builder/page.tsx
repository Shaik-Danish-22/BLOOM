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
  ExternalLink,
  Share2,
  Bot,
  Layers,
  Code
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
  const [startupData, setStartupData] = useState<any>(null);
  
  const [chat, setChat] = useState<{role: 'user' | 'assistant' | 'agent', text: string, agent?: string}[]>([
    { role: 'agent', agent: 'SCISSOR', text: "Bloom intelligence materialized. Neural core is stable." },
    { role: 'assistant', text: "The first layer of materialization is complete. I've focused on the editorial hierarchy. What section should we optimize next?" }
  ]);

  useEffect(() => {
    const stored = localStorage.getItem("latest_startup");
    if (stored) setStartupData(JSON.parse(stored));
    
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
        text: `Understood. Analyzing "${userText}" to refine the neural nodes.` 
      }]);
    }, 1500);
  };

  const openPreview = () => {
    window.open('/preview', '_blank');
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden flex selection:bg-white/20 font-body">
      <BackgroundEffects />
      <ShaderBackground />
      
      {/* SIDEBAR - STUDIO CONTROLS */}
      <aside className="w-[440px] border-r border-white/5 bg-black/80 backdrop-blur-3xl flex flex-col z-20">
        <header className="p-6 border-b border-white/5 flex items-center justify-between">
           <button onClick={() => router.push('/workspace')} className="p-2 rounded-xl hover:bg-white/5 text-white/40 hover:text-white transition-all">
              <ArrowLeft size={18} />
           </button>
           <h3 className="text-[9px] font-bold uppercase tracking-[0.4em] text-white/40">Bloom Neural Studio</h3>
           <div className="w-12 h-12 overflow-hidden relative rounded-xl bg-white/[0.03] border border-white/5">
              <div className="absolute inset-0 h-[140%] w-full">
                <InteractiveRobotSpline 
                  scene={SCISSOR_SCENE} 
                  className="w-full h-full scale-[1.1] translate-y-1" 
                />
              </div>
           </div>
        </header>

        <ScrollArea className="flex-1 p-6">
           <div className="space-y-6 pb-20">
             {chat.map((msg, i) => (
               <motion.div 
                 key={i} 
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
               >
                 <div className="flex flex-col gap-1.5 max-w-[90%]">
                    {msg.agent && (
                      <div className="flex items-center gap-2 mb-0.5">
                        <Bot size={10} className="text-[#DCFF00]" />
                        <span className="text-[8px] font-bold uppercase tracking-widest text-white/20">{msg.agent}</span>
                      </div>
                    )}
                    <div className={`p-4 rounded-2xl text-[13px] leading-relaxed ${
                      msg.role === 'user' 
                      ? 'bg-[#DCFF00] text-black font-medium' 
                      : 'bg-white/[0.03] border border-white/5 text-white/70 backdrop-blur-md'
                    }`}>
                      {msg.text}
                    </div>
                 </div>
               </motion.div>
             ))}
             <div ref={scrollRef} />
           </div>
        </ScrollArea>

        <div className="p-6 border-t border-white/5 bg-black/40 backdrop-blur-xl">
           <div className="relative">
              <input 
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Direct Scissor assistant..."
                className="w-full bg-white/5 border border-white/10 h-12 rounded-xl px-5 text-xs text-white placeholder:text-white/10 focus:ring-1 focus:ring-[#DCFF00]/20 outline-none transition-all"
              />
              <Button onClick={handleSend} size="icon" className="absolute right-1 top-1 h-10 w-10 bg-white text-black hover:bg-[#DCFF00] rounded-lg transition-colors">
                 <Send size={14} />
              </Button>
           </div>
        </div>
      </aside>

      {/* MAIN VIEWPORT */}
      <main className="flex-1 flex flex-col z-10 p-6 overflow-hidden bg-background/5">
         <header className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 bg-black/40 backdrop-blur-xl p-1 rounded-xl border border-white/5">
               {[
                 { id: 'desktop', icon: Monitor },
                 { id: 'tablet', icon: Tablet },
                 { id: 'mobile', icon: Smartphone }
               ].map((item) => (
                 <button 
                   key={item.id}
                   onClick={() => setView(item.id as any)} 
                   className={`p-2 rounded-lg transition-all ${view === item.id ? 'bg-white text-black shadow-lg' : 'text-white/20 hover:text-white'}`}
                 >
                   <item.icon size={14} />
                 </button>
               ))}
               <div className="w-px h-4 bg-white/10 mx-1" />
               <div className="flex bg-black/20 rounded-lg p-0.5">
                  <button 
                    onClick={() => setMode('preview')}
                    className={`px-4 py-1.5 rounded-md text-[9px] uppercase tracking-widest font-bold transition-all ${mode === 'preview' ? 'bg-white/10 text-white' : 'text-white/20 hover:text-white/40'}`}
                  >
                    <Layers size={12} className="inline mr-2" /> Materialization
                  </button>
                  <button 
                    onClick={() => setMode('code')}
                    className={`px-4 py-1.5 rounded-md text-[9px] uppercase tracking-widest font-bold transition-all ${mode === 'code' ? 'bg-white/10 text-white' : 'text-white/20 hover:text-white/40'}`}
                  >
                    <Code size={12} className="inline mr-2" /> Registry
                  </button>
               </div>
            </div>

            <div className="flex items-center gap-3">
              <Button onClick={openPreview} variant="ghost" className="text-white/40 hover:text-white hover:bg-white/5 gap-2 text-[10px] uppercase tracking-widest font-bold px-4">
                Full Preview <ExternalLink size={12} />
              </Button>
              <Button variant="ghost" className="text-white/40 hover:text-white hover:bg-white/5 gap-2 text-[10px] uppercase tracking-widest font-bold px-4">
                Share <Share2 size={12} />
              </Button>
              <Button className="bg-[#DCFF00] text-black hover:bg-[#DCFF00]/90 rounded-xl px-8 h-12 font-bold uppercase tracking-widest text-[10px] shadow-[0_0_20px_rgba(220,255,0,0.2)] transition-all active:scale-95">
                 <Rocket size={14} className="mr-2" /> Deploy Vision
              </Button>
            </div>
         </header>

         <div className="flex-1 flex items-center justify-center bg-white/[0.01] rounded-[2.5rem] border border-white/5 p-4 overflow-hidden backdrop-blur-sm">
            <motion.div 
              layout
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className={`h-full bg-black rounded-[1.5rem] border border-white/5 shadow-2xl overflow-hidden relative ${
                view === 'desktop' ? 'w-full' : view === 'tablet' ? 'w-[768px]' : 'w-[375px]'
              }`}
            >
               <div className="h-full w-full overflow-y-auto no-scrollbar bg-black">
                  {mode === 'preview' ? (
                    <MaterializingWebsite isVisible={true} />
                  ) : (
                    <div className="p-12 font-code text-[12px] text-white/30 leading-relaxed">
                       <pre className="opacity-80">
                        {`// Bloom Architecture v2.5\n// Generated Intelligence Core\n\nimport { Bloom } from '@bloom/core';\n\nexport default function Materialization() {\n  const config = ${JSON.stringify(startupData?.websiteContent?.colorPalette || [], null, 2)};\n\n  return (\n    <Canvas mode="cinematic" palette={config}>\n       <Header brand="${startupData?.forgeBrandArchitect?.companyName || 'STARTUP'}" />\n       <Hero \n          headline="${startupData?.websiteContent?.sections?.find(s => s.type === 'hero')?.title || ''}"\n          dna="${startupData?.websiteContent?.typographyStrategy || ''}"\n       />\n       <Features items={${JSON.stringify(startupData?.websiteContent?.sections?.find(s => s.type === 'features')?.items || [], null, 2)}} />\n    </Canvas>\n  );\n}`}
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
