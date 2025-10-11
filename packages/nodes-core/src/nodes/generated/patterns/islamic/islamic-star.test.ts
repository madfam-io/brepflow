
import { describe, it, expect } from 'vitest';
import { IslamicStarNode } from './islamic-star.node';
import { createTestContext } from '../test-utils';

describe('IslamicStarNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      center: undefined
    } as any;
    const params = {
      points: 8,
      innerRadius: 0.5,
      rotation: 0
    } as any;

    const result = await IslamicStarNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
