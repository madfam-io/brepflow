
import { describe, it, expect } from 'vitest';
import { ImportGLTFNode } from './importgltf-node';
import { createTestContext } from '../test-utils';

describe('ImportGLTFNode', () => {
  it('should create ImportGLTF', async () => {
    const context = createTestContext();
    const inputs = {
      fileData: null
    };
    const params = {
      importAnimations: false,
      importMaterials: true
    };

    const result = await ImportGLTFNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.mesh).toBeDefined();
    expect(result.materials).toBeDefined();
    expect(result.animations).toBeDefined();
  });

  
});