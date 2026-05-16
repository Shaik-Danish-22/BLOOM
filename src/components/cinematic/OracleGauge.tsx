"use client";

import { useEffect, useState } from "react";
import { motion, animate, useMotionValue, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface OracleGaugeProps {
  targetScore: number;
  className?: string;
}

export const OracleGauge = ({ targetScore, className }: OracleGaugeProps) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const controls = animate(count, targetScore, {
      duration: 4,
      ease: [0.22, 1, 0.36, 1],
      delay: 1,
      onComplete: () => setIsRevealed(true)
    });
    return controls.stop;
  }, [targetScore, count]);

  const circumference = 2 * Math.PI * 110;
  const progress = useTransform(count, [0, 100], [circumference, 0]);

  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <svg className="w-80 h-80 transform -rotate-90">
        {/* Background Arc */}
        <circle
          cx="160"
          cy="160"
          r="110"
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          className="text-white/5"
        />
        {/* Progress Arc */}
        <motion.circle
          cx="160"
          cy="160"
          r="110"
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={circumference}
          style={{ strokeDashoffset: progress }}
          strokeLinecap="round"
          className="text-white drop-shadow-[0_0_30px_white]"
        />
      </svg>
      
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <motion.span 
          className="text-9xl font-headline text-white"
        >
          {rounded}
        </motion.span>
        <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-white/20">Readiness</span>
      </div>

      {isRevealed && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute -inset-12 bg-white/10 blur-[100px] -z-10 rounded-full"
        />
      )}
    </div>
  );
};
