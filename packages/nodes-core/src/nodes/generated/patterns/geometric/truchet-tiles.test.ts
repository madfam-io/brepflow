
import { describe, it, expect } from 'vitest';
import { TruchetTilesNode } from './truchettiles-node';
import { createTestContext } from '../test-utils';

describe('TruchetTilesNode', () => {
  it('should create TruchetTiles', async () => {
    const context = createTestContext();
    const inputs = {
      grid: null
    };
    const params = {
      tileType: "arc",
      randomSeed: 0
    };

    const result = await TruchetTilesNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.pattern).toBeDefined();
  });

  
});