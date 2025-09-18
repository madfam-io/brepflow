
import { describe, it, expect } from 'vitest';
import { DivideNode } from './divide-node';
import { createTestContext } from '../test-utils';

describe('DivideNode', () => {
  it('should create Divide', async () => {
    const context = createTestContext();
    const inputs = {
      a: /* test value */,
      b: /* test value */
    };
    const params = {
      
    };

    const result = await DivideNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.result).toBeDefined();
  });

  
});