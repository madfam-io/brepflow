import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { wasmPlugin } from './vite-plugin-wasm';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), wasmPlugin()],
  define: {
    global: 'globalThis',
  },
  server: {
    port: 5173,
    headers: {
      // Required for SharedArrayBuffer/WASM threads
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    },
  },
  worker: {
    format: 'es',
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      'xxhash-wasm': resolve(__dirname, './src/polyfills/xxhash-mock.ts'),
      'uuid': resolve(__dirname, './src/polyfills/uuid-mock.ts'),
    },
  },
  optimizeDeps: {
    exclude: ['@brepflow/engine-occt', 'xxhash-wasm'], // Exclude WASM modules from optimization
  },
  build: {
    target: 'esnext',
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      external: ['xxhash-wasm', 'path', 'url', 'fs', 'crypto', 'uuid'],
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'reactflow-vendor': ['reactflow'],
          'three-vendor': ['three'],
        },
      },
    },
  },
});