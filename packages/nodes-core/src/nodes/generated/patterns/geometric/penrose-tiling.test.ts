
import { describe, it, expect } from 'vitest';
import { PenroseTilingNode } from './penrosetiling.node';
import { createTestContext } from './../../test-utils';

describe('PenroseTilingNode', () => {
  it('should create PenroseTiling', async () => {
    const context = createTestContext();
    const inputs = {
      boundary: null
    };
    const params = {
      type: "P2",
      subdivisions: 5
    };

    const result = await PenroseTilingNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.tiles).toBeDefined();
  });

  
});