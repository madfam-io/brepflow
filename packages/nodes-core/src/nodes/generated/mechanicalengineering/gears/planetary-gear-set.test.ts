
import { describe, it, expect } from 'vitest';
import { PlanetaryGearSetNode } from './planetary-gear-set.node';
import { createTestContext } from '../test-utils';

describe('PlanetaryGearSetNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      center: undefined
    } as any;
    const params = {
      sunTeeth: 20,
      planetTeeth: 16,
      planetCount: 3,
      module: 2
    } as any;

    const result = await PlanetaryGearSetNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
