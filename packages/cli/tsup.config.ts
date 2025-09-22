import { createBaseConfig } from '../../config/tsup.base.config';

export default createBaseConfig({
  format: ['esm'],
  platform: 'node',
  target: 'node20',
  dts: {
    resolve: true,
    entry: ['src/index.ts'],
  },
  splitting: false,
  sourcemap: true,
});
