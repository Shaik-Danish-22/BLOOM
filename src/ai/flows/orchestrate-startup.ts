
"use server";
/**
 * @fileOverview Orchestration Engine: Generates museum-grade startup artifacts.
 * Enhanced with multi-provider resilience and editorial scale specs.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { orchestrateTask } from '@/services/ai/orchestrator';

const WebsiteSectionSchema = z.object({
  id: z.string(),
  type: z.enum(['hero', 'features', 'problem', 'solution', 'pricing', 'footer', 'social', 'game']),
  title: z.string().describe('World-class, punchy marketing copy (max 8 words). Editorial magazine grade.'),
  subtitle: z.string().optional().describe('A high-fidelity, visionary subheadline. Deep strategic insight.'),
  content: z.string().optional().describe('Deep, strategic narrative content. Founders manifesto grade.'),
  items: z.array(z.string()).optional().describe('4-6 highly specific, technological or sensory features. No generic filler.'),
  ctaLabel: z.string().optional().describe('Action-oriented professional CTA. Compelling and unique.'),
  gameConfig: z.object({
    type: z.enum(['sudoku', 'tictactoe']),
    difficulty: z.enum(['easy', 'medium', 'hard']).optional(),
    initialBoard: z.array(z.array(z.number().nullable())).optional().describe('9x9 grid for Sudoku, null for empty.'),
    instructions: z.string().optional().describe('How to play, strategy, and pro tips.'),
  }).optional(),
});

const OrchestrateStartupOutputSchema = z.object({
  brand: z.object({
    companyName: z.string(),
    tagline: z.string(),
    rationale: z.string(),
    tone: z.string(),
  }),
  content: z.object({
    sections: z.array(WebsiteSectionSchema),
  }),
  intelligence: z.object({
    marketAnalysis: z.string(),
    tamSamSom: z.object({
      tam: z.string(),
      sam: z.string(),
      som: z.string(),
    }),
    risks: z.array(z.string()),
    moats: z.array(z.string()),
  }),
});

export type OrchestratedStartup = z.infer<typeof OrchestrateStartupOutputSchema>;

export async function orchestrateStartup(input: { prompt: string, dna: any, designSystem: any }): Promise<OrchestratedStartup> {
  const systemPrompt = `You are a world-class AI product architect and founder. 
  Your task is to materialize a startup vision into a comprehensive, museum-grade editorial strategic package.
  
  CRITICAL CONSTRAINTS:
  1. NO AI SLOP: Avoid generic filler like "Unlock potential." Use high-density, sensory-anchored, professional copy. 
  2. EDITORIAL SCALE: Headlines must read like luxury magazine covers. Use words like aroma, precision, aerodynamic, crumb, bloom, soul.
  3. THEME ACCURACY: Strictly follow the provided Design DNA and Design System tokens.
  4. INTERACTIVITY: If relevant or requested (e.g., games, sudoku), you MUST generate a "game" section.
  
  SUDOKU INSTRUCTIONS:
  If a Sudoku game is requested, you MUST include a comprehensive "instructions" field in the gameConfig with the following:
  - Goal: Fill the grid so every row, column, and 3x3 box contains numbers 1-9 without repeats.
  - Basic Rules: Logic-based, no guessing.
  - Strategy: Scan rows, elimination, pencil marks.
  - Pro Tips: Start with easiest areas, look for singles.
  
  Structure your output as a comprehensive strategic JSON package. Return ONLY valid JSON.`;

  const userPrompt = `Vision: ${input.prompt}\nDNA: ${JSON.stringify(input.dna)}\nDesign System: ${JSON.stringify(input.designSystem)}`;

  try {
    return await orchestrateTask({
      task: 'materialization',
      prompt: userPrompt,
      system: systemPrompt,
      schema: OrchestrateStartupOutputSchema
    });
  } catch (error) {
    console.warn("[Orchestrate Flow] Fallback required", error);
    const { output } = await orchestrateStartupPrompt(input);
    if (!output) throw new Error('Startup orchestration failed across all providers.');
    return output;
  }
}

const orchestrateStartupPrompt = ai.definePrompt({
  name: 'orchestrateStartupPrompt',
  input: { 
    schema: z.object({ 
      prompt: z.string(), 
      dna: z.any(), 
      designSystem: z.any() 
    }) 
  },
  output: { schema: OrchestrateStartupOutputSchema },
  prompt: `You are an elite product architect. Materialize this vision into a museum-grade editorial package.
  
  CORE VISION: {{{prompt}}}
  DESIGN DNA: {{{json dna}}}
  DESIGN SYSTEM: {{{json designSystem}}}
  
  CRITICAL CONSTRAINTS:
  1. NO SLOP: No generic filler. Use sensory, high-density copy.
  2. EDITORIAL SCALE: The "title" fields should read like luxury magazine headlines.
  3. THEME ACCURACY: 
     - If COFFEE: Focus on ritual, aroma, terroir. 
     - If CAR: Focus on precision, aerodynamics, soul. 
     - If BAKERY: Focus on heritage, flour, warmth, crust.
  4. INTERACTIVITY: If a game (Sudoku/TicTacToe) is requested, add a "game" section with detailed instructions/tips.
  
  Generate exactly one high-fidelity "hero", "problem", and "features" section. Add a "game" section if requested.`
});
