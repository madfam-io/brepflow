
import { describe, it, expect } from 'vitest';
import { IGESImportNode } from './igesimport-node';
import { createTestContext } from '../test-utils';

describe('IGESImportNode', () => {
  it('should create IGESImport', async () => {
    const context = createTestContext();
    const inputs = {
      filePath: /* test value */
    };
    const params = {
      units: "auto",
      readFailed: false,
      oneObject: false
    };

    const result = await IGESImportNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.shapes).toBeDefined();
    expect(result.curves).toBeDefined();
    expect(result.surfaces).toBeDefined();
    expect(result.metadata).toBeDefined();
  });

  
});