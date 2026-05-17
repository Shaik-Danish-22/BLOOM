'use server';
/**
 * @fileOverview Orchestration Engine: Generates high-fidelity startup artifacts
 * strictly derived from the Design DNA and Design System.
 * Optimized for professional, editorial-grade copy.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const WebsiteSectionSchema = z.object({
  id: z.string(),
  type: z.enum(['hero', 'features', 'problem', 'solution', 'pricing', 'footer', 'social']),
  title: z.string().describe('Must be world-class, punchy marketing copy (max 8 words).'),
  subtitle: z.string().optional().describe('A high-fidelity, visionary subheadline.'),
  content: z.string().optional().describe('Deep, strategic narrative content.'),
  items: z.array(z.string()).optional().describe('4-6 highly specific, technological or sensory features.'),
  ctaLabel: z.string().optional().describe('Action-oriented professional CTA.'),
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
  1. NO SLOP: Avoid generic AI filler. Use high-density, professional copy. 
  2. EDITORIAL SCALE: The "title" fields should read like luxury magazine headlines.
  3. SENSORY ANCHORING: If the idea is sensory (e.g. coffee), use sensory language (roast, aroma, crema, ceramic).
  4. HIERARCHY: Ensure the hero section title is iconic and minimal.
  5. Generate exactly one high-fidelity "hero", "problem", and "features" section.
  
  For "features", identify the actual technological or operational breakthrough of this specific idea.
  
  The "rationale" should read like a visionary founder's manifesto (3-4 sentences).
  The "marketAnalysis" should be a brutal, multi-billion dollar shark assessment.`
});

export async function orchestrateStartup(input: { prompt: string, dna: any, designSystem: any }): Promise<OrchestratedStartup> {
  const { output } = await orchestrateStartupPrompt(input);
  if (!output) throw new Error('Startup orchestration failed');
  return output;
}
