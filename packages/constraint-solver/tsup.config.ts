import { createLibraryConfig } from '../../build/tsup.base.config';

/**
 * Constraint Solver build configuration
 * 2D/3D parametric constraint solving for CAD operations
 *
 * NOTE: DTS generation temporarily disabled due to tsup sourcemap issue at line 65
 * This is a known issue to be addressed in Phase 2 of the architecture improvements
 */
export default createLibraryConfig({
  entry: ['src/index.ts'],
  dts: false, // TODO: Re-enable after resolving tsup sourcemap issue
  external: ['@brepflow/types', 'kiwi.js'],
});