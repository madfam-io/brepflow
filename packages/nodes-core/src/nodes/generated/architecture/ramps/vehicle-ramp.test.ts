
import { describe, it, expect } from 'vitest';
import { VehicleRampNode } from './vehicleramp-node';
import { createTestContext } from '../test-utils';

describe('VehicleRampNode', () => {
  it('should create VehicleRamp', async () => {
    const context = createTestContext();
    const inputs = {
      rampPath: null
    };
    const params = {
      gradient: 0.15,
      width: 6000,
      transitionLength: 3000
    };

    const result = await VehicleRampNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.vehicleRamp).toBeDefined();
  });

  
});