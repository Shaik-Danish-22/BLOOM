'use server';

import OpenAI from 'openai';
import { z } from 'zod';

/**
 * @fileOverview Featherless.ai Service Layer.
 * EXCLUSIVELY SERVER-SIDE. This file is never shipped to the client.
 */

// Initialize client only if key exists, otherwise provide a descriptive error on use
const getClient = () => {
  const apiKey = process.env.FEATHERLESS_API_KEY;
  if (!apiKey || apiKey === 'your_featherless_api_key_here') {
    throw new Error('FEATHERLESS_API_KEY is not configured in server environment.');
  }
  return new OpenAI({
    apiKey,
    baseURL: 'https://api.featherless.ai/v1',
  });
};

/**
 * Generates structured JSON output using a provided model and schema.
 * Leverages DeepSeek-V3 for elite strategic reasoning.
 */
export async function generateStructuredFeatherless<T>(params: {
  prompt: string;
  system?: string;
  schema: z.ZodSchema<T>;
  model?: string;
}): Promise<T> {
  const client = getClient();
  const model = params.model || 'deepseek-ai/DeepSeek-V3';
  
  try {
    const response = await client.chat.completions.create({
      model,
      messages: [
        { 
          role: 'system', 
          content: params.system || 'You are an elite Silicon Valley product architect. Return only valid JSON.' 
        },
        { role: 'user', content: params.prompt },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7,
    });

    const content = response.choices[0].message.content;
    if (!content) throw new Error('Empty response from Featherless core');
    
    const parsed = JSON.parse(content);
    return params.schema.parse(parsed);
  } catch (error) {
    console.error(`[Featherless Server Error]:`, error);
    throw error;
  }
}

/**
 * High-performance chat completion for reasoning or multimodal tasks.
 */
export async function chatFeatherless(prompt: string, model: string = 'deepseek-ai/DeepSeek-V3') {
  const client = getClient();
  const response = await client.chat.completions.create({
    model,
    messages: [{ role: 'user', content: prompt }],
  });
  return response.choices[0].message.content;
}
