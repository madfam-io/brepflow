
import { describe, it, expect } from 'vitest';
import { SmoothMeshNode } from './smoothmesh-node';
import { createTestContext } from '../test-utils';

describe('SmoothMeshNode', () => {
  it('should create SmoothMesh', async () => {
    const context = createTestContext();
    const inputs = {
      mesh: null
    };
    const params = {
      iterations: 5,
      smoothingFactor: 0.5,
      preserveVolume: true
    };

    const result = await SmoothMeshNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.smoothed).toBeDefined();
  });

  
});