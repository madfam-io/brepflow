
import { describe, it, expect } from 'vitest';
import { RadialFieldNode } from './radialfield.node';
import { createTestContext } from './../../test-utils';

describe('RadialFieldNode', () => {
  it('should create RadialField', async () => {
    const context = createTestContext();
    const inputs = {
      center: null
    };
    const params = {
      falloff: "linear",
      radius: 100,
      strength: 1
    };

    const result = await RadialFieldNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.field).toBeDefined();
  });

  
});