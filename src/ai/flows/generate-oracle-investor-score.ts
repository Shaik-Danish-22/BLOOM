'use server';
/**
 * @fileOverview This file implements a Genkit flow that analyzes generated startup data
 * and produces a comprehensive investor score with a detailed verdict,
 * representing its investment potential.
 *
 * - generateOracleInvestorScore - A function that handles the investor score generation process.
 * - GenerateOracleInvestorScoreInput - The input type for the generateOracleInvestorScore function.
 * - GenerateOracleInvestorScoreOutput - The return type for the generateOracleInvestorScore function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Input schema for the investor score generation flow
const GenerateOracleInvestorScoreInputSchema = z.object({
  companyName: z.string().describe('The name of the startup.'),
  tagline: z.string().describe('The tagline of the startup.'),
  marketOpportunityAnalysis: z
    .string()
    .describe('A detailed analysis of the market opportunity.'),
  tamSamSomSummary: z
    .string()
    .describe('A summary of Total Addressable Market (TAM), Serviceable Available Market (SAM), and Serviceable Obtainable Market (SOM).'),
  competitorInsights: z
    .string()
    .describe('Insights into the competitive landscape.'),
  gtmStrategy: z
    .string()
    .describe('The Go-To-Market strategy for the startup.'),
  pricingModel: z
    .string()
    .describe('The proposed pricing model for the startup.'),
  startupRoadmapSummary: z
    .string()
    .describe('A summary of the startup\u2019s development and growth roadmap.'),
  valueProposition: z
    .string()
    .describe('The core value proposition of the startup.'),
});
export type GenerateOracleInvestorScoreInput = z.infer<
  typeof GenerateOracleInvestorScoreInputSchema
>;

// Output schema for the investor score generation flow
const GenerateOracleInvestorScoreOutputSchema = z.object({
  score: z
    .number()
    .min(0)
    .max(100)
    .describe('An overall investment potential score from 0 to 100.'),
  verdict: z
    .string()
    .describe('A detailed verdict on the investment potential, highlighting strengths, weaknesses, and key considerations.'),
  subScores: z
    .array(
      z.object({
        category: z
          .string()
          .describe('The category for the sub-score (e.g., Market, Product, Team, Financials).'),
        score: z
          .number()
          .min(0)
          .max(100)
          .describe('The score for this specific category from 0 to 100.'),
      })
    )
    .describe('Individual scores for different investment categories.'),
});
export type GenerateOracleInvestorScoreOutput = z.infer<
  typeof GenerateOracleInvestorScoreOutputSchema
>;

/**
 * Generates an investor score and detailed verdict for a startup idea
 * based on provided startup data.
 * @param input The startup data to analyze.
 * @returns A promise that resolves to the investor score and verdict.
 */
export async function generateOracleInvestorScore(
  input: GenerateOracleInvestorScoreInput
): Promise<GenerateOracleInvestorScoreOutput> {
  return generateOracleInvestorScoreFlow(input);
}

// Define the prompt for generating the investor score
const oracleInvestorScorePrompt = ai.definePrompt({
  name: 'oracleInvestorScorePrompt',
  input: {schema: GenerateOracleInvestorScoreInputSchema},
  output: {schema: GenerateOracleInvestorScoreOutputSchema},
  prompt: `You are a highly experienced Venture Capitalist and a discerning Y Combinator partner.\nYour task is to evaluate a startup idea based on the provided information and assign a comprehensive investor score from 0 to 100.\nAdditionally, you must provide a detailed investment verdict and break down the score into specific categories.\n\nConsider the following aspects during your evaluation:\n- **Market Opportunity**: How large and attractive is the market? Is the TAM/SAM/SOM clearly defined and significant?\n- **Problem/Solution Fit**: How well does the solution address a critical problem? Is the value proposition compelling and clear?\n- **Competitive Landscape**: How differentiated is the solution from competitors? Are there strong moats or unique advantages?\n- **Go-To-Market (GTM) Strategy**: Is the GTM strategy realistic, scalable, and cost-effective?\n- **Business Model & Financials**: Is the pricing model sound? Does it have clear revenue generation potential and scalability?\n- **Roadmap & Vision**: Does the roadmap demonstrate a clear path to growth and future innovation? Is the vision ambitious yet achievable?\n\nHere is the startup information to evaluate:\n\nCompany Name: {{{companyName}}}\nTagline: {{{tagline}}}\nValue Proposition: {{{valueProposition}}}\nMarket Opportunity Analysis: {{{marketOpportunityAnalysis}}}\nTAM/SAM/SOM Summary: {{{tamSamSomSummary}}}\nCompetitor Insights: {{{competitorInsights}}}\nGo-To-Market Strategy: {{{gtmStrategy}}}\nPricing Model: {{{pricingModel}}}\nStartup Roadmap Summary: {{{startupRoadmapSummary}}}\n\nProvide your evaluation as a JSON object matching the output schema.\n`,
});

// Define the Genkit flow for generating the investor score
const generateOracleInvestorScoreFlow = ai.defineFlow(
  {
    name: 'generateOracleInvestorScoreFlow',
    inputSchema: GenerateOracleInvestorScoreInputSchema,
    outputSchema: GenerateOracleInvestorScoreOutputSchema,
  },
  async input => {
    const {output} = await oracleInvestorScorePrompt(input);
    if (!output) {
      throw new Error('Failed to generate investor score output.');
    }
    return output;
  }
);
