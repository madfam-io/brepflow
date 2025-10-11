
import { describe, it, expect } from 'vitest';
import { VoxelGridNode } from './voxel-grid.node';
import { createTestContext } from '../test-utils';

describe('VoxelGridNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      geometry: undefined
    } as any;
    const params = {
      voxelSize: 1,
      fillInterior: true,
      optimize: true
    } as any;

    const result = await VoxelGridNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
