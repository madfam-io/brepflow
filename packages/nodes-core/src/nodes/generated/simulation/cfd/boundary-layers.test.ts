
import { describe, it, expect } from 'vitest';
import { BoundaryLayersNode } from './boundarylayers-node';
import { createTestContext } from '../test-utils';

describe('BoundaryLayersNode', () => {
  it('should create BoundaryLayers', async () => {
    const context = createTestContext();
    const inputs = {
      mesh: null,
      wallFaces: null
    };
    const params = {
      firstLayerHeight: 0.01,
      growthRate: 1.2,
      numberOfLayers: 5,
      transitionRatio: 0.5
    };

    const result = await BoundaryLayersNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.layeredMesh).toBeDefined();
  });

  
});