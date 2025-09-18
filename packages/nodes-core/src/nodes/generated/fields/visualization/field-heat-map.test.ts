
import { describe, it, expect } from 'vitest';
import { FieldHeatMapNode } from './fieldheatmap-node';
import { createTestContext } from '../test-utils';

describe('FieldHeatMapNode', () => {
  it('should create FieldHeatMap', async () => {
    const context = createTestContext();
    const inputs = {
      plane: null
    };
    const params = {
      resolution: 50,
      interpolation: "\"bilinear\""
    };

    const result = await FieldHeatMapNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.heatMap).toBeDefined();
  });

  
});