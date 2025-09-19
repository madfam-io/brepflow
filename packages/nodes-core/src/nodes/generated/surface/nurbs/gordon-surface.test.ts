
import { describe, it, expect } from 'vitest';
import { GordonSurfaceNode } from './gordonsurface.node';
import { createTestContext } from './../../test-utils';

describe('GordonSurfaceNode', () => {
  it('should create GordonSurface', async () => {
    const context = createTestContext();
    const inputs = {
      uCurves: null,
      vCurves: null
    };
    const params = {
      
    };

    const result = await GordonSurfaceNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.surface).toBeDefined();
  });

  
});