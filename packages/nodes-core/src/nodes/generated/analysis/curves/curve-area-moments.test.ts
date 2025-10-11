
import { describe, it, expect } from 'vitest';
import { CurveAreaMomentsNode } from './curve-area-moments.node';
import { createTestContext } from '../test-utils';

describe('CurveAreaMomentsNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      curve: undefined
    } as any;
    const params = {
      precision: 0.01,
      showCentroid: true
    } as any;

    const result = await CurveAreaMomentsNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
