/**
 * Studio Geometry API Service
 * Wraps the geometry API factory for Studio-specific use
 */

import { GeometryAPIFactory } from '@brepflow/engine-core';
import type { WorkerAPI } from '@brepflow/types';

let apiInstance: WorkerAPI | null = null;
let initializationPromise: Promise<WorkerAPI> | null = null;

/**
 * Get geometry API instance for Studio (always real OCCT)
 */
export async function getGeometryAPI(): Promise<WorkerAPI> {
  if (apiInstance) {
    return apiInstance;
  }

  if (initializationPromise) {
    return initializationPromise;
  }

  initializationPromise = GeometryAPIFactory.getAPI({
    forceMode: 'real',
    enableRetry: true,
    retryAttempts: 2,
  }).then(api => {
    apiInstance = api;
    return api;
  }).finally(() => {
    initializationPromise = null;
  });

  return initializationPromise;
}

/**
 * Reset geometry API (useful for error recovery)
 */
export function resetGeometryAPI(): void {
  apiInstance = null;
  initializationPromise = null;
  GeometryAPIFactory.reset();
}

/**
 * Get API status for UI feedback
 */
export function getAPIStatus() {
  return GeometryAPIFactory.getStatus();
}

/**
 * Check if real geometry is available
 */
export function isRealGeometryAvailable() {
  return GeometryAPIFactory.isRealAPIAvailable();
}
