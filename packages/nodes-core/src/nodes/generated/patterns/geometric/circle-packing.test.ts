
import { describe, it, expect } from 'vitest';
import { CirclePackingNode } from './circle-packing.node';
import { createTestContext } from '../test-utils';

describe('CirclePackingNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      boundary: undefined
    } as any;
    const params = {
      packingType: "hexagonal",
      minRadius: 1,
      maxRadius: 5
    } as any;

    const result = await CirclePackingNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
