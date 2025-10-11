
import { describe, it, expect } from 'vitest';
import { NestingOptimizationNode } from './nesting-optimization.node';
import { createTestContext } from '../test-utils';

describe('NestingOptimizationNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      parts: undefined,
      sheet: undefined
    } as any;
    const params = {
      spacing: 2,
      rotations: true,
      grainDirection: false
    } as any;

    const result = await NestingOptimizationNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
