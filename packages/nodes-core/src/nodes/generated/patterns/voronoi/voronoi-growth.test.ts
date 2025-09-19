
import { describe, it, expect } from 'vitest';
import { VoronoiGrowthNode } from './voronoigrowth.node';
import { createTestContext } from './../../test-utils';

describe('VoronoiGrowthNode', () => {
  it('should create VoronoiGrowth', async () => {
    const context = createTestContext();
    const inputs = {
      seeds: null
    };
    const params = {
      generations: 5,
      growthRate: 1.5
    };

    const result = await VoronoiGrowthNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.pattern).toBeDefined();
  });

  
});