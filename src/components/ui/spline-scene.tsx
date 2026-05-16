
"use client";

import { Suspense, lazy } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline'));

interface SplineSceneProps {
  scene: string;
  className?: string;
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <Suspense 
      fallback={
        <div className="w-full h-full flex items-center justify-center bg-transparent">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 border-2 border-white/5 rounded-full" />
            <div className="absolute inset-0 border-2 border-white/20 border-t-transparent rounded-full animate-spin" />
          </div>
        </div>
      }
    >
      <Spline
        scene={scene}
        className={className}
      />
    </Suspense>
  );
}
