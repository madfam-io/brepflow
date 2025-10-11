
import { describe, it, expect } from 'vitest';
import { SurfaceDeviationNode } from './surface-deviation.node';
import { createTestContext } from '../test-utils';

describe('SurfaceDeviationNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      surface1: undefined,
      surface2: undefined
    } as any;
    const params = {
      sampleCount: 1000
    } as any;

    const result = await SurfaceDeviationNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
