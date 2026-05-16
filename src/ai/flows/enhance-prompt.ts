'use server';
/**
 * @fileOverview Design DNA Engine: Transforms vague ideas into structured startup intelligence.
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
  targetAudience: z.string().describe('The primary identified audience and their psychology.'),
  brandPersonality: z.string().describe('Tone, voice, and visual attitude.'),
  sophisticationLevel: z.enum(['indie', 'startup', 'enterprise', 'luxury']).describe('The tier of the brand.'),
  designDNA: z.object({
    mood: z.string().describe('The emotional feel (e.g., "Calm Intelligent Luxury").'),
    typographyStrategy: z.string().describe('The font pairing strategy (e.g., "High-contrast Serif + Minimal Mono").'),
    motionPhilosophy: z.string().describe('How elements should move (e.g., "Subtle Cinematic Fades").'),
    interactionStyle: z.string().describe('The feel of the UI (e.g., "Smooth Understated").'),
    colorLogic: z.string().describe('The reasoning for the palette (e.g., "Monochrome with Obsidian Accents").'),
    layoutBehavior: z.string().describe('Grid behavior (e.g., "Fluid Bento" or "Editorial Center").'),
  }),
  conversionStrategy: z.string().describe('How the design drives action.'),
  followUpQuestions: z.array(z.string()).describe('Critical questions to refine the vision.'),
});

const enhancePromptPrompt = ai.definePrompt({
  name: 'enhancePromptPrompt',
  input: { schema: EnhancePromptInputSchema },
  output: { schema: EnhancePromptOutputSchema },
  prompt: `You are an elite Silicon Valley Creative Strategist and YC Partner. 
  Take this vague idea and derive its structured "Design DNA".
  
  Raw Idea: {{{rawPrompt}}}
  
  Infer the audience psychology and visual tier. If it's luxury, use 'luxury'. If it's a dev tool, use 'enterprise' or 'startup'. 
  Structure your output as a professional brief that defines the 'vibe', the 'moat', and the 'user experience'.`
});

export async function enhancePrompt(input: z.infer<typeof EnhancePromptInputSchema>) {
  const { output } = await enhancePromptPrompt(input);
  if (!output) throw new Error('Neural enhancement failed');
  return output;
}
