
import { describe, it, expect } from 'vitest';
import { SetIntersectionNode } from './set-intersection.node';
import { createTestContext } from '../test-utils';

describe('SetIntersectionNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      setA: undefined,
      setB: undefined
    } as any;
    const params = {

    } as any;

    const result = await SetIntersectionNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
