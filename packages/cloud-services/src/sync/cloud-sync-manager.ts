/**
 * Cloud Sync Manager
 * Handles real-time project synchronization with conflict resolution
 */

import EventEmitter from 'events';
import {
  ProjectId,
  UserId,
  DeviceId,
  CloudOperation,
  SyncState,
  SyncDelta,
  VersionVector,
  ConflictResolution,
  ConflictResolutionStrategy,
  SyncStatus,
} from '@brepflow/cloud-api/src/types';
import { OperationalTransformEngine } from '@brepflow/engine-core';
import { GraphInstance } from '@brepflow/types';

const isCloudSyncEnabled = (): boolean => {
  if (typeof process !== 'undefined' && process.env && 'BREPFLOW_ENABLE_CLOUD_SYNC' in process.env) {
    return process.env.BREPFLOW_ENABLE_CLOUD_SYNC === 'true';
  }

  if (typeof globalThis !== 'undefined' && '__BREPFLOW_ENABLE_CLOUD_SYNC__' in (globalThis as any)) {
    return Boolean((globalThis as any).__BREPFLOW_ENABLE_CLOUD_SYNC__);
  }

  return false;
};

export interface CloudSyncConfig {
  apiEndpoint: string;
  deviceId: DeviceId;
  userId: UserId;
  syncInterval: number; // ms
  maxRetries: number;
  batchSize: number;
  compressionEnabled: boolean;
  conflictResolution: ConflictResolutionStrategy;
}

export interface SyncResult {
  success: boolean;
  syncState: SyncState;
  appliedOperations: CloudOperation[];
  conflicts: ConflictResolution[];
  error?: string;
}

export class CloudSyncManager extends EventEmitter {
  private config: CloudSyncConfig;
  private operationalTransform: OperationalTransformEngine;
  private syncStates = new Map<ProjectId, SyncState>();
  private operationQueues = new Map<ProjectId, CloudOperation[]>();
  private syncTimers = new Map<ProjectId, NodeJS.Timeout>();
  private isOnline = true;
  private retryAttempts = new Map<ProjectId, number>();

  constructor(config: CloudSyncConfig) {
    super();
    if (!isCloudSyncEnabled()) {
      throw new Error('Cloud sync is disabled. Set BREPFLOW_ENABLE_CLOUD_SYNC=true (or window.__BREPFLOW_ENABLE_CLOUD_SYNC__ = true) to enable this experimental feature.');
    }
    this.config = config;
    this.operationalTransform = new OperationalTransformEngine();
    this.setupNetworkMonitoring();
  }

  /**
   * Initialize sync for a project
   */
  async initializeProject(projectId: ProjectId, graph: GraphInstance): Promise<void> {
    try {
      // Create initial sync state
      const syncState: SyncState = {
        lastSync: new Date(0),
        deviceId: this.config.deviceId,
        localVersion: this.createVersionVector(projectId),
        remoteVersion: await this.fetchRemoteVersion(projectId),
        pendingOperations: [],
        conflictResolution: this.config.conflictResolution,
        syncStatus: 'offline',
      };

      this.syncStates.set(projectId, syncState);
      this.operationQueues.set(projectId, []);

      // Perform initial sync
      await this.performFullSync(projectId, graph);

      // Start periodic sync
      this.startPeriodicSync(projectId);

      this.emit('project-initialized', { projectId, syncState });
    } catch (error) {
      this.emit('sync-error', { projectId, error: error.message });
      throw error;
    }
  }

  /**
   * Queue an operation for sync
   */
  async queueOperation(projectId: ProjectId, operation: CloudOperation): Promise<void> {
    const queue = this.operationQueues.get(projectId);
    if (!queue) {
      throw new Error(`Project ${projectId} not initialized for sync`);
    }

    // Add version vector information
    operation.versionVector = this.createVersionVector(projectId, operation.id);
    operation.deviceId = this.config.deviceId;
    operation.userId = this.config.userId;

    queue.push(operation);

    // Update local version
    const syncState = this.syncStates.get(projectId)!;
    syncState.localVersion = operation.versionVector;
    syncState.pendingOperations.push(operation);

    this.emit('operation-queued', { projectId, operation });

    // Trigger immediate sync for critical operations
    if (this.isCriticalOperation(operation)) {
      await this.syncProject(projectId);
    }
  }

  /**
   * Perform sync for a project
   */
  async syncProject(projectId: ProjectId): Promise<SyncResult> {
    const syncState = this.syncStates.get(projectId);
    if (!syncState) {
      throw new Error(`Project ${projectId} not initialized`);
    }

    if (!this.isOnline) {
      syncState.syncStatus = 'offline';
      return {
        success: false,
        syncState,
        appliedOperations: [],
        conflicts: [],
        error: 'Offline',
      };
    }

    try {
      syncState.syncStatus = 'syncing';
      this.emit('sync-started', { projectId });

      // Get operations to send and receive
      const { toSend, toReceive } = await this.calculateSyncDelta(projectId);

      // Send local operations
      if (toSend.length > 0) {
        await this.sendOperations(projectId, toSend);
      }

      // Process incoming operations
      const { appliedOperations, conflicts } = await this.processIncomingOperations(
        projectId,
        toReceive
      );

      // Update sync state
      syncState.lastSync = new Date();
      syncState.syncStatus = conflicts.length > 0 ? 'conflict' : 'synced';
      syncState.pendingOperations = syncState.pendingOperations.filter(
        op => !toSend.some(sent => sent.id === op.id)
      );

      this.retryAttempts.delete(projectId);

      const result: SyncResult = {
        success: true,
        syncState,
        appliedOperations,
        conflicts,
      };

      this.emit('sync-completed', { projectId, result });
      return result;

    } catch (error) {
      syncState.syncStatus = 'error';
      const retries = this.retryAttempts.get(projectId) || 0;

      if (retries < this.config.maxRetries) {
        this.retryAttempts.set(projectId, retries + 1);
        // Exponential backoff
        setTimeout(() => {
          this.syncProject(projectId);
        }, Math.pow(2, retries) * 1000);
      }

      const result: SyncResult = {
        success: false,
        syncState,
        appliedOperations: [],
        conflicts: [],
        error: error.message,
      };

      this.emit('sync-error', { projectId, error: error.message });
      return result;
    }
  }

  /**
   * Resolve conflicts manually
   */
  async resolveConflicts(
    projectId: ProjectId,
    resolutions: ConflictResolution[]
  ): Promise<void> {
    const syncState = this.syncStates.get(projectId);
    if (!syncState) {
      throw new Error(`Project ${projectId} not initialized`);
    }

    try {
      for (const resolution of resolutions) {
        await this.applyConflictResolution(projectId, resolution);
      }

      // Trigger sync after conflict resolution
      await this.syncProject(projectId);

      this.emit('conflicts-resolved', { projectId, resolutions });
    } catch (error) {
      this.emit('conflict-resolution-error', { projectId, error: error.message });
      throw error;
    }
  }

  /**
   * Get current sync status
   */
  getSyncStatus(projectId: ProjectId): SyncState | null {
    return this.syncStates.get(projectId) || null;
  }

  /**
   * Force full sync
   */
  async forceFullSync(projectId: ProjectId, graph: GraphInstance): Promise<SyncResult> {
    const syncState = this.syncStates.get(projectId);
    if (!syncState) {
      throw new Error(`Project ${projectId} not initialized`);
    }

    // Reset sync state
    syncState.lastSync = new Date(0);
    syncState.pendingOperations = [];
    syncState.localVersion = this.createVersionVector(projectId);

    return this.performFullSync(projectId, graph);
  }

  /**
   * Cleanup project sync
   */
  cleanup(projectId: ProjectId): void {
    const timer = this.syncTimers.get(projectId);
    if (timer) {
      clearInterval(timer);
      this.syncTimers.delete(projectId);
    }

    this.syncStates.delete(projectId);
    this.operationQueues.delete(projectId);
    this.retryAttempts.delete(projectId);

    this.emit('project-cleanup', { projectId });
  }

  // Private methods

  private async performFullSync(projectId: ProjectId, graph: GraphInstance): Promise<SyncResult> {
    try {
      // Get complete remote state
      const remoteState = await this.fetchRemoteProjectState(projectId);

      // Calculate difference
      const localOperations = this.generateOperationsFromGraph(graph);
      const remoteOperations = remoteState.operations;

      // Apply operational transformation
      const { appliedOperations, conflicts } = await this.processIncomingOperations(
        projectId,
        remoteOperations
      );

      // Send local operations
      if (localOperations.length > 0) {
        await this.sendOperations(projectId, localOperations);
      }

      const syncState = this.syncStates.get(projectId)!;
      syncState.syncStatus = conflicts.length > 0 ? 'conflict' : 'synced';
      syncState.lastSync = new Date();

      return {
        success: true,
        syncState,
        appliedOperations,
        conflicts,
      };
    } catch (error) {
      throw new Error(`Full sync failed: ${error.message}`);
    }
  }

  private async calculateSyncDelta(projectId: ProjectId): Promise<{
    toSend: CloudOperation[];
    toReceive: CloudOperation[];
  }> {
    const syncState = this.syncStates.get(projectId)!;

    // Get operations since last sync
    const toSend = syncState.pendingOperations.slice(0, this.config.batchSize);

    // Fetch remote operations since our last known version
    const remoteDelta = await this.fetchRemoteDelta(projectId, syncState.remoteVersion);
    const toReceive = remoteDelta.operations;

    return { toSend, toReceive };
  }

  private async processIncomingOperations(
    projectId: ProjectId,
    operations: CloudOperation[]
  ): Promise<{
    appliedOperations: CloudOperation[];
    conflicts: ConflictResolution[];
  }> {
    const appliedOperations: CloudOperation[] = [];
    const conflicts: ConflictResolution[] = [];
    const localOperations = this.operationQueues.get(projectId) || [];

    for (const remoteOp of operations) {
      // Check for conflicts with local operations
      const conflictingLocalOp = localOperations.find(localOp =>
        this.operationsConflict(localOp, remoteOp)
      );

      if (conflictingLocalOp) {
        // Handle conflict
        const resolution = await this.resolveOperationConflict(
          conflictingLocalOp,
          remoteOp,
          this.config.conflictResolution
        );
        conflicts.push(resolution);

        if (resolution.resolution !== 'local') {
          appliedOperations.push(resolution.resolvedOperation || remoteOp);
        }
      } else {
        // No conflict, apply remote operation
        await this.applyRemoteOperation(projectId, remoteOp);
        appliedOperations.push(remoteOp);
      }
    }

    return { appliedOperations, conflicts };
  }

  private async resolveOperationConflict(
    localOp: CloudOperation,
    remoteOp: CloudOperation,
    strategy: ConflictResolutionStrategy
  ): Promise<ConflictResolution> {
    switch (strategy) {
      case 'latest-wins':
        return {
          operationId: remoteOp.id,
          conflictType: 'data',
          localOperation: localOp,
          remoteOperation: remoteOp,
          resolution: localOp.timestamp > remoteOp.timestamp ? 'local' : 'remote',
          resolvedOperation: localOp.timestamp > remoteOp.timestamp ? localOp : remoteOp,
        };

      case 'auto':
        // Use operational transformation for automatic resolution
        const transformed = await this.operationalTransform.transform(
          this.convertToCollaborationOperation(localOp),
          this.convertToCollaborationOperation(remoteOp)
        );
        return {
          operationId: remoteOp.id,
          conflictType: 'data',
          localOperation: localOp,
          remoteOperation: remoteOp,
          resolution: 'merge',
          resolvedOperation: this.convertFromCollaborationOperation(transformed),
        };

      case 'manual':
      default:
        return {
          operationId: remoteOp.id,
          conflictType: 'data',
          localOperation: localOp,
          remoteOperation: remoteOp,
          resolution: 'manual',
        };
    }
  }

  private operationsConflict(op1: CloudOperation, op2: CloudOperation): boolean {
    // Check if operations affect the same resources
    if (op1.type === 'UPDATE_NODE_PARAMS' && op2.type === 'UPDATE_NODE_PARAMS') {
      return (op1.data as any).nodeId === (op2.data as any).nodeId;
    }

    if (op1.type === 'DELETE_NODE' && op2.type !== 'DELETE_NODE') {
      return (op2.data as any).nodeId === (op1.data as any).nodeId;
    }

    return false;
  }

  private createVersionVector(projectId: ProjectId, operationId?: string): VersionVector {
    return {
      deviceId: this.config.deviceId,
      timestamp: Date.now(),
      operationId: operationId || `${Date.now()}_${Math.random()}`,
      parentVersions: [],
      checksum: this.calculateChecksum(projectId),
    };
  }

  private calculateChecksum(projectId: ProjectId): string {
    // Simple checksum based on pending operations
    const operations = this.operationQueues.get(projectId) || [];
    const content = operations.map(op => op.id).join('');
    return this.simpleHash(content);
  }

  private simpleHash(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return hash.toString(36);
  }

  private isCriticalOperation(operation: CloudOperation): boolean {
    return ['DELETE_PROJECT', 'SHARE_PROJECT', 'DELETE_NODE'].includes(operation.type);
  }

  private startPeriodicSync(projectId: ProjectId): void {
    const timer = setInterval(() => {
      this.syncProject(projectId).catch(error => {
        console.error(`Periodic sync failed for ${projectId}:`, error);
      });
    }, this.config.syncInterval);

    this.syncTimers.set(projectId, timer);
  }

  private setupNetworkMonitoring(): void {
    if (typeof window !== 'undefined') {
      window.addEventListener('online', () => {
        this.isOnline = true;
        this.emit('network-status-changed', { online: true });
        // Sync all projects when back online
        for (const projectId of this.syncStates.keys()) {
          this.syncProject(projectId);
        }
      });

      window.addEventListener('offline', () => {
        this.isOnline = false;
        this.emit('network-status-changed', { online: false });
      });
    }
  }

  // API integration methods (to be implemented with actual backend)
  private async fetchRemoteVersion(projectId: ProjectId): Promise<VersionVector> {
    // TODO: Implement API call
    return {
      deviceId: 'server',
      timestamp: Date.now(),
      operationId: 'initial',
      parentVersions: [],
      checksum: '',
    };
  }

  private async fetchRemoteProjectState(projectId: ProjectId): Promise<any> {
    // TODO: Implement API call
    return { operations: [] };
  }

  private async fetchRemoteDelta(projectId: ProjectId, since: VersionVector): Promise<SyncDelta> {
    // TODO: Implement API call
    return {
      operations: [],
      versionVector: since,
      conflicts: [],
      size: 0,
      compressed: false,
    };
  }

  private async sendOperations(projectId: ProjectId, operations: CloudOperation[]): Promise<void> {
    // TODO: Implement API call
    console.log(`Sending ${operations.length} operations for project ${projectId}`);
  }

  private async applyRemoteOperation(projectId: ProjectId, operation: CloudOperation): Promise<void> {
    // TODO: Implement operation application to local graph
    this.emit('remote-operation-applied', { projectId, operation });
  }

  private async applyConflictResolution(projectId: ProjectId, resolution: ConflictResolution): Promise<void> {
    // TODO: Implement conflict resolution application
    this.emit('conflict-applied', { projectId, resolution });
  }

  private generateOperationsFromGraph(graph: GraphInstance): CloudOperation[] {
    // TODO: Generate operations from current graph state
    return [];
  }

  private convertToCollaborationOperation(cloudOp: CloudOperation): any {
    // Convert cloud operation to collaboration operation format
    return {
      id: cloudOp.id,
      type: cloudOp.type,
      userId: cloudOp.userId,
      timestamp: cloudOp.timestamp,
      version: 0,
      ...cloudOp.data,
    };
  }

  private convertFromCollaborationOperation(collabOp: any): CloudOperation {
    // Convert collaboration operation back to cloud operation format
    return {
      id: collabOp.id,
      type: collabOp.type,
      data: collabOp,
      deviceId: this.config.deviceId,
      userId: collabOp.userId,
      timestamp: collabOp.timestamp,
      versionVector: this.createVersionVector('', collabOp.id),
      dependencies: [],
    };
  }
}
