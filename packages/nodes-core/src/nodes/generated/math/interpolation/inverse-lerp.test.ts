
import { describe, it, expect } from 'vitest';
import { InverseLerpNode } from './inverselerp-node';
import { createTestContext } from '../test-utils';

describe('InverseLerpNode', () => {
  it('should create InverseLerp', async () => {
    const context = createTestContext();
    const inputs = {
      a: /* test value */,
      b: /* test value */,
      value: /* test value */
    };
    const params = {
      
    };

    const result = await InverseLerpNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.t).toBeDefined();
  });

  
});