
import { describe, it, expect } from 'vitest';
import { IntersectCurvesNode } from './intersectcurves-node';
import { createTestContext } from '../test-utils';

describe('IntersectCurvesNode', () => {
  it('should create IntersectCurves', async () => {
    const context = createTestContext();
    const inputs = {
      curve1: /* test value */,
      curve2: /* test value */
    };
    const params = {
      tolerance: 0.01,
      extend: false
    };

    const result = await IntersectCurvesNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.intersectionPoints).toBeDefined();
  });

  
});