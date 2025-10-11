
import { describe, it, expect } from 'vitest';
import { VehicleRampNode } from './vehicle-ramp.node';
import { createTestContext } from '../test-utils';

describe('VehicleRampNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      rampPath: undefined
    } as any;
    const params = {
      gradient: 0.15,
      width: 6000,
      transitionLength: 3000
    } as any;

    const result = await VehicleRampNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
