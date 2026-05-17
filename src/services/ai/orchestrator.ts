
'use server';

import { z } from 'zod';
import { generateStructuredFeatherless } from './featherless';
import { generateStructuredOpenRouter } from './openrouter';
import { getCached, setCache, generateCacheKey } from './cache';
import { AIProvider, ModelTask, OrchestrationParams, AIResponse } from './types';

/**
 * @fileOverview Universal AI Orchestrator.
 * Manages multi-provider routing, fallbacks, and quota-resilient execution.
 */

export async function orchestrateTask<T>(params: OrchestrationParams<T>): Promise<T> {
  const { task, prompt, system, schema } = params;
  const cacheKey = generateCacheKey(task, prompt);

  // 1. Try Cache
  const cached = await getCached<T>(cacheKey);
  if (cached) {
    console.log(`[Orchestrator] Serving task from Neural Cache: ${task}`);
    return cached;
  }

  // 2. Define Routing Order based on task
  // Reasoning tasks prefer DeepSeek (Featherless/OpenRouter)
  // Materialization tasks prefer Gemini (Handled via Genkit directly, but this hub provides a unified interface)
  
  const providers: AIProvider[] = params.provider 
    ? [params.provider] 
    : task === 'reasoning' 
      ? ['featherless', 'openrouter', 'gemini'] 
      : ['gemini', 'openrouter', 'featherless'];

  for (const provider of providers) {
    try {
      console.log(`[Orchestrator] Attempting task via ${provider}: ${task}`);
      let result: T;

      if (provider === 'featherless') {
        result = await generateStructuredFeatherless({ prompt, system, schema });
      } else if (provider === 'openrouter') {
        result = await generateStructuredOpenRouter({ 
          prompt, 
          system, 
          schema,
          model: task === 'reasoning' ? 'deepseek/deepseek-r1' : 'anthropic/claude-3-haiku' 
        });
      } else if (provider === 'gemini') {
        // This is a bridge to the existing Genkit flows
        // If this hub is called for gemini, it implies we want to try a structured call
        // Note: Real Gemini calls are often wrapped in Genkit flows (see deriveDesignDNA fallback)
        // We'll throw an error here to signal that the specific flow should handle its own Gemini call
        throw new Error('Gemini task should be handled via native Genkit flow fallback logic');
      } else {
        throw new Error(`Unsupported provider: ${provider}`);
      }

      // Success! Cache and return.
      await setCache(cacheKey, result);
      return result;

    } catch (error: any) {
      const isQuotaError = error.message?.includes('429') || error.message?.includes('Quota exceeded') || error.message?.includes('RESOURCE_EXHAUSTED');
      
      if (isQuotaError) {
        console.warn(`[Orchestrator] Provider ${provider} exhausted. Rerouting cinematic pathways...`);
        continue; // Try next provider
      }

      console.error(`[Orchestrator] Provider ${provider} failed:`, error.message);
      // For non-quota errors, we still try the next provider as a safety measure
      continue;
    }
  }

  throw new Error(`[Orchestrator Critical] All inference pathways failed for task: ${task}`);
}

/**
 * Legacy wrapper for compatibility
 */
export async function generateStructuredOrchestrated<T>(params: {
  prompt: string;
  system?: string;
  schema: z.ZodSchema<T>;
  provider?: AIProvider;
  task?: ModelTask;
}): Promise<T> {
  return orchestrateTask({
    task: params.task || 'reasoning',
    prompt: params.prompt,
    system: params.system,
    schema: params.schema,
    provider: params.provider
  });
}
