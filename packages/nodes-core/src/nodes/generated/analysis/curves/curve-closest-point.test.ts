
import { describe, it, expect } from 'vitest';
import { CurveClosestPointNode } from './curve-closest-point.node';
import { createTestContext } from '../test-utils';

describe('CurveClosestPointNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      curve: undefined,
      point: undefined
    } as any;
    const params = {
      tolerance: 0.01,
      showConnection: true
    } as any;

    const result = await CurveClosestPointNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
