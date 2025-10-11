
import { describe, it, expect } from 'vitest';
import { CurvatureAnalysisNode } from './curvature-analysis.node';
import { createTestContext } from '../test-utils';

describe('CurvatureAnalysisNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      surface: undefined
    } as any;
    const params = {
      analysisType: "gaussian",
      sampleDensity: 50
    } as any;

    const result = await CurvatureAnalysisNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
