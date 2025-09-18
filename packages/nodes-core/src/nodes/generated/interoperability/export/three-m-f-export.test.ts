
import { describe, it, expect } from 'vitest';
import { ThreeMFExportNode } from './threemfexport-node';
import { createTestContext } from '../test-utils';

describe('ThreeMFExportNode', () => {
  it('should create ThreeMFExport', async () => {
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

    const result = await ThreeMFExportNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.success).toBeDefined();
    expect(result.modelCount).toBeDefined();
  });

  
});