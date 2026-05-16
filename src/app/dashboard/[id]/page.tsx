"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  BarChart3, 
  Presentation, 
  Users, 
  Settings, 
  ChevronRight, 
  CheckCircle2,
  ExternalLink
} from "lucide-react";
import { OracleGauge } from "@/components/cinematic/OracleGauge";
import { InvestorSimulation } from "@/components/cinematic/InvestorSimulation";
import { DEMO_STARTUP, DEMO_ORACLE_SCORE } from "@/lib/demo-data";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BackgroundEffects } from "@/components/cinematic/BackgroundEffects";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from "recharts";

const tabs = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "market", label: "Market Intelligence", icon: BarChart3 },
  { id: "pitch", label: "Pitch Builder", icon: Presentation },
  { id: "investor", label: "Investor Simulation", icon: Users },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showOracle, setShowOracle] = useState(true);
  const [data, setData] = useState(DEMO_STARTUP);

  useEffect(() => {
    const stored = localStorage.getItem("latest_startup");
    if (stored) setData(JSON.parse(stored));
    
    // Auto-hide Oracle after animation
    const timer = setTimeout(() => setShowOracle(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const marketData = [
    { name: "TAM", value: 100, label: data.sentinelAtlasMarketIntelligence.tamSamSom.tam },
    { name: "SAM", value: 65, label: data.sentinelAtlasMarketIntelligence.tamSamSom.sam },
    { name: "SOM", value: 25, label: data.sentinelAtlasMarketIntelligence.tamSamSom.som },
  ];

  return (
    <div className="relative min-h-screen flex bg-background overflow-hidden">
      <BackgroundEffects />
      
      {/* Oracle Cinematic Overlay */}
      <AnimatePresence>
        {showOracle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
            transition={{ duration: 1 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background/95 backdrop-blur-3xl"
          >
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-primary font-headline text-3xl italic mb-8"
            >
              The Oracle is analyzing...
            </motion.p>
            <OracleGauge targetScore={DEMO_ORACLE_SCORE.score} />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="mt-12 text-center max-w-lg"
            >
              <h3 className="text-2xl font-headline italic mb-2">Verdict: {DEMO_ORACLE_SCORE.verdict.split('.')[0]}</h3>
              <p className="text-muted-foreground text-sm px-6">{DEMO_ORACLE_SCORE.verdict}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className="w-20 lg:w-64 border-r border-white/5 glass-card z-10 flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-white font-bold">F</span>
          </div>
          <span className="hidden lg:block font-headline text-xl italic text-glow">FounderOS</span>
        </div>

        <nav className="flex-1 px-3 space-y-2 mt-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                activeTab === tab.id 
                  ? "bg-primary text-white shadow-[0_0_15px_rgba(159,92,240,0.3)]" 
                  : "text-muted-foreground hover:bg-white/5"
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span className="hidden lg:block text-sm font-medium">{tab.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 mt-auto border-t border-white/5 hidden lg:block">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <p className="text-xs text-muted-foreground mb-2">PRO PLAN ACTIVE</p>
            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-primary w-3/4" />
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 relative z-10 p-8 overflow-y-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <Badge variant="outline" className="mb-2 border-primary/20 text-primary bg-primary/5">
              GENERATED BY AI TEAM
            </Badge>
            <h1 className="text-5xl font-headline italic tracking-tight leading-none mb-2">
              {data.forgeBrandArchitect.companyName}
            </h1>
            <p className="text-muted-foreground text-lg">{data.forgeBrandArchitect.tagline}</p>
          </div>
          <div className="flex gap-3">
            <button className="h-11 px-6 rounded-xl bg-white/5 border border-white/10 text-sm font-medium hover:bg-white/10 transition-colors flex items-center gap-2">
              Export Deck <ExternalLink size={14} />
            </button>
            <button className="h-11 px-6 rounded-xl bg-primary text-white text-sm font-medium shadow-[0_0_20px_rgba(159,92,240,0.3)] hover:bg-primary/90 transition-colors">
              Launch Prototype
            </button>
          </div>
        </header>

        {/* Tab Content */}
        <div className="h-[calc(100vh-280px)]">
          <AnimatePresence mode="wait">
            {activeTab === "overview" && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {/* Brand Rationale Bento */}
                <Card className="md:col-span-2 glass-card p-8 border-white/10 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl rounded-full" />
                  <h3 className="text-xl font-headline italic mb-4">The Neural Identity</h3>
                  <p className="text-muted-foreground leading-relaxed">{data.forgeBrandArchitect.brandRationale}</p>
                  <div className="mt-8 flex gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary shadow-[0_0_15px_rgba(159,92,240,0.4)]" />
                    <div className="w-12 h-12 rounded-lg bg-accent shadow-[0_0_15px_rgba(96,108,255,0.4)]" />
                    <div className="w-12 h-12 rounded-lg bg-card border border-white/10" />
                  </div>
                </Card>

                {/* Oracle Score Snapshot */}
                <Card className="glass-card p-6 border-white/10 flex flex-col items-center justify-center text-center">
                  <span className="text-xs uppercase tracking-widest text-primary font-bold mb-4">Investment Rating</span>
                  <div className="relative">
                    <svg className="w-32 h-32 transform -rotate-90">
                      <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5" />
                      <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={351} strokeDashoffset={351 * (1 - DEMO_ORACLE_SCORE.score / 100)} className="text-primary" strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl font-headline text-white">{DEMO_ORACLE_SCORE.score}</span>
                    </div>
                  </div>
                  <Badge className="mt-4 bg-primary/20 text-primary border-none">{data.oracleInvestorAnalysis.investorVerdict}</Badge>
                </Card>

                {/* Roadmap Timeline */}
                <Card className="md:col-span-3 glass-card p-8 border-white/10">
                  <h3 className="text-xl font-headline italic mb-8">Strategic Roadmap</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12">
                    {data.compassLaunchGTM.startupRoadmap.map((item, i) => (
                      <div key={i} className="relative pl-8 border-l border-white/10">
                        <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-primary" />
                        <span className="text-xs text-primary font-bold uppercase tracking-widest">{item.quarter}</span>
                        <h4 className="text-lg font-semibold mt-1 mb-3">Milestones</h4>
                        <div className="space-y-2">
                          {item.milestones.map((m, j) => (
                            <div key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <CheckCircle2 size={14} className="text-primary/60" />
                              {m}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            )}

            {activeTab === "market" && (
              <motion.div
                key="market"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full"
              >
                <Card className="glass-card p-8 border-white/10">
                  <h3 className="text-xl font-headline italic mb-8">Opportunity Sizing</h3>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={marketData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" horizontal={false} />
                        <XAxis type="number" hide />
                        <YAxis dataKey="name" type="category" stroke="#ffffff40" width={40} />
                        <Tooltip 
                          cursor={{ fill: '#ffffff05' }}
                          contentStyle={{ backgroundColor: '#101015', border: '1px solid #ffffff10', borderRadius: '12px' }}
                          formatter={(val, name, props) => [props.payload.label, name]}
                        />
                        <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={40}>
                          {marketData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={index === 0 ? "#9F5CF0" : index === 1 ? "#606CFF" : "#4F46E5"} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-8 space-y-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">{data.sentinelAtlasMarketIntelligence.marketOpportunityAnalysis}</p>
                  </div>
                </Card>

                <Card className="glass-card p-8 border-white/10">
                  <h3 className="text-xl font-headline italic mb-8">Competitor Mapping</h3>
                  <div className="space-y-6">
                    {data.sentinelAtlasMarketIntelligence.competitorInsights.map((comp, i) => (
                      <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/5 group hover:border-primary/20 transition-all">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold">{comp.name}</h4>
                          <span className="text-[10px] uppercase tracking-widest text-white/40">Direct Competitor</span>
                        </div>
                        <p className="text-xs text-muted-foreground mb-4">{comp.description}</p>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <span className="text-[10px] text-green-400/60 uppercase font-bold">Advantages</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {comp.advantages.map((a, j) => <Badge key={j} className="text-[9px] bg-green-500/10 text-green-400 border-none">{a}</Badge>)}
                            </div>
                          </div>
                          <div>
                            <span className="text-[10px] text-red-400/60 uppercase font-bold">Weaknesses</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {comp.disadvantages.map((d, j) => <Badge key={j} className="text-[9px] bg-red-500/10 text-red-400 border-none">{d}</Badge>)}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            )}

            {activeTab === "investor" && (
              <motion.div
                key="investor"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="h-[calc(100vh-280px)]"
              >
                <InvestorSimulation 
                  startupSummary={JSON.stringify(data)} 
                  initialScore={DEMO_ORACLE_SCORE.score} 
                />
              </motion.div>
            )}

            {activeTab === "pitch" && (
              <motion.div
                key="pitch"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                {data.architectPitchBuilder.pitchDeckPreview.map((slide, i) => (
                  <Card key={i} className="glass-card aspect-[16/9] p-8 flex flex-col justify-center border-white/10 group cursor-pointer relative">
                    <div className="absolute top-4 right-4 text-[10px] text-white/20">SLIDE {i + 1}</div>
                    <h3 className="text-3xl font-headline italic mb-4 group-hover:text-primary transition-colors">{slide.slideTitle}</h3>
                    <p className="text-muted-foreground text-lg italic underline decoration-primary/30 decoration-2 underline-offset-4">{slide.slideContent}</p>
                    <div className="mt-auto flex justify-end">
                      <ChevronRight className="w-6 h-6 text-white/10 group-hover:text-primary transition-colors" />
                    </div>
                  </Card>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
