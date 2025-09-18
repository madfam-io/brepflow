import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from 'react';
import { CollaborationClient } from './collaboration-client';
import type {
  CollaborationOptions,
  Document,
  Operation,
  Presence,
  User,
  Cursor,
  Selection,
  Viewport,
  Conflict,
} from '../types';

interface CollaborationContextValue {
  client: CollaborationClient | null;
  document: Document | null;
  presence: Presence[];
  isConnected: boolean;
  currentUser: User;
  submitOperation: (operation: Omit<Operation, 'id' | 'userId' | 'timestamp' | 'documentId'>) => void;
  updateCursor: (x: number, y: number) => void;
  updateSelection: (nodeIds: string[], edgeIds: string[]) => void;
  updateViewport: (x: number, y: number, zoom: number) => void;
  setEditing: (nodeId: string | null) => void;
  requestSync: () => void;
}

const CollaborationContext = createContext<CollaborationContextValue | null>(
  null
);

export interface CollaborationProviderProps {
  options: CollaborationOptions;
  children: React.ReactNode;
  onOperation?: (operation: Operation) => void;
  onConflict?: (conflict: Conflict) => void;
  onError?: (error: Error) => void;
}

export function CollaborationProvider({
  options,
  children,
  onOperation,
  onConflict,
  onError,
}: CollaborationProviderProps) {
  const [client, setClient] = useState<CollaborationClient | null>(null);
  const [document, setDocument] = useState<Document | null>(null);
  const [presence, setPresence] = useState<Presence[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const clientRef = useRef<CollaborationClient | null>(null);

  useEffect(() => {
    // Create collaboration client
    const collaborationClient = new CollaborationClient(options);
    clientRef.current = collaborationClient;

    // Set up event handlers
    collaborationClient.setEventHandlers({
      onConnect: () => setIsConnected(true),
      onDisconnect: () => setIsConnected(false),
      onDocumentSync: (doc) => setDocument(doc),
      onOperation: (op) => {
        setDocument(collaborationClient.getDocument());
        onOperation?.(op);
      },
      onPresenceUpdate: (presenceList) => {
        setPresence(collaborationClient.getPresence());
      },
      onPresenceJoin: (p) => {
        setPresence(collaborationClient.getPresence());
      },
      onPresenceLeave: (userId) => {
        setPresence(collaborationClient.getPresence());
      },
      onConflict: (conflict) => {
        console.warn('Conflict detected:', conflict);
        onConflict?.(conflict);
      },
      onError: (error) => {
        console.error('Collaboration error:', error);
        onError?.(error);
      },
    });

    setClient(collaborationClient);

    // Cleanup on unmount
    return () => {
      collaborationClient.destroy();
      clientRef.current = null;
    };
  }, [options.serverUrl, options.documentId, options.user.id]);

  const submitOperation = useCallback(
    (op: Omit<Operation, 'id' | 'userId' | 'timestamp' | 'documentId'>) => {
      if (!clientRef.current) return;

      const operation: Operation = {
        ...op,
        id: generateOperationId(),
        userId: options.user.id,
        timestamp: Date.now(),
        documentId: options.documentId,
      } as Operation;

      clientRef.current.submitOperation(operation);
    },
    [options.user.id, options.documentId]
  );

  const updateCursor = useCallback(
    (x: number, y: number) => {
      if (!clientRef.current) return;

      clientRef.current.updateCursor({
        x,
        y,
        userId: options.user.id,
      });
    },
    [options.user.id]
  );

  const updateSelection = useCallback(
    (nodeIds: string[], edgeIds: string[]) => {
      if (!clientRef.current) return;

      clientRef.current.updateSelection({
        nodeIds,
        edgeIds,
        userId: options.user.id,
      });
    },
    [options.user.id]
  );

  const updateViewport = useCallback(
    (x: number, y: number, zoom: number) => {
      if (!clientRef.current) return;

      clientRef.current.updateViewport({
        x,
        y,
        zoom,
        userId: options.user.id,
      });
    },
    [options.user.id]
  );

  const setEditing = useCallback((nodeId: string | null) => {
    if (!clientRef.current) return;
    clientRef.current.setEditing(nodeId);
  }, []);

  const requestSync = useCallback(() => {
    if (!clientRef.current) return;
    clientRef.current.requestSync();
  }, []);

  const value: CollaborationContextValue = {
    client,
    document,
    presence,
    isConnected,
    currentUser: options.user,
    submitOperation,
    updateCursor,
    updateSelection,
    updateViewport,
    setEditing,
    requestSync,
  };

  return (
    <CollaborationContext.Provider value={value}>
      {children}
    </CollaborationContext.Provider>
  );
}

export function useCollaboration() {
  const context = useContext(CollaborationContext);
  if (!context) {
    throw new Error(
      'useCollaboration must be used within CollaborationProvider'
    );
  }
  return context;
}

/**
 * Hook to access awareness state (presence, cursors, etc.)
 */
export function useAwareness() {
  const { presence, currentUser, updateCursor, updateSelection, updateViewport } = useCollaboration();
  return {
    presence,
    currentUser,
    updateCursor,
    updateSelection,
    updateViewport,
  };
}

/**
 * Hook to access document state and operations
 */
export function useDoc() {
  const { document, submitOperation, isConnected } = useCollaboration();
  return {
    document,
    submitOperation,
    isConnected,
  };
}

function generateOperationId(): string {
  return `op_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}