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
  ChevronRight,
  History,
  Terminal
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
    { role: 'assistant', text: "Neural Materialization Session v2.5 Active. The FounderOS Team has materialized the initial architecture based on your vision. Ready for refinements." }
  ]);

  const handleSend = () => {
    if (!input.trim()) return;
    setChat(prev => [...prev, { role: 'user', text: input }]);
    const currentInput = input;
    setInput("");
    
    setTimeout(() => {
      setChat(prev => [...prev, { 
        role: 'assistant', 
        text: `Understood. Re-orchestrating the ${currentInput.toLowerCase().includes('dark') ? 'chroma profiles' : 'layout nodes'}... Re-materializing components to match your specification.` 
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
            exit={{ opacity: 0, scale: 1.05, filter: 'blur(60px)' }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[200] bg-background"
          >
             <CinematicLoader onComplete={() => setIsBuilding(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* SIDEBAR: NEURAL ORCHESTRATOR */}
      <aside className="w-[480px] border-r border-white/5 bg-black/40 backdrop-blur-3xl flex flex-col z-10">
        <header className="p-10 border-b border-white/5 flex items-center justify-between">
           <button onClick={() => router.push('/')} className="p-3 rounded-2xl hover:bg-white/5 transition-all group border border-white/5">
              <ArrowLeft className="w-5 h-5 text-white/40 group-hover:text-white" />
           </button>
           <div className="text-center">
             <h3 className="text-[9px] font-bold uppercase tracking-[0.6em] text-white/60">Neural Terminal</h3>
             <p className="text-[7px] text-white/10 uppercase tracking-[0.3em] font-bold mt-1">FounderOS Intelligence</p>
           </div>
           <div className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white/40" />
           </div>
        </header>

        <div className="flex-1 overflow-y-auto p-10 space-y-10 scrollbar-hide">
           {chat.map((msg, i) => (
             <motion.div 
               key={i} 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
             >
               <div className={`max-w-[90%] p-8 rounded-[40px] text-xs leading-relaxed ${
                 msg.role === 'user' 
                 ? 'bg-white text-black font-semibold shadow-[0_0_30px_rgba(255,255,255,0.1)]' 
                 : 'liquid-glass border border-white/5 text-white/40 font-light'
               }`}>
                 {msg.text}
               </div>
             </motion.div>
           ))}
        </div>

        <div className="p-10 border-t border-white/5 space-y-8">
           <div className="relative">
              <input 
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Talk to the Architect..."
                className="w-full bg-white/5 border-white/10 h-16 rounded-[28px] focus:ring-1 focus:ring-white/20 px-8 text-xs text-white placeholder:text-white/10"
              />
              <Button onClick={handleSend} size="icon" className="absolute right-2 top-2 h-12 w-12 rounded-[22px] bg-white text-black hover:bg-white/90 shadow-2xl transition-transform active:scale-95">
                 <Send className="w-5 h-5" />
              </Button>
           </div>
           
           <div className="space-y-4">
             <div className="flex items-center gap-2 text-[9px] uppercase tracking-widest font-bold text-white/20">
                <Terminal className="w-3 h-3" /> Active Neural Nodes
             </div>
             <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
                {[
                  { icon: Cpu, label: "SENTINEL" },
                  { icon: Layers, label: "FORGE" },
                  { icon: Command, label: "ATLAS" },
                  { icon: Shield, label: "ORACLE" }
                ].map((item, idx) => (
                  <div 
                    key={idx}
                    className="flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/5 text-[8px] whitespace-nowrap text-white/30 font-bold liquid-glass"
                  >
                    <item.icon className="w-3 h-3" />
                    {item.label}
                  </div>
                ))}
             </div>
           </div>
        </div>
      </aside>

      {/* MAIN VIEW: MATERIALIZATION PREVIEW */}
      <main className="flex-1 flex flex-col z-10 p-12 overflow-hidden bg-background/20">
         <header className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-2 liquid-glass p-2 rounded-2xl border border-white/5 shadow-inner">
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
            </div>

            <div className="flex items-center gap-4">
               <Button variant="ghost" className="text-white/20 hover:text-white flex items-center gap-3 font-bold text-[10px] uppercase tracking-widest transition-colors">
                 <History className="w-4 h-4" /> History
               </Button>
               <Button className="bg-white text-black hover:bg-white/90 rounded-full px-12 h-14 flex items-center gap-3 font-bold text-xs uppercase tracking-widest shadow-[0_0_60px_rgba(255,255,255,0.05)] transition-transform active:scale-95">
                 <Rocket className="w-4 h-4" /> Launch Live
               </Button>
            </div>
         </header>

         <div className="flex-1 flex items-center justify-center bg-black/40 rounded-[64px] border border-white/5 relative overflow-hidden shadow-inner group p-8">
            <motion.div 
              layout
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className={`h-full bg-black rounded-[48px] border border-white/5 shadow-2xl overflow-hidden relative ${
                view === 'desktop' ? 'w-full' : view === 'tablet' ? 'w-[768px]' : 'w-[375px]'
              }`}
            >
               <div className="h-full w-full overflow-y-auto scrollbar-hide">
                  <MaterializingWebsite isVisible={!isBuilding} />
               </div>
            </motion.div>
            
            <button className="absolute bottom-12 right-12 p-6 rounded-3xl bg-white/5 border border-white/10 opacity-0 group-hover:opacity-100 transition-all hover:bg-white/10 shadow-2xl">
               <Zap className="w-5 h-5 text-white/20" />
            </button>
         </div>
      </main>
    </div>
  );
}