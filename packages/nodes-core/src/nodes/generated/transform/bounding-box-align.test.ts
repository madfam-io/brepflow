
import { describe, it, expect } from 'vitest';
import { BoundingBoxAlignNode } from './bounding-box-align.node';
import { createTestContext } from '../test-utils';

describe('BoundingBoxAlignNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      shape: undefined
    } as any;
    const params = {
      alignToOrigin: true,
      alignCorner: "min"
    } as any;

    const result = await BoundingBoxAlignNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
