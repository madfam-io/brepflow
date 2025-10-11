
import { describe, it, expect } from 'vitest';
import { CubicInterpNode } from './cubic-interp.node';
import { createTestContext } from '../test-utils';

describe('CubicInterpNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      v0: undefined,
      v1: undefined,
      v2: undefined,
      v3: undefined,
      t: undefined
    } as any;
    const params = {

    } as any;

    const result = await CubicInterpNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
