
import { describe, it, expect } from 'vitest';
import { CylindricalNode } from './cylindrical.node';
import { createTestContext } from './../../test-utils';

describe('CylindricalNode', () => {
  it('should create Cylindrical', async () => {
    const context = createTestContext();
    const inputs = {
      part1: null,
      part2: null,
      axis: null
    };
    const params = {
      minDistance: 0,
      maxDistance: 100,
      minAngle: -180,
      maxAngle: 180
    };

    const result = await CylindricalNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.joint).toBeDefined();
  });

  
});