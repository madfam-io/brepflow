
import { describe, it, expect } from 'vitest';
import { AirBearingNode } from './airbearing-node';
import { createTestContext } from '../test-utils';

describe('AirBearingNode', () => {
  it('should create AirBearing', async () => {
    const context = createTestContext();
    const inputs = {
      center: null
    };
    const params = {
      diameter: 50,
      thickness: 10,
      pocketCount: 6,
      restrictorType: "orifice"
    };

    const result = await AirBearingNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.bearing).toBeDefined();
    expect(result.pockets).toBeDefined();
    expect(result.restrictors).toBeDefined();
  });

  
});