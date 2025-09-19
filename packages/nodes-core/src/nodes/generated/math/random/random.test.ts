
import { describe, it, expect } from 'vitest';
import { RandomNode } from './random.node';
import { createTestContext } from './../../test-utils';

describe('RandomNode', () => {
  it('should create Random', async () => {
    const context = createTestContext();
    const inputs = {
      
    };
    const params = {
      seed: -1
    };

    const result = await RandomNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.value).toBeDefined();
  });

  
});