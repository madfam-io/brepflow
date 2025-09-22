import { test, expect } from '@playwright/test';

test.describe('Performance Benchmarks', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      (window as any).__errors = [];
      window.addEventListener('error', (event) => {
        (window as any).__errors.push(event.message);
      });
    });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.setViewportSize({ width: 1920, height: 1080 });
  });

  test('initial load completes within 3s', async ({ page }) => {
    const metrics = await page.evaluate(() => {
      const timing = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
      if (timing) {
        return {
          domContentLoaded: timing.domContentLoadedEventEnd - timing.startTime,
          load: timing.loadEventEnd - timing.startTime,
        };
      }

      const legacy = performance.timing;
      return {
        domContentLoaded: legacy.domContentLoadedEventEnd - legacy.navigationStart,
        load: legacy.loadEventEnd - legacy.navigationStart,
      };
    });

    expect(metrics.domContentLoaded).toBeGreaterThan(0);
    expect(metrics.load).toBeGreaterThan(0);
    expect(metrics.domContentLoaded).toBeLessThan(2000);
    expect(metrics.load).toBeLessThan(3000);
  });

  test('node creation stays within interactive budget', async ({ page }) => {
    const { duration } = await page.evaluate(async () => {
      const studio = (window as any).studio;
      if (!studio?.createNode) {
        throw new Error('Studio createNode API not available');
      }

      const start = performance.now();
      await studio.createNode('Geometry::Box', { x: 200, y: 120 });
      await new Promise((resolve) => setTimeout(resolve, 0));
      const end = performance.now();

      return { duration: end - start };
    });

    expect(duration).toBeLessThan(150);
  });

  test('graph evaluation completes without errors', async ({ page }) => {
    const result = await page.evaluate(async () => {
      const studio = (window as any).studio;
      if (!studio?.evaluateGraph) {
        throw new Error('Studio evaluateGraph API not available');
      }

      const start = performance.now();
      await studio.evaluateGraph();
      const duration = performance.now() - start;

      const errors: string[] = (window as any).__errors ?? [];
      return { duration, errors };
    });

    expect(result.duration).toBeLessThan(500);
    expect(result.errors).toEqual([]);
  });
});
