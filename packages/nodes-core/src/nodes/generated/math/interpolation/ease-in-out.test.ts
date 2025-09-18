
import { describe, it, expect } from 'vitest';
import { EaseInOutNode } from './easeinout-node';
import { createTestContext } from '../test-utils';

describe('EaseInOutNode', () => {
  it('should create EaseInOut', async () => {
    const context = createTestContext();
    const inputs = {
      t: /* test value */
    };
    const params = {
      power: 2
    };

    const result = await EaseInOutNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.result).toBeDefined();
  });

  
});