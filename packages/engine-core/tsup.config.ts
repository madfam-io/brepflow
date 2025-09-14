import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: false, // Temporarily disable DTS until TypeScript issues are resolved
  splitting: false,
  sourcemap: true,
  clean: true,
});