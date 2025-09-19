
import { describe, it, expect } from 'vitest';
import { 3MFExportNode } from './3mfexport-node';
import { createTestContext } from './../../test-utils';

describe('3MFExportNode', () => {
  it('should create 3MFExport', async () => {
    const context = createTestContext();
    const inputs = {
      models: null,
      filePath: null
    };
    const params = {
      units: "mm",
      includeColors: true,
      compression: true
    };

    const result = await 3MFExportNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.success).toBeDefined();
    expect(result.modelCount).toBeDefined();
  });

  
});