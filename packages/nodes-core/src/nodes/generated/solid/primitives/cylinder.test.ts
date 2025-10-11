
import { describe, it, expect } from 'vitest';
import { CylinderNode } from './cylinder.node';
import { createTestContext } from '../test-utils';

describe('CylinderNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {

    } as any;
    const params = {
      radius: 50,
      height: 100,
      centerX: 0,
      centerY: 0,
      centerZ: 0,
      axisX: 0,
      axisY: 0,
      axisZ: 1,
      angle: 360
    } as any;

    const result = await CylinderNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
