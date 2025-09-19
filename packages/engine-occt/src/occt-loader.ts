/**
 * Enhanced OCCT WASM Module Loader with Capability Detection
 * Handles loading and initialization of the real OCCT WebAssembly module
 */

import { WASMCapabilityDetector, WASMPerformanceMonitor, type OCCTConfig } from './wasm-capability-detector';

declare function createOCCTCoreModule(config?: any): Promise<any>;

export interface LoaderOptions {
  forceMode?: 'full-occt' | 'optimized-occt' | 'mock-geometry';
  wasmBasePath?: string;
  enablePerformanceMonitoring?: boolean;
  fallbackToMock?: boolean;
}

interface CircuitBreakerState {
  failures: number;
  lastFailureTime: number;
  state: 'closed' | 'open' | 'half-open';
}

class LoaderState {
  private static circuitBreaker: CircuitBreakerState = {
    failures: 0,
    lastFailureTime: 0,
    state: 'closed'
  };

  static isCircuitOpen(): boolean {
    if (this.circuitBreaker.state === 'open') {
      const timeSinceLastFailure = Date.now() - this.circuitBreaker.lastFailureTime;
      const cooldownPeriod = 30000; // 30 seconds

      if (timeSinceLastFailure > cooldownPeriod) {
        this.circuitBreaker.state = 'half-open';
        return false;
      }
      return true;
    }
    return false;
  }

  static recordFailure(): void {
    this.circuitBreaker.failures++;
    this.circuitBreaker.lastFailureTime = Date.now();

    const failureThreshold = 3;
    if (this.circuitBreaker.failures >= failureThreshold) {
      this.circuitBreaker.state = 'open';
      console.warn('[OCCT] Circuit breaker opened due to repeated failures');
    }
  }

  static resetCircuitBreaker(): void {
    this.circuitBreaker = {
      failures: 0,
      lastFailureTime: 0,
      state: 'closed'
    };
  }
}

/**
 * Load and initialize the OCCT WASM module with enhanced capability detection
 */
export async function loadOCCTModule(options: LoaderOptions = {}): Promise<any> {
  const endMeasurement = WASMPerformanceMonitor.startMeasurement('occt-load-total');

  try {
    // Check circuit breaker
    if (LoaderState.isCircuitOpen() && options.fallbackToMock !== false) {
      console.warn('[OCCT] Circuit breaker open, falling back to mock');
      return loadMockGeometry();
    }

    // Check if running in a browser environment
    const isBrowser = typeof window !== 'undefined';
    const isWorker = typeof importScripts === 'function';

    if (!isBrowser && !isWorker) {
      // Node.js environment - use the occt_geometry.wasm for server-side
      return loadNodeJSOCCT();
    }

    // Get optimal configuration based on capabilities
    const config = options.forceMode
      ? await getConfigForMode(options.forceMode)
      : await WASMCapabilityDetector.getOptimalConfiguration();

    console.log('[OCCT] Selected configuration:', config);

    // Attempt to load based on configuration with retry logic
    let attempts = 0;
    const maxAttempts = 3;

    while (attempts < maxAttempts) {
      try {
        attempts++;
        console.log(`[OCCT] Load attempt ${attempts}/${maxAttempts} for mode: ${config.mode}`);

        let occtModule: any;

        switch (config.mode) {
          case 'full-occt':
            occtModule = await loadFullOCCTModule(config, options);
            break;
          case 'optimized-occt':
            occtModule = await loadOptimizedOCCTModule(config, options);
            break;
          case 'mock-geometry':
            occtModule = await loadMockGeometry();
            break;
          default:
            throw new Error(`Unknown OCCT mode: ${config.mode}`);
        }

        // Success - reset circuit breaker
        LoaderState.resetCircuitBreaker();

        const duration = endMeasurement();
        console.log(`[OCCT] Successfully loaded ${config.mode} in ${duration.toFixed(1)}ms`);

        return occtModule;

      } catch (error) {
        console.warn(`[OCCT] Attempt ${attempts} failed:`, error);

        if (attempts >= maxAttempts) {
          LoaderState.recordFailure();

          // Fallback to mock if enabled
          if (options.fallbackToMock !== false && config.mode !== 'mock-geometry') {
            console.warn('[OCCT] All attempts failed, falling back to mock geometry');
            return loadMockGeometry();
          }

          throw new Error(`Failed to load OCCT after ${maxAttempts} attempts: ${error.message}`);
        }

        // Wait before retry (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempts - 1) * 1000));
      }
    }

    throw new Error('Unexpected end of load attempts');

  } catch (error) {
    endMeasurement();
    console.error('[OCCT] Failed to load WASM module:', error);
    throw error;
  }
}

async function loadNodeJSOCCT(): Promise<any> {
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

async function loadFullOCCTModule(config: OCCTConfig, options: LoaderOptions): Promise<any> {
  const wasmFile = config.wasmFile;
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
    const jsUrl = new URL('../wasm/occt.js', import.meta.url).href; // Full OCCT uses occt.js
    const jsModule = await import(jsUrl);

    if (jsModule.default || jsModule.Module) {
      Module = jsModule.default || jsModule.Module;
    }
  } catch (jsError) {
    console.warn('[OCCT] No JS glue code found, using direct WASM instantiation');
  }
    
  // Configure the module with capability-aware settings
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

    // Memory configuration based on detected capabilities
    INITIAL_MEMORY: parseInt(config.memory.replace(/GB|MB/, '')) * (config.memory.includes('GB') ? 1024 * 1024 * 1024 : 1024 * 1024),
    MAXIMUM_MEMORY: 4 * 1024 * 1024 * 1024, // 4GB max
    ALLOW_MEMORY_GROWTH: true,

    // Threading support (requires COOP/COEP headers)
    USE_PTHREADS: config.useThreads,
    PTHREAD_POOL_SIZE: config.workers,

    // Runtime callbacks
    onRuntimeInitialized: function() {
      console.log('[OCCT] Full runtime initialized successfully');

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
      occtModule = await instantiateWASMDirect(wasmUrl, Module);
    }
  } else {
    occtModule = await instantiateWASMDirect(wasmUrl);
  }

  console.log('[OCCT] Full module loaded successfully', {
    hasExports: !!occtModule,
    exportCount: occtModule ? Object.keys(occtModule).length : 0
  });

  return occtModule;
}

async function loadOptimizedOCCTModule(config: OCCTConfig, options: LoaderOptions): Promise<any> {
  const wasmFile = config.wasmFile;
  const wasmUrl = new URL(`../wasm/${wasmFile}`, import.meta.url).href;

  // Check if the WASM file is accessible
  const checkResponse = await fetch(wasmUrl, { method: 'HEAD' });
  if (!checkResponse.ok) {
    throw new Error(`WASM file not accessible: ${wasmUrl}`);
  }

  // Load the JavaScript glue code if it exists
  let Module: any = {};

  try {
    // Try to load the JS glue code for optimized version
    const jsUrl = new URL('../wasm/occt-core.js', import.meta.url).href;
    const jsModule = await import(jsUrl);

    if (jsModule.default || jsModule.Module) {
      Module = jsModule.default || jsModule.Module;
    }
  } catch (jsError) {
    console.warn('[OCCT] No JS glue code found, using direct WASM instantiation');
  }

  // Configure the module with optimized settings
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

    // Optimized memory configuration
    INITIAL_MEMORY: parseInt(config.memory.replace(/GB|MB/, '')) * (config.memory.includes('GB') ? 1024 * 1024 * 1024 : 1024 * 1024),
    MAXIMUM_MEMORY: 2 * 1024 * 1024 * 1024, // 2GB max for optimized
    ALLOW_MEMORY_GROWTH: true,

    // No threading for optimized version
    USE_PTHREADS: false,

    // Runtime callbacks
    onRuntimeInitialized: function() {
      console.log('[OCCT] Optimized runtime initialized successfully');
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
    occtModule = await Module(moduleConfig);
  } else if (Module && typeof Module === 'object') {
    Object.assign(Module, moduleConfig);

    if (Module.then) {
      occtModule = await Module;
    } else if (Module.ready) {
      await Module.ready;
      occtModule = Module;
    } else {
      occtModule = await instantiateWASMDirect(wasmUrl, Module);
    }
  } else {
    occtModule = await instantiateWASMDirect(wasmUrl);
  }

  console.log('[OCCT] Optimized module loaded successfully');
  return occtModule;
}

async function loadMockGeometry(): Promise<any> {
  // Import mock geometry dynamically
  const { MockGeometry } = await import('./mock-geometry');
  const mockGeometry = new MockGeometry();
  await mockGeometry.init();

  return {
    // Wrap mock geometry in OCCT-like interface
    invoke: (operation: string, params: any) => mockGeometry.invoke(operation, params),
    tessellate: (shape: any, tolerance: number) => mockGeometry.tessellate(shape, tolerance),
    terminate: () => Promise.resolve(),
    // Mock OCCT-specific methods
    _BRepPrimAPI_MakeBox: () => 'mock_box_function',
    _BRepPrimAPI_MakeSphere: () => 'mock_sphere_function',
    _BRepPrimAPI_MakeCylinder: () => 'mock_cylinder_function',
  };
}

async function instantiateWASMDirect(wasmUrl: string, Module?: any): Promise<any> {
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

  return {
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

async function getConfigForMode(mode: string): Promise<OCCTConfig> {
  const caps = await WASMCapabilityDetector.detectCapabilities();

  const baseConfig = {
    workers: Math.min(navigator.hardwareConcurrency || 2, 4),
    enableSIMD: caps.hasSimd,
    useThreads: false,
    memory: '1GB'
  };

  switch (mode) {
    case 'full-occt':
      return {
        ...baseConfig,
        mode: 'full-occt',
        wasmFile: 'occt.wasm',
        workers: Math.min(navigator.hardwareConcurrency || 4, 8),
        memory: '2GB',
        useThreads: caps.hasThreads && caps.hasSharedArrayBuffer
      };
    case 'optimized-occt':
      return {
        ...baseConfig,
        mode: 'optimized-occt',
        wasmFile: 'occt-core.wasm'
      };
    case 'mock-geometry':
      return {
        ...baseConfig,
        mode: 'mock-geometry',
        wasmFile: '',
        workers: 1,
        memory: '512MB'
      };
    default:
      throw new Error(`Unknown forced mode: ${mode}`);
  }
}

/**
 * Check if OCCT WASM is available with enhanced detection
 */
export async function isOCCTAvailable(): Promise<{ available: boolean; mode: string; capabilities?: any }> {
  try {
    // Get capabilities first
    const capabilities = await WASMCapabilityDetector.detectCapabilities();

    // Check for different WASM files
    const wasmFiles = [
      { file: 'occt.wasm', mode: 'full-occt' },
      { file: 'occt-core.wasm', mode: 'optimized-occt' }
    ];

    for (const { file, mode } of wasmFiles) {
      try {
        const response = await fetch(new URL(`../wasm/${file}`, import.meta.url).href, {
          method: 'HEAD'
        });
        if (response.ok) {
          return { available: true, mode, capabilities };
        }
      } catch {
        continue;
      }
    }

    // No WASM available, but mock geometry is always available
    return { available: true, mode: 'mock-geometry', capabilities };
  } catch {
    return { available: true, mode: 'mock-geometry' };
  }
}

/**
 * Generate diagnostic report for OCCT loader
 */
export async function generateOCCTDiagnostics(): Promise<string> {
  const availability = await isOCCTAvailable();
  const capabilityReport = await WASMCapabilityDetector.generateCapabilityReport();
  const performanceReport = WASMPerformanceMonitor.getPerformanceReport();

  return `
=== OCCT Loader Diagnostics ===
WASM Available: ${availability.available ? '✓' : '✗'}
Recommended Mode: ${availability.mode}
Circuit Breaker State: ${LoaderState.isCircuitOpen() ? 'OPEN' : 'CLOSED'}

${capabilityReport}

${performanceReport}
  `.trim();
}