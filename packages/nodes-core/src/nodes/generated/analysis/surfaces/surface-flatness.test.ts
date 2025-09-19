
import { describe, it, expect } from 'vitest';
import { SurfaceFlatnessNode } from './surfaceflatness.node';
import { createTestContext } from './../../test-utils';

describe('SurfaceFlatnessNode', () => {
  it('should create SurfaceFlatness', async () => {
    const context = createTestContext();
    const inputs = {
      surface: null
    };
    const params = {
      tolerance: 0.1,
      showBestFitPlane: true
    };

    const result = await SurfaceFlatnessNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.isFlat).toBeDefined();
    expect(result.flatness).toBeDefined();
    expect(result.bestFitPlane).toBeDefined();
    expect(result.maxDeviation).toBeDefined();
  });

  
});