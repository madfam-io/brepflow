/**
 * OCCT WASM Module Loader
 * Handles loading and initialization of the real OCCT WebAssembly module
 */

declare function createOCCTCoreModule(config?: any): Promise<any>;

/**
 * Load and initialize the OCCT WASM module
 */
export async function loadOCCTModule(): Promise<any> {
  try {
    // Try to load the real WASM module
    const wasmPath = new URL('../wasm/occt-core.js', import.meta.url).href;

    // Dynamic import to handle build-time resolution
    const module = await import(wasmPath);
    const createModule = module.default || module.createOCCTCoreModule || module;

    if (typeof createModule !== 'function') {
      throw new Error('Invalid OCCT module format');
    }

    // Initialize the module with configuration
    const occtModule = await createModule({
      locateFile: (path: string) => {
        if (path.endsWith('.wasm')) {
          return new URL(`../wasm/${path}`, import.meta.url).href;
        }
        return path;
      },

      // Memory configuration
      INITIAL_MEMORY: 256 * 1024 * 1024, // 256MB
      MAXIMUM_MEMORY: 1024 * 1024 * 1024, // 1GB
      ALLOW_MEMORY_GROWTH: true,

      // Runtime callbacks
      onRuntimeInitialized: () => {
        console.log('[OCCT] Runtime initialized successfully');
      },

      print: (text: string) => {
        console.log('[OCCT]', text);
      },

      printErr: (text: string) => {
        console.error('[OCCT Error]', text);
      }
    });

    console.log('[OCCT] Module loaded successfully');
    return occtModule;

  } catch (error) {
    console.error('[OCCT] Failed to load WASM module:', error);
    throw error;
  }
}

/**
 * Check if OCCT WASM is available
 */
export async function isOCCTAvailable(): Promise<boolean> {
  try {
    const response = await fetch(new URL('../wasm/occt-core.wasm', import.meta.url).href, {
      method: 'HEAD'
    });
    return response.ok;
  } catch {
    return false;
  }
}