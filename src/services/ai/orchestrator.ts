
'use server';

import { z } from 'zod';
import { featherlessService } from './featherless';
import { AIProvider } from './types';

/**
 * @fileOverview Universal AI Orchestrator.
 * EXCLUSIVELY SERVER-SIDE. Manages model routing between Gemini and Featherless.
 */

export const aiOrchestrator = {
  /**
   * Routes structured generation tasks based on complexity.
   * Reasoning-heavy tasks (Strategy, Shark Verdicts) are routed to Featherless (DeepSeek).
   */
  generateStructured: async <T>(params: {
    prompt: string;
    system?: string;
    schema: z.ZodSchema<T>;
    provider?: AIProvider;
    task?: 'reasoning' | 'materialization';
  }): Promise<T> => {
    // Logic: Use Featherless for complex strategic reasoning by default
    const provider = params.provider || (params.task === 'reasoning' ? 'featherless' : 'gemini');

    if (provider === 'featherless') {
      try {
        return await featherlessService.generateStructured({
          prompt: params.prompt,
          system: params.system,
          schema: params.schema,
          model: 'deepseek-ai/DeepSeek-V3'
        });
      } catch (error) {
        console.warn('[Orchestrator] Featherless failed or key missing, fallback to Gemini required.');
        throw error;
      }
    }

    // Note: Gemini/Genkit flows are handled within their respective flow files.
    // This orchestrator acts as a bridge for the new high-performance reasoning layer.
    throw new Error(`Provider ${provider} materialization path should be handled by Genkit directly.`);
  }
};
