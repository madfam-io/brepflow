
import { describe, it, expect } from 'vitest';
import { RigidCouplingNode } from './rigid-coupling.node';
import { createTestContext } from '../test-utils';

describe('RigidCouplingNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      center: undefined
    } as any;
    const params = {
      shaft1Diameter: 20,
      shaft2Diameter: 20,
      couplingDiameter: 40,
      length: 50
    } as any;

    const result = await RigidCouplingNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
