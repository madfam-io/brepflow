
import { describe, it, expect } from 'vitest';
import { SurfaceContinuityNode } from './surfacecontinuity.node';
import { createTestContext } from './../../test-utils';

describe('SurfaceContinuityNode', () => {
  it('should create SurfaceContinuity', async () => {
    const context = createTestContext();
    const inputs = {
      surface1: null,
      surface2: null
    };
    const params = {
      continuityType: "G1",
      tolerance: 0.01,
      showAnalysis: true
    };

    const result = await SurfaceContinuityNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.isContinuous).toBeDefined();
    expect(result.discontinuityPoints).toBeDefined();
    expect(result.analysisLines).toBeDefined();
  });

  
});