
"use client";

import { motion } from "framer-motion";
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

/**
 * @fileOverview Skateboard_Node Loader: A minimalist, cinematic loading experience.
 * Features a motion-driven figure and decorative directional nodes.
 */

export function SkateboardLoader() {
  return (
    <div className="flex flex-col items-center justify-center space-y-32">
      {/* Skateboarder Character */}
      <div className="relative">
        <motion.div
          animate={{
            x: [-40, 40, -40],
            y: [0, -4, 0],
            rotate: [-2, 2, -2]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative flex flex-col items-center"
        >
          {/* Stylized Figure */}
          <div className="w-12 h-12 rounded-full border-[3px] border-[#DCFF00] mb-1 relative">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#DCFF00] rounded-full animate-pulse" />
          </div>
          <div className="w-1.5 h-16 bg-[#DCFF00] rounded-full" />
          <div className="flex gap-10 -mt-8">
             <div className="w-1.5 h-12 bg-[#DCFF00] rounded-full origin-top -rotate-45" />
             <div className="w-1.5 h-12 bg-[#DCFF00] rounded-full origin-top rotate-45" />
          </div>
          
          {/* Skateboard */}
          <div className="mt-2 w-28 h-2 bg-[#DCFF00] rounded-full relative">
            <div className="absolute -bottom-1.5 left-4 w-3 h-3 rounded-full border-2 border-[#DCFF00]" />
            <div className="absolute -bottom-1.5 right-4 w-3 h-3 rounded-full border-2 border-[#DCFF00]" />
          </div>

          {/* Speed Lines */}
          <div className="absolute -left-12 top-1/2 space-y-2 opacity-40">
             <motion.div 
               animate={{ x: [0, -20], opacity: [0.5, 0] }}
               transition={{ duration: 0.8, repeat: Infinity }}
               className="w-6 h-0.5 bg-[#DCFF00]" 
             />
             <motion.div 
               animate={{ x: [0, -30], opacity: [0.5, 0] }}
               transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
               className="w-8 h-0.5 bg-[#DCFF00]" 
             />
          </div>
        </motion.div>
      </div>

      {/* Directional Control UI (Decorative) */}
      <div className="flex flex-col items-center gap-2 opacity-20">
         <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-white">
            <ChevronUp size={14} />
         </div>
         <div className="flex gap-2">
            <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-white">
               <ChevronLeft size={14} />
            </div>
            <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-white">
               <ChevronDown size={14} />
            </div>
            <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-white">
               <ChevronRight size={14} />
            </div>
         </div>
      </div>
    </div>
  );
}
