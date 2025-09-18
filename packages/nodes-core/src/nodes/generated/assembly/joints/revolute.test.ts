
import { describe, it, expect } from 'vitest';
import { RevoluteNode } from './revolute-node';
import { createTestContext } from '../test-utils';

describe('RevoluteNode', () => {
  it('should create Revolute', async () => {
    const context = createTestContext();
    const inputs = {
      part1: null,
      part2: null,
      axis: null
    };
    const params = {
      minAngle: -180,
      maxAngle: 180
    };

    const result = await RevoluteNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.joint).toBeDefined();
  });

  
});