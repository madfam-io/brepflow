
import { describe, it, expect } from 'vitest';
import { VoxelMeshNode } from './voxelmesh-node';
import { createTestContext } from '../test-utils';

describe('VoxelMeshNode', () => {
  it('should create VoxelMesh', async () => {
    const context = createTestContext();
    const inputs = {
      shape: null
    };
    const params = {
      voxelSize: 1,
      fillInterior: false
    };

    const result = await VoxelMeshNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.voxels).toBeDefined();
  });

  
});