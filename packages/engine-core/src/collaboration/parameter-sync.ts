/**
 * Real-Time Parameter Synchronization
 * Handles synchronized editing of node parameters across multiple users
 */

import {
  Operation,
  UpdateNodeParamsOperation,
  UserId,
  SessionId,
  NodeId,
  CollaborationEngine,
} from './types';

export interface ParameterChange {
  nodeId: NodeId;
  paramName: string;
  value: any;
  previousValue: any;
  userId: UserId;
  timestamp: number;
}

export interface ParameterSyncConfig {
  throttleDelay: number; // ms between parameter updates
  batchDelay: number; // ms to wait before sending batched updates
  conflictResolutionStrategy: 'last-writer-wins' | 'user-priority' | 'merge';
  enableParameterLocking: boolean;
  lockTimeout: number; // ms before parameter locks expire
}

export interface ParameterLock {
  nodeId: NodeId;
  paramName: string;
  userId: UserId;
  acquiredAt: number;
  expiresAt: number;
}

export class ParameterSynchronizer {
  private collaborationEngine: CollaborationEngine;
  private config: ParameterSyncConfig;
  private pendingChanges = new Map<string, ParameterChange>();
  private parameterLocks = new Map<string, ParameterLock>();
  private throttleTimers = new Map<string, number>();
  private batchTimer: number | null = null;
  private changeListeners = new Map<string, ((change: ParameterChange) => void)[]>();

  constructor(
    collaborationEngine: CollaborationEngine,
    config: Partial<ParameterSyncConfig> = {}
  ) {
    this.collaborationEngine = collaborationEngine;
    this.config = {
      throttleDelay: 300,
      batchDelay: 100,
      conflictResolutionStrategy: 'last-writer-wins',
      enableParameterLocking: true,
      lockTimeout: 5000,
      ...config,
    };

    this.setupCollaborationListeners();
  }

  /**
   * Update a parameter value and sync across users
   */
  async updateParameter(
    sessionId: SessionId,
    nodeId: NodeId,
    paramName: string,
    value: any,
    userId: UserId
  ): Promise<void> {
    const lockKey = this.getLockKey(nodeId, paramName);

    // Check if parameter is locked by another user
    if (this.config.enableParameterLocking) {
      const lock = this.parameterLocks.get(lockKey);
      if (lock && lock.userId !== userId && Date.now() < lock.expiresAt) {
        throw new Error(`Parameter ${paramName} is locked by another user`);
      }
    }

    // Get the current value for conflict detection
    const currentValue = await this.getCurrentParameterValue(nodeId, paramName);

    const change: ParameterChange = {
      nodeId,
      paramName,
      value,
      previousValue: currentValue,
      userId,
      timestamp: Date.now(),
    };

    // Store pending change
    const changeKey = this.getChangeKey(nodeId, paramName);
    this.pendingChanges.set(changeKey, change);

    // Throttle parameter updates
    this.throttleParameterUpdate(sessionId, changeKey, change);
  }

  /**
   * Acquire a lock on a specific parameter
   */
  async lockParameter(
    nodeId: NodeId,
    paramName: string,
    userId: UserId
  ): Promise<boolean> {
    if (!this.config.enableParameterLocking) {
      return true; // Locking disabled
    }

    const lockKey = this.getLockKey(nodeId, paramName);
    const existingLock = this.parameterLocks.get(lockKey);

    // Check if already locked by another user
    if (existingLock && existingLock.userId !== userId && Date.now() < existingLock.expiresAt) {
      return false;
    }

    // Create new lock
    const lock: ParameterLock = {
      nodeId,
      paramName,
      userId,
      acquiredAt: Date.now(),
      expiresAt: Date.now() + this.config.lockTimeout,
    };

    this.parameterLocks.set(lockKey, lock);

    // Auto-release lock after timeout
    setTimeout(() => {
      const currentLock = this.parameterLocks.get(lockKey);
      if (currentLock && currentLock.userId === userId) {
        this.parameterLocks.delete(lockKey);
      }
    }, this.config.lockTimeout);

    return true;
  }

  /**
   * Release a parameter lock
   */
  async releaseParameterLock(
    nodeId: NodeId,
    paramName: string,
    userId: UserId
  ): Promise<boolean> {
    const lockKey = this.getLockKey(nodeId, paramName);
    const lock = this.parameterLocks.get(lockKey);

    if (!lock || lock.userId !== userId) {
      return false; // No lock or not owned by user
    }

    this.parameterLocks.delete(lockKey);
    return true;
  }

  /**
   * Check if a parameter is locked
   */
  isParameterLocked(nodeId: NodeId, paramName: string, userId: UserId): boolean {
    if (!this.config.enableParameterLocking) {
      return false;
    }

    const lockKey = this.getLockKey(nodeId, paramName);
    const lock = this.parameterLocks.get(lockKey);

    if (!lock) return false;

    // Check if lock has expired
    if (Date.now() > lock.expiresAt) {
      this.parameterLocks.delete(lockKey);
      return false;
    }

    // Locked if owned by someone else
    return lock.userId !== userId;
  }

  /**
   * Get all active parameter locks
   */
  getParameterLocks(nodeId?: NodeId): ParameterLock[] {
    const locks = Array.from(this.parameterLocks.values());

    if (nodeId) {
      return locks.filter(lock => lock.nodeId === nodeId);
    }

    return locks;
  }

  /**
   * Add listener for parameter changes
   */
  addParameterChangeListener(
    nodeId: NodeId,
    paramName: string,
    listener: (change: ParameterChange) => void
  ): void {
    const key = this.getChangeKey(nodeId, paramName);
    if (!this.changeListeners.has(key)) {
      this.changeListeners.set(key, []);
    }
    this.changeListeners.get(key)!.push(listener);
  }

  /**
   * Remove parameter change listener
   */
  removeParameterChangeListener(
    nodeId: NodeId,
    paramName: string,
    listener: (change: ParameterChange) => void
  ): void {
    const key = this.getChangeKey(nodeId, paramName);
    const listeners = this.changeListeners.get(key);
    if (listeners) {
      const index = listeners.indexOf(listener);
      if (index !== -1) {
        listeners.splice(index, 1);
      }
    }
  }

  /**
   * Handle incoming parameter changes from other users
   */
  async handleRemoteParameterChange(operation: UpdateNodeParamsOperation): Promise<void> {
    // Apply the remote change
    for (const [paramName, value] of Object.entries(operation.paramUpdates)) {
      const change: ParameterChange = {
        nodeId: operation.nodeId,
        paramName,
        value,
        previousValue: operation.previousValues[paramName],
        userId: operation.userId,
        timestamp: operation.timestamp,
      };

      // Check for conflicts with pending local changes
      const localChange = this.pendingChanges.get(this.getChangeKey(operation.nodeId, paramName));
      if (localChange && localChange.timestamp > operation.timestamp - 1000) {
        // Conflict detected - resolve it
        const resolvedChange = await this.resolveParameterConflict(localChange, change);
        change.value = resolvedChange.value;
      }

      // Notify listeners
      this.notifyParameterChange(change);
    }
  }

  // Private Methods
  private setupCollaborationListeners(): void {
    this.collaborationEngine.addEventListener('operation-received', (event) => {
      if (event.data.operation.type === 'UPDATE_NODE_PARAMS') {
        this.handleRemoteParameterChange(event.data.operation as UpdateNodeParamsOperation);
      }
    });
  }

  private throttleParameterUpdate(
    sessionId: SessionId,
    changeKey: string,
    change: ParameterChange
  ): void {
    // Clear existing timer for this parameter
    const existingTimer = this.throttleTimers.get(changeKey);
    if (existingTimer) {
      clearTimeout(existingTimer);
    }

    // Set new timer
    const timer = window.setTimeout(() => {
      this.sendParameterUpdate(sessionId, change);
      this.throttleTimers.delete(changeKey);
    }, this.config.throttleDelay);

    this.throttleTimers.set(changeKey, timer);
  }

  private async sendParameterUpdate(sessionId: SessionId, change: ParameterChange): Promise<void> {
    // Create operation
    const operation: UpdateNodeParamsOperation = {
      id: `param_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: 'UPDATE_NODE_PARAMS',
      userId: change.userId,
      timestamp: change.timestamp,
      version: 0, // Will be set by collaboration engine
      nodeId: change.nodeId,
      paramUpdates: {
        [change.paramName]: change.value,
      },
      previousValues: {
        [change.paramName]: change.previousValue,
      },
    };

    // Send through collaboration engine
    await this.collaborationEngine.applyOperation(sessionId, operation);

    // Remove from pending changes
    const changeKey = this.getChangeKey(change.nodeId, change.paramName);
    this.pendingChanges.delete(changeKey);

    // Notify local listeners
    this.notifyParameterChange(change);
  }

  private async resolveParameterConflict(
    localChange: ParameterChange,
    remoteChange: ParameterChange
  ): Promise<ParameterChange> {
    switch (this.config.conflictResolutionStrategy) {
      case 'last-writer-wins':
        return localChange.timestamp > remoteChange.timestamp ? localChange : remoteChange;

      case 'user-priority':
        // Could implement user priority system here
        return localChange.timestamp > remoteChange.timestamp ? localChange : remoteChange;

      case 'merge':
        // For simple values, use last writer wins
        // For complex objects, could implement merge logic
        if (typeof localChange.value === 'object' && typeof remoteChange.value === 'object') {
          return {
            ...localChange,
            value: { ...remoteChange.value, ...localChange.value },
          };
        }
        return localChange.timestamp > remoteChange.timestamp ? localChange : remoteChange;

      default:
        return localChange;
    }
  }

  private async getCurrentParameterValue(nodeId: NodeId, paramName: string): Promise<any> {
    // This would typically query the current graph state
    // For now, return undefined as placeholder
    return undefined;
  }

  private notifyParameterChange(change: ParameterChange): void {
    const key = this.getChangeKey(change.nodeId, change.paramName);
    const listeners = this.changeListeners.get(key);
    if (listeners) {
      listeners.forEach(listener => {
        try {
          listener(change);
        } catch (error) {
          console.error('Error in parameter change listener:', error);
        }
      });
    }
  }

  private getChangeKey(nodeId: NodeId, paramName: string): string {
    return `${nodeId}:${paramName}`;
  }

  private getLockKey(nodeId: NodeId, paramName: string): string {
    return `lock:${nodeId}:${paramName}`;
  }
}

/**
 * Parameter Synchronization Hook for React Components
 */
export interface UseParameterSyncOptions {
  throttleDelay?: number;
  enableLocking?: boolean;
  onConflict?: (local: ParameterChange, remote: ParameterChange) => ParameterChange;
}

export interface ParameterSyncState {
  value: any;
  isLocked: boolean;
  lockedBy: UserId | null;
  lastModified: number;
  lastModifiedBy: UserId | null;
}

export class ParameterSyncManager {
  private synchronizer: ParameterSynchronizer;
  private sessionId: SessionId;
  private userId: UserId;
  private subscribers = new Map<string, Set<(state: ParameterSyncState) => void>>();
  private parameterStates = new Map<string, ParameterSyncState>();

  constructor(
    synchronizer: ParameterSynchronizer,
    sessionId: SessionId,
    userId: UserId
  ) {
    this.synchronizer = synchronizer;
    this.sessionId = sessionId;
    this.userId = userId;
  }

  /**
   * Subscribe to parameter changes
   */
  subscribe(
    nodeId: NodeId,
    paramName: string,
    callback: (state: ParameterSyncState) => void
  ): () => void {
    const key = this.getStateKey(nodeId, paramName);

    if (!this.subscribers.has(key)) {
      this.subscribers.set(key, new Set());
      this.setupParameterListener(nodeId, paramName);
    }

    this.subscribers.get(key)!.add(callback);

    // Return unsubscribe function
    return () => {
      const subscribers = this.subscribers.get(key);
      if (subscribers) {
        subscribers.delete(callback);
        if (subscribers.size === 0) {
          this.subscribers.delete(key);
          this.cleanupParameterListener(nodeId, paramName);
        }
      }
    };
  }

  /**
   * Update parameter value
   */
  async updateParameter(
    nodeId: NodeId,
    paramName: string,
    value: any
  ): Promise<void> {
    // Try to acquire lock first
    if (this.synchronizer.isParameterLocked(nodeId, paramName, this.userId)) {
      throw new Error('Parameter is locked by another user');
    }

    await this.synchronizer.lockParameter(nodeId, paramName, this.userId);

    try {
      await this.synchronizer.updateParameter(
        this.sessionId,
        nodeId,
        paramName,
        value,
        this.userId
      );
    } finally {
      // Release lock after update
      setTimeout(() => {
        this.synchronizer.releaseParameterLock(nodeId, paramName, this.userId);
      }, 1000);
    }
  }

  /**
   * Get current parameter state
   */
  getParameterState(nodeId: NodeId, paramName: string): ParameterSyncState | null {
    const key = this.getStateKey(nodeId, paramName);
    return this.parameterStates.get(key) || null;
  }

  /**
   * Lock parameter for editing
   */
  async lockParameter(nodeId: NodeId, paramName: string): Promise<boolean> {
    return this.synchronizer.lockParameter(nodeId, paramName, this.userId);
  }

  /**
   * Release parameter lock
   */
  async releaseParameterLock(nodeId: NodeId, paramName: string): Promise<boolean> {
    return this.synchronizer.releaseParameterLock(nodeId, paramName, this.userId);
  }

  // Private Methods
  private setupParameterListener(nodeId: NodeId, paramName: string): void {
    const key = this.getStateKey(nodeId, paramName);

    // Initialize state
    this.parameterStates.set(key, {
      value: undefined,
      isLocked: false,
      lockedBy: null,
      lastModified: 0,
      lastModifiedBy: null,
    });

    // Add listener for changes
    this.synchronizer.addParameterChangeListener(nodeId, paramName, (change) => {
      this.updateParameterState(key, change);
    });
  }

  private cleanupParameterListener(nodeId: NodeId, paramName: string): void {
    const key = this.getStateKey(nodeId, paramName);
    this.parameterStates.delete(key);
    // Remove listeners would be handled by synchronizer
  }

  private updateParameterState(key: string, change: ParameterChange): void {
    const currentState = this.parameterStates.get(key);
    if (!currentState) return;

    const newState: ParameterSyncState = {
      ...currentState,
      value: change.value,
      lastModified: change.timestamp,
      lastModifiedBy: change.userId,
      isLocked: this.synchronizer.isParameterLocked(
        change.nodeId,
        change.paramName,
        this.userId
      ),
      lockedBy: this.getParameterLockOwner(change.nodeId, change.paramName),
    };

    this.parameterStates.set(key, newState);

    // Notify subscribers
    const subscribers = this.subscribers.get(key);
    if (subscribers) {
      subscribers.forEach(callback => {
        try {
          callback(newState);
        } catch (error) {
          console.error('Error in parameter state callback:', error);
        }
      });
    }
  }

  private getParameterLockOwner(nodeId: NodeId, paramName: string): UserId | null {
    const locks = this.synchronizer.getParameterLocks(nodeId);
    const lock = locks.find(l => l.paramName === paramName);
    return lock ? lock.userId : null;
  }

  private getStateKey(nodeId: NodeId, paramName: string): string {
    return `${nodeId}:${paramName}`;
  }
}