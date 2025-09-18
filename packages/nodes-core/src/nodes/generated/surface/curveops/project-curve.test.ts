
import { describe, it, expect } from 'vitest';
import { ProjectCurveNode } from './projectcurve-node';
import { createTestContext } from '../test-utils';

describe('ProjectCurveNode', () => {
  it('should create ProjectCurve', async () => {
    const context = createTestContext();
    const inputs = {
      curve: /* test value */,
      surface: /* test value */
    };
    const params = {
      projectionDirection: [0,0,-1],
      projectBoth: false
    };

    const result = await ProjectCurveNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.projectedCurve).toBeDefined();
  });

  
});