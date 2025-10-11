
import { describe, it, expect } from 'vitest';
import { CylindricalNode } from './cylindrical.node';
import { createTestContext } from '../test-utils';

describe('CylindricalNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      part1: undefined,
      part2: undefined,
      axis: undefined
    } as any;
    const params = {
      minDistance: 0,
      maxDistance: 100,
      minAngle: -180,
      maxAngle: 180
    } as any;

    const result = await CylindricalNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
