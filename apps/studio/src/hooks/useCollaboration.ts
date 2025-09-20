/**
 * React Hook for Collaboration Features
 * Manages real-time collaboration, presence, and synchronization
 */

import { useEffect, useState, useCallback, useRef } from 'react';
import { BrepFlowCollaborationEngine } from '@brepflow/engine-core';

// Create a singleton instance of the collaboration engine
const collaborationEngine = new BrepFlowCollaborationEngine();
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

  // Actions
  const actions: CollaborationActions = {
    createSession: useCallback(async (projectId: string, user: CollaborationUser): Promise<SessionId> => {
      try {
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
    }, []),

    joinSession: useCallback(async (sessionId: SessionId, user: CollaborationUser): Promise<void> => {
      try {
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
    }, []),

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
    collaborationEngine.addEventListener('user-joined', handleUserJoined);
    collaborationEngine.addEventListener('user-left', handleUserLeft);
    collaborationEngine.addEventListener('cursor-updated', handleCursorUpdated);
    collaborationEngine.addEventListener('selection-updated', handleSelectionUpdated);
    collaborationEngine.addEventListener('user-updated', handleUserUpdated);

    return () => {
      // Remove event listeners
      collaborationEngine.removeEventListener('user-joined', handleUserJoined);
      collaborationEngine.removeEventListener('user-left', handleUserLeft);
      collaborationEngine.removeEventListener('cursor-updated', handleCursorUpdated);
      collaborationEngine.removeEventListener('selection-updated', handleSelectionUpdated);
      collaborationEngine.removeEventListener('user-updated', handleUserUpdated);
    };
  }, [state.sessionId, state.currentUser?.id]);

  // Load initial presence data when session changes
  useEffect(() => {
    if (state.sessionId) {
      const loadPresence = async () => {
        try {
          const presence = await collaborationEngine.getPresence(state.sessionId!);

          setState(prev => ({
            ...prev,
            users: presence.users,
            cursors: presence.cursors,
            selections: presence.selections,
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