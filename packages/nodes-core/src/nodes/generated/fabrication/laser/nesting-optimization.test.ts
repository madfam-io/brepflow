
import { describe, it, expect } from 'vitest';
import { NestingOptimizationNode } from './nestingoptimization.node';
import { createTestContext } from './../../test-utils';

describe('NestingOptimizationNode', () => {
  it('should create NestingOptimization', async () => {
    const context = createTestContext();
    const inputs = {
      parts: null,
      sheet: null
    };
    const params = {
      spacing: 2,
      rotations: true,
      grainDirection: false
    };

    const result = await NestingOptimizationNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.nestedParts).toBeDefined();
    expect(result.utilization).toBeDefined();
  });

  
});