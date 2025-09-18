
import { describe, it, expect } from 'vitest';
import { SpurGearNode } from './spurgear-node';
import { createTestContext } from '../test-utils';

describe('SpurGearNode', () => {
  it('should create SpurGear', async () => {
    const context = createTestContext();
    const inputs = {
      
    };
    const params = {
      module: 2,
      teeth: 20,
      pressureAngle: 20,
      width: 20,
      hubDiameter: 20
    };

    const result = await SpurGearNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.gear).toBeDefined();
    expect(result.pitchCircle).toBeDefined();
    expect(result.properties).toBeDefined();
  });

  
});