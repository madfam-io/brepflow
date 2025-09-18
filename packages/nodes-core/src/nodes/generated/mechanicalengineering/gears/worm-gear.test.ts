
import { describe, it, expect } from 'vitest';
import { WormGearNode } from './wormgear-node';
import { createTestContext } from '../test-utils';

describe('WormGearNode', () => {
  it('should create WormGear', async () => {
    const context = createTestContext();
    const inputs = {
      center: null
    };
    const params = {
      module: 2,
      teeth: 30,
      diameter: 60,
      width: 20
    };

    const result = await WormGearNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.gear).toBeDefined();
    expect(result.throat).toBeDefined();
  });

  
});