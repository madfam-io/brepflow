
import { describe, it, expect } from 'vitest';
import { ToBooleanNode } from './toboolean-node';
import { createTestContext } from '../test-utils';

describe('ToBooleanNode', () => {
  it('should create ToBoolean', async () => {
    const context = createTestContext();
    const inputs = {
      data: null
    };
    const params = {
      
    };

    const result = await ToBooleanNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.boolean).toBeDefined();
  });

  
});