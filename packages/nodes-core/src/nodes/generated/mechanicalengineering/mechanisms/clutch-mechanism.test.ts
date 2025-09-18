
import { describe, it, expect } from 'vitest';
import { ClutchMechanismNode } from './clutchmechanism-node';
import { createTestContext } from '../test-utils';

describe('ClutchMechanismNode', () => {
  it('should create ClutchMechanism', async () => {
    const context = createTestContext();
    const inputs = {
      center: null
    };
    const params = {
      type: "friction",
      outerDiameter: 100,
      innerDiameter: 50,
      plateCount: 3
    };

    const result = await ClutchMechanismNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.clutch).toBeDefined();
    expect(result.plates).toBeDefined();
  });

  
});