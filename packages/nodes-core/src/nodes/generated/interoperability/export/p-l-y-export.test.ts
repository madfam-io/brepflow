
import { describe, it, expect } from 'vitest';
import { PLYExportNode } from './plyexport.node';
import { createTestContext } from './../../test-utils';

describe('PLYExportNode', () => {
  it('should create PLYExport', async () => {
    const context = createTestContext();
    const inputs = {
      points: null,
      filePath: null
    };
    const params = {
      format: "binary",
      includeColors: false,
      includeNormals: false
    };

    const result = await PLYExportNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.success).toBeDefined();
    expect(result.pointCount).toBeDefined();
  });

  
});