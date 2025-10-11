
import { describe, it, expect } from 'vitest';
import { PointNode } from './point.node';
import { createTestContext } from '../test-utils';

describe('PointNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {

    } as any;
    const params = {
      x: 0,
      y: 0,
      z: 0
    } as any;

    const result = await PointNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
