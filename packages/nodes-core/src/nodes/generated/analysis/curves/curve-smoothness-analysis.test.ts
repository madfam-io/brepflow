
import { describe, it, expect } from 'vitest';
import { CurveSmoothnessAnalysisNode } from './curvesmoothnessanalysis.node';
import { createTestContext } from './../../test-utils';

describe('CurveSmoothnessAnalysisNode', () => {
  it('should create CurveSmoothnessAnalysis', async () => {
    const context = createTestContext();
    const inputs = {
      curve: null
    };
    const params = {
      continuityLevel: "G2",
      tolerance: 0.01,
      showBreaks: true
    };

    const result = await CurveSmoothnessAnalysisNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.isSmooth).toBeDefined();
    expect(result.breakPoints).toBeDefined();
    expect(result.continuityReport).toBeDefined();
  });

  
});