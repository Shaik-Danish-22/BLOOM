# AI Orchestration Deep Dive

**Technical documentation for BLOOM's multi-provider AI orchestration system.**

This guide explains how BLOOM intelligently routes AI tasks across multiple providers for reliability, cost optimization, and specialized reasoning capabilities.

---

## Table of Contents

1. [Orchestration Philosophy](#orchestration-philosophy)
2. [Provider Architecture](#provider-architecture)
3. [Routing Logic](#routing-logic)
4. [Flow Definition Pattern](#flow-definition-pattern)
5. [Error Handling & Fallbacks](#error-handling--fallbacks)
6. [Performance Optimization](#performance-optimization)
7. [Monitoring & Observability](#monitoring--observability)
8. [Advanced Patterns](#advanced-patterns)

---

## Orchestration Philosophy

### Core Principles

**1. Specialization**
- Use providers for their specific strengths
- DeepSeek for reasoning, Gemini for speed
- No single provider handles all tasks

**2. Resilience**
- Automatic fallback on provider failure
- Graceful degradation when possible
- User never sees provider failures

**3. Cost Optimization**
- Route expensive reasoning tasks to cost-effective providers
- Use fast models for simple generation
- Cache results to minimize API calls

**4. Transparency**
- Observable provider selection decisions
- Logging of all AI operations
- User-facing confidence indicators

### Task Classification

AI tasks fall into three categories:

| Category | Characteristics | Primary Provider | Secondary |
|----------|-----------------|-----------------|-----------|
| **Reasoning** | Complex analysis, strategic thinking, multi-step logic | DeepSeek R1 | Gemini |
| **Generation** | Content creation, rapid synthesis, creative output | Gemini Flash | Claude |
| **Evaluation** | Scoring, classification, quick assessment | Gemini Flash | DeepSeek |

---

## Provider Architecture

### DeepSeek R1 (Reasoning)

**Accessed via**: OpenRouter API

**Strengths:**
- ✅ Advanced reasoning capability
- ✅ Strong long-form analysis
- ✅ Excellent logical structure
- ✅ Good at strategic thinking

**Limitations:**
- ❌ Slower response time (5-30s typical)
- ❌ Higher cost per token
- ❌ Rate-limited on free tier
- ❌ Cannot be streamed efficiently

**Best Use Cases:**
- Design DNA derivation
- Market opportunity analysis
- Competitive moat identification
- Strategic verdict generation
- Complex business reasoning

**Configuration:**
```typescript
{
  provider: 'openrouter',
  model: 'deepseek/deepseek-r1',
  apiKey: process.env.OPENROUTER_API_KEY,
  timeout: 45000, // 45 seconds
  temperature: 0.7, // Balanced thinking
  maxTokens: 4000,
}
```

### Gemini 2.5 Flash (Fast Generation)

**Accessed via**: Google Genkit

**Strengths:**
- ✅ Ultra-fast responses (0.5-2s typical)
- ✅ Excellent content generation
- ✅ Good cost efficiency
- ✅ Streaming support
- ✅ Integrated with Genkit

**Limitations:**
- ❌ Limited reasoning depth
- ❌ Context window limitations
- ❌ Weaker on strategy

**Best Use Cases:**
- Hero section copy generation
- Quick market summaries
- Content enhancement
- Real-time interactive chat
- Question generation

**Configuration:**
```typescript
{
  provider: 'google',
  model: 'googleai/gemini-2.5-flash',
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_GENAI_API_KEY,
  timeout: 10000, // 10 seconds
  temperature: 0.8, // More creative
  maxTokens: 2000,
}
```

### Fallback Providers

**Claude 3 Sonnet** (via Anthropic/OpenRouter)
- Strong reasoning alternative to DeepSeek
- Excellent at nuance and safety
- Slightly higher cost

**Llama 2** (via Together AI/OpenRouter)
- Open-source option
- Good cost efficiency
- Adequate for generation tasks

---

## Routing Logic

### Provider Selection Algorithm

```typescript
interface TaskRouting {
  taskId: string;
  taskType: 'reasoning' | 'generation' | 'evaluation';
  primaryProvider: string;
  fallbackProviders: string[];
  timeout: number;
  schema: ZodSchema;
}

const TASK_ROUTING_MAP: Record<string, TaskRouting> = {
  deriveDesignDNA: {
    taskId: 'deriveDesignDNA',
    taskType: 'reasoning',
    primaryProvider: 'deepseek',
    fallbackProviders: ['gemini', 'claude'],
    timeout: 45000,
    schema: DeriveDesignDNAOutputSchema,
  },
  orchestrateStartup: {
    taskId: 'orchestrateStartup',
    taskType: 'reasoning',
    primaryProvider: 'deepseek',
    fallbackProviders: ['gemini', 'claude'],
    timeout: 60000,
    schema: OrchestrateStartupOutputSchema,
  },
  enhancePrompt: {
    taskId: 'enhancePrompt',
    taskType: 'generation',
    primaryProvider: 'gemini',
    fallbackProviders: ['claude', 'deepseek'],
    timeout: 10000,
    schema: EnhancePromptOutputSchema,
  },
  generateOracleScore: {
    taskId: 'generateOracleScore',
    taskType: 'evaluation',
    primaryProvider: 'gemini',
    fallbackProviders: ['deepseek'],
    timeout: 5000,
    schema: OracleScoreOutputSchema,
  },
  simulateInvestorInterview: {
    taskId: 'simulateInvestorInterview',
    taskType: 'reasoning',
    primaryProvider: 'deepseek',
    fallbackProviders: ['gemini', 'claude'],
    timeout: 30000,
    schema: SimulateInvestorInterviewOutputSchema,
  },
};
```

### Execution Strategy

```typescript
async function orchestrateTask(config: {
  taskId: string;
  payload: unknown;
  schema: ZodSchema;
}): Promise<TaskResult> {
  const routing = TASK_ROUTING_MAP[config.taskId];
  const providers = [
    routing.primaryProvider,
    ...routing.fallbackProviders,
  ];

  const errors: ExecutionError[] = [];
  let lastError: Error | null = null;

  for (const providerName of providers) {
    try {
      logger.info(`Attempting task with provider: ${providerName}`, {
        taskId: config.taskId,
        provider: providerName,
      });

      // Execute with timeout
      const result = await executeWithTimeout(
        () => executeOnProvider(providerName, config.payload),
        routing.timeout
      );

      // Validate against schema
      const validated = config.schema.parse(result);

      logger.info(`Task completed successfully`, {
        taskId: config.taskId,
        provider: providerName,
        duration: Date.now() - startTime,
      });

      return {
        success: true,
        data: validated,
        provider: providerName,
        attempt: providers.indexOf(providerName) + 1,
        timestamp: new Date(),
      };

    } catch (error) {
      lastError = error;
      errors.push({
        provider: providerName,
        error: error.message,
        timestamp: new Date(),
      });

      logger.warn(`Provider ${providerName} failed, trying next...`, {
        taskId: config.taskId,
        error: error.message,
      });

      // Continue to next provider
    }
  }

  // All providers exhausted
  logger.error(`All providers exhausted for task`, {
    taskId: config.taskId,
    errors: errors.map(e => ({
      provider: e.provider,
      error: e.error,
    })),
  });

  throw new OrchestratorError(
    `Failed to complete task ${config.taskId} across all providers`,
    { errors, lastError }
  );
}
```

---

## Flow Definition Pattern

### Standard Flow Structure

Every BLOOM AI flow follows this pattern:

```typescript
'use server';
/**
 * @fileOverview [Flow Description]
 * Purpose: [What this flow does]
 * Primary Provider: [Provider name]
 * Fallback: [Fallback provider]
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { orchestrateTask } from '@/services/ai/orchestrator';

// 1. INPUT SCHEMA
const FlowInputSchema = z.object({
  field1: z.string().describe('Description of field1'),
  field2: z.number().optional().describe('Optional field'),
});

// 2. OUTPUT SCHEMA
const FlowOutputSchema = z.object({
  result: z.string().describe('The result'),
  score: z.number().describe('Quality score'),
});

export type FlowInput = z.infer<typeof FlowInputSchema>;
export type FlowOutput = z.infer<typeof FlowOutputSchema>;

// 3. ORCHESTRATED FUNCTION
/**
 * Main flow function with multi-provider orchestration
 * @param input - Validated input according to FlowInputSchema
 * @returns Result validated against FlowOutputSchema
 * @throws OrchestratorError if all providers fail
 */
export async function flowFunction(
  input: FlowInput
): Promise<FlowOutput> {
  const systemPrompt = `You are a world-class AI assistant specialized in [domain].
  
  Your task: [specific objective]
  
  Constraints:
  1. [Constraint 1]
  2. [Constraint 2]
  
  Return ONLY valid JSON matching the schema.`;

  const userPrompt = `Context: ${JSON.stringify(input)}`;

  try {
    // Use orchestrator for intelligent provider routing
    return await orchestrateTask({
      taskId: 'flowFunction',
      payload: { system: systemPrompt, user: userPrompt },
      schema: FlowOutputSchema,
    });
  } catch (error) {
    console.error('[Flow] Orchestration failed', error);
    
    // Fallback strategy (optional)
    // - Return cached result if available
    // - Return partial result with degraded quality
    // - Throw error with user-friendly message
    
    throw error;
  }
}

// 4. GENKIT FALLBACK PROMPT
// Define Genkit prompt for cases where orchestrator fails
const flowPrompt = ai.definePrompt({
  name: 'flowFunction',
  input: { schema: FlowInputSchema },
  output: { schema: FlowOutputSchema },
  prompt: `You are a world-class AI assistant specialized in [domain].

Input: {{{field1}}}

[Prompt content]
`,
});
```

### Real-World Example: Design DNA Flow

```typescript
'use server';
/**
 * Design DNA Derivation Flow
 * Purpose: Transform raw startup ideas into strategic intelligence
 * Primary: DeepSeek R1 (complex reasoning)
 * Fallback: Gemini Flash (simplified reasoning)
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { orchestrateTask } from '@/services/ai/orchestrator';

const DeriveDesignDNAInputSchema = z.object({
  rawPrompt: z.string().describe('The user\'s startup idea'),
});

const DeriveDesignDNAOutputSchema = z.object({
  startupArchetype: z.string(),
  audiencePsychology: z.string(),
  brandPersonality: z.string(),
  designDNA: z.object({
    mood: z.string(),
    typographyIdentity: z.string(),
    motionPhilosophy: z.string(),
    interactionStyle: z.string(),
    colorLogic: z.string(),
    storytellingStructure: z.string(),
  }),
  sophisticationLevel: z.enum(['indie', 'startup', 'enterprise', 'luxury']),
  strategicVerdict: z.string(),
  oracleScore: z.number().min(0).max(100),
});

export type DesignDNAOutput = z.infer<typeof DeriveDesignDNAOutputSchema>;

export async function deriveDesignDNA(
  input: z.infer<typeof DeriveDesignDNAInputSchema>
): Promise<DesignDNAOutput> {
  const systemPrompt = `You are an elite Silicon Valley Creative Strategist.

Your task: Derive the core strategic and visual DNA from a startup idea.

Process:
1. AUDIENCE PSYCHOLOGY - Identify target user psychology
2. DESIGN DNA - Define complete visual system
3. STORYTELLING - Determine narrative structure
4. SHARK VERDICT - Multi-billion dollar assessment

Return ONLY valid JSON. Maximum insight density.`;

  const userPrompt = `Startup Idea: ${input.rawPrompt}`;

  try {
    // Route to DeepSeek for reasoning strength
    return await orchestrateTask({
      taskId: 'deriveDesignDNA',
      payload: { system: systemPrompt, user: userPrompt },
      schema: DeriveDesignDNAOutputSchema,
    });
  } catch (error) {
    console.warn('[DNA Flow] Orchestrator failed, using Genkit fallback', error);
    
    // Fallback: Use Gemini via Genkit for simplified derivation
    const { output } = await deriveDesignDNAPrompt(input);
    if (!output) {
      throw new Error('Design DNA derivation failed completely');
    }
    return output;
  }
}

// Genkit fallback prompt (simplified for speed)
const deriveDesignDNAPrompt = ai.definePrompt({
  name: 'deriveDesignDNA',
  input: { schema: DeriveDesignDNAInputSchema },
  output: { schema: DeriveDesignDNAOutputSchema },
  prompt: `You are a startup strategist. Analyze this idea and derive:
  
  {{{rawPrompt}}}
  
  Provide concise strategic DNA assessment as JSON.`,
});
```

---

## Error Handling & Fallbacks

### Error Classification

```typescript
enum ErrorSeverity {
  RECOVERABLE = 'recoverable', // Can try fallback
  DEGRADED = 'degraded',       // Partial result possible
  UNRECOVERABLE = 'unrecoverable', // Must fail
}

interface ProviderError {
  severity: ErrorSeverity;
  provider: string;
  error: Error;
  retryable: boolean;
}

function classifyError(error: Error, provider: string): ProviderError {
  if (error.message.includes('timeout')) {
    return {
      severity: ErrorSeverity.RECOVERABLE,
      provider,
      error,
      retryable: true,
    };
  }
  
  if (error.message.includes('rate limit')) {
    return {
      severity: ErrorSeverity.RECOVERABLE,
      provider,
      error,
      retryable: true, // After delay
    };
  }
  
  if (error.message.includes('invalid API key')) {
    return {
      severity: ErrorSeverity.UNRECOVERABLE,
      provider,
      error,
      retryable: false,
    };
  }
  
  return {
    severity: ErrorSeverity.DEGRADED,
    provider,
    error,
    retryable: false,
  };
}
```

### Fallback Strategies

**Strategy 1: Provider Fallback**
```typescript
// Try next provider in fallback chain
for (const provider of fallbackProviders) {
  try {
    return await executeOnProvider(provider, input);
  } catch (error) {
    // Log and continue
  }
}
```

**Strategy 2: Simplified Query**
```typescript
// Fall back to simpler version of task
try {
  return await complexReasoning(input);
} catch (error) {
  // Fall back to simpler generation
  return await simplifiedGeneration(input);
}
```

**Strategy 3: Cached Result**
```typescript
// Return previously cached result if available
const cached = await cache.get(cacheKey);
if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
  return cached.result;
}
```

**Strategy 4: Partial Result**
```typescript
// Return degraded/partial result
return {
  success: false,
  data: partialResult,
  confidence: 0.5, // Lower confidence
  message: 'Using fallback generation',
};
```

---

## Performance Optimization

### Response Caching

```typescript
const cacheStore = new Map<string, CachedResult>();

async function cachedOrchestrateTask(config: TaskConfig) {
  const cacheKey = hash(JSON.stringify(config.payload));
  
  // Check cache
  const cached = cacheStore.get(cacheKey);
  if (cached && !isCacheStale(cached)) {
    logger.info('Cache hit', { cacheKey });
    return cached.result;
  }
  
  // Execute
  const result = await orchestrateTask(config);
  
  // Store result
  cacheStore.set(cacheKey, {
    result,
    timestamp: Date.now(),
    ttl: 24 * 60 * 60 * 1000, // 24 hours
  });
  
  return result;
}
```

### Streaming Responses

```typescript
async function* streamOrchestrateTask(config: TaskConfig) {
  const systemPrompt = config.system;
  const userPrompt = config.user;
  
  // Use streaming for Gemini
  if (config.provider === 'gemini') {
    const stream = await ai.generateText({
      prompt: `${systemPrompt}\n\n${userPrompt}`,
      streaming: true,
    });
    
    for await (const chunk of stream) {
      yield chunk;
    }
  }
}

// Usage in React
useEffect(() => {
  const stream = streamOrchestrateTask(config);
  for await (const chunk of stream) {
    setOutput(prev => prev + chunk);
  }
}, [config]);
```

### Batch Processing

```typescript
async function orchestrateBatch(
  tasks: TaskConfig[]
): Promise<TaskResult[]> {
  // Process in parallel with concurrency limit
  const CONCURRENCY = 3;
  const results: TaskResult[] = [];
  
  for (let i = 0; i < tasks.length; i += CONCURRENCY) {
    const batch = tasks.slice(i, i + CONCURRENCY);
    const batchResults = await Promise.all(
      batch.map(task => orchestrateTask(task))
    );
    results.push(...batchResults);
  }
  
  return results;
}
```

---

## Monitoring & Observability

### Logging Strategy

```typescript
logger.info('Task execution started', {
  taskId: 'deriveDesignDNA',
  provider: 'deepseek',
  inputSize: payload.length,
  timestamp: new Date().toISOString(),
});

logger.error('Task execution failed', {
  taskId: 'deriveDesignDNA',
  provider: 'deepseek',
  error: error.message,
  duration: endTime - startTime,
  fallback: 'gemini',
});
```

### Metrics Collection

```typescript
interface ExecutionMetrics {
  taskId: string;
  provider: string;
  duration: number; // milliseconds
  success: boolean;
  inputTokens: number;
  outputTokens: number;
  cost: number; // USD
  cacheHit: boolean;
}

// Track metrics
const metrics: ExecutionMetrics[] = [];

async function trackExecution(
  fn: () => Promise<Result>,
  taskId: string,
  provider: string
): Promise<Result> {
  const startTime = Date.now();
  
  try {
    const result = await fn();
    
    metrics.push({
      taskId,
      provider,
      duration: Date.now() - startTime,
      success: true,
      inputTokens: result.inputTokens,
      outputTokens: result.outputTokens,
      cost: calculateCost(provider, result),
      cacheHit: false,
    });
    
    return result;
  } catch (error) {
    metrics.push({
      taskId,
      provider,
      duration: Date.now() - startTime,
      success: false,
      inputTokens: 0,
      outputTokens: 0,
      cost: 0,
      cacheHit: false,
    });
    
    throw error;
  }
}
```

---

## Advanced Patterns

### Multi-Step Reasoning

```typescript
async function multiStepReasoning(idea: string) {
  // Step 1: Enhancement
  const enhanced = await enhancePrompt({ prompt: idea });
  
  // Step 2: Design DNA
  const dna = await deriveDesignDNA({ rawPrompt: enhanced.prompt });
  
  // Step 3: Orchestration
  const orchestrated = await orchestrateStartup({
    prompt: idea,
    dna,
    designSystem: generateDesignSystem(dna),
  });
  
  return orchestrated;
}
```

### Parallel Task Execution

```typescript
async function parallelOrchestation(idea: string) {
  const [dna, score, questions] = await Promise.all([
    deriveDesignDNA({ rawPrompt: idea }),
    generateOracleScore({ startup: idea }),
    generateInvestorQuestions({ startup: idea }),
  ]);
  
  return { dna, score, questions };
}
```

### Conditional Provider Routing

```typescript
async function smartOrchestrateTask(config: TaskConfig) {
  // Route based on payload size
  if (config.payload.length > 10000) {
    // Use streaming for large inputs
    return await streamingOrchestrateTask(config);
  }
  
  // Route based on task type
  if (config.taskType === 'reasoning') {
    return await orchestrateTask({
      ...config,
      primaryProvider: 'deepseek',
    });
  }
  
  return await orchestrateTask(config);
}
```

---

## Contributing Orchestration Improvements

When adding new flows:

1. ✅ Define clear input/output schemas
2. ✅ Specify primary and fallback providers
3. ✅ Include error handling strategy
4. ✅ Add comprehensive logging
5. ✅ Document provider selection reasoning
6. ✅ Test fallback paths
7. ✅ Monitor costs and performance

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines.
