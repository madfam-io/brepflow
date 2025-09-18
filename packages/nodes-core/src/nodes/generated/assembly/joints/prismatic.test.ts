
import { describe, it, expect } from 'vitest';
import { PrismaticNode } from './prismatic-node';
import { createTestContext } from '../test-utils';

describe('PrismaticNode', () => {
  it('should create Prismatic', async () => {
    const context = createTestContext();
    const inputs = {
      part1: null,
      part2: null,
      direction: null
    };
    const params = {
      minDistance: 0,
      maxDistance: 100
    };

    const result = await PrismaticNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.joint).toBeDefined();
  });

  
});