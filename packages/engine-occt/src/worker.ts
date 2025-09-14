/**
 * OCCT.wasm worker for real geometry operations
 */

import { loadOCCT } from './occt-bindings';
import { MockGeometry } from './mock-geometry';
import type { WorkerRequest, WorkerResponse } from './worker-types';

let occtModule: any = null;
let isInitialized = false;
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
            occtModule = await loadOCCT();
            isInitialized = true;
            console.log('OCCT worker initialized successfully');
          } catch (error: unknown) {
            console.warn('OCCT initialization failed, falling back to mock geometry:', error);
            isInitialized = false;
          }
        }
        result = { initialized: isInitialized };
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
        if (isInitialized && occtModule) {
          result = await occtModule.makeBox(
            request.params.width,
            request.params.height,
            request.params.depth
          );
          // Add center and bbox info for compatibility
          result.bbox = {
            min: {
              x: request.params.center.x - request.params.width/2,
              y: request.params.center.y - request.params.height/2,
              z: request.params.center.z - request.params.depth/2
            },
            max: {
              x: request.params.center.x + request.params.width/2,
              y: request.params.center.y + request.params.height/2,
              z: request.params.center.z + request.params.depth/2
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
          result = await occtModule.makeCylinder(
            request.params.radius,
            request.params.height
          );
          // Add center and bbox info for compatibility
          result.bbox = {
            min: {
              x: request.params.center.x - request.params.radius,
              y: request.params.center.y - request.params.radius,
              z: request.params.center.z
            },
            max: {
              x: request.params.center.x + request.params.radius,
              y: request.params.center.y + request.params.radius,
              z: request.params.center.z + request.params.height
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
          result = await occtModule.makeSphere(request.params.radius);
          // Add center and bbox info for compatibility
          result.bbox = {
            min: {
              x: request.params.center.x - request.params.radius,
              y: request.params.center.y - request.params.radius,
              z: request.params.center.z - request.params.radius
            },
            max: {
              x: request.params.center.x + request.params.radius,
              y: request.params.center.y + request.params.radius,
              z: request.params.center.z + request.params.radius
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
            unionResult = await occtModule.booleanUnion(unionResult, request.params.shapes[i]);
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
            subtractResult = await occtModule.booleanSubtract(subtractResult, tool);
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
            intersectResult = await occtModule.booleanIntersect(intersectResult, request.params.shapes[i]);
          }
          result = intersectResult;
        } else {
          result = mockGeometry.booleanIntersect(request.params.shapes);
        }
        break;

      case 'TESSELLATE':
        if (isInitialized && occtModule) {
          const mesh = await occtModule.tessellate(
            request.params.shape,
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
        mockGeometry.dispose(request.params.handle);
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