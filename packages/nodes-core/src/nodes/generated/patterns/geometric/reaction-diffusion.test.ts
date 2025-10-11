
import { describe, it, expect } from 'vitest';
import { ReactionDiffusionNode } from './reaction-diffusion.node';
import { createTestContext } from '../test-utils';

describe('ReactionDiffusionNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      surface: undefined
    } as any;
    const params = {
      pattern: "spots",
      scale: 10,
      iterations: 100
    } as any;

    const result = await ReactionDiffusionNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
