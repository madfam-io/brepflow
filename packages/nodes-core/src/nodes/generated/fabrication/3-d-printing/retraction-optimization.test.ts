
import { describe, it, expect } from 'vitest';
import { RetractionOptimizationNode } from './retraction-optimization.node';
import { createTestContext } from '../test-utils';

describe('RetractionOptimizationNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      toolpath: undefined
    } as any;
    const params = {
      retractionDistance: 1,
      minTravelDistance: 2
    } as any;

    const result = await RetractionOptimizationNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
