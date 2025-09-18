
import { describe, it, expect } from 'vitest';
import { SumNode } from './sum-node';
import { createTestContext } from '../test-utils';

describe('SumNode', () => {
  it('should create Sum', async () => {
    const context = createTestContext();
    const inputs = {
      values: null
    };
    const params = {
      
    };

    const result = await SumNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.sum).toBeDefined();
  });

  
});