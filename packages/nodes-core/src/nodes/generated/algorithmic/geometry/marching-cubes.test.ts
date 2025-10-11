
import { describe, it, expect } from 'vitest';
import { MarchingCubesNode } from './marching-cubes.node';
import { createTestContext } from '../test-utils';

describe('MarchingCubesNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      scalarField: undefined
    } as any;
    const params = {
      isovalue: 0,
      resolution: 32,
      smooth: true
    } as any;

    const result = await MarchingCubesNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
