
import { describe, it, expect } from 'vitest';
import { STLImportNode } from './stlimport.node';
import { createTestContext } from './../../test-utils';

describe('STLImportNode', () => {
  it('should create STLImport', async () => {
    const context = createTestContext();
    const inputs = {
      filePath: null
    };
    const params = {
      mergeVertices: true,
      tolerance: 0.01,
      units: "mm"
    };

    const result = await STLImportNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.mesh).toBeDefined();
    expect(result.triangleCount).toBeDefined();
    expect(result.vertexCount).toBeDefined();
  });

  
});