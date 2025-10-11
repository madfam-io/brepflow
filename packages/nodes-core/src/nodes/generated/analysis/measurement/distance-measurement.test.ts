
import { describe, it, expect } from 'vitest';
import { DistanceMeasurementNode } from './distance-measurement.node';
import { createTestContext } from '../test-utils';

describe('DistanceMeasurementNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      point1: undefined,
      point2: undefined
    } as any;
    const params = {
      precision: 2,
      showDimension: true
    } as any;

    const result = await DistanceMeasurementNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
