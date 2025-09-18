
import { describe, it, expect } from 'vitest';
import { MinNode } from './min-node';
import { createTestContext } from '../test-utils';

describe('MinNode', () => {
  it('should create Min', async () => {
    const context = createTestContext();
    const inputs = {
      values: null
    };
    const params = {
      
    };

    const result = await MinNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.min).toBeDefined();
  });

  
});