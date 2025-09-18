
import { describe, it, expect } from 'vitest';
import { RoundToDecimalNode } from './roundtodecimal-node';
import { createTestContext } from '../test-utils';

describe('RoundToDecimalNode', () => {
  it('should create RoundToDecimal', async () => {
    const context = createTestContext();
    const inputs = {
      value: null
    };
    const params = {
      decimals: 2
    };

    const result = await RoundToDecimalNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.result).toBeDefined();
  });

  
});