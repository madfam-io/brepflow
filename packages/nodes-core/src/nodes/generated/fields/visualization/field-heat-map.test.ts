
import { describe, it, expect } from 'vitest';
import { FieldHeatMapNode } from './field-heat-map.node';
import { createTestContext } from '../test-utils';

describe('FieldHeatMapNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      plane: undefined
    } as any;
    const params = {
      resolution: 50,
      interpolation: "\"bilinear\""
    } as any;

    const result = await FieldHeatMapNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
