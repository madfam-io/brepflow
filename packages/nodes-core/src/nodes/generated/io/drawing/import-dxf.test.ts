
import { describe, it, expect } from 'vitest';
import { ImportDXFNode } from './import-dxf.node';
import { createTestContext } from '../test-utils';

describe('ImportDXFNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      fileData: undefined
    } as any;
    const params = {
      importAs: "2d",
      layerFilter: "*",
      units: "mm"
    } as any;

    const result = await ImportDXFNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
