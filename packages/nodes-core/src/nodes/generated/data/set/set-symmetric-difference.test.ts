
import { describe, it, expect } from 'vitest';
import { SetSymmetricDifferenceNode } from './set-symmetric-difference.node';
import { createTestContext } from '../test-utils';

describe('SetSymmetricDifferenceNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      setA: undefined,
      setB: undefined
    } as any;
    const params = {

    } as any;

    const result = await SetSymmetricDifferenceNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
