
import { describe, it, expect } from 'vitest';
import { IntersectCurvesNode } from './intersect-curves.node';
import { createTestContext } from '../test-utils';

describe('IntersectCurvesNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      curve1: undefined,
      curve2: undefined
    } as any;
    const params = {
      tolerance: 0.01,
      extend: false
    } as any;

    const result = await IntersectCurvesNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
