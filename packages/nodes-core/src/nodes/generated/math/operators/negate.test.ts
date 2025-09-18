
import { describe, it, expect } from 'vitest';
import { NegateNode } from './negate-node';
import { createTestContext } from '../test-utils';

describe('NegateNode', () => {
  it('should create Negate', async () => {
    const context = createTestContext();
    const inputs = {
      value: /* test value */
    };
    const params = {
      
    };

    const result = await NegateNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.result).toBeDefined();
  });

  
});