
import { describe, it, expect } from 'vitest';
import { WeavePatternNode } from './weavepattern-node';
import { createTestContext } from '../test-utils';

describe('WeavePatternNode', () => {
  it('should create WeavePattern', async () => {
    const context = createTestContext();
    const inputs = {
      boundary: null
    };
    const params = {
      weaveType: "plain",
      warpCount: 10,
      weftCount: 10
    };

    const result = await WeavePatternNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.weave).toBeDefined();
  });

  
});