
import { describe, it, expect } from 'vitest';
import { HelicalGearNode } from './helicalgear.node';
import { createTestContext } from './../../test-utils';

describe('HelicalGearNode', () => {
  it('should create HelicalGear', async () => {
    const context = createTestContext();
    const inputs = {
      
    };
    const params = {
      module: 2,
      teeth: 20,
      helixAngle: 15,
      width: 20,
      handedness: "right"
    };

    const result = await HelicalGearNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.gear).toBeDefined();
    expect(result.profile).toBeDefined();
  });

  
});