import { defineConfig } from 'tsup';

/**
 * Types package build configuration
 * Core type definitions for the entire BrepFlow monorepo
 */
export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: {
    resolve: true,
    compilerOptions: {
      composite: false,
      incremental: false,
      // Disable exactOptionalPropertyTypes for DTS generation only
      exactOptionalPropertyTypes: false,
    },
  },
  sourcemap: true,
  clean: true,
  external: [],
  target: 'es2022',
  keepNames: true,
  shims: true,
});
