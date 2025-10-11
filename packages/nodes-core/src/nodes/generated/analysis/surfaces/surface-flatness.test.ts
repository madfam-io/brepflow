
import { describe, it, expect } from 'vitest';
import { SurfaceFlatnessNode } from './surface-flatness.node';
import { createTestContext } from '../test-utils';

describe('SurfaceFlatnessNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      surface: undefined
    } as any;
    const params = {
      tolerance: 0.1,
      showBestFitPlane: true
    } as any;

    const result = await SurfaceFlatnessNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
