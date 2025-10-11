
import { describe, it, expect } from 'vitest';
import { BSplineSurfaceNode } from './bspline-surface.node';
import { createTestContext } from '../test-utils';

describe('BSplineSurfaceNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      controlPoints: undefined
    } as any;
    const params = {
      uDegree: 3,
      vDegree: 3,
      uPeriodic: false,
      vPeriodic: false
    } as any;

    const result = await BSplineSurfaceNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
