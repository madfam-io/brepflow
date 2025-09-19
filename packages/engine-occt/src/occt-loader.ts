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
    // Check if running in a browser environment
    const isBrowser = typeof window !== 'undefined';
    const isWorker = typeof importScripts === 'function';
    
    if (!isBrowser && !isWorker) {
      // Node.js environment - use the occt_geometry.wasm for server-side
      const fs = await import('fs');
      const path = await import('path');
      const wasmPath = path.join(__dirname, '../wasm/occt_geometry.wasm');
      const wasmBuffer = await fs.promises.readFile(wasmPath);
      
      // Create a minimal module interface for Node.js
      const wasmModule = await WebAssembly.compile(wasmBuffer);
      const instance = await WebAssembly.instantiate(wasmModule, {
        env: {
          memory: new WebAssembly.Memory({ initial: 256, maximum: 16384 }),
          __memory_base: 0,
          __table_base: 0,
          abort: () => { throw new Error('WASM abort'); },
          emscripten_resize_heap: () => false,
        }
      });
      
      return instance.exports;
    }
    
    // Browser/Worker environment - use the proper WASM module
    // We have three WASM files available, use the most appropriate one
    const wasmFile = 'occt-core.wasm'; // 9.6MB - optimized for web
    const wasmUrl = new URL(`../wasm/${wasmFile}`, import.meta.url).href;
    
    // Check if the WASM file is accessible
    const checkResponse = await fetch(wasmUrl, { method: 'HEAD' });
    if (!checkResponse.ok) {
      throw new Error(`WASM file not accessible: ${wasmUrl}`);
    }
    
    // Load the JavaScript glue code if it exists
    let Module: any = {};
    
    try {
      // Try to load the JS glue code
      const jsUrl = new URL('../wasm/occt-core.js', import.meta.url).href;
      const jsModule = await import(jsUrl);
      
      if (jsModule.default || jsModule.Module) {
        Module = jsModule.default || jsModule.Module;
      }
    } catch (jsError) {
      console.warn('[OCCT] No JS glue code found, using direct WASM instantiation');
    }
    
    // Configure the module
    const moduleConfig = {
      locateFile: (path: string) => {
        if (path.endsWith('.wasm')) {
          return wasmUrl;
        }
        if (path.endsWith('.js')) {
          return new URL(`../wasm/${path}`, import.meta.url).href;
        }
        return path;
      },
      
      // Memory configuration for optimal performance
      INITIAL_MEMORY: 256 * 1024 * 1024, // 256MB initial
      MAXIMUM_MEMORY: 2 * 1024 * 1024 * 1024, // 2GB max
      ALLOW_MEMORY_GROWTH: true,
      
      // Threading support (requires COOP/COEP headers)
      USE_PTHREADS: typeof SharedArrayBuffer !== 'undefined',
      PTHREAD_POOL_SIZE: navigator?.hardwareConcurrency || 4,
      
      // Runtime callbacks
      onRuntimeInitialized: function() {
        console.log('[OCCT] Runtime initialized successfully');
        
        // Validate that we have the expected OCCT functions
        if (this._BRepPrimAPI_MakeBox) {
          console.log('[OCCT] BRepPrimAPI_MakeBox available ✓');
        }
        if (this._BRepPrimAPI_MakeSphere) {
          console.log('[OCCT] BRepPrimAPI_MakeSphere available ✓');
        }
        if (this._BRepPrimAPI_MakeCylinder) {
          console.log('[OCCT] BRepPrimAPI_MakeCylinder available ✓');
        }
      },
      
      print: (text: string) => {
        console.log('[OCCT Output]', text);
      },
      
      printErr: (text: string) => {
        console.error('[OCCT Error]', text);
      }
    };
    
    // Initialize the module
    let occtModule: any;
    
    if (typeof Module === 'function') {
      // Module is a factory function
      occtModule = await Module(moduleConfig);
    } else if (Module && typeof Module === 'object') {
      // Module is an object, merge config
      Object.assign(Module, moduleConfig);
      
      // If Module has an initialization function
      if (Module.then) {
        occtModule = await Module;
      } else if (Module.ready) {
        await Module.ready;
        occtModule = Module;
      } else {
        // Direct instantiation
        const response = await fetch(wasmUrl);
        const wasmBuffer = await response.arrayBuffer();
        
        const wasmModule = await WebAssembly.compile(wasmBuffer);
        const imports = Module.wasmImports || {
          env: {
            memory: Module.wasmMemory || new WebAssembly.Memory({ 
              initial: 256, 
              maximum: 16384 
            }),
            __memory_base: 0,
            __table_base: 0,
            abort: () => { throw new Error('WASM abort'); }
          }
        };
        
        const instance = await WebAssembly.instantiate(wasmModule, imports);
        Module.wasmInstance = instance;
        Module.asm = instance.exports;
        occtModule = Module;
      }
    } else {
      // Fallback: Direct WebAssembly instantiation
      const response = await fetch(wasmUrl);
      const wasmBuffer = await response.arrayBuffer();
      
      const wasmModule = await WebAssembly.compile(wasmBuffer);
      const memory = new WebAssembly.Memory({ initial: 256, maximum: 16384 });
      
      const instance = await WebAssembly.instantiate(wasmModule, {
        env: {
          memory,
          __memory_base: 0,
          __table_base: 0,
          abort: () => { throw new Error('WASM abort'); },
          emscripten_resize_heap: () => false,
        },
        wasi_snapshot_preview1: {
          proc_exit: () => {},
          fd_close: () => 0,
          fd_write: () => 0,
          fd_seek: () => 0,
        }
      });
      
      occtModule = {
        ...instance.exports,
        memory,
        HEAP8: new Int8Array(memory.buffer),
        HEAP16: new Int16Array(memory.buffer),
        HEAP32: new Int32Array(memory.buffer),
        HEAPU8: new Uint8Array(memory.buffer),
        HEAPU16: new Uint16Array(memory.buffer),
        HEAPU32: new Uint32Array(memory.buffer),
        HEAPF32: new Float32Array(memory.buffer),
        HEAPF64: new Float64Array(memory.buffer),
      };
    }
    
    console.log('[OCCT] Module loaded successfully', {
      hasExports: !!occtModule,
      exportCount: occtModule ? Object.keys(occtModule).length : 0
    });
    
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