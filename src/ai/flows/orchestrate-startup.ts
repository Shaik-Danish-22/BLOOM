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
  title: z.string().describe('Must be world-class, punchy marketing copy (max 8 words). Editorial magazine grade.'),
  subtitle: z.string().optional().describe('A high-fidelity, visionary subheadline. Deep strategic insight.'),
  content: z.string().optional().describe('Deep, strategic narrative content. Founders manifesto grade.'),
  items: z.array(z.string()).optional().describe('4-6 highly specific, technological or sensory features. No generic filler.'),
  ctaLabel: z.string().optional().describe('Action-oriented professional CTA. Compelling and unique.'),
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
  2. EDITORIAL SCALE: The "title" fields should read like luxury magazine headlines (e.g., Vogue, Monocle, Wall Street Journal).
  3. SYSTEM ALIGNMENT: 
     - If using "Brewers Retail" (Starbucks): Use warm, retail flagship language. Focus on "The Ritual," sensory details, and "Cafe-Wall" warmth.
     - If using "Fintech Precision" (Stripe): Use weight-300 authority. Focus on "Infrastructure," "Global scale," and ethereal, technical luxury.
     - If using "Rausch Warmth" (Airbnb): Focus on community, photography as depth, and "Handcrafted" hospitality language.
     - If using "Orbital Editorial" (Mastercard): Focus on "Institution," "Global Standard," and orbital trajectories.
     - If using "Linear AI" (Linear): Focus on "Engineering Excellence," "Precision," and "Focus" as a luxury.
  4. SENSORY ANCHORING: If the idea is sensory (e.g. coffee, wellness), use deep sensory language (roast, aroma, tranquility, precise).
  5. HIERARCHY: Ensure the hero section title is iconic and minimal. 
  6. Generate exactly one high-fidelity "hero", "problem", and "features" section.
  
  The "rationale" should read like a visionary founder's manifesto (3-4 sentences).
  The "marketAnalysis" should be a brutal, multi-billion dollar shark assessment from a top-tier VC perspective.`
});

export async function orchestrateStartup(input: { prompt: string, dna: any, disguiseSystem: any }): Promise<OrchestratedStartup> {
  const { output } = await orchestrateStartupPrompt(input);
  if (!output) throw new Error('Startup orchestration failed');
  return output;
}
