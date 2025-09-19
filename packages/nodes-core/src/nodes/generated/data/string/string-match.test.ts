
import { describe, it, expect } from 'vitest';
import { StringMatchNode } from './stringmatch.node';
import { createTestContext } from './../../test-utils';

describe('StringMatchNode', () => {
  it('should create StringMatch', async () => {
    const context = createTestContext();
    const inputs = {
      string: null,
      pattern: null
    };
    const params = {
      global: false
    };

    const result = await StringMatchNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.matches).toBeDefined();
  });

  
});