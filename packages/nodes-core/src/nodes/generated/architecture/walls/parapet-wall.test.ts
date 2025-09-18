
import { describe, it, expect } from 'vitest';
import { ParapetWallNode } from './parapetwall-node';
import { createTestContext } from '../test-utils';

describe('ParapetWallNode', () => {
  it('should create ParapetWall', async () => {
    const context = createTestContext();
    const inputs = {
      roofEdge: null
    };
    const params = {
      height: 1000,
      coping: true,
      copingOverhang: 50
    };

    const result = await ParapetWallNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.parapet).toBeDefined();
  });

  
});