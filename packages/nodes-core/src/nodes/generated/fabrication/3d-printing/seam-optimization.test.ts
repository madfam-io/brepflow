
import { describe, it, expect } from 'vitest';
import { SeamOptimizationNode } from './seamoptimization.node';
import { createTestContext } from './../../test-utils';

describe('SeamOptimizationNode', () => {
  it('should create SeamOptimization', async () => {
    const context = createTestContext();
    const inputs = {
      slices: null
    };
    const params = {
      strategy: "hidden"
    };

    const result = await SeamOptimizationNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.optimizedSlices).toBeDefined();
    expect(result.seamPoints).toBeDefined();
  });

  
});