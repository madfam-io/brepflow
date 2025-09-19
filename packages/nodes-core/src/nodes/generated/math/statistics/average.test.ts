
import { describe, it, expect } from 'vitest';
import { AverageNode } from './average.node';
import { createTestContext } from './../../test-utils';

describe('AverageNode', () => {
  it('should create Average', async () => {
    const context = createTestContext();
    const inputs = {
      values: null
    };
    const params = {
      
    };

    const result = await AverageNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.average).toBeDefined();
  });

  
});