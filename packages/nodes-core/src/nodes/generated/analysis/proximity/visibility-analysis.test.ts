
import { describe, it, expect } from 'vitest';
import { VisibilityAnalysisNode } from './visibilityanalysis.node';
import { createTestContext } from './../../test-utils';

describe('VisibilityAnalysisNode', () => {
  it('should create VisibilityAnalysis', async () => {
    const context = createTestContext();
    const inputs = {
      viewpoint: null,
      targets: null
    };
    const params = {
      viewAngle: 120,
      maxDistance: 100
    };

    const result = await VisibilityAnalysisNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.visibleTargets).toBeDefined();
    expect(result.occludedTargets).toBeDefined();
    expect(result.sightLines).toBeDefined();
  });

  
});