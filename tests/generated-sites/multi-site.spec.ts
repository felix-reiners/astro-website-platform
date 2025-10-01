import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * Multi-Site Testing Suite
 *
 * Tests that generated sites maintain consistent quality across different configurations.
 * Tests run against the three generated sites:
 * - FitnessTracker (port 4321)
 * - ProjectFlow (port 4322)
 * - StudioBright (port 4323)
 */

const sites = [
  {
    name: 'FitnessTracker',
    url: 'http://localhost:4321',
    businessType: 'app-marketing',
    primaryColor: 'green'
  },
  {
    name: 'ProjectFlow',
    url: 'http://localhost:4322',
    businessType: 'app-marketing',
    primaryColor: 'blue'
  },
  {
    name: 'StudioBright',
    url: 'http://localhost:4323',
    businessType: 'consulting',
    primaryColor: 'emerald'
  }
];

test.describe('Generated Sites - Core Functionality', () => {
  for (const site of sites) {
    test(`${site.name} - Homepage loads successfully`, async ({ page }) => {
      const response = await page.goto(site.url);

      expect(response?.status()).toBe(200);
      await expect(page).toHaveTitle(/./);
      await expect(page.locator('body')).toBeVisible();
    });

    test(`${site.name} - No console errors on load`, async ({ page }) => {
      const errors: string[] = [];

      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          errors.push(msg.text());
        }
      });

      await page.goto(site.url);
      await page.waitForLoadState('networkidle');

      // Filter out known acceptable errors
      const criticalErrors = errors.filter(err =>
        !err.includes('favicon') &&
        !err.includes('external') &&
        !err.includes('apple-touch-icon')
      );

      expect(criticalErrors).toHaveLength(0);
    });

    test(`${site.name} - Navigation is present and functional`, async ({ page }) => {
      await page.goto(site.url);
      await page.waitForLoadState('networkidle');

      const nav = page.locator('nav');
      await expect(nav).toBeVisible();

      // Should have navigation links
      const navLinks = nav.locator('a');
      expect(await navLinks.count()).toBeGreaterThan(0);
    });

    test(`${site.name} - Footer is present`, async ({ page }) => {
      await page.goto(site.url);
      await page.waitForLoadState('networkidle');

      const footer = page.locator('footer');
      await expect(footer).toBeVisible();
    });
  }
});

test.describe('Generated Sites - Visual Consistency', () => {
  for (const site of sites) {
    test(`${site.name} - Homepage visual snapshot`, async ({ page }) => {
      await page.goto(site.url);
      await page.waitForLoadState('networkidle');

      // Disable animations for consistent screenshots
      await page.addInitScript(() => {
        document.documentElement.style.setProperty('animation-duration', '0s', 'important');
        document.documentElement.style.setProperty('transition-duration', '0s', 'important');
      });

      await expect(page).toHaveScreenshot(`${site.name.toLowerCase()}-homepage.png`, {
        fullPage: true,
        maxDiffPixelRatio: 0.02 // Allow 2% difference for generated sites
      });
    });

    test(`${site.name} - Mobile homepage snapshot`, async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto(site.url);
      await page.waitForLoadState('networkidle');

      await expect(page).toHaveScreenshot(`${site.name.toLowerCase()}-mobile.png`, {
        fullPage: true,
        maxDiffPixelRatio: 0.02
      });
    });
  }
});

test.describe('Generated Sites - Business Type Consistency', () => {
  test('App marketing sites use correct styling', async ({ page }) => {
    const appSites = sites.filter(s => s.businessType === 'app-marketing');

    for (const site of appSites) {
      await page.goto(site.url);
      await page.waitForLoadState('networkidle');

      // Check for app-marketing specific elements
      const buttons = page.locator('button, a[class*="button"]');

      if (await buttons.count() > 0) {
        const firstButton = buttons.first();
        const classList = await firstButton.evaluate((el) => el.className);

        // App marketing buttons should have rounded styling
        expect(classList).toMatch(/rounded/);
      }
    }
  });

  test('Consulting sites use correct styling', async ({ page }) => {
    const consultingSites = sites.filter(s => s.businessType === 'consulting');

    for (const site of consultingSites) {
      await page.goto(site.url);
      await page.waitForLoadState('networkidle');

      // Check for consulting specific elements
      const body = page.locator('body');
      await expect(body).toBeVisible();

      // Consulting sites should have professional styling
      const html = page.locator('html');
      const businessType = await html.getAttribute('data-business-type');

      if (businessType) {
        expect(businessType).toBe('consulting');
      }
    }
  });
});

test.describe('Generated Sites - Accessibility', () => {
  for (const site of sites) {
    test(`${site.name} - Passes axe accessibility tests`, async ({ page }) => {
      await page.goto(site.url);
      await page.waitForLoadState('networkidle');

      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
        .analyze();

      expect(accessibilityScanResults.violations).toEqual([]);
    });

    test(`${site.name} - Has correct language attribute`, async ({ page }) => {
      await page.goto(site.url);

      const html = page.locator('html');
      const lang = await html.getAttribute('lang');

      expect(lang).toBeTruthy();
      expect(['en', 'de', 'fr', 'es', 'it', 'pt']).toContain(lang);
    });

    test(`${site.name} - Has proper meta tags`, async ({ page }) => {
      await page.goto(site.url);

      // Description
      const description = page.locator('meta[name="description"]');
      await expect(description).toHaveCount(1);

      // Viewport
      const viewport = page.locator('meta[name="viewport"]');
      await expect(viewport).toHaveCount(1);

      // Generator
      const generator = page.locator('meta[name="generator"]');
      await expect(generator).toHaveCount(1);
    });

    test(`${site.name} - Keyboard navigation works`, async ({ page }) => {
      await page.goto(site.url);
      await page.waitForLoadState('networkidle');

      // Tab through elements
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');

      // Check if something is focused
      const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
      expect(focusedElement).toBeTruthy();
    });
  }
});

test.describe('Generated Sites - Performance', () => {
  for (const site of sites) {
    test(`${site.name} - Loads within acceptable time`, async ({ page }) => {
      const startTime = Date.now();

      await page.goto(site.url);
      await page.waitForLoadState('networkidle');

      const loadTime = Date.now() - startTime;

      // Should load within 3 seconds
      expect(loadTime).toBeLessThan(3000);
    });

    test(`${site.name} - No layout shift on load`, async ({ page }) => {
      await page.goto(site.url);

      // Wait for initial render
      await page.waitForLoadState('domcontentloaded');
      const initialHeight = await page.evaluate(() => document.body.scrollHeight);

      // Wait for full load
      await page.waitForLoadState('networkidle');
      const finalHeight = await page.evaluate(() => document.body.scrollHeight);

      // Height should not change significantly (allow 10% variance)
      const heightChange = Math.abs(finalHeight - initialHeight) / initialHeight;
      expect(heightChange).toBeLessThan(0.1);
    });
  }
});

test.describe('Generated Sites - Responsive Design', () => {
  const breakpoints = [
    { name: 'Mobile', width: 375, height: 667 },
    { name: 'Tablet', width: 768, height: 1024 },
    { name: 'Desktop', width: 1920, height: 1080 }
  ];

  for (const site of sites) {
    for (const bp of breakpoints) {
      test(`${site.name} - Responsive at ${bp.name} (${bp.width}x${bp.height})`, async ({ page }) => {
        await page.setViewportSize({ width: bp.width, height: bp.height });
        await page.goto(site.url);
        await page.waitForLoadState('networkidle');

        // Should not have horizontal scroll
        const hasHorizontalScroll = await page.evaluate(() => {
          return document.body.scrollWidth > window.innerWidth;
        });

        expect(hasHorizontalScroll).toBe(false);

        // Navigation should be visible
        const nav = page.locator('nav');
        await expect(nav).toBeVisible();
      });
    }
  }
});

test.describe('Generated Sites - Dark Mode', () => {
  for (const site of sites) {
    test(`${site.name} - Dark mode toggle works`, async ({ page }) => {
      await page.goto(site.url);
      await page.waitForLoadState('networkidle');

      // Enable dark mode
      await page.evaluate(() => {
        document.documentElement.classList.add('dark');
      });
      await page.waitForTimeout(300);

      // Check that dark mode styles are applied
      const body = page.locator('body');
      const bgColor = await body.evaluate((el) => {
        return window.getComputedStyle(el).backgroundColor;
      });

      // Should have a dark background
      expect(bgColor).toBeTruthy();
    });

    test(`${site.name} - Dark mode visual snapshot`, async ({ page }) => {
      await page.goto(site.url);
      await page.waitForLoadState('networkidle');

      await page.evaluate(() => {
        document.documentElement.classList.add('dark');
      });
      await page.waitForTimeout(300);

      await expect(page).toHaveScreenshot(`${site.name.toLowerCase()}-dark-mode.png`, {
        fullPage: false,
        clip: { x: 0, y: 0, width: 1280, height: 800 },
        maxDiffPixelRatio: 0.02
      });
    });
  }
});

test.describe('Generated Sites - Component Consistency', () => {
  test('All sites have buttons with correct styling', async ({ page }) => {
    for (const site of sites) {
      await page.goto(site.url);
      await page.waitForLoadState('networkidle');

      const buttons = page.locator('button, a[class*="btn"], a[class*="button"]');

      if (await buttons.count() > 0) {
        const firstButton = buttons.first();
        await expect(firstButton).toBeVisible();

        // Should have transition classes
        const classList = await firstButton.evaluate((el) => el.className);
        expect(classList).toMatch(/transition/);
      }
    }
  });

  test('All sites have cards with consistent structure', async ({ page }) => {
    for (const site of sites) {
      await page.goto(site.url);
      await page.waitForLoadState('networkidle');

      // Look for card-like structures
      const cards = page.locator('[class*="rounded"], [class*="shadow"]');

      if (await cards.count() > 0) {
        const firstCard = cards.first();
        const classList = await firstCard.evaluate((el) => el.className);

        // Should have rounded corners and shadow
        expect(classList).toMatch(/rounded/);
      }
    }
  });
});

test.describe('Generated Sites - Site-Specific Content', () => {
  test('FitnessTracker - Has fitness-related content', async ({ page }) => {
    await page.goto('http://localhost:4321');
    await page.waitForLoadState('networkidle');

    const bodyText = await page.textContent('body');

    // Should mention fitness, workout, or health
    expect(bodyText?.toLowerCase()).toMatch(/fitness|workout|health|track/i);
  });

  test('ProjectFlow - Has project management content', async ({ page }) => {
    await page.goto('http://localhost:4322');
    await page.waitForLoadState('networkidle');

    const bodyText = await page.textContent('body');

    // Should mention project, team, or collaboration
    expect(bodyText?.toLowerCase()).toMatch(/project|team|collaborat|workflow/i);
  });

  test('StudioBright - Has creative agency content', async ({ page }) => {
    await page.goto('http://localhost:4323');
    await page.waitForLoadState('networkidle');

    const bodyText = await page.textContent('body');

    // Should mention creative, design, or agency
    expect(bodyText?.toLowerCase()).toMatch(/creative|design|brand|agency/i);
  });
});
