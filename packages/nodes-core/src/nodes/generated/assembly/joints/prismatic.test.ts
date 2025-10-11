
import { describe, it, expect } from 'vitest';
import { PrismaticNode } from './prismatic.node';
import { createTestContext } from '../test-utils';

describe('PrismaticNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      part1: undefined,
      part2: undefined,
      direction: undefined
    } as any;
    const params = {
      minDistance: 0,
      maxDistance: 100
    } as any;

    const result = await PrismaticNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
