
import { describe, it, expect } from 'vitest';
import { CompoundWallNode } from './compoundwall-node';
import { createTestContext } from '../test-utils';

describe('CompoundWallNode', () => {
  it('should create CompoundWall', async () => {
    const context = createTestContext();
    const inputs = {
      path: null
    };
    const params = {
      layers: 3,
      layerThicknesses: "100,50,100",
      layerMaterials: "brick,insulation,drywall"
    };

    const result = await CompoundWallNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.compoundWall).toBeDefined();
    expect(result.layers).toBeDefined();
  });

  
});