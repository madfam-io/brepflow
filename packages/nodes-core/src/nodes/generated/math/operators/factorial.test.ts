
import { describe, it, expect } from 'vitest';
import { FactorialNode } from './factorial-node';
import { createTestContext } from '../test-utils';

describe('FactorialNode', () => {
  it('should create Factorial', async () => {
    const context = createTestContext();
    const inputs = {
      n: /* test value */
    };
    const params = {
      
    };

    const result = await FactorialNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.result).toBeDefined();
  });

  
});