
import { describe, it, expect } from 'vitest';
import { SurfaceParametrizationNode } from './surface-parametrization.node';
import { createTestContext } from '../test-utils';

describe('SurfaceParametrizationNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      surface: undefined
    } as any;
    const params = {
      showGrid: true,
      gridDensity: 20
    } as any;

    const result = await SurfaceParametrizationNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
