import { Plugin } from 'vite';
import { copyFileSync, mkdirSync, existsSync } from 'fs';
import { resolve, join } from 'path';

/**
 * Vite plugin to handle WASM assets properly
 * Copies WASM files to the public directory during build
 * and ensures they're available at runtime
 */
export function wasmAssetsPlugin(): Plugin {
  // Copy both WASM files and their JavaScript loaders
  const wasmFiles = [
    'occt-core.wasm',
    'occt.wasm',
    'occt_geometry.wasm',
    'occt-core.js',
    'occt.js',
  ];

  return {
    name: 'vite-plugin-wasm-assets',

    buildStart() {
      // In development, WASM files are served from their original location
      if (process.env.NODE_ENV === 'production') {
        const wasmSourceDir = resolve(__dirname, '../../packages/engine-occt/wasm');
        const publicDir = resolve(__dirname, 'public/wasm');

        // Create public/wasm directory if it doesn't exist
        if (!existsSync(publicDir)) {
          mkdirSync(publicDir, { recursive: true });
        }

        // Copy WASM files to public directory
        wasmFiles.forEach((file) => {
          const sourcePath = join(wasmSourceDir, file);
          const destPath = join(publicDir, file);

          if (existsSync(sourcePath)) {
            copyFileSync(sourcePath, destPath);
            console.log(`Copied ${file} to public/wasm`);
          }
        });
      }
    },

    transform(code, id) {
      // Transform dynamic imports to use the correct paths
      if (id.includes('engine-occt') && code.includes('import.meta.url')) {
        // Replace relative WASM paths with absolute public paths in production
        if (process.env.NODE_ENV === 'production') {
          const transformed = code
            .replace(/new URL\(['"]\.\.\/wasm\/([\w-]+\.wasm)['"]/g, "new URL('/wasm/$1'")
            .replace(
              /new URL\(['"]\.\.\/engine-occt\/dist\/worker\.mjs['"]/g,
              "new URL('/assets/worker.mjs'"
            );

          // Return with sourcemap to eliminate warning
          return {
            code: transformed,
            map: null, // Let Vite handle sourcemap generation
          };
        }
      }
      return null;
    },

    generateBundle(options, bundle) {
      // Ensure worker files are in the correct location
      for (const fileName in bundle) {
        if (fileName.includes('worker') && fileName.endsWith('.mjs')) {
          // Worker files should be accessible from assets
          const chunk = bundle[fileName];
          if (chunk.type === 'chunk') {
            // Ensure worker can load WASM files
            chunk.code = chunk.code.replace(
              /new URL\(['"]\.\.\/wasm\/([\w-]+\.wasm)['"]/g,
              "new URL('/wasm/$1'"
            );
          }
        }
      }
    },
  };
}
