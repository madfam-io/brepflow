
import { describe, it, expect } from 'vitest';
import { SetUnionNode } from './set-union.node';
import { createTestContext } from '../test-utils';

describe('SetUnionNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      setA: undefined,
      setB: undefined
    } as any;
    const params = {

    } as any;

    const result = await SetUnionNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
