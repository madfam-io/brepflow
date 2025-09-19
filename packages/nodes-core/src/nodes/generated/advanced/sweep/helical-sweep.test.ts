
import { describe, it, expect } from 'vitest';
import { HelicalSweepNode } from './helicalsweep.node';
import { createTestContext } from './../../test-utils';

describe('HelicalSweepNode', () => {
  it('should create HelicalSweep', async () => {
    const context = createTestContext();
    const inputs = {
      profile: null
    };
    const params = {
      pitch: 10,
      height: 100,
      turns: 5,
      radius: 20,
      leftHanded: false,
      taper: 0
    };

    const result = await HelicalSweepNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.shape).toBeDefined();
  });

  
});