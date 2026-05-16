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
      duration: 3,
      ease: "easeOut",
      delay: 1,
      onComplete: () => setIsRevealed(true)
    });
    return controls.stop;
  }, [targetScore, count]);

  const circumference = 2 * Math.PI * 90;
  const progress = useTransform(count, [0, 100], [circumference, 0]);

  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <svg className="w-72 h-72 transform -rotate-90">
        {/* Background Arc */}
        <circle
          cx="144"
          cy="144"
          r="90"
          stroke="currentColor"
          strokeWidth="12"
          fill="transparent"
          className="text-white/5"
        />
        {/* Progress Arc */}
        <motion.circle
          cx="144"
          cy="144"
          r="90"
          stroke="currentColor"
          strokeWidth="12"
          fill="transparent"
          strokeDasharray={circumference}
          style={{ strokeDashoffset: progress }}
          strokeLinecap="round"
          className="text-primary drop-shadow-[0_0_15px_rgba(159,92,240,0.6)]"
        />
      </svg>
      
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <motion.span 
          className="text-8xl font-headline text-white"
        >
          {rounded}
        </motion.span>
        <span className="text-xs uppercase tracking-[0.3em] font-bold text-primary/60">Investor Score</span>
      </div>

      {isRevealed && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute -inset-8 bg-primary/20 blur-[80px] -z-10 rounded-full"
        />
      )}
    </div>
  );
};
