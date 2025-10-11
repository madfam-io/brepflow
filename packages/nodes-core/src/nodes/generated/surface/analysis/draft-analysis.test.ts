
import { describe, it, expect } from 'vitest';
import { DraftAnalysisNode } from './draft-analysis.node';
import { createTestContext } from '../test-utils';

describe('DraftAnalysisNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      shape: undefined
    } as any;
    const params = {
      pullDirection: [0,0,1],
      requiredAngle: 3,
      colorMapping: true
    } as any;

    const result = await DraftAnalysisNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
