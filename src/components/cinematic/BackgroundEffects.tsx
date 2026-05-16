"use client";

import { motion } from "framer-motion";

export const BackgroundEffects = () => {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-black">
      {/* Primary Atmospheric Glows */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.45, 0.3],
          x: [-20, 20, -20],
          y: [-20, 20, -20]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-1/4 -left-1/4 w-[150%] h-[150%] bg-blue-900/10 blur-[200px] rounded-full"
      />
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.25, 0.35, 0.25],
          x: [20, -20, 20],
          y: [20, -20, 20]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute -bottom-1/4 -right-1/4 w-[150%] h-[150%] bg-indigo-950/10 blur-[200px] rounded-full"
      />
      
      {/* Neural Scanline Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.2)_50%),linear-gradient(90deg,rgba(255,255,255,0.02),rgba(255,255,255,0),rgba(255,255,255,0.02))] bg-[length:100%_4px,3px_100%] pointer-events-none opacity-50" />
      
      {/* Grain/Noise Layer */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
      
      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
    </div>
  );
};
