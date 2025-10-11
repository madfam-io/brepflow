
import { describe, it, expect } from 'vitest';
import { FluidCouplingNode } from './fluid-coupling.node';
import { createTestContext } from '../test-utils';

describe('FluidCouplingNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      center: undefined
    } as any;
    const params = {
      impellerDiameter: 150,
      housingDiameter: 180,
      vaneCount: 32,
      fluidCapacity: 2
    } as any;

    const result = await FluidCouplingNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
