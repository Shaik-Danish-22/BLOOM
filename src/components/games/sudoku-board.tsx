
"use client";

import { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * @fileOverview SudokuBoard_Node: A professional, interactive Sudoku grid.
 * Features a backtracking solver and design-system aware styling.
 */

interface SudokuBoardProps {
  initialBoard: (number | null)[][];
  delay?: number;
  onComplete?: () => void;
  className?: string;
  system?: any;
}

export interface SudokuBoardRef {
  solve: () => Promise<boolean>;
}

export const SudokuBoard = forwardRef<SudokuBoardRef, SudokuBoardProps>(
  ({ initialBoard, delay = 0, onComplete, className, system }, ref) => {
    const [board, setBoard] = useState<(number | null)[][]>(
      JSON.parse(JSON.stringify(initialBoard))
    );
    const [isSolving, setIsSolving] = useState(false);
    const [focused, setFocused] = useState<[number, number] | null>(null);

    // Expose solve method to parent
    useImperativeHandle(ref, () => ({
      solve: async () => {
        setIsSolving(true);
        const solved = await solveSudoku(board);
        if (solved && onComplete) onComplete();
        setIsSolving(false);
        return solved;
      }
    }));

    const solveSudoku = async (currentBoard: (number | null)[][]): Promise<boolean> => {
      const nextEmpty = findEmpty(currentBoard);
      if (!nextEmpty) return true;

      const [row, col] = nextEmpty;

      for (let num = 1; row !== undefined && num <= 9; num++) {
        if (isValid(currentBoard, row, col, num)) {
          const newBoard = [...currentBoard];
          newBoard[row][col] = num;
          setBoard([...newBoard]);

          if (delay > 0) {
            await new Promise((resolve) => setTimeout(resolve, delay));
          }

          if (await solveSudoku(newBoard)) {
            return true;
          }

          newBoard[row][col] = null;
          setBoard([...newBoard]);
        }
      }
      return false;
    };

    const findEmpty = (b: (number | null)[][]) => {
      for (let r = 0; r < 9; r++) {
        for (let c = 0; r < 9 && c < 9; c++) {
          if (b[r][c] === null) return [r, c];
        }
      }
      return null;
    };

    const isValid = (b: (number | null)[][], row: number, col: number, num: number) => {
      for (let i = 0; i < 9; i++) {
        if (b[row][i] === num) return false;
        if (b[i][col] === num) return false;
        const startRow = 3 * Math.floor(row / 3);
        const startCol = 3 * Math.floor(col / 3);
        if (b[startRow + Math.floor(i / 3)][startCol + (i % 3)] === num) return false;
      }
      return true;
    };

    const handleCellClick = (r: number, c: number) => {
      if (initialBoard[r][c] !== null || isSolving) return;
      setFocused([r, c]);
    };

    return (
      <div className={cn("flex flex-col items-center gap-12", className)}>
        <div 
          className="grid grid-cols-9 border-4 overflow-hidden shadow-2xl relative"
          style={{ 
            borderColor: system?.tokens?.fg || '#000',
            backgroundColor: system?.tokens?.bg || '#fff',
            borderRadius: system?.tokens?.radiusMd || '12px',
            boxShadow: system?.tokens?.shadowStandard || '0 20px 40px rgba(0,0,0,0.1)'
          }}
        >
          {board.map((row, r) => (
            row.map((cell, c) => {
              const isInitial = initialBoard[r][c] !== null;
              const isFocused = focused?.[0] === r && focused?.[1] === c;
              
              return (
                <motion.div
                  key={`${r}-${c}`}
                  onClick={() => handleCellClick(r, c)}
                  initial={false}
                  animate={{ 
                    backgroundColor: isFocused ? `${system?.tokens?.accent}15` : 'transparent',
                  }}
                  className={cn(
                    "w-10 h-10 md:w-14 md:h-14 flex items-center justify-center text-xl md:text-2xl font-headline italic cursor-pointer transition-colors border-r border-b",
                    (c + 1) % 3 === 0 && c < 8 && "border-r-4",
                    (r + 1) % 3 === 0 && r < 8 && "border-b-4",
                    !isInitial && "text-blue-500 font-normal not-italic"
                  )}
                  style={{ 
                    borderColor: system?.tokens?.borderSoft || '#eee',
                    color: isInitial ? (system?.tokens?.fg || '#000') : (system?.tokens?.accent || '#533afd')
                  }}
                >
                  <AnimatePresence mode="wait">
                    {cell !== null && (
                      <motion.span
                        key={cell}
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        className="pointer-events-none"
                      >
                        {cell}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })
          ))}
        </div>

        {focused && !isSolving && (
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex gap-2 p-4 rounded-3xl bg-black/5 backdrop-blur-xl border border-black/10"
          >
            {[1,2,3,4,5,6,7,8,9].map(num => (
              <button
                key={num}
                onClick={() => {
                  const newBoard = [...board];
                  newBoard[focused[0]][focused[1]] = num;
                  setBoard(newBoard);
                  setFocused(null);
                }}
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/10 font-bold transition-all active:scale-90"
              >
                {num}
              </button>
            ))}
          </motion.div>
        )}
      </div>
    );
  }
);

SudokuBoard.displayName = "SudokuBoard";
