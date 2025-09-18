
import { describe, it, expect } from 'vitest';
import { RetainingWallNode } from './retainingwall-node';
import { createTestContext } from '../test-utils';

describe('RetainingWallNode', () => {
  it('should create RetainingWall', async () => {
    const context = createTestContext();
    const inputs = {
      path: null
    };
    const params = {
      height: 2000,
      baseThickness: 400,
      batter: 10
    };

    const result = await RetainingWallNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.retainingWall).toBeDefined();
  });

  
});