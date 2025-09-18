
import { describe, it, expect } from 'vitest';
import { EaseInNode } from './easein-node';
import { createTestContext } from '../test-utils';

describe('EaseInNode', () => {
  it('should create EaseIn', async () => {
    const context = createTestContext();
    const inputs = {
      t: /* test value */
    };
    const params = {
      power: 2
    };

    const result = await EaseInNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.result).toBeDefined();
  });

  
});