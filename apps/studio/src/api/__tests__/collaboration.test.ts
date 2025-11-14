/**
 * Integration tests for Collaboration API CSRF token management
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { collaborationAPI, CollaborationAPI } from '../collaboration';

describe('CollaborationAPI - CSRF Token Management', () => {
  let api: CollaborationAPI;

  beforeEach(() => {
    // Create fresh instance for each test
    api = new CollaborationAPI({
      serverUrl: 'http://localhost:8080',
      autoRefreshToken: false, // Disable auto-refresh for testing
    });

    // Mock fetch globally
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Token Fetching', () => {
    it('should fetch CSRF token from server', async () => {
      // Mock successful response
      const mockResponse = {
        csrfToken: 'test-csrf-token-123',
        sessionId: 'test-session-456',
      };

      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await api.getCSRFToken();

      expect(result.csrfToken).toBe('test-csrf-token-123');
      expect(result.sessionId).toBe('test-session-456');
      expect(result.expiresAt).toBeGreaterThan(Date.now());
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:8080/api/collaboration/csrf-token',
        {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    });

    it('should throw error on failed token fetch', async () => {
      (global.fetch as any).mockRejectedValueOnce(new Error('Network error'));

      await expect(api.getCSRFToken()).rejects.toThrow('Network error');
    });
  });

  describe('Token Caching', () => {
    it('should cache valid token and avoid redundant fetches', async () => {
      const mockResponse = {
        csrfToken: 'cached-token-123',
        sessionId: 'session-456',
      };

      (global.fetch as any).mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      });

      // First call - should fetch
      const token1 = await api.getCSRFToken();
      expect(global.fetch).toHaveBeenCalledTimes(1);

      // Second call - should use cache
      const token2 = await api.getCSRFToken();
      expect(global.fetch).toHaveBeenCalledTimes(1); // Still only 1 call
      expect(token1.csrfToken).toBe(token2.csrfToken);
      expect(token1.sessionId).toBe(token2.sessionId);
    });

    it('should force refresh when force=true', async () => {
      const mockResponse1 = {
        csrfToken: 'token-1',
        sessionId: 'session-1',
      };

      const mockResponse2 = {
        csrfToken: 'token-2',
        sessionId: 'session-2',
      };

      (global.fetch as any)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockResponse1,
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockResponse2,
        });

      // First call
      const token1 = await api.getCSRFToken();
      expect(token1.csrfToken).toBe('token-1');

      // Force refresh
      const token2 = await api.getCSRFToken(true);
      expect(token2.csrfToken).toBe('token-2');
      expect(global.fetch).toHaveBeenCalledTimes(2);
    });
  });

  describe('Token Expiration', () => {
    it('should detect expired tokens and refresh automatically', async () => {
      const mockResponse1 = {
        csrfToken: 'expired-token',
        sessionId: 'session-1',
      };

      const mockResponse2 = {
        csrfToken: 'fresh-token',
        sessionId: 'session-2',
      };

      (global.fetch as any)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockResponse1,
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockResponse2,
        });

      // Get initial token
      const token1 = await api.getCSRFToken();
      expect(token1.csrfToken).toBe('expired-token');

      // Manually expire token by modifying internal state
      (api as any).currentToken.expiresAt = Date.now() - 1000; // 1 second ago

      // Next call should auto-refresh
      const token2 = await api.getCSRFToken();
      expect(token2.csrfToken).toBe('fresh-token');
      expect(global.fetch).toHaveBeenCalledTimes(2);
    });

    it('should schedule token refresh before expiration', async () => {
      vi.useFakeTimers();

      const apiWithAutoRefresh = new CollaborationAPI({
        serverUrl: 'http://localhost:8080',
        autoRefreshToken: true,
      });

      const mockResponse = {
        csrfToken: 'auto-refresh-token',
        sessionId: 'session-123',
      };

      (global.fetch as any).mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      });

      await apiWithAutoRefresh.getCSRFToken();

      // Fast-forward to 5 minutes before expiration
      vi.advanceTimersByTime(55 * 60 * 1000); // 55 minutes

      // Should have refreshed automatically
      expect(global.fetch).toHaveBeenCalledTimes(2); // Initial + auto-refresh

      vi.useRealTimers();
    });
  });

  describe('Token Validation', () => {
    it('should correctly identify valid tokens', async () => {
      const mockResponse = {
        csrfToken: 'valid-token',
        sessionId: 'session-123',
      };

      (global.fetch as any).mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      });

      const token = await api.getCSRFToken();

      // Token should be valid immediately after fetch
      expect((api as any).isTokenValid(token)).toBe(true);
    });

    it('should correctly identify expired tokens', async () => {
      const mockResponse = {
        csrfToken: 'expired-token',
        sessionId: 'session-123',
      };

      (global.fetch as any).mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      });

      const token = await api.getCSRFToken();

      // Manually expire token
      token.expiresAt = Date.now() - 1000; // 1 second ago

      expect((api as any).isTokenValid(token)).toBe(false);
    });
  });

  describe('Configuration', () => {
    it('should allow updating server URL', () => {
      api.updateConfig({ serverUrl: 'https://production.example.com' });

      expect((api as any).config.serverUrl).toBe('https://production.example.com');
    });

    it('should allow toggling auto-refresh', () => {
      api.updateConfig({ autoRefreshToken: true });

      expect((api as any).config.autoRefreshToken).toBe(true);
    });
  });

  describe('Cleanup', () => {
    it('should clear refresh timer on cleanup', async () => {
      const apiWithAutoRefresh = new CollaborationAPI({
        serverUrl: 'http://localhost:8080',
        autoRefreshToken: true,
      });

      const mockResponse = {
        csrfToken: 'test-token',
        sessionId: 'test-session',
      };

      (global.fetch as any).mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      });

      // Get token to initialize refresh timer
      await apiWithAutoRefresh.getCSRFToken();

      const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout');

      // Clear token (which clears the timer)
      apiWithAutoRefresh.clearToken();

      expect(clearTimeoutSpy).toHaveBeenCalled();
    });
  });
});

describe('CollaborationAPI - Singleton Export', () => {
  it('should export singleton instance', () => {
    expect(collaborationAPI).toBeDefined();
    expect(collaborationAPI).toBeInstanceOf(CollaborationAPI);
  });

  it('should have correct default configuration', () => {
    const config = (collaborationAPI as any).config;

    // Server URL should be based on NODE_ENV
    expect(config.serverUrl).toBeDefined();
    expect(config.autoRefreshToken).toBe(true);
  });
});
