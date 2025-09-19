
import { describe, it, expect } from 'vitest';
import { StraightWallNode } from './straightwall.node';
import { createTestContext } from './../../test-utils';

describe('StraightWallNode', () => {
  it('should create StraightWall', async () => {
    const context = createTestContext();
    const inputs = {
      centerline: null
    };
    const params = {
      height: 3000,
      thickness: 200,
      justification: "center"
    };

    const result = await StraightWallNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.wall).toBeDefined();
    expect(result.centerline).toBeDefined();
  });

  
});