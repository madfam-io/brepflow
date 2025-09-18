
import { describe, it, expect } from 'vitest';
import { FixedNode } from './fixed-node';
import { createTestContext } from '../test-utils';

describe('FixedNode', () => {
  it('should create Fixed', async () => {
    const context = createTestContext();
    const inputs = {
      part1: /* test value */,
      part2: /* test value */
    };
    const params = {
      
    };

    const result = await FixedNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.joint).toBeDefined();
  });

  
});