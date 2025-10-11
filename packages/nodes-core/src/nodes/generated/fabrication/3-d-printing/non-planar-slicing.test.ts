
import { describe, it, expect } from 'vitest';
import { NonPlanarSlicingNode } from './non-planar-slicing.node';
import { createTestContext } from '../test-utils';

describe('NonPlanarSlicingNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      model: undefined
    } as any;
    const params = {
      maxAngle: 30
    } as any;

    const result = await NonPlanarSlicingNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
