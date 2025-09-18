
import { describe, it, expect } from 'vitest';
import { ShadowAnalysisNode } from './shadowanalysis-node';
import { createTestContext } from '../test-utils';

describe('ShadowAnalysisNode', () => {
  it('should create ShadowAnalysis', async () => {
    const context = createTestContext();
    const inputs = {
      lightSource: /* test value */,
      objects: /* test value */,
      groundPlane: /* test value */
    };
    const params = {
      lightType: "directional",
      intensity: 1
    };

    const result = await ShadowAnalysisNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.shadowRegions).toBeDefined();
    expect(result.lightRays).toBeDefined();
    expect(result.illuminatedAreas).toBeDefined();
  });

  
});