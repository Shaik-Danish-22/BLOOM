"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User, Bot, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { simulateInvestorInterview } from "@/ai/flows/simulate-investor-interview";
import { cn } from "@/lib/utils";

export const InvestorSimulation = ({ startupSummary, initialScore }: { startupSummary: string; initialScore: number }) => {
  const [messages, setMessages] = useState<{ speaker: 'Investor' | 'Founder', message: string }[]>([]);
  const [input, setInput] = useState("");
  const [currentScore, setCurrentScore] = useState(initialScore);
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState("Ready for the hot seat?");
  const scrollRef = useRef<HTMLDivElement>(null);

  const startInterview = async () => {
    setIsLoading(true);
    try {
      const res = await simulateInvestorInterview({
        startupSummary,
        conversationHistory: [],
        currentInvestorScore: initialScore,
      });
      setMessages(res.conversationHistory);
      setFeedback(res.scoreAdjustmentFeedback);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg = input;
    setInput("");
    setIsLoading(true);

    try {
      const res = await simulateInvestorInterview({
        startupSummary,
        conversationHistory: messages,
        founderResponse: userMsg,
        currentInvestorScore: currentScore,
      });
      setMessages(res.conversationHistory);
      setCurrentScore(res.newInvestorScore);
      setFeedback(res.scoreAdjustmentFeedback);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center space-y-6 glass-card rounded-3xl h-full">
        <div className="p-4 bg-primary/20 rounded-full">
          <Bot className="w-12 h-12 text-primary" />
        </div>
        <h3 className="text-3xl font-headline italic">Hot Seat Simulation</h3>
        <p className="text-muted-foreground max-w-sm">Test your resilience against a critical Silicon Valley partner. Your score will fluctuate live.</p>
        <Button onClick={startInterview} disabled={isLoading} className="bg-primary hover:bg-primary/90 rounded-full px-8 h-12">
          {isLoading ? "Analyzing..." : "Begin Interview"}
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full glass-card rounded-3xl overflow-hidden border border-white/5">
      {/* Header Info */}
      <div className="p-4 border-b border-white/10 flex justify-between items-center bg-black/20">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs uppercase tracking-widest font-bold opacity-50">Simulation Active</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground">Live Score:</span>
          <span className={cn("text-xl font-headline italic", currentScore > initialScore ? "text-green-400" : "text-primary")}>
            {currentScore}
          </span>
        </div>
      </div>

      <div className="p-3 bg-primary/5 border-b border-white/10 flex items-start gap-2">
        <AlertCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
        <p className="text-[10px] text-primary/80 leading-tight uppercase font-bold">{feedback}</p>
      </div>

      <ScrollArea className="flex-1 p-6">
        <div className="space-y-6">
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "flex gap-4 max-w-[85%]",
                m.speaker === 'Founder' ? "ml-auto flex-row-reverse" : "mr-auto"
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-full shrink-0 flex items-center justify-center",
                m.speaker === 'Investor' ? "bg-primary/20 text-primary" : "bg-white/10 text-white"
              )}>
                {m.speaker === 'Investor' ? <Bot size={16} /> : <User size={16} />}
              </div>
              <div className={cn(
                "p-4 rounded-2xl text-sm leading-relaxed",
                m.speaker === 'Investor' ? "bg-white/5 text-white/90 border border-white/5" : "bg-primary text-white"
              )}>
                {m.message}
              </div>
            </motion.div>
          ))}
          <div ref={scrollRef} />
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-white/10 bg-black/20">
        <div className="flex gap-2 relative">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your response..."
            className="bg-white/5 border-none h-12 pr-12 rounded-xl focus-visible:ring-1 focus-visible:ring-primary"
          />
          <Button 
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            size="icon" 
            className="absolute right-1 top-1 h-10 w-10 bg-primary hover:bg-primary/90 rounded-lg"
          >
            <Send size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};
