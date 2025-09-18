
import { describe, it, expect } from 'vitest';
import { ThreeMFImportNode } from './threemfimport-node';
import { createTestContext } from '../test-utils';

describe('ThreeMFImportNode', () => {
  it('should create ThreeMFImport', async () => {
    const context = createTestContext();
    const inputs = {
      filePath: null
    };
    const params = {
      loadTextures: true,
      loadMaterials: true,
      units: "auto"
    };

    const result = await ThreeMFImportNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.models).toBeDefined();
    expect(result.materials).toBeDefined();
    expect(result.build).toBeDefined();
  });

  
});