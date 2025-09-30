import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Homepage Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load homepage successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/.*/, { timeout: 10000 });
    await expect(page.locator('body')).toBeVisible();
  });

  test('should display navigation menu', async ({ page }) => {
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
  });

  test('should have working navigation links', async ({ page }) => {
    // Test About link
    const aboutLink = page.locator('nav a[href*="about"]').first();
    if (await aboutLink.isVisible()) {
      await aboutLink.click();
      await expect(page).toHaveURL(/.*about.*/);
    }
  });

  test('should navigate to contact page', async ({ page }) => {
    const contactLink = page.locator('nav a[href*="contact"]').first();
    if (await contactLink.isVisible()) {
      await contactLink.click();
      await expect(page).toHaveURL(/.*contact.*/);
    }
  });

  test('should have accessible navigation', async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page })
      .include('nav')
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should display hero section', async ({ page }) => {
    // Look for common hero section patterns
    const hero = page.locator('section').first();
    await expect(hero).toBeVisible();
  });

  test('should have footer with links', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();

    const footerLinks = footer.locator('a');
    const count = await footerLinks.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone size

    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
  });

  test('should have working buttons', async ({ page }) => {
    const buttons = page.locator('button, a.button, a[class*="button"], a[class*="btn"]');
    const count = await buttons.count();

    if (count > 0) {
      const firstButton = buttons.first();
      await expect(firstButton).toBeVisible();
    }
  });

  test('should pass accessibility checks on homepage', async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should have proper meta tags', async ({ page }) => {
    // Check for essential meta tags
    const description = page.locator('meta[name="description"]');
    await expect(description).toHaveCount(1);

    const viewport = page.locator('meta[name="viewport"]');
    await expect(viewport).toHaveCount(1);
  });

  test('should load without console errors', async ({ page }) => {
    const errors: string[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Filter out known acceptable errors (like external resource loading failures)
    const criticalErrors = errors.filter(err =>
      !err.includes('favicon') &&
      !err.includes('external')
    );

    expect(criticalErrors).toHaveLength(0);
  });

  test('should have correct language attribute', async ({ page }) => {
    const html = page.locator('html');
    const lang = await html.getAttribute('lang');

    expect(lang).toBeTruthy();
    expect(['en', 'de', 'fr', 'es', 'it', 'pt']).toContain(lang);
  });

  test('should navigate back to homepage from other pages', async ({ page }) => {
    // Go to about page
    const aboutLink = page.locator('nav a[href*="about"]').first();
    if (await aboutLink.isVisible()) {
      await aboutLink.click();

      // Click logo or home link to return
      const homeLink = page.locator('nav a[href="/"], nav a[href*="index"]').first();
      if (await homeLink.isVisible()) {
        await homeLink.click();
        await expect(page).toHaveURL(/^\/$|\/index/);
      }
    }
  });

  test('should handle smooth scrolling to sections', async ({ page }) => {
    // Look for anchor links
    const anchorLinks = page.locator('a[href^="#"]');
    const count = await anchorLinks.count();

    if (count > 0) {
      const firstAnchor = anchorLinks.first();
      const href = await firstAnchor.getAttribute('href');

      if (href && href !== '#') {
        await firstAnchor.click();
        await page.waitForTimeout(500); // Wait for smooth scroll

        // Check if the target section exists
        const targetSection = page.locator(href);
        if (await targetSection.count() > 0) {
          await expect(targetSection).toBeInViewport();
        }
      }
    }
  });
});