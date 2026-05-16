'use server';
/**
 * @fileOverview This file implements a Genkit flow that takes a startup idea
 * and generates comprehensive startup artifacts, simulating a multi-agent AI team
 * building a company live.
 *
 * - generateStartupIdea - A function that orchestrates the generation of startup insights.
 * - StartupIdeaInput - The input type for the generateStartupIdea function.
 * - StartupIdeaOutput - The return type for the generateStartupIdea function,
 *                       containing all generated startup artifacts.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Input Schema
const StartupIdeaInputSchema = z.object({
  startupIdea: z.string().describe('A detailed description of the startup idea.'),
});
export type StartupIdeaInput = z.infer<typeof StartupIdeaInputSchema>;

// Output Schemas
const BrandArchitectOutputSchema = z.object({
  companyName: z.string().describe('The proposed name for the startup.'),
  tagline: z.string().describe('A catchy tagline for the startup.'),
  brandRationale: z.string().describe('Justification and creative brief behind the brand choices.'),
});

const MarketIntelligenceOutputSchema = z.object({
  marketOpportunityAnalysis: z.string().describe('A comprehensive analysis of the market opportunity.'),
  tamSamSom: z.object({
    tam: z.string().describe('Total Addressable Market (TAM) description.'),
    sam: z.string().describe('Serviceable Available Market (SAM) description.'),
    som: z.string().describe('Serviceable Obtainable Market (SOM) description.'),
  }).describe('TAM/SAM/SOM analysis, described qualitatively.'),
  competitorInsights: z.array(z.object({
    name: z.string().describe('Name of the competitor.'),
    description: z.string().describe('Brief description of the competitor.'),
    advantages: z.array(z.string()).describe('List of advantages this competitor has.'),
    disadvantages: z.array(z.string()).describe('List of disadvantages this competitor has.'),
  })).describe('Key competitor analysis.'),
});

const GTMAndLaunchOutputSchema = z.object({
  gtmStrategy: z.object({
    overview: z.string().describe('Overview of the Go-To-Market strategy.'),
    keyChannels: z.array(z.string()).describe('List of key marketing and distribution channels.'),
    initialLaunchPlan: z.string().describe('Detailed initial launch plan steps.'),
  }).describe('Go-To-Market strategy.'),
  pricingModel: z.object({
    type: z.string().describe('Proposed pricing model (e.g., freemium, subscription, usage-based).'),
    justification: z.string().describe('Justification for the chosen pricing model.'),
  }).describe('Pricing model and rationale.'),
  launchStrategy: z.string().describe('High-level strategy for launching the product.'),
  startupRoadmap: z.array(z.object({
    quarter: z.string().describe('The quarter for the roadmap (e.g., "Q1 2025").'),
    milestones: z.array(z.string()).describe('Key milestones for the quarter.'),
  })).describe('High-level startup roadmap.'),
});

const InvestorAnalysisOutputSchema = z.object({
  investorScoreAnalysis: z.string().describe('Textual analysis supporting the investor score, highlighting strengths and weaknesses.'),
  investorVerdict: z.string().describe('A concise verdict for potential investors (e.g., "Highly Investable", "Promising", "Needs Refinement").'),
});

const PitchDeckOutputSchema = z.object({
  pitchDeckPreview: z.array(z.object({
    slideTitle: z.string().describe('Title of the pitch deck slide.'),
    slideContent: z.string().describe('Key content or bullet points for the slide.'),
  })).describe('Preview of key pitch deck slides.'),
});


const StartupIdeaOutputSchema = z.object({
  forgeBrandArchitect: BrandArchitectOutputSchema.describe('Outputs from the Forge - Brand Architect agent.'),
  sentinelAtlasMarketIntelligence: MarketIntelligenceOutputSchema.describe('Outputs from the Sentinel - Market Scanner and Atlas - Market Intelligence agents.'),
  compassLaunchGTM: GTMAndLaunchOutputSchema.describe('Outputs from the Compass - GTM Strategist and Launch - Execution Planner agents.'),
  oracleInvestorAnalysis: InvestorAnalysisOutputSchema.describe('Outputs from the Oracle - Investor Analyst agent.'),
  architectPitchBuilder: PitchDeckOutputSchema.describe('Outputs from the Architect - Pitch Builder agent.'),
});
export type StartupIdeaOutput = z.infer<typeof StartupIdeaOutputSchema>;

export async function generateStartupIdea(input: StartupIdeaInput): Promise<StartupIdeaOutput> {
  return generateStartupIdeaFlow(input);
}

const generateStartupIdeaPrompt = ai.definePrompt({
  name: 'generateStartupIdeaPrompt',
  input: { schema: StartupIdeaInputSchema },
  output: { schema: StartupIdeaOutputSchema },
  prompt: `You are a world-class Silicon Valley product architect, cinematic UX designer, AI systems engineer, YC startup strategist, and elite hackathon-winning technical founder.

Your task is to analyze the provided startup idea and, as if a coordinated AI startup team is building a company live, generate comprehensive startup artifacts. Structure your output as JSON, precisely matching the provided schema.

The AI team consists of the following agents, and you will generate their respective outputs:
1.  **Forge - Brand Architect**: Focuses on brand identity.
2.  **Sentinel - Market Scanner & Atlas - Market Intelligence**: Focuses on market analysis, TAM/SAM/SOM, and competitor insights.
3.  **Compass - GTM Strategist & Launch - Execution Planner**: Focuses on Go-To-Market strategy, pricing, and launch roadmap.
4.  **Oracle - Investor Analyst**: Provides an investor perspective, score analysis, and overall verdict.
5.  **Architect - Pitch Builder**: Crafts a preview of the pitch deck.

Startup Idea: {{{startupIdea}}}

Generate a comprehensive, structured JSON output covering all aspects requested by the output schema. Ensure all fields are filled with detailed, realistic, and insightful content.`,
});

const generateStartupIdeaFlow = ai.defineFlow(
  {
    name: 'generateStartupIdeaFlow',
    inputSchema: StartupIdeaInputSchema,
    outputSchema: StartupIdeaOutputSchema,
  },
  async (input) => {
    const { output } = await generateStartupIdeaPrompt(input);
    if (!output) {
      throw new Error('Failed to generate startup idea details.');
    }
    return output;
  }
);
