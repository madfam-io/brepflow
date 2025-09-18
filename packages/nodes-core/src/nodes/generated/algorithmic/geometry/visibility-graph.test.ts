
import { describe, it, expect } from 'vitest';
import { VisibilityGraphNode } from './visibilitygraph-node';
import { createTestContext } from '../test-utils';

describe('VisibilityGraphNode', () => {
  it('should create VisibilityGraph', async () => {
    const context = createTestContext();
    const inputs = {
      obstacles: null,
      start: null,
      goal: null
    };
    const params = {
      epsilon: 0.01,
      includeInterior: false
    };

    const result = await VisibilityGraphNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.graph).toBeDefined();
    expect(result.vertices).toBeDefined();
    expect(result.edges).toBeDefined();
  });

  
});