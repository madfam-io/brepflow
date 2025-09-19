
import { describe, it, expect } from 'vitest';
import { GreenRoofNode } from './greenroof.node';
import { createTestContext } from './../../test-utils';

describe('GreenRoofNode', () => {
  it('should create GreenRoof', async () => {
    const context = createTestContext();
    const inputs = {
      roofSurface: null
    };
    const params = {
      type: "extensive",
      soilDepth: 100
    };

    const result = await GreenRoofNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.greenRoof).toBeDefined();
    expect(result.layers).toBeDefined();
  });

  
});