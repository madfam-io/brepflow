import { defineConfig } from 'tsup';

export default defineConfig([
  {
    // Main entry - build both CJS and ESM
    entry: ['src/index.ts'],
    format: ['cjs', 'esm'],
    dts: false, // Temporarily disable DTS until TypeScript issues are resolved
    splitting: false,
    sourcemap: true,
    clean: true,
  },
  {
    // Worker entry - only ESM (CJS doesn't support top-level await needed by WASM)
    entry: ['src/worker.ts'],
    format: ['esm'],
    dts: false,
    splitting: false,
    sourcemap: true,
    clean: false, // Don't clean since we run after main build
  }
]);