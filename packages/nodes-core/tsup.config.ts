import { createLibraryConfig } from '../../config/tsup.base.config';

/**
 * Nodes Core build configuration
 * Built-in node definitions for BrepFlow
 */
export default createLibraryConfig({
  entry: ['src/index.ts'],
  dts: false, // TODO: Re-enable after fixing branded type issues
  shims: false, // Disable ESM shims to avoid Node.js module imports
  // Additional node categories can be added as entry points
  // entry: ['src/index.ts', 'src/geometry/index.ts', 'src/math/index.ts'],
});