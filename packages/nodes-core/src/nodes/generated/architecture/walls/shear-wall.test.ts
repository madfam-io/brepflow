
import { describe, it, expect } from 'vitest';
import { ShearWallNode } from './shearwall-node';
import { createTestContext } from '../test-utils';

describe('ShearWallNode', () => {
  it('should create ShearWall', async () => {
    const context = createTestContext();
    const inputs = {
      wallOutline: null
    };
    const params = {
      thickness: 300,
      reinforcementRatio: 0.025
    };

    const result = await ShearWallNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.shearWall).toBeDefined();
    expect(result.reinforcement).toBeDefined();
  });

  
});