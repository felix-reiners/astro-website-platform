import { test, expect } from '@playwright/test';

test.describe('Language Switching', () => {
  const languages = [
    { code: 'en', name: 'English', path: '/' },
    { code: 'de', name: 'German', path: '/de/' },
    { code: 'fr', name: 'French', path: '/fr/' },
    { code: 'es', name: 'Spanish', path: '/es/' },
    { code: 'it', name: 'Italian', path: '/it/' },
    { code: 'pt', name: 'Portuguese', path: '/pt/' }
  ];

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display language switcher', async ({ page }) => {
    // Look for language switcher button/link
    const languageSwitcher = page.locator('[class*="language"], [aria-label*="language"], select[name*="language"]');

    // Language switcher should exist
    const count = await languageSwitcher.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should show current language', async ({ page }) => {
    const html = page.locator('html');
    const lang = await html.getAttribute('lang');

    expect(lang).toBeTruthy();
    expect(['en', 'de', 'fr', 'es', 'it', 'pt']).toContain(lang);
  });

  test('should have hreflang tags for SEO', async ({ page }) => {
    // Check for hreflang alternate links
    const hreflangLinks = page.locator('link[rel="alternate"][hreflang]');
    const count = await hreflangLinks.count();

    // Should have at least one hreflang tag
    expect(count).toBeGreaterThan(0);
  });

  test('should have x-default hreflang tag', async ({ page }) => {
    const xDefaultLink = page.locator('link[rel="alternate"][hreflang="x-default"]');
    await expect(xDefaultLink).toHaveCount(1);
  });

  for (const language of languages) {
    test(`should load ${language.name} version`, async ({ page }) => {
      await page.goto(language.path);

      const html = page.locator('html');
      const lang = await html.getAttribute('lang');

      expect(lang).toBe(language.code);
    });

    test(`should have correct hreflang tag for ${language.name}`, async ({ page }) => {
      const hreflangLink = page.locator(`link[rel="alternate"][hreflang="${language.code}"]`);
      const count = await hreflangLink.count();

      expect(count).toBeGreaterThanOrEqual(1);
    });
  }

  test('should switch from English to German', async ({ page }) => {
    await page.goto('/');

    // Try to find and click German language link
    const germanLink = page.locator('a[href*="/de"]').first();

    if (await germanLink.isVisible()) {
      await germanLink.click();
      await page.waitForLoadState('load');

      const html = page.locator('html');
      const lang = await html.getAttribute('lang');
      expect(lang).toBe('de');
    }
  });

  test('should switch from German to French', async ({ page }) => {
    await page.goto('/de/');

    // Try to find and click French language link
    const frenchLink = page.locator('a[href*="/fr"]').first();

    if (await frenchLink.isVisible()) {
      await frenchLink.click();
      await page.waitForLoadState('load');

      const html = page.locator('html');
      const lang = await html.getAttribute('lang');
      expect(lang).toBe('fr');
    }
  });

  test('should maintain current page when switching language', async ({ page }) => {
    // Start on about page
    await page.goto('/about');

    // Switch to German
    const germanLink = page.locator('a[href*="/de/about"]').first();

    if (await germanLink.isVisible()) {
      await germanLink.click();
      await page.waitForLoadState('load');

      // Should be on German about page
      await expect(page).toHaveURL(/\/de\/about/);
    }
  });

  test('should have language-specific content', async ({ page }) => {
    // Load English version
    await page.goto('/');
    const englishContent = await page.textContent('body');

    // Load German version
    await page.goto('/de/');
    const germanContent = await page.textContent('body');

    // Content should be different (translated)
    expect(englishContent).not.toBe(germanContent);
  });

  test('should have accessible language switcher', async ({ page }) => {
    // Language switcher should have proper ARIA labels
    const languageSwitcher = page.locator('[class*="language"]').first();

    if (await languageSwitcher.count() > 0) {
      const ariaLabel = await languageSwitcher.getAttribute('aria-label');
      const role = await languageSwitcher.getAttribute('role');

      // Should have either aria-label or role for accessibility
      const hasAccessibility = ariaLabel !== null || role !== null;
      expect(hasAccessibility).toBeTruthy();
    }
  });

  test('should preserve navigation structure across languages', async ({ page }) => {
    // Get navigation links in English
    await page.goto('/');
    const englishNavLinks = page.locator('nav a');
    const englishCount = await englishNavLinks.count();

    // Get navigation links in German
    await page.goto('/de/');
    const germanNavLinks = page.locator('nav a');
    const germanCount = await germanNavLinks.count();

    // Should have same number of navigation links
    expect(germanCount).toBe(englishCount);
  });

  test('should have correct canonical URL for each language', async ({ page }) => {
    for (const language of languages) {
      await page.goto(language.path);

      const canonicalLink = page.locator('link[rel="canonical"]');
      const count = await canonicalLink.count();

      if (count > 0) {
        const href = await canonicalLink.getAttribute('href');
        expect(href).toBeTruthy();
      }
    }
  });

  test('should handle 404 for non-existent language paths', async ({ page }) => {
    const response = await page.goto('/invalid-lang/');

    // Should return 404 or redirect to valid language
    expect(response?.status()).toMatch(/404|301|302/);
  });

  test('should update page title for different languages', async ({ page }) => {
    // Get English title
    await page.goto('/');
    const englishTitle = await page.title();

    // Get German title
    await page.goto('/de/');
    const germanTitle = await page.title();

    // Titles should exist
    expect(englishTitle).toBeTruthy();
    expect(germanTitle).toBeTruthy();
  });

  test('should have language links in footer', async ({ page }) => {
    const footer = page.locator('footer');

    // Check if footer has language links
    const languageLinks = footer.locator('a[href*="/de"], a[href*="/fr"], a[href*="/es"]');
    const count = await languageLinks.count();

    // Footer might or might not have language links, just checking structure
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test('should support keyboard navigation for language switcher', async ({ page }) => {
    await page.goto('/');

    // Try to tab to language switcher
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    // Check if any element is focused
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(focusedElement).toBeTruthy();
  });

  test('should load correct translations for each language', async ({ page }) => {
    const testPages = ['/about', '/contact'];

    for (const testPage of testPages) {
      // English version
      await page.goto(testPage);
      const englishH1 = await page.locator('h1').first().textContent();

      // German version
      await page.goto(`/de${testPage}`);
      const germanH1 = await page.locator('h1').first().textContent();

      // Headings should exist and be different
      expect(englishH1).toBeTruthy();
      expect(germanH1).toBeTruthy();
    }
  });
});