
import { describe, it, expect } from 'vitest';
import { LerpNode } from './lerp.node';
import { createTestContext } from './../../test-utils';

describe('LerpNode', () => {
  it('should create Lerp', async () => {
    const context = createTestContext();
    const inputs = {
      a: null,
      b: null,
      t: null
    };
    const params = {
      
    };

    const result = await LerpNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.result).toBeDefined();
  });

  
});