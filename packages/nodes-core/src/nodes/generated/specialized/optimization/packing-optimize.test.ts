
import { describe, it, expect } from 'vitest';
import { PackingOptimizeNode } from './packingoptimize-node';
import { createTestContext } from '../test-utils';

describe('PackingOptimizeNode', () => {
  it('should create PackingOptimize', async () => {
    const context = createTestContext();
    const inputs = {
      parts: /* test value */
    };
    const params = {
      containerSize: [100,100,100],
      rotationAllowed: true,
      algorithm: "genetic"
    };

    const result = await PackingOptimizeNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.packing).toBeDefined();
    expect(result.efficiency).toBeDefined();
  });

  
});