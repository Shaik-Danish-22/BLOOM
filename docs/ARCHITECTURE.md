# BLOOM Architecture

## System Design & Technical Deep Dive

This document provides comprehensive technical documentation of BLOOM's architecture, including system components, data flow, orchestration strategies, and design patterns.

---

## Table of Contents

1. [System Overview](#system-overview)
2. [Core Components](#core-components)
3. [Data Flow Architecture](#data-flow-architecture)
4. [AI Orchestration Pipeline](#ai-orchestration-pipeline)
5. [Design DNA Engine](#design-dna-engine)
6. [Frontend Architecture](#frontend-architecture)
7. [Persistence Layer](#persistence-layer)
8. [Scalability & Performance](#scalability--performance)
9. [Error Handling & Resilience](#error-handling--resilience)

---

## System Overview

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         User Interface Layer                     │
│         (React 19 + Next.js 15 + Framer Motion)                │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐ │
│  │  Landing     │  │  Generation  │  │  Dashboard &        │ │
│  │  Page        │  │  Flow UI     │  │  Workspace          │ │
│  └──────────────┘  └──────────────┘  └──────────────────────┘ │
│                                                                   │
├─────────────────────────────────────────────────────────────────┤
│                    API & Business Logic Layer                    │
│              (Next.js API Routes + Server Components)            │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │         AI Orchestration Service Layer                     │ │
│  │                                                            │ │
│  │  • Multi-provider routing logic                           │ │
│  │  • Error handling & fallback strategies                   │ │
│  │  • Schema validation & normalization                      │ │
│  │  • Observability & logging                               │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │         Genkit Flow Orchestration Layer                    │ │
│  │                                                            │ │
│  │  • deriveDesignDNA()                                       │ │
│  │  • orchestrateStartup()                                    │ │
│  │  • generateOracleInvestorScore()                           │ │
│  │  • simulateInvestorInterview()                             │ │
│  │  • enhancePrompt()                                         │ │
│  │  • generateStartupIdea()                                   │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                   │
├─────────────────────────────────────────────────────────────────┤
│                  External AI Provider Layer                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌─────────────────┐  ┌─────────────────┐  ┌───────────────┐   │
│  │ DeepSeek R1     │  │ Gemini 2.5      │  │ Fallback      │   │
│  │ (via OpenRouter)│  │ Flash           │  │ Providers     │   │
│  │                 │  │                 │  │               │   │
│  │ • Reasoning     │  │ • Fast Inference│  │ • Claude      │   │
│  │ • Analysis      │  │ • Generation    │  │ • Llama       │   │
│  │ • Planning      │  │ • Real-time Ops │  │ • Other       │   │
│  └─────────────────┘  └─────────────────┘  └───────────────┘   │
│                                                                   │
├─────────────────────────────────────────────────────────────────┤
│                    Persistence & State Layer                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │         Firebase Firestore (Real-time Datastore)          │ │
│  │                                                            │ │
│  │  • Startups collection                                    │ │
│  │  • User workspaces                                        │ │
│  │  • Investor feedback history                              │ │
│  │  • Session persistence                                    │ │
│  │  • Collaborative data                                     │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │         Firebase Authentication                           │ │
│  │                                                            │ │
│  │  • User authentication                                    │ │
│  │  • Session management                                     │ │
│  │  • Authorization layers                                   │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Core Components

### 1. **AI Orchestration Service** (`src/services/ai/orchestrator.ts`)

Central intelligent routing system that determines which provider handles each task.

**Responsibilities:**
- Route tasks to appropriate AI providers based on task type
- Implement fallback logic for provider failures
- Validate outputs against schemas
- Log and trace AI decisions
- Cache results for repeated queries

**Key Methods:**
```typescript
orchestrateTask(config: {
  task: 'reasoning' | 'generation' | 'analysis'
  prompt: string
  system?: string
  schema: ZodSchema
  providers?: ProviderConfig[]
}): Promise<T>
```

**Provider Selection Logic:**
```
Task Type → Provider Mapping:
├─ 'reasoning' → DeepSeek (primary) → Gemini (fallback)
├─ 'generation' → Gemini (primary) → Claude (fallback)
└─ 'analysis' → DeepSeek (primary) → Gemini (fallback)
```

### 2. **Genkit Integration** (`src/ai/genkit.ts`)

Framework layer for AI flow definition and execution.

**Configuration:**
```typescript
export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.5-flash',
  // Additional configuration
});
```

**Plugins:**
- `@genkit-ai/google-genai`: Native Google AI integration
- Custom OpenRouter plugin for DeepSeek access

### 3. **Orchestration Flows** (`src/ai/flows/`)

Specialized AI workflows implementing core BLOOM functionality.

#### Flow Structure Pattern

Each flow follows a consistent pattern:

```typescript
// 1. Define input schema
const InputSchema = z.object({
  /* input fields */
});

// 2. Define output schema
const OutputSchema = z.object({
  /* output fields */
});

// 3. Define orchestration function
export async function orchestrationFunction(
  input: z.infer<typeof InputSchema>
): Promise<z.infer<typeof OutputSchema>> {
  // Implementation with error handling
}

// 4. Define Genkit fallback prompt
const genkitPrompt = ai.definePrompt({
  name: 'promptName',
  input: { schema: InputSchema },
  output: { schema: OutputSchema },
  prompt: `System prompt template...`,
});
```

#### Core Flows

**Design DNA Derivation** (`derive-design-dna.ts`)
- Purpose: Extract strategic essence from startup ideas
- Input: Raw startup concept
- Output: Design DNA package (archetype, psychology, design system, score)
- Provider: DeepSeek → Gemini (fallback)

**Startup Orchestration** (`orchestrate-startup.ts`)
- Purpose: Generate comprehensive strategic packages
- Input: Refined idea + Design DNA + design system
- Output: Brand identity, content sections, market analysis
- Provider: DeepSeek → Gemini (fallback)

**Oracle Investor Score** (`generate-oracle-investor-score.ts`)
- Purpose: Generate investment viability assessment
- Input: Startup profile
- Output: Numeric score (0-100) with component breakdown
- Provider: Gemini (fast computation)

**Investor Interview Simulation** (`simulate-investor-interview.ts`)
- Purpose: Generate authentic VC hardball questions
- Input: Startup profile + founder context
- Output: Questions, evaluation criteria, feedback
- Provider: DeepSeek → Gemini (fallback)

**Prompt Enhancement** (`enhance-prompt.ts`)
- Purpose: Refine user-provided prompts for better results
- Input: Vague startup concept
- Output: Structured, optimized prompt
- Provider: Gemini (speed focused)

**Startup Idea Generation** (`generate-startup-idea.ts`)
- Purpose: Generate startup ideas from market observations
- Input: Market trend or observation
- Output: Structured startup concept
- Provider: Gemini (creative generation)

---

## Data Flow Architecture

### End-to-End Generation Flow

```
User Input (Raw Idea)
    ↓
┌─────────────────────────────────────┐
│ 1. Prompt Enhancement Flow          │
│    Input: Raw text                  │
│    Output: Structured prompt        │
└─────────────────────────────────────┘
    ↓
┌─────────────────────────────────────┐
│ 2. Design DNA Derivation            │
│    Input: Enhanced prompt           │
│    Output: Design DNA Package       │
│                                     │
│    ├─ Startup Archetype             │
│    ├─ Audience Psychology           │
│    ├─ Brand Personality             │
│    ├─ Design System                 │
│    ├─ Sophistication Level          │
│    ├─ Strategic Verdict             │
│    └─ Oracle Score                  │
└─────────────────────────────────────┘
    ↓
┌─────────────────────────────────────┐
│ 3. Oracle Investor Score Generation │
│    Input: Design DNA                │
│    Output: Numeric score + analysis │
└─────────────────────────────────────┘
    ↓
┌─────────────────────────────────────┐
│ 4. Startup Orchestration            │
│    Input: Design DNA + score        │
│    Output: Full strategic package   │
│                                     │
│    ├─ Brand Identity                │
│    ├─ Website Sections              │
│    ├─ Market Analysis (TAM/SAM/SOM) │
│    ├─ Competitive Moats             │
│    ├─ Risk Assessment               │
│    └─ Strategic Recommendations     │
└─────────────────────────────────────┘
    ↓
┌─────────────────────────────────────┐
│ 5. Persistence                      │
│    Store in Firestore               │
│    Associate with user workspace    │
└─────────────────────────────────────┘
    ↓
UI Materialization (Cinematic Rendering)
```

### Interactive Pressure-Test Flow

```
Founder Views Startup Package
    ↓
┌─────────────────────────────────────┐
│ Investor Interview Simulator        │
│ Input: Startup profile              │
│ Output: Initial question set        │
└─────────────────────────────────────┘
    ↓
Founder Provides Response
    ↓
┌─────────────────────────────────────┐
│ Response Evaluation                 │
│ • DeepSeek analyzes response depth  │
│ • Generates targeted feedback       │
│ • Creates next question             │
│ • Tracks confidence progression     │
└─────────────────────────────────────┘
    ↓
[Loop continues for multi-turn interaction]
    ↓
┌─────────────────────────────────────┐
│ Interview Summary Generation        │
│ • Pitch refinement suggestions      │
│ • Confidence scoring                │
│ • Weak point identification         │
│ • Recommended next steps            │
└─────────────────────────────────────┘
    ↓
Store Interview History in Firestore
```

---

## AI Orchestration Pipeline

### Provider Selection Algorithm

```typescript
function selectProvider(task: TaskType): Provider {
  const primaryProvider = TASK_PROVIDER_MAP[task].primary;
  const fallbackProviders = TASK_PROVIDER_MAP[task].fallbacks;

  try {
    // Attempt primary provider
    return attemptProvider(primaryProvider);
  } catch (error) {
    // Fallback chain
    for (const fallback of fallbackProviders) {
      try {
        return attemptProvider(fallback);
      } catch (fallbackError) {
        // Log and continue to next fallback
        logger.warn(`Fallback ${fallback} failed:`, fallbackError);
      }
    }
    // No providers available
    throw new OrchestratorError('All providers exhausted');
  }
}
```

### Task Provider Mapping

| Task Type | Primary Provider | Secondary | Tertiary |
|-----------|------------------|-----------|----------|
| Strategic Reasoning | DeepSeek R1 | Gemini | Claude |
| Fast Generation | Gemini Flash | Claude | Llama |
| Market Analysis | DeepSeek R1 | Gemini | Claude |
| Content Creation | Gemini Flash | Claude | Llama |
| Creative Ideation | Gemini Flash | Claude | Llama |
| Evaluation & Scoring | Gemini Flash | Claude | DeepSeek |

### Error Handling Strategy

```typescript
async function executeWithResilience(config: {
  task: TaskType
  payload: unknown
  schema: ZodSchema
  timeout?: number
}): Promise<Result> {
  const providers = selectProviders(config.task);
  const errors: Error[] = [];

  for (const provider of providers) {
    try {
      const result = await executeWithTimeout(
        () => provider.execute(config.payload),
        config.timeout || DEFAULT_TIMEOUT
      );

      // Validate against schema
      const validated = config.schema.parse(result);
      
      return {
        success: true,
        data: validated,
        provider: provider.name,
        attempt: errors.length + 1,
      };
    } catch (error) {
      errors.push(error);
      logger.warn(
        `Provider ${provider.name} failed:`,
        error,
        `Attempting next provider...`
      );
    }
  }

  // All providers exhausted
  return {
    success: false,
    errors,
    fallbackStrategy: 'RETURN_CACHED_OR_PARTIAL',
  };
}
```

---

## Design DNA Engine

### Derivation Process

The Design DNA Engine is the core intelligence of BLOOM. It transforms vague startup ideas into comprehensive strategic packages.

### Input Processing

```
Raw User Prompt
    ↓
┌─────────────────────────────────┐
│ Prompt Enhancement              │
│ • Remove redundancy             │
│ • Expand ambiguous terms        │
│ • Add strategic framing         │
│ • Optimize for reasoning        │
└─────────────────────────────────┘
    ↓
Enhanced Strategic Prompt
```

### Design DNA Components

#### 1. **Startup Archetype** (Strategic Identity)
The core essence of the startup's positioning.

Examples:
- "Precision Intelligence for Founders"
- "Enterprise Transparency Platform"
- "Consumer Wellness at Scale"

#### 2. **Audience Psychology**
Deep psychographic and behavioral insights about target users.

Captures:
- Core pain points and desires
- Psychological triggers
- Purchase drivers
- Emotional motivations
- Status/aspirational elements

#### 3. **Brand Personality**
Tone, voice, and personality framework.

Defines:
- Tone spectrum (formal ↔ casual, technical ↔ accessible)
- Vocabulary and language patterns
- Personality archetype (e.g., "Trusted Expert", "Bold Innovator")
- Emotional positioning

#### 4. **Design DNA Object**
Comprehensive visual and motion system specification.

**Mood**: Emotional feel of the brand
- Example: "Calm Intelligent Luxury"

**Typography Identity**: Font pairing strategy
- Headline font strategy
- Body font strategy
- Hierarchy principles
- Legibility requirements

**Motion Philosophy**: How elements should move
- Primary animation style
- Interaction response time
- Transition timing curves
- Motion purpose (reveal, emphasize, connect)

**Interaction Style**: Feel of the UI
- Responsiveness quality
- Tactile feedback characteristics
- Progression feedback
- State indication method

**Color Logic**: Reasoning for the palette
- Primary color positioning
- Accent color strategy
- Contrast and hierarchy
- Emotional associations

**Storytelling Structure**: How the brand narrative unfolds
- Customer journey arc
- Narrative peaks
- Information revelation order
- Emotional journey mapping

#### 5. **Sophistication Level** (Market Tier)
Four-tier classification of market positioning.

| Level | Characteristics | Examples |
|-------|-----------------|----------|
| **indie** | DIY, founder-led, grassroots | Solo tools, niche communities |
| **startup** | Growth-focused, early traction | Series A-B companies |
| **enterprise** | Scale, complexity, integration | Fortune 500 tools |
| **luxury** | Premium, exclusive, bespoke | High-end concierge services |

#### 6. **Strategic Verdict**
Multi-billion dollar shark assessment of the idea's long-term potential.

Considers:
- Market size and growth trajectory
- Defensible moat strength
- Team execution requirements
- Capital efficiency path
- Founder fit assessment
- 20+ year trajectory thinking

#### 7. **Oracle Score** (0-100)
Numerical investment viability assessment.

Score Components:
- Market opportunity (0-25 pts)
- Team execution fit (0-20 pts)
- Product-market fit likelihood (0-20 pts)
- Defensible advantages (0-15 pts)
- Capital efficiency (0-10 pts)
- Timing & luck factors (0-10 pts)

---

## Frontend Architecture

### React Component Hierarchy

```
RootLayout
├── AuthProvider (Firebase)
├── ToastProvider (UI notifications)
│
├── Landing Page
│   ├── NavigationBar
│   ├── Hero Section
│   ├── Features Showcase
│   └── CTA Section
│
├── Generation Flow
│   ├── IdeaInput Component
│   ├── CinematicLoader
│   │   ├── AgentStep (multi-agent visualization)
│   │   ├── BackgroundEffects
│   │   └── SkateboardLoader (fallback)
│   ├── DesignDNAPreview
│   └── OracleGaugeDisplay
│
├── Dashboard
│   ├── WorkspaceHeader
│   ├── Market Analysis Section
│   │   ├── TAM/SAM/SOM Treemap
│   │   ├── Competitive Positioning
│   │   └── Risk Heatmap
│   ├── GTM Recommendations
│   └── Investor Feedback Panel
│
├── Investor Pressure Test
│   ├── InterviewSimulator
│   │   ├── QuestionDisplay
│   │   ├── ResponseInput
│   │   ├── RealTimeFeedback
│   │   └── ProgressTracker
│   └── InterviewSummary
│
└── Workspace
    ├── ProjectList
    ├── CollaborationTools
    └── ExportInterface
```

### Key Cinematic Components

#### **CinematicLoader** (`src/components/cinematic/CinematicLoader.tsx`)
Real-time visualization of multi-agent orchestration.

Features:
- Agent activation sequence animation
- Task dependency visualization
- Output confidence scoring display
- Fallback system indicators
- Synchronized with actual backend execution

#### **OracleGauge** (`src/components/cinematic/OracleGauge.tsx`)
Animated SVG gauge for investment scoring.

Features:
- Smooth numerical transitions
- Component breakdowns (market, team, product, etc.)
- Comparative benchmarking indicators
- Risk factor highlighting
- Data-driven visual emphasis

#### **MaterializingWebsite** (`src/components/cinematic/MaterializingWebsite.tsx`)
Progressive disclosure of generated website content.

Features:
- Staggered section rendering
- Smooth scroll-to-section navigation
- Copy preview with design system application
- Interactive element prototyping

#### **InvestorSimulation** (`src/components/cinematic/InvestorSimulation.tsx`)
Multi-turn investor pressure-test interface.

Features:
- Question display with authentic VC framing
- Real-time response evaluation
- Progressive difficulty scaling
- Confidence scoring visualization
- Refinement suggestions

### State Management

**React Context + Hooks Pattern:**
- `useWorkspace()`: Current workspace state
- `useDesignDNA()`: Design DNA data and generation status
- `useInvestorSimulation()`: Interview state and history
- `useToast()`: UI toast notifications

**Firestore Real-time Sync:**
- Automatic persistence of workspace changes
- Real-time collaboration readiness
- Workspace recovery on page refresh

### Performance Optimizations

**Server Components:**
- Use Next.js 15 server components for static content
- Server-side form handling and validation
- Efficient data fetching with streaming

**Client Components:**
- Strategic code splitting for cinematic components
- Lazy loading of heavy visualizations
- Memoization of expensive computations
- Animation frame optimization

**Image & Media:**
- Next.js Image component with optimization
- Lazy loading for below-fold content
- WebP format with fallbacks

---

## Persistence Layer

### Firestore Schema

#### **startups** Collection

```typescript
interface StartupDocument {
  id: string; // Auto-generated
  
  // Metadata
  userId: string; // Owner
  createdAt: Timestamp;
  updatedAt: Timestamp;
  
  // Core Data
  rawIdea: string; // Original user input
  enhancedPrompt: string; // Optimized prompt
  
  // Design DNA
  designDNA: {
    startupArchetype: string;
    audiencePsychology: string;
    brandPersonality: string;
    designDNA: {
      mood: string;
      typographyIdentity: string;
      motionPhilosophy: string;
      interactionStyle: string;
      colorLogic: string;
      storytellingStructure: string;
    };
    sophisticationLevel: 'indie' | 'startup' | 'enterprise' | 'luxury';
    strategicVerdict: string;
    oracleScore: number; // 0-100
  };
  
  // Orchestrated Package
  orchestratedPackage: {
    brand: {
      companyName: string;
      tagline: string;
      rationale: string;
      tone: string;
    };
    content: {
      sections: WebsiteSection[];
    };
    intelligence: {
      marketAnalysis: string;
      tamSamSom: {
        tam: string;
        sam: string;
        som: string;
      };
      risks: string[];
      moats: string[];
    };
  };
  
  // Interview History
  interviewHistory: InterviewRound[];
  
  // Metadata
  status: 'draft' | 'completed' | 'archived';
  sharedWith: string[]; // User IDs with access
}
```

#### **users** Collection

```typescript
interface UserDocument {
  id: string; // Firebase Auth UID
  
  // Profile
  email: string;
  displayName: string;
  avatar?: string;
  
  // Preferences
  preferences: {
    theme: 'light' | 'dark' | 'system';
    experimentalFeatures: boolean;
  };
  
  // Metadata
  createdAt: Timestamp;
  lastActive: Timestamp;
}
```

#### **workspaces** Collection

```typescript
interface WorkspaceDocument {
  id: string;
  
  // Ownership
  owner: string; // User ID
  members: {
    userId: string;
    role: 'owner' | 'editor' | 'viewer';
    addedAt: Timestamp;
  }[];
  
  // Content
  projects: string[]; // Startup IDs
  
  // Metadata
  name: string;
  description: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

### Firestore Security Rules

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own data
    match /users/{userId} {
      allow read: if request.auth.uid == userId;
      allow write: if request.auth.uid == userId;
    }
    
    // Startups can be read/written by owner and shared members
    match /startups/{startup} {
      allow read: if request.auth.uid == resource.data.userId
                     || request.auth.uid in resource.data.sharedWith;
      allow write: if request.auth.uid == resource.data.userId;
      allow create: if request.auth.uid != null;
    }
    
    // Workspaces can be read/written by members
    match /workspaces/{workspace} {
      allow read: if exists(/databases/$(database)/documents/workspaces/$(workspace)/members/{request.auth.uid});
      allow write: if exists(/databases/$(database)/documents/workspaces/$(workspace)/members/{request.auth.uid});
    }
  }
}
```

---

## Scalability & Performance

### Horizontal Scaling Strategy

#### **Stateless API Layer**
- Next.js API routes are stateless
- Deploy multiple instances behind load balancer
- Session data stored in Firestore (not memory)

#### **AI Provider Distribution**
- Multiple API keys across providers
- Rate limit coordination
- Load balancing across provider instances

#### **Database Scaling**
- Firestore handles automatic scaling
- Partition strategy: `userId` + `createdAt` for sharding
- Composite indexes for common queries

### Performance Optimization

#### **AI Response Caching**
```typescript
// Cache frequently generated responses
const cacheKey = hash(prompt);
const cached = await getFromCache(cacheKey);
if (cached) return cached;

const result = await orchestrateTask(config);
await saveToCache(cacheKey, result, { ttl: 24_hours });
return result;
```

#### **Streaming Responses**
- Use streaming for long-form content generation
- Progressive UI updates for user responsiveness
- Reduce initial page load blocking

#### **Component Lazy Loading**
```typescript
// Cinematic components load on-demand
const CinematicLoader = dynamic(
  () => import('@/components/cinematic/CinematicLoader'),
  { loading: () => <Skeleton />, ssr: false }
);
```

---

## Error Handling & Resilience

### Error Classification

#### **Recoverable Errors**
- Provider timeout → automatic fallback
- Rate limit → queue with exponential backoff
- Schema validation failure → user feedback + retry

#### **Unrecoverable Errors**
- Invalid API key → user notification
- Permanent data corruption → error logging + alert
- Authentication failure → redirect to login

### Observability

#### **Logging Strategy**
```typescript
logger.info('Design DNA derivation started', {
  userId,
  ideaLength,
  timestamp,
});

try {
  const result = await deriveDesignDNA(idea);
  logger.info('Design DNA derivation succeeded', { result });
} catch (error) {
  logger.error('Design DNA derivation failed', {
    userId,
    error: error.message,
    stack: error.stack,
  });
  // Send to error tracking service (e.g., Sentry)
}
```

#### **Metrics Tracking**
- Provider success/failure rates
- Response time distributions
- Cache hit rates
- User conversion funnel
- Error rates by type

---

## Future Architecture Enhancements

### Phase 2: Real-time Collaboration
- WebSocket integration for live editing
- Conflict-free replicated data types (CRDTs)
- Real-time presence indicators

### Phase 3: Advanced Reasoning
- Fine-tuned models on proprietary reasoning
- Multi-round reasoning chains
- Custom model training on market outcomes

### Phase 4: Enterprise Features
- Custom multi-tenant deployment
- Advanced access control & audit logs
- White-label options
- API access with rate limiting

---

## Contributing to Architecture

When proposing architectural changes:

1. **Document impact** on all layers
2. **Validate scalability** assumptions
3. **Test error handling** thoroughly
4. **Update this documentation** with changes
5. **Submit RFC** for major changes

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed contribution guidelines.
