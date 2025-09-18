
import { describe, it, expect } from 'vitest';
import { RandomRangeNode } from './randomrange-node';
import { createTestContext } from '../test-utils';

describe('RandomRangeNode', () => {
  it('should create RandomRange', async () => {
    const context = createTestContext();
    const inputs = {
      min: /* test value */,
      max: /* test value */
    };
    const params = {
      seed: -1
    };

    const result = await RandomRangeNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.value).toBeDefined();
  });

  
});