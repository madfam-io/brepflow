
import { describe, it, expect } from 'vitest';
import { SpinAttractorNode } from './spinattractor-node';
import { createTestContext } from '../test-utils';

describe('SpinAttractorNode', () => {
  it('should create SpinAttractor', async () => {
    const context = createTestContext();
    const inputs = {
      center: /* test value */
    };
    const params = {
      strength: 1,
      radius: 100,
      axis: [0,0,1],
      decay: 0.5
    };

    const result = await SpinAttractorNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.field).toBeDefined();
  });

  
});