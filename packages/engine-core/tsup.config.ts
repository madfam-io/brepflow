import { createLibraryConfig } from '../../build/tsup.base.config';

/**
 * Engine Core build configuration
 * DAG evaluation, caching, and core execution logic
 */
export default createLibraryConfig({
  entry: ['src/index.ts'],
  // Engine-specific externals
  external: [
    'react',
    'react-dom',
    /^@brepflow\//,
    'vitest',
  ],
});