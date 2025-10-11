
import { describe, it, expect } from 'vitest';
import { MultiplyNode } from './multiply.node';
import { createTestContext } from '../test-utils';

describe('MultiplyNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      a: undefined,
      b: undefined
    } as any;
    const params = {

    } as any;

    const result = await MultiplyNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
