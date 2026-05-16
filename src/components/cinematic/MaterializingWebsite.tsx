
"use client";

import { motion } from "framer-motion";
import { ChevronRight, ArrowRight, Play, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MaterializingWebsite({ isVisible }: { isVisible: boolean }) {
  if (!isVisible) return null;

  return (
    <div className="bg-[#000] min-h-full">
      {/* NAVBAR */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 1 }}
        className="p-10 flex justify-between items-center"
      >
         <div className="text-2xl font-bold tracking-tighter flex items-center gap-2">
            <div className="w-6 h-6 rounded-full border border-white/40" />
            NEXUS
         </div>
         <div className="flex gap-10 text-[11px] uppercase tracking-[0.3em] font-bold text-white/30">
            <span className="hover:text-white cursor-pointer transition-colors">Intelligence</span>
            <span className="hover:text-white cursor-pointer transition-colors">Protocols</span>
            <span className="hover:text-white cursor-pointer transition-colors">Access</span>
         </div>
      </motion.nav>

      {/* HERO MATERIALIZATION */}
      <section className="px-20 py-40 space-y-16 text-center relative">
         <motion.div 
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.5, duration: 2 }}
           className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-white/[0.03] blur-[140px] rounded-full pointer-events-none" 
         />
         
         <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-white/5 bg-white/[0.02] text-[10px] uppercase tracking-[0.4em] font-bold text-white/40"
            >
              <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
              Autonomous Supply Protocol
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1.2 }}
              className="text-8xl font-headline italic leading-[0.85] tracking-tight text-white"
            >
              The Neural <br /> Highway.
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1.5 }}
              className="text-2xl text-white/20 max-w-2xl mx-auto font-light leading-relaxed"
            >
              Optimize your global transit flow with autonomous intelligence mapping every transit node in real-time.
            </motion.p>
         </div>

         <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ delay: 1.5 }}
         >
           <Button className="bg-white text-black px-16 py-8 rounded-full font-bold text-xl hover:bg-white/90 transition-all hover:scale-105 shadow-2xl">
              Initialize Transit
           </Button>
         </motion.div>
      </section>

      {/* FEATURE MATERIALIZATION */}
      <section className="px-16 pb-40">
         <div className="grid grid-cols-3 gap-10">
            {[
              { title: "Predictive Routing", desc: "Anticipate disruptions before they manifest." },
              { title: "Quantum Visibility", desc: "Granular data streams across every transit node." },
              { title: "Neural Logic", desc: "Autonomous correction protocols for failed deliveries." }
            ].map((card, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8 + (idx * 0.2), duration: 1 }}
                className="aspect-square liquid-glass rounded-[48px] border border-white/5 p-16 flex flex-col justify-end gap-6 group cursor-pointer"
              >
                 <div className="w-16 h-16 rounded-[24px] border border-white/10 flex items-center justify-center mb-auto group-hover:border-white/40 transition-colors">
                    <ChevronRight className="w-6 h-6 text-white/20 group-hover:text-white transition-colors" />
                 </div>
                 <h4 className="text-4xl font-bold tracking-tight text-white leading-tight">{card.title}</h4>
                 <p className="text-lg text-white/20 leading-relaxed font-light">{card.desc}</p>
              </motion.div>
            ))}
         </div>
      </section>

      {/* DATA VISUALIZATION SECTION */}
      <section className="px-16 pb-40">
         <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ delay: 2.5, duration: 1.5 }}
           className="liquid-glass rounded-[64px] border border-white/5 p-20 flex flex-col items-center text-center space-y-12"
         >
            <div className="space-y-4">
               <h3 className="text-sm font-bold uppercase tracking-[0.5em] text-white/20">Operational Efficiency</h3>
               <div className="text-[12rem] font-headline italic leading-none text-white">99.9%</div>
            </div>
            <div className="flex gap-12">
               <div className="flex items-center gap-3 text-white/40">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="text-xs uppercase tracking-widest font-bold">Latency Reduced</span>
               </div>
               <div className="flex items-center gap-3 text-white/40">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="text-xs uppercase tracking-widest font-bold">Neural Sync Active</span>
               </div>
            </div>
         </motion.div>
      </section>
    </div>
  );
}
