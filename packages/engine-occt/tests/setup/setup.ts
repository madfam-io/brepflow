/**
 * Test setup for engine-occt package
 * Configures test environment for OCCT WASM geometry tests
 */

import { vi } from 'vitest';

// Mock performance if not available
if (typeof global.performance === 'undefined') {
  global.performance = {
    now: vi.fn(() => Date.now()),
    mark: vi.fn(),
    measure: vi.fn(),
    getEntriesByName: vi.fn(() => []),
    getEntriesByType: vi.fn(() => []),
    clearMarks: vi.fn(),
    clearMeasures: vi.fn(),
  } as any;
}

// Mock crypto.randomUUID if not available
if (typeof global.crypto === 'undefined') {
  global.crypto = {
    randomUUID: vi.fn(() => 'test-uuid-' + Math.random().toString(36).substr(2, 9)),
    getRandomValues: vi.fn((arr: any) => {
      for (let i = 0; i < arr.length; i++) {
        arr[i] = Math.floor(Math.random() * 256);
      }
      return arr;
    }),
  } as any;
}

// Mock WebWorker for WASM tests
global.Worker = vi.fn().mockImplementation(() => ({
  postMessage: vi.fn(),
  terminate: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
}));

// Mock SharedArrayBuffer for WASM tests
if (typeof global.SharedArrayBuffer === 'undefined') {
  global.SharedArrayBuffer = ArrayBuffer;
}

// Mock WebAssembly for tests
if (typeof global.WebAssembly === 'undefined') {
  global.WebAssembly = {
    Module: vi.fn(),
    Instance: vi.fn(),
    Memory: vi.fn(),
    Table: vi.fn(),
    compile: vi.fn().mockResolvedValue({}),
    instantiate: vi.fn().mockResolvedValue({ instance: {}, module: {} }),
    validate: vi.fn().mockReturnValue(true),
  } as any;
}

// Mock OCCT module for tests
global.Module = vi.fn().mockImplementation(() => ({
  ready: Promise.resolve(),
  _malloc: vi.fn(),
  _free: vi.fn(),
  cwrap: vi.fn(),
  ccall: vi.fn(),
  setValue: vi.fn(),
  getValue: vi.fn(),
  UTF8ToString: vi.fn((ptr: number) => `mock-string-${ptr}`),
  stringToUTF8: vi.fn(),
  lengthBytesUTF8: vi.fn(() => 10),
}));

export {};