/**
 * Playwright configuration for User Journey Integration Tests
 * Optimized for real-time browser-based testing with visual validation
 */

import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  testMatch: '**/user-journeys.test.ts',

  // Test execution settings
  fullyParallel: false, // Run sequentially for better debugging
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1, // Single worker for consistent results

  // Timeouts
  timeout: 60000, // 60 seconds per test
  expect: {
    timeout: 15000, // 15 seconds for assertions
  },

  // Reporter configuration
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report/user-journeys' }],
    ['json', { outputFile: 'test-results/user-journeys-results.json' }],
  ],

  // Global test settings
  use: {
    // Base URL
    baseURL: 'http://localhost:5173',

    // Browser settings
    trace: 'on-first-retry',
    screenshot: 'on',
    video: 'retain-on-failure',

    // Viewport
    viewport: { width: 1920, height: 1080 },

    // Navigation
    actionTimeout: 15000,
    navigationTimeout: 30000,

    // Context options
    ignoreHTTPSErrors: true,

    // Enable clipboard API
    permissions: ['clipboard-read', 'clipboard-write'],
  },

  // Projects for different browsers
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        // Chrome-specific settings for WebGL/WASM
        launchOptions: {
          args: [
            '--enable-features=SharedArrayBuffer',
            '--enable-webgl',
            '--enable-gpu-rasterization',
          ],
        },
      },
    },

    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
    },

    // WebKit disabled due to WASM SharedArrayBuffer limitations
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],

  // Web server configuration
  webServer: undefined, // Assume dev server is already running
});
