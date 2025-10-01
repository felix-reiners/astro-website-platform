# Playwright Testing Guide

Complete guide to using Playwright for E2E and visual regression testing in the Multi-Template Website Generation Platform.

## Table of Contents

- [Overview](#overview)
- [Quick Start](#quick-start)
- [Test Types](#test-types)
- [Visual Regression Testing](#visual-regression-testing)
- [Component Testing](#component-testing)
- [Generated Site Testing](#generated-site-testing)
- [npm Scripts](#npm-scripts)
- [Writing Tests](#writing-tests)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

---

## Overview

This project uses Playwright for:
- **End-to-End Testing** - User flows and page interactions
- **Visual Regression Testing** - Screenshot comparisons to catch visual bugs
- **Component Testing** - Individual component behavior and styling
- **Cross-Browser Testing** - Chrome, Firefox, Safari
- **Responsive Testing** - Mobile, tablet, desktop viewports
- **Accessibility Testing** - WCAG 2.1 AA compliance with @axe-core/playwright

**Test Structure:**
```
tests/
├── e2e/                    # End-to-end user flows
│   ├── homepage-navigation.spec.ts
│   └── language-switching.spec.ts
├── visual/                 # Visual regression tests
│   ├── components.spec.ts
│   ├── responsive.spec.ts
│   └── themes.spec.ts
├── components/             # Component-level tests
│   └── (to be added)
└── generated-sites/        # Multi-site testing
    └── (to be added)
```

---

## Quick Start

### Run All Tests
```bash
npm test                    # Run unit + E2E tests
npm run test:e2e            # Run all Playwright tests
```

### Interactive Mode (Recommended for Development)
```bash
npm run test:e2e:ui         # Launch Playwright UI mode
npm run test:watch          # Same as above (shorthand)
```

### Visual Tests
```bash
npm run test:visual         # Run visual regression tests
npm run test:visual:ui      # Run with UI mode
npm run test:visual:update  # Update baseline screenshots
```

### Debug Mode
```bash
npm run test:e2e:debug      # Step through tests with debugger
npm run test:e2e:headed     # Run tests in headed mode (see browser)
```

---

## Test Types

### 1. E2E Tests (`tests/e2e/`)

Test complete user workflows:
- Navigation between pages
- Form submissions
- Language switching
- Accessibility compliance

**Example:**
```typescript
import { test, expect } from '@playwright/test';

test('should navigate to about page', async ({ page }) => {
  await page.goto('/');
  await page.click('a[href="/about"]');
  await expect(page).toHaveURL(/.*about.*/);
});
```

### 2. Visual Tests (`tests/visual/`)

Capture and compare screenshots:
- Component variants
- Responsive layouts
- Dark/light themes
- Business contexts

**Example:**
```typescript
test('Buttons - Light Mode', async ({ page }) => {
  await page.goto('/test/buttons');
  await page.waitForLoadState('networkidle');

  await expect(page).toHaveScreenshot('buttons-light.png', {
    fullPage: true
  });
});
```

### 3. Component Tests (`tests/components/`)

Test individual components in isolation:
- Props and variants
- State changes
- User interactions
- Accessibility

### 4. Generated Site Tests (`tests/generated-sites/`)

Test consistency across generated sites:
- FitnessTracker
- ProjectFlow
- StudioBright

---

## Visual Regression Testing

### How It Works

1. **First Run**: Playwright captures baseline screenshots
2. **Subsequent Runs**: New screenshots are compared to baselines
3. **Differences**: Failures show pixel-by-pixel diffs
4. **Update**: Approve changes by updating baselines

### Configuration

Visual testing is configured in `playwright.config.ts`:

```typescript
expect: {
  toHaveScreenshot: {
    maxDiffPixelRatio: 0.01,  // Allow 1% difference
    animations: 'disabled',    // Disable animations
    threshold: 0.2,            // Pixel comparison threshold
  },
}
```

### Component Showcase Pages

Visual tests use dedicated showcase pages at `/test/*`:

- **`/test`** - Index of all showcase pages
- **`/test/buttons`** - All button variants and states
- **`/test/cards`** - All card variants and business contexts

**Visit these pages in your browser:**
```bash
npm run dev
# Open http://localhost:4321/test
```

### Taking Screenshots

```typescript
// Full page
await expect(page).toHaveScreenshot('page-name.png', {
  fullPage: true
});

// Specific element
const button = page.locator('button').first();
await expect(button).toHaveScreenshot('button.png');

// With clip region
await expect(page).toHaveScreenshot('header.png', {
  clip: { x: 0, y: 0, width: 1280, height: 200 }
});
```

### Updating Baselines

When you intentionally change component styles:

```bash
# Update all visual test baselines
npm run test:visual:update

# Update specific test file
npx playwright test tests/visual/components.spec.ts --update-snapshots

# Update specific test
npx playwright test --grep "Buttons - Light Mode" --update-snapshots
```

### Reviewing Differences

When visual tests fail:

1. **HTML Report** opens automatically showing diffs
2. **Review** the expected vs. actual screenshots
3. **Decide**: Bug or intentional change?
4. **Action**:
   - Bug → Fix the code
   - Intentional → Update baseline

---

## Component Testing

### Test Component Showcase Pages

Use `/test/*` pages to visually inspect components:

```bash
npm run dev
# Navigate to http://localhost:4321/test/buttons
```

**Features:**
- Toggle between business contexts
- See all variants and sizes
- Test hover/focus states
- Inspect dark mode

### Writing Component Tests

Focus on:
- All prop combinations
- All variants and sizes
- Business context switching
- Hover/focus/disabled states
- Accessibility (keyboard nav, ARIA labels)

**Example:**
```typescript
test('Button variants render correctly', async ({ page }) => {
  await page.goto('/test/buttons');

  // Test primary variant
  const primaryBtn = page.locator('button').filter({ hasText: 'Primary' });
  await expect(primaryBtn).toBeVisible();
  await expect(primaryBtn).toHaveClass(/bg-blue-600/);

  // Test hover
  await primaryBtn.hover();
  await page.waitForTimeout(200);
  await expect(primaryBtn).toHaveScreenshot('primary-hover.png');
});
```

---

## Generated Site Testing

Test that generated sites maintain quality across different configurations:

```typescript
const sites = ['fitnesstracker', 'projectflow', 'studiobright'];

for (const site of sites) {
  test(`${site} - Homepage loads`, async ({ page }) => {
    // Start the site's dev server on a different port
    await page.goto(`http://localhost:${portMap[site]}/`);

    await expect(page).toHaveTitle(/./);
    await expect(page).toHaveScreenshot(`${site}-homepage.png`);
  });
}
```

---

## npm Scripts

### Testing
```bash
# Run all tests
npm test                         # Unit + E2E
npm run test:e2e                 # All Playwright tests
npm run test:e2e:ui              # Interactive UI mode
npm run test:e2e:headed          # See browser (non-headless)
npm run test:e2e:debug           # Step-through debugger

# Visual regression
npm run test:visual              # Run visual tests
npm run test:visual:ui           # Interactive visual testing
npm run test:visual:update       # Update baseline screenshots

# Component tests
npm run test:components          # Run component tests
npm run test:components:ui       # Interactive component testing

# Generated sites
npm run test:generated-sites     # Test all generated sites

# Watch mode
npm run test:watch               # Auto-run tests on file changes
```

### Development
```bash
npm run dev                      # Start dev server
npm run preview                  # Preview production build
npm run build                    # Build for production
```

---

## Writing Tests

### Test File Structure

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    // Setup: Navigate, disable animations, etc.
    await page.goto('/test/buttons');
  });

  test('should do something', async ({ page }) => {
    // Arrange
    const button = page.locator('button').first();

    // Act
    await button.click();

    // Assert
    await expect(button).toHaveClass(/active/);
  });
});
```

### Best Practices

#### 1. Wait for Stability
```typescript
// ✅ GOOD: Wait for network to settle
await page.waitForLoadState('networkidle');

// ✅ GOOD: Wait for specific element
await page.waitForSelector('.loaded');

// ❌ BAD: Arbitrary timeout
await page.waitForTimeout(5000);
```

#### 2. Use Specific Locators
```typescript
// ✅ GOOD: Semantic locators
page.getByRole('button', { name: 'Submit' })
page.getByLabel('Email address')
page.getByPlaceholder('Enter your name')

// ⚠️ OK: Test IDs
page.locator('[data-testid="submit-button"]')

// ❌ BAD: Brittle selectors
page.locator('.btn.btn-primary.btn-lg')
```

#### 3. Disable Animations for Screenshots
```typescript
test.beforeEach(async ({ page }) => {
  // Disable CSS animations
  await page.addInitScript(() => {
    document.documentElement.style.setProperty('animation-duration', '0s', 'important');
    document.documentElement.style.setProperty('transition-duration', '0s', 'important');
  });
});
```

#### 4. Test Multiple Viewports
```typescript
const breakpoints = [
  { name: 'Mobile', width: 375, height: 667 },
  { name: 'Tablet', width: 768, height: 1024 },
  { name: 'Desktop', width: 1920, height: 1080 }
];

for (const bp of breakpoints) {
  test(`Responsive - ${bp.name}`, async ({ page }) => {
    await page.setViewportSize({ width: bp.width, height: bp.height });
    await page.goto('/test/buttons');

    await expect(page).toHaveScreenshot(`${bp.name.toLowerCase()}.png`);
  });
}
```

#### 5. Test Dark Mode
```typescript
test('Dark mode styling', async ({ page }) => {
  await page.goto('/test/buttons');

  // Enable dark mode
  await page.evaluate(() => {
    document.documentElement.classList.add('dark');
  });
  await page.waitForTimeout(300); // Wait for transitions

  await expect(page).toHaveScreenshot('dark-mode.png');
});
```

---

## Troubleshooting

### Tests Fail Locally but Pass in CI
- **Cause**: Different OS/browser versions
- **Solution**: Use Docker or match CI environment

### Flaky Tests
- **Cause**: Race conditions, animations
- **Solutions**:
  - Use `waitForLoadState('networkidle')`
  - Disable animations
  - Use `waitForSelector()` instead of `waitForTimeout()`
  - Increase test timeout for slow operations

### Screenshots Don't Match
- **Cause**: Font rendering differences, animations
- **Solutions**:
  - Disable animations in test
  - Use `maxDiffPixelRatio` to allow minor differences
  - Generate baselines on same OS as CI

### Tests Timeout
- **Cause**: Slow operations, infinite loading
- **Solutions**:
  - Increase timeout: `test.setTimeout(60000)`
  - Check for hanging network requests
  - Use `waitForLoadState('networkidle')`

### Can't Find Element
- **Cause**: Element not loaded, wrong selector
- **Solutions**:
  - Use `await page.waitForSelector('.element')`
  - Check selector with `await page.locator('.element').count()`
  - Use Playwright Inspector: `npm run test:e2e:debug`

---

## CI/CD Integration

Tests run automatically on:
- **Push to main**
- **Pull requests**

See `.github/workflows/ci.yml` for configuration.

---

## Resources

- [Playwright Docs](https://playwright.dev/)
- [Visual Testing Guide](https://playwright.dev/docs/test-snapshots)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [Debugging Tests](https://playwright.dev/docs/debug)
- [Trace Viewer](https://playwright.dev/docs/trace-viewer)

---

## Quick Reference

```bash
# Most common commands
npm run test:e2e:ui          # Interactive testing (best for dev)
npm run test:visual          # Run visual tests
npm run test:visual:update   # Update screenshots after changes
npm run test:e2e:debug       # Debug failing test
npx playwright codegen       # Generate test code from browser interactions
npx playwright show-report   # View last test report
```

---

**Questions?** Check the [Contributing Guide](./CONTRIBUTING.md) or open an issue.
