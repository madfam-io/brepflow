
import { describe, it, expect } from 'vitest';
import { BezierInterpNode } from './bezier-interp.node';
import { createTestContext } from '../test-utils';

describe('BezierInterpNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      points: undefined,
      t: undefined
    } as any;
    const params = {

    } as any;

    const result = await BezierInterpNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
