
import { describe, it, expect } from 'vitest';
import { OBJImportNode } from './objimport.node';
import { createTestContext } from './../../test-utils';

describe('OBJImportNode', () => {
  it('should create OBJImport', async () => {
    const context = createTestContext();
    const inputs = {
      filePath: null
    };
    const params = {
      scale: 1,
      flipNormals: false,
      loadMaterials: true
    };

    const result = await OBJImportNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.meshes).toBeDefined();
    expect(result.materials).toBeDefined();
    expect(result.groups).toBeDefined();
  });

  
});