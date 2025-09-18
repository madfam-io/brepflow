
import { describe, it, expect } from 'vitest';
import { DifferenceNode } from './difference-node';
import { createTestContext } from '../test-utils';

describe('DifferenceNode', () => {
  it('should create Difference', async () => {
    const context = createTestContext();
    const inputs = {
      base: /* test value */,
      tools: /* test value */
    };
    const params = {
      keepOriginals: false,
      fuzzyValue: 1e-7
    };

    const result = await DifferenceNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.result).toBeDefined();
  });

  
});