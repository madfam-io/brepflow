
import { describe, it, expect } from 'vitest';
import { OBJExportNode } from './objexport-node';
import { createTestContext } from '../test-utils';

describe('OBJExportNode', () => {
  it('should create OBJExport', async () => {
    const context = createTestContext();
    const inputs = {
      meshes: null,
      filePath: null
    };
    const params = {
      includeNormals: true,
      includeTexCoords: false,
      smoothing: true
    };

    const result = await OBJExportNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.success).toBeDefined();
    expect(result.vertexCount).toBeDefined();
    expect(result.faceCount).toBeDefined();
  });

  
});