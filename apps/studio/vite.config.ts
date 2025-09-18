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
      'path': resolve(__dirname, './src/polyfills/path-mock.ts'),
      'url': resolve(__dirname, './src/polyfills/url-mock.ts'),
      'fs': resolve(__dirname, './src/polyfills/fs-mock.ts'),
      'crypto': resolve(__dirname, './src/polyfills/crypto-mock.ts'),
    },
  },
  optimizeDeps: {
    exclude: ['@brepflow/engine-occt', 'xxhash-wasm', 'uuid', 'path', 'url', 'fs', 'crypto'], // Exclude WASM modules and Node.js deps from optimization
  },
  build: {
    target: 'esnext',
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
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