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
  dts: true, // Generate TypeScript declaration files
  shims: false, // Disable ESM shims to avoid Node.js module imports
  // Engine-specific externals
  external: ['react', 'react-dom', /^@brepflow\//, 'vitest'],
});
