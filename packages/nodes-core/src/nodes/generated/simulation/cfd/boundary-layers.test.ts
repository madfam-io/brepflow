
import { describe, it, expect } from 'vitest';
import { BoundaryLayersNode } from './boundary-layers.node';
import { createTestContext } from '../test-utils';

describe('BoundaryLayersNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      mesh: undefined,
      wallFaces: undefined
    } as any;
    const params = {
      firstLayerHeight: 0.01,
      growthRate: 1.2,
      numberOfLayers: 5,
      transitionRatio: 0.5
    } as any;

    const result = await BoundaryLayersNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
