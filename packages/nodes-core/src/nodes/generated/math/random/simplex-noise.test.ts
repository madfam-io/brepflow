
import { describe, it, expect } from 'vitest';
import { SimplexNoiseNode } from './simplex-noise.node';
import { createTestContext } from '../test-utils';

describe('SimplexNoiseNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      x: undefined
    } as any;
    const params = {
      scale: 1,
      seed: -1
    } as any;

    const result = await SimplexNoiseNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
