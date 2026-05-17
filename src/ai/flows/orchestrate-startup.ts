'use server';
/**
 * @fileOverview Orchestration Engine: Generates high-fidelity startup artifacts
 * strictly derived from the Design DNA and Design System.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const WebsiteSectionSchema = z.object({
  id: z.string(),
  type: z.enum(['hero', 'features', 'problem', 'solution', 'pricing', 'footer', 'social']),
  title: z.string(),
  subtitle: z.string().optional(),
  content: z.string().optional(),
  items: z.array(z.string()).optional(),
  ctaLabel: z.string().optional(),
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
  Your task is to materialize a startup vision into a comprehensive, coherent, and premium strategic package.
  
  CORE VISION: {{{prompt}}}
  DESIGN DNA: {{{json dna}}}
  DESIGN SYSTEM: {{{json designSystem}}}
  
  CRITICAL CONSTRAINTS:
  1. NO HALLUCINATIONS. Strictly adhere to the vision intent. 
  2. BRAND SENSORY: If the idea is "Coffee", you MUST use sensory language (aroma, roast, brew, espresso) and editorial tones.
  3. THEME ALIGNMENT: 
     - If it's a coffee shop: Use warm neutrals, espresso browns, and cream tones.
     - If it's AI/Tech: Use obsidians, electric blues, and glassmorphism.
  4. ANTI-SLOP: Ensure the "content" sections (hero, problem, features) are structured for high-end hierarchy. No generic AI filler.
  5. Generate exactly one high-fidelity "hero", "problem", and "features" section.
  
  The "rationale" should read like a visionary founder's manifesto.
  The "marketAnalysis" should be a 20+ year multi-billion dollar shark assessment.`
});

export async function orchestrateStartup(input: { prompt: string, dna: any, designSystem: any }): Promise<OrchestratedStartup> {
  const { output } = await orchestrateStartupPrompt(input);
  if (!output) throw new Error('Startup orchestration failed');
  return output;
}
