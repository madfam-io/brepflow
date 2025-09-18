
import { describe, it, expect } from 'vitest';
import { RandomExponentialNode } from './randomexponential-node';
import { createTestContext } from '../test-utils';

describe('RandomExponentialNode', () => {
  it('should create RandomExponential', async () => {
    const context = createTestContext();
    const inputs = {
      
    };
    const params = {
      lambda: 1,
      seed: -1
    };

    const result = await RandomExponentialNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.value).toBeDefined();
  });

  
});