
import { describe, it, expect } from 'vitest';
import { ZebraAnalysisNode } from './zebraanalysis-node';
import { createTestContext } from '../test-utils';

describe('ZebraAnalysisNode', () => {
  it('should create ZebraAnalysis', async () => {
    const context = createTestContext();
    const inputs = {
      surface: null
    };
    const params = {
      stripeCount: 20,
      stripeDirection: [0,0,1],
      stripeWidth: 1
    };

    const result = await ZebraAnalysisNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.stripes).toBeDefined();
  });

  
});