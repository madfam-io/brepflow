
import { describe, it, expect } from 'vitest';
import { MultiplyNode } from './multiply-node';
import { createTestContext } from '../test-utils';

describe('MultiplyNode', () => {
  it('should create Multiply', async () => {
    const context = createTestContext();
    const inputs = {
      a: /* test value */,
      b: /* test value */
    };
    const params = {
      
    };

    const result = await MultiplyNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.result).toBeDefined();
  });

  
});