
import { describe, it, expect } from 'vitest';
import { DragonCurveNode } from './dragon-curve.node';
import { createTestContext } from '../test-utils';

describe('DragonCurveNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      startSegment: undefined
    } as any;
    const params = {
      iterations: 10,
      angle: 90
    } as any;

    const result = await DragonCurveNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
