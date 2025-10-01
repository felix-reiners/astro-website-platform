import { test, expect, devices } from '@playwright/test';

test.describe('Visual Regression - Responsive Design', () => {
  const breakpoints = [
    { name: 'Mobile', width: 375, height: 667 },   // iPhone SE
    { name: 'Tablet', width: 768, height: 1024 },  // iPad
    { name: 'Laptop', width: 1280, height: 720 },  // Laptop
    { name: 'Desktop', width: 1920, height: 1080 } // Full HD
  ];

  for (const breakpoint of breakpoints) {
    test(`Buttons Page - ${breakpoint.name} (${breakpoint.width}x${breakpoint.height})`, async ({ page }) => {
      await page.setViewportSize({ width: breakpoint.width, height: breakpoint.height });
      await page.goto('/test/buttons');
      await page.waitForLoadState('networkidle');

      await expect(page).toHaveScreenshot(`buttons-${breakpoint.name.toLowerCase()}.png`, {
        fullPage: true
      });
    });

    test(`Cards Page - ${breakpoint.name} (${breakpoint.width}x${breakpoint.height})`, async ({ page }) => {
      await page.setViewportSize({ width: breakpoint.width, height: breakpoint.height });
      await page.goto('/test/cards');
      await page.waitForLoadState('networkidle');

      await expect(page).toHaveScreenshot(`cards-${breakpoint.name.toLowerCase()}.png`, {
        fullPage: true
      });
    });

    test(`Component Showcase - ${breakpoint.name} (${breakpoint.width}x${breakpoint.height})`, async ({ page }) => {
      await page.setViewportSize({ width: breakpoint.width, height: breakpoint.height });
      await page.goto('/test');
      await page.waitForLoadState('networkidle');

      await expect(page).toHaveScreenshot(`showcase-${breakpoint.name.toLowerCase()}.png`, {
        fullPage: true
      });
    });
  }

  test('Mobile Menu Behavior', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/test/buttons');
    await page.waitForLoadState('networkidle');

    // Check if context switcher is responsive
    const contextSwitcher = page.locator('#contextSwitcher');
    await expect(contextSwitcher).toBeVisible();

    await expect(page).toHaveScreenshot('mobile-context-switcher.png');
  });

  test('Tablet Portrait vs Landscape', async ({ page }) => {
    // Portrait
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/test/cards');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('tablet-portrait.png', {
      fullPage: false,
      clip: { x: 0, y: 0, width: 768, height: 800 }
    });

    // Landscape
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.goto('/test/cards');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('tablet-landscape.png', {
      fullPage: false,
      clip: { x: 0, y: 0, width: 1024, height: 768 }
    });
  });

  test('Grid Breakpoints - Cards', async ({ page }) => {
    await page.goto('/test/cards');
    await page.waitForLoadState('networkidle');

    // Mobile: 1 column
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(300);
    const mobileGrid = page.locator('section').first();
    await expect(mobileGrid).toHaveScreenshot('grid-mobile-1col.png');

    // Tablet: 2 columns
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForTimeout(300);
    const tabletGrid = page.locator('section').first();
    await expect(tabletGrid).toHaveScreenshot('grid-tablet-2col.png');

    // Desktop: 3 columns
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.waitForTimeout(300);
    const desktopGrid = page.locator('section').first();
    await expect(desktopGrid).toHaveScreenshot('grid-desktop-3col.png');
  });

  test('Button Stacking on Mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/test/buttons');
    await page.waitForLoadState('networkidle');

    // Check how buttons stack on mobile
    const buttonSection = page.locator('section').first();
    await expect(buttonSection).toHaveScreenshot('buttons-mobile-stacking.png');
  });

  test('Horizontal Scrolling Check', async ({ page }) => {
    // Test that content doesn't cause horizontal scroll on small screens
    await page.setViewportSize({ width: 320, height: 568 }); // iPhone SE (smallest)
    await page.goto('/test/cards');
    await page.waitForLoadState('networkidle');

    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const windowWidth = await page.evaluate(() => window.innerWidth);

    // Should not have horizontal scroll
    expect(bodyWidth).toBeLessThanOrEqual(windowWidth + 1); // +1 for rounding
  });
});

test.describe('Visual Regression - Real Device Emulation', () => {
  test('iPhone 12', async ({ browser }) => {
    const context = await browser.newContext({
      ...devices['iPhone 12']
    });
    const page = await context.newPage();

    await page.goto('/test/buttons');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('device-iphone12.png', {
      fullPage: true
    });

    await context.close();
  });

  test('Pixel 5', async ({ browser }) => {
    const context = await browser.newContext({
      ...devices['Pixel 5']
    });
    const page = await context.newPage();

    await page.goto('/test/cards');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('device-pixel5.png', {
      fullPage: true
    });

    await context.close();
  });

  test('iPad Pro', async ({ browser }) => {
    const context = await browser.newContext({
      ...devices['iPad Pro']
    });
    const page = await context.newPage();

    await page.goto('/test');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('device-ipad-pro.png', {
      fullPage: true
    });

    await context.close();
  });
});
