
import { describe, it, expect } from 'vitest';
import { BallBearingNode } from './ballbearing.node';
import { createTestContext } from './../../test-utils';

describe('BallBearingNode', () => {
  it('should create BallBearing', async () => {
    const context = createTestContext();
    const inputs = {
      center: null
    };
    const params = {
      innerDiameter: 20,
      outerDiameter: 47,
      width: 14,
      ballCount: 8,
      showCage: true
    };

    const result = await BallBearingNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.bearing).toBeDefined();
    expect(result.innerRace).toBeDefined();
    expect(result.outerRace).toBeDefined();
  });

  
});