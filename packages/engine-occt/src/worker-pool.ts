/**
 * Worker Pool Management for OCCT Operations
 * Provides concurrent geometry processing with load balancing and automatic scaling
 */

import { WorkerClient } from './worker-client';
import type { WorkerRequest, WorkerResponse, HealthCheckResult } from './worker-types';
import type { ShapeHandle, MeshData } from '@brepflow/types';

export interface PoolWorker {
  id: string;
  client: WorkerClient;
  busy: boolean;
  lastUsed: number;
  taskCount: number;
  errorCount: number;
  memoryPressure: boolean;
}

export interface PoolConfig {
  minWorkers: number;
  maxWorkers: number;
  idleTimeout: number;
  maxTasksPerWorker: number;
  healthCheckInterval: number;
  workerUrl?: string;
  memoryThreshold: number;
}

export class WorkerPool {
  private workers = new Map<string, PoolWorker>();
  private queue: Array<{
    request: any;
    resolve: (value: any) => void;
    reject: (error: any) => void;
    priority: number;
  }> = [];

  private nextWorkerId = 1;
  private healthCheckTimer: NodeJS.Timeout | null = null;
  private cleanupTimer: NodeJS.Timeout | null = null;
  private isShuttingDown = false;

  constructor(private config: PoolConfig) {
    this.startHealthChecks();
    this.startCleanupTimer();
    this.initializeMinWorkers();
  }

  /**
   * Initialize minimum number of workers
   */
  private async initializeMinWorkers(): Promise<void> {
    const initPromises = [];
    for (let i = 0; i < this.config.minWorkers; i++) {
      initPromises.push(this.createWorker());
    }
    await Promise.all(initPromises);
    console.log(`[WorkerPool] Initialized ${this.config.minWorkers} workers`);
  }

  /**
   * Create a new worker
   */
  private async createWorker(): Promise<PoolWorker> {
    const id = `worker_${this.nextWorkerId++}`;
    const client = new WorkerClient(this.config.workerUrl);

    try {
      await client.init();

      const worker: PoolWorker = {
        id,
        client,
        busy: false,
        lastUsed: Date.now(),
        taskCount: 0,
        errorCount: 0,
        memoryPressure: false,
      };

      this.workers.set(id, worker);
      console.log(`[WorkerPool] Created worker ${id}`);
      return worker;
    } catch (error) {
      console.error(`[WorkerPool] Failed to create worker ${id}:`, error);
      await client.terminate();
      throw error;
    }
  }

  /**
   * Get an available worker or create one if needed
   */
  private async getAvailableWorker(): Promise<PoolWorker> {
    // Find idle worker
    for (const worker of this.workers.values()) {
      if (!worker.busy && !worker.memoryPressure) {
        return worker;
      }
    }

    // Check if we can create more workers
    if (this.workers.size < this.config.maxWorkers) {
      return await this.createWorker();
    }

    // Wait for a worker to become available
    return new Promise((resolve, reject) => {
      const checkWorkers = () => {
        for (const worker of this.workers.values()) {
          if (!worker.busy && !worker.memoryPressure) {
            resolve(worker);
            return;
          }
        }

        // Check again after a short delay
        setTimeout(checkWorkers, 10);
      };

      checkWorkers();

      // Timeout after 30 seconds
      setTimeout(() => {
        reject(new Error('No workers available within timeout'));
      }, 30000);
    });
  }

  /**
   * Execute an operation on the pool
   */
  async execute<T = any>(
    operation: string,
    params: any,
    priority: number = 0
  ): Promise<T> {
    if (this.isShuttingDown) {
      throw new Error('Worker pool is shutting down');
    }

    return new Promise<T>(async (resolve, reject) => {
      try {
        const worker = await this.getAvailableWorker();

        // Mark worker as busy
        worker.busy = true;
        worker.lastUsed = Date.now();
        worker.taskCount++;

        try {
          const result = await worker.client.invoke<T>(operation, params);

          // Task completed successfully
          worker.busy = false;
          resolve(result);

          // Process next queued task if any
          this.processQueue();

        } catch (error) {
          worker.busy = false;
          worker.errorCount++;

          // Check if worker should be replaced due to errors
          if (worker.errorCount > 3) {
            console.warn(`[WorkerPool] Replacing worker ${worker.id} due to repeated errors`);
            this.replaceWorker(worker.id);
          }

          reject(error);
        }

      } catch (error) {
        // Could not get worker
        if (priority > 0) {
          // High priority - queue for retry
          this.queue.push({ request: { operation, params }, resolve, reject, priority });
          this.queue.sort((a, b) => b.priority - a.priority);
        } else {
          reject(error);
        }
      }
    });
  }

  /**
   * Process queued tasks
   */
  private processQueue(): void {
    if (this.queue.length === 0) return;

    const availableWorkers = Array.from(this.workers.values())
      .filter(w => !w.busy && !w.memoryPressure);

    while (this.queue.length > 0 && availableWorkers.length > 0) {
      const task = this.queue.shift()!;
      const worker = availableWorkers.shift()!;

      worker.busy = true;
      worker.lastUsed = Date.now();
      worker.taskCount++;

      worker.client.invoke(task.request.operation, task.request.params)
        .then(result => {
          worker.busy = false;
          task.resolve(result);
          this.processQueue();
        })
        .catch(error => {
          worker.busy = false;
          worker.errorCount++;
          task.reject(error);
        });
    }
  }

  /**
   * Replace a problematic worker
   */
  private async replaceWorker(workerId: string): Promise<void> {
    const worker = this.workers.get(workerId);
    if (!worker) return;

    try {
      await worker.client.terminate();
      this.workers.delete(workerId);

      // Create replacement if we're below minimum
      if (this.workers.size < this.config.minWorkers) {
        await this.createWorker();
      }
    } catch (error) {
      console.error(`[WorkerPool] Failed to replace worker ${workerId}:`, error);
    }
  }

  /**
   * Start periodic health checks
   */
  private startHealthChecks(): void {
    this.healthCheckTimer = setInterval(async () => {
      for (const [workerId, worker] of this.workers) {
        if (worker.busy) continue; // Skip busy workers

        try {
          const health = await worker.client.invoke<HealthCheckResult>('HEALTH_CHECK', {});

          // Check memory pressure
          const memoryPressure = health.memoryUsage > this.config.memoryThreshold;
          if (memoryPressure !== worker.memoryPressure) {
            worker.memoryPressure = memoryPressure;
            console.log(`[WorkerPool] Worker ${workerId} memory pressure: ${memoryPressure}`);
          }

          // Replace worker if under memory pressure and has processed many tasks
          if (memoryPressure && worker.taskCount > this.config.maxTasksPerWorker) {
            console.log(`[WorkerPool] Replacing worker ${workerId} due to memory pressure`);
            this.replaceWorker(workerId);
          }

        } catch (error) {
          console.warn(`[WorkerPool] Health check failed for worker ${workerId}:`, error);
          worker.errorCount++;

          if (worker.errorCount > 2) {
            this.replaceWorker(workerId);
          }
        }
      }
    }, this.config.healthCheckInterval);
  }

  /**
   * Start cleanup timer for idle workers
   */
  private startCleanupTimer(): void {
    this.cleanupTimer = setInterval(() => {
      const now = Date.now();
      const idleWorkers = Array.from(this.workers.values())
        .filter(w => !w.busy && (now - w.lastUsed) > this.config.idleTimeout);

      // Keep minimum workers
      const workersToRemove = idleWorkers.slice(this.config.minWorkers);

      for (const worker of workersToRemove) {
        if (this.workers.size > this.config.minWorkers) {
          console.log(`[WorkerPool] Removing idle worker ${worker.id}`);
          worker.client.terminate();
          this.workers.delete(worker.id);
        }
      }
    }, 60000); // Check every minute
  }

  /**
   * Get pool statistics
   */
  getStats() {
    const workers = Array.from(this.workers.values());
    const busyWorkers = workers.filter(w => w.busy).length;
    const totalTasks = workers.reduce((sum, w) => sum + w.taskCount, 0);
    const totalErrors = workers.reduce((sum, w) => sum + w.errorCount, 0);
    const memoryPressureWorkers = workers.filter(w => w.memoryPressure).length;

    return {
      totalWorkers: this.workers.size,
      busyWorkers,
      idleWorkers: this.workers.size - busyWorkers,
      queuedTasks: this.queue.length,
      totalTasks,
      totalErrors,
      memoryPressureWorkers,
      errorRate: totalTasks > 0 ? (totalErrors / totalTasks) * 100 : 0,
    };
  }

  /**
   * Shutdown the pool and terminate all workers
   */
  async shutdown(): Promise<void> {
    this.isShuttingDown = true;

    // Clear timers
    if (this.healthCheckTimer) {
      clearInterval(this.healthCheckTimer);
      this.healthCheckTimer = null;
    }

    if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer);
      this.cleanupTimer = null;
    }

    // Reject queued tasks
    for (const task of this.queue) {
      task.reject(new Error('Worker pool shutting down'));
    }
    this.queue.length = 0;

    // Terminate all workers
    const terminatePromises = Array.from(this.workers.values())
      .map(worker => worker.client.terminate());

    await Promise.all(terminatePromises);
    this.workers.clear();

    console.log('[WorkerPool] Shutdown complete');
  }
}

// Default pool configuration
export const DEFAULT_POOL_CONFIG: PoolConfig = {
  minWorkers: 2,
  maxWorkers: 6,
  idleTimeout: 300000, // 5 minutes
  maxTasksPerWorker: 100,
  healthCheckInterval: 30000, // 30 seconds
  memoryThreshold: 1024, // 1GB in MB
};

// Global pool instance
let globalPool: WorkerPool | null = null;

/**
 * Get or create the global worker pool
 */
export function getWorkerPool(config?: Partial<PoolConfig>): WorkerPool {
  if (!globalPool) {
    globalPool = new WorkerPool({ ...DEFAULT_POOL_CONFIG, ...config });
  }
  return globalPool;
}

/**
 * Create a new worker pool instance
 */
export function createWorkerPool(config?: Partial<PoolConfig>): WorkerPool {
  return new WorkerPool({ ...DEFAULT_POOL_CONFIG, ...config });
}

/**
 * Shutdown the global pool
 */
export async function shutdownGlobalPool(): Promise<void> {
  if (globalPool) {
    await globalPool.shutdown();
    globalPool = null;
  }
}