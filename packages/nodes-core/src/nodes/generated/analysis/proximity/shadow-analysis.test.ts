
import { describe, it, expect } from 'vitest';
import { ShadowAnalysisNode } from './shadow-analysis.node';
import { createTestContext } from '../test-utils';

describe('ShadowAnalysisNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      lightSource: undefined,
      objects: undefined,
      groundPlane: undefined
    } as any;
    const params = {
      lightType: "directional",
      intensity: 1
    } as any;

    const result = await ShadowAnalysisNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
