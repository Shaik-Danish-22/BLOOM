'use server';
/**
 * @fileOverview AI flow to transform vague startup ideas into elite technical briefs and Design DNA.
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
  targetAudience: z.string().describe('The primary identified audience.'),
  brandPersonality: z.string().describe('Tone, voice, and visual attitude.'),
  suggestedVibe: z.enum(['futuristic', 'luxury', 'cyberpunk', 'startup', 'minimal', 'playful']).describe('The ideal visual aesthetic.'),
  designDNA: z.object({
    mood: z.string().describe('The emotional feel (e.g., "Calm Intelligent Luxury").'),
    typographyIdentity: z.string().describe('The font pairing strategy.'),
    motionPhilosophy: z.string().describe('How elements should move (e.g., "Subtle Cinematic Fades").'),
    colorStrategy: z.string().describe('The logical reasoning for the palette.'),
    interactionStyle: z.string().describe('The feel of the UI (e.g., "Smooth Understated").'),
  }),
  followUpQuestions: z.array(z.string()).describe('Critical questions to further refine the vision.'),
});

export async function enhancePrompt(input: z.infer<typeof EnhancePromptInputSchema>) {
  const prompt = ai.definePrompt({
    name: 'enhancePromptPrompt',
    input: { schema: EnhancePromptInputSchema },
    output: { schema: EnhancePromptOutputSchema },
    prompt: `You are an elite YC Partner and Design Director. 
    Take this vague startup idea and derive its core "Design DNA" and a professional brief.
    
    Raw Idea: {{{rawPrompt}}}
    
    You must intelligently infer the audience psychology and visual tone. If it's a luxury brand, the DNA should be "editorial and calm". If it's a dev tool, it should be "technical and high-density".
    
    Structure your output as a professional brief that defines the 'vibe', the 'moat', and the 'user experience'.`
  });

  const { output } = await prompt(input);
  return output!;
}
