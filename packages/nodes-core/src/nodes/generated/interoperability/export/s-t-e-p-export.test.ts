
import { describe, it, expect } from 'vitest';
import { STEPExportNode } from './stepexport-node';
import { createTestContext } from '../test-utils';

describe('STEPExportNode', () => {
  it('should create STEPExport', async () => {
    const context = createTestContext();
    const inputs = {
      shapes: /* test value */,
      filePath: /* test value */
    };
    const params = {
      version: "AP214",
      units: "mm",
      precision: 0.01,
      writeMode: "manifold"
    };

    const result = await STEPExportNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.success).toBeDefined();
    expect(result.fileSize).toBeDefined();
    expect(result.exportLog).toBeDefined();
  });

  
});