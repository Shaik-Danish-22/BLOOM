
import { z } from 'zod';

export type AIProvider = 'gemini' | 'featherless';

export type ModelTask = 'reasoning' | 'multimodal' | 'structured' | 'tools';

export interface AIServiceConfig {
  provider?: AIProvider;
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

export interface AIResponse<T> {
  data: T;
  provider: AIProvider;
  model: string;
}
