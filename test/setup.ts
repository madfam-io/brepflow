import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

// Extend matchers
declare global {
  namespace Vi {
    interface Assertion {
      toBeWithinRange(min: number, max: number): void;
    }
  }
}

// Add custom matchers if needed
expect.extend({
  toBeWithinRange(received: number, min: number, max: number) {
    const pass = received >= min && received <= max;
    if (pass) {
      return {
        message: () => `expected ${received} not to be within range ${min} - ${max}`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${received} to be within range ${min} - ${max}`,
        pass: false,
      };
    }
  },
});

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock browser APIs if needed
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock WebGL context for Three.js tests
HTMLCanvasElement.prototype.getContext = function(contextType: string) {
  if (contextType === 'webgl' || contextType === 'webgl2') {
    return {
      canvas: this,
      drawingBufferWidth: 800,
      drawingBufferHeight: 600,
      getExtension: () => null,
      getParameter: () => 0,
      createBuffer: () => ({}),
      createProgram: () => ({}),
      createShader: () => ({}),
      createTexture: () => ({}),
    };
  }
  return null;
} as any;