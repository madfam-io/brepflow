
import { describe, it, expect } from 'vitest';
import { FieldVolumeNode } from './fieldvolume.node';
import { createTestContext } from './../../test-utils';

describe('FieldVolumeNode', () => {
  it('should create FieldVolume', async () => {
    const context = createTestContext();
    const inputs = {
      bounds: null
    };
    const params = {
      voxelSize: 1,
      threshold: 0.5,
      opacity: 0.8
    };

    const result = await FieldVolumeNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.volume).toBeDefined();
  });

  
});