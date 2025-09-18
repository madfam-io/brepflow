
import { describe, it, expect } from 'vitest';
import { PlanarNode } from './planar-node';
import { createTestContext } from '../test-utils';

describe('PlanarNode', () => {
  it('should create Planar', async () => {
    const context = createTestContext();
    const inputs = {
      part1: /* test value */,
      part2: /* test value */,
      plane: /* test value */
    };
    const params = {
      
    };

    const result = await PlanarNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.joint).toBeDefined();
  });

  
});