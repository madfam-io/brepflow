/**
 * Studio Geometry API Service
 * Wraps the geometry API factory for Studio-specific use
 */

import { getGeometryAPI as getCoreGeometryAPI, GeometryAPIFactory } from '@brepflow/engine-core';
import type { WorkerAPI } from '@brepflow/types';

let apiInstance: WorkerAPI | null = null;

/**
 * Get geometry API instance for Studio
 */
export async function getGeometryAPI(forceMock = false): Promise<WorkerAPI> {
  if (apiInstance && !forceMock) {
    return apiInstance;
  }

  if (forceMock) {
    // Force mock geometry
    return GeometryAPIFactory.getAPI({ forceMode: 'mock' });
  }

  if (apiInstance) {
    return apiInstance;
  }

  // Use development-friendly API with retry logic
  apiInstance = await GeometryAPIFactory.createForUseCase('development');
  return apiInstance;
}

/**
 * Reset geometry API (useful for error recovery)
 */
export function resetGeometryAPI(): void {
  apiInstance = null;
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