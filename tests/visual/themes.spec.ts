import { test, expect } from '@playwright/test';

test.describe('Visual Regression - Theme Testing', () => {
  test('Buttons - Light Mode', async ({ page }) => {
    await page.goto('/test/buttons');
    await page.waitForLoadState('networkidle');

    // Ensure light mode
    await page.evaluate(() => {
      document.documentElement.classList.remove('dark');
    });

    await expect(page).toHaveScreenshot('buttons-light-mode.png', {
      fullPage: true
    });
  });

  test('Buttons - Dark Mode', async ({ page }) => {
    await page.goto('/test/buttons');
    await page.waitForLoadState('networkidle');

    // Enable dark mode
    await page.evaluate(() => {
      document.documentElement.classList.add('dark');
    });
    await page.waitForTimeout(300);

    await expect(page).toHaveScreenshot('buttons-dark-mode.png', {
      fullPage: true
    });
  });

  test('Cards - Light Mode', async ({ page }) => {
    await page.goto('/test/cards');
    await page.waitForLoadState('networkidle');

    // Ensure light mode
    await page.evaluate(() => {
      document.documentElement.classList.remove('dark');
    });

    await expect(page).toHaveScreenshot('cards-light-mode.png', {
      fullPage: true
    });
  });

  test('Cards - Dark Mode', async ({ page }) => {
    await page.goto('/test/cards');
    await page.waitForLoadState('networkidle');

    // Enable dark mode
    await page.evaluate(() => {
      document.documentElement.classList.add('dark');
    });
    await page.waitForTimeout(300);

    await expect(page).toHaveScreenshot('cards-dark-mode.png', {
      fullPage: true
    });
  });

  test('Component Showcase Index - Light Mode', async ({ page }) => {
    await page.goto('/test');
    await page.waitForLoadState('networkidle');

    await page.evaluate(() => {
      document.documentElement.classList.remove('dark');
    });

    await expect(page).toHaveScreenshot('showcase-light-mode.png', {
      fullPage: true
    });
  });

  test('Component Showcase Index - Dark Mode', async ({ page }) => {
    await page.goto('/test');
    await page.waitForLoadState('networkidle');

    await page.evaluate(() => {
      document.documentElement.classList.add('dark');
    });
    await page.waitForTimeout(300);

    await expect(page).toHaveScreenshot('showcase-dark-mode.png', {
      fullPage: true
    });
  });

  test('Dark Mode - App Marketing Context', async ({ page }) => {
    await page.goto('/test/buttons');
    await page.waitForLoadState('networkidle');

    await page.evaluate(() => {
      document.documentElement.classList.add('dark');
    });
    await page.waitForTimeout(300);

    const appSection = page.locator('#appContext');
    await expect(appSection).toHaveScreenshot('dark-mode-app-context.png');
  });

  test('Dark Mode - Consulting Context', async ({ page }) => {
    await page.goto('/test/buttons');

    // Switch to consulting context
    await page.selectOption('#contextSwitcher', 'consulting');
    await page.waitForTimeout(300);

    // Enable dark mode
    await page.evaluate(() => {
      document.documentElement.classList.add('dark');
    });
    await page.waitForTimeout(300);

    const consultingSection = page.locator('#consultingContext');
    await expect(consultingSection).toHaveScreenshot('dark-mode-consulting-context.png');
  });

  test('Dark Mode Contrast - Primary Buttons', async ({ page }) => {
    await page.goto('/test/buttons');
    await page.waitForLoadState('networkidle');

    await page.evaluate(() => {
      document.documentElement.classList.add('dark');
    });
    await page.waitForTimeout(300);

    // Screenshot primary buttons in dark mode for contrast check
    const primarySection = page.locator('section').first();
    await expect(primarySection).toHaveScreenshot('dark-mode-primary-buttons-contrast.png');
  });

  test('Dark Mode Contrast - Secondary Buttons', async ({ page }) => {
    await page.goto('/test/buttons');
    await page.waitForLoadState('networkidle');

    await page.evaluate(() => {
      document.documentElement.classList.add('dark');
    });
    await page.waitForTimeout(300);

    // Screenshot secondary buttons in dark mode for contrast check
    const secondarySection = page.locator('section').nth(1);
    await expect(secondarySection).toHaveScreenshot('dark-mode-secondary-buttons-contrast.png');
  });

  test('Dark Mode - Card Shadows', async ({ page }) => {
    await page.goto('/test/cards');
    await page.waitForLoadState('networkidle');

    await page.evaluate(() => {
      document.documentElement.classList.add('dark');
    });
    await page.waitForTimeout(300);

    // Check that card shadows are visible in dark mode
    const featureSection = page.locator('section').nth(1);
    await expect(featureSection).toHaveScreenshot('dark-mode-card-shadows.png');
  });

  test('Dark Mode - Testimonial Cards', async ({ page }) => {
    await page.goto('/test/cards');
    await page.waitForLoadState('networkidle');

    await page.evaluate(() => {
      document.documentElement.classList.add('dark');
    });
    await page.waitForTimeout(300);

    // Testimonial cards have special styling
    const testimonialSection = page.locator('section').filter({ hasText: 'Testimonial Variant' }).first();
    await expect(testimonialSection).toHaveScreenshot('dark-mode-testimonials.png');
  });

  test('Theme Transition Smoothness', async ({ page }) => {
    await page.goto('/test/buttons');
    await page.waitForLoadState('networkidle');

    // Start in light mode
    await page.evaluate(() => {
      document.documentElement.classList.remove('dark');
    });
    await page.waitForTimeout(300);

    const section = page.locator('section').first();

    // Capture light mode
    await expect(section).toHaveScreenshot('theme-before-transition.png');

    // Switch to dark mode
    await page.evaluate(() => {
      document.documentElement.classList.add('dark');
    });
    await page.waitForTimeout(500); // Wait for transition

    // Capture dark mode
    await expect(section).toHaveScreenshot('theme-after-transition.png');
  });

  test('System Preference Detection', async ({ page }) => {
    // Test with system preference for dark mode
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto('/test/buttons');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('system-preference-dark.png', {
      fullPage: false,
      clip: { x: 0, y: 0, width: 1280, height: 800 }
    });
  });

  test('System Preference - Light Mode', async ({ page }) => {
    // Test with system preference for light mode
    await page.emulateMedia({ colorScheme: 'light' });
    await page.goto('/test/cards');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('system-preference-light.png', {
      fullPage: false,
      clip: { x: 0, y: 0, width: 1280, height: 800 }
    });
  });

  test('High Contrast Mode Compatibility', async ({ page }) => {
    // Enable forced colors for high contrast testing
    await page.emulateMedia({ forcedColors: 'active' });
    await page.goto('/test/buttons');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('high-contrast-mode.png', {
      fullPage: false,
      clip: { x: 0, y: 0, width: 1280, height: 800 }
    });
  });
});

test.describe('Visual Regression - Color Consistency', () => {
  test('Business Context Colors - App Marketing', async ({ page }) => {
    await page.goto('/test/buttons');
    await page.waitForLoadState('networkidle');

    // Check app marketing primary color consistency
    const appButtons = page.locator('#appContext button').filter({ hasText: 'Medium Button' });

    await expect(appButtons.first()).toHaveScreenshot('app-primary-color.png');
  });

  test('Business Context Colors - Consulting', async ({ page }) => {
    await page.goto('/test/buttons');

    // Switch to consulting
    await page.selectOption('#contextSwitcher', 'consulting');
    await page.waitForTimeout(300);

    // Check consulting primary color consistency
    const consultingButtons = page.locator('#consultingContext button').filter({ hasText: 'Medium Button' });

    await expect(consultingButtons.first()).toHaveScreenshot('consulting-primary-color.png');
  });

  test('Accent Colors Across Components', async ({ page }) => {
    await page.goto('/test/cards');
    await page.waitForLoadState('networkidle');

    // Check feature cards have consistent accent colors
    const featureCards = page.locator('[class*="feature"]').first();
    await expect(featureCards).toHaveScreenshot('accent-colors-consistency.png');
  });
});
