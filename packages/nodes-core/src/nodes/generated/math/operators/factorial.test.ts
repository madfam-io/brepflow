
import { describe, it, expect } from 'vitest';
import { FactorialNode } from './factorial.node';
import { createTestContext } from '../test-utils';

describe('FactorialNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      n: undefined
    } as any;
    const params = {

    } as any;

    const result = await FactorialNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
