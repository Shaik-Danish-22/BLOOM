"use client";

import { useEffect, useState } from "react";
import { MaterializingWebsite } from "@/components/cinematic/MaterializingWebsite";
import { BackgroundEffects } from "@/components/cinematic/BackgroundEffects";
import ShaderBackground from "@/components/ui/shader-background";

export default function PreviewPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-black overflow-y-auto no-scrollbar">
      <BackgroundEffects />
      <ShaderBackground />
      <MaterializingWebsite isVisible={isVisible} />
    </div>
  );
}
