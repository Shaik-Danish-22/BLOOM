# BLOOM Developer Setup Guide

**Complete instructions for setting up BLOOM development environment.**

This guide takes you through every step of getting BLOOM running locally, from initial setup through development and debugging.

---

## Table of Contents

1. [System Requirements](#system-requirements)
2. [Repository Setup](#repository-setup)
3. [Environment Configuration](#environment-configuration)
4. [Firebase Setup](#firebase-setup)
5. [AI Provider Configuration](#ai-provider-configuration)
6. [Starting Development](#starting-development)
7. [Troubleshooting](#troubleshooting)
8. [Development Workflow](#development-workflow)

---

## System Requirements

### Minimum Requirements

- **Node.js**: v18+ (v20 LTS recommended)
- **npm**: v9+ or **yarn**: v3+
- **Git**: Latest version
- **Disk Space**: ~2GB for dependencies and build artifacts
- **RAM**: 4GB minimum (8GB+ recommended)

### Recommended Tools

- **VS Code**: Latest version with TypeScript support
- **Postman** or **Insomnia**: API testing
- **Firebase CLI**: `npm install -g firebase-tools`
- **Genkit CLI**: `npm install -g genkit` (optional)

### Supported Operating Systems

- macOS 12+
- Linux (Ubuntu 20.04+, Fedora 36+, others)
- Windows 10+ (with WSL2 recommended)

---

## Repository Setup

### 1. Clone the Repository

```bash
# Clone from GitHub
git clone https://github.com/yourusername/bloom.git

# Navigate to project directory
cd bloom

# Verify git setup
git remote -v
```

### 2. Install Dependencies

```bash
# Using npm (recommended)
npm install

# OR using yarn
yarn install

# Verify installation
npm list genkit
npm list firebase
npm list next
```

**Expected output should show:**
- `genkit@^1.28.0`
- `firebase@^11.9.1`
- `next@15.5.9`

### 3. Verify Installation

```bash
# Check Node version
node --version  # Should be v18.0.0 or higher

# Check npm version
npm --version   # Should be v9.0.0 or higher

# List installed scripts
npm run
```

---

## Environment Configuration

### 1. Create Environment File

```bash
# Copy environment template
cp .env.example .env.local

# Verify the file exists
ls -la .env.local
```

### 2. Configure API Keys

Edit `.env.local` with your API keys:

```bash
# Google Genkit Configuration
NEXT_PUBLIC_GOOGLE_GENAI_API_KEY=your_google_genai_api_key_here

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=1234567890
NEXT_PUBLIC_FIREBASE_APP_ID=1:1234567890:web:abcdef1234567890

# DeepSeek Reasoning (via OpenRouter)
OPENROUTER_API_KEY=your_openrouter_api_key_here
OPENROUTER_MODEL=deepseek/deepseek-r1

# Fallback Provider (optional)
FALLBACK_AI_MODEL=googleai/gemini-2.5-flash

# Development Configuration (optional)
NEXT_DEBUG=false
LOG_LEVEL=info
```

### 3. Understanding Environment Variables

| Variable | Type | Required | Description |
|----------|------|----------|-------------|
| `NEXT_PUBLIC_GOOGLE_GENAI_API_KEY` | string | ✅ Yes | Google GenAI API key for Genkit |
| `NEXT_PUBLIC_FIREBASE_*` | string | ✅ Yes | Firebase project credentials |
| `OPENROUTER_API_KEY` | string | ✅ Yes | OpenRouter API key for DeepSeek |
| `OPENROUTER_MODEL` | string | ✅ Yes | Model specification (typically deepseek/deepseek-r1) |
| `FALLBACK_AI_MODEL` | string | ❌ No | Fallback provider (defaults to Gemini) |

**⚠️ Security Note**: Never commit `.env.local` to version control. It contains sensitive API keys.

---

## Firebase Setup

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Create a project"**
3. Enter project name: `bloom-dev` (or your preference)
4. Enable Google Analytics (optional)
5. Click **"Create project"**

### 2. Enable Firestore Database

1. In Firebase Console, go to **"Firestore Database"**
2. Click **"Create Database"**
3. Select region: Choose closest to your location (e.g., `us-central1`)
4. Start in **"Production mode"** (we'll configure security rules next)
5. Click **"Create"**

### 3. Configure Security Rules

1. In Firestore Console, go to **"Rules"** tab
2. Copy and paste the rules from [ARCHITECTURE.md](./ARCHITECTURE.md#firestore-security-rules)
3. Click **"Publish"**

### 4. Enable Authentication

1. In Firebase Console, go to **"Authentication"**
2. Click **"Sign-in method"**
3. Enable **"Email/Password"** provider
4. Click **"Save"**

### 5. Get Firebase Configuration

1. Go to **"Project Settings"** (gear icon)
2. Under **"Your apps"**, find or create a web app
3. Copy the config object:
   ```javascript
   {
     apiKey: "...",
     authDomain: "...",
     projectId: "...",
     storageBucket: "...",
     messagingSenderId: "...",
     appId: "..."
   }
   ```
4. Add these values to `.env.local` (prefixed with `NEXT_PUBLIC_FIREBASE_`)

### 6. Create Firebase Service Account (Optional, for Server-Side Operations)

1. Go to **"Project Settings"** → **"Service Accounts"**
2. Click **"Generate New Private Key"**
3. Download JSON file and store securely
4. ⚠️ Never commit this file to version control

---

## AI Provider Configuration

### Google Genkit Setup

**Step 1: Get API Key**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable **"Google AI API"** (generative language API)
4. Go to **"Credentials"** → **"Create Credentials"** → **"API Key"**
5. Copy API key to `.env.local` as `NEXT_PUBLIC_GOOGLE_GENAI_API_KEY`

**Step 2: Verify Installation**
```bash
npm list @genkit-ai/google-genai
# Should show: @genkit-ai/google-genai@^1.28.0
```

### OpenRouter Setup (DeepSeek Reasoning)

**Step 1: Create OpenRouter Account**
1. Go to [OpenRouter.ai](https://openrouter.ai/)
2. Sign up or log in
3. Go to **"Keys"** section
4. Create new API key
5. Copy to `.env.local` as `OPENROUTER_API_KEY`

**Step 2: Fund Your Account**
- Add payment method in account settings
- Minimum balance recommended: $10-20 for development
- Monitor usage in dashboard

**Step 3: Test Connection**
```bash
# Test OpenRouter connectivity
curl https://openrouter.ai/api/v1/models \
  -H "Authorization: Bearer $OPENROUTER_API_KEY"
```

### Fallback Provider (Optional)

If you want to configure additional fallback providers:

**Option A: Anthropic Claude (via OpenRouter)**
```bash
FALLBACK_ANTHROPIC_API_KEY=your_anthropic_key
FALLBACK_MODEL=anthropic/claude-3-sonnet
```

**Option B: Open-Source Models**
- Llama 2 (via Together AI)
- Mistral (via Mistral API)
- Configure in `.env.local`

---

## Starting Development

### 1. Start Development Servers

**Terminal 1: Next.js Development Server**
```bash
npm run dev

# Server runs on http://localhost:9002
# Hot reload enabled for all file changes
```

**Terminal 2: Genkit AI Development Environment**
```bash
npm run genkit:dev

# Genkit dashboard available at http://localhost:4000
# Allows real-time inspection of AI flows
```

### 2. Access the Application

- **Frontend**: http://localhost:9002
- **Genkit Dashboard**: http://localhost:4000

### 3. Verify Everything Works

**Checklist:**
- ✅ Next.js compiles without errors
- ✅ No TypeScript errors in console
- ✅ Can access landing page
- ✅ Genkit dashboard shows AI flows
- ✅ Can load Firestore (check browser DevTools → Application → Firebase)

### 4. Test AI Integration

Create a simple test file: `test-ai-integration.ts`

```typescript
import { deriveDesignDNA } from '@/ai/flows/derive-design-dna';

async function testAI() {
  try {
    const result = await deriveDesignDNA({
      rawPrompt: 'A productivity tool for remote teams'
    });
    console.log('✅ AI Integration Working:', result);
  } catch (error) {
    console.error('❌ AI Integration Failed:', error);
  }
}

testAI();
```

Run test:
```bash
npx ts-node test-ai-integration.ts
```

---

## Troubleshooting

### Common Issues & Solutions

#### Issue: "Module not found" errors

**Solution:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Next.js cache
rm -rf .next
npm run dev
```

#### Issue: API key validation fails

**Check:**
1. API key format is correct (no extra spaces)
2. API key hasn't expired (check provider dashboard)
3. Provider account has active subscription
4. Environment variable name matches exactly

**Solution:**
```bash
# Verify variable is loaded
node -e "console.log(process.env.NEXT_PUBLIC_GOOGLE_GENAI_API_KEY)"

# Should output your API key (not undefined)
```

#### Issue: Firestore connection fails

**Check:**
1. Firebase credentials are correct
2. Firestore database is enabled
3. Network connectivity is working
4. Security rules allow read/write

**Solution:**
```bash
# Test Firestore connection
npm install -g firebase-tools
firebase login
firebase projects:list
firebase database:instances:list
```

#### Issue: TypeScript errors on startup

**Solution:**
```bash
# Type check entire project
npm run typecheck

# Fix TypeScript errors
# Review error messages and update types

# Clear TypeScript cache
rm -rf node_modules/.cache
npm run dev
```

#### Issue: Genkit dashboard not accessible

**Solution:**
```bash
# Stop all processes (Ctrl+C in both terminals)

# Clear Genkit cache
rm -rf .genkit

# Restart Genkit server
npm run genkit:dev

# Access dashboard at http://localhost:4000
```

#### Issue: Port already in use

**Solution:**
```bash
# For macOS/Linux: Find process using port 9002
lsof -i :9002

# Kill process
kill -9 <PID>

# For port 4000 (Genkit)
lsof -i :4000
kill -9 <PID>

# Restart servers
```

---

## Development Workflow

### Code Organization

```
src/
├── app/                 # Next.js app directory
│   └── [page routes]   # Page components
├── components/          # React components
│   ├── cinematic/      # Animated components
│   ├── ui/             # Base UI library
│   └── landing/        # Landing page sections
├── ai/                  # AI orchestration
│   ├── flows/          # Genkit flows
│   ├── genkit.ts       # Provider config
│   └── dev.ts          # Dev server
├── firebase/            # Firebase integration
├── services/            # Business logic
│   └── ai/             # AI service layer
├── hooks/              # React hooks
└── lib/                # Shared utilities
```

### Making Your First Change

**Example: Add new startup flow**

1. Create flow file: `src/ai/flows/new-flow.ts`
```typescript
import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const InputSchema = z.object({
  input: z.string()
});

const OutputSchema = z.object({
  output: z.string()
});

export async function newFlow(input: z.infer<typeof InputSchema>) {
  // Implementation
  return { output: 'result' };
}
```

2. Add to Genkit flow registry (if needed)
3. Test via Genkit dashboard or direct invocation
4. Use in React component
5. Commit with semantic message (see [COMMIT_CONVENTIONS.md](./COMMIT_CONVENTIONS.md))

### Testing Flows Locally

**Via TypeScript:**
```bash
# Create test file
cat > test-flow.ts << 'EOF'
import { newFlow } from '@/ai/flows/new-flow';

newFlow({ input: 'test' }).then(result => {
  console.log('Result:', result);
});
EOF

# Run test
npx ts-node test-flow.ts
```

**Via Genkit Dashboard:**
1. Go to http://localhost:4000
2. Select flow from list
3. Provide input
4. Execute and see results
5. View logs and tracing

### Code Style & Formatting

```bash
# Type checking
npm run typecheck

# Linting (if configured)
npm run lint

# Format code (if Prettier configured)
npx prettier --write "src/**/*.{ts,tsx,css}"
```

### Git Workflow

```bash
# Create feature branch
git checkout -b feat/your-feature-name

# Make changes and commit
git add .
git commit -m "feat: describe your feature"

# Push to GitHub
git push origin feat/your-feature-name

# Create Pull Request on GitHub
# (see CONTRIBUTING.md for PR guidelines)
```

---

## Production Build

### Building for Production

```bash
# Type check first
npm run typecheck

# Create production build
npm run build

# Build output in `.next` directory
# Optimized for deployment
```

### Starting Production Server

```bash
# Start production server
npm start

# Server runs on http://localhost:3000
# Much faster than dev server
```

### Performance Verification

```bash
# Analyze bundle size
npm install -g next
next analyze

# View build analysis in browser
# Check for large dependencies to optimize
```

---

## Next Steps

1. ✅ Read [ARCHITECTURE.md](./ARCHITECTURE.md) for system design
2. ✅ Review [AI_ORCHESTRATION.md](./AI_ORCHESTRATION.md) for AI flows
3. ✅ Check [CONTRIBUTING.md](./CONTRIBUTING.md) for contribution guidelines
4. ✅ Study [COMMIT_CONVENTIONS.md](./COMMIT_CONVENTIONS.md) for commit messages
5. ✅ Start implementing features!

## Getting Help

- **Documentation**: See `/docs` directory
- **GitHub Issues**: Create issue for bugs or feature requests
- **Discussions**: Engage in GitHub discussions
- **Email**: Include appropriate contact info

---

**Happy coding! 🚀**
