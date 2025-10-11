
import { describe, it, expect } from 'vitest';
import { SphericalNode } from './spherical.node';
import { createTestContext } from '../test-utils';

describe('SphericalNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      part1: undefined,
      part2: undefined,
      center: undefined
    } as any;
    const params = {
      coneAngle: 45
    } as any;

    const result = await SphericalNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
