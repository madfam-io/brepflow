
import { describe, it, expect } from 'vitest';
import { RotateNode } from './rotate.node';
import { createTestContext } from './../test-utils';

describe('RotateNode', () => {
  it('should create Rotate', async () => {
    const context = createTestContext();
    const inputs = {
      shape: null
    };
    const params = {
      angle: 45,
      axisX: 0,
      axisY: 0,
      axisZ: 1,
      centerX: 0,
      centerY: 0,
      centerZ: 0,
      copy: true
    };

    const result = await RotateNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.rotated).toBeDefined();
  });

  
});