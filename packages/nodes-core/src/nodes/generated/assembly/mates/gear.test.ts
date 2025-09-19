
import { describe, it, expect } from 'vitest';
import { GearNode } from './gear.node';
import { createTestContext } from './../../test-utils';

describe('GearNode', () => {
  it('should create Gear', async () => {
    const context = createTestContext();
    const inputs = {
      gear1: null,
      gear2: null
    };
    const params = {
      ratio: 1,
      reverse: false
    };

    const result = await GearNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.geared).toBeDefined();
    expect(result.mate).toBeDefined();
  });

  
});