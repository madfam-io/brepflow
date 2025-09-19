
import { describe, it, expect } from 'vitest';
import { RackGearNode } from './rackgear.node';
import { createTestContext } from './../../test-utils';

describe('RackGearNode', () => {
  it('should create RackGear', async () => {
    const context = createTestContext();
    const inputs = {
      path: null
    };
    const params = {
      module: 2,
      length: 100,
      width: 20,
      height: 15
    };

    const result = await RackGearNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.rack).toBeDefined();
    expect(result.pitchLine).toBeDefined();
  });

  
});