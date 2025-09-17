/**
 * OCCT Web Worker - Full implementation with real OCCT operations
 * NO MOCK FALLBACK - This is production ready
 */

import { RealOCCT } from './real-occt-bindings';
import type { WorkerRequest, WorkerResponse } from './worker-types';

// Initialize with real OCCT
let occt: RealOCCT | null = null;
let isInitialized = false;

// Load OCCT WASM module - only in worker context
if (typeof importScripts !== 'undefined') {
  try {
    importScripts('/wasm/occt-core.js');
  } catch (error) {
    console.warn('[OCCTWorker] WASM not available:', error);
  }
}

// Handle worker messages
self.addEventListener('message', async (event: MessageEvent<WorkerRequest>) => {
  const request = event.data;

  try {
    let result: any;

    switch (request.type) {
      case 'INIT':
        if (!isInitialized) {
          console.log('[OCCTWorker] Initializing real OCCT...');

          occt = new RealOCCT();
          await occt.init();

          isInitialized = true;
          console.log('[OCCTWorker] Real OCCT initialized successfully');

          result = {
            initialized: true,
            useMock: false,
            version: 'OCCT 7.6.0'
          };
        } else {
          result = { initialized: true, useMock: false };
        }
        break;

      case 'HEALTH_CHECK':
        result = {
          healthy: isInitialized,
          useMock: false,
          uptime: performance.now(),
        };
        break;

      default:
        // All operations go through the real OCCT implementation
        if (!isInitialized || !occt) {
          throw new Error('OCCT not initialized');
        }

        result = await occt.invoke(request.type, request.params);
        break;
    }

    // Send success response
    const response: WorkerResponse = {
      id: request.id,
      success: true,
      result: result,
    };

    self.postMessage(response);

  } catch (error) {
    console.error('[OCCTWorker] Operation failed:', error);

    // Send error response
    const response: WorkerResponse = {
      id: request.id,
      success: false,
      error: {
        code: 'OPERATION_FAILED',
        message: error instanceof Error ? error.message : String(error),
        details: error
      },
    };

    self.postMessage(response);
  }
});

// Handle worker termination
self.addEventListener('unload', () => {
  console.log('[OCCTWorker] Worker terminating');
  // OCCT cleanup handled by RealOCCT destructor
});

console.log('[OCCTWorker] Worker ready for real OCCT operations');