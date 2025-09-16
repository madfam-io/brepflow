import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/**',
        'test/**',
        '*.config.ts',
        '*.config.js',
        '**/dist/**',
      ],
    },
  },
  resolve: {
    alias: {
      '@brepflow/types': path.resolve(__dirname, '../types/src'),
      '@brepflow/engine-core': path.resolve(__dirname, '../engine-core/src'),
    },
  },
});