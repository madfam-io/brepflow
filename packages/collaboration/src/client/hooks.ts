import { useCallback, useEffect, useState } from 'react';
import { useCollaboration } from './collaboration-provider';
import type { Presence, Node, Edge } from '../types';

/**
 * Hook to get and update cursor position
 */
export function useCursor() {
  const { updateCursor, presence, currentUser } = useCollaboration();
  const [localCursor, setLocalCursor] = useState({ x: 0, y: 0 });

  const setCursor = useCallback(
    (x: number, y: number) => {
      setLocalCursor({ x, y });
      updateCursor(x, y);
    },
    [updateCursor]
  );

  const otherCursors = presence
    .filter((p) => p.user.id !== currentUser.id && p.cursor)
    .map((p) => ({
      userId: p.user.id,
      userName: p.user.name,
      userColor: p.user.color,
      ...p.cursor!,
    }));

  return {
    cursor: localCursor,
    setCursor,
    otherCursors,
  };
}

/**
 * Hook to get and update selection
 */
export function useSelection() {
  const { updateSelection, presence, currentUser } = useCollaboration();
  const [localSelection, setLocalSelection] = useState<{
    nodeIds: string[];
    edgeIds: string[];
  }>({ nodeIds: [], edgeIds: [] });

  const setSelection = useCallback(
    (nodeIds: string[], edgeIds: string[]) => {
      setLocalSelection({ nodeIds, edgeIds });
      updateSelection(nodeIds, edgeIds);
    },
    [updateSelection]
  );

  const otherSelections = presence
    .filter((p) => p.user.id !== currentUser.id && p.selection)
    .map((p) => ({
      userId: p.user.id,
      userName: p.user.name,
      userColor: p.user.color,
      ...p.selection!,
    }));

  return {
    selection: localSelection,
    setSelection,
    otherSelections,
  };
}

/**
 * Hook to get and update viewport
 */
export function useViewport() {
  const { updateViewport, presence, currentUser } = useCollaboration();
  const [localViewport, setLocalViewport] = useState({
    x: 0,
    y: 0,
    zoom: 1,
  });

  const setViewport = useCallback(
    (x: number, y: number, zoom: number) => {
      setLocalViewport({ x, y, zoom });
      updateViewport(x, y, zoom);
    },
    [updateViewport]
  );

  const otherViewports = presence
    .filter((p) => p.user.id !== currentUser.id && p.viewport)
    .map((p) => ({
      userId: p.user.id,
      userName: p.user.name,
      userColor: p.user.color,
      ...p.viewport!,
    }));

  return {
    viewport: localViewport,
    setViewport,
    otherViewports,
  };
}

/**
 * Hook to track who is editing what
 */
export function useEditingStatus() {
  const { setEditing, presence, currentUser } = useCollaboration();
  const [editingNodeId, setEditingNodeId] = useState<string | null>(null);

  const startEditing = useCallback(
    (nodeId: string) => {
      setEditingNodeId(nodeId);
      setEditing(nodeId);
    },
    [setEditing]
  );

  const stopEditing = useCallback(() => {
    setEditingNodeId(null);
    setEditing(null);
  }, [setEditing]);

  const editingUsers = presence
    .filter((p) => p.isEditing)
    .reduce((acc, p) => {
      if (p.isEditing) {
        acc[p.isEditing] = {
          userId: p.user.id,
          userName: p.user.name,
          userColor: p.user.color,
        };
      }
      return acc;
    }, {} as Record<string, { userId: string; userName: string; userColor: string }>);

  return {
    editingNodeId,
    startEditing,
    stopEditing,
    editingUsers,
  };
}

/**
 * Hook to get presence information
 */
export function usePresence() {
  const { presence, currentUser, isConnected } = useCollaboration();

  const activeUsers = presence.map((p) => ({
    id: p.user.id,
    name: p.user.name,
    avatar: p.user.avatar,
    color: p.user.color,
    isCurrentUser: p.user.id === currentUser.id,
  }));

  return {
    activeUsers,
    userCount: activeUsers.length + 1, // Include current user
    isConnected,
  };
}

/**
 * Hook to handle node operations
 */
export function useNodeOperations() {
  const { submitOperation } = useCollaboration();

  const addNode = useCallback(
    (node: Node) => {
      submitOperation({
        type: 'ADD_NODE',
        node,
      });
    },
    [submitOperation]
  );

  const updateNode = useCallback(
    (nodeId: string, updates: Partial<Node>) => {
      submitOperation({
        type: 'UPDATE_NODE',
        nodeId,
        updates,
      });
    },
    [submitOperation]
  );

  const deleteNode = useCallback(
    (nodeId: string) => {
      submitOperation({
        type: 'DELETE_NODE',
        nodeId,
      });
    },
    [submitOperation]
  );

  return {
    addNode,
    updateNode,
    deleteNode,
  };
}

/**
 * Hook to handle edge operations
 */
export function useEdgeOperations() {
  const { submitOperation } = useCollaboration();

  const addEdge = useCallback(
    (edge: Edge) => {
      submitOperation({
        type: 'ADD_EDGE',
        edge,
      });
    },
    [submitOperation]
  );

  const deleteEdge = useCallback(
    (edgeId: string) => {
      submitOperation({
        type: 'DELETE_EDGE',
        edgeId,
      });
    },
    [submitOperation]
  );

  return {
    addEdge,
    deleteEdge,
  };
}