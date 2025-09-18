
import { describe, it, expect } from 'vitest';
import { BezierSurfaceNode } from './beziersurface-node';
import { createTestContext } from '../test-utils';

describe('BezierSurfaceNode', () => {
  it('should create BezierSurface', async () => {
    const context = createTestContext();
    const inputs = {
      controlPoints: /* test value */
    };
    const params = {
      uDegree: 3,
      vDegree: 3
    };

    const result = await BezierSurfaceNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.surface).toBeDefined();
  });

  
});