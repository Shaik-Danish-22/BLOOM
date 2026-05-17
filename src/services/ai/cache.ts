
'use server';

/**
 * @fileOverview Neural Cache Layer.
 * Reduces redundant API calls and helps manage provider quotas.
 */

const cache = new Map<string, { data: any; expiry: number }>();
const TTL = 1000 * 60 * 60; // 1 hour

export async function getCached<T>(key: string): Promise<T | null> {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiry) {
    cache.delete(key);
    return null;
  }
  return entry.data as T;
}

export async function setCache(key: string, data: any): Promise<void> {
  cache.set(key, {
    data,
    expiry: Date.now() + TTL,
  });
}

export function generateCacheKey(task: string, prompt: string): string {
  // Simple deterministic key generation
  return `${task}:${Buffer.from(prompt).toString('base64').substring(0, 32)}`;
}
