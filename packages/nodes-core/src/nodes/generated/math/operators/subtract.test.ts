
import { describe, it, expect } from 'vitest';
import { SubtractNode } from './subtract-node';
import { createTestContext } from '../test-utils';

describe('SubtractNode', () => {
  it('should create Subtract', async () => {
    const context = createTestContext();
    const inputs = {
      a: /* test value */,
      b: /* test value */
    };
    const params = {
      
    };

    const result = await SubtractNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.result).toBeDefined();
  });

  
});