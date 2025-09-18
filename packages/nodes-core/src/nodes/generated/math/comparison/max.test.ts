
import { describe, it, expect } from 'vitest';
import { MaxNode } from './max-node';
import { createTestContext } from '../test-utils';

describe('MaxNode', () => {
  it('should create Max', async () => {
    const context = createTestContext();
    const inputs = {
      values: /* test value */
    };
    const params = {
      
    };

    const result = await MaxNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.max).toBeDefined();
  });

  
});