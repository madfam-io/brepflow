
import { describe, it, expect } from 'vitest';
import { SetPowerSetNode } from './setpowerset.node';
import { createTestContext } from './../../test-utils';

describe('SetPowerSetNode', () => {
  it('should create SetPowerSet', async () => {
    const context = createTestContext();
    const inputs = {
      set: null
    };
    const params = {
      
    };

    const result = await SetPowerSetNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.powerSet).toBeDefined();
  });

  
});