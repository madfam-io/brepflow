
import { describe, it, expect } from 'vitest';
import { PrintTimeEstimateNode } from './printtimeestimate-node';
import { createTestContext } from '../test-utils';

describe('PrintTimeEstimateNode', () => {
  it('should create PrintTimeEstimate', async () => {
    const context = createTestContext();
    const inputs = {
      model: null
    };
    const params = {
      printSpeed: 60,
      travelSpeed: 120,
      layerHeight: 0.2
    };

    const result = await PrintTimeEstimateNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.timeHours).toBeDefined();
    expect(result.filamentMeters).toBeDefined();
  });

  
});