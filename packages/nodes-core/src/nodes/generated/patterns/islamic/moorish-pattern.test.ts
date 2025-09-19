
import { describe, it, expect } from 'vitest';
import { MoorishPatternNode } from './moorishpattern.node';
import { createTestContext } from './../../test-utils';

describe('MoorishPatternNode', () => {
  it('should create MoorishPattern', async () => {
    const context = createTestContext();
    const inputs = {
      region: null
    };
    const params = {
      style: "alhambra",
      scale: 10
    };

    const result = await MoorishPatternNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.pattern).toBeDefined();
  });

  
});