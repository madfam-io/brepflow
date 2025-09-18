
import { describe, it, expect } from 'vitest';
import { SurfaceAttractorNode } from './surfaceattractor-node';
import { createTestContext } from '../test-utils';

describe('SurfaceAttractorNode', () => {
  it('should create SurfaceAttractor', async () => {
    const context = createTestContext();
    const inputs = {
      surfaces: /* test value */
    };
    const params = {
      strength: 1,
      radius: 30,
      falloff: "smooth"
    };

    const result = await SurfaceAttractorNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.field).toBeDefined();
  });

  
});