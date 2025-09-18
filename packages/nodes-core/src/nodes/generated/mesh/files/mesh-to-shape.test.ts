
import { describe, it, expect } from 'vitest';
import { MeshToShapeNode } from './meshtoshape-node';
import { createTestContext } from '../test-utils';

describe('MeshToShapeNode', () => {
  it('should create MeshToShape', async () => {
    const context = createTestContext();
    const inputs = {
      mesh: null
    };
    const params = {
      tolerance: 0.01,
      sewFaces: true
    };

    const result = await MeshToShapeNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.shape).toBeDefined();
  });

  
});