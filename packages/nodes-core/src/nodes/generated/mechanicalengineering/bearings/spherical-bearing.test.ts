
import { describe, it, expect } from 'vitest';
import { SphericalBearingNode } from './sphericalbearing.node';
import { createTestContext } from './../../test-utils';

describe('SphericalBearingNode', () => {
  it('should create SphericalBearing', async () => {
    const context = createTestContext();
    const inputs = {
      center: null
    };
    const params = {
      ballDiameter: 20,
      boreDiameter: 8,
      housingDiameter: 30,
      misalignmentAngle: 15
    };

    const result = await SphericalBearingNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.bearing).toBeDefined();
    expect(result.ball).toBeDefined();
    expect(result.housing).toBeDefined();
  });

  
});