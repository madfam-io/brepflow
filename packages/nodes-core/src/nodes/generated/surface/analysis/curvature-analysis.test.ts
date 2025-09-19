
import { describe, it, expect } from 'vitest';
import { CurvatureAnalysisNode } from './curvatureanalysis.node';
import { createTestContext } from './../../test-utils';

describe('CurvatureAnalysisNode', () => {
  it('should create CurvatureAnalysis', async () => {
    const context = createTestContext();
    const inputs = {
      surface: null
    };
    const params = {
      analysisType: "gaussian",
      sampleDensity: 50
    };

    const result = await CurvatureAnalysisNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.analysis).toBeDefined();
    expect(result.visualization).toBeDefined();
  });

  
});