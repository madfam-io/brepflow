
import { describe, it, expect } from 'vitest';
import { FieldVolumeNode } from './field-volume.node';
import { createTestContext } from '../test-utils';

describe('FieldVolumeNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      bounds: undefined
    } as any;
    const params = {
      voxelSize: 1,
      threshold: 0.5,
      opacity: 0.8
    } as any;

    const result = await FieldVolumeNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
