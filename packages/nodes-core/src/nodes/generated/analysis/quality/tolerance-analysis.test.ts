
import { describe, it, expect } from 'vitest';
import { ToleranceAnalysisNode } from './tolerance-analysis.node';
import { createTestContext } from '../test-utils';

describe('ToleranceAnalysisNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      measured: undefined,
      nominal: undefined
    } as any;
    const params = {
      nominalTolerance: 0.1,
      showDeviations: true
    } as any;

    const result = await ToleranceAnalysisNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
