
import { describe, it, expect } from 'vitest';
import { SplinedShaftNode } from './splinedshaft.node';
import { createTestContext } from './../../test-utils';

describe('SplinedShaftNode', () => {
  it('should create SplinedShaft', async () => {
    const context = createTestContext();
    const inputs = {
      center: null
    };
    const params = {
      majorDiameter: 25,
      minorDiameter: 22,
      splineCount: 6,
      length: 50
    };

    const result = await SplinedShaftNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.shaft).toBeDefined();
    expect(result.splines).toBeDefined();
  });

  
});