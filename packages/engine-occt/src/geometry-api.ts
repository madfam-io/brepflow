import type { WorkerAPI, ShapeHandle, MeshData } from '@brepflow/types';
import { WorkerClient } from './worker-client';

/**
 * Geometry API - Production Ready with Real OCCT Only
 * No mock fallback - always uses real OCCT operations
 */
export class GeometryAPI implements WorkerAPI {
  private implementation: WorkerClient;

  constructor(workerUrl?: string) {
    // Always use real OCCT worker
    this.implementation = new WorkerClient(workerUrl || '/occt-worker.js');
  }

  /**
   * Initialize the API
   */
  async init(): Promise<void> {
    await this.implementation.init();
    console.log('[GeometryAPI] Initialized with real OCCT');
  }

  /**
   * Invoke geometry operation
   */
  async invoke<T = any>(operation: string, params: any): Promise<T> {
    return this.implementation.invoke(operation, params);
  }

  /**
   * Tessellate shape to mesh
   */
  async tessellate(shapeId: string, deflection: number): Promise<MeshData> {
    return await this.implementation.tessellate(shapeId, deflection);
  }

  /**
   * Dispose shape handle
   */
  async dispose(handleId: string): Promise<void> {
    return this.implementation.dispose(handleId);
  }

  /**
   * Check if using real OCCT (always true now)
   */
  isUsingRealOCCT(): boolean {
    return true;
  }

  /**
   * Get worker status
   */
  async getStatus(): Promise<any> {
    return this.implementation.invoke('HEALTH_CHECK', {});
  }

  /**
   * Terminate worker
   */
  async terminate(): Promise<void> {
    if (this.implementation) {
      this.implementation.terminate();
    }
  }
}