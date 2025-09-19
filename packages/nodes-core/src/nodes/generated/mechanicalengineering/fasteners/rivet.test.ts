
import { describe, it, expect } from 'vitest';
import { RivetNode } from './rivet.node';
import { createTestContext } from './../../test-utils';

describe('RivetNode', () => {
  it('should create Rivet', async () => {
    const context = createTestContext();
    const inputs = {
      position: null
    };
    const params = {
      diameter: 4,
      length: 10,
      headType: "round",
      material: "aluminum"
    };

    const result = await RivetNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.rivet).toBeDefined();
  });

  
});