
'use server';
/**
 * @fileOverview Materialization Engine: Generates high-fidelity startup artifacts
 * strictly derived from the user's prompt and enhanced Design DNA.
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

const StartupIdeaOutputSchema = z.object({
  forgeBrandArchitect: z.object({
    companyName: z.string(),
    tagline: z.string(),
    brandRationale: z.string(),
    neuralTone: z.string(),
    audiencePsychology: z.string(),
  }),
  websiteContent: z.object({
    sections: z.array(WebsiteSectionSchema),
    colorPalette: z.array(z.string().describe('HEX codes strictly derived from Design DNA.')),
    typographyStrategy: z.string(),
    motionPhilosophy: z.string(),
  }),
  sentinelAtlasMarketIntelligence: z.object({
    marketOpportunityAnalysis: z.string(),
    marketRisks: z.array(z.string()),
    strategicMoats: z.array(z.string()),
    tamSamSom: z.object({
      tam: z.string(),
      sam: z.string(),
      som: z.string(),
    }),
    competitorInsights: z.array(z.object({
      name: z.string(),
      description: z.string(),
      advantages: z.array(z.string()),
    })),
  }),
  oracleInvestorAnalysis: z.object({
    investorScore: z.number().min(0).max(100),
    investorVerdict: z.string(),
    viabilityLogic: z.string(),
  }),
  antiSlopValidation: z.object({
    status: z.string().default('Validated'),
    checks: z.array(z.string()).describe('List of hierarchy and spacing checks performed.'),
  }),
});

export type StartupIdeaOutput = z.infer<typeof StartupIdeaOutputSchema>;

const generateStartupIdeaPrompt = ai.definePrompt({
  name: 'generateStartupIdeaPrompt',
  input: { schema: z.object({ startupIdea: z.string(), designDNA: z.any().optional() }) },
  output: { schema: StartupIdeaOutputSchema },
  prompt: `You are an elite Silicon Valley product architect. 
  Materialize this startup vision into a comprehensive strategic and visual package.
  
  CORE VISION: {{{startupIdea}}}
  DESIGN DNA: {{#if designDNA}}{{{json designDNA}}}{{else}}Standard High-Tech Startup{{/if}}
  
  CRITICAL CONSTRAINTS:
  1. NO HALLUCINATIONS. If the idea is coffee, use espresso tones (#3C2A21), creams, and blacks. If AI, use obsidians and electric accents.
  2. RESEARCH MODE: Be honest about risks. If the market is saturated, say so in the Oracle Analysis.
  3. ANTI-SLOP: Ensure the "websiteContent" is structured for high-end hierarchy.
  
  Generate exactly one high-fidelity "hero", "problem", and "features" section.`
});

export async function generateStartupIdea(input: { startupIdea: string, designDNA: any }): Promise<StartupIdeaOutput> {
  const { output } = await generateStartupIdeaPrompt(input);
  if (!output) throw new Error('Materialization generation failed');
  return output;
}
