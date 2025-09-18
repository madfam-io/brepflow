/**
 * OCCT.wasm worker for real geometry operations
 */

import { loadOCCT } from './occt-bindings';
import { MockGeometry } from './mock-geometry';
import { occtProductionAPI } from './occt-production';
import type { WorkerRequest, WorkerResponse } from './worker-types';

let occtModule: any = null;
let isInitialized = false;
let useProduction = false;
const mockGeometry = new MockGeometry(); // Fallback for operations not yet implemented

// Handle messages from main thread
self.addEventListener('message', async (event: MessageEvent<WorkerRequest>) => {
  const request = event.data;

  try {
    let result: any;

    switch (request.type) {
      case 'INIT':
        if (!isInitialized) {
          try {
            // Try production API first for real OCCT operations
            await occtProductionAPI.ensureInitialized();
            useProduction = true;
            isInitialized = true;
            console.log('OCCT worker initialized with production API');
          } catch (prodError) {
            console.warn('Production API failed, trying fallback:', prodError);
            try {
              // Fallback to standard bindings
              occtModule = await loadOCCT();
              isInitialized = true;
              useProduction = false;
              console.log('OCCT worker initialized with fallback bindings');
            } catch (error: unknown) {
              console.warn('All OCCT initialization failed, using mock geometry:', error);
              isInitialized = false;
              useProduction = false;
            }
          }
        }
        result = { initialized: isInitialized, production: useProduction };
        break;

      case 'CREATE_LINE':
        result = mockGeometry.createLine(
          request.params.start,
          request.params.end
        );
        break;

      case 'CREATE_CIRCLE':
        result = mockGeometry.createCircle(
          request.params.center,
          request.params.radius,
          request.params.normal
        );
        break;

      case 'CREATE_RECTANGLE':
        result = mockGeometry.createBox(
          request.params.center,
          request.params.width,
          request.params.height,
          1
        );
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
        } else {
          result = mockGeometry.createBox(
            request.params.center,
            request.params.width,
            request.params.height,
            request.params.depth
          );
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
        } else {
          result = mockGeometry.createCylinder(
            request.params.center,
            request.params.axis,
            request.params.radius,
            request.params.height
          );
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
        } else {
          result = mockGeometry.createSphere(
            request.params.center,
            request.params.radius
          );
        }
        break;

      case 'MAKE_EXTRUDE':
        result = mockGeometry.extrude(
          request.params.profile,
          request.params.direction,
          request.params.distance
        );
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
        } else {
          result = mockGeometry.booleanUnion(request.params.shapes);
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
        } else {
          result = mockGeometry.booleanSubtract(
            request.params.base,
            request.params.tools
          );
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
        } else {
          result = mockGeometry.booleanIntersect(request.params.shapes);
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
        } else {
          const mesh = mockGeometry.tessellate(
            request.params.shape,
            request.params.deflection
          );
          result = {
            mesh,
            bbox: request.params.shape.bbox,
          };
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