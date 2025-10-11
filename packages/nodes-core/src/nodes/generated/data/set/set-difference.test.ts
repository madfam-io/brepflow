
import { describe, it, expect } from 'vitest';
import { SetDifferenceNode } from './set-difference.node';
import { createTestContext } from '../test-utils';

describe('SetDifferenceNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      setA: undefined,
      setB: undefined
    } as any;
    const params = {

    } as any;

    const result = await SetDifferenceNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
