
import { describe, it, expect } from 'vitest';
import { RollerBearingNode } from './rollerbearing-node';
import { createTestContext } from '../test-utils';

describe('RollerBearingNode', () => {
  it('should create RollerBearing', async () => {
    const context = createTestContext();
    const inputs = {
      center: null
    };
    const params = {
      innerDiameter: 25,
      outerDiameter: 52,
      width: 15,
      rollerType: "cylindrical"
    };

    const result = await RollerBearingNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.bearing).toBeDefined();
    expect(result.rollers).toBeDefined();
  });

  
});