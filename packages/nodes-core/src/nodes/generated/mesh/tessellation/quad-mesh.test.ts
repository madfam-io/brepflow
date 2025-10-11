
import { describe, it, expect } from 'vitest';
import { QuadMeshNode } from './quad-mesh.node';
import { createTestContext } from '../test-utils';

describe('QuadMeshNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      shape: undefined
    } as any;
    const params = {
      targetQuadSize: 5,
      quadDominance: 0.8
    } as any;

    const result = await QuadMeshNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
