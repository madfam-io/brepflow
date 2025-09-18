
import { describe, it, expect } from 'vitest';
import { IslamicStarNode } from './islamicstar-node';
import { createTestContext } from '../test-utils';

describe('IslamicStarNode', () => {
  it('should create IslamicStar', async () => {
    const context = createTestContext();
    const inputs = {
      center: null
    };
    const params = {
      points: 8,
      innerRadius: 0.5,
      rotation: 0
    };

    const result = await IslamicStarNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.pattern).toBeDefined();
  });

  
});