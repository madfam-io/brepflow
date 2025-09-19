
import { describe, it, expect } from 'vitest';
import { SurfaceDeviationNode } from './surfacedeviation.node';
import { createTestContext } from './../../test-utils';

describe('SurfaceDeviationNode', () => {
  it('should create SurfaceDeviation', async () => {
    const context = createTestContext();
    const inputs = {
      surface1: null,
      surface2: null
    };
    const params = {
      sampleCount: 1000
    };

    const result = await SurfaceDeviationNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.maxDeviation).toBeDefined();
    expect(result.avgDeviation).toBeDefined();
    expect(result.deviationMap).toBeDefined();
  });

  
});