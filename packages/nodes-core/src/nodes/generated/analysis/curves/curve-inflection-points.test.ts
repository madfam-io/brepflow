
import { describe, it, expect } from 'vitest';
import { CurveInflectionPointsNode } from './curve-inflection-points.node';
import { createTestContext } from '../test-utils';

describe('CurveInflectionPointsNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      curve: undefined
    } as any;
    const params = {
      tolerance: 0.01,
      markPoints: true
    } as any;

    const result = await CurveInflectionPointsNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
