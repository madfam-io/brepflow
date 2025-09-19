
import { describe, it, expect } from 'vitest';
import { BrimGenerationNode } from './brimgeneration.node';
import { createTestContext } from './../../test-utils';

describe('BrimGenerationNode', () => {
  it('should create BrimGeneration', async () => {
    const context = createTestContext();
    const inputs = {
      model: null
    };
    const params = {
      brimWidth: 10,
      brimLines: 20
    };

    const result = await BrimGenerationNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.brim).toBeDefined();
  });

  
});