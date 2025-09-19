/**
 * Operational Transformation Engine
 * Handles conflict resolution for concurrent graph editing operations
 */

import {
  Operation,
  OperationType,
  CreateNodeOperation,
  DeleteNodeOperation,
  UpdateNodePositionOperation,
  UpdateNodeParamsOperation,
  CreateEdgeOperation,
  DeleteEdgeOperation,
  UpdateEdgeOperation,
  BatchOperation,
  OperationConflict,
  ConflictResolution,
  OperationTransformError,
} from './types';
import { NodeId, EdgeId } from '@brepflow/types';

export class OperationalTransformEngine {
  /**
   * Transform a local operation against a remote operation
   * This is the core of the OT algorithm
   */
  async transform(
    localOp: Operation,
    remoteOp: Operation
  ): Promise<Operation> {
    // Same operation - no transformation needed
    if (localOp.id === remoteOp.id) {
      return localOp;
    }

    // Operations from same user don't need transformation
    if (localOp.userId === remoteOp.userId) {
      return localOp;
    }

    // Transform based on operation types
    return this.transformByType(localOp, remoteOp);
  }

  /**
   * Transform a list of operations against another list
   */
  async transformSequence(
    localOps: Operation[],
    remoteOps: Operation[]
  ): Promise<Operation[]> {
    let transformedOps = [...localOps];

    for (const remoteOp of remoteOps) {
      transformedOps = await Promise.all(
        transformedOps.map(localOp => this.transform(localOp, remoteOp))
      );
    }

    return transformedOps;
  }

  /**
   * Detect conflicts between two operations
   */
  detectConflict(
    localOp: Operation,
    remoteOp: Operation
  ): OperationConflict | null {
    // Same timestamp operations are potential conflicts
    if (Math.abs(localOp.timestamp - remoteOp.timestamp) < 1000) {
      return this.analyzeConflict(localOp, remoteOp);
    }

    return null;
  }

  /**
   * Resolve a detected conflict
   */
  async resolveConflict(
    conflict: OperationConflict,
    strategy: 'client-wins' | 'server-wins' | 'merge' = 'merge'
  ): Promise<ConflictResolution> {
    switch (strategy) {
      case 'client-wins':
        return {
          strategy: 'client-wins',
          resolvedOperation: conflict.localOperation,
          conflictDetails: 'Local operation takes precedence',
        };

      case 'server-wins':
        return {
          strategy: 'server-wins',
          resolvedOperation: conflict.remoteOperation,
          conflictDetails: 'Remote operation takes precedence',
        };

      case 'merge':
        return this.mergeOperations(conflict);

      default:
        throw new Error(`Unknown conflict resolution strategy: ${strategy}`);
    }
  }

  // Private transformation methods
  private async transformByType(
    localOp: Operation,
    remoteOp: Operation
  ): Promise<Operation> {
    const key = `${localOp.type}_${remoteOp.type}`;

    switch (key) {
      // Node creation conflicts
      case 'CREATE_NODE_CREATE_NODE':
        return this.transformCreateNodeVsCreateNode(
          localOp as CreateNodeOperation,
          remoteOp as CreateNodeOperation
        );

      case 'CREATE_NODE_DELETE_NODE':
        return this.transformCreateNodeVsDeleteNode(
          localOp as CreateNodeOperation,
          remoteOp as DeleteNodeOperation
        );

      // Node deletion conflicts
      case 'DELETE_NODE_CREATE_NODE':
        return this.transformDeleteNodeVsCreateNode(
          localOp as DeleteNodeOperation,
          remoteOp as CreateNodeOperation
        );

      case 'DELETE_NODE_DELETE_NODE':
        return this.transformDeleteNodeVsDeleteNode(
          localOp as DeleteNodeOperation,
          remoteOp as DeleteNodeOperation
        );

      case 'DELETE_NODE_UPDATE_NODE_POSITION':
        return this.transformDeleteNodeVsUpdatePosition(
          localOp as DeleteNodeOperation,
          remoteOp as UpdateNodePositionOperation
        );

      case 'DELETE_NODE_UPDATE_NODE_PARAMS':
        return this.transformDeleteNodeVsUpdateParams(
          localOp as DeleteNodeOperation,
          remoteOp as UpdateNodeParamsOperation
        );

      // Node position update conflicts
      case 'UPDATE_NODE_POSITION_UPDATE_NODE_POSITION':
        return this.transformUpdatePositionVsUpdatePosition(
          localOp as UpdateNodePositionOperation,
          remoteOp as UpdateNodePositionOperation
        );

      case 'UPDATE_NODE_POSITION_DELETE_NODE':
        return this.transformUpdatePositionVsDeleteNode(
          localOp as UpdateNodePositionOperation,
          remoteOp as DeleteNodeOperation
        );

      // Node parameter update conflicts
      case 'UPDATE_NODE_PARAMS_UPDATE_NODE_PARAMS':
        return this.transformUpdateParamsVsUpdateParams(
          localOp as UpdateNodeParamsOperation,
          remoteOp as UpdateNodeParamsOperation
        );

      case 'UPDATE_NODE_PARAMS_DELETE_NODE':
        return this.transformUpdateParamsVsDeleteNode(
          localOp as UpdateNodeParamsOperation,
          remoteOp as DeleteNodeOperation
        );

      // Edge creation conflicts
      case 'CREATE_EDGE_CREATE_EDGE':
        return this.transformCreateEdgeVsCreateEdge(
          localOp as CreateEdgeOperation,
          remoteOp as CreateEdgeOperation
        );

      case 'CREATE_EDGE_DELETE_NODE':
        return this.transformCreateEdgeVsDeleteNode(
          localOp as CreateEdgeOperation,
          remoteOp as DeleteNodeOperation
        );

      case 'CREATE_EDGE_DELETE_EDGE':
        return this.transformCreateEdgeVsDeleteEdge(
          localOp as CreateEdgeOperation,
          remoteOp as DeleteEdgeOperation
        );

      // Edge deletion conflicts
      case 'DELETE_EDGE_CREATE_EDGE':
        return this.transformDeleteEdgeVsCreateEdge(
          localOp as DeleteEdgeOperation,
          remoteOp as CreateEdgeOperation
        );

      case 'DELETE_EDGE_DELETE_EDGE':
        return this.transformDeleteEdgeVsDeleteEdge(
          localOp as DeleteEdgeOperation,
          remoteOp as DeleteEdgeOperation
        );

      // Batch operation handling
      case 'BATCH_BATCH':
        return this.transformBatchVsBatch(
          localOp as BatchOperation,
          remoteOp as BatchOperation
        );

      default:
        // No transformation needed for non-conflicting operations
        return localOp;
    }
  }

  // Node operation transformations
  private transformCreateNodeVsCreateNode(
    localOp: CreateNodeOperation,
    remoteOp: CreateNodeOperation
  ): Operation {
    // If creating nodes with same ID, use timestamp to determine winner
    if (localOp.nodeId === remoteOp.nodeId) {
      if (localOp.timestamp > remoteOp.timestamp) {
        // Local operation wins, but needs new ID to avoid conflict
        return {
          ...localOp,
          nodeId: `${localOp.nodeId}_${localOp.timestamp}` as NodeId,
        };
      } else {
        // Remote operation wins, local operation is invalidated
        throw new OperationTransformError(
          'Node creation conflict: remote operation has precedence',
          localOp,
          remoteOp
        );
      }
    }

    // Different node IDs - check for position conflicts
    const distance = Math.sqrt(
      Math.pow(localOp.position.x - remoteOp.position.x, 2) +
      Math.pow(localOp.position.y - remoteOp.position.y, 2)
    );

    // If nodes are too close, offset the local node
    if (distance < 50) {
      return {
        ...localOp,
        position: {
          x: localOp.position.x + 60,
          y: localOp.position.y + 60,
        },
      };
    }

    return localOp;
  }

  private transformCreateNodeVsDeleteNode(
    localOp: CreateNodeOperation,
    remoteOp: DeleteNodeOperation
  ): Operation {
    // Creating a node that was just deleted - proceed normally
    return localOp;
  }

  private transformDeleteNodeVsCreateNode(
    localOp: DeleteNodeOperation,
    remoteOp: CreateNodeOperation
  ): Operation {
    // Deleting while someone creates - delete operation takes precedence
    return localOp;
  }

  private transformDeleteNodeVsDeleteNode(
    localOp: DeleteNodeOperation,
    remoteOp: DeleteNodeOperation
  ): Operation {
    // Same node being deleted - remote operation wins if it has earlier timestamp
    if (localOp.nodeId === remoteOp.nodeId) {
      if (remoteOp.timestamp < localOp.timestamp) {
        throw new OperationTransformError(
          'Node already deleted by remote operation',
          localOp,
          remoteOp
        );
      }
    }

    return localOp;
  }

  private transformDeleteNodeVsUpdatePosition(
    localOp: DeleteNodeOperation,
    remoteOp: UpdateNodePositionOperation
  ): Operation {
    // Deleting a node that someone is moving - delete takes precedence
    if (localOp.nodeId === remoteOp.nodeId) {
      return localOp; // Continue with deletion
    }

    return localOp;
  }

  private transformDeleteNodeVsUpdateParams(
    localOp: DeleteNodeOperation,
    remoteOp: UpdateNodeParamsOperation
  ): Operation {
    // Deleting a node that someone is editing - delete takes precedence
    if (localOp.nodeId === remoteOp.nodeId) {
      return localOp; // Continue with deletion
    }

    return localOp;
  }

  private transformUpdatePositionVsUpdatePosition(
    localOp: UpdateNodePositionOperation,
    remoteOp: UpdateNodePositionOperation
  ): Operation {
    // Same node being moved by different users
    if (localOp.nodeId === remoteOp.nodeId) {
      // Use timestamp to determine winner, but offset position to avoid exact overlap
      if (localOp.timestamp > remoteOp.timestamp) {
        return {
          ...localOp,
          position: {
            x: localOp.position.x + 20,
            y: localOp.position.y + 20,
          },
        };
      } else {
        throw new OperationTransformError(
          'Position update conflict: remote operation has precedence',
          localOp,
          remoteOp
        );
      }
    }

    return localOp;
  }

  private transformUpdatePositionVsDeleteNode(
    localOp: UpdateNodePositionOperation,
    remoteOp: DeleteNodeOperation
  ): Operation {
    // Moving a node that was deleted
    if (localOp.nodeId === remoteOp.nodeId) {
      throw new OperationTransformError(
        'Cannot move deleted node',
        localOp,
        remoteOp
      );
    }

    return localOp;
  }

  private transformUpdateParamsVsUpdateParams(
    localOp: UpdateNodeParamsOperation,
    remoteOp: UpdateNodeParamsOperation
  ): Operation {
    // Same node parameters being updated
    if (localOp.nodeId === remoteOp.nodeId) {
      // Merge parameter updates
      const mergedUpdates = { ...localOp.paramUpdates };
      const mergedPrevious = { ...localOp.previousValues };

      // Remote operation takes precedence for conflicting parameters
      for (const [param, value] of Object.entries(remoteOp.paramUpdates)) {
        if (param in mergedUpdates) {
          // Conflict detected - use remote value as base
          mergedPrevious[param] = value;
        }
      }

      return {
        ...localOp,
        paramUpdates: mergedUpdates,
        previousValues: mergedPrevious,
      };
    }

    return localOp;
  }

  private transformUpdateParamsVsDeleteNode(
    localOp: UpdateNodeParamsOperation,
    remoteOp: DeleteNodeOperation
  ): Operation {
    // Updating parameters of a deleted node
    if (localOp.nodeId === remoteOp.nodeId) {
      throw new OperationTransformError(
        'Cannot update parameters of deleted node',
        localOp,
        remoteOp
      );
    }

    return localOp;
  }

  // Edge operation transformations
  private transformCreateEdgeVsCreateEdge(
    localOp: CreateEdgeOperation,
    remoteOp: CreateEdgeOperation
  ): Operation {
    // Same edge being created
    if (localOp.edgeId === remoteOp.edgeId) {
      if (remoteOp.timestamp < localOp.timestamp) {
        throw new OperationTransformError(
          'Edge already created by remote operation',
          localOp,
          remoteOp
        );
      }
    }

    // Same connection points
    if (
      localOp.sourceNodeId === remoteOp.sourceNodeId &&
      localOp.sourceSocket === remoteOp.sourceSocket &&
      localOp.targetNodeId === remoteOp.targetNodeId &&
      localOp.targetSocket === remoteOp.targetSocket
    ) {
      // Duplicate connection - remote wins if earlier
      if (remoteOp.timestamp < localOp.timestamp) {
        throw new OperationTransformError(
          'Connection already exists',
          localOp,
          remoteOp
        );
      }
    }

    return localOp;
  }

  private transformCreateEdgeVsDeleteNode(
    localOp: CreateEdgeOperation,
    remoteOp: DeleteNodeOperation
  ): Operation {
    // Creating edge to/from a deleted node
    if (
      localOp.sourceNodeId === remoteOp.nodeId ||
      localOp.targetNodeId === remoteOp.nodeId
    ) {
      throw new OperationTransformError(
        'Cannot create edge to/from deleted node',
        localOp,
        remoteOp
      );
    }

    return localOp;
  }

  private transformCreateEdgeVsDeleteEdge(
    localOp: CreateEdgeOperation,
    remoteOp: DeleteEdgeOperation
  ): Operation {
    // Creating an edge that was just deleted - should be fine
    return localOp;
  }

  private transformDeleteEdgeVsCreateEdge(
    localOp: DeleteEdgeOperation,
    remoteOp: CreateEdgeOperation
  ): Operation {
    // Deleting an edge while someone creates one - delete takes precedence
    return localOp;
  }

  private transformDeleteEdgeVsDeleteEdge(
    localOp: DeleteEdgeOperation,
    remoteOp: DeleteEdgeOperation
  ): Operation {
    // Same edge being deleted
    if (localOp.edgeId === remoteOp.edgeId) {
      if (remoteOp.timestamp < localOp.timestamp) {
        throw new OperationTransformError(
          'Edge already deleted by remote operation',
          localOp,
          remoteOp
        );
      }
    }

    return localOp;
  }

  private transformBatchVsBatch(
    localOp: BatchOperation,
    remoteOp: BatchOperation
  ): Operation {
    // Transform each operation in the batch
    const transformedOps: Operation[] = [];

    for (const localSubOp of localOp.operations) {
      let transformedSubOp = localSubOp;

      for (const remoteSubOp of remoteOp.operations) {
        transformedSubOp = await this.transform(transformedSubOp, remoteSubOp);
      }

      transformedOps.push(transformedSubOp);
    }

    return {
      ...localOp,
      operations: transformedOps,
    };
  }

  // Conflict analysis
  private analyzeConflict(
    localOp: Operation,
    remoteOp: Operation
  ): OperationConflict {
    let conflictType: 'simultaneous-edit' | 'dependency-violation' | 'concurrent-deletion';
    let severity: 'low' | 'medium' | 'high';
    let autoResolvable: boolean;

    // Determine conflict type
    if (localOp.type.includes('DELETE') && remoteOp.type.includes('DELETE')) {
      conflictType = 'concurrent-deletion';
      severity = 'medium';
      autoResolvable = true;
    } else if (
      localOp.type.includes('UPDATE') &&
      remoteOp.type.includes('UPDATE')
    ) {
      conflictType = 'simultaneous-edit';
      severity = 'low';
      autoResolvable = true;
    } else {
      conflictType = 'dependency-violation';
      severity = 'high';
      autoResolvable = false;
    }

    return {
      id: `conflict_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      localOperation: localOp,
      remoteOperation: remoteOp,
      conflictType,
      severity,
      autoResolvable,
    };
  }

  // Conflict resolution through merging
  private async mergeOperations(
    conflict: OperationConflict
  ): Promise<ConflictResolution> {
    const { localOperation, remoteOperation } = conflict;

    // Handle parameter updates specially
    if (
      localOperation.type === 'UPDATE_NODE_PARAMS' &&
      remoteOperation.type === 'UPDATE_NODE_PARAMS'
    ) {
      const localParams = localOperation as UpdateNodeParamsOperation;
      const remoteParams = remoteOperation as UpdateNodeParamsOperation;

      if (localParams.nodeId === remoteParams.nodeId) {
        // Merge parameter updates
        const mergedParams = {
          ...remoteParams.paramUpdates,
          ...localParams.paramUpdates,
        };

        const resolvedOperation: UpdateNodeParamsOperation = {
          ...localParams,
          paramUpdates: mergedParams,
          previousValues: {
            ...remoteParams.previousValues,
            ...localParams.previousValues,
          },
        };

        return {
          strategy: 'merge',
          resolvedOperation,
          conflictDetails: 'Merged parameter updates from both operations',
        };
      }
    }

    // For other conflicts, use timestamp-based resolution
    const winner =
      localOperation.timestamp > remoteOperation.timestamp
        ? localOperation
        : remoteOperation;

    return {
      strategy: 'merge',
      resolvedOperation: winner,
      conflictDetails: 'Resolved using timestamp precedence',
    };
  }
}

export const operationalTransform = new OperationalTransformEngine();