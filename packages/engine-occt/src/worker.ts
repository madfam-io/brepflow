/**
 * Mock worker for testing without OCCT
 * This will be replaced with real OCCT.wasm worker when available
 */

import { MockGeometry } from './mock-geometry';
import type { WorkerRequest, WorkerResponse } from './worker-types';

const mockGeometry = new MockGeometry();

// Handle messages from main thread
self.addEventListener('message', async (event: MessageEvent<WorkerRequest>) => {
  const request = event.data;

  try {
    let result: any;

    switch (request.type) {
      case 'INIT':
        result = { initialized: true };
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
        result = mockGeometry.createBox(
          request.params.center,
          request.params.width,
          request.params.height,
          request.params.depth
        );
        break;

      case 'MAKE_CYLINDER':
        result = mockGeometry.createCylinder(
          request.params.center,
          request.params.axis,
          request.params.radius,
          request.params.height
        );
        break;

      case 'MAKE_SPHERE':
        result = mockGeometry.createSphere(
          request.params.center,
          request.params.radius
        );
        break;

      case 'MAKE_EXTRUDE':
        result = mockGeometry.extrude(
          request.params.profile,
          request.params.direction,
          request.params.distance
        );
        break;

      case 'BOOLEAN_UNION':
        result = mockGeometry.booleanUnion(request.params.shapes);
        break;

      case 'BOOLEAN_SUBTRACT':
        result = mockGeometry.booleanSubtract(
          request.params.base,
          request.params.tools
        );
        break;

      case 'BOOLEAN_INTERSECT':
        result = mockGeometry.booleanIntersect(request.params.shapes);
        break;

      case 'TESSELLATE':
        const mesh = mockGeometry.tessellate(
          request.params.shape,
          request.params.deflection
        );
        result = {
          mesh,
          bbox: request.params.shape.bbox,
        };
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

  } catch (error) {
    // Send error response
    const response: WorkerResponse = {
      id: request.id,
      success: false,
      error: {
        code: 'WORKER_ERROR',
        message: error.message || 'Unknown error',
        details: error,
      },
    };
    self.postMessage(response);
  }
});

// Export for TypeScript
export {};