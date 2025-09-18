
import { describe, it, expect } from 'vitest';
import { MarchingCubesNode } from './marchingcubes-node';
import { createTestContext } from '../test-utils';

describe('MarchingCubesNode', () => {
  it('should create MarchingCubes', async () => {
    const context = createTestContext();
    const inputs = {
      scalarField: null
    };
    const params = {
      isovalue: 0,
      resolution: 32,
      smooth: true
    };

    const result = await MarchingCubesNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.mesh).toBeDefined();
    expect(result.vertices).toBeDefined();
    expect(result.normals).toBeDefined();
  });

  
});