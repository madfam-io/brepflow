
import { describe, it, expect } from 'vitest';
import { TypeOfNode } from './typeof-node';
import { createTestContext } from '../test-utils';

describe('TypeOfNode', () => {
  it('should create TypeOf', async () => {
    const context = createTestContext();
    const inputs = {
      data: /* test value */
    };
    const params = {
      
    };

    const result = await TypeOfNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.type).toBeDefined();
  });

  
});