import { useState, useEffect, useRef, useCallback } from 'react';
import { useAwareness, useDoc } from './collaboration-provider';
import type { 
  CollaborationContext,
  Presence,
  SelectionState,
  EditingState,
  CursorPosition,
  ViewportState,
  Operation
} from '../types';

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

export function useCollaboration() {
  const awareness = useAwareness();
  const doc = useDoc();
  const [presence, setPresence] = useState<Map<number, Presence>>(new Map());

  useEffect(() => {
    const handleChange = () => {
      const states = awareness.getStates();
      const presenceMap = new Map<number, Presence>();
      states.forEach((state, clientId) => {
        if (state.user) {
          presenceMap.set(clientId, state as Presence);
        }
      });
      setPresence(presenceMap);
    };

    awareness.on('change', handleChange);
    handleChange(); // Initial state

    return () => awareness.off('change', handleChange);
  }, [awareness]);
  
  return {
    awareness,
    doc,
    presence,
    connected: awareness.getStates().size > 0,
    currentUser: { id: 'current', name: 'Current User', color: '#000000', avatar: '' },
    updateCursor: (position: CursorPosition) => {
      awareness.setLocalStateField('cursor', position);
    },
    updateSelection: (selection: SelectionState) => {
      awareness.setLocalStateField('selection', selection);
    },
    updateViewport: (viewport: ViewportState) => {
      awareness.setLocalStateField('viewport', viewport);
    },
    setEditing: (editing: EditingState) => {
      awareness.setLocalStateField('editing', editing);
    },
    submitOperation: (operation: Operation) => {
      doc.transact(() => {
        // Apply operation to doc
      });
    },
    document: doc
  };
}

export function usePresence() {
  const { presence } = useCollaboration();
  return presence;
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