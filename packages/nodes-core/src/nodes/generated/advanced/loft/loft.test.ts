
import { describe, it, expect } from 'vitest';
import { LoftNode } from './loft-node';
import { createTestContext } from '../test-utils';

describe('LoftNode', () => {
  it('should create Loft', async () => {
    const context = createTestContext();
    const inputs = {
      profiles: /* test value */
    };
    const params = {
      ruled: false,
      closed: false,
      solid: true,
      maxDegree: 3
    };

    const result = await LoftNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.shape).toBeDefined();
  });

  
});