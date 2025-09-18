
import { describe, it, expect } from 'vitest';
import { RandomPoissonNode } from './randompoisson-node';
import { createTestContext } from '../test-utils';

describe('RandomPoissonNode', () => {
  it('should create RandomPoisson', async () => {
    const context = createTestContext();
    const inputs = {
      
    };
    const params = {
      lambda: 1,
      seed: -1
    };

    const result = await RandomPoissonNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.value).toBeDefined();
  });

  
});