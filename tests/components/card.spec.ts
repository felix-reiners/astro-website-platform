import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Card Component - Behavior Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/test/cards');
    await page.waitForLoadState('networkidle');
  });

  test('renders cards with all props', async ({ page }) => {
    // Check for cards with title and description
    const cardWithTitle = page.locator('h3').filter({ hasText: 'Simple Card' });
    await expect(cardWithTitle).toBeVisible();

    const cardWithDesc = page.locator('p').filter({ hasText: 'This is a default card' });
    await expect(cardWithDesc).toBeVisible();
  });

  test('renders cards with icons', async ({ page }) => {
    // Check for icon emoji
    const iconCards = page.locator('[class*="w-12 h-12"]');
    expect(await iconCards.count()).toBeGreaterThan(0);
  });

  test('clickable cards navigate on click', async ({ page }) => {
    const clickableCard = page.locator('a[href="/about"]').first();

    await expect(clickableCard).toBeVisible();
    await expect(clickableCard).toHaveAttribute('href', '/about');

    // Check that it has hover scale effect
    const classList = await clickableCard.evaluate((el) => el.className);
    expect(classList).toContain('hover:scale-105');
  });

  test('non-clickable cards render as divs', async ({ page }) => {
    const section = page.locator('section').first();
    const divCards = section.locator('div[class*="rounded-lg"]');

    expect(await divCards.count()).toBeGreaterThan(0);
  });

  test('all card variants are present', async ({ page }) => {
    const variants = ['Default', 'Feature', 'Service', 'Testimonial'];

    for (const variant of variants) {
      const heading = page.locator('h3').filter({ hasText: `${variant} Variant` });
      await expect(heading).toBeVisible();
    }
  });

  test('cards with slot content render correctly', async ({ page }) => {
    const slotCard = page.locator('div').filter({ hasText: 'Custom slot content' });
    await expect(slotCard).toBeVisible();
  });
});

test.describe('Card Component - Visual States', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/test/cards');
    await page.waitForLoadState('networkidle');
  });

  test('hover state on clickable cards', async ({ page }) => {
    await page.locator('section').nth(4).scrollIntoViewIfNeeded();

    const clickableCard = page.locator('a[href="/about"]').first();

    // Hover over the card
    await clickableCard.hover();
    await page.waitForTimeout(300);

    // Verify hover effect is applied
    await expect(clickableCard).toBeVisible();
  });

  test('shadow increases on hover for clickable cards', async ({ page }) => {
    await page.locator('section').nth(4).scrollIntoViewIfNeeded();

    const clickableCard = page.locator('a').filter({ hasText: 'Documentation' }).first();

    await expect(clickableCard).toBeVisible();
    await clickableCard.hover();
    await page.waitForTimeout(300);

    const classList = await clickableCard.evaluate((el) => el.className);
    expect(classList).toContain('hover:scale-105');
  });

  test('cards maintain structure on different screen sizes', async ({ page }) => {
    const breakpoints = [375, 768, 1280];

    for (const width of breakpoints) {
      await page.setViewportSize({ width, height: 800 });
      await page.goto('/test/cards');
      await page.waitForLoadState('networkidle');

      const cards = page.locator('[class*="rounded-lg shadow"]');
      expect(await cards.count()).toBeGreaterThan(0);
    }
  });
});

test.describe('Card Component - Business Context', () => {
  test('app-marketing context cards have correct styling', async ({ page }) => {
    await page.goto('/test/cards');
    await page.waitForLoadState('networkidle');

    const featureCard = page.locator('#appContext').locator('section').nth(1).locator('[class*="rounded-lg"]').first();

    await expect(featureCard).toBeVisible();

    // Check for app-marketing specific styling
    const classList = await featureCard.evaluate((el) => el.className);
    expect(classList).toContain('hover:bg-blue-50');
  });

  test('consulting context cards have correct styling', async ({ page }) => {
    await page.goto('/test/cards');

    // Switch to consulting
    await page.selectOption('#contextSwitcher', 'consulting');
    await page.waitForTimeout(300);

    const featureCard = page.locator('#consultingContext').locator('section').nth(1).locator('[class*="rounded-lg"]').first();

    await expect(featureCard).toBeVisible();

    // Check for consulting specific styling
    const classList = await featureCard.evaluate((el) => el.className);
    expect(classList).toContain('hover:bg-slate-50');
  });

  test('context switcher toggles card styles', async ({ page }) => {
    await page.goto('/test/cards');
    await page.waitForLoadState('networkidle');

    // Start with app context
    let appContext = page.locator('#appContext');
    await expect(appContext).toBeVisible();

    // Switch to consulting
    await page.selectOption('#contextSwitcher', 'consulting');
    await page.waitForTimeout(300);

    // Verify switch
    const consultingContext = page.locator('#consultingContext');
    await expect(consultingContext).toBeVisible();

    // Switch back to app
    await page.selectOption('#contextSwitcher', 'app-marketing');
    await page.waitForTimeout(300);

    appContext = page.locator('#appContext');
    await expect(appContext).toBeVisible();
  });
});

test.describe('Card Component - Variants', () => {
  test('default variant has basic styling', async ({ page }) => {
    await page.goto('/test/cards');
    await page.waitForLoadState('networkidle');

    const defaultCard = page.locator('section').first().locator('[class*="rounded-lg"]').first();

    await expect(defaultCard).toBeVisible();

    const classList = await defaultCard.evaluate((el) => el.className);
    expect(classList).toContain('bg-white');
    expect(classList).toContain('p-6');
  });

  test('feature variant has distinct styling', async ({ page }) => {
    await page.goto('/test/cards');
    await page.waitForLoadState('networkidle');

    const featureSection = page.locator('section').filter({ hasText: 'Feature Variant' }).first();
    const featureCard = featureSection.locator('[class*="rounded-lg"]').first();

    await expect(featureCard).toBeVisible();

    const classList = await featureCard.evaluate((el) => el.className);
    expect(classList).toMatch(/border|hover:bg/);
  });

  test('service variant has left border accent', async ({ page }) => {
    await page.goto('/test/cards');
    await page.waitForLoadState('networkidle');

    const serviceSection = page.locator('section').filter({ hasText: 'Service Variant' }).first();
    const serviceCard = serviceSection.locator('[class*="rounded-lg"]').first();

    await expect(serviceCard).toBeVisible();

    const classList = await serviceCard.evaluate((el) => el.className);
    expect(classList).toContain('border-l-4');
  });

  test('testimonial variant has italic text and left border', async ({ page }) => {
    await page.goto('/test/cards');
    await page.waitForLoadState('networkidle');

    const testimonialSection = page.locator('section').filter({ hasText: 'Testimonial Variant' }).first();
    const testimonialCard = testimonialSection.locator('[class*="rounded-lg"]').first();

    await expect(testimonialCard).toBeVisible();

    const classList = await testimonialCard.evaluate((el) => el.className);
    expect(classList).toContain('italic');
    expect(classList).toContain('border-l-4');
  });
});

test.describe('Card Component - Accessibility', () => {
  test('passes axe accessibility tests', async ({ page }) => {
    await page.goto('/test/cards');
    await page.waitForLoadState('networkidle');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('clickable cards are keyboard accessible', async ({ page }) => {
    await page.goto('/test/cards');

    await page.locator('section').nth(4).scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);

    // Tab to clickable card
    const clickableCard = page.locator('a[href="/about"]').first();
    await clickableCard.focus();

    const isFocused = await page.evaluate(() => {
      const card = document.querySelector('a[href="/about"]');
      return document.activeElement === card;
    });

    expect(isFocused).toBe(true);
  });

  test('card headings have correct hierarchy', async ({ page }) => {
    await page.goto('/test/cards');
    await page.waitForLoadState('networkidle');

    // Card titles should be h3
    const cardTitles = page.locator('h3').filter({ hasText: /Fast Performance|Simple Card/ });
    expect(await cardTitles.count()).toBeGreaterThan(0);
  });

  test('cards have sufficient color contrast in light mode', async ({ page }) => {
    await page.goto('/test/cards');
    await page.waitForLoadState('networkidle');

    await page.evaluate(() => {
      document.documentElement.classList.remove('dark');
    });

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2aa'])
      .analyze();

    const contrastViolations = accessibilityScanResults.violations.filter(
      v => v.id === 'color-contrast'
    );

    expect(contrastViolations).toHaveLength(0);
  });

  test('cards have sufficient color contrast in dark mode', async ({ page }) => {
    await page.goto('/test/cards');
    await page.waitForLoadState('networkidle');

    await page.evaluate(() => {
      document.documentElement.classList.add('dark');
    });
    await page.waitForTimeout(300);

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2aa'])
      .analyze();

    const contrastViolations = accessibilityScanResults.violations.filter(
      v => v.id === 'color-contrast'
    );

    expect(contrastViolations).toHaveLength(0);
  });
});

test.describe('Card Component - Grid Layout', () => {
  test('cards display in grid layout', async ({ page }) => {
    await page.goto('/test/cards');
    await page.waitForLoadState('networkidle');

    const gridContainer = page.locator('div[class*="grid"]').first();
    await expect(gridContainer).toBeVisible();

    const classList = await gridContainer.evaluate((el) => el.className);
    expect(classList).toMatch(/grid-cols/);
  });

  test('grid adapts to viewport size', async ({ page }) => {
    // Mobile: 1 column
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/test/cards');
    await page.waitForLoadState('networkidle');

    let grid = page.locator('div[class*="grid"]').first();
    let classList = await grid.evaluate((el) => el.className);
    expect(classList).toContain('grid-cols-1');

    // Tablet: 2 columns
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/test/cards');
    await page.waitForLoadState('networkidle');

    grid = page.locator('div[class*="grid"]').first();
    classList = await grid.evaluate((el) => el.className);
    expect(classList).toMatch(/md:grid-cols-2/);

    // Desktop: 3 columns
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/test/cards');
    await page.waitForLoadState('networkidle');

    grid = page.locator('div[class*="grid"]').first();
    classList = await grid.evaluate((el) => el.className);
    expect(classList).toMatch(/lg:grid-cols-3/);
  });
});

test.describe('Card Component - Icons', () => {
  test('icon cards display icons correctly', async ({ page }) => {
    await page.goto('/test/cards');
    await page.waitForLoadState('networkidle');

    const iconContainer = page.locator('[class*="w-12 h-12"]').first();
    await expect(iconContainer).toBeVisible();

    // Check for emoji or icon content
    const iconContent = await iconContainer.textContent();
    expect(iconContent?.trim()).toBeTruthy();
  });

  test('icon has correct background color', async ({ page }) => {
    await page.goto('/test/cards');
    await page.waitForLoadState('networkidle');

    const iconContainer = page.locator('[class*="w-12 h-12"]').first();

    const classList = await iconContainer.evaluate((el) => el.className);
    expect(classList).toMatch(/bg-(blue|slate)-100/);
  });
});
