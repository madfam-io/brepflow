
import { describe, it, expect } from 'vitest';
import { HermiteInterpNode } from './hermite-interp.node';
import { createTestContext } from '../test-utils';

describe('HermiteInterpNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      p0: undefined,
      p1: undefined,
      m0: undefined,
      m1: undefined,
      t: undefined
    } as any;
    const params = {

    } as any;

    const result = await HermiteInterpNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
