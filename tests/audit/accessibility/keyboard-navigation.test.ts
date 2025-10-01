import { expect, test } from '@playwright/test';
import {
  bootstrapStudio,
  clearAuditErrors,
  ensureCanvasReady,
  getAuditErrors,
} from '../utils/studio-helpers';

test.describe('Keyboard Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await bootstrapStudio(page);
    await clearAuditErrors(page);
  });

  test('Tab navigation moves focus across interactive elements', async ({ page }) => {
    const interactive = page.locator(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const count = await interactive.count();
    test.skip(count === 0, 'No interactive elements available for keyboard testing');

    await interactive.first().focus();
    const visited = new Set<string>();

    for (let i = 0; i < Math.min(count, 10); i++) {
      await page.keyboard.press('Tab');
      const info = await page.evaluate(() => {
        const element = document.activeElement as HTMLElement | null;
        return {
          tag: element?.tagName ?? null,
          id: element?.id ?? null,
          role: element?.getAttribute('role') ?? null,
        };
      });

      expect(info.tag).not.toBeNull();
      if (info.tag) {
        visited.add(`${info.tag}:${info.id ?? ''}:${info.role ?? ''}`);
      }
    }

    expect(visited.size).toBeGreaterThan(1);
    expect(await getAuditErrors(page)).toEqual([]);
  });

  test('Keyboard shortcuts do not raise runtime errors', async ({ page }) => {
    const shortcuts = ['Control+z', 'Control+y', 'Control+s', 'Escape'];

    for (const keys of shortcuts) {
      await page.keyboard.press(keys);
      await page.waitForTimeout(50);
    }

    expect(await getAuditErrors(page)).toEqual([]);
  });

  test('Arrow keys keep focus within the canvas', async ({ page }) => {
    const canvas = await ensureCanvasReady(page);
    test.skip(!canvas, 'React Flow canvas is not available');

    await canvas!.click({ position: { x: 100, y: 120 } });

    for (const key of ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']) {
      await page.keyboard.press(key);
      await page.waitForTimeout(25);
    }

    const focusInsideCanvas = await page.evaluate(() => {
      const canvasElement = document.querySelector('.react-flow');
      if (!canvasElement) return false;
      const active = document.activeElement;
      return canvasElement === active || canvasElement.contains(active);
    });

    expect(focusInsideCanvas).toBe(true);
    expect(await getAuditErrors(page)).toEqual([]);
  });

  test('Enter and Space activate focused buttons without errors', async ({ page }) => {
    const button = page.locator('button:visible').first();
    const visible = await button.isVisible();
    test.skip(!visible, 'No visible buttons to exercise keyboard activation');

    await button.focus();
    await page.keyboard.press('Enter');
    await page.waitForTimeout(50);
    await page.keyboard.press('Space');
    await page.waitForTimeout(50);

    expect(await getAuditErrors(page)).toEqual([]);
  });

  test('Focus indicator remains visible during navigation', async ({ page }) => {
    await page.keyboard.press('Tab');

    const hasFocusIndicator = await page.evaluate(() => {
      const element = document.activeElement as HTMLElement | null;
      if (!element || element === document.body) return false;
      const styles = window.getComputedStyle(element);
      const outlineVisible = styles.outlineStyle !== 'none' && styles.outlineWidth !== '0px';
      const borderVisible = styles.borderStyle !== 'none' && styles.borderWidth !== '0px';
      const shadowVisible = styles.boxShadow !== 'none';
      return outlineVisible || borderVisible || shadowVisible;
    });

    expect(hasFocusIndicator).toBe(true);
    expect(await getAuditErrors(page)).toEqual([]);
  });
});
