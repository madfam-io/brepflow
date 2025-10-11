import { createWorkerConfig, createLibraryConfig } from '../../config/tsup.base.config';
import { defineConfig } from 'tsup';

/**
 * Engine OCCT build configuration
 * WASM geometry engine with worker-based execution
 */
export default defineConfig([
  {
    // Main entry - Library configuration for ESM
    ...createLibraryConfig({
      entry: ['src/index.ts'],
      format: ['esm', 'cjs'], // Provide both module formats for Node + bundlers
      dts: false, // TODO: Re-enable after fixing branded type issues
      shims: false, // Disable ESM shims to avoid Node.js module imports
    }),
  },
  {
    // Worker entry - Worker-specific configuration
    ...createWorkerConfig({
      entry: ['src/worker.ts'],
      dts: false, // Workers don't need type definitions
      shims: false, // Disable ESM shims to avoid Node.js module imports
      skipNodeModulesBundle: false, // Bundle all dependencies for worker
      noExternal: ['uuid'], // Ensure uuid is bundled
    }),
    clean: false, // Don't clean since we run after main build
  }
]);
