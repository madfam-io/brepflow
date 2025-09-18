
import { describe, it, expect } from 'vitest';
import { RangeNode } from './range-node';
import { createTestContext } from '../test-utils';

describe('RangeNode', () => {
  it('should create Range', async () => {
    const context = createTestContext();
    const inputs = {
      values: /* test value */
    };
    const params = {
      
    };

    const result = await RangeNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.min).toBeDefined();
    expect(result.max).toBeDefined();
    expect(result.range).toBeDefined();
  });

  
});