import { test, expect } from '@playwright/test';

test.describe('Visual Regression - Components', () => {
  test.beforeEach(async ({ page }) => {
    // Disable animations for consistent screenshots
    await page.addInitScript(() => {
      document.documentElement.style.setProperty('scroll-behavior', 'auto');
    });
  });

  test('Buttons - App Marketing Context', async ({ page }) => {
    await page.goto('/test/buttons');

    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');

    // Take screenshot of app marketing buttons
    const appSection = page.locator('#appContext');
    await expect(appSection).toHaveScreenshot('buttons-app-marketing.png');
  });

  test('Buttons - Consulting Context', async ({ page }) => {
    await page.goto('/test/buttons');

    // Switch to consulting context
    await page.selectOption('#contextSwitcher', 'consulting');
    await page.waitForTimeout(500); // Wait for transition

    // Take screenshot of consulting buttons
    const consultingSection = page.locator('#consultingContext');
    await expect(consultingSection).toHaveScreenshot('buttons-consulting.png');
  });

  test('Buttons - All Variants and Sizes', async ({ page }) => {
    await page.goto('/test/buttons');
    await page.waitForLoadState('networkidle');

    // Screenshot each button section
    const sections = await page.locator('section').all();
    for (let i = 0; i < sections.length; i++) {
      await expect(sections[i]).toHaveScreenshot(`buttons-section-${i}.png`);
    }
  });

  test('Cards - App Marketing Context', async ({ page }) => {
    await page.goto('/test/cards');
    await page.waitForLoadState('networkidle');

    // Take screenshot of app marketing cards
    const appSection = page.locator('#appContext');
    await expect(appSection).toHaveScreenshot('cards-app-marketing.png');
  });

  test('Cards - Consulting Context', async ({ page }) => {
    await page.goto('/test/cards');

    // Switch to consulting context
    await page.selectOption('#contextSwitcher', 'consulting');
    await page.waitForTimeout(500);

    // Take screenshot of consulting cards
    const consultingSection = page.locator('#consultingContext');
    await expect(consultingSection).toHaveScreenshot('cards-consulting.png');
  });

  test('Cards - Default Variant', async ({ page }) => {
    await page.goto('/test/cards');
    await page.waitForLoadState('networkidle');

    // Find the default variant section
    const defaultSection = page.locator('section').first();
    await expect(defaultSection).toHaveScreenshot('cards-default-variant.png');
  });

  test('Cards - Feature Variant', async ({ page }) => {
    await page.goto('/test/cards');
    await page.waitForLoadState('networkidle');

    // Find the feature variant section
    const featureSection = page.locator('section').nth(1);
    await expect(featureSection).toHaveScreenshot('cards-feature-variant.png');
  });

  test('Cards - Service Variant', async ({ page }) => {
    await page.goto('/test/cards');
    await page.waitForLoadState('networkidle');

    // Find the service variant section
    const serviceSection = page.locator('section').nth(2);
    await expect(serviceSection).toHaveScreenshot('cards-service-variant.png');
  });

  test('Cards - Testimonial Variant', async ({ page }) => {
    await page.goto('/test/cards');
    await page.waitForLoadState('networkidle');

    // Find the testimonial variant section
    const testimonialSection = page.locator('section').nth(3);
    await expect(testimonialSection).toHaveScreenshot('cards-testimonial-variant.png');
  });

  test('Button Hover States - App Marketing', async ({ page }) => {
    await page.goto('/test/buttons');
    await page.waitForLoadState('networkidle');

    // Test hover state on primary button
    const primaryButton = page.locator('button').filter({ hasText: 'Medium Button' }).first();
    await primaryButton.hover();
    await page.waitForTimeout(200); // Wait for hover transition

    const section = primaryButton.locator('..').locator('..');
    await expect(section).toHaveScreenshot('button-primary-hover.png');
  });

  test('Button Focus States', async ({ page }) => {
    await page.goto('/test/buttons');
    await page.waitForLoadState('networkidle');

    // Focus on a button
    const button = page.locator('button').first();
    await button.focus();
    await page.waitForTimeout(200);

    const section = button.locator('..').locator('..');
    await expect(section).toHaveScreenshot('button-focused.png');
  });

  test('Card Hover State - Clickable', async ({ page }) => {
    await page.goto('/test/cards');
    await page.waitForLoadState('networkidle');

    // Scroll to clickable cards section
    await page.locator('section').nth(4).scrollIntoViewIfNeeded();

    // Hover over a clickable card
    const clickableCard = page.locator('a[href="/about"]').first();
    await clickableCard.hover();
    await page.waitForTimeout(300); // Wait for hover animation

    const section = clickableCard.locator('..').locator('..');
    await expect(section).toHaveScreenshot('card-clickable-hover.png');
  });

  test('Component Showcase Index', async ({ page }) => {
    await page.goto('/test');
    await page.waitForLoadState('networkidle');

    // Screenshot the index page
    await expect(page).toHaveScreenshot('component-showcase-index.png', {
      fullPage: true
    });
  });
});

test.describe('Visual Regression - Component States', () => {
  test('Disabled Button States', async ({ page }) => {
    await page.goto('/test/buttons');
    await page.waitForLoadState('networkidle');

    // Find all disabled buttons
    const disabledButtons = page.locator('button[disabled]');
    const count = await disabledButtons.count();

    expect(count).toBeGreaterThan(0);

    // Screenshot section with disabled buttons
    const disabledButton = disabledButtons.first();
    const section = disabledButton.locator('..').locator('..');
    await expect(section).toHaveScreenshot('buttons-disabled-state.png');
  });

  test('Link Buttons', async ({ page }) => {
    await page.goto('/test/buttons');
    await page.waitForLoadState('networkidle');

    // Scroll to link buttons section
    const linkSection = page.locator('section').filter({ hasText: 'As Links' }).first();
    await linkSection.scrollIntoViewIfNeeded();

    await expect(linkSection).toHaveScreenshot('buttons-as-links.png');
  });
});
