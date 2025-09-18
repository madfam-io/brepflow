
import { describe, it, expect } from 'vitest';
import { GrasshopperExportNode } from './grasshopperexport-node';
import { createTestContext } from '../test-utils';

describe('GrasshopperExportNode', () => {
  it('should create GrasshopperExport', async () => {
    const context = createTestContext();
    const inputs = {
      definition: /* test value */,
      filePath: /* test value */
    };
    const params = {
      version: "GH1",
      embedGeometry: true
    };

    const result = await GrasshopperExportNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.success).toBeDefined();
    expect(result.componentCount).toBeDefined();
  });

  
});