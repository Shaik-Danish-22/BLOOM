'use client';
import { Suspense, lazy } from 'react';
const Spline = lazy(() => import('@splinetool/react-spline'));

interface InteractiveRobotSplineProps {
  scene: string;
  className?: string;
}

export function InteractiveRobotSpline({ scene, className }: InteractiveRobotSplineProps) {
  return (
    <Suspense
      fallback={
        <div className="w-full h-full flex items-center justify-center bg-transparent">
           <div className="w-6 h-6 rounded-full border-2 border-white/5 border-t-white/40 animate-spin" />
        </div>
      }
    >
      <div className="w-full h-full overflow-hidden">
        <Spline scene={scene} className={className} />
      </div>
    </Suspense>
  );
}
