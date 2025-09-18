
import { describe, it, expect } from 'vitest';
import { SphereNode } from './sphere-node';
import { createTestContext } from '../test-utils';

describe('SphereNode', () => {
  it('should create Sphere', async () => {
    const context = createTestContext();
    const inputs = {
      
    };
    const params = {
      radius: 50,
      centerX: 0,
      centerY: 0,
      centerZ: 0,
      angle1: 0,
      angle2: 360,
      angle3: 180
    };

    const result = await SphereNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.solid).toBeDefined();
  });

  
});