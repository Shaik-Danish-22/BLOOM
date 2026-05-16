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
  }),
  websiteContent: z.object({
    sections: z.array(WebsiteSectionSchema),
    colorPalette: z.array(z.string().describe('HEX or HSL codes strictly derived from Design DNA color logic.')),
    typographyStrategy: z.string(),
  }),
  sentinelAtlasMarketIntelligence: z.object({
    marketOpportunityAnalysis: z.string(),
    tamSamSom: z.object({
      tam: z.string(),
      sam: z.string(),
      som: z.string(),
    }),
    competitorInsights: z.array(z.object({
      name: z.string(),
      description: z.string(),
      advantages: z.array(z.string()),
      disadvantages: z.array(z.string()),
    })),
  }),
  compassLaunchGTM: z.object({
    gtmStrategy: z.object({
      overview: z.string(),
      keyChannels: z.array(z.string()),
      initialLaunchPlan: z.string(),
    }),
    pricingModel: z.object({
      type: z.string(),
      justification: z.string(),
      tiers: z.array(z.object({
        name: z.string(),
        price: z.string(),
        features: z.array(z.string()),
      })),
    }),
    startupRoadmap: z.array(z.object({
      quarter: z.string(),
      milestones: z.array(z.string()),
    })),
  }),
  oracleInvestorAnalysis: z.object({
    investorScoreAnalysis: z.string(),
    investorVerdict: z.string(),
  }),
  architectPitchBuilder: z.object({
    pitchDeckPreview: z.array(z.object({
      slideTitle: z.string(),
      slideContent: z.string(),
    })),
  }),
});

export type StartupIdeaOutput = z.infer<typeof StartupIdeaOutputSchema>;

const generateStartupIdeaPrompt = ai.definePrompt({
  name: 'generateStartupIdeaPrompt',
  input: { schema: z.object({ startupIdea: z.string(), designDNA: z.any().optional() }) },
  output: { schema: StartupIdeaOutputSchema },
  prompt: `You are an elite Silicon Valley product architect. 
  Your task is to materialize the following startup vision into a comprehensive strategic and visual package.
  
  CORE VISION: {{{startupIdea}}}
  DESIGN DNA: {{#if designDNA}}{{{json designDNA}}}{{else}}Standard High-Tech Startup{{/if}}
  
  CRITICAL CONSTRAINTS:
  1. NO HALLUCINATIONS. Every generated section must be a direct materialization of the core vision.
  2. DESIGN ADHERENCE. Use the colorLogic and mood from the Design DNA to define the colorPalette.
  3. COPYWRITING. The websiteContent copy must be editorial-grade, concise, and reflect the sophisticationLevel.
  4. LOGIC. Ensure the TAM/SAM/SOM and GTM strategy are grounded in the specific market category of the vision.
  
  The "websiteContent" must include a "hero", "problem", "solution", and "features" section as a minimum.`,
});

export async function generateStartupIdea(input: { startupIdea: string, designDNA: any }): Promise<StartupIdeaOutput> {
  const { output } = await generateStartupIdeaPrompt(input);
  if (!output) throw new Error('Materialization generation failed');
  return output;
}
