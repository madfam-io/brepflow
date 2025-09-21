import { createLibraryConfig } from '../../config/tsup.base.config';

/**
 * Types package build configuration
 * Core type definitions for the entire BrepFlow monorepo
 */
export default createLibraryConfig({
  entry: ['src/index.ts'],
  // Types package has no external dependencies
  external: [],
});