
import { describe, it, expect } from 'vitest';
import { STLExportNode } from './stlexport-node';
import { createTestContext } from '../test-utils';

describe('STLExportNode', () => {
  it('should create STLExport', async () => {
    const context = createTestContext();
    const inputs = {
      shapes: null,
      filePath: null
    };
    const params = {
      format: "binary",
      deflection: 0.1,
      angularDeflection: 0.1
    };

    const result = await STLExportNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.success).toBeDefined();
    expect(result.triangleCount).toBeDefined();
  });

  
});