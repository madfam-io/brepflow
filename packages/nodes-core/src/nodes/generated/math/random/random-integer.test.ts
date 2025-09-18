
import { describe, it, expect } from 'vitest';
import { RandomIntegerNode } from './randominteger-node';
import { createTestContext } from '../test-utils';

describe('RandomIntegerNode', () => {
  it('should create RandomInteger', async () => {
    const context = createTestContext();
    const inputs = {
      min: null,
      max: null
    };
    const params = {
      seed: -1
    };

    const result = await RandomIntegerNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.value).toBeDefined();
  });

  
});