"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { BackgroundEffects } from "@/components/cinematic/BackgroundEffects";
import { AgentStep } from "@/components/cinematic/AgentStep";
import { generateStartupIdea } from "@/ai/flows/generate-startup-idea";
import { DEMO_STARTUP } from "@/lib/demo-data";
import { Sparkles, Terminal } from "lucide-react";

const agents = [
  { id: "sentinel", name: "Sentinel", role: "Market Scanner" },
  { id: "forge", name: "Forge", role: "Brand Architect" },
  { id: "atlas", name: "Atlas", role: "Market Intelligence" },
  { id: "compass", name: "Compass", role: "GTM Strategist" },
  { id: "oracle", name: "Oracle", role: "Investor Analyst" },
  { id: "architect", name: "Architect", role: "Pitch Builder" },
  { id: "launch", name: "Launch", role: "Execution Planner" },
];

export default function GeneratePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isDemo = searchParams.get("demo") === "true";
  
  const [activeIdx, setActiveIdx] = useState(0);
  const [logs, setLogs] = useState<string[]>(["Initializing neural foundation..."]);
  const [startupData, setStartupData] = useState<any>(null);

  useEffect(() => {
    const startupIdea = sessionStorage.getItem("founder_idea") || "Default AI Startup";

    async function processGeneration() {
      try {
        let result;
        if (isDemo) {
          // Simulate network delay for realism
          await new Promise(r => setTimeout(r, 2000));
          result = DEMO_STARTUP;
        } else {
          result = await generateStartupIdea({ startupIdea });
        }
        setStartupData(result);
        localStorage.setItem("latest_startup", JSON.stringify(result));
      } catch (err) {
        console.error("Generation failed:", err);
      }
    }

    processGeneration();
  }, [isDemo]);

  useEffect(() => {
    if (activeIdx < agents.length) {
      const timer = setTimeout(() => {
        setActiveIdx(prev => prev + 1);
        setLogs(prev => [
          ...prev,
          `${agents[activeIdx].name} processing: ${agents[activeIdx].role}...`,
          `Refining data structures for node ${activeIdx + 1}...`
        ].slice(-8));
      }, 1500 + Math.random() * 2000);
      return () => clearTimeout(timer);
    } else {
      // Completed all steps
      setTimeout(() => {
        router.push("/dashboard/demo");
      }, 1500);
    }
  }, [activeIdx, router]);

  return (
    <div className="relative min-h-screen p-8 flex items-center justify-center overflow-hidden">
      <BackgroundEffects />
      
      <div className="z-10 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left: Agent Sequence */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-primary/20 rounded-lg">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-headline italic">Assembling Team</h2>
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Project FounderOS AI</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-3">
            {agents.map((agent, i) => (
              <AgentStep
                key={agent.id}
                name={agent.name}
                role={agent.role}
                index={i}
                status={i < activeIdx ? "completed" : i === activeIdx ? "active" : "waiting"}
              />
            ))}
          </div>
        </div>

        {/* Right: Cinematic Console */}
        <div className="relative h-[500px] glass-card rounded-3xl p-6 flex flex-col font-mono text-sm">
          <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-4">
            <Terminal className="w-4 h-4 text-primary" />
            <span className="text-xs text-white/40 uppercase tracking-widest">Neural Link: ACTIVE</span>
            <div className="ml-auto flex gap-1.5">
              <div className="w-2 h-2 rounded-full bg-red-500/40" />
              <div className="w-2 h-2 rounded-full bg-yellow-500/40" />
              <div className="w-2 h-2 rounded-full bg-green-500/40" />
            </div>
          </div>
          
          <div className="flex-1 overflow-hidden mask-fade-out">
            <AnimatePresence mode="popLayout">
              {logs.map((log, i) => (
                <motion.div
                  key={i + log}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mb-2 flex gap-3"
                >
                  <span className="text-primary/40">[{new Date().toLocaleTimeString([], { hour12: false })}]</span>
                  <span className={i === logs.length - 1 ? "text-primary font-bold" : "text-white/60"}>
                    {log}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="mt-auto pt-4 border-t border-white/10 text-[10px] text-white/20 flex justify-between items-center">
            <span>PACKET TRANSIT: ENCRYPTED</span>
            <span className="animate-pulse">LATENCY: {Math.floor(Math.random() * 50)}ms</span>
          </div>
        </div>
      </div>
    </div>
  );
}
