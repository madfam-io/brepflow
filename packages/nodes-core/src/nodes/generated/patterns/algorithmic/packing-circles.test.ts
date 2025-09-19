
import { describe, it, expect } from 'vitest';
import { PackingCirclesNode } from './packingcircles.node';
import { createTestContext } from './../../test-utils';

describe('PackingCirclesNode', () => {
  it('should create PackingCircles', async () => {
    const context = createTestContext();
    const inputs = {
      boundary: null,
      radii: null
    };
    const params = {
      algorithm: "power-diagram"
    };

    const result = await PackingCirclesNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.circles).toBeDefined();
    expect(result.centers).toBeDefined();
  });

  
});