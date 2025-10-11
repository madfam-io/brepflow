import type { Plugin } from 'esbuild';
import { createLibraryConfig } from '../../config/tsup.base.config';

/**
 * Nodes Core build configuration
 * Built-in node definitions for BrepFlow
 */
const nodeExtensionResolver: Plugin = {
  name: 'generated-node-extension-resolver',
  setup(build) {
    build.onResolve({ filter: /\.node$/ }, (args) => ({
      path: `${args.path}.ts`,
      namespace: 'file',
    }));
  },
};

export default createLibraryConfig({
  entry: ['src/index.ts'],
  format: ['esm'], // ESM only for import.meta.url support
  dts: false, // TODO: Re-enable after fixing branded type issues
  shims: false, // Disable ESM shims to avoid Node.js module imports
  platform: 'neutral',
  esbuildPlugins: [nodeExtensionResolver],
  // Additional node categories can be added as entry points
  // entry: ['src/index.ts', 'src/geometry/index.ts', 'src/math/index.ts'],
});
