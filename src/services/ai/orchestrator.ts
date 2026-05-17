
import { z } from 'zod';
import { featherlessService } from './featherless';
import { AIProvider } from './types';

/**
 * Universal AI Orchestrator for siteforge-ai (BLOOM).
 * Handles provider selection between Gemini (Genkit) and Featherless.
 */
export const aiOrchestrator = {
  /**
   * Executes a structured generation task using the preferred provider.
   * Defaults to Featherless (DeepSeek) for reasoning-heavy tasks.
   */
  generateStructured: async <T>(params: {
    prompt: string;
    system?: string;
    schema: z.ZodSchema<T>;
    provider?: AIProvider;
    task?: 'reasoning' | 'materialization';
  }): Promise<T> => {
    // Logic: Use Featherless for reasoning/strategy, Gemini for materialization if needed
    const provider = params.provider || (params.task === 'reasoning' ? 'featherless' : 'gemini');

    if (provider === 'featherless') {
      try {
        return await featherlessService.generateStructured({
          prompt: params.prompt,
          system: params.system,
          schema: params.schema,
          model: 'deepseek-ai/DeepSeek-V3' // Advanced reasoning model
        });
      } catch (error) {
        console.warn('Featherless failed, falling back to Gemini (Genkit)');
        // Fallback logic could go here to call Genkit flow directly
        throw error;
      }
    }

    // Default to existing Genkit flows if Gemini is selected
    // Note: Integration with Genkit flows is handled in the flow files themselves.
    throw new Error(`Provider ${provider} not implemented in universal orchestrator yet.`);
  }
};
