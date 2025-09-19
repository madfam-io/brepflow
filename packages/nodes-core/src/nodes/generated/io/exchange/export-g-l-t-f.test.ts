
import { describe, it, expect } from 'vitest';
import { ExportGLTFNode } from './exportgltf.node';
import { createTestContext } from './../../test-utils';

describe('ExportGLTFNode', () => {
  it('should create ExportGLTF', async () => {
    const context = createTestContext();
    const inputs = {
      shape: null
    };
    const params = {
      format: "glb",
      draco: false
    };

    const result = await ExportGLTFNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.gltfData).toBeDefined();
  });

  
});