
import { describe, it, expect } from 'vitest';
import { QuadMeshNode } from './quad-mesh.node';
import { createTestContext } from './../../test-utils';

describe('QuadMeshNode', () => {
  it('should create QuadMesh', async () => {
    const context = createTestContext();
    const inputs = {
      shape: null
    };
    const params = {
      targetQuadSize: 5,
      quadDominance: 0.8
    };

    const result = await QuadMeshNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.quadMesh).toBeDefined();
  });

  
});