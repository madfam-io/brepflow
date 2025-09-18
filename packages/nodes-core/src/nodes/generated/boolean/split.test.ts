
import { describe, it, expect } from 'vitest';
import { SplitNode } from './split-node';
import { createTestContext } from '../test-utils';

describe('SplitNode', () => {
  it('should create Split', async () => {
    const context = createTestContext();
    const inputs = {
      shapes: /* test value */,
      tools: /* test value */
    };
    const params = {
      keepAll: true
    };

    const result = await SplitNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.fragments).toBeDefined();
  });

  
});