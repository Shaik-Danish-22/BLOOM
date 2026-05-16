
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, 
  ArrowLeft, 
  Maximize2, 
  Smartphone, 
  Monitor, 
  Tablet, 
  Download, 
  Rocket,
  Sparkles,
  Layout,
  Palette,
  Type,
  Layers,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CinematicLoader } from "@/components/cinematic/CinematicLoader";
import { BackgroundEffects } from "@/components/cinematic/BackgroundEffects";
import { useRouter } from "next/navigation";

export default function BuilderPage() {
  const router = useRouter();
  const [isBuilding, setIsBuilding] = useState(true);
  const [view, setView] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [chat, setChat] = useState<{role: 'user' | 'assistant', text: string}[]>([
    { role: 'assistant', text: "Neural session active. I've forged the initial core of your startup. What architectural refinements shall we explore?" }
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chat]);

  const handleSend = () => {
    if (!input.trim()) return;
    setChat(prev => [...prev, { role: 'user', text: input }]);
    const currentInput = input;
    setInput("");
    
    setTimeout(() => {
      setChat(prev => [...prev, { 
        role: 'assistant', 
        text: `Understood. Modifying the ${currentInput.toLowerCase().includes('dark') ? 'chroma system' : 'visual hierarchy'}... Refactoring components to match premium startup standards.` 
      }]);
    }, 1200);
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden flex">
      <BackgroundEffects />
      
      <AnimatePresence>
        {isBuilding && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05, filter: 'blur(40px)' }}
            transition={{ duration: 1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] bg-black p-12 flex flex-col items-center justify-center"
          >
             <CinematicLoader onComplete={() => setIsBuilding(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      <aside className="w-[440px] border-r border-white/5 bg-black/40 backdrop-blur-3xl flex flex-col z-10">
        <header className="p-8 border-b border-white/5 flex items-center justify-between">
           <button onClick={() => router.push('/')} className="p-2.5 rounded-xl hover:bg-white/5 transition-all group">
              <ArrowLeft className="w-5 h-5 text-white/40 group-hover:text-white transition-colors" />
           </button>
           <div className="text-center">
             <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/80">Siteforge Architect</h3>
             <p className="text-[10px] text-white/20 uppercase tracking-[0.3em] font-bold mt-1 animate-pulse">Neural Session v1.0</p>
           </div>
           <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white/40" />
           </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide" ref={scrollRef}>
           {chat.map((msg, i) => (
             <motion.div 
               key={i} 
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
             >
               <div className={`max-w-[85%] p-5 rounded-3xl text-sm leading-relaxed ${
                 msg.role === 'user' 
                 ? 'bg-white text-black font-medium shadow-xl' 
                 : 'liquid-glass border border-white/5 text-white/60'
               }`}>
                 {msg.text}
               </div>
             </motion.div>
           ))}
        </div>

        <div className="p-8 border-t border-white/5 space-y-6">
           <div className="flex gap-3">
              <Input 
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Instruct the Architect..."
                className="bg-white/5 border-white/10 h-14 rounded-2xl focus-visible:ring-1 focus-visible:ring-white/20 px-6 placeholder:text-white/20"
              />
              <Button onClick={handleSend} size="icon" className="h-14 w-14 rounded-2xl bg-white text-black shrink-0 hover:bg-white/90 shadow-2xl transition-transform active:scale-95">
                 <Send className="w-5 h-5" />
              </Button>
           </div>
           
           <div className="space-y-3">
             <p className="text-[10px] uppercase tracking-widest font-bold text-white/20">Refinement Shortcuts</p>
             <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {[
                  { icon: Palette, label: "Deep Monochrome" },
                  { icon: Type, label: "Apple Typography" },
                  { icon: Layers, label: "Bento Grid Layout" },
                  { icon: Layout, label: "Add Pricing Section" }
                ].map((item, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setInput(item.label)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/5 text-[11px] whitespace-nowrap text-white/40 hover:text-white hover:border-white/20 transition-all liquid-glass"
                  >
                    <item.icon className="w-3.5 h-3.5" />
                    {item.label}
                  </button>
                ))}
             </div>
           </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col z-10 p-10 overflow-hidden">
         <header className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3 liquid-glass p-2 rounded-2xl border border-white/5">
               {[
                 { id: 'desktop', icon: Monitor },
                 { id: 'tablet', icon: Tablet },
                 { id: 'mobile', icon: Smartphone }
               ].map((item) => (
                 <button 
                   key={item.id}
                   onClick={() => setView(item.id as any)} 
                   className={`p-2.5 rounded-xl transition-all ${view === item.id ? 'bg-white text-black shadow-lg' : 'text-white/40 hover:text-white'}`}
                 >
                   <item.icon className="w-4 h-4" />
                 </button>
               ))}
            </div>

            <div className="flex items-center gap-4">
               <Button variant="ghost" className="text-white/40 hover:text-white flex items-center gap-2 transition-colors">
                 <Download className="w-4 h-4" /> Export Assets
               </Button>
               <Button className="bg-white text-black hover:bg-white/90 rounded-full px-8 h-12 flex items-center gap-2 font-bold shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-transform active:scale-95">
                 <Rocket className="w-4 h-4" /> Deploy Live
               </Button>
            </div>
         </header>

         <div className="flex-1 flex items-center justify-center bg-zinc-950/40 rounded-[48px] border border-white/5 relative overflow-hidden group shadow-inner">
            <motion.div 
              layout
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className={`h-[95%] bg-black rounded-[32px] border border-white/10 shadow-2xl overflow-hidden relative ${
                view === 'desktop' ? 'w-[95%]' : view === 'tablet' ? 'w-[768px]' : 'w-[375px]'
              }`}
            >
               <div className="h-full w-full overflow-y-auto scrollbar-hide bg-[#000]">
                  <nav className="p-10 flex justify-between items-center">
                     <div className="text-2xl font-bold tracking-tighter flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full border border-white/40" />
                        NEXUS
                     </div>
                     <div className="flex gap-8 text-[11px] uppercase tracking-widest font-bold text-white/40">
                        <span className="hover:text-white cursor-pointer transition-colors">Vision</span>
                        <span className="hover:text-white cursor-pointer transition-colors">Intelligence</span>
                        <span className="hover:text-white cursor-pointer transition-colors">Contact</span>
                     </div>
                  </nav>

                  <section className="px-16 py-40 space-y-12 text-center relative">
                     <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-white/5 blur-[120px] rounded-full pointer-events-none" />
                     <motion.h2 
                       initial={{ opacity: 0, y: 20 }}
                       animate={{ opacity: 1, y: 0 }}
                       className="text-7xl md:text-8xl font-headline italic leading-[0.9] tracking-tighter text-white"
                     >
                       The Neural Highway.
                     </motion.h2>
                     <p className="text-xl text-white/30 max-w-xl mx-auto font-light leading-relaxed">
                        Optimize your enterprise flow with autonomous intelligence mapping port congestion in real-time. Production-grade efficiency, orchestrated.
                     </p>
                     <Button className="bg-white text-black px-12 py-7 rounded-full font-bold text-lg hover:bg-white/90 transition-all hover:scale-105 active:scale-95">
                        Initialize Experience
                     </Button>
                  </section>

                  <section className="px-16 pb-32">
                     <div className="grid grid-cols-2 gap-10">
                        {[
                          { title: "Real-time Visibility", desc: "Granular data streams across every transit node." },
                          { title: "Predictive Engines", desc: "Anticipate disruptions before they materialize." }
                        ].map((card, idx) => (
                          <div key={idx} className="aspect-square liquid-glass rounded-[40px] border border-white/5 p-12 flex flex-col justify-end gap-4 group/card cursor-pointer text-left">
                             <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center mb-auto group-hover/card:border-white/40 transition-colors">
                                <ChevronRight className="w-5 h-5 text-white/20 group-hover/card:text-white transition-colors" />
                             </div>
                             <h4 className="text-3xl font-bold tracking-tight text-white">{card.title}</h4>
                             <p className="text-sm text-white/30 leading-relaxed">{card.desc}</p>
                          </div>
                        ))}
                     </div>
                  </section>
               </div>
            </motion.div>
            
            <button className="absolute bottom-10 right-10 p-5 rounded-2xl bg-white/5 border border-white/10 opacity-0 group-hover:opacity-100 transition-all hover:bg-white/10">
               <Maximize2 className="w-5 h-5 text-white/40" />
            </button>
         </div>
      </main>
    </div>
  );
}
