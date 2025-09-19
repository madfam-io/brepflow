
import { describe, it, expect } from 'vitest';
import { WrapNode } from './wrap.node';
import { createTestContext } from './../../test-utils';

describe('WrapNode', () => {
  it('should create Wrap', async () => {
    const context = createTestContext();
    const inputs = {
      targetSurface: null,
      sketch: null
    };
    const params = {
      wrapType: "emboss",
      depth: 1
    };

    const result = await WrapNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.wrappedShape).toBeDefined();
  });

  
});