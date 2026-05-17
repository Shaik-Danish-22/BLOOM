
'use server';
/**
 * @fileOverview Strategic Shark Flow: Multi-billion dollar analysis layer.
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
  verdict: z.string().describe('A brutal, honest verdict from a 20+ year multi-billion dollar shark.'),
  marketRisks: z.array(z.string()).describe('Brutal assessments: "Saturated Market", "Execution Risk", "Weak Moat".'),
  strategicMoats: z.array(z.string()).describe('Identified unique advantages that actually matter.'),
  recommendations: z.array(z.string()).describe('Brutal but effective advice for the founder.'),
  viabilityMetrics: z.array(z.object({
    category: z.string(),
    score: z.number(),
  })),
});

const oracleInvestorScorePrompt = ai.definePrompt({
  name: 'oracleInvestorScorePrompt',
  input: { schema: GenerateOracleInvestorScoreInputSchema },
  output: { schema: GenerateOracleInvestorScoreOutputSchema },
  prompt: `You are a brutal, multi-billion dollar Silicon Valley Shark and YC Managing Partner with 25+ years of experience.
  Your job is to evaluate this startup with absolute honesty. 
  
  Name: {{{companyName}}}
  Tagline: {{{tagline}}}
  Brief: {{{valueProposition}}}
  
  CRITICAL CONSTRAINTS:
  1. DO NOT BE NICE. If the idea is weak, say it.
  2. FOCUS ON VIABILITY. Can this make $1B?
  3. IDENTIFY SLOP. Is this a generic AI wrapper?
  4. BRUTAL VERDICT: Write the 'verdict' like a high-density, critical email to a partner.
  
  Identify real strategic moats and provide hard-hitting recommendations.`
});

export async function generateOracleInvestorScore(input: z.infer<typeof GenerateOracleInvestorScoreInputSchema>) {
  const { output } = await oracleInvestorScorePrompt(input);
  if (!output) throw new Error('Shark analysis failed');
  return output;
}
