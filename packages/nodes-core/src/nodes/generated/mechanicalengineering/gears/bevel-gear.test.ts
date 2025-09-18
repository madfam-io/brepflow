
import { describe, it, expect } from 'vitest';
import { BevelGearNode } from './bevelgear-node';
import { createTestContext } from '../test-utils';

describe('BevelGearNode', () => {
  it('should create BevelGear', async () => {
    const context = createTestContext();
    const inputs = {
      apex: /* test value */
    };
    const params = {
      module: 3,
      teeth: 25,
      coneAngle: 45,
      faceWidth: 15
    };

    const result = await BevelGearNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.gear).toBeDefined();
    expect(result.pitchCone).toBeDefined();
  });

  
});