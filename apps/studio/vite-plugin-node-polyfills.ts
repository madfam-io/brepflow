/**
 * Custom Vite plugin to resolve Node.js modules to browser polyfills
 * Handles cases where aliases alone aren't sufficient
 */

import { resolve } from 'path';
import type { Plugin } from 'vite';

const NODE_MODULES_MAP = {
  path: './src/polyfills/path-mock.ts',
  url: './src/polyfills/url-mock.ts',
  fs: './src/polyfills/fs-mock.ts',
  crypto: './src/polyfills/crypto-mock.ts',
  uuid: './src/polyfills/uuid-mock.ts',
  'xxhash-wasm': './src/polyfills/xxhash-mock.ts',
};

export function nodePolyfillsPlugin(): Plugin {
  return {
    name: 'node-polyfills',
    resolveId(id) {
      // Handle direct imports of Node.js modules
      if (NODE_MODULES_MAP[id as keyof typeof NODE_MODULES_MAP]) {
        return resolve(__dirname, NODE_MODULES_MAP[id as keyof typeof NODE_MODULES_MAP]);
      }
      return null;
    },
    load(_id) {
      // Additional processing if needed
      return null;
    },
    config(config) {
      // Ensure our polyfills are not treated as external
      config.build = config.build || {};
      config.build.rollupOptions = config.build.rollupOptions || {};

      // Remove Node.js modules from external list if they exist
      if (config.build.rollupOptions.external) {
        const external = config.build.rollupOptions.external;
        if (Array.isArray(external)) {
          config.build.rollupOptions.external = external.filter((dep: string | RegExp) => {
            if (typeof dep === 'string') {
              return !Object.keys(NODE_MODULES_MAP).includes(dep);
            }
            return true; // Keep RegExp entries
          });
        }
      }
    },
  };
}
