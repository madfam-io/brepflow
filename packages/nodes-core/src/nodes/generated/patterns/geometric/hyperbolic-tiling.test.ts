
import { describe, it, expect } from 'vitest';
import { HyperbolicTilingNode } from './hyperbolictiling-node';
import { createTestContext } from '../test-utils';

describe('HyperbolicTilingNode', () => {
  it('should create HyperbolicTiling', async () => {
    const context = createTestContext();
    const inputs = {
      disk: null
    };
    const params = {
      p: 7,
      q: 3,
      iterations: 3
    };

    const result = await HyperbolicTilingNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.tiling).toBeDefined();
  });

  
});