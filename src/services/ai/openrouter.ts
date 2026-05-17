
'use server';

import OpenAI from 'openai';
import { z } from 'zod';

/**
 * @fileOverview OpenRouter Service Layer.
 * Primary fallback provider for BLOOM orchestration.
 */

const getClient = () => {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey || apiKey === 'your_openrouter_api_key_here') {
    throw new Error('OPENROUTER_API_KEY is not configured.');
  }
  return new OpenAI({
    apiKey,
    baseURL: 'https://openrouter.ai/api/v1',
    defaultHeaders: {
      "HTTP-Referer": "https://bloom-studio.ai",
      "X-Title": "Bloom Neural Studio",
    }
  });
};

export async function generateStructuredOpenRouter<T>(params: {
  prompt: string;
  system?: string;
  schema: z.ZodSchema<T>;
  model?: string;
}): Promise<T> {
  const client = getClient();
  const model = params.model || 'deepseek/deepseek-chat'; // Fast, high-quality reasoning fallback
  
  try {
    const response = await client.chat.completions.create({
      model,
      messages: [
        { role: 'system', content: params.system || 'Return valid JSON matching the schema.' },
        { role: 'user', content: params.prompt },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7,
    });

    const content = response.choices[0].message.content;
    if (!content) throw new Error('Empty response from OpenRouter fallback');
    
    const parsed = JSON.parse(content);
    return params.schema.parse(parsed);
  } catch (error) {
    console.error(`[OpenRouter Error]:`, error);
    throw error;
  }
}
