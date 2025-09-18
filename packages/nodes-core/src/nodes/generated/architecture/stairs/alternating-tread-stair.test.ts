
import { describe, it, expect } from 'vitest';
import { AlternatingTreadStairNode } from './alternatingtreadstair-node';
import { createTestContext } from '../test-utils';

describe('AlternatingTreadStairNode', () => {
  it('should create AlternatingTreadStair', async () => {
    const context = createTestContext();
    const inputs = {
      startPoint: /* test value */,
      totalRise: /* test value */
    };
    const params = {
      angle: 56,
      treadWidth: 600
    };

    const result = await AlternatingTreadStairNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.alternatingStair).toBeDefined();
  });

  
});