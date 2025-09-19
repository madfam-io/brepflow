
import { describe, it, expect } from 'vitest';
import { PrismNode } from './prism.node';
import { createTestContext } from './../../test-utils';

describe('PrismNode', () => {
  it('should create Prism', async () => {
    const context = createTestContext();
    const inputs = {
      profile: null
    };
    const params = {
      height: 100,
      twist: 0,
      taper: 1
    };

    const result = await PrismNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.solid).toBeDefined();
  });

  
});