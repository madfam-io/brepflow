
import { describe, it, expect } from 'vitest';
import { GearNode } from './gear-node';
import { createTestContext } from '../test-utils';

describe('GearNode', () => {
  it('should create Gear', async () => {
    const context = createTestContext();
    const inputs = {
      
    };
    const params = {
      teeth: 20,
      module: 2,
      pressureAngle: 20,
      addendum: 1,
      dedendum: 1.25
    };

    const result = await GearNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.gear).toBeDefined();
  });

  
});