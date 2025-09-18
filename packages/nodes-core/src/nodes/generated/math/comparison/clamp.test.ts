
import { describe, it, expect } from 'vitest';
import { ClampNode } from './clamp-node';
import { createTestContext } from '../test-utils';

describe('ClampNode', () => {
  it('should create Clamp', async () => {
    const context = createTestContext();
    const inputs = {
      value: /* test value */,
      min: /* test value */,
      max: /* test value */
    };
    const params = {
      
    };

    const result = await ClampNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.result).toBeDefined();
  });

  
});