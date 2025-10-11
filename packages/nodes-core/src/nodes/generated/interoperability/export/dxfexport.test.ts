
import { describe, it, expect } from 'vitest';
import { DXFExportNode } from './dxfexport.node';
import { createTestContext } from '../test-utils';

describe('DXFExportNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      curves: undefined,
      filePath: undefined
    } as any;
    const params = {
      version: "2000",
      units: "mm",
      layerName: "BrepFlow"
    } as any;

    const result = await DXFExportNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
