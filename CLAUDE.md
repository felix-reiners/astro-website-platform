# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Multi-Template Website Generation Platform** - Automatically generates professional websites for mobile apps, consulting businesses, and book launches. Creates SEO-optimized, multi-language sites with 95+ PageSpeed scores and WCAG 2.1 AA accessibility.

### Key Architecture
- **Three-Level System**: Core components → Templates → Site implementations
- **Templates**: app-marketing, consulting, book
- **Tech Stack**: Astro 5 + Tailwind CSS 4 + React
- **Languages**: EN, DE, FR, ES, IT, PT
- **Privacy**: Cookieless analytics, GDPR compliant

📖 **Full architecture details:** [docs/development/ARCHITECTURE.md](docs/development/ARCHITECTURE.md)

---

## Development Commands

```bash
# Development
pnpm install            # Install dependencies
pnpm dev                # Start dev server (http://localhost:4321)
pnpm build              # Build for production
pnpm preview            # Preview production build

# Testing
pnpm test               # Run all tests (unit + E2E)
pnpm test:unit          # Run unit tests
pnpm test:unit:watch    # Unit tests in watch mode
pnpm test:e2e           # Run E2E tests
pnpm test:coverage      # Generate coverage report

# Performance
pnpm perf:check         # Check performance budget
pnpm perf:build         # Build and check performance

# Site Generation
pnpm generate examples/your-config.json
```

---

## Repository Structure

**Three-Level Architecture:**

```
src/components/
├── ui/                 # LEVEL 1: Core components (Button, Card, Hero, etc.)
├── marketing/          # LEVEL 2: App marketing template
├── consulting/         # LEVEL 2: Consulting template
└── book/               # LEVEL 2: Book promotion template

generated-sites/        # LEVEL 3: Site implementations
├── weatherpro/         # App marketing site
├── studiobright/       # Consulting site
└── fiction-book/       # Book promo site
```

**Component Decision Matrix:**
- **Core (`ui/`)**: Universal, template-agnostic → Button, Card, Hero, Navigation
- **Template (`marketing/`, `consulting/`, `book/`)**: Business-specific → FeatureGrid, ServicesGrid, ChapterPreview
- **Site (`generated-sites/`)**: Individual websites with content & branding

---

## Component Standards

### Always Define TypeScript Interfaces

```astro
---
export interface Props {
  title: string
  subtitle?: string
  variant?: 'primary' | 'secondary'
  class?: string
}

const {
  title,
  subtitle,
  variant = 'primary',
  class: className = '',
  ...props
} = Astro.props
---

<div class={`base-class ${variantClasses[variant]} ${className}`} {...props}>
  <h2>{title}</h2>
  {subtitle && <p>{subtitle}</p>}
  <slot />
</div>
```

### Use CSS Custom Properties for Theming

```css
/* ✅ GOOD: Use theme variables */
.component {
  background-color: rgb(var(--color-fill));
  color: rgb(var(--color-text-base));
  border-color: rgb(var(--color-accent));
}

/* ❌ BAD: Hard-code colors */
.component {
  background-color: #3B82F6;
  color: white;
}
```

### Always Include Dark Mode

```html
<div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  <h1 class="text-gray-900 dark:text-white">Title</h1>
  <p class="text-gray-600 dark:text-gray-300">Description</p>
</div>
```

---

## Internationalization (i18n)

```javascript
// Import i18n utility
import { t, getCurrentLocale } from '@/utils/i18n'

// Get current locale from URL
const locale = getCurrentLocale(Astro.url)

// Use translations with parameters
const title = t('hero.title', { appName: 'MyApp' }, locale)
```

**Translation file structure:**
```json
{
  "nav": { "home": "Home", "features": "Features" },
  "hero": {
    "title": "Welcome to {{appName}}",
    "downloadButton": "Download Free"
  }
}
```

---

## Quality Standards

**Every change must maintain:**
- ✅ **Lighthouse Performance**: 95+
- ✅ **Lighthouse Accessibility**: 95+ (WCAG 2.1 AA)
- ✅ **Lighthouse Best Practices**: 95+
- ✅ **Lighthouse SEO**: 95+
- ✅ **Bundle Size**: < 100KB initial, < 500KB total
- ✅ **Privacy**: No tracking cookies, GDPR compliant

**Before committing:**
```bash
pnpm build              # Check for errors
pnpm preview            # Test production build
# Run Lighthouse in browser DevTools
```

---

## File Naming Conventions

```bash
# Components: PascalCase
Hero.astro, FeatureGrid.astro, PricingTable.astro

# Pages: kebab-case
index.astro, privacy-policy.astro, about.astro

# Utilities: camelCase
i18nHelpers.ts, analyticsTracker.ts, configValidator.ts

# Configs: kebab-case
site-config.json, theme-config.ts, app-config.js
```

---

## Import Organization

```javascript
// 1. Node.js built-ins
import fs from 'fs'
import path from 'path'

// 2. External packages
import { defineConfig } from 'astro/config'

// 3. Internal imports (use @ alias)
import { appConfig } from '@/config/app-config'
import Button from '@/components/ui/Button.astro'
```

---

## Common Tasks

### Adding a New Component

1. Decide level: Core (`ui/`) vs Template (`marketing/`, `consulting/`, `book/`)
2. Create file with TypeScript interface
3. Use CSS custom properties for theming
4. Include dark mode support
5. Test responsive design
6. Check accessibility

### Adding Translations

1. Edit files in `src/content/i18n/[lang].json`
2. Follow existing key structure (`section.subsection.key`)
3. Use `{{variable}}` syntax for parameters
4. Test with language switcher

### Generating a Site

```bash
pnpm generate examples/fitness-app-config.json
# Output: generated-sites/fitnesstracker/
```

---

## Documentation

📚 **For detailed information, see:**

### For Developers
- **[CONTRIBUTING.md](docs/development/CONTRIBUTING.md)** - Development workflow & code standards
- **[ARCHITECTURE.md](docs/development/ARCHITECTURE.md)** - Three-level system & technical details
- **[FORM_INTEGRATIONS.md](docs/development/FORM_INTEGRATIONS.md)** - Substack & Audienceful setup
- **[CONTENT_GENERATION.md](docs/development/CONTENT_GENERATION.md)** - AI content generation prompts

### For Marketing/Business Users
- **[QUICK_START.md](docs/marketing/QUICK_START.md)** - 5-minute setup guide
- **[SITE_GENERATION.md](docs/marketing/SITE_GENERATION.md)** - How to generate websites
- **[LAUNCH_CHECKLIST.md](docs/marketing/LAUNCH_CHECKLIST.md)** - Pre-launch checklist

---

## Development Principles

1. **Component Reusability**: Build once in core, use everywhere
2. **Accessibility First**: WCAG 2.1 AA is non-negotiable
3. **Performance Budget**: Measure before and after changes
4. **Theme System**: Never hard-code colors or brand-specific values
5. **Multi-language**: Consider i18n impact for all user-facing text
6. **Privacy by Design**: No tracking cookies, hash all PII

---

**When in doubt:** Check [CONTRIBUTING.md](docs/development/CONTRIBUTING.md) or [ARCHITECTURE.md](docs/development/ARCHITECTURE.md)