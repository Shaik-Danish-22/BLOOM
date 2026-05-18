# Contributing to BLOOM

**Thank you for your interest in contributing to BLOOM!**

This document provides guidelines for contributing code, documentation, and ideas to the BLOOM project.

---

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Workflow](#development-workflow)
4. [Commit Conventions](#commit-conventions)
5. [Pull Request Process](#pull-request-process)
6. [Code Style & Standards](#code-style--standards)
7. [Testing Requirements](#testing-requirements)
8. [Documentation Standards](#documentation-standards)
9. [Contribution Types](#contribution-types)

---

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inspiring community for all. We expect all contributors to:

- **Be respectful**: Treat all people with respect and dignity
- **Be inclusive**: Welcome people from all backgrounds and perspectives
- **Be constructive**: Provide thoughtful, constructive feedback
- **Be professional**: Maintain professional communication standards

### Unacceptable Behavior

The following behaviors are not tolerated:

- Harassment, discrimination, or hate speech
- Threats or intimidation
- Unwelcome romantic or sexual attention
- Doxxing or sharing private information
- Spam or promotional content

**Report violations to**: [contact email] - All reports are confidential.

---

## Getting Started

### 1. Fork & Clone

```bash
# Fork the repository on GitHub
# https://github.com/yourusername/bloom/fork

# Clone your fork
git clone https://github.com/yourusername/bloom.git

# Add upstream remote
git remote add upstream https://github.com/original/bloom.git

# Verify remotes
git remote -v
```

### 2. Set Up Development Environment

```bash
# Follow SETUP_GUIDE.md for complete instructions
cd bloom
npm install
npm run dev
```

### 3. Create Feature Branch

```bash
# Update main branch
git checkout main
git pull upstream main

# Create feature branch
git checkout -b feat/your-feature-name

# Branch naming convention:
# feat/description         - New feature
# fix/description          - Bug fix
# docs/description         - Documentation
# refactor/description     - Code refactoring
# test/description         - Test improvements
# perf/description         - Performance improvement
```

---

## Development Workflow

### 1. Make Changes

Create your feature/fix in a focused, single-concern branch.

**Best Practices:**
- ✅ Make small, logical commits
- ✅ Keep commits focused on single concern
- ✅ Write clear, descriptive commit messages
- ✅ Update documentation alongside code
- ✅ Add tests for new functionality

### 2. Verify Code Quality

```bash
# Type checking
npm run typecheck

# Linting (if configured)
npm run lint
```

### 3. Test Your Changes

#### Manual Testing
1. Start dev server: `npm run dev`
2. Navigate to affected features
3. Test normal flow and edge cases
4. Check console for errors

#### Genkit Dashboard Testing
1. Start: `npm run genkit:dev`
2. Go to http://localhost:4000
3. Test your flow directly
4. Verify outputs

### 4. Commit Your Changes

```bash
# Stage changes
git add src/...

# Commit with semantic message
git commit -m "feat: add neural DNA enhancement"

# See COMMIT_CONVENTIONS.md for detailed format
```

### 5. Keep Branch Updated

```bash
# Fetch latest changes
git fetch upstream

# Rebase on main
git rebase upstream/main

# Force push to your fork (safe after rebase)
git push --force-with-lease origin feat/your-feature
```

### 6. Push & Create Pull Request

```bash
# Push feature branch
git push origin feat/your-feature-name

# Go to GitHub and create Pull Request
# Fill out PR template completely
```

---

## Commit Conventions

**BLOOM uses semantic commit messages.** See [COMMIT_CONVENTIONS.md](./COMMIT_CONVENTIONS.md) for complete details.

### Quick Reference

```
<type>: <subject>

<body>
<footer>
```

### Types

| Type | Purpose |
|------|---------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation |
| `refactor` | Code restructure |
| `test` | Tests |
| `perf` | Performance |
| `chore` | Maintenance |
| `ai` | AI/ML changes |
| `ui` | UI/UX changes |

---

## Pull Request Process

### 1. PR Title Format

```
<type>: <description>
```

### 2. PR Description Template

```markdown
## Description
Clear summary of what this PR accomplishes.

## Changes Made
- Change 1
- Change 2

## Testing
- [ ] Tested in development
- [ ] Verified Genkit flows
- [ ] Checked error handling

## Checklist
- [ ] Code follows style guidelines
- [ ] Documentation is updated
- [ ] No console.log in code
- [ ] No breaking changes
```

---

## Code Style & Standards

### TypeScript

```typescript
// ✅ Good: Explicit types
interface StartupData {
  id: string;
  name: string;
}

function processStartup(data: StartupData): void {
  // implementation
}
```

### Naming Conventions

```typescript
// ✅ Good: Descriptive, clear purpose
- `deriveDesignDNA()` - function
- `DesignDNAOutput` - type
- `PROVIDER_TIMEOUT` - constant
- `useInvestorSimulation()` - hook
```

---

## Testing Requirements

### When to Add Tests

- ✅ New public functions
- ✅ Critical business logic
- ✅ Bug fixes (regression tests)

---

## Documentation Standards

### Code Comments

```typescript
/**
 * Derives core strategic DNA from a startup idea.
 *
 * @param input - Contains raw startup concept
 * @returns Design DNA package
 */
export async function deriveDesignDNA(input) {
  // ...
}
```

---

## Contribution Types

### 🎨 Design Contributions
- UI/UX improvements
- New cinematic components
- Motion design enhancements

### 💻 Code Contributions
- New features
- Bug fixes
- Performance optimizations

### 📚 Documentation Contributions
- Guides and tutorials
- Architecture documentation
- Code examples

### 🤖 AI Reasoning Improvements
- Prompt engineering
- Flow optimization
- Output quality enhancement

---

## Getting Help

- 📖 Check [README.md](../README.md)
- 📚 Review documentation in `/docs`
- 💬 Ask in GitHub Discussions
- 🐛 Search existing issues

---

## Recognition & Thanks

Contributors are recognized through:
- GitHub contributor graph
- Project CONTRIBUTORS.md
- Release notes
- Community acknowledgments

**Thank you for contributing to BLOOM! 🚀**
