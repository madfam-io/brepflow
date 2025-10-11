
import { describe, it, expect } from 'vitest';
import { CoolingAnalysisNode } from './cooling-analysis.node';
import { createTestContext } from '../test-utils';

describe('CoolingAnalysisNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      slices: undefined
    } as any;
    const params = {
      fanSpeed: 100,
      layerTime: 10
    } as any;

    const result = await CoolingAnalysisNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
