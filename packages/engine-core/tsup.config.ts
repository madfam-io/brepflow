import { createLibraryConfig } from '../../config/tsup.base.config';

/**
 * Engine Core build configuration
 * DAG evaluation, caching, and core execution logic
 */
export default createLibraryConfig({
  entry: ['src/index.ts'],
  dts: false, // TODO: Re-enable after fixing branded type issues
  // Engine-specific externals
  external: [
    'react',
    'react-dom',
    /^@brepflow\//,
    'vitest',
  ],
});