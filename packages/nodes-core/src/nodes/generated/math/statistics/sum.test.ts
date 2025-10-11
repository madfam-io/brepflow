
import { describe, it, expect } from 'vitest';
import { SumNode } from './sum.node';
import { createTestContext } from '../test-utils';

describe('SumNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      values: undefined
    } as any;
    const params = {

    } as any;

    const result = await SumNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
