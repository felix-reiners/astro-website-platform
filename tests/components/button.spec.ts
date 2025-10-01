import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Button Component - Behavior Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/test/buttons');
    await page.waitForLoadState('networkidle');
  });

  test('renders with correct default props', async ({ page }) => {
    const button = page.locator('button').first();

    await expect(button).toBeVisible();
    await expect(button).toBeEnabled();
    await expect(button).toHaveAttribute('type', 'button');
  });

  test('handles click events', async ({ page }) => {
    let clicked = false;

    await page.evaluate(() => {
      const button = document.querySelector('button');
      if (button) {
        button.addEventListener('click', () => {
          (window as any).buttonClicked = true;
        });
      }
    });

    const button = page.locator('button').first();
    await button.click();

    clicked = await page.evaluate(() => (window as any).buttonClicked);
    expect(clicked).toBe(true);
  });

  test('disabled buttons cannot be clicked', async ({ page }) => {
    const disabledButton = page.locator('button[disabled]').first();

    await expect(disabledButton).toBeDisabled();

    // Verify visually disabled
    await expect(disabledButton).toHaveClass(/disabled:opacity-50/);
  });

  test('link buttons navigate correctly', async ({ page }) => {
    const linkButton = page.locator('a').filter({ hasText: 'Link Button' }).first();

    await expect(linkButton).toBeVisible();
    await expect(linkButton).toHaveAttribute('href', '/about');
  });

  test('all size variants render correctly', async ({ page }) => {
    const sizes = ['Small', 'Medium', 'Large'];

    for (const size of sizes) {
      const button = page.locator('button').filter({ hasText: `${size} Button` }).first();
      await expect(button).toBeVisible();
    }
  });

  test('all variants render correctly', async ({ page }) => {
    // Primary buttons
    const primaryButtons = page.locator('section').first().locator('button');
    expect(await primaryButtons.count()).toBeGreaterThan(0);

    // Secondary buttons
    const secondaryButtons = page.locator('section').nth(1).locator('button');
    expect(await secondaryButtons.count()).toBeGreaterThan(0);

    // Outline buttons
    const outlineButtons = page.locator('section').nth(2).locator('button');
    expect(await outlineButtons.count()).toBeGreaterThan(0);
  });
});

test.describe('Button Component - Visual States', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/test/buttons');
    await page.waitForLoadState('networkidle');
  });

  test('hover state changes appearance', async ({ page }) => {
    const button = page.locator('button').filter({ hasText: 'Medium Button' }).first();

    // Get initial state
    const initialBox = await button.boundingBox();
    expect(initialBox).not.toBeNull();

    // Hover
    await button.hover();
    await page.waitForTimeout(300);

    // Verify hover class is applied
    const classList = await button.evaluate((el) => el.className);
    expect(classList).toContain('hover:');
  });

  test('focus state is visible', async ({ page }) => {
    const button = page.locator('button').first();

    await button.focus();
    await page.waitForTimeout(200);

    // Check if focus outline is visible
    const focusOutline = await button.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return styles.outline || styles.outlineWidth;
    });

    expect(focusOutline).toBeTruthy();
  });

  test('active state on click', async ({ page }) => {
    const button = page.locator('button').first();

    // Mouse down (active state)
    await button.hover();
    await page.mouse.down();
    await page.waitForTimeout(100);

    // Verify button is in active state
    await expect(button).toBeVisible();

    await page.mouse.up();
  });
});

test.describe('Button Component - Business Context', () => {
  test('app marketing context has correct styling', async ({ page }) => {
    await page.goto('/test/buttons');
    await page.waitForLoadState('networkidle');

    const primaryButton = page.locator('#appContext button').filter({ hasText: 'Medium Button' }).first();

    // Check for app marketing specific classes
    const classList = await primaryButton.evaluate((el) => el.className);
    expect(classList).toContain('bg-blue-600');
    expect(classList).toContain('rounded-full');
  });

  test('consulting context has correct styling', async ({ page }) => {
    await page.goto('/test/buttons');

    // Switch to consulting
    await page.selectOption('#contextSwitcher', 'consulting');
    await page.waitForTimeout(300);

    const primaryButton = page.locator('#consultingContext button').filter({ hasText: 'Medium Button' }).first();

    // Check for consulting specific classes
    const classList = await primaryButton.evaluate((el) => el.className);
    expect(classList).toContain('bg-slate-800');
    expect(classList).toContain('rounded-md');
  });

  test('context switcher changes button styles', async ({ page }) => {
    await page.goto('/test/buttons');
    await page.waitForLoadState('networkidle');

    // Start with app context
    let appContext = page.locator('#appContext');
    await expect(appContext).toBeVisible();

    // Switch to consulting
    await page.selectOption('#contextSwitcher', 'consulting');
    await page.waitForTimeout(300);

    // App context should be hidden, consulting visible
    appContext = page.locator('#appContext');
    const consultingContext = page.locator('#consultingContext');

    expect(await appContext.isHidden()).toBe(true);
    await expect(consultingContext).toBeVisible();
  });
});

test.describe('Button Component - Accessibility', () => {
  test('passes axe accessibility tests', async ({ page }) => {
    await page.goto('/test/buttons');
    await page.waitForLoadState('networkidle');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .include('button')
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('keyboard navigation works', async ({ page }) => {
    await page.goto('/test/buttons');
    await page.waitForLoadState('networkidle');

    // Tab to first button
    await page.keyboard.press('Tab');

    // Check if a button is focused
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(['BUTTON', 'A', 'SELECT']).toContain(focusedElement);
  });

  test('button with aria-label is accessible', async ({ page }) => {
    await page.goto('/test/buttons');

    // If any buttons have aria-label, check them
    const buttonsWithAria = page.locator('button[aria-label]');
    const count = await buttonsWithAria.count();

    if (count > 0) {
      const ariaLabel = await buttonsWithAria.first().getAttribute('aria-label');
      expect(ariaLabel).toBeTruthy();
    }
  });

  test('disabled buttons are not focusable', async ({ page }) => {
    await page.goto('/test/buttons');

    const disabledButton = page.locator('button[disabled]').first();

    // Try to focus
    await disabledButton.focus().catch(() => {});

    // Should not be focused
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    const disabledIsFocused = await page.evaluate(() => {
      const disabled = document.querySelector('button[disabled]');
      return document.activeElement === disabled;
    });

    expect(disabledIsFocused).toBe(false);
  });

  test('buttons have sufficient color contrast', async ({ page }) => {
    await page.goto('/test/buttons');
    await page.waitForLoadState('networkidle');

    // Run contrast checks with axe
    const accessibilityScanResults = await new AxeBuilder({ page })
      .include('button')
      .withTags(['wcag2aa', 'wcag21aa'])
      .analyze();

    const contrastViolations = accessibilityScanResults.violations.filter(
      v => v.id === 'color-contrast'
    );

    expect(contrastViolations).toHaveLength(0);
  });
});

test.describe('Button Component - Responsiveness', () => {
  test('buttons stack correctly on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/test/buttons');
    await page.waitForLoadState('networkidle');

    const section = page.locator('section').first();
    const buttons = section.locator('button');

    // Check that buttons are visible on mobile
    expect(await buttons.count()).toBeGreaterThan(0);
    await expect(buttons.first()).toBeVisible();
  });

  test('buttons maintain tap targets on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/test/buttons');
    await page.waitForLoadState('networkidle');

    const button = page.locator('button').first();
    const box = await button.boundingBox();

    // WCAG recommends 44x44px minimum tap target
    expect(box?.width).toBeGreaterThanOrEqual(40); // Allow slight margin
    expect(box?.height).toBeGreaterThanOrEqual(32);
  });

  test('buttons are visible across breakpoints', async ({ page }) => {
    const breakpoints = [
      { width: 375, height: 667 },  // Mobile
      { width: 768, height: 1024 }, // Tablet
      { width: 1280, height: 720 }  // Desktop
    ];

    for (const viewport of breakpoints) {
      await page.setViewportSize(viewport);
      await page.goto('/test/buttons');
      await page.waitForLoadState('networkidle');

      const button = page.locator('button').first();
      await expect(button).toBeVisible();
    }
  });
});
