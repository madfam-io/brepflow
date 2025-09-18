/**
 * Test utilities for generated node tests
 */

import { EvaluationContext } from '@brepflow/types';

/**
 * Create a mock test context for node evaluation
 */
export function createTestContext(): EvaluationContext {
  return {
    geom: {
      invoke: async (operation: string, params: any) => {
        // Mock geometry operations for testing
        console.warn(`Mock geometry operation: ${operation}`, params);

        // Return mock results based on operation
        switch (operation) {
          case 'MAKE_BOX':
            return { type: 'Shape', id: `box_${Math.random().toString(36).substr(2, 9)}` };
          case 'MAKE_SPHERE':
            return { type: 'Shape', id: `sphere_${Math.random().toString(36).substr(2, 9)}` };
          case 'MAKE_CYLINDER':
            return { type: 'Shape', id: `cylinder_${Math.random().toString(36).substr(2, 9)}` };
          case 'BOOLEAN_UNION':
          case 'BOOLEAN_SUBTRACT':
          case 'BOOLEAN_INTERSECT':
            return { type: 'Shape', id: `boolean_${Math.random().toString(36).substr(2, 9)}` };
          case 'COMMON_EDGES':
            return { edges: [] };
          default:
            throw new Error(`Mock geometry operation not implemented: ${operation}`);
        }
      }
    },
    logger: {
      info: (msg: string) => console.log(`[INFO] ${msg}`),
      warn: (msg: string) => console.warn(`[WARN] ${msg}`),
      error: (msg: string) => console.error(`[ERROR] ${msg}`)
    },
    session: {
      id: 'test-session',
      timestamp: Date.now()
    }
  };
}

/**
 * Create mock geometry for testing
 */
export function createMockGeometry(type: 'box' | 'sphere' | 'cylinder' = 'box') {
  return {
    type: 'Shape',
    id: `${type}_${Math.random().toString(36).substr(2, 9)}`,
    geometry: {
      type,
      bounds: { min: [0, 0, 0], max: [1, 1, 1] }
    }
  };
}