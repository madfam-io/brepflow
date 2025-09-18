
import { describe, it, expect } from 'vitest';
import { HelicalStairNode } from './helicalstair-node';
import { createTestContext } from '../test-utils';

describe('HelicalStairNode', () => {
  it('should create HelicalStair', async () => {
    const context = createTestContext();
    const inputs = {
      centerPoint: /* test value */
    };
    const params = {
      innerRadius: 500,
      outerRadius: 1500,
      totalRise: 3000
    };

    const result = await HelicalStairNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.helicalStair).toBeDefined();
  });

  
});