
import { describe, it, expect } from 'vitest';
import { AlternatingTreadStairNode } from './alternating-tread-stair.node';
import { createTestContext } from '../test-utils';

describe('AlternatingTreadStairNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      startPoint: undefined,
      totalRise: undefined
    } as any;
    const params = {
      angle: 56,
      treadWidth: 600
    } as any;

    const result = await AlternatingTreadStairNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
