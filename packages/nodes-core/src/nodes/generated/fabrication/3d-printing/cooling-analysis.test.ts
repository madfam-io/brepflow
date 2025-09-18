
import { describe, it, expect } from 'vitest';
import { CoolingAnalysisNode } from './coolinganalysis-node';
import { createTestContext } from '../test-utils';

describe('CoolingAnalysisNode', () => {
  it('should create CoolingAnalysis', async () => {
    const context = createTestContext();
    const inputs = {
      slices: /* test value */
    };
    const params = {
      fanSpeed: 100,
      layerTime: 10
    };

    const result = await CoolingAnalysisNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.coolingZones).toBeDefined();
    expect(result.fanProfile).toBeDefined();
  });

  
});