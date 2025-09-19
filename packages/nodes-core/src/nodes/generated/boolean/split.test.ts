
import { describe, it, expect } from 'vitest';
import { SplitNode } from './split.node';
import { createTestContext } from './../test-utils';

describe('SplitNode', () => {
  it('should create Split', async () => {
    const context = createTestContext();
    const inputs = {
      shapes: null,
      tools: null
    };
    const params = {
      keepAll: true
    };

    const result = await SplitNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.fragments).toBeDefined();
  });

  
});