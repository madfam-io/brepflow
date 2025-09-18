
import { describe, it, expect } from 'vitest';
import { InsulatedWallNode } from './insulatedwall-node';
import { createTestContext } from '../test-utils';

describe('InsulatedWallNode', () => {
  it('should create InsulatedWall', async () => {
    const context = createTestContext();
    const inputs = {
      wallCavity: null
    };
    const params = {
      insulationType: "batt",
      rValue: 19
    };

    const result = await InsulatedWallNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.insulatedWall).toBeDefined();
  });

  
});