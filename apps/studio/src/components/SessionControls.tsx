/**
 * Session Controls Component
 *
 * UI for session sharing and geometry export
 */

import React, { useState } from 'react';
import { useSession } from '../hooks/useSession';
import { createChildLogger } from '../lib/logging/logger-instance';

const logger = createChildLogger({ module: 'SessionControls' });

export function SessionControls() {
  const { sessionId, graph, getShareUrl } = useSession();
  const [exporting, setExporting] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  /**
   * Export geometry to file
   */
  async function handleExport(format: 'step' | 'stl') {
    if (!sessionId || !graph) {
      logger.warn('[SessionControls] Cannot export: no active session');
      return;
    }

    setExporting(true);

    try {
      const API_BASE_URL =
        import.meta.env['VITE_API_BASE_URL'] ||
        (import.meta.env['PROD'] ? '' : 'http://localhost:8080');

      // If no API server configured, export is not available in production
      if (!API_BASE_URL) {
        throw new Error(
          'Export feature requires collaboration server - not available in offline mode'
        );
      }

      const response = await fetch(`${API_BASE_URL}/api/sessions/${sessionId}/export`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ format }),
      });

      if (!response.ok) {
        throw new Error(`Export failed: ${response.statusText}`);
      }

      // Download file
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `design.${format}`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      logger.error('[SessionControls] Export error:', error);
      alert(
        `Failed to export ${format.toUpperCase()}: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    } finally {
      setExporting(false);
    }
  }

  /**
   * Copy share URL to clipboard
   */
  async function handleShare() {
    const shareUrl = getShareUrl();
    if (!shareUrl) {
      return;
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (error) {
      logger.error('[SessionControls] Failed to copy share URL:', error);
      alert('Failed to copy share link');
    }
  }

  if (!sessionId) {
    return null;
  }

  return (
    <div
      className="session-controls fixed top-5 right-5 flex gap-2.5 z-[1000]"
      data-testid="session-controls"
    >
      {/* Export Buttons */}
      <div className="flex gap-1.5">
        <button
          data-testid="export-step-btn"
          onClick={() => handleExport('step')}
          disabled={exporting || !graph || graph.nodes.length === 0}
          className={`px-4 py-2 bg-green-500 text-white border-none rounded text-sm font-medium ${
            exporting ? 'cursor-not-allowed' : 'cursor-pointer'
          }`}
          title="Export geometry as STEP file (CAD interchange format)"
        >
          {exporting ? '...' : 'Export STEP'}
        </button>

        <button
          data-testid="export-stl-btn"
          onClick={() => handleExport('stl')}
          disabled={exporting || !graph || graph.nodes.length === 0}
          className={`px-4 py-2 bg-blue-500 text-white border-none rounded text-sm font-medium ${
            exporting ? 'cursor-not-allowed' : 'cursor-pointer'
          }`}
          title="Export geometry as STL file (3D printing format)"
        >
          {exporting ? '...' : 'Export STL'}
        </button>
      </div>

      {/* Share Button */}
      <button
        data-testid="share-btn"
        onClick={handleShare}
        className={`px-4 py-2 text-white border-none rounded cursor-pointer text-sm font-medium transition-colors duration-200 ${
          copySuccess ? 'bg-green-500' : 'bg-amber-500'
        }`}
        title="Copy shareable link to clipboard"
      >
        {copySuccess ? '✓ Copied!' : '🔗 Share'}
      </button>

      {/* Session ID Display */}
      <div
        data-testid="session-id"
        className="px-3 py-2 bg-gray-100 border border-gray-300 rounded text-xs text-gray-500 font-mono"
      >
        Session: {sessionId.slice(0, 8)}
      </div>
    </div>
  );
}
