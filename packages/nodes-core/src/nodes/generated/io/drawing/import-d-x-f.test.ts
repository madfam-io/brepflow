
import { describe, it, expect } from 'vitest';
import { ImportDXFNode } from './importdxf-node';
import { createTestContext } from '../test-utils';

describe('ImportDXFNode', () => {
  it('should create ImportDXF', async () => {
    const context = createTestContext();
    const inputs = {
      fileData: null
    };
    const params = {
      importAs: "2d",
      layerFilter: "*",
      units: "mm"
    };

    const result = await ImportDXFNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.wires).toBeDefined();
    expect(result.layers).toBeDefined();
  });

  
});