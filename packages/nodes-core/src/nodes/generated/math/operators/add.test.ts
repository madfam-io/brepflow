
import { describe, it, expect } from 'vitest';
import { AddNode } from './add.node';
import { createTestContext } from './../../test-utils';

describe('AddNode', () => {
  it('should create Add', async () => {
    const context = createTestContext();
    const inputs = {
      a: null,
      b: null
    };
    const params = {
      
    };

    const result = await AddNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.result).toBeDefined();
  });

  
});