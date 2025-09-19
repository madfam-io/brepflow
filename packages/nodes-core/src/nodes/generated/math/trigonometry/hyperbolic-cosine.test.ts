
import { describe, it, expect } from 'vitest';
import { HyperbolicCosineNode } from './hyperboliccosine.node';
import { createTestContext } from './../../test-utils';

describe('HyperbolicCosineNode', () => {
  it('should create HyperbolicCosine', async () => {
    const context = createTestContext();
    const inputs = {
      value: null
    };
    const params = {
      
    };

    const result = await HyperbolicCosineNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.result).toBeDefined();
  });

  
});