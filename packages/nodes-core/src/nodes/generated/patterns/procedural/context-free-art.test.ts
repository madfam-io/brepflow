
import { describe, it, expect } from 'vitest';
import { ContextFreeArtNode } from './contextfreeart-node';
import { createTestContext } from '../test-utils';

describe('ContextFreeArtNode', () => {
  it('should create ContextFreeArt', async () => {
    const context = createTestContext();
    const inputs = {
      canvas: /* test value */
    };
    const params = {
      rules: "CIRCLE{},SQUARE{r 45}",
      depth: 10
    };

    const result = await ContextFreeArtNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.art).toBeDefined();
  });

  
});