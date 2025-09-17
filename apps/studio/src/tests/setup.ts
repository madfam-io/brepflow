import { beforeAll, afterEach, afterAll, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';

// Mock global objects for testing
beforeAll(() => {
  // Mock ResizeObserver
  global.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));

  // Mock IntersectionObserver
  global.IntersectionObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));

  // Mock PerformanceObserver
  global.PerformanceObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    disconnect: vi.fn(),
  }));

  // Mock requestAnimationFrame
  global.requestAnimationFrame = vi.fn((cb) => {
    setTimeout(cb, 0);
    return 0;
  });

  global.cancelAnimationFrame = vi.fn();

  // Mock matchMedia
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });

  // Mock scrollTo
  window.scrollTo = vi.fn();

  // Mock localStorage
  const localStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  };
  global.localStorage = localStorageMock as any;

  // Mock performance.memory for performance monitoring tests
  Object.defineProperty(performance, 'memory', {
    configurable: true,
    get: () => ({
      usedJSHeapSize: 100000000,
      totalJSHeapSize: 200000000,
      jsHeapSizeLimit: 500000000,
    }),
  });

  // Mock Worker for web worker tests
  class WorkerMock {
    onmessage: ((e: MessageEvent) => void) | null = null;
    postMessage = vi.fn();
    terminate = vi.fn();
    addEventListener = vi.fn();
    removeEventListener = vi.fn();
    dispatchEvent = vi.fn();
  }
  global.Worker = WorkerMock as any;

  // Mock for web worker self
  if (typeof self === 'undefined') {
    (global as any).self = global;
  }

  // Mock console methods to reduce test output noise
  global.console = {
    ...console,
    log: vi.fn(),
    debug: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  };
});

afterEach(() => {
  vi.clearAllMocks();
});

afterAll(() => {
  vi.restoreAllMocks();
});

// Mock React components that might have issues in test environment
vi.mock('react-confetti', () => ({
  default: vi.fn(() => null),
}));

vi.mock('react-joyride', () => ({
  default: vi.fn(() => null),
}));

vi.mock('three', () => ({
  WebGLRenderer: vi.fn(),
  Scene: vi.fn(),
  PerspectiveCamera: vi.fn(),
  DirectionalLight: vi.fn(),
  AmbientLight: vi.fn(),
  GridHelper: vi.fn(),
  AxesHelper: vi.fn(),
  Vector3: vi.fn(),
  Color: vi.fn(),
}));

// Mock the worker modules to prevent issues in test environment
vi.mock('@brepflow/engine-occt', () => ({
  createOCCTEngine: vi.fn(() => ({
    execute: vi.fn(),
    dispose: vi.fn(),
  })),
  MockOCCTBinding: vi.fn(),
  getGeometryAPI: vi.fn(() => ({
    init: vi.fn().mockResolvedValue(undefined),
    initialize: vi.fn().mockResolvedValue(undefined),
    execute: vi.fn().mockResolvedValue({ success: true }),
    dispose: vi.fn(),
    isReady: vi.fn().mockResolvedValue(true),
  })),
}));

// Mock comlink for worker communication
vi.mock('comlink', () => ({
  wrap: vi.fn((worker) => ({
    execute: vi.fn(),
    dispose: vi.fn(),
  })),
  expose: vi.fn(),
  transfer: vi.fn((value) => value),
  transferHandlers: new Map(),
}));