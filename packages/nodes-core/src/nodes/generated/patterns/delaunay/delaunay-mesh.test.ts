
import { describe, it, expect } from 'vitest';
import { DelaunayMeshNode } from './delaunay-mesh.node';
import { createTestContext } from '../test-utils';

describe('DelaunayMeshNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      boundary: undefined
    } as any;
    const params = {
      targetSize: 10,
      minAngle: 20
    } as any;

    const result = await DelaunayMeshNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
