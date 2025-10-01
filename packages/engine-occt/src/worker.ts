/**
 * OCCT.wasm worker for real geometry operations
 *
 * CRITICAL: This worker MUST use real OCCT geometry in production and development.
 * Mock geometry is ONLY allowed when explicitly in test mode.
 */

import { loadOCCT } from './occt-bindings';
import { MockGeometry } from './mock-geometry';
import { occtProductionAPI } from './occt-production';
import type { WorkerRequest, WorkerResponse } from './worker-types';

// Determine if we're in test mode (ONLY place where mock is acceptable)
const isTestMode = typeof process !== 'undefined' && process.env?.NODE_ENV === 'test';

let occtModule: any = null;
let isInitialized = false;
let useProduction = false;
let useMockForTesting = false;
const mockGeometry = new MockGeometry(); // ONLY for explicit test mode

// Handle messages from main thread
self.addEventListener('message', async (event: MessageEvent<WorkerRequest>) => {
  const request = event.data;

  try {
    let result: any;

    switch (request.type) {
      case 'INIT':
        if (!isInitialized) {
          // 1. Try production API first (preferred for real OCCT operations)
          try {
            console.log('[OCCT Worker] Attempting production API initialization...');
            await occtProductionAPI.ensureInitialized();
            useProduction = true;
            isInitialized = true;
            console.log('✅ OCCT worker initialized with production API (real geometry)');
          } catch (prodError) {
            console.warn('[OCCT Worker] Production API failed:', prodError);

            // 2. Try fallback to standard bindings
            try {
              console.log('[OCCT Worker] Attempting fallback bindings...');
              occtModule = await loadOCCT();
              isInitialized = true;
              useProduction = false;
              console.log('✅ OCCT worker initialized with fallback bindings (real geometry)');
            } catch (bindError: unknown) {
              console.error('[OCCT Worker] Fallback bindings also failed:', bindError);

              // 3. CRITICAL: Only use mock if explicitly in test mode
              if (isTestMode) {
                console.warn('[OCCT Worker] In test mode - using mock geometry');
                await mockGeometry.init();
                isInitialized = true;
                useMockForTesting = true;
              } else {
                // FAIL COMPLETELY - no mock in production/development
                const errorMsg = 'CRITICAL: Failed to initialize real OCCT geometry. Mock fallback is not allowed in production/development.';
                console.error(errorMsg);
                throw new Error(errorMsg);
              }
            }
          }
        }
        result = {
          initialized: isInitialized,
          production: useProduction,
          mockMode: useMockForTesting,
          testMode: isTestMode
        };
        break;

      case 'CREATE_LINE':
        // These operations are not yet implemented in production
        if (useMockForTesting) {
          result = mockGeometry.createLine(
            request.params.start,
            request.params.end
          );
        } else {
          throw new Error('CREATE_LINE not yet implemented in real OCCT');
        }
        break;

      case 'CREATE_CIRCLE':
        if (useMockForTesting) {
          result = mockGeometry.createCircle(
            request.params.center,
            request.params.radius,
            request.params.normal
          );
        } else {
          throw new Error('CREATE_CIRCLE not yet implemented in real OCCT');
        }
        break;

      case 'CREATE_RECTANGLE':
        if (useMockForTesting) {
          result = mockGeometry.createBox(
            request.params.center,
            request.params.width,
            request.params.height,
            1
          );
        } else {
          throw new Error('CREATE_RECTANGLE not yet implemented in real OCCT');
        }
        break;

      case 'MAKE_BOX':
        if (useProduction && isInitialized) {
          // Use production API for real OCCT operations
          const response = await occtProductionAPI.execute({
            id: request.id || 'box',
            type: 'MAKE_BOX',
            params: request.params
          });
          result = response.result;
        } else if (isInitialized && occtModule) {
          const occtShape = occtModule.makeBox(
            request.params.width,
            request.params.height,
            request.params.depth
          );

          // Transform OCCT handle to our standard format
          result = {
            id: occtShape.id,
            type: occtShape.type,
            bbox: {
              min: {
                x: occtShape.bbox_min_x,
                y: occtShape.bbox_min_y,
                z: occtShape.bbox_min_z
              },
              max: {
                x: occtShape.bbox_max_x,
                y: occtShape.bbox_max_y,
                z: occtShape.bbox_max_z
              }
            }
          };
        } else if (useMockForTesting) {
          // ONLY use mock in explicit test mode
          result = mockGeometry.createBox(
            request.params.center,
            request.params.width,
            request.params.height,
            request.params.depth
          );
        } else {
          throw new Error('Real OCCT not initialized - cannot create box');
        }
        break;

      case 'MAKE_CYLINDER':
        if (isInitialized && occtModule) {
          const occtShape = occtModule.makeCylinder(
            request.params.radius,
            request.params.height
          );

          // Transform OCCT handle to our standard format
          result = {
            id: occtShape.id,
            type: occtShape.type,
            bbox: {
              min: {
                x: occtShape.bbox_min_x,
                y: occtShape.bbox_min_y,
                z: occtShape.bbox_min_z
              },
              max: {
                x: occtShape.bbox_max_x,
                y: occtShape.bbox_max_y,
                z: occtShape.bbox_max_z
              }
            }
          };
        } else if (useMockForTesting) {
          result = mockGeometry.createCylinder(
            request.params.center,
            request.params.axis,
            request.params.radius,
            request.params.height
          );
        } else {
          throw new Error('Real OCCT not initialized - cannot create cylinder');
        }
        break;

      case 'MAKE_SPHERE':
        if (isInitialized && occtModule) {
          const occtShape = occtModule.makeSphere(request.params.radius);

          // Transform OCCT handle to our standard format
          result = {
            id: occtShape.id,
            type: occtShape.type,
            bbox: {
              min: {
                x: occtShape.bbox_min_x,
                y: occtShape.bbox_min_y,
                z: occtShape.bbox_min_z
              },
              max: {
                x: occtShape.bbox_max_x,
                y: occtShape.bbox_max_y,
                z: occtShape.bbox_max_z
              }
            }
          };
        } else if (useMockForTesting) {
          result = mockGeometry.createSphere(
            request.params.center,
            request.params.radius
          );
        } else {
          throw new Error('Real OCCT not initialized - cannot create sphere');
        }
        break;

      case 'MAKE_EXTRUDE':
        if (useMockForTesting) {
          result = mockGeometry.extrude(
            request.params.profile,
            request.params.direction,
            request.params.distance
          );
        } else {
          throw new Error('MAKE_EXTRUDE not yet implemented in real OCCT');
        }
        break;

      case 'BOOLEAN_UNION':
        if (isInitialized && occtModule && request.params.shapes.length >= 2) {
          let unionResult = request.params.shapes[0];
          for (let i = 1; i < request.params.shapes.length; i++) {
            const occtShape = occtModule.booleanUnion(unionResult!.id, request.params.shapes[i]!.id);
            unionResult = {
              id: occtShape.id,
              type: occtShape.type,
              bbox: {
                min: {
                  x: occtShape.bbox_min_x,
                  y: occtShape.bbox_min_y,
                  z: occtShape.bbox_min_z
                },
                max: {
                  x: occtShape.bbox_max_x,
                  y: occtShape.bbox_max_y,
                  z: occtShape.bbox_max_z
                }
              }
            };
          }
          result = unionResult;
        } else if (useMockForTesting) {
          result = mockGeometry.booleanUnion(request.params.shapes);
        } else {
          throw new Error('Real OCCT not initialized - cannot perform BOOLEAN_UNION');
        }
        break;

      case 'BOOLEAN_SUBTRACT':
        if (isInitialized && occtModule) {
          let subtractResult = request.params.base;
          for (const tool of request.params.tools) {
            const occtShape = occtModule.booleanSubtract(subtractResult.id, tool.id);
            subtractResult = {
              id: occtShape.id,
              type: occtShape.type,
              bbox: {
                min: {
                  x: occtShape.bbox_min_x,
                  y: occtShape.bbox_min_y,
                  z: occtShape.bbox_min_z
                },
                max: {
                  x: occtShape.bbox_max_x,
                  y: occtShape.bbox_max_y,
                  z: occtShape.bbox_max_z
                }
              }
            };
          }
          result = subtractResult;
        } else if (useMockForTesting) {
          result = mockGeometry.booleanSubtract(
            request.params.base,
            request.params.tools
          );
        } else {
          throw new Error('Real OCCT not initialized - cannot perform BOOLEAN_SUBTRACT');
        }
        break;

      case 'BOOLEAN_INTERSECT':
        if (isInitialized && occtModule && request.params.shapes.length >= 2) {
          let intersectResult = request.params.shapes[0];
          for (let i = 1; i < request.params.shapes.length; i++) {
            const occtShape = occtModule.booleanIntersect(intersectResult!.id, request.params.shapes[i]!.id);
            intersectResult = {
              id: occtShape.id,
              type: occtShape.type,
              bbox: {
                min: {
                  x: occtShape.bbox_min_x,
                  y: occtShape.bbox_min_y,
                  z: occtShape.bbox_min_z
                },
                max: {
                  x: occtShape.bbox_max_x,
                  y: occtShape.bbox_max_y,
                  z: occtShape.bbox_max_z
                }
              }
            };
          }
          result = intersectResult;
        } else if (useMockForTesting) {
          result = mockGeometry.booleanIntersect(request.params.shapes);
        } else {
          throw new Error('Real OCCT not initialized - cannot perform BOOLEAN_INTERSECT');
        }
        break;

      case 'TESSELLATE':
        if (isInitialized && occtModule) {
          const mesh = occtModule.tessellate(
            request.params.shape.id,
            request.params.deflection
          );
          result = {
            mesh,
            bbox: request.params.shape.bbox,
          };
        } else if (useMockForTesting) {
          const mesh = mockGeometry.tessellate(
            request.params.shape,
            request.params.deflection
          );
          result = {
            mesh,
            bbox: request.params.shape.bbox,
          };
        } else {
          throw new Error('Real OCCT not initialized - cannot tessellate geometry');
        }
        break;

      case 'DISPOSE':
        if (isInitialized && occtModule) {
          occtModule.deleteShape(request.params.handle);
        } else {
          mockGeometry.dispose(request.params.handle);
        }
        result = { disposed: true };
        break;

      default:
        throw new Error(`Unknown operation: ${request.type}`);
    }

    // Send success response
    const response: WorkerResponse = {
      id: request.id,
      success: true,
      result,
    };
    self.postMessage(response);

  } catch (error: unknown) {
    // Send error response
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const response: WorkerResponse = {
      id: request.id,
      success: false,
      error: {
        code: 'WORKER_ERROR',
        message: errorMessage,
        details: error,
      },
    };
    self.postMessage(response);
  }
});

// Export for TypeScript
export {};
