
import { describe, it, expect } from 'vitest';
import { CantorSetNode } from './cantorset-node';
import { createTestContext } from '../test-utils';

describe('CantorSetNode', () => {
  it('should create CantorSet', async () => {
    const context = createTestContext();
    const inputs = {
      segment: /* test value */
    };
    const params = {
      iterations: 5,
      ratio: 0.333
    };

    const result = await CantorSetNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.segments).toBeDefined();
  });

  
});