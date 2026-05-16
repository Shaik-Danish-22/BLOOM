
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, 
  ArrowLeft, 
  Monitor, 
  Smartphone, 
  Tablet, 
  Download, 
  Rocket, 
  Sparkles,
  Layers,
  Zap,
  Cpu,
  Shield,
  Command,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CinematicLoader } from "@/components/cinematic/CinematicLoader";
import { BackgroundEffects } from "@/components/cinematic/BackgroundEffects";
import { useRouter } from "next/navigation";
import { MaterializingWebsite } from "@/components/cinematic/MaterializingWebsite";

export default function BuilderPage() {
  const router = useRouter();
  const [isBuilding, setIsBuilding] = useState(true);
  const [view, setView] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [input, setInput] = useState("");
  const [chat, setChat] = useState<{role: 'user' | 'assistant', text: string}[]>([
    { role: 'assistant', text: "Neural Materialization Session v2.5 Active. The FounderOS Team has completed the initial build. Ready for structural or visual refinements." }
  ]);

  const handleSend = () => {
    if (!input.trim()) return;
    setChat(prev => [...prev, { role: 'user', text: input }]);
    const currentInput = input;
    setInput("");
    
    setTimeout(() => {
      setChat(prev => [...prev, { 
        role: 'assistant', 
        text: `Understood. Refactoring the ${currentInput.toLowerCase().includes('dark') ? 'chroma system' : 'layout nodes'}... Materializing new components to match your specification.` 
      }]);
    }, 1200);
  };

  return (
    <div className="relative min-h-screen bg-background overflow-hidden flex selection:bg-white/20">
      <BackgroundEffects />
      
      <AnimatePresence>
        {isBuilding && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05, filter: 'blur(40px)' }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[200] bg-background"
          >
             <CinematicLoader onComplete={() => setIsBuilding(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* LEFT SIDE: AI ORCHESTRATOR */}
      <aside className="w-[440px] border-r border-white/5 bg-background/40 backdrop-blur-3xl flex flex-col z-10">
        <header className="p-8 border-b border-white/5 flex items-center justify-between">
           <button onClick={() => router.push('/')} className="p-2.5 rounded-xl hover:bg-white/5 transition-all group">
              <ArrowLeft className="w-5 h-5 text-white/40 group-hover:text-white" />
           </button>
           <div className="text-center">
             <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/80">Neural Architect</h3>
             <p className="text-[8px] text-white/20 uppercase tracking-[0.2em] font-bold mt-1">FounderOS Active</p>
           </div>
           <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white/40" />
           </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide">
           {chat.map((msg, i) => (
             <motion.div 
               key={i} 
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
             >
               <div className={`max-w-[90%] p-6 rounded-[32px] text-xs leading-relaxed ${
                 msg.role === 'user' 
                 ? 'bg-white text-black font-medium shadow-xl' 
                 : 'liquid-glass border border-white/5 text-white/50 font-light'
               }`}>
                 {msg.text}
               </div>
             </motion.div>
           ))}
        </div>

        <div className="p-8 border-t border-white/5 space-y-6">
           <div className="relative">
              <Input 
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Talk to the Architect..."
                className="bg-white/5 border-white/10 h-14 rounded-[20px] focus-visible:ring-1 focus-visible:ring-white/20 px-6 placeholder:text-white/10 text-xs"
              />
              <Button onClick={handleSend} size="icon" className="absolute right-1.5 top-1.5 h-11 w-11 rounded-[16px] bg-white text-black hover:bg-white/90 shadow-2xl transition-transform active:scale-95">
                 <Send className="w-4 h-4" />
              </Button>
           </div>
           
           <div className="space-y-4">
             <p className="text-[8px] uppercase tracking-widest font-bold text-white/10">Active Neural Nodes</p>
             <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {[
                  { icon: Cpu, label: "CEO" },
                  { icon: Layers, label: "Forge" },
                  { icon: Command, label: "Atlas" },
                  { icon: Shield, label: "Oracle" }
                ].map((item, idx) => (
                  <div 
                    key={idx}
                    className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/5 text-[8px] whitespace-nowrap text-white/30 font-bold liquid-glass"
                  >
                    <item.icon className="w-3 h-3" />
                    {item.label}
                  </div>
                ))}
             </div>
           </div>
        </div>
      </aside>

      {/* RIGHT SIDE: MATERIALIZATION PREVIEW */}
      <main className="flex-1 flex flex-col z-10 p-10 overflow-hidden bg-background/20">
         <header className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2 liquid-glass p-1.5 rounded-2xl border border-white/5">
               {[
                 { id: 'desktop', icon: Monitor },
                 { id: 'tablet', icon: Tablet },
                 { id: 'mobile', icon: Smartphone }
               ].map((item) => (
                 <button 
                   key={item.id}
                   onClick={() => setView(item.id as any)} 
                   className={`p-2.5 rounded-xl transition-all ${view === item.id ? 'bg-white text-black shadow-lg' : 'text-white/20 hover:text-white'}`}
                 >
                   <item.icon className="w-3.5 h-3.5" />
                 </button>
               ))}
            </div>

            <div className="flex items-center gap-4">
               <Button variant="ghost" className="text-white/20 hover:text-white flex items-center gap-2 font-bold text-[10px] uppercase tracking-widest transition-colors">
                 <Download className="w-3.5 h-3.5" /> Assets
               </Button>
               <Button className="bg-white text-black hover:bg-white/90 rounded-full px-10 h-12 flex items-center gap-3 font-bold text-xs uppercase tracking-widest shadow-[0_0_40px_rgba(255,255,255,0.05)] transition-transform active:scale-95">
                 <Rocket className="w-3.5 h-3.5" /> Live Deploy
               </Button>
            </div>
         </header>

         <div className="flex-1 flex items-center justify-center bg-black/40 rounded-[56px] border border-white/5 relative overflow-hidden shadow-inner group">
            <motion.div 
              layout
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className={`h-[95%] bg-black rounded-[40px] border border-white/5 shadow-2xl overflow-hidden relative ${
                view === 'desktop' ? 'w-[95%]' : view === 'tablet' ? 'w-[768px]' : 'w-[375px]'
              }`}
            >
               <div className="h-full w-full overflow-y-auto scrollbar-hide">
                  <MaterializingWebsite isVisible={!isBuilding} />
               </div>
            </motion.div>
            
            <button className="absolute bottom-10 right-10 p-5 rounded-3xl bg-white/5 border border-white/10 opacity-0 group-hover:opacity-100 transition-all hover:bg-white/10">
               <Zap className="w-4 h-4 text-white/20" />
            </button>
         </div>
      </main>
    </div>
  );
}
