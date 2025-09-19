
import { describe, it, expect } from 'vitest';
import { ExponentialNode } from './exponential.node';
import { createTestContext } from './../../test-utils';

describe('ExponentialNode', () => {
  it('should create Exponential', async () => {
    const context = createTestContext();
    const inputs = {
      value: null
    };
    const params = {
      
    };

    const result = await ExponentialNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.result).toBeDefined();
  });

  
});