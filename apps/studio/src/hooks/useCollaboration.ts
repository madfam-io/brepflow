/**
 * React Hook for Collaboration Features
 * Manages real-time collaboration, presence, and synchronization with CSRF protection
 */

import { useEffect, useState, useCallback, useRef } from 'react';
import { BrepFlowCollaborationEngine } from '@brepflow/engine-core';
import { SecureWebSocketClient } from '../services/secure-websocket-client';

// Create secure WebSocket client
const secureWebSocketClient = new SecureWebSocketClient();

// Create collaboration engine with secure WebSocket
const collaborationEngine = new BrepFlowCollaborationEngine(secureWebSocketClient as any);
import type {
  SessionId,
  UserId,
  CollaborationUser,
  CursorPosition,
  SelectionState,
  Operation,
} from '@brepflow/engine-core';

export interface CollaborationState {
  isConnected: boolean;
  sessionId: SessionId | null;
  currentUser: CollaborationUser | null;
  users: Map<UserId, CollaborationUser>;
  cursors: Map<UserId, CursorPosition>;
  selections: Map<UserId, SelectionState>;
  operationCount: number;
}

export interface CollaborationActions {
  // Session management
  createSession: (projectId: string, user: CollaborationUser) => Promise<SessionId>;
  joinSession: (sessionId: SessionId, user: CollaborationUser) => Promise<void>;
  leaveSession: () => Promise<void>;

  // Presence
  updateCursor: (cursor: CursorPosition) => Promise<void>;
  updateSelection: (selectedNodes: string[], selectedEdges: string[]) => Promise<void>;
  updateUser: (updates: Partial<CollaborationUser>) => Promise<void>;

  // Operations
  applyOperation: (operation: Operation) => Promise<void>;
}

export interface UseCollaborationOptions {
  autoConnect?: boolean;
  throttleCursor?: number;
  throttleSelection?: number;
}

export function useCollaboration(
  options: UseCollaborationOptions = {}
): [CollaborationState, CollaborationActions] {
  const {
    autoConnect = false,
    throttleCursor = 50,
    throttleSelection = 200,
  } = options;

  // State
  const [state, setState] = useState<CollaborationState>({
    isConnected: false,
    sessionId: null,
    currentUser: null,
    users: new Map(),
    cursors: new Map(),
    selections: new Map(),
    operationCount: 0,
  });

  // Throttling refs
  const cursorThrottleRef = useRef<number>();
  const selectionThrottleRef = useRef<number>();

  // WebSocket connection ref
  const wsConnectedRef = useRef(false);

  // Ensure WebSocket is connected before any collaboration operations
  const ensureWebSocketConnected = useCallback(async () => {
    if (!wsConnectedRef.current) {
      try {
        await secureWebSocketClient.connect();
        wsConnectedRef.current = true;
      } catch (error) {
        console.error('Failed to connect WebSocket:', error);
        throw error;
      }
    }
  }, []);

  // Actions
  const actions: CollaborationActions = {
    createSession: useCallback(async (projectId: string, user: CollaborationUser): Promise<SessionId> => {
      try {
        // Ensure WebSocket is connected before creating session
        await ensureWebSocketConnected();

        const sessionId = await collaborationEngine.createSession(projectId, user.id);
        await collaborationEngine.joinSession(sessionId, user);

        setState(prev => ({
          ...prev,
          isConnected: true,
          sessionId,
          currentUser: user,
        }));

        return sessionId;
      } catch (error) {
        console.error('Failed to create session:', error);
        throw error;
      }
    }, [ensureWebSocketConnected]),

    joinSession: useCallback(async (sessionId: SessionId, user: CollaborationUser): Promise<void> => {
      try {
        // Ensure WebSocket is connected before joining session
        await ensureWebSocketConnected();

        await collaborationEngine.joinSession(sessionId, user);

        setState(prev => ({
          ...prev,
          isConnected: true,
          sessionId,
          currentUser: user,
        }));
      } catch (error) {
        console.error('Failed to join session:', error);
        throw error;
      }
    }, [ensureWebSocketConnected]),

    leaveSession: useCallback(async (): Promise<void> => {
      if (state.sessionId && state.currentUser) {
        try {
          await collaborationEngine.leaveSession(state.sessionId, state.currentUser.id);

          setState(prev => ({
            ...prev,
            isConnected: false,
            sessionId: null,
            currentUser: null,
            users: new Map(),
            cursors: new Map(),
            selections: new Map(),
          }));
        } catch (error) {
          console.error('Failed to leave session:', error);
          throw error;
        }
      }
    }, [state.sessionId, state.currentUser]),

    updateCursor: useCallback(async (cursor: CursorPosition): Promise<void> => {
      if (!state.sessionId || !state.currentUser) return;

      // Throttle cursor updates
      if (cursorThrottleRef.current) {
        clearTimeout(cursorThrottleRef.current);
      }

      cursorThrottleRef.current = window.setTimeout(async () => {
        try {
          await collaborationEngine.broadcastCursor(
            state.sessionId!,
            state.currentUser!.id,
            cursor
          );
        } catch (error) {
          console.error('Failed to broadcast cursor:', error);
        }
      }, throttleCursor);
    }, [state.sessionId, state.currentUser, throttleCursor]),

    updateSelection: useCallback(async (selectedNodes: string[], selectedEdges: string[]): Promise<void> => {
      if (!state.sessionId || !state.currentUser) return;

      const selection: SelectionState = {
        selectedNodes: selectedNodes as any[],
        selectedEdges: selectedEdges as any[],
        timestamp: Date.now(),
      };

      // Throttle selection updates
      if (selectionThrottleRef.current) {
        clearTimeout(selectionThrottleRef.current);
      }

      selectionThrottleRef.current = window.setTimeout(async () => {
        try {
          await collaborationEngine.broadcastSelection(
            state.sessionId!,
            state.currentUser!.id,
            selection
          );
        } catch (error) {
          console.error('Failed to broadcast selection:', error);
        }
      }, throttleSelection);
    }, [state.sessionId, state.currentUser, throttleSelection]),

    updateUser: useCallback(async (updates: Partial<CollaborationUser>): Promise<void> => {
      if (!state.sessionId || !state.currentUser) return;

      try {
        await collaborationEngine.updatePresence(
          state.sessionId,
          state.currentUser.id,
          updates
        );

        // Update local state
        setState(prev => ({
          ...prev,
          currentUser: prev.currentUser ? { ...prev.currentUser, ...updates } : null,
        }));
      } catch (error) {
        console.error('Failed to update user:', error);
      }
    }, [state.sessionId, state.currentUser]),

    applyOperation: useCallback(async (operation: Operation): Promise<void> => {
      if (!state.sessionId) return;

      try {
        await collaborationEngine.applyOperation(state.sessionId, operation);

        setState(prev => ({
          ...prev,
          operationCount: prev.operationCount + 1,
        }));
      } catch (error) {
        console.error('Failed to apply operation:', error);
        throw error;
      }
    }, [state.sessionId]),
  };

  // Set up event listeners
  useEffect(() => {
    const handleUserJoined = (event: any) => {
      if (event.sessionId === state.sessionId && event.userId !== state.currentUser?.id) {
        setState(prev => {
          const newUsers = new Map(prev.users);
          newUsers.set(event.userId, event.data.user);
          return { ...prev, users: newUsers };
        });
      }
    };

    const handleUserLeft = (event: any) => {
      if (event.sessionId === state.sessionId) {
        setState(prev => {
          const newUsers = new Map(prev.users);
          const newCursors = new Map(prev.cursors);
          const newSelections = new Map(prev.selections);

          newUsers.delete(event.userId);
          newCursors.delete(event.userId);
          newSelections.delete(event.userId);

          return {
            ...prev,
            users: newUsers,
            cursors: newCursors,
            selections: newSelections,
          };
        });
      }
    };

    const handleCursorUpdated = (event: any) => {
      if (event.sessionId === state.sessionId && event.userId !== state.currentUser?.id) {
        setState(prev => {
          const newCursors = new Map(prev.cursors);
          newCursors.set(event.userId, event.data);
          return { ...prev, cursors: newCursors };
        });
      }
    };

    const handleSelectionUpdated = (event: any) => {
      if (event.sessionId === state.sessionId && event.userId !== state.currentUser?.id) {
        setState(prev => {
          const newSelections = new Map(prev.selections);
          newSelections.set(event.userId, event.data);
          return { ...prev, selections: newSelections };
        });
      }
    };

    const handleUserUpdated = (event: any) => {
      if (event.sessionId === state.sessionId) {
        setState(prev => {
          const newUsers = new Map(prev.users);
          if (event.userId === state.currentUser?.id) {
            // Update current user
            return {
              ...prev,
              currentUser: prev.currentUser ? { ...prev.currentUser, ...event.data.user } : null,
            };
          } else {
            // Update other user
            newUsers.set(event.userId, event.data.user);
            return { ...prev, users: newUsers };
          }
        });
      }
    };

    // Add event listeners
    collaborationEngine.on('session-joined', handleUserJoined);
    collaborationEngine.on('session-left', handleUserLeft);
    collaborationEngine.on('presence-updated', handleCursorUpdated);
    collaborationEngine.on('presence-updated', handleSelectionUpdated);
    collaborationEngine.on('presence-updated', handleUserUpdated);

    return () => {
      // Remove event listeners
      collaborationEngine.off('session-joined', handleUserJoined);
      collaborationEngine.off('session-left', handleUserLeft);
      collaborationEngine.off('presence-updated', handleCursorUpdated);
      collaborationEngine.off('presence-updated', handleSelectionUpdated);
      collaborationEngine.off('presence-updated', handleUserUpdated);
    };
  }, [state.sessionId, state.currentUser?.id]);

  // Load initial presence data when session changes
  useEffect(() => {
    if (state.sessionId) {
      const loadPresence = async () => {
        try {
          const presenceData = await collaborationEngine.getPresenceState(state.sessionId!);

          // Extract users, cursors, and selections from PresenceData map
          const users = new Map();
          const cursors = new Map();
          const selections = new Map();

          for (const [userId, presence] of presenceData) {
            if (presence.cursor) {
              cursors.set(userId, presence.cursor);
            }
            if (presence.selection) {
              selections.set(userId, presence.selection);
            }
          }

          setState(prev => ({
            ...prev,
            users,
            cursors,
            selections,
          }));
        } catch (error) {
          console.error('Failed to load presence:', error);
        }
      };

      loadPresence();
    }
  }, [state.sessionId]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (cursorThrottleRef.current) {
        clearTimeout(cursorThrottleRef.current);
      }
      if (selectionThrottleRef.current) {
        clearTimeout(selectionThrottleRef.current);
      }
    };
  }, []);

  return [state, actions];
}

export default useCollaboration;