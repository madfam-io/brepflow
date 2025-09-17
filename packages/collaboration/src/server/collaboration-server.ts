import { Server, Socket } from 'socket.io';
import type { Server as HTTPServer } from 'http';
import type {
  ServerToClientEvents,
  ClientToServerEvents,
  User,
  Document,
  Operation,
  Presence,
} from '../types';
import { SessionManager } from './session-manager';
import { DocumentStore } from './document-store';
import { PresenceManager } from './presence-manager';
import { OperationalTransform } from '../ot/operational-transform';

export interface CollaborationServerOptions {
  corsOrigin?: string | string[];
  maxConnectionsPerDocument?: number;
  operationHistoryLimit?: number;
  presenceTimeout?: number;
}

export class CollaborationServer {
  private io: Server<ClientToServerEvents, ServerToClientEvents>;
  private sessionManager: SessionManager;
  private documentStore: DocumentStore;
  private presenceManager: PresenceManager;
  private ot: OperationalTransform;

  constructor(httpServer: HTTPServer, options?: CollaborationServerOptions) {
    this.io = new Server<ClientToServerEvents, ServerToClientEvents>(httpServer, {
      cors: {
        origin: options?.corsOrigin ?? '*',
        methods: ['GET', 'POST'],
      },
    });

    this.sessionManager = new SessionManager();
    this.documentStore = new DocumentStore({
      operationHistoryLimit: options?.operationHistoryLimit,
    });
    this.presenceManager = new PresenceManager({
      timeout: options?.presenceTimeout,
    });
    this.ot = new OperationalTransform();

    this.setupHandlers();
  }

  private setupHandlers(): void {
    this.io.on('connection', (socket) => {
      console.log(`Client connected: ${socket.id}`);

      socket.on('document:join', async (documentId: string, user: User) => {
        await this.handleJoinDocument(socket, documentId, user);
      });

      socket.on('document:leave', async () => {
        await this.handleLeaveDocument(socket);
      });

      socket.on('operation:submit', async (operation: Operation) => {
        await this.handleOperation(socket, operation);
      });

      socket.on('presence:cursor', async (cursor) => {
        await this.handlePresenceUpdate(socket, 'cursor', cursor);
      });

      socket.on('presence:selection', async (selection) => {
        await this.handlePresenceUpdate(socket, 'selection', selection);
      });

      socket.on('presence:viewport', async (viewport) => {
        await this.handlePresenceUpdate(socket, 'viewport', viewport);
      });

      socket.on('presence:editing', async (nodeId) => {
        await this.handlePresenceUpdate(socket, 'editing', nodeId);
      });

      socket.on('document:request-sync', async () => {
        await this.handleSyncRequest(socket);
      });

      socket.on('disconnect', async () => {
        await this.handleDisconnect(socket);
      });
    });
  }

  private async handleJoinDocument(
    socket: Socket,
    documentId: string,
    user: User
  ): Promise<void> {
    // Create session
    const session = this.sessionManager.createSession({
      userId: user.id,
      documentId,
      connectionId: socket.id,
    });

    // Join socket room for document
    await socket.join(documentId);

    // Get or create document
    let document = await this.documentStore.getDocument(documentId);
    if (!document) {
      document = await this.documentStore.createDocument(documentId);
    }

    // Add user to presence
    const presence: Presence = {
      user,
      cursor: undefined,
      selection: undefined,
      viewport: undefined,
    };
    this.presenceManager.addPresence(documentId, user.id, presence);

    // Send initial document state to joining user
    socket.emit('document:sync', document);

    // Notify other users of new presence
    socket.to(documentId).emit('presence:join', presence);

    // Send current presence list to joining user
    const presenceList = this.presenceManager.getPresence(documentId);
    socket.emit('presence:update', presenceList);

    console.log(`User ${user.name} joined document ${documentId}`);
  }

  private async handleLeaveDocument(socket: Socket): Promise<void> {
    const session = this.sessionManager.getSessionByConnectionId(socket.id);
    if (!session) return;

    const { userId, documentId } = session;

    // Remove session
    this.sessionManager.removeSession(session.id);

    // Remove presence
    this.presenceManager.removePresence(documentId, userId);

    // Leave socket room
    await socket.leave(documentId);

    // Notify other users
    socket.to(documentId).emit('presence:leave', userId);

    console.log(`User ${userId} left document ${documentId}`);
  }

  private async handleOperation(
    socket: Socket,
    operation: Operation
  ): Promise<void> {
    const session = this.sessionManager.getSessionByConnectionId(socket.id);
    if (!session) return;

    const { documentId } = session;
    const document = await this.documentStore.getDocument(documentId);
    if (!document) return;

    // Apply operational transformation
    const transformedOperation = this.ot.transform(
      operation,
      document.operations
    );

    // Apply operation to document
    const updatedDocument = await this.documentStore.applyOperation(
      documentId,
      transformedOperation
    );

    // Broadcast to all users in document (including sender)
    this.io.to(documentId).emit('operation:broadcast', transformedOperation);

    // Check for conflicts
    const conflicts = this.ot.detectConflicts(
      transformedOperation,
      document.operations
    );
    if (conflicts.length > 0) {
      conflicts.forEach((conflict) => {
        socket.emit('conflict:detected', conflict);
      });
    }
  }

  private async handlePresenceUpdate(
    socket: Socket,
    type: keyof Presence,
    data: any
  ): Promise<void> {
    const session = this.sessionManager.getSessionByConnectionId(socket.id);
    if (!session) return;

    const { userId, documentId } = session;
    const presence = this.presenceManager.updatePresence(
      documentId,
      userId,
      type,
      data
    );

    if (presence) {
      // Broadcast presence update to other users
      socket.to(documentId).emit('presence:update', [presence]);
    }
  }

  private async handleSyncRequest(socket: Socket): Promise<void> {
    const session = this.sessionManager.getSessionByConnectionId(socket.id);
    if (!session) return;

    const document = await this.documentStore.getDocument(session.documentId);
    if (document) {
      socket.emit('document:sync', document);
    }
  }

  private async handleDisconnect(socket: Socket): Promise<void> {
    const session = this.sessionManager.getSessionByConnectionId(socket.id);
    if (!session) return;

    await this.handleLeaveDocument(socket);
    console.log(`Client disconnected: ${socket.id}`);
  }

  public async close(): Promise<void> {
    await this.io.close();
  }
}