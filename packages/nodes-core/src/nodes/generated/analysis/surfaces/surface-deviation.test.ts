
import { describe, it, expect } from 'vitest';
import { SurfaceDeviationNode } from './surfacedeviation.node';
import { createTestContext } from './../../test-utils';

describe('SurfaceDeviationNode', () => {
  it('should create SurfaceDeviation', async () => {
    const context = createTestContext();
    const inputs = {
      testSurface: null,
      referenceSurface: null
    };
    const params = {
      samples: 100,
      colorMap: true,
      tolerance: 0.1
    };

    const result = await SurfaceDeviationNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.deviationMap).toBeDefined();
    expect(result.maxDeviation).toBeDefined();
    expect(result.averageDeviation).toBeDefined();
    expect(result.deviationPoints).toBeDefined();
  });

  
});