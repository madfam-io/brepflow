
import { describe, it, expect } from 'vitest';
import { CurvatureCombNode } from './curvaturecomb-node';
import { createTestContext } from '../test-utils';

describe('CurvatureCombNode', () => {
  it('should create CurvatureComb', async () => {
    const context = createTestContext();
    const inputs = {
      curve: null
    };
    const params = {
      scale: 1,
      density: 50,
      showNormals: true,
      colorCode: false
    };

    const result = await CurvatureCombNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.comb).toBeDefined();
    expect(result.maxCurvature).toBeDefined();
    expect(result.minCurvature).toBeDefined();
    expect(result.curvatureValues).toBeDefined();
  });

  
});