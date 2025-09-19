
import { describe, it, expect } from 'vitest';
import { EmbossNode } from './emboss.node';
import { createTestContext } from './../../test-utils';

describe('EmbossNode', () => {
  it('should create Emboss', async () => {
    const context = createTestContext();
    const inputs = {
      targetFace: null,
      pattern: null
    };
    const params = {
      height: 1,
      angle: 45,
      roundEdges: true
    };

    const result = await EmbossNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.embossed).toBeDefined();
  });

  
});