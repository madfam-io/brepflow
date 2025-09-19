
import { describe, it, expect } from 'vitest';
import { GreenWallNode } from './greenwall.node';
import { createTestContext } from './../../test-utils';

describe('GreenWallNode', () => {
  it('should create GreenWall', async () => {
    const context = createTestContext();
    const inputs = {
      wallSurface: null
    };
    const params = {
      moduleSize: 600,
      irrigationType: "drip"
    };

    const result = await GreenWallNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.greenWall).toBeDefined();
    expect(result.modules).toBeDefined();
  });

  
});