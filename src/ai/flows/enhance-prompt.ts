
'use server';
/**
 * @fileOverview AI flow to transform vague startup ideas into professional technical briefs.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const EnhancePromptInputSchema = z.object({
  rawPrompt: z.string().describe('The user\'s initial vague startup idea.'),
});

const EnhancePromptOutputSchema = z.object({
  professionalBrief: z.string().describe('The enhanced, professional technical brief.'),
  coreConcept: z.string().describe('The identified core essence of the startup.'),
  suggestedName: z.string().describe('A strong suggested name.'),
  followUpQuestions: z.array(z.string()).describe('Questions to further refine the vision.'),
});

export async function enhancePrompt(input: z.infer<typeof EnhancePromptInputSchema>) {
  const prompt = ai.definePrompt({
    name: 'enhancePromptPrompt',
    input: { schema: EnhancePromptInputSchema },
    output: { schema: EnhancePromptOutputSchema },
    prompt: `You are an elite YC Partner and Product Architect. 
    Take this vague startup idea and enhance it into a "Next-to-Perfect" professional brief.
    This brief should be technical, aesthetic, and vibe-focused, making it easy for an AI builder to create a world-class website.
    
    Raw Idea: {{{rawPrompt}}}
    
    Structure your output as a professional brief that defines the 'vibe', the 'moat', and the 'user experience'.`
  });

  const { output } = await prompt(input);
  return output!;
}
