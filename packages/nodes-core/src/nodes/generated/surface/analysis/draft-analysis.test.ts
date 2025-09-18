
import { describe, it, expect } from 'vitest';
import { DraftAnalysisNode } from './draftanalysis-node';
import { createTestContext } from '../test-utils';

describe('DraftAnalysisNode', () => {
  it('should create DraftAnalysis', async () => {
    const context = createTestContext();
    const inputs = {
      shape: null
    };
    const params = {
      pullDirection: [0,0,1],
      requiredAngle: 3,
      colorMapping: true
    };

    const result = await DraftAnalysisNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.analysis).toBeDefined();
    expect(result.problematicFaces).toBeDefined();
  });

  
});