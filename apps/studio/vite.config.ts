import { defineConfig } from 'vite';
import type { Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { fileURLToPath } from 'node:url';
import { wasmPlugin } from './vite-plugin-wasm';
import { nodePolyfillsPlugin } from './vite-plugin-node-polyfills';
import { wasmAssetsPlugin } from './vite-plugin-wasm-assets';
import { wasmWorkerFixPlugin } from './vite-plugin-wasm-worker-fix';

const configDir = fileURLToPath(new URL('.', import.meta.url));
const NODE_BUILTIN_WARNING_PATTERNS = [
  'Module "fs" has been externalized for browser compatibility',
  'Module "path" has been externalized for browser compatibility',
  'Module "url" has been externalized for browser compatibility',
];

const OCCT_ASSET_DOC_PATH = 'docs/implementation/OCCT_ASSET_STRATEGY.md';

/**
 * Manual-chunk routing rules. Each rule's `match` runs against the resolved
 * module id; the first hit decides the chunk name. Extracted from manualChunks
 * to keep that function below the eslint complexity limit (15).
 */
const MANUAL_CHUNK_RULES: Array<{ chunk: string; match: (id: string) => boolean }> = [
  {
    chunk: 'react-vendor',
    match: (id) => id.includes('node_modules/react/') || id.includes('node_modules/react-dom/'),
  },
  {
    chunk: 'router-vendor',
    match: (id) =>
      id.includes('node_modules/react-router-dom/') || id.includes('node_modules/@remix-run/'),
  },
  {
    chunk: 'reactflow-vendor',
    match: (id) =>
      id.includes('node_modules/reactflow/') || id.includes('node_modules/@reactflow/'),
  },
  {
    chunk: 'three-vendor',
    match: (id) =>
      id.includes('node_modules') &&
      (id.match(/[\\/]three[\\/]/) !== null ||
        id.match(/[\\/]three-stdlib[\\/]/) !== null ||
        id.endsWith('/three') ||
        id.endsWith('\\three')),
  },
  {
    chunk: 'animation-vendor',
    match: (id) => id.includes('node_modules/framer-motion/'),
  },
  {
    chunk: 'ui-vendor',
    match: (id) =>
      id.includes('node_modules/@dnd-kit/') ||
      id.includes('node_modules/react-resizable-panels/') ||
      id.includes('node_modules/lucide-react/'),
  },
  {
    chunk: 'state-vendor',
    match: (id) =>
      id.includes('node_modules/zustand/') ||
      id.includes('node_modules/immer/') ||
      id.includes('node_modules/comlink/'),
  },
  { chunk: 'engine-core', match: (id) => id.includes('@sim4d/engine-core') },
  { chunk: 'engine-occt', match: (id) => id.includes('@sim4d/engine-occt') },
  { chunk: 'nodes-core', match: (id) => id.includes('@sim4d/nodes-core') },
  { chunk: 'sim4d-vendor', match: (id) => id.includes('@sim4d/') },
];

function resolveManualChunk(id: string): string | undefined {
  for (const rule of MANUAL_CHUNK_RULES) {
    if (rule.match(id)) return rule.chunk;
  }
  return undefined;
}

interface SuppressedLogDescriptor {
  onceKey: string;
  test(message: string): boolean;
  info: string;
}

const SUPPRESSED_BUILD_LOGS: SuppressedLogDescriptor[] = [
  {
    onceKey: 'occt-worker-url',
    test: (message) =>
      message.includes('../engine-occt/dist/worker.mjs') &&
      message.includes("doesn't exist at build time"),
    info: `[studio-build] Worker URL resolved at runtime via start-studio-preview (documented in ${OCCT_ASSET_DOC_PATH})`,
  },
  {
    onceKey: 'occt-wasm-url',
    test: (message) =>
      message.includes('../wasm/') && message.includes("doesn't exist at build time"),
    info: `[studio-build] OCCT wasm assets are located at runtime by wasmAssetsPlugin (see ${OCCT_ASSET_DOC_PATH})`,
  },
  {
    onceKey: 'node-polyfills',
    test: (message) => NODE_BUILTIN_WARNING_PATTERNS.some((pattern) => message.includes(pattern)),
    info: `[studio-build] Node built-in imports are redirected to browser mocks for OCCT (see ${OCCT_ASSET_DOC_PATH})`,
  },
  {
    onceKey: 'chunk-size-limit',
    test: (message) => message.includes('chunks are larger than') && message.includes('kB'),
    info: `[studio-build] Large chunks expected for CAD application with geometry engine (configured limit: 800KB)`,
  },
];

function suppressOcctWarnings(): Plugin {
  return {
    name: 'sim4d-occt-warning-filter',
    apply: 'build',
    configResolved(config) {
      const originalWarn = config.logger.warn.bind(config.logger);
      const originalWarnOnce = config.logger.warnOnce.bind(config.logger);
      const originalInfo = config.logger.info.bind(config.logger);
      const seen = new Set<string>();

      const suppress = (msg: any): boolean => {
        const text = typeof msg === 'string' ? msg : (msg?.message ?? '');
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

          originalConsoleWarn?.apply(console, args as unknown);
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
  plugins: [
    wasmWorkerFixPlugin(), // Must run first to fix worker calls in WASM files
    react({
      // Use automatic JSX runtime (no need to import React in every file)
      jsxRuntime: 'automatic',
      // Skip detection issues by explicitly including all source files
      include: '**/*.{jsx,tsx}',
    }),
    wasmPlugin(),
    nodePolyfillsPlugin(),
    wasmAssetsPlugin(),
    suppressOcctWarnings(),
  ],
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

      // SECURITY: Content Security Policy
      // Note: 'unsafe-inline' is allowed in development for React Fast Refresh (HMR)
      // Production builds use strict CSP without inline scripts
      // frame-ancestors: allows the Selva Atrium (selva-office consumer feature) to
      // embed the Studio. Same operator (Innovaciones MADFAM) on both sides.
      'Content-Security-Policy': [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval'", // unsafe-inline required for React Fast Refresh in dev
        "worker-src 'self' blob:",
        "style-src 'self' 'unsafe-inline'", // unsafe-inline needed for React/CSS-in-JS
        "img-src 'self' data: blob:",
        "font-src 'self' data:",
        "connect-src 'self' ws: wss:", // WebSocket for dev server HMR
        "frame-ancestors 'self' https://selva.town https://*.selva.town https://*.madfam.io",
        "base-uri 'self'",
        "form-action 'self'",
      ].join('; '),

      // SECURITY: Additional security headers
      // X-Frame-Options downgraded from DENY to SAMEORIGIN as a legacy fallback
      // for the Selva Atrium iframe pattern; modern browsers honor frame-ancestors.
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'SAMEORIGIN',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
    },
    fs: {
      // Allow serving files from the entire monorepo
      allow: [
        resolve(configDir, '../..'), // Project root
        resolve(configDir, '../../packages'), // Packages directory
        resolve(configDir, '../../packages/nodes-core'), // nodes-core package
        resolve(configDir, '../../packages/engine-core'), // engine-core package
        resolve(configDir, '../../packages/engine-occt'), // engine-occt package
        resolve(configDir, '../../packages/types'), // types package
        resolve(configDir, '../../packages/viewport'), // viewport package
      ],
    },
  },
  preview: {
    host: '127.0.0.1',
    port: 5173,
    strictPort: true,
    headers: {
      // Required for SharedArrayBuffer/WASM threads
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',

      // SECURITY: Content Security Policy (same as dev server)
      // frame-ancestors: see dev server comment above — Selva Atrium allowance.
      'Content-Security-Policy': [
        "default-src 'self'",
        "script-src 'self' 'wasm-unsafe-eval'",
        "worker-src 'self' blob:",
        "style-src 'self' 'unsafe-inline'",
        "img-src 'self' data: blob:",
        "font-src 'self' data:",
        "connect-src 'self' ws: wss:",
        "frame-ancestors 'self' https://selva.town https://*.selva.town https://*.madfam.io",
        "base-uri 'self'",
        "form-action 'self'",
      ].join('; '),

      // SECURITY: Additional security headers
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'SAMEORIGIN',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
    },
  },
  worker: {
    format: 'es',
  },
  resolve: {
    alias: {
      '@': resolve(configDir, './src'),
      // Sim4D package aliases for monorepo - point to source index files
      '@sim4d/nodes-core': resolve(configDir, '../../packages/nodes-core/src/index.ts'),
      '@sim4d/engine-core': resolve(configDir, '../../packages/engine-core/src/index.ts'),
      '@sim4d/engine-occt': resolve(configDir, '../../packages/engine-occt/src/index.ts'),
      '@sim4d/types': resolve(configDir, '../../packages/types/src/index.ts'),
      '@sim4d/viewport': resolve(configDir, '../../packages/viewport/src/index.ts'),
      // Polyfills
      'xxhash-wasm': resolve(configDir, './src/polyfills/xxhash-mock.ts'),
      uuid: resolve(configDir, './src/polyfills/uuid-mock.ts'),
      path: resolve(configDir, './src/polyfills/path-mock.ts'),
      url: resolve(configDir, './src/polyfills/url-mock.ts'),
      fs: resolve(configDir, './src/polyfills/fs-mock.ts'),
      crypto: resolve(configDir, './src/polyfills/crypto-mock.ts'),
    },
  },
  optimizeDeps: {
    exclude: ['@sim4d/engine-occt'], // Exclude WASM modules from optimization
    include: ['path', 'url', 'fs', 'crypto', 'uuid', 'xxhash-wasm'], // Force inclusion of polyfilled modules
  },
  ssr: {
    noExternal: ['path', 'url', 'fs', 'crypto', 'uuid', 'xxhash-wasm'], // Prevent externalization
  },
  build: {
    target: 'esnext',
    outDir: 'dist',
    sourcemap: true,
    chunkSizeWarningLimit: 1000, // Increase warning limit for CAD application with geometry engine (largest chunk: ~973KB)
    // @ts-expect-error - onLog is valid Vite config but not in BuildOptions type
    onLog(level, log, handler) {
      if (level === 'warn') {
        const text = typeof log === 'string' ? log : (log?.message ?? '');
        const descriptor = SUPPRESSED_BUILD_LOGS.find((entry) => entry.test(text));

        if (descriptor) {
          if (!seenSuppressedBuildLogs.has(descriptor.onceKey)) {
            console.info(descriptor.info);
            seenSuppressedBuildLogs.add(descriptor.onceKey);
          }
          return;
        }

        // Additional check for chunk size warnings in log.frame
        if (typeof log === 'object' && log !== null && 'frame' in log) {
          const frame = String(log.frame || '');
          if (frame.includes('chunks are larger than') || frame.includes('kB after minification')) {
            console.info(
              '[studio-build] Large chunks expected for CAD application with geometry engine (configured limit: 800KB)'
            );
            return;
          }
        }
      }

      handler(level, log);
    },
    rollupOptions: {
      onwarn(warning, defaultHandler) {
        const messageText = typeof warning.message === 'string' ? warning.message : '';

        // Suppress chunk size warnings - we've configured a higher limit (800KB) for CAD application
        // Rollup's default warning threshold is 500KB, but our chunks are expected to be larger
        if (warning.code === 'CHUNK_SIZE' || messageText.includes('chunks are larger than')) {
          return; // Suppress - configured limit is 800KB in chunkSizeWarningLimit
        }

        // Suppress WASM chunk warnings
        const shouldSuppressWasmChunkWarning =
          ['FILE_SIZE', 'LARGE_BUNDLE', 'LARGE_DYNAMIC_IMPORT_CHUNK'].includes(
            warning.code ?? ''
          ) && messageText.includes('.wasm');

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
        manualChunks: (id) => resolveManualChunk(id),
        // Optimize chunk names for better caching
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId
            ? chunkInfo.facadeModuleId.split('/').pop()
            : 'chunk';
          return `assets/${facadeModuleId}-[hash].js`;
        },
      },
    },
  },
});
