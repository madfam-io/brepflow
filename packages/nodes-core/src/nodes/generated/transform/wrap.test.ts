
import { describe, it, expect } from 'vitest';
import { WrapNode } from './wrap-node';
import { createTestContext } from '../test-utils';

describe('WrapNode', () => {
  it('should create Wrap', async () => {
    const context = createTestContext();
    const inputs = {
      shape: /* test value */
    };
    const params = {
      type: "cylinder",
      radius: 50,
      angle: 360
    };

    const result = await WrapNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.wrapped).toBeDefined();
  });

  
});