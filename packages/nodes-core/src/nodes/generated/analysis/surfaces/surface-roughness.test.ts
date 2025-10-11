
import { describe, it, expect } from 'vitest';
import { SurfaceRoughnessNode } from './surface-roughness.node';
import { createTestContext } from '../test-utils';

describe('SurfaceRoughnessNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      surface: undefined
    } as any;
    const params = {
      sampleDensity: 50,
      analysisType: "all"
    } as any;

    const result = await SurfaceRoughnessNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
