
import { describe, it, expect } from 'vitest';
import { BSplineSurfaceNode } from './bsplinesurface.node';
import { createTestContext } from './../../test-utils';

describe('BSplineSurfaceNode', () => {
  it('should create BSplineSurface', async () => {
    const context = createTestContext();
    const inputs = {
      controlPoints: null
    };
    const params = {
      uDegree: 3,
      vDegree: 3,
      uPeriodic: false,
      vPeriodic: false
    };

    const result = await BSplineSurfaceNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.surface).toBeDefined();
  });

  
});