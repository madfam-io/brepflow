
import { describe, it, expect } from 'vitest';
import { GraphLayoutNode } from './graphlayout-node';
import { createTestContext } from '../test-utils';

describe('GraphLayoutNode', () => {
  it('should create GraphLayout', async () => {
    const context = createTestContext();
    const inputs = {
      nodes: null,
      edges: null
    };
    const params = {
      algorithm: "force-directed",
      iterations: 100
    };

    const result = await GraphLayoutNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.layout).toBeDefined();
    expect(result.graph).toBeDefined();
  });

  
});