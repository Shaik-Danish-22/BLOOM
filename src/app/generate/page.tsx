
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CinematicLoader } from "@/components/cinematic/CinematicLoader";

export default function GeneratePage() {
  const router = useRouter();

  useEffect(() => {
    const context = localStorage.getItem("materialization_context");
    const startup = localStorage.getItem("latest_startup");
    
    if (!context || !startup) {
      router.push("/workspace");
      return;
    }
  }, [router]);

  const handleComplete = () => {
    router.push("/builder");
  };

  return (
    <div className="h-screen w-screen bg-black">
      <CinematicLoader onComplete={handleComplete} />
    </div>
  );
}
