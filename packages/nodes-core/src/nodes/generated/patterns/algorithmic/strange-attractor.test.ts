
import { describe, it, expect } from 'vitest';
import { StrangeAttractorNode } from './strangeattractor.node';
import { createTestContext } from './../../test-utils';

describe('StrangeAttractorNode', () => {
  it('should create StrangeAttractor', async () => {
    const context = createTestContext();
    const inputs = {
      initial: null
    };
    const params = {
      type: "lorenz",
      iterations: 10000,
      dt: 0.01
    };

    const result = await StrangeAttractorNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.attractor).toBeDefined();
    expect(result.trajectory).toBeDefined();
  });

  
});