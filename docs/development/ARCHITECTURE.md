# Platform Architecture
**Multi-Template Website Generation Platform**

## Overview

This platform generates professional websites through a **three-level architecture** that balances reusability with customization:

1. **Core Components** - Universal UI primitives shared across all sites
2. **Templates** - Business-model-specific components and layouts
3. **Site Implementations** - Individual websites with content and branding

```
┌─────────────────────────────────────────────────────────┐
│                   CORE COMPONENTS                        │
│  Button, Card, Hero, Navigation, Footer, Forms          │
│  (Universal, template-agnostic UI primitives)           │
└─────────────────────────────────────────────────────────┘
                        │
        ┌───────────────┼───────────────┐
        ▼               ▼               ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ APP TEMPLATE │ │ CONSULTING   │ │ BOOK TEMPLATE│
│              │ │ TEMPLATE     │ │              │
│ • Features   │ │ • Services   │ │ • Chapters   │
│ • Pricing    │ │ • Case Study │ │ • Newsletter │
│ • Downloads  │ │ • Team Bios  │ │ • Reviews    │
└──────────────┘ └──────────────┘ └──────────────┘
        │               │               │
        ▼               ▼               ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ WeatherPro   │ │ StudioBright │ │ Fiction Book │
│ (app site)   │ │ (agency)     │ │ (promo site) │
└──────────────┘ └──────────────┘ └──────────────┘
```

---

## Repository Structure

```bash
astro-websites/
├── src/
│   ├── components/
│   │   ├── ui/              # LEVEL 1: Core components
│   │   │   ├── Button.astro
│   │   │   ├── Card.astro
│   │   │   ├── Hero.astro
│   │   │   ├── Navigation.astro
│   │   │   ├── Footer.astro
│   │   │   ├── ContactForm.astro
│   │   │   ├── NewsletterSignup.astro
│   │   │   └── AppSignup.astro
│   │   ├── marketing/       # LEVEL 2: App template
│   │   │   ├── FeatureGrid.astro
│   │   │   ├── PricingTable.astro
│   │   │   └── AppDownload.astro
│   │   ├── consulting/      # LEVEL 2: Consulting template
│   │   │   ├── ServicesGrid.astro
│   │   │   ├── CaseStudyCard.astro
│   │   │   └── LeadQualificationForm.astro
│   │   └── book/            # LEVEL 2: Book template
│   │       ├── ChapterPreview.astro
│   │       ├── ReviewsGrid.astro
│   │       └── AuthorBio.astro
│   ├── layouts/
│   │   └── BaseLayout.astro # Universal layout
│   ├── pages/
│   │   ├── index.astro      # Homepage
│   │   ├── about.astro
│   │   └── contact.astro
│   ├── content/
│   │   └── i18n/            # Translation files
│   │       ├── en.json
│   │       ├── de.json
│   │       └── ...
│   ├── styles/
│   │   ├── theme.css        # Theme system
│   │   └── global.css
│   └── utils/
│       ├── i18n.ts          # Internationalization
│       └── analytics.ts     # Cookieless tracking
├── generated-sites/         # LEVEL 3: Site implementations
│   ├── weatherpro/          # App marketing site
│   ├── projectflow/         # SaaS app site
│   ├── studiobright/        # Creative agency site
│   └── fitnesstracker/      # Fitness app site
├── examples/                # Configuration examples
│   ├── fitness-app-config.json
│   ├── saas-app-config.json
│   └── creative-agency-config.json
└── scripts/
    └── enhanced-content-generator.js  # Site generator
```

---

## Level 1: Core Components

**Purpose:** Universal UI primitives that work across all templates and business types.

**Design Principles:**
- Template-agnostic (no business logic)
- Accept props for customization
- Use CSS custom properties for theming
- Fully accessible (WCAG 2.1 AA)

### Example: Button Component

```astro
---
// src/components/ui/Button.astro
export interface Props {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  class?: string
}

const {
  variant = 'primary',
  size = 'md',
  href,
  class: className = '',
  ...props
} = Astro.props

const variants = {
  primary: 'bg-primary text-white hover:bg-primary-dark',
  secondary: 'bg-secondary text-white hover:bg-secondary-dark',
  outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white'
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg'
}

const classes = `inline-flex items-center justify-center font-medium transition-colors ${variants[variant]} ${sizes[size]} ${className}`
---

{href ? (
  <a href={href} class={classes} {...props}>
    <slot />
  </a>
) : (
  <button class={classes} {...props}>
    <slot />
  </button>
)}
```

### Core Component Catalog

| Component | Purpose | Template-Agnostic? |
|-----------|---------|-------------------|
| Button | Actions, links | ✅ Yes |
| Card | Content containers | ✅ Yes |
| Hero | Page headers | ✅ Yes |
| Navigation | Site navigation | ✅ Yes |
| Footer | Site footer | ✅ Yes |
| ContactForm | Generic forms | ✅ Yes |
| NewsletterSignup | Email capture (Substack) | ✅ Yes |
| AppSignup | Drip campaigns (Audienceful) | ✅ Yes |

---

## Level 2: Templates

**Purpose:** Business-model-specific components composed from core components.

**Current Templates:**
- **app-marketing** - Mobile app launches
- **consulting** - Professional services
- **book** - Book promotions

### Template Decision Matrix

**When to use which template:**

| Use Case | Template | Key Components |
|----------|----------|---------------|
| Mobile app launch | app-marketing | FeatureGrid, AppDownload, PricingTable |
| SaaS product | app-marketing | FeatureGrid, PricingTable |
| Consulting firm | consulting | ServicesGrid, CaseStudyCard, TeamMember |
| Creative agency | consulting | ServicesGrid, Portfolio |
| Book launch | book | ChapterPreview, ReviewsGrid, AuthorBio |
| Course launch | book | NewsletterSignup |

### Example: Template-Specific Component

```astro
---
// src/components/marketing/FeatureGrid.astro
import Card from '@/components/ui/Card.astro'

export interface Props {
  features: Array<{
    icon: string
    title: string
    description: string
  }>
}

const { features } = Astro.props
---

<section class="py-16 bg-gray-50 dark:bg-gray-900">
  <div class="container mx-auto px-4">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((feature) => (
        <Card class="p-6 text-center">
          <div class="text-4xl mb-4">{feature.icon}</div>
          <h3 class="text-xl font-semibold mb-3">{feature.title}</h3>
          <p class="text-gray-600 dark:text-gray-300">{feature.description}</p>
        </Card>
      ))}
    </div>
  </div>
</section>
```

---

## Level 3: Site Implementations

**Purpose:** Individual websites with specific content, branding, and configuration.

### Configuration Schema

```typescript
interface SiteConfig {
  // Business information
  name: string              // "WeatherPro"
  displayName: string       // "WeatherPro - Your Weather Companion"
  businessType: string      // "app-marketing" | "consulting" | "book"
  tagline: string
  description: string

  // Branding
  primaryColor: string      // "blue", "green", "purple"
  logo?: string
  favicon?: string

  // Website
  domain: string
  languages: string[]       // ["en", "de", "fr"]

  // Template-specific config
  features?: Feature[]      // For app-marketing
  services?: Service[]      // For consulting
  chapters?: Chapter[]      // For book

  // Integrations
  appStore?: {
    ios?: string
    android?: string
  }
  substackUrl?: string      // For book template
  audiencefulFormId?: string // For app template
}
```

### Example: Generated Site

```json
// generated-sites/weatherpro/site-config.json
{
  "name": "WeatherPro",
  "displayName": "WeatherPro - Advanced Weather Forecasting",
  "businessType": "app-marketing",
  "tagline": "Your personal weather companion",
  "description": "Get accurate weather forecasts with AI-powered predictions",
  "primaryColor": "blue",
  "languages": ["en", "de"],
  "features": [
    {
      "icon": "⚡",
      "title": "AI Predictions",
      "description": "Advanced algorithms for 99% accuracy"
    }
  ],
  "appStore": {
    "ios": "https://apps.apple.com/app/weatherpro/id123",
    "android": "https://play.google.com/store/apps/details?id=com.weatherpro"
  }
}
```

---

## Data Flow

### Site Generation Process

```
1. Configuration → 2. Template Selection → 3. Content Generation → 4. Build
```

**Detailed Flow:**

1. **Read Config** (`examples/app-config.json`)
   - Validate business type
   - Extract branding (colors, logo)
   - Get template-specific data

2. **Select Template**
   - app-marketing → Use FeatureGrid, AppDownload
   - consulting → Use ServicesGrid, CaseStudyCard
   - book → Use ChapterPreview, NewsletterSignup

3. **Generate Content** (Optional AI)
   - Hero headlines
   - Feature descriptions
   - SEO metadata

4. **Build Site**
   - Copy core components
   - Copy template components
   - Apply theme (CSS custom properties)
   - Generate pages
   - Build with Astro

5. **Output** → `generated-sites/[site-name]/`

---

## Theme System

### CSS Custom Properties

```css
/* Base theme (defined in theme.css) */
:root {
  /* Colors */
  --color-primary: 59, 130, 246;      /* Blue */
  --color-secondary: 99, 102, 241;    /* Indigo */
  --color-accent: 249, 115, 22;       /* Orange */

  /* Text */
  --color-text-base: 31, 41, 55;      /* Gray 800 */
  --color-text-muted: 107, 114, 128;  /* Gray 500 */

  /* Background */
  --color-fill: 255, 255, 255;        /* White */
  --color-card: 249, 250, 251;        /* Gray 50 */
}

/* Dark mode */
html[data-theme="dark"] {
  --color-text-base: 249, 250, 251;
  --color-text-muted: 156, 163, 175;
  --color-fill: 17, 24, 39;
  --color-card: 31, 41, 55;
}

/* Usage in components */
.button {
  background-color: rgb(var(--color-primary));
  color: rgb(var(--color-fill));
}
```

### Theme Generation

Themes are generated dynamically based on `primaryColor` in config:

```typescript
const themeMap = {
  blue: { primary: '59, 130, 246', secondary: '99, 102, 241' },
  green: { primary: '16, 185, 129', secondary: '5, 150, 105' },
  purple: { primary: '139, 92, 246', secondary: '124, 58, 237' }
}
```

---

## Internationalization (i18n)

### Multi-Language Support

**Supported Languages:** EN, DE, FR, ES, IT, PT

### Translation Files

```json
// src/content/i18n/en.json
{
  "nav": {
    "home": "Home",
    "features": "Features",
    "pricing": "Pricing"
  },
  "hero": {
    "downloadButton": "Download Free",
    "learnMore": "Learn More"
  },
  "footer": {
    "copyright": "© {{year}} {{appName}}. All rights reserved."
  }
}
```

### Usage in Components

```astro
---
import { t, getCurrentLocale } from '@/utils/i18n'

const locale = getCurrentLocale(Astro.url)
---

<button>{t('hero.downloadButton', locale)}</button>
```

---

## Performance Architecture

### Optimization Strategies

**Bundle Size Targets:**
- Initial load: < 100KB
- Total site: < 500KB

**Lighthouse Score Targets:**
- Performance: 95+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 95+

### Implementation

1. **Static Generation** - Astro builds static HTML
2. **Image Optimization** - AVIF/WebP formats
3. **Code Splitting** - Only load what's needed
4. **CSS Custom Properties** - No runtime theming overhead
5. **Self-Hosted Fonts** - No external requests

---

## Security & Privacy

### Cookieless Analytics

```typescript
// Server-side tracking only
export async function POST({ request }) {
  const { event, data } = await request.json()

  // Hash IP for privacy
  const ip = hashIP(request.headers.get('x-forwarded-for'))

  console.log('ANALYTICS:', { event, ip, data })

  return new Response(JSON.stringify({ success: true }))
}
```

### GDPR Compliance

✅ No tracking cookies
✅ Self-hosted fonts
✅ IP addresses hashed
✅ No consent banner required
✅ Privacy-first by design

---

## Testing Architecture

### Testing Strategy

Our testing approach combines unit tests for TypeScript utilities and E2E tests for components and user journeys.

```
┌─────────────────────────────────────────┐
│         E2E TESTS (Playwright)          │
│   • Navigation & routing                │
│   • Language switching                  │
│   • Accessibility validation            │
│   • Cross-browser testing               │
└─────────────────────────────────────────┘
                 │
        ┌────────┴────────┐
        ▼                 ▼
┌──────────────┐  ┌──────────────┐
│ UNIT TESTS   │  │ COMPONENT    │
│ (Vitest)     │  │ TESTING      │
│              │  │ (via E2E)    │
│ • i18n utils │  │ • Astro      │
│ • Analytics  │  │ • React      │
│ • Config     │  │ • Layouts    │
└──────────────┘  └──────────────┘
```

### Test Structure

```bash
src/
├── utils/
│   ├── i18n.ts
│   └── i18n.test.ts         # Unit tests next to source
├── components/
│   └── ui/
│       ├── Button.astro
│       └── Button.test.ts   # Logic tests for components
tests/
└── e2e/
    ├── homepage-navigation.spec.ts
    └── language-switching.spec.ts
```

### Unit Tests (Vitest)

**What to Test:**
- TypeScript utilities (`src/utils/`)
- Configuration logic (`src/config/`)
- Business logic and transformations

**Example:**
```typescript
// src/utils/i18n.test.ts
import { describe, it, expect } from 'vitest';
import { getLangFromUrl } from './i18n';

describe('getLangFromUrl', () => {
  it('should extract language from URL', () => {
    const url = new URL('http://localhost:4321/de/about');
    expect(getLangFromUrl(url)).toBe('de');
  });
});
```

**Coverage Targets:**
- Critical utilities (e.g., i18n): 90%+
- Overall TypeScript: 80%+

### E2E Tests (Playwright)

**What to Test:**
- Page navigation and routing
- Language switching across all 6 languages
- Form interactions
- Accessibility (using @axe-core/playwright)
- Responsive behavior
- SEO tags (meta, hreflang)

**Example:**
```typescript
// tests/e2e/homepage-navigation.spec.ts
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('should pass accessibility checks', async ({ page }) => {
  await page.goto('/');
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
```

**Browser Coverage:**
- Chromium (Chrome, Edge)
- Firefox
- WebKit (Safari)
- Mobile Chrome (Android)
- Mobile Safari (iOS)

### Test Scripts

```bash
# Unit tests
pnpm test:unit              # Run once
pnpm test:unit:watch        # Watch mode
pnpm test:unit:ui           # UI interface

# E2E tests
pnpm test:e2e               # All browsers
pnpm test:e2e:ui            # UI interface

# Coverage
pnpm test:coverage          # Generate report

# All tests
pnpm test                   # Unit + E2E
```

### Why Not Test Astro Components Directly?

Astro components (`.astro` files) are primarily markup and styling. Direct unit testing would require:
- Complex DOM rendering setup
- Slot handling simulation
- Astro-specific runtime mocking

Instead, we:
1. **Extract logic** into testable TypeScript utilities
2. **Test utilities** comprehensively with unit tests
3. **Test components** as integrated UI with E2E tests

This approach provides better ROI and catches real integration issues.

---

## Adding New Templates

### Template Creation Checklist

1. **Create Template Directory**
   ```
   src/components/[template-name]/
   ```

2. **Define Template Components**
   - Identify unique components
   - Compose from core components
   - Add business-specific logic

3. **Create Configuration Schema**
   ```typescript
   interface [TemplateName]Config {
     // Template-specific fields
   }
   ```

4. **Update Generator**
   ```typescript
   // scripts/enhanced-content-generator.js
   case 'new-template':
     components = ['NewComponent1', 'NewComponent2']
     break
   ```

5. **Test Generation**
   ```bash
   pnpm generate examples/new-template-config.json
   ```

---

## Best Practices

### Component Design

**DO:**
- ✅ Use TypeScript interfaces for props
- ✅ Provide sensible defaults
- ✅ Use CSS custom properties
- ✅ Include accessibility attributes
- ✅ Document with comments

**DON'T:**
- ❌ Hard-code colors or styles
- ❌ Mix business logic in core components
- ❌ Create dependencies between templates
- ❌ Duplicate component functionality

### Template Design

**DO:**
- ✅ Compose from core components
- ✅ Add business-specific logic
- ✅ Focus on conversion goals
- ✅ Maintain performance

**DON'T:**
- ❌ Recreate core components
- ❌ Break accessibility standards
- ❌ Add unnecessary dependencies
- ❌ Ignore performance budgets

---

## Technical Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Framework | Astro 5 | Static site generation |
| Styling | Tailwind CSS 4 | Utility-first CSS |
| Interactive | React 19 | Client-side interactivity |
| Testing | Vitest + Playwright | Unit & E2E testing |
| Accessibility | @axe-core/playwright | Automated a11y testing |
| Deployment | Vercel | Hosting & edge functions |
| Analytics | Custom + Vercel | Privacy-compliant tracking |
| Content | Claude AI | Automated content generation |

---

This architecture provides flexibility through templates while maintaining consistency through core components, enabling rapid generation of professional websites across multiple business models.