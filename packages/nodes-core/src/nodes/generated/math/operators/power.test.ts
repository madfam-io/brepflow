
import { describe, it, expect } from 'vitest';
import { PowerNode } from './power-node';
import { createTestContext } from '../test-utils';

describe('PowerNode', () => {
  it('should create Power', async () => {
    const context = createTestContext();
    const inputs = {
      base: null,
      exponent: null
    };
    const params = {
      
    };

    const result = await PowerNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.result).toBeDefined();
  });

  
});