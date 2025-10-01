# Contributing Guide
**Multi-Template Website Generation Platform**

## Getting Started

### Prerequisites
```bash
✓ Node.js 18+
✓ pnpm (recommended) or npm
✓ VS Code with Astro extension (recommended)
✓ Git configured
```

### Initial Setup
```bash
# Clone repository
git clone https://github.com/yourusername/astro-websites.git
cd astro-websites

# Install dependencies
pnpm install

# Start development server
pnpm dev
# Visit http://localhost:4321
```

---

## Development Workflow

### Making Changes

1. **Create feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make changes following code standards** (see below)

3. **Test locally**
   ```bash
   pnpm build          # Check for build errors
   pnpm preview        # Test production build
   ```

4. **Commit and push**
   ```bash
   git add .
   git commit -m "feat(component): add new feature"
   git push origin feature/your-feature-name
   ```

5. **Create pull request** on GitHub

---

## Code Standards

### File Naming Conventions

```bash
# Components: PascalCase
Hero.astro
FeatureGrid.astro
PricingTable.astro

# Utilities: camelCase
i18nHelpers.ts
analyticsTracker.ts
configValidator.ts

# Pages: kebab-case
index.astro
pricing.astro
privacy-policy.astro

# Configs: kebab-case
site-config.json
theme-config.ts
```

### Import Organization

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

## Component Standards

### Astro Component Structure

Always define TypeScript interfaces and use proper destructuring:

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

const baseClasses = 'inline-flex items-center justify-center font-medium transition-colors'
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

const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`
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

### Component Checklist

✅ **DO:**
- Define TypeScript interfaces for props
- Provide sensible defaults
- Use CSS custom properties for theming
- Include proper accessibility attributes
- Add JSDoc comments for complex components

❌ **DON'T:**
- Hard-code colors or brand-specific values
- Create dependencies between components
- Mix business logic in UI components
- Skip accessibility considerations

---

## Theme System

### Use CSS Custom Properties

```css
/* ✅ GOOD: Use theme variables */
.button {
  background-color: rgb(var(--color-primary));
  color: rgb(var(--color-fill));
}

.button:hover {
  background-color: rgb(var(--color-primary-dark));
}

/* ❌ BAD: Hard-code colors */
.button {
  background-color: #3B82F6;
  color: white;
}
```

### Dark Mode Support

Always include dark mode variants:

```html
<div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  <h1 class="text-gray-900 dark:text-white">Title</h1>
  <p class="text-gray-600 dark:text-gray-300">Description</p>
</div>
```

---

## Accessibility Standards

### Semantic HTML

```html
<!-- ✅ GOOD: Semantic structure -->
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
    <h1 id="hero-heading">Welcome</h1>
  </section>
</main>

<!-- ❌ BAD: Div soup -->
<div class="header">
  <div class="nav">
    <div class="nav-item">Home</div>
  </div>
</div>
```

### ARIA Attributes

```html
<!-- Interactive elements -->
<button
  aria-expanded="false"
  aria-controls="mobile-menu"
  aria-label="Toggle mobile menu"
>
  Menu
</button>

<!-- Form labels -->
<label for="email">Email Address</label>
<input
  type="email"
  id="email"
  required
  aria-describedby="email-help"
  aria-invalid="false"
/>
<div id="email-help">We'll never share your email</div>
```

### Focus Management

```css
/* Always visible focus indicators */
.button:focus {
  outline: 2px solid rgb(var(--color-accent));
  outline-offset: 2px;
}

.button:focus:not(:focus-visible) {
  outline: none; /* Only for mouse users */
}

.button:focus-visible {
  outline: 2px solid rgb(var(--color-accent));
  outline-offset: 2px;
}
```

---

## Common Tasks

### Adding a New Component

1. **Create component file**
   ```bash
   # For core components
   src/components/ui/NewComponent.astro

   # For template-specific
   src/components/marketing/NewComponent.astro
   ```

2. **Define TypeScript interface**
   ```astro
   ---
   export interface Props {
     title: string
     variant?: 'default' | 'special'
   }

   const { title, variant = 'default' } = Astro.props
   ---
   ```

3. **Implement with accessibility**
   - Use semantic HTML
   - Add ARIA labels
   - Support keyboard navigation

4. **Test in both themes**
   ```bash
   # Test light mode
   pnpm dev

   # Test dark mode (toggle in browser)
   ```

5. **Document usage** (if complex)

### Adding Translations

1. **Edit translation files**
   ```json
   // src/content/i18n/en.json
   {
     "newSection": {
       "title": "New Feature",
       "description": "Description here"
     }
   }
   ```

2. **Use in components**
   ```astro
   ---
   import { t, getCurrentLocale } from '@/utils/i18n'
   const locale = getCurrentLocale(Astro.url)
   ---

   <h2>{t('newSection.title', locale)}</h2>
   ```

3. **Test all languages**
   ```bash
   # Visit different language pages
   # http://localhost:4321/     (English)
   # http://localhost:4321/de   (German)
   # http://localhost:4321/fr   (French)
   ```

### Adding a New Template

1. **Create template directory**
   ```bash
   src/components/[template-name]/
   ```

2. **Build template-specific components**
   - Compose from `src/components/ui/`
   - Add business logic
   - Focus on conversion goals

3. **Update generator script**
   ```javascript
   // scripts/enhanced-content-generator.js
   case 'new-template':
     components = ['Component1', 'Component2']
     break
   ```

4. **Create example config**
   ```json
   // examples/new-template-config.json
   {
     "name": "Example",
     "businessType": "new-template",
     ...
   }
   ```

5. **Test generation**
   ```bash
   pnpm generate examples/new-template-config.json
   ```

---

## Testing

### Automated Testing

We use **Vitest** for unit tests and **Playwright** for E2E tests.

#### Running Tests

```bash
# Run all unit tests
pnpm test:unit

# Run unit tests in watch mode
pnpm test:unit:watch

# Run tests with UI interface
pnpm test:unit:ui

# Run E2E tests
pnpm test:e2e

# Run E2E tests with UI
pnpm test:e2e:ui

# Generate coverage report
pnpm test:coverage

# Run all tests (unit + E2E)
pnpm test
```

#### Unit Testing

Unit tests focus on TypeScript utilities and business logic.

**Example: Testing i18n utilities**
```typescript
// src/utils/i18n.test.ts
import { describe, it, expect } from 'vitest';
import { getLangFromUrl, useTranslations } from './i18n';

describe('i18n utilities', () => {
  it('should extract language from URL path', () => {
    const url = new URL('http://localhost:4321/de/about');
    expect(getLangFromUrl(url)).toBe('de');
  });

  it('should translate keys correctly', () => {
    const t = useTranslations('en');
    expect(t('nav.home')).toBe('Home');
  });
});
```

**Writing Unit Tests:**
1. Create `*.test.ts` files next to the code being tested
2. Test business logic, utilities, and configuration
3. Mock external dependencies
4. Aim for 90%+ coverage on critical utilities

**What to Test:**
- ✅ TypeScript utilities (`src/utils/`)
- ✅ Configuration logic (`src/config/`)
- ✅ Business logic and data transformations
- ❌ Astro components (use E2E tests instead)
- ❌ Styles and layouts (use E2E tests)

#### E2E Testing

E2E tests validate the complete user experience using real browsers.

**Example: Testing navigation**
```typescript
// tests/e2e/homepage-navigation.spec.ts
import { test, expect } from '@playwright/test';

test('should navigate to about page', async ({ page }) => {
  await page.goto('/');
  await page.click('a[href*="about"]');
  await expect(page).toHaveURL(/.*about.*/);
});
```

**Writing E2E Tests:**
1. Place tests in `tests/e2e/`
2. Test critical user journeys
3. Include accessibility checks
4. Test across multiple browsers (Chromium, Firefox, WebKit)

**What to Test:**
- ✅ Page navigation and routing
- ✅ Language switching
- ✅ Form interactions
- ✅ Accessibility (using @axe-core/playwright)
- ✅ Responsive behavior
- ✅ SEO tags (meta, hreflang)

#### Coverage Requirements

- **Critical utilities** (e.g., `i18n.ts`): 90%+ coverage
- **Overall TypeScript utilities**: 80%+ encouraged
- **Astro components**: Tested via E2E, not unit tests

View coverage report:
```bash
pnpm test:coverage
# Opens HTML report in coverage/index.html
```

### Manual Testing Checklist

Before submitting a PR:

- [ ] All automated tests pass (`pnpm test`)
- [ ] Build succeeds without errors (`pnpm build`)
- [ ] Site works in development mode
- [ ] Site works in production mode (preview)
- [ ] Responsive design works (mobile, tablet, desktop)
- [ ] Dark mode works properly
- [ ] Keyboard navigation works
- [ ] Screen reader friendly
- [ ] Performance is acceptable (check dev tools)

### Build and Preview

```bash
# Build for production
pnpm build

# Preview production build
pnpm preview

# Check for TypeScript errors
pnpm typecheck

# Run linting (if configured)
pnpm lint

# Check performance budget
pnpm perf:check

# Build and check performance
pnpm perf:build
```

### Performance Check

Open browser DevTools:
1. Run Lighthouse audit
2. Check Performance score (target: 95+)
3. Check Accessibility score (target: 95+)
4. Check bundle size (target: < 100KB initial)

---

## CI/CD Pipeline

### Automated Workflows

The project uses GitHub Actions for continuous integration and deployment. Four automated workflows run on every push and PR:

| Workflow | Runs On | Purpose |
|----------|---------|---------|
| **CI** | Push & PRs | Tests, type checking, build validation |
| **Lighthouse CI** | PRs | Performance audits |
| **Preview** | PRs | Deploy preview environments |
| **Deploy** | Push to main | Production deployment |

### What Happens on PR

When you create a pull request:

1. ✅ **CI Pipeline** runs:
   - TypeScript type checking
   - Unit tests (111 tests)
   - E2E tests (34 tests)
   - Build validation
   - Performance budget checks

2. 🔦 **Lighthouse CI** audits:
   - Performance (target: 95+)
   - Accessibility (target: 95+)
   - Best Practices (target: 95+)
   - SEO (target: 95+)
   - Results posted as PR comment

3. 🔍 **Preview Deployment**:
   - Automatic Vercel preview
   - Preview URL in PR comment
   - Updates on new commits

### Local CI Commands

Run the same checks locally before pushing:

```bash
# Run all CI checks
pnpm test              # Unit + E2E tests
pnpm typecheck         # TypeScript validation
pnpm build             # Production build
pnpm perf:check        # Performance budgets

# Quick pre-push check
pnpm test:unit && pnpm build
```

### CI/CD Setup

For full CI/CD documentation including:
- Configuring Vercel secrets
- Understanding workflow files
- Performance budgets
- Troubleshooting

See **[docs/development/CICD.md](CICD.md)**

---

## Git Workflow

### Branch Naming

```bash
# Features
feature/hero-component
feature/i18n-system

# Bug fixes
bugfix/mobile-navigation
bugfix/dark-mode-contrast

# Documentation
docs/contributing-guide
docs/architecture-updates
```

### Commit Messages

Follow conventional commits format:

```bash
# Format: type(scope): description

feat(hero): add responsive hero component
fix(i18n): resolve translation fallback issue
docs(readme): update installation instructions
style(button): improve focus states
refactor(analytics): simplify tracking logic
test(hero): add unit tests for hero component
chore(deps): update astro to v5.0.0

# Breaking changes
feat(config)!: restructure app configuration

BREAKING CHANGE: Configuration now requires nested structure
```

### Pull Request Process

1. **Ensure PR is ready**
   - All tests pass
   - Code follows standards
   - No merge conflicts

2. **Create descriptive PR**
   - Clear title and description
   - Reference related issues
   - Add screenshots for UI changes

3. **Request review**

4. **Address feedback**

5. **Merge when approved**

---

## Quality Standards

### Code Quality Requirements

```bash
✓ Lighthouse Performance: 95+
✓ Lighthouse Accessibility: 95+
✓ Lighthouse Best Practices: 95+
✓ Lighthouse SEO: 95+

✓ Bundle Size: < 100KB initial, < 500KB total
✓ TypeScript: No type errors
✓ WCAG 2.1 AA: Fully compliant
```

### Performance Guidelines

1. **Images**
   - Use Astro's `<Image>` component
   - Provide AVIF/WebP formats
   - Add proper `alt` text
   - Use `loading="lazy"` except above fold

2. **JavaScript**
   - Minimize client-side JS
   - Use dynamic imports for large components
   - Avoid unnecessary hydration

3. **CSS**
   - Use Tailwind utilities
   - Avoid custom CSS when possible
   - Minimize unused styles

---

## Component Level Guidelines

### Level 1: Core Components (`src/components/ui/`)

**Purpose:** Universal UI primitives

**Rules:**
- Must be template-agnostic
- No business logic
- Fully customizable via props
- Accessible by default

**Examples:**
- Button, Card, Hero
- Navigation, Footer
- Forms, Inputs

### Level 2: Template Components (`src/components/[template]/`)

**Purpose:** Business-specific components

**Rules:**
- Compose from core components
- Add template-specific logic
- Focus on conversion goals
- Maintain performance standards

**Examples:**
- FeatureGrid (app-marketing)
- ServicesGrid (consulting)
- ChapterPreview (book)

### Level 3: Site Implementations (`generated-sites/`)

**Purpose:** Individual websites

**Rules:**
- Use template components
- Add content and branding
- Minimal custom code
- Follow platform standards

---

## Documentation

### Component Documentation

Add JSDoc for complex components:

```astro
---
/**
 * Hero Component
 *
 * A responsive hero section for marketing pages.
 *
 * @example
 * ```astro
 * <Hero
 *   title="Welcome to MyApp"
 *   subtitle="Best productivity app"
 *   ctaText="Download Free"
 * />
 * ```
 */
export interface Props {
  /** Main headline text */
  title: string
  /** Supporting text below title */
  subtitle?: string
  /** CTA button text */
  ctaText?: string
}
---
```

### Update Documentation

When adding features:
- Update relevant docs in `docs/`
- Add examples to `examples/`
- Update README.md if needed

---

## Testing

### Running Tests

```bash
# Run all tests
npm test                    # Unit + E2E + Visual

# Interactive testing (recommended for development)
npm run test:e2e:ui        # Interactive E2E testing
npm run test:visual:ui     # Interactive visual testing

# Specific test suites
npm run test:unit          # Unit tests only
npm run test:e2e           # E2E tests only
npm run test:visual        # Visual regression tests
npm run test:components    # Component behavior tests
npm run test:generated-sites  # Multi-site consistency tests
```

### Writing Tests

**Before submitting a PR:**
1. ✅ Write tests for new components
2. ✅ Update visual baselines if you changed styles
3. ✅ Ensure all tests pass locally
4. ✅ Check accessibility with `@axe-core` tests

**Test Coverage Requirements:**
- New components must have component tests
- UI changes must update visual regression baselines
- Accessibility features must have a11y tests

### Visual Regression Testing

When you change component styles:

```bash
# 1. Make your changes
# 2. Run visual tests (will fail showing diffs)
npm run test:visual

# 3. Review diffs in HTML report (opens automatically)

# 4. If changes are intentional, update baselines:
npm run test:visual:update

# 5. Commit new baselines
git add tests/**/*-snapshots/
git commit -m "Update visual baselines for button redesign"
```

### Component Test Example

```typescript
// tests/components/my-component.spec.ts
import { test, expect } from '@playwright/test';

test('MyComponent renders correctly', async ({ page }) => {
  await page.goto('/test/components');

  const component = page.locator('[data-testid="my-component"]');
  await expect(component).toBeVisible();
  await expect(component).toHaveText('Expected Text');
});

test('MyComponent passes accessibility', async ({ page }) => {
  await page.goto('/test/components');

  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
```

### Component Showcase Pages

Add components to showcase pages for testing:
- `/test/buttons` - Button variants
- `/test/cards` - Card variants
- `/test/components` - All components

See **[PLAYWRIGHT.md](./PLAYWRIGHT.md)** for complete testing guide.

---

## Getting Help

### Resources

- **Architecture:** `docs/development/ARCHITECTURE.md`
- **Testing Guide:** `docs/development/PLAYWRIGHT.md`
- **Form Integrations:** `docs/development/FORM_INTEGRATIONS.md`
- **Content Generation:** `docs/development/CONTENT_GENERATION.md`

### Community

- GitHub Issues: Report bugs or request features
- GitHub Discussions: Ask questions
- Pull Requests: Contribute code

---

## License

By contributing, you agree that your contributions will be licensed under the same license as the project (MIT).