
import { describe, it, expect } from 'vitest';
import { PolarArrayNode } from './polararray-node';
import { createTestContext } from '../test-utils';

describe('PolarArrayNode', () => {
  it('should create PolarArray', async () => {
    const context = createTestContext();
    const inputs = {
      shape: null
    };
    const params = {
      count: 8,
      totalAngle: 360,
      centerX: 0,
      centerY: 0,
      centerZ: 0,
      axisX: 0,
      axisY: 0,
      axisZ: 1,
      rotateItems: true,
      merge: false
    };

    const result = await PolarArrayNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.array).toBeDefined();
    expect(result.merged).toBeDefined();
  });

  
});