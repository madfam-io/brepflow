
import { describe, it, expect } from 'vitest';
import { PolygonalTessellationNode } from './polygonaltessellation.node';
import { createTestContext } from './../../test-utils';

describe('PolygonalTessellationNode', () => {
  it('should create PolygonalTessellation', async () => {
    const context = createTestContext();
    const inputs = {
      boundary: null
    };
    const params = {
      polygonType: "hexagonal",
      size: 10
    };

    const result = await PolygonalTessellationNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.tiles).toBeDefined();
  });

  
});