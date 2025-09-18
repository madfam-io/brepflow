
import { describe, it, expect } from 'vitest';
import { DelaunayMeshNode } from './delaunaymesh-node';
import { createTestContext } from '../test-utils';

describe('DelaunayMeshNode', () => {
  it('should create DelaunayMesh', async () => {
    const context = createTestContext();
    const inputs = {
      boundary: null
    };
    const params = {
      targetSize: 10,
      minAngle: 20
    };

    const result = await DelaunayMeshNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.mesh).toBeDefined();
  });

  
});