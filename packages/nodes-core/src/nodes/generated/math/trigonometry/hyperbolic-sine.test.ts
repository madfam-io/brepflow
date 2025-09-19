
import { describe, it, expect } from 'vitest';
import { HyperbolicSineNode } from './hyperbolicsine.node';
import { createTestContext } from './../../test-utils';

describe('HyperbolicSineNode', () => {
  it('should create HyperbolicSine', async () => {
    const context = createTestContext();
    const inputs = {
      value: null
    };
    const params = {
      
    };

    const result = await HyperbolicSineNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.result).toBeDefined();
  });

  
});