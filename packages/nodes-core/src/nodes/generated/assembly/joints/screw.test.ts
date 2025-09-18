
import { describe, it, expect } from 'vitest';
import { ScrewNode } from './screw-node';
import { createTestContext } from '../test-utils';

describe('ScrewNode', () => {
  it('should create Screw', async () => {
    const context = createTestContext();
    const inputs = {
      part1: /* test value */,
      part2: /* test value */,
      axis: /* test value */
    };
    const params = {
      pitch: 1
    };

    const result = await ScrewNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.joint).toBeDefined();
  });

  
});