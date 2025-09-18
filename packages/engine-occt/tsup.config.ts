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
      format: ['esm'], // ESM only for import.meta
      dts: true, // Re-enable DTS with proper configuration
    }),
  },
  {
    // Worker entry - Worker-specific configuration
    ...createWorkerConfig({
      entry: ['src/worker.ts'],
      dts: false, // Workers don't need type definitions
    }),
    clean: false, // Don't clean since we run after main build
  }
]);