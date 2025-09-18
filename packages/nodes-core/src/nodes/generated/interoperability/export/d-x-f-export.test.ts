
import { describe, it, expect } from 'vitest';
import { DXFExportNode } from './dxfexport-node';
import { createTestContext } from '../test-utils';

describe('DXFExportNode', () => {
  it('should create DXFExport', async () => {
    const context = createTestContext();
    const inputs = {
      curves: /* test value */,
      filePath: /* test value */
    };
    const params = {
      version: "2000",
      units: "mm",
      layerName: "BrepFlow"
    };

    const result = await DXFExportNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.success).toBeDefined();
    expect(result.entityCount).toBeDefined();
  });

  
});