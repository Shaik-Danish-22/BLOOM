'use server';
/**
 * @fileOverview This file implements a Genkit flow that takes a startup idea
 * and generates comprehensive startup artifacts, simulating a multi-agent AI team.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Input Schema
const StartupIdeaInputSchema = z.object({
  startupIdea: z.string().describe('A detailed description of the startup idea.'),
  designDNA: z.any().optional().describe('The derived design DNA from the enhance prompt stage.'),
});
export type StartupIdeaInput = z.infer<typeof StartupIdeaInputSchema>;

// Output Schemas
const WebsiteSectionSchema = z.object({
  id: z.string(),
  type: z.enum(['hero', 'features', 'problem', 'solution', 'pricing', 'footer']),
  title: z.string(),
  subtitle: z.string().optional(),
  content: z.string().optional(),
  items: z.array(z.string()).optional(),
});

const StartupIdeaOutputSchema = z.object({
  forgeBrandArchitect: z.object({
    companyName: z.string(),
    tagline: z.string(),
    brandRationale: z.string(),
  }),
  websiteContent: z.object({
    sections: z.array(WebsiteSectionSchema),
    colorPalette: z.array(z.string()),
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
    gtmStrategy: {
      overview: z.string(),
      keyChannels: z.array(z.string()),
      initialLaunchPlan: z.string(),
    },
    pricingModel: z.object({
      type: z.string(),
      justification: z.string(),
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
  input: { schema: StartupIdeaInputSchema },
  output: { schema: StartupIdeaOutputSchema },
  prompt: `You are an elite Silicon Valley product architect.
  Analyze this idea and design DNA:
  
  Idea: {{{startupIdea}}}
  Design DNA: {{#if designDNA}}{{{json designDNA}}}{{else}}Standard Startup{{/if}}
  
  Generate a complete startup package. 
  Crucially, define the "websiteContent" sections with compelling copy that reflects the design DNA. 
  The "hero" should have a world-class headline. 
  The "features" should list 3-4 unique selling points.
  The "colorPalette" should be 3 HSL or HEX codes that match the brand personality.`,
});

export async function generateStartupIdea(input: StartupIdeaInput): Promise<StartupIdeaOutput> {
  const { output } = await generateStartupIdeaPrompt(input);
  if (!output) throw new Error('Generation failed');
  return output;
}
