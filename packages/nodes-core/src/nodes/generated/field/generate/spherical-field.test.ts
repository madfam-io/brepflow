
import { describe, it, expect } from 'vitest';
import { SphericalFieldNode } from './sphericalfield-node';
import { createTestContext } from '../test-utils';

describe('SphericalFieldNode', () => {
  it('should create SphericalField', async () => {
    const context = createTestContext();
    const inputs = {
      center: /* test value */
    };
    const params = {
      innerRadius: 10,
      outerRadius: 100,
      falloff: "smooth"
    };

    const result = await SphericalFieldNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.field).toBeDefined();
  });

  
});