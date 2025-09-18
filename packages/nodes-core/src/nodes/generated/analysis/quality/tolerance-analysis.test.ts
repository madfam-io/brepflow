
import { describe, it, expect } from 'vitest';
import { ToleranceAnalysisNode } from './toleranceanalysis-node';
import { createTestContext } from '../test-utils';

describe('ToleranceAnalysisNode', () => {
  it('should create ToleranceAnalysis', async () => {
    const context = createTestContext();
    const inputs = {
      measured: /* test value */,
      nominal: /* test value */
    };
    const params = {
      nominalTolerance: 0.1,
      showDeviations: true
    };

    const result = await ToleranceAnalysisNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.withinTolerance).toBeDefined();
    expect(result.maxDeviation).toBeDefined();
    expect(result.deviationMap).toBeDefined();
  });

  
});