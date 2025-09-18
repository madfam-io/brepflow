
import { describe, it, expect } from 'vitest';
import { SurfaceRoughnessNode } from './surfaceroughness-node';
import { createTestContext } from '../test-utils';

describe('SurfaceRoughnessNode', () => {
  it('should create SurfaceRoughness', async () => {
    const context = createTestContext();
    const inputs = {
      surface: /* test value */
    };
    const params = {
      sampleDensity: 50,
      analysisType: "all"
    };

    const result = await SurfaceRoughnessNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.roughnessRa).toBeDefined();
    expect(result.roughnessRz).toBeDefined();
    expect(result.roughnessRq).toBeDefined();
    expect(result.roughnessMap).toBeDefined();
  });

  
});