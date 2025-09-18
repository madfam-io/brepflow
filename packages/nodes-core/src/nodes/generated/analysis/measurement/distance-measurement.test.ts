
import { describe, it, expect } from 'vitest';
import { DistanceMeasurementNode } from './distancemeasurement-node';
import { createTestContext } from '../test-utils';

describe('DistanceMeasurementNode', () => {
  it('should create DistanceMeasurement', async () => {
    const context = createTestContext();
    const inputs = {
      point1: null,
      point2: null
    };
    const params = {
      precision: 2,
      showDimension: true
    };

    const result = await DistanceMeasurementNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.distance).toBeDefined();
    expect(result.dimensionLine).toBeDefined();
    expect(result.midpoint).toBeDefined();
  });

  
});