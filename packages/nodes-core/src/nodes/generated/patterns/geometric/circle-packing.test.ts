
import { describe, it, expect } from 'vitest';
import { CirclePackingNode } from './circlepacking-node';
import { createTestContext } from '../test-utils';

describe('CirclePackingNode', () => {
  it('should create CirclePacking', async () => {
    const context = createTestContext();
    const inputs = {
      boundary: null
    };
    const params = {
      packingType: "hexagonal",
      minRadius: 1,
      maxRadius: 5
    };

    const result = await CirclePackingNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.circles).toBeDefined();
  });

  
});