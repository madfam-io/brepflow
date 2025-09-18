
import { describe, it, expect } from 'vitest';
import { ReactionDiffusionNode } from './reactiondiffusion-node';
import { createTestContext } from '../test-utils';

describe('ReactionDiffusionNode', () => {
  it('should create ReactionDiffusion', async () => {
    const context = createTestContext();
    const inputs = {
      surface: /* test value */
    };
    const params = {
      pattern: "spots",
      scale: 10,
      iterations: 100
    };

    const result = await ReactionDiffusionNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.pattern).toBeDefined();
  });

  
});