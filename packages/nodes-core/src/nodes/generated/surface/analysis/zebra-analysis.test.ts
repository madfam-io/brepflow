
import { describe, it, expect } from 'vitest';
import { ZebraAnalysisNode } from './zebra-analysis.node';
import { createTestContext } from '../test-utils';

describe('ZebraAnalysisNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      surface: undefined
    } as any;
    const params = {
      stripeCount: 20,
      stripeDirection: [0,0,1],
      stripeWidth: 1
    } as any;

    const result = await ZebraAnalysisNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
