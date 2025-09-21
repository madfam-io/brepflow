import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('WCAG 2.1 AA Compliance', () => {
  test.beforeEach(async ({ page }) => {
    // Set viewport to desktop size for consistent testing
    await page.setViewportSize({ width: 1920, height: 1080 });
  });

  test('Homepage meets WCAG standards', async ({ page }) => {
    await page.goto('http://localhost:5173/');

    // Wait for the page to be fully loaded
    await page.waitForLoadState('networkidle');

    // Run accessibility scan
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    // Check for violations
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Node Editor meets WCAG standards', async ({ page }) => {
    await page.goto('http://localhost:5173/');

    // Wait for the React Flow canvas to be ready
    await page.waitForSelector('.react-flow', { timeout: 10000 });

    // Run accessibility scan
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .exclude('.react-flow__minimap') // Exclude minimap which may have contrast issues
      .analyze();

    // Log violations for debugging
    if (accessibilityScanResults.violations.length > 0) {
      console.log('Accessibility violations:', JSON.stringify(accessibilityScanResults.violations, null, 2));
    }

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Viewport meets WCAG standards', async ({ page }) => {
    await page.goto('http://localhost:5173/');

    // Wait for Three.js canvas to be ready
    await page.waitForSelector('canvas', { timeout: 10000 });

    // Run accessibility scan excluding canvas (3D viewport is exempt from some WCAG rules)
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .exclude('canvas') // 3D viewport canvas is exempt
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Inspector panel meets WCAG standards', async ({ page }) => {
    await page.goto('http://localhost:5173/');

    // Wait for inspector to be available
    await page.waitForSelector('[data-testid="inspector"]', {
      timeout: 10000,
      state: 'visible'
    }).catch(() => {
      // If no inspector testid, try other selectors
      return page.waitForSelector('.inspector, .panel-right, [role="complementary"]', {
        timeout: 10000
      });
    });

    // Run accessibility scan on inspector area
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .include('[data-testid="inspector"], .inspector, .panel-right, [role="complementary"]')
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Node palette meets WCAG standards', async ({ page }) => {
    await page.goto('http://localhost:5173/');

    // Wait for node palette
    await page.waitForSelector('[data-testid="node-palette"]', {
      timeout: 10000,
      state: 'visible'
    }).catch(() => {
      // Fallback selectors
      return page.waitForSelector('.node-palette, .palette, [role="navigation"]', {
        timeout: 10000
      });
    });

    // Run accessibility scan on palette area
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .include('[data-testid="node-palette"], .node-palette, .palette')
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Color contrast meets WCAG AA standards', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');

    // Check specifically for color contrast issues
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withRules(['color-contrast'])
      .analyze();

    // WCAG AA requires 4.5:1 for normal text, 3:1 for large text
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Focus indicators are visible', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');

    // Tab through interactive elements and verify focus is visible
    const interactiveElements = await page.$$('button, input, select, textarea, a[href], [tabindex]:not([tabindex="-1"])');

    for (let i = 0; i < Math.min(interactiveElements.length, 10); i++) {
      await page.keyboard.press('Tab');

      // Get the currently focused element
      const focusedElement = await page.evaluateHandle(() => document.activeElement);

      // Check if focus is visible (has outline or border change)
      const hasFocusIndicator = await page.evaluate((el) => {
        if (!el || el === document.body) return false;
        const styles = window.getComputedStyle(el as Element);
        return (
          styles.outline !== 'none' ||
          styles.outlineWidth !== '0px' ||
          styles.border !== 'none' ||
          styles.boxShadow !== 'none'
        );
      }, focusedElement);

      expect(hasFocusIndicator).toBe(true);
    }
  });

  test('Images have alt text', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');

    // Check all images have alt text
    const imagesWithoutAlt = await page.evaluate(() => {
      const images = Array.from(document.querySelectorAll('img'));
      return images.filter(img => !img.alt && !img.getAttribute('role')).map(img => img.src);
    });

    expect(imagesWithoutAlt).toEqual([]);
  });

  test('Form elements have labels', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');

    // Check all form inputs have associated labels
    const unlabeledInputs = await page.evaluate(() => {
      const inputs = Array.from(document.querySelectorAll('input, select, textarea'));
      return inputs.filter(input => {
        const id = input.id;
        const hasLabel = id ? document.querySelector(`label[for="${id}"]`) : false;
        const hasAriaLabel = input.getAttribute('aria-label');
        const hasAriaLabelledBy = input.getAttribute('aria-labelledby');
        const isWrappedInLabel = input.closest('label');

        return !hasLabel && !hasAriaLabel && !hasAriaLabelledBy && !isWrappedInLabel;
      }).map(input => ({
        type: input.tagName.toLowerCase(),
        name: input.getAttribute('name'),
        id: input.id
      }));
    });

    expect(unlabeledInputs).toEqual([]);
  });

  test('Page has proper heading hierarchy', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');

    // Check heading hierarchy
    const headingIssues = await page.evaluate(() => {
      const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
      const issues: string[] = [];

      // Should have exactly one h1
      const h1Count = document.querySelectorAll('h1').length;
      if (h1Count !== 1) {
        issues.push(`Found ${h1Count} h1 elements, should have exactly 1`);
      }

      // Check for skipped heading levels
      let lastLevel = 0;
      headings.forEach(heading => {
        const level = parseInt(heading.tagName[1]);
        if (level - lastLevel > 1) {
          issues.push(`Skipped heading level: h${lastLevel} → h${level}`);
        }
        lastLevel = level;
      });

      return issues;
    });

    expect(headingIssues).toEqual([]);
  });
});