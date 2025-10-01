# Test Suite

Comprehensive testing suite for the Multi-Template Website Generation Platform using Playwright.

## Directory Structure

```
tests/
├── e2e/                    # End-to-end user flow tests
│   ├── homepage-navigation.spec.ts
│   └── language-switching.spec.ts
├── visual/                 # Visual regression tests
│   ├── components.spec.ts
│   ├── responsive.spec.ts
│   └── themes.spec.ts
├── components/             # Component-level behavior tests
│   ├── button.spec.ts
│   └── card.spec.ts
├── generated-sites/        # Multi-site consistency tests
│   └── multi-site.spec.ts
└── README.md              # This file
```

## Test Types

### 🎯 **E2E Tests** (`e2e/`)
Test complete user workflows and page interactions:
- Navigation flows
- Form submissions
- Language switching
- Accessibility compliance
- Page loads and performance

**Run:** `npm run test:e2e`

### 🎨 **Visual Tests** (`visual/`)
Screenshot-based regression testing:
- Component variants and states
- Responsive layouts (mobile, tablet, desktop)
- Light/dark mode consistency
- Business context styling (app vs consulting)

**Run:** `npm run test:visual`

**Update baselines:** `npm run test:visual:update`

### 🧩 **Component Tests** (`components/`)
Detailed component behavior testing:
- Props and variants
- User interactions (click, hover, focus)
- State changes
- Accessibility (keyboard nav, ARIA)
- Business context switching

**Run:** `npm run test:components`

### 🌐 **Generated Site Tests** (`generated-sites/`)
Consistency testing across generated sites:
- FitnessTracker (port 4321)
- ProjectFlow (port 4322)
- StudioBright (port 4323)

Tests verify:
- Core functionality across all sites
- Visual consistency
- Business type styling
- Accessibility compliance
- Performance standards

**Run:** `npm run test:generated-sites`

**Note:** Make sure generated sites are running before executing these tests.

## Quick Start

### Run All Tests
```bash
npm test                    # Unit + E2E + Visual + Component tests
```

### Interactive Mode (Recommended for Development)
```bash
npm run test:e2e:ui         # Launch Playwright UI
npm run test:visual:ui      # Visual tests in UI mode
npm run test:components:ui  # Component tests in UI mode
```

### Debug Mode
```bash
npm run test:e2e:debug      # Step through tests
npm run test:e2e:headed     # See browser while testing
```

## Visual Regression Workflow

### 1. First Run - Generate Baselines
```bash
npm run test:visual
```
On first run, Playwright creates baseline screenshots in `tests/**/*-snapshots/`.

### 2. Make Changes
Edit components in `src/components/ui/`.

### 3. Re-run Tests
```bash
npm run test:visual
```
Tests will fail if screenshots differ from baselines.

### 4. Review Differences
- HTML report opens automatically
- Shows side-by-side comparison of expected vs. actual
- Highlights pixel differences

### 5. Update Baselines (if intentional)
```bash
npm run test:visual:update
```
This replaces baseline screenshots with new ones.

### 6. Commit New Baselines
```bash
git add tests/**/*-snapshots/
git commit -m "Update visual baselines after button redesign"
```

## Component Showcase Pages

Visual tests use dedicated showcase pages for isolated testing:

- **http://localhost:4321/test** - Index of all showcases
- **http://localhost:4321/test/buttons** - All button variants
- **http://localhost:4321/test/cards** - All card variants

**Features:**
- Business context switcher (app-marketing vs consulting)
- All component variants in one place
- Perfect for manual inspection and automated testing

## Writing Tests

### E2E Test Example
```typescript
import { test, expect } from '@playwright/test';

test('navigates to about page', async ({ page }) => {
  await page.goto('/');
  await page.click('a[href="/about"]');
  await expect(page).toHaveURL(/.*about.*/);
});
```

### Visual Test Example
```typescript
test('Button - Light Mode', async ({ page }) => {
  await page.goto('/test/buttons');
  await page.waitForLoadState('networkidle');

  await expect(page).toHaveScreenshot('buttons-light.png', {
    fullPage: true
  });
});
```

### Component Test Example
```typescript
test('button handles click events', async ({ page }) => {
  await page.goto('/test/buttons');

  const button = page.locator('button').first();
  await button.click();

  await expect(button).toHaveClass(/active/);
});
```

## CI/CD Integration

Tests run automatically on:
- **Push to main**
- **Pull requests**

GitHub Actions workflow:
1. Runs unit tests
2. Builds project
3. Runs E2E tests
4. Runs visual regression tests
5. Runs component tests
6. Uploads test reports, screenshots, and videos as artifacts
7. Comments on PR with test results

**Artifacts available for 30 days:**
- HTML test report
- Screenshots (baseline and failures)
- Videos (failures only)

## Best Practices

### ✅ DO
- Write tests for new components
- Update visual baselines when you change styles intentionally
- Use semantic locators (`getByRole`, `getByLabel`)
- Wait for network idle before taking screenshots
- Test accessibility with every component
- Test multiple viewports (mobile, tablet, desktop)

### ❌ DON'T
- Commit test-results/ directory
- Use arbitrary `waitForTimeout()` (use `waitForSelector()` instead)
- Use brittle CSS selectors (use test IDs or semantic selectors)
- Skip visual tests when changing styles
- Forget to test dark mode

## Troubleshooting

### Tests Fail Locally but Pass in CI
**Cause:** Different OS/browser versions
**Solution:** Generate baselines in CI or use Docker

### Visual Tests Always Fail
**Cause:** Font rendering differences, animations
**Solutions:**
- Disable animations: Already configured in test setup
- Adjust `maxDiffPixelRatio` in `playwright.config.ts`
- Run on same OS as CI (Ubuntu)

### Generated Site Tests Fail
**Cause:** Sites not running on expected ports
**Solution:** Start all sites:
```bash
cd generated-sites/fitnesstracker && npm run dev -- --port 4321 &
cd generated-sites/projectflow && npm run dev -- --port 4322 &
cd generated-sites/studiobright && npm run dev -- --port 4323 &
```

### Tests Timeout
**Cause:** Slow operations, network delays
**Solutions:**
- Increase timeout: `test.setTimeout(60000)`
- Use `waitForLoadState('networkidle')`
- Check network tab for hanging requests

## Resources

- **[Playwright Documentation](https://playwright.dev/)**
- **[PLAYWRIGHT.md](../docs/development/PLAYWRIGHT.md)** - Detailed guide
- **[Visual Testing Guide](https://playwright.dev/docs/test-snapshots)**
- **[Best Practices](https://playwright.dev/docs/best-practices)**

## Quick Commands Reference

```bash
# Run tests
npm run test:e2e              # E2E tests
npm run test:visual           # Visual tests
npm run test:components       # Component tests
npm run test:generated-sites  # Multi-site tests

# Interactive/Debug
npm run test:e2e:ui           # UI mode
npm run test:e2e:debug        # Debugger
npm run test:e2e:headed       # See browser

# Visual regression
npm run test:visual:update    # Update baselines
npm run test:visual:ui        # Interactive visual testing

# View results
npx playwright show-report    # Open last report
```

---

**Need help?** See [PLAYWRIGHT.md](../docs/development/PLAYWRIGHT.md) or [CONTRIBUTING.md](../docs/development/CONTRIBUTING.md)
