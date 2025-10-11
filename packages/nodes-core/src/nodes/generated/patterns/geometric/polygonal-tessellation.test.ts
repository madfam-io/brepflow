
import { describe, it, expect } from 'vitest';
import { PolygonalTessellationNode } from './polygonal-tessellation.node';
import { createTestContext } from '../test-utils';

describe('PolygonalTessellationNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      boundary: undefined
    } as any;
    const params = {
      polygonType: "hexagonal",
      size: 10
    } as any;

    const result = await PolygonalTessellationNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
