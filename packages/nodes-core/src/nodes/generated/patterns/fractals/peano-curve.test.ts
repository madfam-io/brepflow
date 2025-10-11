
import { describe, it, expect } from 'vitest';
import { PeanoCurveNode } from './peano-curve.node';
import { createTestContext } from '../test-utils';

describe('PeanoCurveNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      bounds: undefined
    } as any;
    const params = {
      order: 3
    } as any;

    const result = await PeanoCurveNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
