
import { describe, it, expect } from 'vitest';
import { PolygonPackingNode } from './polygonpacking-node';
import { createTestContext } from '../test-utils';

describe('PolygonPackingNode', () => {
  it('should create PolygonPacking', async () => {
    const context = createTestContext();
    const inputs = {
      container: null,
      polygons: null
    };
    const params = {
      rotations: true,
      angleStep: 90
    };

    const result = await PolygonPackingNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.packed).toBeDefined();
    expect(result.utilization).toBeDefined();
  });

  
});