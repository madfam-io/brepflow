
import { describe, it, expect } from 'vitest';
import { DragonCurveNode } from './dragoncurve.node';
import { createTestContext } from './../../test-utils';

describe('DragonCurveNode', () => {
  it('should create DragonCurve', async () => {
    const context = createTestContext();
    const inputs = {
      startSegment: null
    };
    const params = {
      iterations: 10,
      angle: 90
    };

    const result = await DragonCurveNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.curve).toBeDefined();
  });

  
});