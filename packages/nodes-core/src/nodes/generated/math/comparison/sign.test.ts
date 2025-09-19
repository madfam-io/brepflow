
import { describe, it, expect } from 'vitest';
import { SignNode } from './sign.node';
import { createTestContext } from './../../test-utils';

describe('SignNode', () => {
  it('should create Sign', async () => {
    const context = createTestContext();
    const inputs = {
      value: null
    };
    const params = {
      
    };

    const result = await SignNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.sign).toBeDefined();
  });

  
});