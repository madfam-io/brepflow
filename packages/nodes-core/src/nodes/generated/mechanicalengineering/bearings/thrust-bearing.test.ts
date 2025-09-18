
import { describe, it, expect } from 'vitest';
import { ThrustBearingNode } from './thrustbearing-node';
import { createTestContext } from '../test-utils';

describe('ThrustBearingNode', () => {
  it('should create ThrustBearing', async () => {
    const context = createTestContext();
    const inputs = {
      center: null
    };
    const params = {
      innerDiameter: 20,
      outerDiameter: 40,
      height: 10,
      type: "ball"
    };

    const result = await ThrustBearingNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.bearing).toBeDefined();
    expect(result.raceways).toBeDefined();
  });

  
});