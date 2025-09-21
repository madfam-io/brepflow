import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { wasmPlugin } from './vite-plugin-wasm';
import { nodePolyfillsPlugin } from './vite-plugin-node-polyfills';
import { wasmAssetsPlugin } from './vite-plugin-wasm-assets';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), wasmPlugin(), nodePolyfillsPlugin(), wasmAssetsPlugin()],
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
    fs: {
      // Allow serving files from the entire monorepo
      allow: [
        resolve(__dirname, '../..'), // Project root
        resolve(__dirname, '../../packages'), // Packages directory
        resolve(__dirname, '../../packages/nodes-core'), // nodes-core package
        resolve(__dirname, '../../packages/engine-core'), // engine-core package
        resolve(__dirname, '../../packages/engine-occt'), // engine-occt package
        resolve(__dirname, '../../packages/types'), // types package
        resolve(__dirname, '../../packages/viewport'), // viewport package
      ],
    },
  },
  worker: {
    format: 'es',
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      // BrepFlow package aliases for monorepo - point to source index files
      '@brepflow/nodes-core': resolve(__dirname, '../../packages/nodes-core/src/index.ts'),
      '@brepflow/engine-core': resolve(__dirname, '../../packages/engine-core/src/index.ts'),
      '@brepflow/engine-occt': resolve(__dirname, '../../packages/engine-occt/src/index.ts'),
      '@brepflow/types': resolve(__dirname, '../../packages/types/src/index.ts'),
      '@brepflow/viewport': resolve(__dirname, '../../packages/viewport/src/index.ts'),
      // Polyfills
      'xxhash-wasm': resolve(__dirname, './src/polyfills/xxhash-mock.ts'),
      'uuid': resolve(__dirname, './src/polyfills/uuid-mock.ts'),
      'path': resolve(__dirname, './src/polyfills/path-mock.ts'),
      'url': resolve(__dirname, './src/polyfills/url-mock.ts'),
      'fs': resolve(__dirname, './src/polyfills/fs-mock.ts'),
      'crypto': resolve(__dirname, './src/polyfills/crypto-mock.ts'),
    },
  },
  optimizeDeps: {
    exclude: ['@brepflow/engine-occt'], // Exclude WASM modules from optimization
    include: ['path', 'url', 'fs', 'crypto', 'uuid', 'xxhash-wasm'], // Force inclusion of polyfilled modules
  },
  ssr: {
    noExternal: ['path', 'url', 'fs', 'crypto', 'uuid', 'xxhash-wasm'], // Prevent externalization
  },
  build: {
    target: 'esnext',
    outDir: 'dist',
    sourcemap: true,
    chunkSizeWarningLimit: 600, // Increase warning limit for necessary large chunks
    rollupOptions: {
      // Don't externalize - these are polyfilled/mocked
      output: {
        manualChunks: (id) => {
          // Core React dependencies
          if (id.includes('node_modules/react/') ||
              id.includes('node_modules/react-dom/')) {
            return 'react-vendor';
          }

          // ReactFlow and its dependencies
          if (id.includes('node_modules/reactflow/') ||
              id.includes('node_modules/@reactflow/')) {
            return 'reactflow-vendor';
          }

          // Three.js and related 3D libraries
          if (id.includes('node_modules/three/') ||
              id.includes('node_modules/three-stdlib/')) {
            return 'three-vendor';
          }

          // UI libraries
          if (id.includes('node_modules/framer-motion/') ||
              id.includes('node_modules/@dnd-kit/') ||
              id.includes('node_modules/react-resizable-panels/')) {
            return 'ui-vendor';
          }

          // State management and utilities
          if (id.includes('node_modules/zustand/') ||
              id.includes('node_modules/immer/') ||
              id.includes('node_modules/comlink/')) {
            return 'utils-vendor';
          }

          // BrepFlow engine packages
          if (id.includes('@brepflow/engine-core') ||
              id.includes('@brepflow/engine-occt')) {
            return 'engine-vendor';
          }

          // BrepFlow nodes
          if (id.includes('@brepflow/nodes-core')) {
            return 'nodes-vendor';
          }
        },
        // Optimize chunk names for better caching
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/').pop() : 'chunk';
          return `assets/${facadeModuleId}-[hash].js`;
        },
      },
    },
  },
});