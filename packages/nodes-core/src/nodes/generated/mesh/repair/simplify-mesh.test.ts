
import { describe, it, expect } from 'vitest';
import { SimplifyMeshNode } from './simplifymesh-node';
import { createTestContext } from '../test-utils';

describe('SimplifyMeshNode', () => {
  it('should create SimplifyMesh', async () => {
    const context = createTestContext();
    const inputs = {
      mesh: null
    };
    const params = {
      targetRatio: 0.5,
      preserveBoundaries: true,
      preserveTopology: false,
      maxError: 0.1
    };

    const result = await SimplifyMeshNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.simplified).toBeDefined();
    expect(result.triangleCount).toBeDefined();
  });

  
});