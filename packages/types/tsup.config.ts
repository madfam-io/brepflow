import { createLibraryConfig } from '../../config/tsup.base.config';
import { resolve } from 'path';

/**
 * Types package build configuration
 * Core type definitions for the entire BrepFlow monorepo
 */
export default createLibraryConfig({
  entry: ['src/index.ts'],
  // Types package has no external dependencies
  external: [],
  // Override tsconfig to use root config instead of strict (fixes Vercel DTS generation)
  tsconfig: resolve(__dirname, '../../tsconfig.json'),
});
