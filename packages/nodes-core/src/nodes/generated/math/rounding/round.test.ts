
import { describe, it, expect } from 'vitest';
import { RoundNode } from './round.node';
import { createTestContext } from './../../test-utils';

describe('RoundNode', () => {
  it('should create Round', async () => {
    const context = createTestContext();
    const inputs = {
      value: null
    };
    const params = {
      
    };

    const result = await RoundNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.result).toBeDefined();
  });

  
});