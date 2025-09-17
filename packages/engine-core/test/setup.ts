/**
 * Test setup for engine-core package
 */

import { vi } from 'vitest';

// Mock geometry API for tests
export const mockGeometryAPI = {
  invoke: vi.fn().mockResolvedValue({ success: true }),
  initialize: vi.fn().mockResolvedValue(true),
  dispose: vi.fn().mockResolvedValue(true),
};

// Mock worker context
export const mockWorkerContext = {
  geom: mockGeometryAPI,
  worker: mockGeometryAPI,
  invoke: mockGeometryAPI.invoke,
};

// Global test setup
beforeEach(() => {
  vi.clearAllMocks();
});