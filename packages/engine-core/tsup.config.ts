import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true, // Enable DTS generation for proper type resolution
  splitting: false,
  sourcemap: true,
  clean: true,
});