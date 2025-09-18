
import { describe, it, expect } from 'vitest';
import { BlendSurfaceNode } from './blendsurface-node';
import { createTestContext } from '../test-utils';

describe('BlendSurfaceNode', () => {
  it('should create BlendSurface', async () => {
    const context = createTestContext();
    const inputs = {
      surface1: /* test value */,
      surface2: /* test value */
    };
    const params = {
      continuity: "G1",
      blendFactor: 0.5
    };

    const result = await BlendSurfaceNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.blendSurface).toBeDefined();
  });

  
});