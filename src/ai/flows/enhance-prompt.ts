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
  Your task is to take a vague, potentially chaotic startup idea and materialise it into a world-class strategic brief.
  
  Raw Idea: {{{rawPrompt}}}
  
  DO NOT simply expand the text. Infer the underlying "Neural Identity":
  1. AUDIENCE PSYCHOLOGY: Who are they? What is their secret desire?
  2. DESIGN DNA: If this startup was a physical object, how would it feel?
  3. SOPHISTICATION: Is this a nimble 'indie' project or a 'luxury' enterprise disruptor?
  
  Structure your output as a high-density professional brief. The 'professionalBrief' should read like a visionary founder's manifesto.`
});

export async function enhancePrompt(input: z.infer<typeof EnhancePromptInputSchema>) {
  const { output } = await enhancePromptPrompt(input);
  if (!output) throw new Error('Neural enhancement failed');
  return output;
}
