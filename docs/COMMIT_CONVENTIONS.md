# Commit Conventions

**Semantic versioning and professional commit standards for BLOOM.**

This guide ensures consistent, clear, and professional commit messages throughout the project.

---

## Overview

BLOOM uses **semantic commit messages** that follow the Conventional Commits specification, adapted for an AI startup platform.

### Format

```
<type>: <subject>

<body>

<footer>
```

---

## Type

The commit type describes the category of change.

### Standard Types

| Type | Purpose | Example |
|------|---------|---------|
| **feat** | New feature or functionality | `feat: add design DNA enhancement` |
| **fix** | Bug fix | `fix: resolve oracle score calculation` |
| **docs** | Documentation changes | `docs: add orchestration guide` |
| **refactor** | Code restructure (no logic change) | `refactor: simplify error handling` |
| **test** | Test additions/updates | `test: add design DNA unit tests` |
| **perf** | Performance improvements | `perf: optimize provider routing` |
| **chore** | Maintenance tasks | `chore: update dependencies` |

### Custom Types (BLOOM-Specific)

| Type | Purpose | Example |
|------|---------|---------|
| **ai** | AI/ML improvements | `ai: improve design DNA reasoning` |
| **ui** | UI/UX improvements | `ui: refine oracle gauge animation` |
| **orchestration** | Orchestration changes | `orchestration: add fallback retry logic` |
| **motion** | Motion/animation updates | `motion: add workspace transition effects` |
| **validation** | Validation logic | `validation: enhance anti-slop gates` |
| **architecture** | Architecture changes | `architecture: refactor persistence layer` |

---

## Subject

The subject line is a concise description of the change.

### Rules

1. **Use imperative mood** ("add", not "added" or "adds")
2. **Don't capitalize first letter** (except acronyms)
3. **No period at end** of subject line
4. **Max 50 characters** (strict limit)
5. **Specific and descriptive**

### Examples

✅ **Good:**
```
feat: add neural DNA orchestration pipeline
fix: resolve concurrent firestore writes
docs: update multi-model architecture guide
ui: improve cinematic transition timing
```

❌ **Avoid:**
```
Added feature
WIP: stuff
Update code
fixed it
random changes
```

---

## Body

The body explains **why** the change is needed, not **what** (code shows what).

### Rules

1. **Wrap at 72 characters**
2. **Separate from subject with blank line**
3. **Explain motivation and impact**
4. **Reference issues when applicable**
5. **Be detailed but concise**

### Example

```
feat: implement multi-provider fallback system

The current system only uses Gemini, which fails under
high load. This commit adds intelligent routing across
DeepSeek, Gemini, and Claude with automatic failover.

Benefits:
- 99.9% uptime target
- Reduced latency for reasoning tasks
- Cost optimization through provider routing
- Graceful degradation on provider failure

Implementation leverages Genkit's plugin architecture
for clean provider abstraction.

Closes #142
```

---

## Footer

The footer contains metadata like issue references and breaking changes.

### References

Link to related issues:
```
Closes #123
Fixes #123
Relates to #123
```

### Breaking Changes

```
BREAKING CHANGE: removed legacy orchestration API

The old `executeFlow()` method is no longer available.
Use `orchestrateTask()` instead.
```

### Examples

```
feat: add workspace collaboration features

Add real-time sync for multiple founders editing
same startup profile simultaneously.

- Uses Firestore transactions
- Implements conflict resolution
- Adds presence indicators

Closes #156
Relates to #149

BREAKING CHANGE: WebSocket connections required
```

---

## Complete Example Commits

### Feature Commit

```
feat: implement cinematic materialization system

Add progressive disclosure of generated website content
with smooth transitions and synchronized animations.

Features:
- Staggered section rendering
- Scroll-to-section navigation
- Copy preview with design system
- Interactive element prototyping

Uses Framer Motion shared layout animations for
seamless context continuity between views.

Implements #78
```

### Bug Fix Commit

```
fix: resolve oracle score calculation race condition

The oracle score generation was running in parallel
with design DNA derivation, causing inconsistent
scores when both finished out of order.

Fixed by ensuring sequential execution and adding
explicit dependency on design DNA completion.

Performance impact: ~2 second increase in generation
time, but guarantees correctness.

Fixes #189
```

### Documentation Commit

```
docs: add comprehensive AI orchestration guide

Document the multi-provider routing strategy,
including reasoning vs generation task classification,
provider selection algorithm, and fallback strategies.

Includes:
- Architecture diagrams
- Provider comparison table
- Flow definition patterns
- Error handling strategies
- Performance optimization tips

Relates to #204
```

### Refactoring Commit

```
refactor: consolidate AI orchestration utilities

Move provider routing logic from service layer to
dedicated orchestrator module. Improves testability
and reduces duplication across flows.

Changes:
- Create src/services/ai/orchestrator.ts
- Update flow files to use orchestrator
- Remove provider logic from individual flows
- Add comprehensive error classification

Zero functionality change - purely organizational.

No issue
```

### Performance Commit

```
perf: implement response caching for design DNA

Add 24-hour TTL cache for generated design DNA
to reduce provider calls by ~60% for repeated prompts.

Results:
- Average latency: 32s → 1.2s (for cached)
- Provider cost reduction: ~$450/month
- Scaling capacity: 5x with same infrastructure

Uses in-memory cache with Firestore backup.

Relates to #212
```

---

## Special Cases

### Experimental Features

```
feat: (experimental) add voice-first interface

Add voice input capabilities for founder ideation.
This is experimental and may be removed.

Issue: #220
Experimental: true
```

### Hotfixes (Critical Bugs)

```
fix: (hotfix) resolve production auth failures

Critical bug causing 40% of users unable to log in.
Immediate fix for provider auth timeout.

Production impact: HIGH
Rollback plan: Revert to commit abc123

Fixes #225
```

### Documentation Fixes

```
docs: fix typo in orchestration guide

Changed "Geniki" to "Genkit" on line 42.
```

### Dependency Updates

```
chore: update genkit to 1.29.0

Security patch includes vulnerability fixes and
performance improvements for flow execution.

- @genkit-ai/google-genai: 1.28.0 → 1.29.0
- Includes 2 security patches
- No breaking changes
```

---

## Validation Checklist

Before committing, verify:

- ✅ **Correct type**: Is it feat/fix/docs/etc?
- ✅ **Subject format**: Imperative, no period, <50 chars?
- ✅ **Body quality**: Explains why, not what?
- ✅ **References**: Issues linked correctly?
- ✅ **Scope**: One logical change per commit?
- ✅ **Testing**: Code tested thoroughly?
- ✅ **Documentation**: Updated if needed?

### Git Hooks (Optional Setup)

```bash
# Install commitizen (helps format commits)
npm install -g commitizen

# Then use:
git cz  # Interactive commit

# Or install husky for automatic validation
npm install husky --save-dev
husky install
```

---

## Commit History Quality

### Good Commit History

```
✅ feat: add oracle investor score animation
✅ fix: resolve concurrent design DNA generation  
✅ docs: update architecture diagram
✅ ui: improve gauge transition smoothness
✅ perf: optimize provider routing latency
```

Shows clear narrative of feature development.

### Bad Commit History

```
❌ wip
❌ fixed it
❌ updates
❌ asdf
❌ random fixes and improvements
```

No context or understanding of changes.

---

## Pro Tips

### 1. Atomic Commits

One logical change per commit:

✅ Good:
```
feat: add design DNA archetype analysis
feat: add design DNA audience psychology
feat: add design DNA brand personality
```

❌ Bad:
```
feat: implement entire design DNA system
```

### 2. Rebase Before Push

```bash
# Keep history clean
git rebase -i upstream/main
git push --force-with-lease origin feature-branch
```

### 3. Use Interactive Staging

```bash
# Stage specific lines
git add -p

# Review and select changes
```

### 4. Meaningful Grouping

```
# Good: Related features in sequence
feat: add design DNA derivation
feat: add oracle scoring
feat: add investor simulation

# Then UI improvements
ui: enhance visualization
ui: improve transitions
```

---

## Examples by Type

### Architecture Commits

```
architecture: migrate persistence to Firestore

Move from in-memory storage to Cloud Firestore
for scalability and real-time collaboration.

- Migrate startup documents
- Implement real-time sync
- Add security rules
- Optimize query patterns

Closes #250
```

### Orchestration Commits

```
orchestration: add exponential backoff for retries

Implement smarter retry logic for transient failures:
- Start with 100ms base delay
- Exponential backoff (1.5x multiplier)
- Max 5 retries with 30s timeout

Reduces cascading failures under load.

Relates to #243
```

### Motion Commits

```
motion: add cinematic workspace reveal sequence

Enhance workspace loading with staggered
component animations using Framer Motion:

- Hero section slides in (300ms)
- Dashboard cards follow (200ms stagger)
- Interactive elements fade in (400ms)
- Maintains performance with GPU acceleration

Improves user perception of system responsiveness.
```

### Validation Commits

```
validation: strengthen anti-slop content gates

Add stricter content quality validation:
- Reject generic AI phrases
- Require sensory language
- Check copy density metrics
- Validate design consistency

Raises content quality bar by ~30%.
```

---

## Troubleshooting

### "I made a typo in my commit message"

```bash
# Amend last commit (not yet pushed)
git commit --amend -m "correct message"
git push --force-with-lease origin branch
```

### "I committed to wrong branch"

```bash
# Create new branch from current
git branch correct-branch

# Reset main to before mistake
git reset --hard upstream/main

# Switch to correct branch
git checkout correct-branch
```

### "I want to split a large commit"

```bash
# Reset to before commit
git reset HEAD~1

# Stage and commit smaller logical units
git add part1
git commit -m "feat: part 1"

git add part2
git commit -m "feat: part 2"
```

---

## References

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)
- Git commit best practices

---

**Questions? See [CONTRIBUTING.md](./CONTRIBUTING.md) for more guidance.**
