
import { describe, it, expect } from 'vitest';
import { PointAttractorNode } from './pointattractor-node';
import { createTestContext } from '../test-utils';

describe('PointAttractorNode', () => {
  it('should create PointAttractor', async () => {
    const context = createTestContext();
    const inputs = {
      points: /* test value */
    };
    const params = {
      strength: 1,
      radius: 100,
      falloff: "quadratic"
    };

    const result = await PointAttractorNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.field).toBeDefined();
  });

  
});