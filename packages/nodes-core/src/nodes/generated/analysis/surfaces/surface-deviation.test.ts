
import { describe, it, expect } from 'vitest';
import { SurfaceDeviationNode } from './surface-deviation.node';
import { createTestContext } from '../test-utils';

describe('SurfaceDeviationNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      testSurface: undefined,
      referenceSurface: undefined
    } as any;
    const params = {
      samples: 100,
      colorMap: true,
      tolerance: 0.1
    } as any;

    const result = await SurfaceDeviationNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
