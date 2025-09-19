/**
 * WASM Export Service
 * Handles STEP, STL, IGES exports using OCCT WASM
 */

import { getGeometryAPI, isRealGeometryAvailable } from './geometry-api';
import type { WorkerAPI } from '@brepflow/types';

export interface ExportOptions {
  format: 'step' | 'stl' | 'iges';
  binary?: boolean;  // For STL
  precision?: number; // For tessellation
}

/**
 * Export geometry to CAD format
 */
export async function exportGeometry(
  geometryHandles: any[],
  options: ExportOptions
): Promise<Blob> {
  // Check if real geometry is available
  if (!isRealGeometryAvailable()) {
    throw new Error(`Real geometry engine required for ${options.format.toUpperCase()} export`);
  }

  const api = await getGeometryAPI();

  // Ensure API is initialized
  if (!api.init) {
    throw new Error('Geometry API not properly initialized');
  }

  await api.init();

  try {
    let exportData: string | ArrayBuffer;

    // For now, we'll combine all shapes into one for export
    // In a full implementation, this would handle assemblies
    const primaryShape = geometryHandles[0];

    if (!primaryShape || !primaryShape.id) {
      throw new Error('No valid geometry to export');
    }

    switch (options.format) {
      case 'step':
        // Export to STEP format
        exportData = await api.invoke('EXPORT_STEP', {
          shapeId: primaryShape.id,
          includeMetadata: true
        });
        break;

      case 'stl':
        // Export to STL format
        exportData = await api.invoke('EXPORT_STL', {
          shapeId: primaryShape.id,
          binary: options.binary ?? true,
          precision: options.precision ?? 0.1
        });
        break;

      case 'iges':
        // Export to IGES format
        exportData = await api.invoke('EXPORT_IGES', {
          shapeId: primaryShape.id,
          version: 5.3
        });
        break;

      default:
        throw new Error(`Unsupported export format: ${options.format}`);
    }

    // Convert to Blob
    const mimeType = getMimeType(options.format, options.binary);

    if (typeof exportData === 'string') {
      return new Blob([exportData], { type: mimeType });
    } else {
      return new Blob([exportData], { type: mimeType });
    }

  } catch (error) {
    console.error(`Export to ${options.format} failed:`, error);

    // Provide helpful error message
    if (error.message?.includes('not implemented')) {
      throw new Error(`${options.format.toUpperCase()} export is not yet implemented in the geometry engine`);
    }

    throw error;
  }
}

/**
 * Get MIME type for export format
 */
function getMimeType(format: string, binary?: boolean): string {
  switch (format) {
    case 'step':
      return 'application/STEP';
    case 'stl':
      return binary ? 'application/octet-stream' : 'text/plain';
    case 'iges':
      return 'application/iges';
    default:
      return 'application/octet-stream';
  }
}

/**
 * Download file helper
 */
export function downloadFile(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Check if export is available
 */
export async function isExportAvailable(): Promise<boolean> {
  try {
    return isRealGeometryAvailable();
  } catch {
    return false;
  }
}