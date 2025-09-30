# Development Guidelines
## Multi-App Website Generation Platform

### Code Standards, Best Practices & Team Workflow

This document establishes development standards and best practices to ensure code quality, maintainability, and team collaboration.

---

## 📋 Code Standards

### File Naming Conventions
```bash
# Components: PascalCase
Hero.astro
FeatureGrid.astro
PricingTable.astro

# Utilities: camelCase
i18nHelpers.js
analyticsTracker.js
configValidator.js

# Pages: kebab-case
index.astro
pricing.astro
privacy-policy.astro

# Configs: kebab-case
app-config.js
theme-config.js
i18n-config.js

# CSS: kebab-case
base.css
theme-variables.css
component-styles.css
```

### Directory Structure Standards
```bash
src/
├── components/          # Reusable components
│   ├── ui/             # Generic UI components
│   ├── marketing/      # Marketing-specific components
│   ├── layout/         # Layout components
│   └── i18n/           # Internationalization components
├── content/            # Content collections
│   ├── blog/           # Blog posts by language
│   └── i18n/           # Translation files
├── layouts/            # Page layouts
├── pages/              # Route definitions
├── styles/             # Global styles and themes
├── utils/              # Utility functions
└── config/             # Configuration files
```

### Import Organization
```javascript
// 1. Node.js built-ins
import fs from 'fs'
import path from 'path'

// 2. External packages
import { defineConfig } from 'astro/config'

// 3. Internal imports (relative paths)
import { appConfig } from '../config/app-config.js'
import Button from './ui/Button.astro'
```

---

## 🎯 Component Standards

### Astro Component Structure
```astro
---
// TypeScript interface for props
export interface Props {
  title: string
  subtitle?: string
  variant?: 'primary' | 'secondary'
  class?: string
}

// Destructure props with defaults
const { 
  title, 
  subtitle,
  variant = 'primary',
  class: className = '',
  ...props 
} = Astro.props

// Component logic here
const baseClasses = 'component-base'
const variantClasses = {
  primary: 'bg-primary text-white',
  secondary: 'bg-secondary text-gray-900'
}
const classes = `${baseClasses} ${variantClasses[variant]} ${className}`
---

<!-- Component template -->
<div class={classes} {...props}>
  <h2 class="text-2xl font-bold">{title}</h2>
  {subtitle && (
    <p class="text-lg mt-2">{subtitle}</p>
  )}
  <slot />
</div>

<!-- Component-specific styles (if needed) -->
<style>
  .component-base {
    /* Component-specific styles */
  }
</style>
```

### React Component Standards (for interactive components)
```tsx
// src/components/ui/InteractiveButton.tsx
import { useState } from 'react'

interface Props {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary'
  disabled?: boolean
  className?: string
}

export default function InteractiveButton({ 
  children, 
  onClick, 
  variant = 'primary',
  disabled = false,
  className = ''
}: Props) {
  const [isLoading, setIsLoading] = useState(false)
  
  const handleClick = async () => {
    if (disabled || isLoading) return
    
    setIsLoading(true)
    try {
      await onClick?.()
    } finally {
      setIsLoading(false)
    }
  }
  
  const baseClasses = 'px-4 py-2 rounded font-medium transition-colors'
  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-primary-dark',
    secondary: 'bg-secondary text-gray-900 hover:bg-secondary-dark'
  }
  
  return (
    <button
      onClick={handleClick}
      disabled={disabled || isLoading}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  )
}
```

---

## 🌐 Internationalization Standards

### Translation Key Naming
```bash
# Structure: section.subsection.key
nav.home
nav.features
nav.pricing

hero.title
hero.subtitle
hero.cta

features.title
features.subtitle
features.item1.title
features.item1.description

footer.copyright
footer.privacy
footer.terms
```

### Translation File Structure
```json
{
  "nav": {
    "home": "Home",
    "features": "Features",
    "pricing": "Pricing",
    "blog": "Blog"
  },
  "hero": {
    "title": "Welcome to {{appName}}",
    "subtitle": "The best app for {{category}}",
    "downloadButton": "Download Free",
    "learnMore": "Learn More"
  },
  "features": {
    "title": "Why Choose {{appName}}?",
    "subtitle": "Discover what makes us different",
    "cta": "Get Started"
  }
}
```

### Using Translations in Components
```astro
---
import { t, getCurrentLocale } from '../utils/i18n.js'

const locale = getCurrentLocale(Astro.url)
const appName = appConfig.name
---

<h1>{t('hero.title', { appName }, locale)}</h1>
<p>{t('hero.subtitle', { category: 'productivity' }, locale)}</p>
```

---

## 💅 CSS & Styling Standards

### Tailwind CSS Guidelines
```html
<!-- ✅ Good: Logical grouping, responsive design -->
<div class="
  flex flex-col items-center justify-center
  p-6 md:p-8 
  bg-white dark:bg-gray-900
  rounded-lg shadow-lg
  transition-all duration-300
">

<!-- ❌ Bad: Random order, no grouping -->
<div class="p-6 flex bg-white rounded-lg shadow-lg transition-all items-center dark:bg-gray-900 flex-col duration-300 justify-center md:p-8">
```

### CSS Custom Properties Usage
```css
/* ✅ Good: Use CSS custom properties for theming */
.button-primary {
  background-color: var(--primary);
  color: var(--primary-contrast);
}

.button-primary:hover {
  background-color: var(--primary-dark);
}

/* ❌ Bad: Hardcoded colors */
.button-primary {
  background-color: #3B82F6;
  color: white;
}
```

### Dark Mode Implementation
```astro
<!-- ✅ Good: Include dark mode variants -->
<div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  <h1 class="text-gray-900 dark:text-white">Title</h1>
  <p class="text-gray-600 dark:text-gray-300">Description</p>
</div>
```

---

## ⚡ Performance Standards

### Image Optimization
```astro
---
// ✅ Good: Use Astro's Image component
import { Image } from 'astro:assets'
import heroImage from '../assets/hero.jpg'
---

<Image 
  src={heroImage}
  alt="App screenshot showing main features"
  width={800}
  height={600}
  format="avif"
  fallbackFormat="webp"
  loading="lazy"
  sizes="(max-width: 768px) 100vw, 800px"
/>

<!-- ❌ Bad: Regular img tag without optimization -->
<img src="/hero.jpg" alt="Hero image" />
```

### Code Splitting
```javascript
// ✅ Good: Dynamic imports for large components
const HeavyComponent = lazy(() => import('./HeavyComponent.tsx'))

// ✅ Good: Conditional loading
if (shouldLoadAnalytics) {
  const { trackEvent } = await import('./analytics.js')
  trackEvent('page_view')
}
```

### Bundle Size Monitoring
```javascript
// astro.config.mjs
export default defineConfig({
  vite: {
    build: {
      rollupOptions: {
        onwarn(warning, warn) {
          // Warn if bundle exceeds 500KB
          if (warning.code === 'BUNDLE_SIZE_EXCEEDED') {
            console.warn('⚠️ Bundle size exceeded recommended limit')
          }
          warn(warning)
        }
      }
    }
  }
})
```

---

## ♿ Accessibility Standards

### Semantic HTML
```html
<!-- ✅ Good: Proper semantic structure -->
<header>
  <nav aria-label="Main navigation">
    <ul>
      <li><a href="/" aria-current="page">Home</a></li>
      <li><a href="/features">Features</a></li>
    </ul>
  </nav>
</header>

<main>
  <section aria-labelledby="hero-heading">
    <h1 id="hero-heading">Welcome to our app</h1>
  </section>
</main>

<!-- ❌ Bad: Div soup without semantics -->
<div class="header">
  <div class="nav">
    <div class="nav-item">Home</div>
  </div>
</div>
```

### ARIA Implementation
```html
<!-- ✅ Good: Proper ARIA attributes -->
<button 
  aria-expanded="false" 
  aria-controls="mobile-menu"
  aria-label="Toggle mobile menu"
>
  Menu
</button>

<div id="mobile-menu" aria-hidden="true">
  <!-- Menu content -->
</div>

<!-- Form labels -->
<label for="email">Email Address</label>
<input 
  type="email" 
  id="email" 
  required 
  aria-describedby="email-error"
  aria-invalid="false"
>
<div id="email-error" role="alert" aria-live="polite">
  <!-- Error message -->
</div>
```

### Color Contrast Requirements
```css
/* ✅ Good: High contrast ratios */
.text-primary {
  color: #1F2937; /* Contrast ratio: 4.5:1 minimum */
}

.text-muted {
  color: #6B7280; /* Ensure 4.5:1 contrast on white background */
}

/* ✅ Good: Focus indicators */
.button:focus {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}
```

---

## 🧪 Testing Standards

### Unit Testing
```javascript
// tests/utils/i18n.test.js
import { describe, it, expect } from 'vitest'
import { t, getCurrentLocale } from '../src/utils/i18n.js'

describe('i18n utilities', () => {
  it('should return correct translation', () => {
    const result = t('nav.home', {}, 'en')
    expect(result).toBe('Home')
  })
  
  it('should handle parameter substitution', () => {
    const result = t('hero.title', { appName: 'TestApp' }, 'en')
    expect(result).toBe('Welcome to TestApp')
  })
  
  it('should fallback to default locale', () => {
    const result = t('nav.home', {}, 'unknown')
    expect(result).toBe('Home')
  })
})
```

### Integration Testing
```javascript
// tests/integration/site-generation.test.js
import { describe, it, expect } from 'vitest'
import { generateSite } from '../scripts/generate-site.js'
import fs from 'fs/promises'

describe('Site Generation', () => {
  it('should generate a complete site', async () => {
    const testConfig = {
      name: 'TestApp',
      primaryColor: 'blue',
      languages: ['en', 'de']
    }
    
    const outputDir = './test-output'
    await generateSite(testConfig, outputDir)
    
    // Verify files exist
    const indexExists = await fs.access(`${outputDir}/src/pages/index.astro`)
    expect(indexExists).not.toThrow()
    
    // Verify config is generated
    const { appConfig } = await import(`${outputDir}/src/config/app-config.js`)
    expect(appConfig.name).toBe('TestApp')
  })
})
```

### Accessibility Testing
```javascript
// tests/a11y/accessibility.test.js
import { test, expect } from '@playwright/test'
import { injectAxe, checkA11y } from 'axe-playwright'

test('homepage should be accessible', async ({ page }) => {
  await page.goto('http://localhost:3000')
  await injectAxe(page)
  
  const a11yResults = await checkA11y(page)
  expect(a11yResults.violations).toHaveLength(0)
})

test('should have proper focus management', async ({ page }) => {
  await page.goto('http://localhost:3000')
  
  // Test keyboard navigation
  await page.keyboard.press('Tab')
  const focusedElement = page.locator(':focus')
  await expect(focusedElement).toBeVisible()
})
```

---

## 📝 Documentation Standards

### Component Documentation
```astro
---
/**
 * Hero Component
 * 
 * A responsive hero section for marketing pages with support for 
 * app download buttons and background imagery.
 * 
 * @example
 * ```astro
 * <Hero 
 *   title="Welcome to MyApp"
 *   subtitle="The best productivity app"
 *   ctaText="Download Free"
 *   backgroundImage="/hero-bg.jpg"
 * />
 * ```
 */

export interface Props {
  /** Main headline text */
  title: string
  /** Supporting text below the title */
  subtitle?: string
  /** Text for the primary CTA button */
  ctaText?: string
  /** Background image URL */
  backgroundImage?: string
  /** Additional CSS classes */
  class?: string
}

const { 
  title, 
  subtitle, 
  ctaText = 'Get Started',
  backgroundImage,
  class: className = ''
} = Astro.props
---
```

### README Standards
```markdown
# Component Name

Brief description of what this component does.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | - | Main heading text |
| `variant` | `'primary' \| 'secondary'` | `'primary'` | Visual style variant |
| `disabled` | `boolean` | `false` | Whether the component is disabled |

## Usage

```astro
<ComponentName 
  title="Hello World"
  variant="primary"
/>
```

## Accessibility

- Uses semantic HTML elements
- Includes proper ARIA attributes
- Supports keyboard navigation
- Maintains 4.5:1 color contrast

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
```

---

## 🔄 Git Workflow

### Branch Naming
```bash
# Feature branches
feature/hero-component
feature/i18n-system
feature/analytics-tracking

# Bug fixes
bugfix/mobile-navigation
bugfix/dark-mode-colors

# Hotfixes
hotfix/security-patch
hotfix/performance-fix

# Releases
release/v1.0.0
release/v1.1.0
```

### Commit Message Format
```bash
# Format: type(scope): description

# Examples
feat(hero): add responsive hero component
fix(i18n): resolve translation fallback issue
docs(readme): update installation instructions
style(button): improve focus states
refactor(analytics): simplify tracking logic
test(hero): add unit tests for hero component
chore(deps): update astro to v4.0.0

# Breaking changes
feat(config)!: restructure app configuration format

BREAKING CHANGE: App configuration now requires nested structure
```

### Pull Request Template
```markdown
## Description
Brief description of changes made.

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Accessibility tests pass
- [ ] Performance benchmarks met

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] Accessibility requirements met
- [ ] Performance impact assessed

## Screenshots (if applicable)
Add screenshots for UI changes.
```

---

## 🚀 Deployment Standards

### Environment Configuration
```bash
# .env.local (development)
NODE_ENV=development
ASTRO_PUBLIC_SITE_URL=http://localhost:3000
ASTRO_PUBLIC_ANALYTICS_ENABLED=false

# .env.production (production)
NODE_ENV=production
ASTRO_PUBLIC_SITE_URL=https://app-name.com
ASTRO_PUBLIC_ANALYTICS_ENABLED=true
VERCEL_TOKEN=your_token_here
```

### Build Validation
```javascript
// scripts/validate-build.js
import { execSync } from 'child_process'
import fs from 'fs'

async function validateBuild() {
  console.log('🔍 Validating build...')
  
  // Check bundle size
  const distSize = await getFolderSize('./dist')
  if (distSize > 5 * 1024 * 1024) { // 5MB limit
    throw new Error(`Bundle size too large: ${distSize} bytes`)
  }
  
  // Check for required files
  const requiredFiles = [
    './dist/index.html',
    './dist/_astro/',
    './dist/assets/'
  ]
  
  for (const file of requiredFiles) {
    if (!fs.existsSync(file)) {
      throw new Error(`Required file missing: ${file}`)
    }
  }
  
  // Run Lighthouse audit
  const lighthouseScore = await runLighthouseAudit()
  if (lighthouseScore < 95) {
    throw new Error(`Lighthouse score too low: ${lighthouseScore}`)
  }
  
  console.log('✅ Build validation passed')
}
```

---

## 📊 Quality Metrics

### Code Quality Standards
```bash
# Lighthouse Scores (minimum)
Performance: 95+
Accessibility: 95+
Best Practices: 95+
SEO: 95+

# Bundle Size Limits
Initial Bundle: < 100KB
Total Bundle: < 500KB
Images: Optimized to WebP/AVIF

# Test Coverage
Unit Tests: 80%+
Integration Tests: 70%+
E2E Tests: Key user flows covered
```

### Performance Budgets
```javascript
// lighthouse.config.js
module.exports = {
  ci: {
    collect: {
      numberOfRuns: 3,
      settings: {
        preset: 'desktop'
      }
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.95 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.95 }],
        'categories:seo': ['error', { minScore: 0.95 }]
      }
    }
  }
}
```

---

These development guidelines ensure consistent, high-quality code that meets accessibility, performance, and maintainability standards across the entire platform.