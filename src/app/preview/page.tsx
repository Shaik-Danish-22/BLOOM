
"use client";

import { useEffect, useState } from "react";
import { MaterializingWebsite } from "@/components/cinematic/MaterializingWebsite";
import { BackgroundEffects } from "@/components/cinematic/BackgroundEffects";
import ShaderBackground from "@/components/ui/shader-background";

export default function PreviewPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [data, setData] = useState<any>(null);
  const [context, setContext] = useState<any>(null);

  useEffect(() => {
    const storedData = localStorage.getItem("latest_startup");
    const storedContext = localStorage.getItem("materialization_context");
    
    if (storedData) {
      setData(JSON.parse(storedData));
    }
    if (storedContext) {
      setContext(JSON.parse(storedContext));
    }
    
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-black overflow-y-auto no-scrollbar">
      <BackgroundEffects />
      <ShaderBackground />
      <div className="h-screen w-full">
        <MaterializingWebsite isVisible={isVisible} data={data} context={context} />
      </div>
    </div>
  );
}
