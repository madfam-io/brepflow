
import { describe, it, expect } from 'vitest';
import { ReachAnalysisNode } from './reach-analysis.node';
import { createTestContext } from '../test-utils';

describe('ReachAnalysisNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      robotModel: undefined,
      workspace: undefined
    } as any;
    const params = {
      resolution: 50
    } as any;

    const result = await ReachAnalysisNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
