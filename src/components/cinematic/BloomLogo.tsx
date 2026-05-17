
"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface BloomLogoProps {
  size?: number;
  className?: string;
  animate?: boolean;
}

export const BloomLogo = ({ size = 32, className, animate = true }: BloomLogoProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(hw * 1.08, -len * 0.2, hw * 0.46, -len * 0.82, 0, -len);
      ctx.bezierCurveTo(-hw * 0.46, -len * 0.82, -hw * 1.08, -len * 0.2, 0, 0);

      const grad = ctx.createLinearGradient(0, 0, 0, -len);
      grad.addColorStop(0.0, colors[0]);
      grad.addColorStop(0.5, colors[1]);
      grad.addColorStop(1.0, colors[2] + "00");
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.restore();
    };

    let frame = 0;
    const render = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      
      const internalSize = 200; // Fixed coordinate space
      const scale = canvas.width / internalSize;
      ctx.scale(scale, scale);
      ctx.translate(100, 100);

      const elapsed = animate ? frame / 60 : 1;
      
      const rings = [
        { n: 8, len: 75, hw: 30, offset: 0, r: 8, t: 0.0, colors: ["#FFF176", "#FFD600", "#C68A00"] },
        { n: 10, len: 55, hw: 22, offset: 18, r: 5, t: 0.2, colors: ["#FFB300", "#E65100", "#8D3200"] },
        { n: 8, len: 35, hw: 14, offset: 5, r: 3, t: 0.4, colors: ["#FF6F00", "#BF360C", "#4E1000"] }
      ];

      rings.forEach((ring) => {
        for (let i = 0; i < ring.n; i++) {
          const petalStart = ring.t + (i * 0.05) / ring.n;
          const progress = animate ? Math.min(Math.max(elapsed - petalStart, 0) / 0.8, 1) : 1;
          if (progress <= 0) continue;

          const angle = (i * (360 / ring.n) + ring.offset) * (Math.PI / 180);
          ctx.save();
          ctx.translate(Math.cos(angle) * ring.r, Math.sin(angle) * ring.r);
          ctx.rotate(angle + Math.PI / 2);
          drawPetal(ctx, ring.len, ring.hw, ring.colors, progress);
          ctx.restore();
        }
      });

      // Center Disc
      if (elapsed > 0.6 || !animate) {
        const p = animate ? Math.min((elapsed - 0.6) / 0.4, 1) : 1;
        ctx.save();
        ctx.globalAlpha = p;
        const disc = ctx.createRadialGradient(0, 0, 0, 0, 0, 15);
        disc.addColorStop(0, "white");
        disc.addColorStop(1, "#FFD600");
        ctx.fillStyle = disc;
        ctx.beginPath();
        ctx.arc(0, 0, 12, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      ctx.restore();
      if (animate && frame < 120) {
        frame++;
        requestAnimationFrame(render);
      }
    };

    canvas.width = size * 2;
    canvas.height = size * 2;
    render();
  }, [size, animate]);

  return (
    <canvas 
      ref={canvasRef} 
      style={{ width: size, height: size }}
      className={cn("shrink-0", className)}
    />
  );
};
