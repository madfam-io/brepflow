
import { describe, it, expect } from 'vitest';
import { RoundToDecimalNode } from './round-to-decimal.node';
import { createTestContext } from '../test-utils';

describe('RoundToDecimalNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      value: undefined
    } as any;
    const params = {
      decimals: 2
    } as any;

    const result = await RoundToDecimalNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
