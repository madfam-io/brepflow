
import { describe, it, expect } from 'vitest';
import { VisibilityAnalysisNode } from './visibility-analysis.node';
import { createTestContext } from '../test-utils';

describe('VisibilityAnalysisNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      viewpoint: undefined,
      targets: undefined
    } as any;
    const params = {
      viewAngle: 120,
      maxDistance: 100
    } as any;

    const result = await VisibilityAnalysisNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
