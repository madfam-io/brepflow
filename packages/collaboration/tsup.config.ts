import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: false, // Temporarily disabled due to tsconfig issue
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom', 'ws', 'y-websocket', 'yjs'],
  tsconfig: 'tsconfig.json',
});