'use server';
/**
 * @fileOverview Strategic Oracle Flow: Analyzes viability and market risks.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateOracleInvestorScoreInputSchema = z.object({
  companyName: z.string(),
  tagline: z.string(),
  valueProposition: z.string(),
  marketCategory: z.string().optional(),
});

const GenerateOracleInvestorScoreOutputSchema = z.object({
  score: z.number().min(0).max(100),
  verdict: z.string(),
  marketRisks: z.array(z.string()).describe('Honest assessments: "Market is saturated", "High execution risk", etc.'),
  strategicMoats: z.array(z.string()).describe('Identified unique advantages.'),
  designOpportunityInsights: z.array(z.string()).describe('Strategic creative recommendations (e.g., "A warmer editorial direction could differentiate this").'),
  competitorMapping: z.array(z.object({
    name: z.string(),
    threatLevel: z.enum(['Low', 'Medium', 'High']),
    differentiationStrategy: z.string(),
  })),
  viabilityMetrics: z.array(z.object({
    category: z.string(),
    score: z.number(),
  })),
});

const oracleInvestorScorePrompt = ai.definePrompt({
  name: 'oracleInvestorScorePrompt',
  input: { schema: GenerateOracleInvestorScoreInputSchema },
  output: { schema: GenerateOracleInvestorScoreOutputSchema },
  prompt: `You are a critical YC Partner and Market Analyst. 
  Evaluate the following startup:
  
  Name: {{{companyName}}}
  Tagline: {{{tagline}}}
  Brief: {{{valueProposition}}}
  
  BE HONEST. If the market is saturated, say it. This creates trust. 
  Identify real strategic moats and provide creative insights on how they can differentiate visually.`
});

export async function generateOracleInvestorScore(input: z.infer<typeof GenerateOracleInvestorScoreInputSchema>) {
  const { output } = await oracleInvestorScorePrompt(input);
  if (!output) throw new Error('Oracle analysis failed');
  return output;
}
