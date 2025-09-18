
import { describe, it, expect } from 'vitest';
import { VoxelGridNode } from './voxelgrid-node';
import { createTestContext } from '../test-utils';

describe('VoxelGridNode', () => {
  it('should create VoxelGrid', async () => {
    const context = createTestContext();
    const inputs = {
      geometry: null
    };
    const params = {
      voxelSize: 1,
      fillInterior: true,
      optimize: true
    };

    const result = await VoxelGridNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.voxels).toBeDefined();
    expect(result.grid).toBeDefined();
    expect(result.bounds).toBeDefined();
  });

  
});