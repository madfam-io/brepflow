
import { describe, it, expect } from 'vitest';
import { EaseOutNode } from './easeout.node';
import { createTestContext } from './../../test-utils';

describe('EaseOutNode', () => {
  it('should create EaseOut', async () => {
    const context = createTestContext();
    const inputs = {
      t: null
    };
    const params = {
      power: 2
    };

    const result = await EaseOutNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.result).toBeDefined();
  });

  
});