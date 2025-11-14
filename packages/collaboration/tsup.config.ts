import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'server/index': 'src/server/index.ts',
    'client/index': 'src/client/index.ts',
  },
  format: ['cjs', 'esm'],
  dts: false, // Temporarily disabled due to tsconfig issue
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom', 'ws', 'y-websocket', 'yjs', 'uuid', 'socket.io', 'socket.io-client'],
  noExternal: [/^@brepflow\//], // Bundle workspace packages
  tsconfig: 'tsconfig.json',
});