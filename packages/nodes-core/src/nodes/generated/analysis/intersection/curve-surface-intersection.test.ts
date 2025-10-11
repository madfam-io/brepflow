
import { describe, it, expect } from 'vitest';
import { CurveSurfaceIntersectionNode } from './curve-surface-intersection.node';
import { createTestContext } from '../test-utils';

describe('CurveSurfaceIntersectionNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      curve: undefined,
      surface: undefined
    } as any;
    const params = {
      tolerance: 0.01,
      extendCurve: false
    } as any;

    const result = await CurveSurfaceIntersectionNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
