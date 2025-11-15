import { Plugin } from 'vite';

/**
 * Vite plugin to fix worker parsing issues in Emscripten-generated WASM files
 * Adds @vite-ignore comments to worker instantiation code in occt.js files
 * to prevent Vite from trying to parse non-static worker options
 */
export function wasmWorkerFixPlugin(): Plugin {
  return {
    name: 'wasm-worker-fix',
    enforce: 'pre', // Run before Vite's worker plugin

    transform(code, id) {
      // Only process WASM-related JavaScript files
      if (id.includes('/wasm/') && (id.endsWith('occt.js') || id.endsWith('occt-core.js'))) {
        // Add /* @vite-ignore */ comments to all new Worker() calls
        // This prevents Vite from trying to statically analyze Emscripten-generated worker code
        const fixedCode = code.replace(/new Worker\s*\(/g, 'new Worker(/* @vite-ignore */ ');

        if (fixedCode !== code) {
          console.log(`[wasm-worker-fix] Fixed worker calls in ${id.split('/').pop()}`);
        }

        return {
          code: fixedCode,
          map: null,
        };
      }

      return null; // Let other plugins handle this file
    },
  };
}
