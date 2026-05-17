
import { z } from 'zod';

export type AIProvider = 'gemini' | 'featherless' | 'openrouter' | 'ollama';

export type ModelTask = 'reasoning' | 'materialization' | 'structured' | 'tools';

export interface OrchestrationParams<T> {
  task: ModelTask;
  prompt: string;
  system?: string;
  schema: z.ZodSchema<T>;
  provider?: AIProvider; // Optional override
}

export interface AIResponse<T> {
  data: T;
  provider: AIProvider;
  model: string;
  latency: number;
}
