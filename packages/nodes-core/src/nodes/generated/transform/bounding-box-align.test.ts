
import { describe, it, expect } from 'vitest';
import { BoundingBoxAlignNode } from './boundingboxalign-node';
import { createTestContext } from '../test-utils';

describe('BoundingBoxAlignNode', () => {
  it('should create BoundingBoxAlign', async () => {
    const context = createTestContext();
    const inputs = {
      shape: /* test value */
    };
    const params = {
      alignToOrigin: true,
      alignCorner: "min"
    };

    const result = await BoundingBoxAlignNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.aligned).toBeDefined();
    expect(result.boundingBox).toBeDefined();
  });

  
});