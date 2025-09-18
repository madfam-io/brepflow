import { createLibraryConfig } from '../../build/tsup.base.config';

/**
 * Nodes Core build configuration
 * Built-in node definitions for BrepFlow
 */
export default createLibraryConfig({
  entry: ['src/index.ts'],
  dts: true, // Re-enable DTS with proper configuration
  // Additional node categories can be added as entry points
  // entry: ['src/index.ts', 'src/geometry/index.ts', 'src/math/index.ts'],
});