
import { describe, it, expect } from 'vitest';
import { HyperbolicTilingNode } from './hyperbolic-tiling.node';
import { createTestContext } from '../test-utils';

describe('HyperbolicTilingNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      disk: undefined
    } as any;
    const params = {
      p: 7,
      q: 3,
      iterations: 3
    } as any;

    const result = await HyperbolicTilingNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
