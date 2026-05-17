
import OpenAI from 'openai';
import { z } from 'zod';

const client = new OpenAI({
  apiKey: process.env.FEATHERLESS_API_KEY,
  baseURL: 'https://api.featherless.ai/v1',
});

/**
 * Featherless.ai service implementation for BLOOM.
 * Uses DeepSeek-V3 for reasoning, Kimi-K2 for multimodal, and MiniMax for tools.
 */
export const featherlessService = {
  /**
   * Generates structured JSON output using a provided model and schema.
   */
  generateStructured: async <T>(params: {
    prompt: string;
    system?: string;
    schema: z.ZodSchema<T>;
    model?: string;
  }): Promise<T> => {
    const model = params.model || 'deepseek-ai/DeepSeek-V3';
    
    try {
      const response = await client.chat.completions.create({
        model,
        messages: [
          { role: 'system', content: params.system || 'You are an elite product architect. Return only valid JSON.' },
          { role: 'user', content: params.prompt },
        ],
        response_format: { type: 'json_object' },
      });

      const content = response.choices[0].message.content;
      if (!content) throw new Error('Empty response from Featherless');
      
      const parsed = JSON.parse(content);
      return params.schema.parse(parsed);
    } catch (error) {
      console.error(`[Featherless Error]:`, error);
      throw error;
    }
  },

  /**
   * Simple chat completion for reasoning or chat tasks.
   */
  chat: async (prompt: string, model: string = 'deepseek-ai/DeepSeek-V3') => {
    const response = await client.chat.completions.create({
      model,
      messages: [{ role: 'user', content: prompt }],
    });
    return response.choices[0].message.content;
  }
};
