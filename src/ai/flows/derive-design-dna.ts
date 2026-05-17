
'use server';
/**
 * @fileOverview Design DNA Engine: Transforms vague ideas into structured startup intelligence.
 * Orchestrated for maximum resilience across providers.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { orchestrateTask } from '@/services/ai/orchestrator';

const DeriveDesignDNAInputSchema = z.object({
  rawPrompt: z.string().describe('The user\'s initial vague startup idea.'),
});

const DeriveDesignDNAOutputSchema = z.object({
  startupArchetype: z.string().describe('The identified core essence of the startup.'),
  audiencePsychology: z.string().describe('The primary identified audience and their psychology.'),
  brandPersonality: z.string().describe('Tone, voice, and visual attitude.'),
  designDNA: z.object({
    mood: z.string().describe('The emotional feel (e.g., "Calm Intelligent Luxury").'),
    typographyIdentity: z.string().describe('The font pairing strategy (e.g., "High-contrast Serif + Minimal Mono").'),
    motionPhilosophy: z.string().describe('How elements should move (e.g., "Subtle Cinematic Fades").'),
    interactionStyle: z.string().describe('The feel of the UI (e.g., "Smooth Understated").'),
    colorLogic: z.string().describe('The reasoning for the palette (e.g., "Monochrome with Obsidian Accents").'),
    storytellingStructure: z.string().describe('How the brand narrative unfolds (e.g., "Heroic Discovery").'),
  }),
  sophisticationLevel: z.enum(['indie', 'startup', 'enterprise', 'luxury']).describe('The tier of the brand.'),
  strategicVerdict: z.string().describe('A 20+ year multi-billion dollar shark assessment of the idea.'),
  oracleScore: z.number().min(0).max(100),
});

export type DesignDNAOutput = z.infer<typeof DeriveDesignDNAOutputSchema>;

/**
 * Leverages the Multi-Provider Orchestrator for quota-resilient DNA derivation.
 */
export async function deriveDesignDNA(input: z.infer<typeof DeriveDesignDNAInputSchema>): Promise<DesignDNAOutput> {
  const systemPrompt = `You are an elite Silicon Valley Creative Strategist and YC Partner. 
  Your task is to take a vague startup idea and derive its core strategic and visual DNA.
  
  Derive the "Neural Identity":
  1. AUDIENCE PSYCHOLOGY: What is their secret desire or pain?
  2. DESIGN DNA: If this startup was a physical object, how would it feel?
  3. STORYTELLING: How should the user experience the product narrative?
  4. SHARK VERDICT: Be brutal. As a multi-billion dollar shark, evaluate the scalability and moat of this idea.
  
  Structure your output as a high-density professional brief. Return ONLY valid JSON.`;

  const userPrompt = `Raw Idea: ${input.rawPrompt}`;

  try {
    // Orchestrator routes this to DeepSeek (Featherless/OpenRouter) for strong reasoning
    return await orchestrateTask({
      task: 'reasoning',
      prompt: userPrompt,
      system: systemPrompt,
      schema: DeriveDesignDNAOutputSchema
    });
  } catch (error) {
    console.warn("[DNA Flow] Global Orchestrator fallback triggered for Gemini core", error);
    // Final desperate fallback to primary Gemini via Genkit
    const { output } = await deriveDesignDNAPrompt(input);
    if (!output) throw new Error('Neural DNA derivation failed completely across all pathways.');
    return output;
  }
}

const deriveDesignDNAPrompt = ai.definePrompt({
  name: 'deriveDesignDNAPrompt',
  input: { schema: DeriveDesignDNAInputSchema },
  output: { schema: DeriveDesignDNAOutputSchema },
  prompt: `You are an elite Silicon Valley Creative Strategist and YC Partner. 
  Your task is to take a vague startup idea and derive its core strategic and visual DNA.
  
  Raw Idea: {{{rawPrompt}}}
  
  Derive the "Neural Identity":
  1. AUDIENCE PSYCHOLOGY: What is their secret desire or pain?
  2. DESIGN DNA: If this startup was a physical object, how would it feel?
  3. STORYTELLING: How should the user experience the product narrative?
  4. SHARK VERDICT: Be brutal. As a multi-billion dollar shark, evaluate the scalability and moat of this idea.
  
  Structure your output as a high-density professional strategic brief.`
});
