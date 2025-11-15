import { createLibraryConfig } from '../../config/tsup.base.config';

/**
 * Engine Core build configuration
 * DAG evaluation, caching, and core execution logic
 */
export default createLibraryConfig({
  entry: [
    'src/index.ts',
    'src/geometry-api-factory.ts', // Node.js only - separate entry for server-side use
  ],
  format: ['esm'], // ESM only for import.meta.url support
  dts: {
    resolve: true,
    compilerOptions: {
      composite: false,
      incremental: false,
      // Disable exactOptionalPropertyTypes for DTS generation
      exactOptionalPropertyTypes: false,
    },
  },
  shims: false, // Disable ESM shims to avoid Node.js module imports
  // Engine-specific externals
  external: ['react', 'react-dom', /^@brepflow\//, 'vitest'],
  // Override tsconfig to use root config (fixes Vercel DTS generation)
  tsconfig: '../../tsconfig.json',
});
