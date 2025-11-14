/**
 * Secure WebSocket Client with CSRF Protection
 * Handles WebSocket connections with CSRF token authentication and automatic reconnection
 */

// @ts-expect-error - socket.io-client is an optional dependency for collaboration features
import { io, Socket } from 'socket.io-client';
import { collaborationAPI } from '../api/collaboration';

export interface SecureWebSocketOptions {
  reconnection?: boolean;
  reconnectionAttempts?: number;
  reconnectionDelay?: number;
  timeout?: number;
}

export class SecureWebSocketClient {
  private socket: Socket | null = null;
  private messageCallbacks: Set<(data: any) => void> = new Set();
  private reconnectCallbacks: Set<() => void> = new Set();
  private connected = false;
  private serverUrl: string;
  private options: SecureWebSocketOptions;

  constructor(options: SecureWebSocketOptions = {}) {
    this.serverUrl = collaborationAPI.getServerUrl();
    this.options = {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      timeout: 10000,
      ...options,
    };
  }

  /**
   * Connect to the WebSocket server with CSRF authentication
   */
  async connect(url?: string): Promise<void> {
    if (this.connected) {
      console.warn('[SecureWebSocket] Already connected');
      return;
    }

    // Use provided URL or default server URL
    const targetUrl = url || this.serverUrl;

    try {
      // Get CSRF token before connecting
      const { csrfToken } = await collaborationAPI.getCSRFToken();

      // Create Socket.IO connection with CSRF token in auth
      this.socket = io(targetUrl, {
        auth: {
          csrfToken,
        },
        withCredentials: true, // Required for CORS with credentials
        reconnection: this.options.reconnection,
        reconnectionAttempts: this.options.reconnectionAttempts,
        reconnectionDelay: this.options.reconnectionDelay,
        timeout: this.options.timeout,
      });

      // Set up event handlers
      this.setupEventHandlers();

      // Wait for connection
      await this.waitForConnection();

      this.connected = true;
      console.log('[SecureWebSocket] Connected successfully');
    } catch (error) {
      console.error('[SecureWebSocket] Connection failed:', error);
      throw error;
    }
  }

  /**
   * Disconnect from the WebSocket server
   */
  async disconnect(): Promise<void> {
    if (!this.socket) {
      console.warn('[SecureWebSocket] Not connected');
      return;
    }

    return new Promise((resolve) => {
      this.socket!.once('disconnect', () => {
        this.connected = false;
        this.socket = null;
        console.log('[SecureWebSocket] Disconnected');
        resolve();
      });

      this.socket!.disconnect();
    });
  }

  /**
   * Send a message through the WebSocket
   */
  async send(event: string, data: any): Promise<void> {
    if (!this.socket || !this.connected) {
      throw new Error('WebSocket not connected');
    }

    return new Promise((resolve, reject) => {
      this.socket!.emit(event, data, (response: any) => {
        if (response?.error) {
          reject(new Error(response.error));
        } else {
          resolve();
        }
      });
    });
  }

  /**
   * Register a callback for incoming messages
   */
  onMessage(callback: (data: any) => void): void {
    this.messageCallbacks.add(callback);
  }

  /**
   * Remove a message callback
   */
  offMessage(callback: (data: any) => void): void {
    this.messageCallbacks.delete(callback);
  }

  /**
   * Register a callback for reconnection events
   */
  onReconnect(callback: () => void): void {
    this.reconnectCallbacks.add(callback);
  }

  /**
   * Remove a reconnect callback
   */
  offReconnect(callback: () => void): void {
    this.reconnectCallbacks.delete(callback);
  }

  /**
   * Check if connected
   */
  isConnected(): boolean {
    return this.connected && !!this.socket?.connected;
  }

  /**
   * Set up Socket.IO event handlers
   */
  private setupEventHandlers(): void {
    if (!this.socket) return;

    // Connection events
    this.socket.on('connect', () => {
      this.connected = true;
      console.log('[SecureWebSocket] Connected');
    });

    this.socket.on('disconnect', (reason) => {
      this.connected = false;
      console.log('[SecureWebSocket] Disconnected:', reason);
    });

    // Handle reconnection
    this.socket.on('reconnect', async (attemptNumber) => {
      console.log(`[SecureWebSocket] Reconnected after ${attemptNumber} attempts`);

      // Get fresh CSRF token on reconnect
      try {
        const { csrfToken } = await collaborationAPI.getCSRFToken(true);

        // Update auth with new token
        this.socket!.auth = { csrfToken };

        // Notify reconnect callbacks
        this.reconnectCallbacks.forEach((callback) => callback());
      } catch (error) {
        console.error('[SecureWebSocket] Failed to refresh token on reconnect:', error);
      }
    });

    this.socket.on('reconnect_attempt', (attemptNumber) => {
      console.log(`[SecureWebSocket] Reconnection attempt ${attemptNumber}`);
    });

    this.socket.on('reconnect_failed', () => {
      console.error('[SecureWebSocket] Reconnection failed after max attempts');
    });

    // Handle CSRF token errors
    this.socket.on('connect_error', async (error) => {
      console.error('[SecureWebSocket] Connection error:', error.message);

      // If CSRF token is invalid, try to get a new one and reconnect
      if (error.message.includes('CSRF') || error.message.includes('csrf')) {
        console.log('[SecureWebSocket] CSRF token invalid, refreshing...');

        try {
          const { csrfToken } = await collaborationAPI.getCSRFToken(true);

          // Update auth and reconnect
          if (this.socket) {
            this.socket.auth = { csrfToken };
            this.socket.connect();
          }
        } catch (refreshError) {
          console.error('[SecureWebSocket] Failed to refresh CSRF token:', refreshError);
        }
      }
    });

    // Forward all messages to callbacks
    this.socket.onAny((event, data) => {
      this.messageCallbacks.forEach((callback) => {
        callback({ event, data });
      });
    });
  }

  /**
   * Wait for WebSocket connection to establish
   */
  private waitForConnection(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.socket) {
        reject(new Error('Socket not initialized'));
        return;
      }

      const timeout = setTimeout(() => {
        reject(new Error('Connection timeout'));
      }, this.options.timeout);

      this.socket.once('connect', () => {
        clearTimeout(timeout);
        resolve();
      });

      this.socket.once('connect_error', (error) => {
        clearTimeout(timeout);
        reject(error);
      });
    });
  }

  /**
   * Get the underlying Socket.IO instance (for advanced usage)
   */
  getSocket(): Socket | null {
    return this.socket;
  }
}
