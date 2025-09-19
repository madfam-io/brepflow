
import { describe, it, expect } from 'vitest';
import { 3MFImportNode } from './3mfimport-node';
import { createTestContext } from './../../test-utils';

describe('3MFImportNode', () => {
  it('should create 3MFImport', async () => {
    const context = createTestContext();
    const inputs = {
      filePath: null
    };
    const params = {
      loadTextures: true,
      loadMaterials: true,
      units: "auto"
    };

    const result = await 3MFImportNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.models).toBeDefined();
    expect(result.materials).toBeDefined();
    expect(result.build).toBeDefined();
  });

  
});