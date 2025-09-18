
import { describe, it, expect } from 'vitest';
import { ReachAnalysisNode } from './reachanalysis-node';
import { createTestContext } from '../test-utils';

describe('ReachAnalysisNode', () => {
  it('should create ReachAnalysis', async () => {
    const context = createTestContext();
    const inputs = {
      robotModel: null,
      workspace: null
    };
    const params = {
      resolution: 50
    };

    const result = await ReachAnalysisNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.reachableVolume).toBeDefined();
    expect(result.coverage).toBeDefined();
  });

  
});