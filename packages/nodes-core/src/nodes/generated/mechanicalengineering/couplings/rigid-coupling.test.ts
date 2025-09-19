
import { describe, it, expect } from 'vitest';
import { RigidCouplingNode } from './rigidcoupling.node';
import { createTestContext } from './../../test-utils';

describe('RigidCouplingNode', () => {
  it('should create RigidCoupling', async () => {
    const context = createTestContext();
    const inputs = {
      center: null
    };
    const params = {
      shaft1Diameter: 20,
      shaft2Diameter: 20,
      couplingDiameter: 40,
      length: 50
    };

    const result = await RigidCouplingNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.coupling).toBeDefined();
    expect(result.bores).toBeDefined();
  });

  
});