
import { describe, it, expect } from 'vitest';
import { TorusNode } from './torus-node';
import { createTestContext } from '../test-utils';

describe('TorusNode', () => {
  it('should create Torus', async () => {
    const context = createTestContext();
    const inputs = {
      
    };
    const params = {
      majorRadius: 50,
      minorRadius: 10,
      centerX: 0,
      centerY: 0,
      centerZ: 0,
      angle1: 0,
      angle2: 360,
      angle: 360
    };

    const result = await TorusNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.solid).toBeDefined();
  });

  
});