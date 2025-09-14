import { createHash } from 'crypto';
import type { NodeInstance } from '@brepflow/types';

/**
 * Generate deterministic hash for a node
 */
export function hashNode(node: NodeInstance, inputs: any): string {
  const data = {
    type: node.type,
    params: node.params,
    inputs: normalizeInputs(inputs),
  };

  return hash(JSON.stringify(data));
}

/**
 * Generate hash for arbitrary data
 */
export function hash(data: string): string {
  return createHash('sha256').update(data).digest('hex').substring(0, 16);
}

/**
 * Normalize inputs for consistent hashing
 */
function normalizeInputs(inputs: any): any {
  if (inputs === null || inputs === undefined) {
    return null;
  }

  if (typeof inputs === 'object') {
    if (Array.isArray(inputs)) {
      return inputs.map(normalizeInputs);
    }

    // Handle shape handles
    if ('id' in inputs && 'type' in inputs) {
      return { id: inputs.id, type: inputs.type };
    }

    // Handle regular objects
    const normalized: any = {};
    const keys = Object.keys(inputs).sort();
    for (const key of keys) {
      normalized[key] = normalizeInputs(inputs[key]);
    }
    return normalized;
  }

  return inputs;
}

/**
 * Generate content hash for geometry
 */
export async function hashGeometry(data: ArrayBuffer): Promise<string> {
  // In browser environment, use Web Crypto API
  if (typeof window !== 'undefined' && window.crypto?.subtle) {
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hashBuffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')
      .substring(0, 16);
  }

  // In Node.js environment
  return hash(Buffer.from(data).toString('base64'));
}