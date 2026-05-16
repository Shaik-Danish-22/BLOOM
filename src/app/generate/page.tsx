
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CinematicLoader } from "@/components/cinematic/CinematicLoader";
import { BackgroundEffects } from "@/components/cinematic/BackgroundEffects";

export default function GeneratePage() {
  const router = useRouter();

  const handleComplete = () => {
    router.push("/builder");
  };

  return (
    <div className="relative min-h-screen bg-black flex flex-col items-center justify-center p-12">
      <BackgroundEffects />
      <CinematicLoader onComplete={handleComplete} />
    </div>
  );
}
