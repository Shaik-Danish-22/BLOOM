'use server';
/**
 * @fileOverview This flow analyzes a startup and issues a strategic "Oracle Verdict".
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
  marketRisks: z.array(z.string()).describe('Honest assessments of saturation or competition.'),
  strategicMoats: z.array(z.string()).describe('Identified unique advantages.'),
  competitorMapping: z.array(z.object({
    name: z.string(),
    visualStyle: z.string(),
    threatLevel: z.enum(['Low', 'Medium', 'High']),
  })),
  subScores: z.array(z.object({
    category: z.string(),
    score: z.number(),
  })),
});

export async function generateOracleInvestorScore(input: z.infer<typeof GenerateOracleInvestorScoreInputSchema>) {
  const prompt = ai.definePrompt({
    name: 'oracleInvestorScorePrompt',
    input: { schema: GenerateOracleInvestorScoreInputSchema },
    output: { schema: GenerateOracleInvestorScoreOutputSchema },
    prompt: `You are a critical YC Partner and Market Analyst. 
    Evaluate the following startup:
    
    Name: {{{companyName}}}
    Tagline: {{{tagline}}}
    Brief: {{{valueProposition}}}
    
    BE CRITICAL. If the market is saturated (like "AI Writing Tools"), say it. This builds trust.
    Analyze the TAM/SAM/SOM sizing and identify "Strategic Moats".`
  });

  const { output } = await prompt(input);
  return output!;
}
