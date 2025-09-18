
import { describe, it, expect } from 'vitest';
import { SphericalNode } from './spherical-node';
import { createTestContext } from '../test-utils';

describe('SphericalNode', () => {
  it('should create Spherical', async () => {
    const context = createTestContext();
    const inputs = {
      part1: /* test value */,
      part2: /* test value */,
      center: /* test value */
    };
    const params = {
      coneAngle: 45
    };

    const result = await SphericalNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.joint).toBeDefined();
  });

  
});