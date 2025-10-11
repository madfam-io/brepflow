
import { describe, it, expect } from 'vitest';
import { PointToPointNode } from './point-to-point.node';
import { createTestContext } from '../test-utils';

describe('PointToPointNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      point1: undefined,
      point2: undefined
    } as any;
    const params = {

    } as any;

    const result = await PointToPointNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
