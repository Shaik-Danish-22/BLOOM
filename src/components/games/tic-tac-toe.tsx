
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { X, Circle, RotateCcw } from "lucide-react";

/**
 * @fileOverview TicTacToe_Node: A professional Tic-Tac-Toe engine with AI.
 */

interface TicTacToeProps {
  system?: any;
  onWin?: (winner: string) => void;
}

export function TicTacToe({ system, onWin }: TicTacToeProps) {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);

  const calculateWinner = (squares: (string | null)[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return squares.every(s => s !== null) ? "Draw" : null;
  };

  const handleClick = (i: number) => {
    if (board[i] || winner) return;
    const newBoard = [...board];
    newBoard[i] = "X";
    setBoard(newBoard);
    setIsXNext(false);
    
    const win = calculateWinner(newBoard);
    if (win) {
      setWinner(win);
      if (onWin) onWin(win);
    }
  };

  // Simple AI (Random for demo, could be Minimax)
  useEffect(() => {
    if (!isXNext && !winner) {
      const timer = setTimeout(() => {
        const empty = board.map((s, i) => s === null ? i : null).filter(s => s !== null) as number[];
        if (empty.length > 0) {
          const random = empty[Math.floor(Math.random() * empty.length)];
          const newBoard = [...board];
          newBoard[random] = "O";
          setBoard(newBoard);
          setIsXNext(true);
          const win = calculateWinner(newBoard);
          if (win) setWinner(win);
        }
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [isXNext, winner, board]);

  const reset = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  return (
    <div className="flex flex-col items-center gap-12 p-8">
      <div className="text-center space-y-2">
        <h4 className="text-4xl font-headline italic tracking-tighter">
          {winner ? (winner === "Draw" ? "The Grid is Neutral" : `${winner} Dominates`) : (isXNext ? "Your Move (X)" : "AI Analyzing...")}
        </h4>
        <p className="text-[10px] uppercase tracking-[0.4em] opacity-30">Recursive Neural Match</p>
      </div>

      <div 
        className="grid grid-cols-3 gap-4 p-4 rounded-[3rem] border shadow-2xl relative"
        style={{ 
          backgroundColor: system?.tokens?.bg || '#000',
          borderColor: system?.tokens?.borderSoft || '#333',
          boxShadow: system?.tokens?.shadowStandard
        }}
      >
        {board.map((cell, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: cell ? 1 : 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleClick(i)}
            className="w-24 h-24 md:w-32 md:h-32 rounded-[2rem] flex items-center justify-center transition-all bg-white/5 border border-white/5 hover:bg-white/10"
          >
            <AnimatePresence mode="wait">
              {cell === "X" && (
                <motion.div initial={{ scale: 0, rotate: -45 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0 }}>
                  <X size={48} style={{ color: system?.tokens?.accent }} />
                </motion.div>
              )}
              {cell === "O" && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                  <Circle size={48} className="text-white" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        ))}
      </div>

      <button 
        onClick={reset}
        className="flex items-center gap-3 px-8 py-4 rounded-full border border-white/10 text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-white/5 transition-all group"
      >
        <RotateCcw size={14} className="group-hover:rotate-180 transition-transform duration-700" /> Reset Sequence
      </button>
    </div>
  );
}
