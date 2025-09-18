
import { describe, it, expect } from 'vitest';
import { PlanetaryGearSetNode } from './planetarygearset-node';
import { createTestContext } from '../test-utils';

describe('PlanetaryGearSetNode', () => {
  it('should create PlanetaryGearSet', async () => {
    const context = createTestContext();
    const inputs = {
      center: /* test value */
    };
    const params = {
      sunTeeth: 20,
      planetTeeth: 16,
      planetCount: 3,
      module: 2
    };

    const result = await PlanetaryGearSetNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.assembly).toBeDefined();
    expect(result.sunGear).toBeDefined();
    expect(result.planetGears).toBeDefined();
    expect(result.ringGear).toBeDefined();
  });

  
});