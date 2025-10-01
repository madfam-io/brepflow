/**
 * Test utilities for generated node tests
 */

import { EvaluationContext } from '@brepflow/types';

/**
 * Create a mock test context for node evaluation
 */
export function createTestContext(): EvaluationContext {
  return {
    // Add both old and new interface support for compatibility
    geom: {
      invoke: async (operation: string, params: any) => {
        // Mock geometry operations for testing (legacy interface)
        console.debug?.(`Mock geometry operation: ${operation}`, params);

        // Return mock results based on operation
        switch (operation) {
          case 'MAKE_BOX':
            return { type: 'Shape', id: `box_${Math.random().toString(36).substr(2, 9)}` };
          case 'MAKE_SPHERE':
            return { type: 'Shape', id: `sphere_${Math.random().toString(36).substr(2, 9)}` };
          case 'MAKE_CYLINDER':
            return { type: 'Shape', id: `cylinder_${Math.random().toString(36).substr(2, 9)}` };
          case 'MAKE_THREAD':
            return { type: 'Shape', id: `thread_${Math.random().toString(36).substr(2, 9)}` };
          case 'TRANSFORM_WRAP':
            return { type: 'Shape', id: `wrap_${Math.random().toString(36).substr(2, 9)}` };
          case 'BOOLEAN_UNION':
          case 'BOOLEAN_SUBTRACT':
          case 'BOOLEAN_INTERSECT':
            return { type: 'Shape', id: `boolean_${Math.random().toString(36).substr(2, 9)}` };
          case 'COMMON_EDGES':
            return { edges: [] };
          default:
            if (typeof operation === 'string' && operation.startsWith('MATH_')) {
              const values = Object.values(params || {}).filter((value): value is number => typeof value === 'number');
              const base = values.reduce((acc, value) => acc + value, 0);
              return base || operation.length;
            }
            throw new Error(`Mock geometry operation not implemented: ${operation}`);
        }
      }
    },
    // Add the new geometry interface that nodes expect
    geometry: {
      execute: async (operation: any) => {
        // Mock geometry operations for testing (new interface)
        console.debug?.(`Mock geometry execute:`, operation);

        // Return mock results based on operation type
        switch (operation.type) {
          case 'makeBox':
            return {
              type: 'Solid',
              id: `box_${Math.random().toString(36).substr(2, 9)}`,
              bbox: {
                min: [0, 0, 0],
                max: [operation.params.width || 100, operation.params.depth || 100, operation.params.height || 100]
              }
            };
          case 'makeSphere':
            return {
              type: 'Solid',
              id: `sphere_${Math.random().toString(36).substr(2, 9)}`,
              radius: operation.params.radius || 50
            };
          case 'makeCylinder':
            return {
              type: 'Solid',
              id: `cylinder_${Math.random().toString(36).substr(2, 9)}`,
              radius: operation.params.radius || 50,
              height: operation.params.height || 100
            };
          case 'makeThread':
            return {
              type: 'Solid',
              id: `thread_${Math.random().toString(36).substr(2, 9)}`,
              pitch: operation.params?.pitch ?? 1,
              turns: operation.params?.turns ?? 5
            };
          case 'transformWrap':
            return {
              type: 'Shape',
              id: `wrap_${Math.random().toString(36).substr(2, 9)}`,
              source: operation.params?.shape ?? null
            };
          case 'CREATE_LINEAR_PATTERN':
          case 'CREATE_CIRCULAR_PATTERN':
          case 'CREATE_RECTANGULAR_PATTERN': {
            const countPrimary = operation.params?.count
              ?? operation.params?.countX
              ?? operation.params?.count1
              ?? 1;
            const countSecondary = operation.type === 'CREATE_RECTANGULAR_PATTERN'
              ? (operation.params?.countY ?? operation.params?.count2 ?? 1)
              : 1;
            const totalInstances = Math.max(countPrimary * countSecondary, 1);
            const shapes = Array.from({ length: totalInstances }, (_, index) => ({
              id: `${operation.type.toLowerCase()}_${index}`
            }));
            return {
              shapes,
              compound: { id: `${operation.type.toLowerCase()}_compound` }
            };
          }
          case 'PROJECT_CURVE':
            return [
              {
                id: 'projected-curve',
                type: 'Wire'
              }
            ];
          case 'ISOPARAMETRIC_CURVE':
            return {
              id: 'iso-curve',
              type: 'Wire'
            };
          case 'tessellate':
            return {
              vertices: new Float32Array([0, 0, 0, 1, 0, 0, 0, 1, 0]),
              indices: new Uint32Array([0, 1, 2]),
              normals: new Float32Array([0, 0, 1, 0, 0, 1, 0, 0, 1])
            };
          case 'boolean':
            return {
              type: 'Solid',
              id: `boolean_${Math.random().toString(36).substr(2, 9)}`
            };
          default:
            if (typeof operation.type === 'string' && operation.type.startsWith('math')) {
              const paramValues = Object.values(operation.params || {}).flatMap((value: any) => {
                if (typeof value === 'number') return [value];
                if (Array.isArray(value)) {
                  return value.filter(item => typeof item === 'number');
                }
                if (value && typeof value === 'object') {
                  return Object.values(value).filter((inner: any) => typeof inner === 'number');
                }
                return [];
              });
              const base = paramValues.reduce((acc, value) => acc + value, 0);
              return base || operation.type.length;
            }
            console.warn(`Unhandled geometry operation: ${operation.type}`);
            return {
              type: 'Shape',
              id: `result_${Math.random().toString(36).substr(2, 9)}`
            };
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
