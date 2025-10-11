
import { describe, it, expect } from 'vitest';
import { SetSubsetNode } from './set-subset.node';
import { createTestContext } from '../test-utils';

describe('SetSubsetNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      setA: undefined,
      setB: undefined
    } as any;
    const params = {

    } as any;

    const result = await SetSubsetNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
