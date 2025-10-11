
import { describe, it, expect } from 'vitest';
import { InverseLerpNode } from './inverse-lerp.node';
import { createTestContext } from '../test-utils';

describe('InverseLerpNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      a: undefined,
      b: undefined,
      value: undefined
    } as any;
    const params = {

    } as any;

    const result = await InverseLerpNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
