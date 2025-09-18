
import { describe, it, expect } from 'vitest';
import { NetworkSurfaceNode } from './networksurface-node';
import { createTestContext } from '../test-utils';

describe('NetworkSurfaceNode', () => {
  it('should create NetworkSurface', async () => {
    const context = createTestContext();
    const inputs = {
      uCurves: /* test value */,
      vCurves: /* test value */
    };
    const params = {
      continuity: "G1",
      tolerance: 0.01
    };

    const result = await NetworkSurfaceNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.surface).toBeDefined();
  });

  
});