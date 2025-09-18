
import { describe, it, expect } from 'vitest';
import { ToStringNode } from './tostring-node';
import { createTestContext } from '../test-utils';

describe('ToStringNode', () => {
  it('should create ToString', async () => {
    const context = createTestContext();
    const inputs = {
      data: /* test value */
    };
    const params = {
      
    };

    const result = await ToStringNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.string).toBeDefined();
  });

  
});