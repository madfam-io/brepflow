
import { describe, it, expect } from 'vitest';
import { XORNode } from './xor-node';
import { createTestContext } from '../test-utils';

describe('XORNode', () => {
  it('should create XOR', async () => {
    const context = createTestContext();
    const inputs = {
      shapes: null
    };
    const params = {
      keepOriginals: false,
      fuzzyValue: 1e-7
    };

    const result = await XORNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.result).toBeDefined();
  });

  
});