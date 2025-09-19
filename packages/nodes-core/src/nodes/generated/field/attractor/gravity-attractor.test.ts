
import { describe, it, expect } from 'vitest';
import { GravityAttractorNode } from './gravityattractor.node';
import { createTestContext } from './../../test-utils';

describe('GravityAttractorNode', () => {
  it('should create GravityAttractor', async () => {
    const context = createTestContext();
    const inputs = {
      bodies: null
    };
    const params = {
      mass: 100,
      G: 1
    };

    const result = await GravityAttractorNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.field).toBeDefined();
  });

  
});