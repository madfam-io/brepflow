
import { describe, it, expect } from 'vitest';
import { SpherePackingNode } from './spherepacking.node';
import { createTestContext } from './../../test-utils';

describe('SpherePackingNode', () => {
  it('should create SpherePacking', async () => {
    const context = createTestContext();
    const inputs = {
      container: null,
      radius: null
    };
    const params = {
      packingType: "hexagonal"
    };

    const result = await SpherePackingNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.centers).toBeDefined();
    expect(result.spheres).toBeDefined();
  });

  
});