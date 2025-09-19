
import { describe, it, expect } from 'vitest';
import { CurveOnSurfaceNode } from './curveonsurface.node';
import { createTestContext } from './../../test-utils';

describe('CurveOnSurfaceNode', () => {
  it('should create CurveOnSurface', async () => {
    const context = createTestContext();
    const inputs = {
      surface: null,
      uvPoints: null
    };
    const params = {
      
    };

    const result = await CurveOnSurfaceNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.curve).toBeDefined();
  });

  
});