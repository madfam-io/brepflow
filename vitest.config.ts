import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./test/setup.ts'],
    testTimeout: 30000, // 30 seconds for complex tests
    hookTimeout: 30000, // 30 seconds for setup/teardown hooks
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'test/',
        '*.config.ts',
        '**/*.d.ts',
        '**/__mocks__/',
        '**/dist/',
      ],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
    },
    include: ['**/*.{test,spec}.{js,jsx,ts,tsx}'],
    exclude: ['**/node_modules/**', '**/dist/**', '.idea', '.git', '.cache', '**/wasm/**'],
  },
  resolve: {
    alias: {
      '@brepflow/types': path.resolve(__dirname, './packages/types/src'),
      '@brepflow/engine-core': path.resolve(__dirname, './packages/engine-core/src'),
      '@brepflow/engine-occt': path.resolve(__dirname, './packages/engine-occt/src'),
      '@brepflow/nodes-core': path.resolve(__dirname, './packages/nodes-core/src'),
    },
  },
});