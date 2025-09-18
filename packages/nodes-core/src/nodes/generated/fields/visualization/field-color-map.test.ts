
import { describe, it, expect } from 'vitest';
import { FieldColorMapNode } from './fieldcolormap-node';
import { createTestContext } from '../test-utils';

describe('FieldColorMapNode', () => {
  it('should create FieldColorMap', async () => {
    const context = createTestContext();
    const inputs = {
      mesh: null
    };
    const params = {
      colorScheme: "\"viridis\"",
      minValue: 0,
      maxValue: 1
    };

    const result = await FieldColorMapNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.coloredMesh).toBeDefined();
  });

  
});