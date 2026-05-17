
"use server";
/**
 * @fileOverview Orchestration Engine: Generates high-fidelity startup artifacts
 * strictly derived from the Design DNA and Design System.
 * Enhanced with multi-provider resilience.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { orchestrateTask } from '@/services/ai/orchestrator';

const WebsiteSectionSchema = z.object({
  id: z.string(),
  type: z.enum(['hero', 'features', 'problem', 'solution', 'pricing', 'footer', 'social', 'game']),
  title: z.string().describe('Must be world-class, punchy marketing copy (max 8 words). Editorial magazine grade.'),
  subtitle: z.string().optional().describe('A high-fidelity, visionary subheadline. Deep strategic insight.'),
  content: z.string().optional().describe('Deep, strategic narrative content. Founders manifesto grade.'),
  items: z.array(z.string()).optional().describe('4-6 highly specific, technological or sensory features. No generic filler.'),
  ctaLabel: z.string().optional().describe('Action-oriented professional CTA. Compelling and unique.'),
  gameConfig: z.object({
    type: z.enum(['sudoku', 'tictactoe']),
    difficulty: z.enum(['easy', 'medium', 'hard']).optional(),
    initialBoard: z.array(z.array(z.number().nullable())).optional().describe('9x9 grid for Sudoku, null for empty.'),
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
  Your task is to materialize a startup vision into a comprehensive, coherent, and museum-grade editorial strategic package.
  
  CRITICAL CONSTRAINTS:
  1. NO SLOP: Avoid generic AI filler. Use high-density, professional copy. 
  2. EDITORIAL SCALE: Headlines should read like luxury magazine headlines. Use sensory words.
  3. THEME ACCURACY: Strictly follow the provided Design DNA and Design System tokens.
  4. INTERACTIVITY: If relevant, generate a "game" section with valid config.
  
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
    console.warn("[Orchestrate Flow] Fallback to Gemini required", error);
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
  prompt: `You are a world-class AI product architect and founder. 
  Your task is to materialize a startup vision into a comprehensive, coherent, and museum-grade editorial strategic package.
  
  CORE VISION: {{{prompt}}}
  DESIGN DNA: {{{json dna}}}
  DESIGN SYSTEM: {{{json designSystem}}}
  
  CRITICAL CONSTRAINTS:
  1. NO SLOP: Avoid generic AI filler like "Unlock your potential" or "The future is here." Use high-density, professional copy. 
  2. EDITORIAL SCALE: The "title" fields should read like luxury magazine headlines. Use sensory words (aroma, texture, precision, aerodynamic, crumb, bloom).
  3. THEME ACCURACY: 
     - If COFFEE: Focus on ritual, aroma, terroir. Use "Brewers Editorial" tokens.
     - If CAR: Focus on precision, engineering, aerodynamics, soul. Use "High Performance" tones.
     - If BAKERY: Focus on heritage, flour, warmth, crust. Use "Pantry Heritage" tokens.
     - If FINTECH: Focus on security, technical luxury, weight-300. Use "Stripe Precision" tokens.
  4. INTERACTIVITY: If the user mentions "games", "sudoku", or "tic tac toe", you MUST generate a section of type "game" with a valid gameConfig.
  5. HIERARCHY: Ensure the hero section title is iconic and minimal. 
  
  Generate exactly one high-fidelity "hero", "problem", and "features" section. Add a "game" section only if relevant to the vision.
  The "rationale" should read like a visionary founder's manifesto.`
});
