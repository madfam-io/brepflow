import { defineConfig } from 'vite';
import type { Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { wasmPlugin } from './vite-plugin-wasm';
import { nodePolyfillsPlugin } from './vite-plugin-node-polyfills';
import { wasmAssetsPlugin } from './vite-plugin-wasm-assets';

const NODE_BUILTIN_WARNING_PATTERNS = [
  'Module "fs" has been externalized for browser compatibility',
  'Module "path" has been externalized for browser compatibility',
  'Module "url" has been externalized for browser compatibility',
];

const OCCT_ASSET_DOC_PATH = 'docs/implementation/OCCT_ASSET_STRATEGY.md';

interface SuppressedLogDescriptor {
  onceKey: string;
  test(message: string): boolean;
  info: string;
}

const SUPPRESSED_BUILD_LOGS: SuppressedLogDescriptor[] = [
  {
    onceKey: 'occt-worker-url',
    test: (message) => message.includes("../engine-occt/dist/worker.mjs") && message.includes("doesn't exist at build time"),
    info: `[studio-build] Worker URL resolved at runtime via start-studio-preview (documented in ${OCCT_ASSET_DOC_PATH})`,
  },
  {
    onceKey: 'occt-wasm-url',
    test: (message) => message.includes('../wasm/') && message.includes("doesn't exist at build time"),
    info: `[studio-build] OCCT wasm assets are located at runtime by wasmAssetsPlugin (see ${OCCT_ASSET_DOC_PATH})`,
  },
  {
    onceKey: 'node-polyfills',
    test: (message) => NODE_BUILTIN_WARNING_PATTERNS.some((pattern) => message.includes(pattern)),
    info: `[studio-build] Node built-in imports are redirected to browser mocks for OCCT (see ${OCCT_ASSET_DOC_PATH})`,
  },
];

function suppressOcctWarnings(): Plugin {
  return {
    name: 'brepflow-occt-warning-filter',
    apply: 'build',
    configResolved(config) {
      const originalWarn = config.logger.warn.bind(config.logger);
      const originalWarnOnce = config.logger.warnOnce.bind(config.logger);
      const originalInfo = config.logger.info.bind(config.logger);
      const seen = new Set<string>();

      const suppress = (msg: any): boolean => {
        const text = typeof msg === 'string' ? msg : msg?.message ?? '';
        const descriptor = SUPPRESSED_BUILD_LOGS.find((entry) => entry.test(text));

        if (descriptor) {
          if (!seen.has(descriptor.onceKey)) {
            originalInfo(descriptor.info);
            seen.add(descriptor.onceKey);
          }
          return true;
        }

        return false;
      };

      config.logger.warn = (msg, options) => {
        if (suppress(msg)) return;
        originalWarn(msg, options);
      };

      config.logger.warnOnce = (msg, options) => {
        if (suppress(msg)) return;
        originalWarnOnce(msg, options);
      };

      if (!originalConsoleWarn) {
        originalConsoleWarn = console.warn;
        console.warn = (...args: unknown[]) => {
          const text = args
            .map((value) => {
              if (typeof value === 'string') return value;
              if (value instanceof Error) return value.message;
              return '';
            })
            .join(' ');
          const descriptor = SUPPRESSED_BUILD_LOGS.find((entry) => entry.test(text));

          if (descriptor) {
            if (!seenSuppressedBuildLogs.has(descriptor.onceKey)) {
              console.info(descriptor.info);
              seenSuppressedBuildLogs.add(descriptor.onceKey);
            }
            return;
          }

          originalConsoleWarn?.apply(console, args as any);
        };
      }
    },
    buildStart() {
      // no-op; console override happens in configResolved for early transform warnings
    },
    buildEnd() {
      if (originalConsoleWarn) {
        console.warn = originalConsoleWarn;
        originalConsoleWarn = undefined;
      }
    },
    closeBundle() {
      if (originalConsoleWarn) {
        console.warn = originalConsoleWarn;
        originalConsoleWarn = undefined;
      }
    },
  };
}

let reportedWasmChunkRationale = false;
const seenSuppressedBuildLogs = new Set<string>();
let originalConsoleWarn: ((...args: unknown[]) => void) | undefined;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), wasmPlugin(), nodePolyfillsPlugin(), wasmAssetsPlugin(), suppressOcctWarnings()],
  define: {
    global: 'globalThis',
  },
  server: {
    host: '127.0.0.1',
    port: 5173,
    strictPort: true,
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
  preview: {
    host: '127.0.0.1',
    port: 5173,
    strictPort: true,
    headers: {
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
    // @ts-expect-error - onLog is valid Vite config but not in BuildOptions type
    onLog(level, log, handler) {
      if (level === 'warn') {
        const text = typeof log === 'string' ? log : log?.message ?? '';
        const descriptor = SUPPRESSED_BUILD_LOGS.find((entry) => entry.test(text));

        if (descriptor) {
          if (!seenSuppressedBuildLogs.has(descriptor.onceKey)) {
            console.info(descriptor.info);
            seenSuppressedBuildLogs.add(descriptor.onceKey);
          }
          return;
        }
      }

      handler(level, log);
    },
    rollupOptions: {
      onwarn(warning, defaultHandler) {
        const messageText = typeof warning.message === 'string' ? warning.message : '';
        const shouldSuppressWasmChunkWarning =
          ['FILE_SIZE', 'LARGE_BUNDLE', 'LARGE_DYNAMIC_IMPORT_CHUNK', 'CHUNK_SIZE'].includes(
            warning.code ?? ''
          ) && (messageText.includes('.wasm') || messageText.includes('chunks are larger than'));

        if (shouldSuppressWasmChunkWarning) {
          if (!reportedWasmChunkRationale) {
            console.info(
              `[studio-build] OCCT wasm bundle exceeds Rollup size threshold – compression tracked in ${OCCT_ASSET_DOC_PATH}`
            );
            reportedWasmChunkRationale = true;
          }
          return;
        }

        defaultHandler(warning);
      },
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

          // Three.js and related 3D libraries - comprehensive matching
          // Match: node_modules/three/, /node_modules/three-stdlib/, or package name 'three'
          if (id.includes('node_modules')) {
            if (id.match(/[\\/]three[\\/]/) || 
                id.match(/[\\/]three-stdlib[\\/]/) ||
                id.endsWith('/three') ||
                id.endsWith('\\three')) {
              return 'three-vendor';
            }
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