
"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const VIEWBOX_W = 400;
const VIEWBOX_H = 540;
const FLOWER_X = 200;
const FLOWER_Y = 188;
const SPEED = 1.0;

interface BloomSplashProps {
  onComplete?: () => void;
}

export const BloomSplash = ({ onComplete }: BloomSplashProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const drawPetal = (
      ctx: CanvasRenderingContext2D,
      len: number,
      hw: number,
      colors: string[],
      progress: number
    ) => {
      if (progress <= 0) return;

      const pf = easeOutCubic(progress);
      const scaleX = 0.2 + 0.8 * pf;
      const scaleY = pf;

      ctx.save();
      ctx.scale(scaleX, scaleY);

      // Path
      ctx.beginPath();
      ctx.moveTo(0, 0);
      // Right side
      ctx.bezierCurveTo(hw * 1.08, -len * 0.2, hw * 0.46, -len * 0.82, 0, -len);
      // Left side
      ctx.bezierCurveTo(-hw * 0.46, -len * 0.82, -hw * 1.08, -len * 0.2, 0, 0);

      // Fill
      const grad = ctx.createLinearGradient(0, 0, 0, -len);
      grad.addColorStop(0.0, colors[0] + "FA");
      grad.addColorStop(0.28, colors[0] + "E6");
      grad.addColorStop(0.62, colors[1] + "C2");
      grad.addColorStop(0.88, colors[2] + "66");
      grad.addColorStop(1.0, colors[2] + "05");
      ctx.fillStyle = grad;
      ctx.fill();

      // Side shadows
      const shadowGrad = ctx.createLinearGradient(-hw, 0, hw, 0);
      shadowGrad.addColorStop(0, "rgba(0,0,0,0.38)");
      shadowGrad.addColorStop(0.2, "rgba(0,0,0,0)");
      shadowGrad.addColorStop(0.8, "rgba(0,0,0,0)");
      shadowGrad.addColorStop(1, "rgba(0,0,0,0.38)");
      ctx.fillStyle = shadowGrad;
      ctx.fill();

      // Stroke
      ctx.strokeStyle = "rgba(0,0,0,0.28)";
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // Vein
      if (pf > 0.3) {
        ctx.beginPath();
        ctx.moveTo(0, -len * 0.05);
        ctx.lineTo(0, -len * 0.7);
        ctx.strokeStyle = "rgba(255,255,255,0.18)";
        ctx.lineWidth = hw * 0.06;
        ctx.stroke();
      }

      ctx.restore();
    };

    const animate = (time: number) => {
      if (!startTimeRef.current) startTimeRef.current = time;
      const elapsed = (time - startTimeRef.current) / 1000 * SPEED;

      // Reset
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();

      // Responsive scaling
      const scale = Math.min(canvas.width / VIEWBOX_W, canvas.height / VIEWBOX_H);
      ctx.translate(
        (canvas.width - VIEWBOX_W * scale) / 2,
        (canvas.height - VIEWBOX_H * scale) / 2
      );
      ctx.scale(scale, scale);

      // Draw Stem
      const stemProg = Math.min(elapsed / 0.55, 1);
      if (stemProg > 0) {
        const ep = easeOutCubic(stemProg);
        ctx.beginPath();
        ctx.moveTo(FLOWER_X, FLOWER_Y + 14);
        ctx.quadraticCurveTo(FLOWER_X - 10, FLOWER_Y + 100, FLOWER_X, FLOWER_Y + 14 + 300 * ep);
        ctx.strokeStyle = "#2A5010";
        ctx.lineWidth = 5;
        ctx.lineCap = "round";
        ctx.stroke();
      }

      // Draw Leaves
      const drawLeaf = (x: number, y: number, rot: number, tStart: number) => {
        const prog = Math.min(Math.max(elapsed - tStart, 0) / 0.45, 1);
        if (prog <= 0) return;
        const ep = easeOutCubic(prog);
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rot);
        ctx.scale(ep, ep);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(20, -10, 40, -40, 0, -60);
        ctx.bezierCurveTo(-40, -40, -20, -10, 0, 0);
        const lGrad = ctx.createLinearGradient(0, 0, 0, -60);
        lGrad.addColorStop(0, "rgba(42, 80, 16, 0.2)");
        lGrad.addColorStop(1, "rgba(42, 80, 16, 1)");
        ctx.fillStyle = lGrad;
        ctx.fill();
        // midrib
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -50);
        ctx.strokeStyle = "rgba(255,255,255,0.2)";
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();
      };
      drawLeaf(FLOWER_X - 4, FLOWER_Y + 115, -Math.PI / 4, 0.42);
      drawLeaf(FLOWER_X + 4, FLOWER_Y + 170, Math.PI / 4, 0.58);

      // Draw Rings
      const rings = [
        { n: 9, len: 155, hw: 60, offset: 0, r: 20, t: 0.0, colors: ["#FFF176", "#FFD600", "#C68A00"] },
        { n: 11, len: 118, hw: 44, offset: 16, r: 14, t: 0.45, colors: ["#FFB300", "#E65100", "#8D3200"] },
        { n: 9, len: 76, hw: 30, offset: 5, r: 8, t: 0.85, colors: ["#FF6F00", "#BF360C", "#4E1000"] }
      ];

      rings.forEach((ring) => {
        for (let i = 0; i < ring.n; i++) {
          const petalStart = ring.t + (i * 0.14) / ring.n;
          const progress = Math.min(Math.max(elapsed - petalStart, 0) / 0.65, 1);
          if (progress <= 0) continue;

          const angle = (i * (360 / ring.n) + ring.offset) * (Math.PI / 180);
          ctx.save();
          ctx.translate(FLOWER_X + Math.cos(angle) * ring.r, FLOWER_Y + Math.sin(angle) * ring.r);
          ctx.rotate(angle + Math.PI / 2);
          drawPetal(ctx, ring.len, ring.hw, ring.colors, progress);
          ctx.restore();
        }
      });

      // Core Glow
      if (elapsed > 1.0) {
        const prog = Math.min((elapsed - 1.0) / 0.5, 1);
        ctx.save();
        ctx.globalAlpha = prog;
        const glow = ctx.createRadialGradient(FLOWER_X, FLOWER_Y, 0, FLOWER_X, FLOWER_Y, 65);
        glow.addColorStop(0, "#FFD600");
        glow.addColorStop(1, "transparent");
        ctx.fillStyle = glow;
        ctx.shadowColor = "#FFD600";
        ctx.shadowBlur = 30;
        ctx.beginPath();
        ctx.arc(FLOWER_X, FLOWER_Y, 65, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Core Disc
      if (elapsed > 1.12) {
        const prog = Math.min((elapsed - 1.12) / 0.3, 1);
        ctx.save();
        ctx.globalAlpha = prog;
        const disc = ctx.createRadialGradient(FLOWER_X - 8, FLOWER_Y - 8, 0, FLOWER_X, FLOWER_Y, 30);
        disc.addColorStop(0, "white");
        disc.addColorStop(1, "#FFD600");
        ctx.fillStyle = disc;
        ctx.beginPath();
        ctx.arc(FLOWER_X, FLOWER_Y, 30, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Stamens
      if (elapsed > 1.25) {
        const prog = Math.min((elapsed - 1.25) / 0.3, 1);
        ctx.save();
        ctx.globalAlpha = prog * 0.9;
        ctx.fillStyle = "#FFD600";
        for (let i = 0; i < 18; i++) {
          const a = (i * (360 / 18)) * (Math.PI / 180);
          ctx.beginPath();
          ctx.arc(FLOWER_X + Math.cos(a) * 17, FLOWER_Y + Math.sin(a) * 17, 2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.beginPath();
        ctx.arc(FLOWER_X, FLOWER_Y, 7, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.restore();
      }

      // Pollen Motes
      ctx.save();
      const pollenCount = 90;
      for (let i = 0; i < pollenCount; i++) {
        const angle = i * 137.5 * (Math.PI / 180);
        const dist = 40 + i * 1.5;
        const tOffset = i * 0.01;
        const life = Math.min(Math.max(elapsed - tOffset, 0) / 2, 1);
        if (life <= 0) continue;

        const x = FLOWER_X + Math.cos(angle) * dist;
        const y = FLOWER_Y + Math.sin(angle) * dist - 45 * life;
        const alpha = Math.sin(life * Math.PI) * 0.6;
        
        ctx.globalAlpha = alpha;
        ctx.fillStyle = "#FFD600";
        ctx.beginPath();
        ctx.arc(x, y, 1.2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      ctx.restore();
      requestAnimationFrame(animate);
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    const animReq = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animReq);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-[#060409] flex flex-col items-center justify-center overflow-hidden">
      {/* Background Aura */}
      <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-full max-w-[800px] aspect-square bg-[#A04105]/20 blur-[120px] rounded-full pointer-events-none" />
      
      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.94)_100%)] pointer-events-none" />
      
      {/* Flower Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-10" />

      {/* Wordmark */}
      <div className="absolute bottom-[15%] z-20 text-center flex flex-col items-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.96, y: 0 }}
          transition={{ delay: 1.5, duration: 1.2 }}
          className="text-white text-[9.5rem] font-light uppercase tracking-[0.62em] leading-none mb-4 select-none"
          style={{ 
            fontFamily: "'Cormorant Garamond', serif",
            textShadow: "0 0 20px rgba(255, 214, 0, 0.4)"
          }}
        >
          BLOOM
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.26 }}
          transition={{ delay: 2.2, duration: 1.5 }}
          className="text-white text-base font-light uppercase tracking-[0.50em] select-none"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Intelligence Materialized.
        </motion.p>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </div>
  );
};
