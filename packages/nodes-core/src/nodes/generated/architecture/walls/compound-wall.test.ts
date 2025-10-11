
import { describe, it, expect } from 'vitest';
import { CompoundWallNode } from './compound-wall.node';
import { createTestContext } from '../test-utils';

describe('CompoundWallNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      path: undefined
    } as any;
    const params = {
      layers: 3,
      layerThicknesses: "100,50,100",
      layerMaterials: "brick,insulation,drywall"
    } as any;

    const result = await CompoundWallNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
